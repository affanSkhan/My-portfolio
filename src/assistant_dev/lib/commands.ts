import { z } from "zod";

// === Audit Log Schema ===

export const AuditLogEntrySchema = z.object({
  id: z.string().uuid(), // Unique identifier for the log entry
  timestamp: z.string().datetime(), // ISO 8601 timestamp
  command: z.any(), // The command that was executed (using CommandSchema)
  userId: z.string().default("assistant"), // Who executed the command
  sessionId: z.string().optional(), // Session identifier for batching related operations
  executionResult: z.object({
    success: z.boolean(),
    message: z.string(),
    executionTimeMs: z.number().optional()
  }),
  dataSnapshot: z.object({
    before: z.any().optional(), // Data state before the command
    after: z.any().optional(), // Data state after the command
    affectedFile: z.string() // Which file was modified
  }),
  metadata: z.object({
    userAgent: z.string().optional(),
    ipAddress: z.string().optional(),
    environment: z.enum(["development", "production"]).default("development"),
    commandCategory: z.string(),
    isDestructive: z.boolean(),
    isUndoable: z.boolean()
  })
});

export type AuditLogEntry = z.infer<typeof AuditLogEntrySchema>;

// === Undo Operations ===

export const UndoCommandSchema = z.object({
  type: z.literal("undo_command"),
  payload: z.object({
    auditLogId: z.string().uuid(), // ID of the audit log entry to undo
    reason: z.string().optional() // Optional reason for the undo
  })
});

export const ViewAuditLogsSchema = z.object({
  type: z.literal("view_audit_logs"),
  payload: z.object({
    limit: z.number().int().min(1).max(100).default(20), // Number of entries to return
    offset: z.number().int().min(0).default(0), // Pagination offset
    filterBy: z.object({
      commandType: z.string().optional(), // Filter by specific command type
      category: z.string().optional(), // Filter by command category
      dateRange: z.object({
        start: z.string().datetime().optional(),
        end: z.string().datetime().optional()
      }).optional(),
      successOnly: z.boolean().optional(), // Only show successful operations
      destructiveOnly: z.boolean().optional() // Only show destructive operations
    }).optional()
  })
});

export const ClearAuditLogsSchema = z.object({
  type: z.literal("clear_audit_logs"),
  payload: z.object({
    olderThan: z.string().datetime().optional(), // Clear logs older than this date
    confirmationCode: z.string().min(1, "Confirmation code required for clearing logs")
  })
});

// === Project Operations ===

export const AddProjectSchema = z.object({
  type: z.literal("add_project"),
  payload: z.object({
    title: z.string().min(1, "Project title is required"),
    stack: z.array(z.string()).default([]),
    description: z.string().min(1, "Project description is required"),
    year: z.number().int().min(2020).max(2030),
    links: z.object({
      github: z.string().url().optional().or(z.literal("")),
      live: z.string().url().optional().or(z.literal(""))
    }).default({}),
    featured: z.boolean().default(false),
    status: z.enum(["planning", "in-progress", "completed"]).default("completed"),
    lessons: z.array(z.string()).default([])
  })
});

export const UpdateProjectSchema = z.object({
  type: z.literal("update_project"),
  payload: z.object({
    matchTitle: z.string().min(1, "Project title to match is required"),
    patch: z.record(z.string(), z.any()).refine(
      (patch) => Object.keys(patch).length > 0,
      { message: "At least one field must be updated" }
    )
  })
});

export const RemoveProjectSchema = z.object({
  type: z.literal("remove_project"),
  payload: z.object({
    matchTitle: z.string().min(1, "Project title to remove is required")
  })
});

// === Skill Operations ===

export const AddSkillSchema = z.object({
  type: z.literal("add_skill"),
  payload: z.object({
    name: z.string().min(1, "Skill name is required"),
    iconName: z.string().min(1, "Icon name is required"),
    colorClass: z.string().min(1, "Color class is required"),
    category: z.enum(["Frontend", "Backend", "Mobile", "AI/ML", "Databases", "Tools"]),
    level: z.number().int().min(0).max(100)
  })
});

export const UpdateSkillSchema = z.object({
  type: z.literal("update_skill"),
  payload: z.object({
    matchName: z.string().min(1, "Skill name to match is required"),
    patch: z.record(z.string(), z.any()).refine(
      (patch) => Object.keys(patch).length > 0,
      { message: "At least one field must be updated" }
    )
  })
});

export const RemoveSkillSchema = z.object({
  type: z.literal("remove_skill"),
  payload: z.object({
    matchName: z.string().min(1, "Skill name to remove is required")
  })
});

// === About Operations ===

export const UpdateAboutSchema = z.object({
  type: z.literal("update_about"),
  payload: z.object({
    field: z.enum(["name", "title", "location", "bio", "email", "github", "linkedin"]),
    value: z.string().min(1, "Value is required")
  })
});

export const AddRoleSchema = z.object({
  type: z.literal("add_role"),
  payload: z.object({
    role: z.string().min(1, "Role description is required")
  })
});

// === Goals Operations ===

export const AddGoalSchema = z.object({
  type: z.literal("add_goal"),
  payload: z.object({
    type: z.enum(["shortTerm", "longTerm"]),
    goal: z.string().min(1, "Goal description is required")
  })
});

export const UpdateGoalsSchema = z.object({
  type: z.literal("update_goals"),
  payload: z.object({
    field: z.enum(["currentFocus", "vision", "mission"]),
    value: z.string().min(1, "Value is required")
  })
});

export const RemoveRoleSchema = z.object({
  type: z.literal("remove_role"),
  payload: z.object({
    role: z.string().min(1, "Role to remove is required")
  })
});

export const RemoveGoalSchema = z.object({
  type: z.literal("remove_goal"),
  payload: z.object({
    matchGoal: z.string().min(1, "Goal text to remove is required")
  })
});

// === Project Reordering ===

export const ReorderProjectsSchema = z.object({
  type: z.literal("reorder_projects"),
  payload: z.object({
    strategy: z.enum(["featured_first", "by_year_desc", "by_year_asc", "by_tech_stack", "by_status", "custom_order"]).default("featured_first"),
    customOrder: z.array(z.string()).optional(), // Array of project titles in desired order
    description: z.string().optional() // Optional description of why reordering
  })
});

// === Adaptive Project Sorting ===

export const AdaptiveSortProjectsSchema = z.object({
  type: z.literal("adaptive_sort_projects"),
  payload: z.object({
    intent: z.enum([
      "prioritize_specific_project", 
      "prioritize_category", 
      "prioritize_technology",
      "prioritize_by_keywords",
      "custom_adaptive_sort"
    ]),
    targetProject: z.string().optional(), // Specific project to prioritize
    category: z.enum([
      "ai_ml", 
      "data_science", 
      "web_development", 
      "mobile_development", 
      "backend", 
      "full_stack",
      "cloud_computing",
      "automation"
    ]).optional(),
    technologies: z.array(z.string()).optional(), // Technologies to prioritize
    keywords: z.array(z.string()).optional(), // Keywords to search for in titles/descriptions
    reasoning: z.string().optional() // AI's reasoning for the sorting decision
  })
});

// === Journey Operations ===

export const AddJourneyItemSchema = z.object({
  type: z.literal("add_journey_item"),
  payload: z.object({
    timeline: z.enum(["student", "entrepreneur"]),
    year: z.string().min(1, "Year is required"),
    title: z.string().min(1, "Title is required"),
    desc: z.string().min(1, "Description is required"),
    icon: z.enum(["Award", "GraduationCap", "Lightbulb", "Rocket", "Trophy", "Star", "Book", "Code", "Users", "Target"]).default("Lightbulb"),
    iconColor: z.string().default("text-indigo-600")
  })
});

export const UpdateJourneyItemSchema = z.object({
  type: z.literal("update_journey_item"),
  payload: z.object({
    timeline: z.enum(["student", "entrepreneur"]),
    itemId: z.string().min(1, "Item ID is required"),
    patch: z.record(z.string(), z.any()).refine(
      (patch) => Object.keys(patch).length > 0,
      { message: "At least one field must be updated" }
    )
  })
});

export const RemoveJourneyItemSchema = z.object({
  type: z.literal("remove_journey_item"),
  payload: z.object({
    timeline: z.enum(["student", "entrepreneur"]),
    itemId: z.string().min(1, "Item ID to remove is required")
  })
});

export const ReorderJourneySchema = z.object({
  type: z.literal("reorder_journey"),
  payload: z.object({
    timeline: z.enum(["student", "entrepreneur"]),
    strategy: z.enum(["by_year_asc", "by_year_desc", "custom_order"]).default("by_year_asc"),
    customOrder: z.array(z.string()).optional() // Array of item IDs in desired order
  })
});

// === No-op Command ===

export const NoopSchema = z.object({ 
  type: z.literal("noop"),
  payload: z.object({
    reason: z.string().optional()
  }).optional()
});

// === Union of All Commands ===

export const CommandSchema = z.discriminatedUnion("type", [
  // Project operations
  AddProjectSchema,
  UpdateProjectSchema,
  RemoveProjectSchema,
  ReorderProjectsSchema,
  AdaptiveSortProjectsSchema,
  // Skill operations
  AddSkillSchema,
  UpdateSkillSchema,
  RemoveSkillSchema,
  // About operations
  UpdateAboutSchema,
  AddRoleSchema,
  RemoveRoleSchema,
  // Goals operations
  AddGoalSchema,
  UpdateGoalsSchema,
  RemoveGoalSchema,
  // Journey operations
  AddJourneyItemSchema,
  UpdateJourneyItemSchema,
  RemoveJourneyItemSchema,
  ReorderJourneySchema,
  // Audit operations
  UndoCommandSchema,
  ViewAuditLogsSchema,
  ClearAuditLogsSchema,
  // No operation
  NoopSchema
]);

export type Command = z.infer<typeof CommandSchema>;

// === Command Categories for Better Organization ===

export const ProjectCommands = z.union([
  AddProjectSchema,
  UpdateProjectSchema,
  RemoveProjectSchema
]);

export const SkillCommands = z.union([
  AddSkillSchema,
  UpdateSkillSchema,
  RemoveSkillSchema
]);

export const AboutCommands = z.union([
  UpdateAboutSchema,
  AddRoleSchema
]);

export const GoalCommands = z.union([
  AddGoalSchema,
  UpdateGoalsSchema,
  RemoveGoalSchema
]);

export const JourneyCommands = z.union([
  AddJourneyItemSchema,
  UpdateJourneyItemSchema,
  RemoveJourneyItemSchema,
  ReorderJourneySchema
]);

export const AuditCommands = z.union([
  UndoCommandSchema,
  ViewAuditLogsSchema,
  ClearAuditLogsSchema
]);

export type ProjectCommand = z.infer<typeof ProjectCommands>;
export type SkillCommand = z.infer<typeof SkillCommands>;
export type AboutCommand = z.infer<typeof AboutCommands>;
export type GoalCommand = z.infer<typeof GoalCommands>;
export type JourneyCommand = z.infer<typeof JourneyCommands>;
export type AuditCommand = z.infer<typeof AuditCommands>;

// === User-Facing Summary Functions ===

export function toUserFacingSummary(cmd: Command): string {
  switch (cmd.type) {
    // Project operations
    case "add_project":
      return `Add project: "${cmd.payload.title}" (${cmd.payload.stack.join(", ")})`;
    
    case "update_project":
      const updateFields = Object.keys(cmd.payload.patch).join(", ");
      return `Update project "${cmd.payload.matchTitle}": ${updateFields}`;
    
    case "remove_project":
      return `Remove project: "${cmd.payload.matchTitle}"`;
    
    case "reorder_projects":
      return `Reorder projects: ${cmd.payload.strategy}${cmd.payload.description ? ` - ${cmd.payload.description}` : ""}`;
    
    case "adaptive_sort_projects":
      return `Adaptive sort projects: ${cmd.payload.intent}${cmd.payload.reasoning ? ` - ${cmd.payload.reasoning}` : ""}`;
    
    // Skill operations
    case "add_skill":
      return `Add skill: ${cmd.payload.name} (${cmd.payload.category}, level ${cmd.payload.level}%)`;
    
    case "update_skill":
      const skillFields = Object.keys(cmd.payload.patch).join(", ");
      return `Update skill "${cmd.payload.matchName}": ${skillFields}`;
    
    case "remove_skill":
      return `Remove skill: "${cmd.payload.matchName}"`;
    
    // About operations
    case "update_about":
      return `Update ${cmd.payload.field}: "${cmd.payload.value}"`;
    
    case "add_role":
      return `Add role: "${cmd.payload.role}"`;
    
    case "remove_role":
      return `Remove role: "${cmd.payload.role}"`;
    
    // Goal operations
    case "add_goal":
      return `Add ${cmd.payload.type} goal: "${cmd.payload.goal}"`;
    
    case "update_goals":
      return `Update ${cmd.payload.field}: "${cmd.payload.value}"`;
    
    case "remove_goal":
      return `Remove goal: "${cmd.payload.matchGoal}"`;
    
    // Journey operations
    case "add_journey_item":
      return `Add ${cmd.payload.timeline} milestone: "${cmd.payload.title}" (${cmd.payload.year})`;
    
    case "update_journey_item":
      const journeyFields = Object.keys(cmd.payload.patch).join(", ");
      return `Update ${cmd.payload.timeline} milestone "${cmd.payload.itemId}": ${journeyFields}`;
    
    case "remove_journey_item":
      return `Remove ${cmd.payload.timeline} milestone: "${cmd.payload.itemId}"`;
    
    case "reorder_journey":
      return `Reorder ${cmd.payload.timeline} timeline: ${cmd.payload.strategy}`;
    
    // Audit operations
    case "undo_command":
      return `Undo command: ${cmd.payload.auditLogId}${cmd.payload.reason ? ` - ${cmd.payload.reason}` : ""}`;
    
    case "view_audit_logs":
      const filters = cmd.payload.filterBy;
      let filterDesc = "";
      if (filters) {
        const parts = [];
        if (filters.commandType) parts.push(`type: ${filters.commandType}`);
        if (filters.category) parts.push(`category: ${filters.category}`);
        if (filters.successOnly) parts.push("successful only");
        if (filters.destructiveOnly) parts.push("destructive only");
        if (parts.length > 0) filterDesc = ` (${parts.join(", ")})`;
      }
      return `View audit logs: ${cmd.payload.limit} entries${filterDesc}`;
    
    case "clear_audit_logs":
      return `Clear audit logs${cmd.payload.olderThan ? ` older than ${cmd.payload.olderThan}` : " (all)"}`;
    
    // No operation
    case "noop":
      return cmd.payload?.reason || "No action needed";
    
    default:
      return "Unknown command";
  }
}

export function getCommandCategory(cmd: Command): string {
  switch (cmd.type) {
    case "add_project":
    case "update_project":
    case "remove_project":
    case "reorder_projects":
    case "adaptive_sort_projects":
      return "Projects";
    
    case "add_skill":
    case "update_skill":
    case "remove_skill":
      return "Skills";
    
    case "update_about":
    case "add_role":
    case "remove_role":
      return "About";
    
    case "add_goal":
    case "update_goals":
    case "remove_goal":
      return "Goals";
    
    case "add_journey_item":
    case "update_journey_item":
    case "remove_journey_item":
    case "reorder_journey":
      return "Journey";
    
    case "undo_command":
    case "view_audit_logs":
    case "clear_audit_logs":
      return "Audit";
    
    case "noop":
      return "System";
    
    default:
      return "Unknown";
  }
}

export function isDestructiveCommand(cmd: Command): boolean {
  return [
    "remove_project",
    "remove_skill", 
    "remove_role",
    "remove_goal",
    "remove_journey_item",
    "clear_audit_logs"
  ].includes(cmd.type);
}

export function getFileTargetForCommand(cmd: Command): string {
  switch (cmd.type) {
    case "add_project":
    case "update_project":
    case "remove_project":
    case "reorder_projects":
    case "adaptive_sort_projects":
      return "projects.json";
    
    case "add_skill":
    case "update_skill":
    case "remove_skill":
      return "skills.json";
    
    case "update_about":
    case "add_role":
    case "remove_role":
      return "about.json";
    
    case "add_goal":
    case "update_goals":
    case "remove_goal":
      return "goals.json";
    
    case "add_journey_item":
    case "update_journey_item":
    case "remove_journey_item":
    case "reorder_journey":
      return "journey.json";
    
    case "undo_command":
    case "view_audit_logs":
    case "clear_audit_logs":
      return "audit_logs.json";
    
    case "noop":
      return "";
    
    default:
      return "";
  }
}

/**
 * Validates a command against the CommandSchema
 */
export function validateCommand(command: unknown) {
  return CommandSchema.safeParse(command);
}

/**
 * Executes a validated command by calling the appropriate API
 */
export async function executeCommand(command: Command): Promise<{ success: boolean; message: string }> {
  try {
    const filename = getFileTargetForCommand(command);
    
    if (!filename) {
      return { success: false, message: "Unknown command type" };
    }

    // For destructive operations, we could add additional validation here
    if (isDestructiveCommand(command)) {
      // Add any safety checks if needed
    }

    // Call the content API to execute the command
    const response = await fetch('/api/content/command', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        command,
        pin: process.env.ASSISTANT_ADMIN_PIN || '1234'
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      return { success: false, message: `API error: ${error}` };
    }

    await response.json(); // Consume the response
    return { 
      success: true, 
      message: `Successfully executed: ${toUserFacingSummary(command)}` 
    };

  } catch (error) {
    return { 
      success: false, 
      message: `Execution failed: ${error instanceof Error ? error.message : 'Unknown error'}` 
    };
  }
}

// === Audit Log Helper Functions ===

/**
 * Creates a new audit log entry for a command execution
 */
export function createAuditLogEntry(
  command: Command,
  executionResult: { success: boolean; message: string; executionTimeMs?: number },
  dataSnapshot: { before?: any; after?: any; affectedFile: string },
  metadata?: Partial<AuditLogEntry['metadata']>
): AuditLogEntry {
  return {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    command,
    userId: "assistant",
    sessionId: undefined,
    executionResult,
    dataSnapshot,
    metadata: {
      environment: "development",
      commandCategory: getCommandCategory(command),
      isDestructive: isDestructiveCommand(command),
      isUndoable: isUndoableCommand(command),
      ...metadata
    }
  };
}

/**
 * Determines if a command can be undone
 */
export function isUndoableCommand(cmd: Command): boolean {
  // Most operations are undoable except for view operations and some system commands
  const nonUndoableCommands = [
    "view_audit_logs",
    "noop"
  ];
  
  return !nonUndoableCommands.includes(cmd.type);
}

/**
 * Generates the inverse command for undoing an operation
 */
export function generateUndoCommand(auditLogEntry: AuditLogEntry): Command | null {
  const originalCommand = auditLogEntry.command;
  const { before, after, affectedFile } = auditLogEntry.dataSnapshot;

  switch (originalCommand.type) {
    case "add_project":
      // Undo add by removing the project
      return {
        type: "remove_project",
        payload: {
          matchTitle: originalCommand.payload.title
        }
      };

    case "remove_project":
      // Undo remove by adding the project back
      if (before && Array.isArray(before)) {
        const removedProject = before.find((p: any) => p.title === originalCommand.payload.matchTitle);
        if (removedProject) {
          return {
            type: "add_project",
            payload: removedProject
          };
        }
      }
      break;

    case "update_project":
      // Undo update by reverting to previous values
      if (before && Array.isArray(before)) {
        const originalProject = before.find((p: any) => p.title === originalCommand.payload.matchTitle);
        if (originalProject) {
          // Create a patch with the original values for the fields that were changed
          const revertPatch: Record<string, any> = {};
          Object.keys(originalCommand.payload.patch).forEach(key => {
            if (key in originalProject) {
              revertPatch[key] = originalProject[key];
            }
          });
          
          return {
            type: "update_project",
            payload: {
              matchTitle: originalCommand.payload.matchTitle,
              patch: revertPatch
            }
          };
        }
      }
      break;

    case "add_skill":
      return {
        type: "remove_skill",
        payload: {
          matchName: originalCommand.payload.name
        }
      };

    case "remove_skill":
      if (before && Array.isArray(before)) {
        const removedSkill = before.find((s: any) => s.name === originalCommand.payload.matchName);
        if (removedSkill) {
          return {
            type: "add_skill",
            payload: removedSkill
          };
        }
      }
      break;

    case "update_skill":
      if (before && Array.isArray(before)) {
        const originalSkill = before.find((s: any) => s.name === originalCommand.payload.matchName);
        if (originalSkill) {
          const revertPatch: Record<string, any> = {};
          Object.keys(originalCommand.payload.patch).forEach(key => {
            if (key in originalSkill) {
              revertPatch[key] = originalSkill[key];
            }
          });
          
          return {
            type: "update_skill",
            payload: {
              matchName: originalCommand.payload.matchName,
              patch: revertPatch
            }
          };
        }
      }
      break;

    case "reorder_projects":
    case "adaptive_sort_projects":
      // For reordering, we can restore the exact previous order
      if (before && Array.isArray(before)) {
        return {
          type: "reorder_projects",
          payload: {
            strategy: "custom_order",
            customOrder: before.map((p: any) => p.title),
            description: `Undo ${originalCommand.type}`
          }
        };
      }
      break;

    case "add_journey_item":
      return {
        type: "remove_journey_item",
        payload: {
          timeline: originalCommand.payload.timeline,
          itemId: after && after[originalCommand.payload.timeline] ? 
            after[originalCommand.payload.timeline].find((item: any) => 
              item.title === originalCommand.payload.title
            )?.id : null
        }
      };

    case "remove_journey_item":
      if (before && before[originalCommand.payload.timeline]) {
        const removedItem = before[originalCommand.payload.timeline].find((item: any) => 
          item.id === originalCommand.payload.itemId
        );
        if (removedItem) {
          return {
            type: "add_journey_item",
            payload: {
              timeline: originalCommand.payload.timeline,
              year: removedItem.year,
              title: removedItem.title,
              desc: removedItem.desc,
              icon: removedItem.icon,
              iconColor: removedItem.iconColor
            }
          };
        }
      }
      break;

    case "update_journey_item":
      if (before && before[originalCommand.payload.timeline]) {
        const originalItem = before[originalCommand.payload.timeline].find((item: any) => 
          item.id === originalCommand.payload.itemId
        );
        if (originalItem) {
          const revertPatch: Record<string, any> = {};
          Object.keys(originalCommand.payload.patch).forEach(key => {
            if (key in originalItem) {
              revertPatch[key] = originalItem[key];
            }
          });
          
          return {
            type: "update_journey_item",
            payload: {
              timeline: originalCommand.payload.timeline,
              itemId: originalCommand.payload.itemId,
              patch: revertPatch
            }
          };
        }
      }
      break;

    case "reorder_journey":
      if (before && before[originalCommand.payload.timeline]) {
        return {
          type: "reorder_journey",
          payload: {
            timeline: originalCommand.payload.timeline,
            strategy: "custom_order",
            customOrder: before[originalCommand.payload.timeline].map((item: any) => item.id)
          }
        };
      }
      break;

    // Add more undo logic for other command types as needed...
    
    default:
      return null; // Cannot undo this command type
  }

  return null;
}

/**
 * Formats audit log entries for display
 */
export function formatAuditLogForDisplay(entry: AuditLogEntry): string {
  const timestamp = new Date(entry.timestamp).toLocaleString();
  const status = entry.executionResult.success ? "✅" : "❌";
  const category = entry.metadata.commandCategory;
  const summary = toUserFacingSummary(entry.command);
  
  return `${status} [${timestamp}] ${category}: ${summary}`;
}

/**
 * Filters audit logs based on criteria
 */
export function filterAuditLogs(
  logs: AuditLogEntry[], 
  filters: NonNullable<z.infer<typeof ViewAuditLogsSchema>['payload']['filterBy']>
): AuditLogEntry[] {
  return logs.filter(log => {
    // Filter by command type
    if (filters.commandType && log.command.type !== filters.commandType) {
      return false;
    }

    // Filter by category
    if (filters.category && log.metadata.commandCategory !== filters.category) {
      return false;
    }

    // Filter by success status
    if (filters.successOnly && !log.executionResult.success) {
      return false;
    }

    // Filter by destructive operations
    if (filters.destructiveOnly && !log.metadata.isDestructive) {
      return false;
    }

    // Filter by date range
    if (filters.dateRange) {
      const logTime = new Date(log.timestamp).getTime();
      
      if (filters.dateRange.start) {
        const startTime = new Date(filters.dateRange.start).getTime();
        if (logTime < startTime) return false;
      }
      
      if (filters.dateRange.end) {
        const endTime = new Date(filters.dateRange.end).getTime();
        if (logTime > endTime) return false;
      }
    }

    return true;
  });
}