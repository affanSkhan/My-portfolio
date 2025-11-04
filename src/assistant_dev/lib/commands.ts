import { z } from "zod";

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
  // Skill operations
  AddSkillSchema,
  UpdateSkillSchema,
  // About operations
  UpdateAboutSchema,
  AddRoleSchema,
  // Goals operations
  AddGoalSchema,
  UpdateGoalsSchema,
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
  UpdateSkillSchema
]);

export const AboutCommands = z.union([
  UpdateAboutSchema,
  AddRoleSchema
]);

export const GoalCommands = z.union([
  AddGoalSchema,
  UpdateGoalsSchema
]);

export type ProjectCommand = z.infer<typeof ProjectCommands>;
export type SkillCommand = z.infer<typeof SkillCommands>;
export type AboutCommand = z.infer<typeof AboutCommands>;
export type GoalCommand = z.infer<typeof GoalCommands>;

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
    
    // Skill operations
    case "add_skill":
      return `Add skill: ${cmd.payload.name} (${cmd.payload.category}, level ${cmd.payload.level}%)`;
    
    case "update_skill":
      const skillFields = Object.keys(cmd.payload.patch).join(", ");
      return `Update skill "${cmd.payload.matchName}": ${skillFields}`;
    
    // About operations
    case "update_about":
      return `Update ${cmd.payload.field}: "${cmd.payload.value}"`;
    
    case "add_role":
      return `Add role: "${cmd.payload.role}"`;
    
    // Goal operations
    case "add_goal":
      return `Add ${cmd.payload.type} goal: "${cmd.payload.goal}"`;
    
    case "update_goals":
      return `Update ${cmd.payload.field}: "${cmd.payload.value}"`;
    
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
      return "Projects";
    
    case "add_skill":
    case "update_skill":
      return "Skills";
    
    case "update_about":
    case "add_role":
      return "About";
    
    case "add_goal":
    case "update_goals":
      return "Goals";
    
    case "noop":
      return "System";
    
    default:
      return "Unknown";
  }
}

export function isDestructiveCommand(cmd: Command): boolean {
  return cmd.type === "remove_project";
}

export function getFileTargetForCommand(cmd: Command): string {
  switch (cmd.type) {
    case "add_project":
    case "update_project":
    case "remove_project":
      return "projects.json";
    
    case "add_skill":
    case "update_skill":
      return "skills.json";
    
    case "update_about":
    case "add_role":
      return "about.json";
    
    case "add_goal":
    case "update_goals":
      return "goals.json";
    
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
    const response = await fetch('/api/content/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filename,
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