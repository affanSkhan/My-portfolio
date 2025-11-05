import { readJson, writeJson } from './fs-json';
import { 
  AuditLogEntry, 
  Command, 
  createAuditLogEntry, 
  generateUndoCommand,
  filterAuditLogs,
  getFileTargetForCommand
} from './commands';

const AUDIT_LOGS_FILE = 'audit_logs.json';

/**
 * Audit Log Manager - Handles all audit logging operations
 */
export class AuditLogger {
  
  /**
   * Logs a command execution with before/after snapshots
   */
  static async logCommand(
    command: Command,
    executionResult: { success: boolean; message: string; executionTimeMs?: number },
    beforeSnapshot?: unknown,
    afterSnapshot?: unknown,
    metadata?: Partial<AuditLogEntry['metadata']>
  ): Promise<void> {
    try {
      const affectedFile = getFileTargetForCommand(command);
      
      const auditEntry = createAuditLogEntry(
        command,
        executionResult,
        {
          before: beforeSnapshot,
          after: afterSnapshot,
          affectedFile
        },
        metadata
      );

      // Read existing audit logs
      const auditLogs = await this.getAuditLogs();
      
      // Add new entry at the beginning (most recent first)
      auditLogs.unshift(auditEntry);
      
      // Keep only the last 1000 entries to prevent file from growing too large
      const maxEntries = 1000;
      if (auditLogs.length > maxEntries) {
        auditLogs.splice(maxEntries);
      }
      
      // Save updated audit logs
      await writeJson(AUDIT_LOGS_FILE, auditLogs);
      
    } catch (error) {
      console.error('Failed to log audit entry:', error);
      // Don't throw - audit logging shouldn't break the main operation
    }
  }

  /**
   * Retrieves audit logs with optional filtering and pagination
   */
  static async getAuditLogs(
    limit: number = 50,
    offset: number = 0,
    filters?: NonNullable<Parameters<typeof filterAuditLogs>[1]>
  ): Promise<AuditLogEntry[]> {
    try {
      const allLogs = await readJson(AUDIT_LOGS_FILE) as AuditLogEntry[] || [];
      
      // Apply filters if provided
      const filteredLogs = filters ? filterAuditLogs(allLogs, filters) : allLogs;
      
      // Apply pagination
      return filteredLogs.slice(offset, offset + limit);
      
    } catch (error) {
      console.error('Failed to read audit logs:', error);
      return [];
    }
  }

  /**
   * Gets a specific audit log entry by ID
   */
  static async getAuditLogById(id: string): Promise<AuditLogEntry | null> {
    try {
      const auditLogs = await readJson(AUDIT_LOGS_FILE) as AuditLogEntry[] || [];
      return auditLogs.find(log => log.id === id) || null;
    } catch (error) {
      console.error('Failed to find audit log entry:', error);
      return null;
    }
  }

  /**
   * Undoes a command by executing its inverse operation
   */
  static async undoCommand(auditLogId: string, reason?: string): Promise<{
    success: boolean;
    message: string;
    undoCommand?: Command;
  }> {
    try {
      // Find the audit log entry
      const auditEntry = await this.getAuditLogById(auditLogId);
      if (!auditEntry) {
        return {
          success: false,
          message: `Audit log entry not found: ${auditLogId}`
        };
      }

      // Check if the command was successful (can't undo failed commands)
      if (!auditEntry.executionResult.success) {
        return {
          success: false,
          message: 'Cannot undo a failed command'
        };
      }

      // Generate the undo command
      const undoCommand = generateUndoCommand(auditEntry);
      if (!undoCommand) {
        return {
          success: false,
          message: `Command type '${auditEntry.command.type}' cannot be undone`
        };
      }

      // Execute the undo command through the normal command execution flow
      // Note: This would typically go through the same API endpoint that logs the operation
      return {
        success: true,
        message: `Generated undo command for ${auditEntry.command.type}`,
        undoCommand
      };

    } catch (error) {
      return {
        success: false,
        message: `Failed to undo command: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }

  /**
   * Clears audit logs based on criteria
   */
  static async clearAuditLogs(
    olderThan?: string,
    confirmationCode?: string
  ): Promise<{ success: boolean; message: string; deletedCount: number }> {
    try {
      // Safety check - require confirmation code
      if (confirmationCode !== 'CONFIRM_CLEAR_LOGS') {
        return {
          success: false,
          message: 'Invalid confirmation code. Use "CONFIRM_CLEAR_LOGS"',
          deletedCount: 0
        };
      }

      const auditLogs = await readJson(AUDIT_LOGS_FILE) as AuditLogEntry[] || [];
      let remainingLogs = auditLogs;
      let deletedCount = 0;

      if (olderThan) {
        const cutoffDate = new Date(olderThan);
        remainingLogs = auditLogs.filter(log => {
          const logDate = new Date(log.timestamp);
          const shouldDelete = logDate < cutoffDate;
          if (shouldDelete) deletedCount++;
          return !shouldDelete;
        });
      } else {
        // Clear all logs
        deletedCount = auditLogs.length;
        remainingLogs = [];
      }

      await writeJson(AUDIT_LOGS_FILE, remainingLogs);

      return {
        success: true,
        message: `Cleared ${deletedCount} audit log entries`,
        deletedCount
      };

    } catch (error) {
      return {
        success: false,
        message: `Failed to clear audit logs: ${error instanceof Error ? error.message : 'Unknown error'}`,
        deletedCount: 0
      };
    }
  }

  /**
   * Gets audit log statistics
   */
  static async getAuditStats(): Promise<{
    totalEntries: number;
    successfulCommands: number;
    failedCommands: number;
    commandsByCategory: Record<string, number>;
    recentActivity: { date: string; count: number }[];
  }> {
    try {
      const auditLogs = await readJson(AUDIT_LOGS_FILE) as AuditLogEntry[] || [];
      
      const stats = {
        totalEntries: auditLogs.length,
        successfulCommands: auditLogs.filter(log => log.executionResult.success).length,
        failedCommands: auditLogs.filter(log => !log.executionResult.success).length,
        commandsByCategory: {} as Record<string, number>,
        recentActivity: [] as { date: string; count: number }[]
      };

      // Count commands by category
      auditLogs.forEach(log => {
        const category = log.metadata.commandCategory;
        stats.commandsByCategory[category] = (stats.commandsByCategory[category] || 0) + 1;
      });

      // Calculate recent activity (last 7 days)
      const recentDays = 7;
      const now = new Date();
      for (let i = 0; i < recentDays; i++) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        
        const count = auditLogs.filter(log => {
          const logDate = new Date(log.timestamp).toISOString().split('T')[0];
          return logDate === dateStr;
        }).length;
        
        stats.recentActivity.unshift({ date: dateStr, count });
      }

      return stats;

    } catch (error) {
      console.error('Failed to get audit stats:', error);
      return {
        totalEntries: 0,
        successfulCommands: 0,
        failedCommands: 0,
        commandsByCategory: {},
        recentActivity: []
      };
    }
  }
}

export default AuditLogger;