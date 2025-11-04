import { NextResponse } from "next/server";
import { readJson, writeJson } from "@/lib/fs-json";
import { Command } from "@/lib/commands";

export async function POST(req: Request) {
  try {
    const { filename, command, pin } = await req.json();
    
    // Check if running in production environment
    const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL || process.env.NETLIFY;
    
    if (isProduction) {
      return NextResponse.json(
        { 
          error: "AI Assistant commands are disabled in production. File writes not supported in serverless environments.",
          suggestion: "Commands work in development mode. Consider using a database for production."
        }, 
        { status: 503 }
      );
    }
    
    // Verify authentication
    const expectedPin = process.env.ASSISTANT_ADMIN_PIN || '1234';
    if (pin !== expectedPin) {
      return NextResponse.json(
        { error: "Unauthorized - Invalid PIN" }, 
        { status: 401 }
      );
    }

    // Execute command based on type
    switch (command.type) {
      case "add_skill":
        await handleAddSkill(command);
        break;
      case "update_skill":
        await handleUpdateSkill(command);
        break;
      case "remove_skill":
        await handleRemoveSkill(command);
        break;
      case "add_project":
        await handleAddProject(command);
        break;
      case "update_project":
        await handleUpdateProject(command);
        break;
      case "remove_project":
        await handleRemoveProject(command);
        break;
      case "update_about":
        await handleUpdateAbout(command);
        break;
      case "add_role":
        await handleAddRole(command);
        break;
      case "add_goal":
        await handleAddGoal(command);
        break;
      case "update_goals":
        await handleUpdateGoals(command);
        break;
      case "noop":
        return NextResponse.json({ 
          success: true, 
          message: "No operation performed"
        });
      default:
        return NextResponse.json(
          { error: `Unknown command type: ${(command as any).type}` },
          { status: 400 }
        );
    }

    return NextResponse.json({ 
      success: true, 
      message: "Command executed successfully"
    });
    
  } catch (error) {
    console.error("Command execution error:", error);
    return NextResponse.json(
      { error: `Failed to execute command: ${error instanceof Error ? error.message : 'Unknown error'}` }, 
      { status: 500 }
    );
  }
}

// === Skill Operations ===

async function handleAddSkill(command: Extract<Command, { type: "add_skill" }>) {
  const skills = await readJson<any[]>("skills.json");
  
  // Check if skill already exists
  const existingIndex = skills.findIndex(s => s.name.toLowerCase() === command.payload.name.toLowerCase());
  if (existingIndex !== -1) {
    throw new Error(`Skill "${command.payload.name}" already exists`);
  }
  
  skills.push(command.payload);
  await writeJson("skills.json", skills);
}

async function handleUpdateSkill(command: Extract<Command, { type: "update_skill" }>) {
  const skills = await readJson<any[]>("skills.json");
  
  const index = skills.findIndex(s => s.name === command.payload.matchName);
  if (index === -1) {
    throw new Error(`Skill "${command.payload.matchName}" not found`);
  }
  
  skills[index] = { ...skills[index], ...command.payload.patch };
  await writeJson("skills.json", skills);
}

async function handleRemoveSkill(command: Extract<Command, { type: "remove_skill" }>) {
  const skills = await readJson<any[]>("skills.json");
  
  const index = skills.findIndex(s => s.name === command.payload.matchName);
  if (index === -1) {
    throw new Error(`Skill "${command.payload.matchName}" not found`);
  }
  
  skills.splice(index, 1);
  await writeJson("skills.json", skills);
}

// === Project Operations ===

async function handleAddProject(command: Extract<Command, { type: "add_project" }>) {
  const projects = await readJson<any[]>("projects.json");
  
  // Check if project already exists
  const existingIndex = projects.findIndex(p => p.title.toLowerCase() === command.payload.title.toLowerCase());
  if (existingIndex !== -1) {
    throw new Error(`Project "${command.payload.title}" already exists`);
  }
  
  projects.push(command.payload);
  await writeJson("projects.json", projects);
}

async function handleUpdateProject(command: Extract<Command, { type: "update_project" }>) {
  const projects = await readJson<any[]>("projects.json");
  
  const index = projects.findIndex(p => p.title === command.payload.matchTitle);
  if (index === -1) {
    throw new Error(`Project "${command.payload.matchTitle}" not found`);
  }
  
  projects[index] = { ...projects[index], ...command.payload.patch };
  await writeJson("projects.json", projects);
}

async function handleRemoveProject(command: Extract<Command, { type: "remove_project" }>) {
  const projects = await readJson<any[]>("projects.json");
  
  const index = projects.findIndex(p => p.title === command.payload.matchTitle);
  if (index === -1) {
    throw new Error(`Project "${command.payload.matchTitle}" not found`);
  }
  
  projects.splice(index, 1);
  await writeJson("projects.json", projects);
}

// === About Operations ===

async function handleUpdateAbout(command: Extract<Command, { type: "update_about" }>) {
  const about = await readJson<any>("about.json");
  
  about[command.payload.field] = command.payload.value;
  await writeJson("about.json", about);
}

async function handleAddRole(command: Extract<Command, { type: "add_role" }>) {
  const about = await readJson<any>("about.json");
  
  if (!about.roles) {
    about.roles = [];
  }
  
  // Check if role already exists
  if (about.roles.includes(command.payload.role)) {
    throw new Error(`Role "${command.payload.role}" already exists`);
  }
  
  about.roles.push(command.payload.role);
  await writeJson("about.json", about);
}

// === Goals Operations ===

async function handleAddGoal(command: Extract<Command, { type: "add_goal" }>) {
  const goals = await readJson<any>("goals.json");
  
  if (!goals[command.payload.type]) {
    goals[command.payload.type] = [];
  }
  
  goals[command.payload.type].push(command.payload.goal);
  await writeJson("goals.json", goals);
}

async function handleUpdateGoals(command: Extract<Command, { type: "update_goals" }>) {
  const goals = await readJson<any>("goals.json");
  
  goals[command.payload.field] = command.payload.value;
  await writeJson("goals.json", goals);
}