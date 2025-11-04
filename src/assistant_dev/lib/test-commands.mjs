// Test script to validate command schemas
import { 
  CommandSchema, 
  toUserFacingSummary, 
  getCommandCategory, 
  getFileTargetForCommand,
  isDestructiveCommand 
} from "./commands.js";

// Test commands
const testCommands = [
  // Valid add project command
  {
    type: "add_project",
    payload: {
      title: "Test Project",
      description: "A test project",
      stack: ["React", "TypeScript"],
      year: 2024
    }
  },
  
  // Valid update project command
  {
    type: "update_project",
    payload: {
      matchTitle: "AI Prompts Lab",
      patch: {
        description: "Updated description",
        featured: true
      }
    }
  },
  
  // Valid add skill command
  {
    type: "add_skill",
    payload: {
      name: "Vue.js",
      iconName: "vue",
      colorClass: "text-green-500",
      category: "Frontend",
      level: 75
    }
  },
  
  // Valid no-op command
  {
    type: "noop",
    payload: {
      reason: "No changes needed"
    }
  },
  
  // Invalid command (missing required field)
  {
    type: "add_project",
    payload: {
      title: "", // Empty title should fail
      description: "Test"
    }
  }
];

console.log("🧪 Testing Command Validation...\n");

testCommands.forEach((testCmd, index) => {
  try {
    const validated = CommandSchema.parse(testCmd);
    console.log(`✅ Command ${index + 1}: VALID`);
    console.log(`   Summary: ${toUserFacingSummary(validated)}`);
    console.log(`   Category: ${getCommandCategory(validated)}`);
    console.log(`   Target File: ${getFileTargetForCommand(validated)}`);
    console.log(`   Destructive: ${isDestructiveCommand(validated)}`);
  } catch (error) {
    console.log(`❌ Command ${index + 1}: INVALID`);
    if (error instanceof Error) {
      console.log(`   Error: ${error.message}`);
    }
  }
  console.log("");
});

console.log("📋 Test Results Summary:");
console.log("- Valid commands should show summary, category, and target file");
console.log("- Invalid commands should show validation errors");
console.log("- Destructive commands (remove) should be flagged");