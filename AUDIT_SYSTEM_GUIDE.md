# 📊 Audit Logging and Undo System

The audit logging system provides complete tracking and rollback capabilities for all portfolio changes made through the AI assistant.

## Features

### 🔍 **Comprehensive Audit Trail**
- **Every command is logged** with before/after snapshots
- **Timestamps and metadata** for complete audit history 
- **Success/failure tracking** for all operations
- **User identification** and session tracking
- **Performance metrics** with execution timing

### ↩️ **Smart Undo System**
- **Automatic undo generation** for most operations
- **Reversible operations** like add/remove/update
- **State restoration** using before snapshots
- **Batch operation rollback** capability

### 📈 **Analytics & Insights**
- **Command statistics** by category and success rate
- **Recent activity tracking** over time periods
- **Destructive operation monitoring** for safety
- **Performance analysis** and optimization insights

## Audit Log Entry Structure

Each audit log entry contains:

```typescript
{
  id: "unique-uuid",                    // Unique identifier
  timestamp: "2025-11-05T...",          // ISO 8601 timestamp
  command: { /* original command */ },  // Full command data
  userId: "assistant",                  // Who executed
  sessionId: "optional-session-id",     // Batch grouping
  executionResult: {
    success: true,                      // Operation result
    message: "Success message",         // Human readable
    executionTimeMs: 1234              // Performance data
  },
  dataSnapshot: {
    before: { /* state before */ },    // Pre-operation data
    after: { /* state after */ },      // Post-operation data  
    affectedFile: "projects.json"      // Which file changed
  },
  metadata: {
    environment: "development",         // Runtime environment
    commandCategory: "Projects",        // Logical grouping
    isDestructive: false,              // Safety flag
    isUndoable: true                   // Rollback capability
  }
}
```

## Command Types

### 🔍 **View Audit Logs**
Display recent audit history with filtering options:

```bash
# Basic usage
"Show me the audit logs"

# With filtering  
"Show me the last 10 project operations"
"View failed commands from today"
"Show destructive operations only"
```

**Generated Command:**
```json
{
  "type": "view_audit_logs",
  "payload": {
    "limit": 20,
    "offset": 0,
    "filterBy": {
      "commandType": "add_project",    // Specific command type
      "category": "Projects",          // Command category
      "successOnly": true,             // Only successful ops
      "destructiveOnly": false,        // Only destructive ops
      "dateRange": {
        "start": "2025-11-01T00:00:00Z",
        "end": "2025-11-05T23:59:59Z"
      }
    }
  }
}
```

### ↩️ **Undo Command**
Reverse any previous operation using its audit log ID:

```bash
# Undo specific operation
"Undo the last project addition"
"Reverse command abc-123-def"
"Undo that mistake I just made"
```

**Generated Command:**
```json
{
  "type": "undo_command",
  "payload": {
    "auditLogId": "550e8400-e29b-41d4-a716-446655440000",
    "reason": "Accidental operation"
  }
}
```

### 🗑️ **Clear Audit Logs**
Remove old audit entries (requires confirmation):

```bash
# Clear old logs
"Clear audit logs older than January 1st"
"Delete all audit history"
```

**Generated Command:**
```json
{
  "type": "clear_audit_logs",
  "payload": {
    "olderThan": "2025-01-01T00:00:00Z",  // Optional date filter
    "confirmationCode": "CONFIRM_CLEAR_LOGS"  // Required safety check
  }
}
```

## Undo Capabilities

### ✅ **Undoable Operations**
- **Add Project** → Generates remove command
- **Remove Project** → Restores from before snapshot  
- **Update Project** → Reverts to original values
- **Add/Remove/Update Skills** → Full reversibility
- **Role and Goal Management** → Complete rollback
- **Project Reordering** → Restores exact previous order

### ❌ **Non-Undoable Operations**
- **View Commands** (read-only operations)
- **Audit Log Management** (system operations)
- **Failed Commands** (nothing to undo)

## Example Workflows

### 📝 **Mistake Recovery**
1. You accidentally delete a project
2. Check audit logs: `"Show me recent project operations"`
3. Find the deletion entry and copy its ID
4. Undo: `"Undo command [audit-id]"`
5. Project is restored with all original data

### 📊 **Operation Review**
1. View recent activity: `"Show me today's changes"`
2. Filter by type: `"Show only skill additions"`
3. Check success rate: `"View failed operations"`
4. Analyze performance trends over time

### 🧹 **Maintenance**
1. Review old logs: `"Show audit logs older than 30 days"`
2. Clear outdated entries: `"Clear logs older than last month"`
3. Confirm with: `CONFIRM_CLEAR_LOGS` code
4. System maintains recent history automatically

## Security Features

### 🔒 **Safety Checks**
- **Confirmation codes** required for destructive audit operations
- **Automatic limits** on audit log retention (1000 entries max)
- **Validation** of undo operations before execution
- **Error handling** prevents audit system failures from breaking main operations

### 📋 **Data Integrity** 
- **Atomic operations** ensure consistency
- **Before/after snapshots** capture complete state
- **Rollback validation** confirms undo safety
- **Backup preservation** maintains data recovery options

## Performance Considerations

### ⚡ **Optimizations**
- **Asynchronous logging** doesn't block main operations
- **Chunked pagination** for large audit history
- **Selective snapshots** only for changed data
- **Automatic cleanup** prevents storage bloat

### 📈 **Monitoring**
- **Execution timing** tracked for all operations
- **Success rate metrics** for system health
- **Storage usage** monitoring and alerts
- **Performance regression** detection

## Usage Tips

### 🎯 **Best Practices**
1. **Regular reviews** of audit logs for quality assurance
2. **Immediate undo** for obvious mistakes
3. **Batch operations** for efficiency when possible
4. **Periodic cleanup** of old audit data
5. **Meaningful reasons** when undoing operations

### 🚨 **Common Patterns**
- **"Show recent changes"** → Quick activity overview
- **"Undo that"** → Reverse last operation
- **"What failed today?"** → Debug and fix issues
- **"Restore [project] from yesterday"** → Recover lost work

---

## Technical Implementation

The audit system is implemented across:
- **`commands.ts`** - Command schemas and validation
- **`audit-logger.ts`** - Core logging service
- **`route.ts`** - API integration and execution
- **`chat/route.ts`** - Natural language command generation

All operations are logged automatically, providing a complete audit trail without requiring manual intervention.