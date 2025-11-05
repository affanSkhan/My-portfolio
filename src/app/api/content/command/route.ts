import { NextResponse } from "next/server";
import { readJson, writeJson } from "@/lib/fs-json";
import { Command } from "@/assistant_dev/lib/commands";

export async function POST(req: Request) {
  try {
    const { filename, command, pin } = await req.json();
    
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
      case "reorder_projects":
        await handleReorderProjects(command);
        break;
      case "adaptive_sort_projects":
        await handleAdaptiveSortProjects(command);
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
  const commitMessage = `Add skill: ${command.payload.name} (${command.payload.category}, ${command.payload.level}%) via AI Assistant`;
  await writeJson("skills.json", skills, commitMessage);
}

async function handleUpdateSkill(command: Extract<Command, { type: "update_skill" }>) {
  const skills = await readJson<any[]>("skills.json");
  
  const index = skills.findIndex(s => s.name === command.payload.matchName);
  if (index === -1) {
    throw new Error(`Skill "${command.payload.matchName}" not found`);
  }
  
  skills[index] = { ...skills[index], ...command.payload.patch };
  const updateFields = Object.keys(command.payload.patch).join(", ");
  const commitMessage = `Update skill: ${command.payload.matchName} (${updateFields}) via AI Assistant`;
  await writeJson("skills.json", skills, commitMessage);
}

async function handleRemoveSkill(command: Extract<Command, { type: "remove_skill" }>) {
  const skills = await readJson<any[]>("skills.json");
  
  const index = skills.findIndex(s => s.name === command.payload.matchName);
  if (index === -1) {
    throw new Error(`Skill "${command.payload.matchName}" not found`);
  }
  
  skills.splice(index, 1);
  const commitMessage = `Remove skill: ${command.payload.matchName} via AI Assistant`;
  await writeJson("skills.json", skills, commitMessage);
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
  const commitMessage = `Add project: ${command.payload.title} (${command.payload.stack.join(", ")}) via AI Assistant`;
  await writeJson("projects.json", projects, commitMessage);
}

async function handleUpdateProject(command: Extract<Command, { type: "update_project" }>) {
  const projects = await readJson<any[]>("projects.json");
  
  const index = projects.findIndex(p => p.title === command.payload.matchTitle);
  if (index === -1) {
    throw new Error(`Project "${command.payload.matchTitle}" not found`);
  }
  
  projects[index] = { ...projects[index], ...command.payload.patch };
  const updateFields = Object.keys(command.payload.patch).join(", ");
  const commitMessage = `Update project: ${command.payload.matchTitle} (${updateFields}) via AI Assistant`;
  await writeJson("projects.json", projects, commitMessage);
}

async function handleRemoveProject(command: Extract<Command, { type: "remove_project" }>) {
  const projects = await readJson<any[]>("projects.json");
  
  const index = projects.findIndex(p => p.title === command.payload.matchTitle);
  if (index === -1) {
    throw new Error(`Project "${command.payload.matchTitle}" not found`);
  }
  
  projects.splice(index, 1);
  const commitMessage = `Remove project: ${command.payload.matchTitle} via AI Assistant`;
  await writeJson("projects.json", projects, commitMessage);
}

async function handleReorderProjects(command: Extract<Command, { type: "reorder_projects" }>) {
  const projects = await readJson<any[]>("projects.json");
  
  let reorderedProjects = [...projects];
  
  switch (command.payload.strategy) {
    case "featured_first":
      reorderedProjects.sort((a, b) => {
        // Featured projects first, then by year (newest first)
        if (a.featured !== b.featured) return b.featured - a.featured;
        return (b.year || 0) - (a.year || 0);
      });
      break;
      
    case "by_year_desc":
      reorderedProjects.sort((a, b) => (b.year || 0) - (a.year || 0));
      break;
      
    case "by_year_asc":
      reorderedProjects.sort((a, b) => (a.year || 0) - (b.year || 0));
      break;
      
    case "by_tech_stack":
      reorderedProjects.sort((a, b) => {
        // Sort by number of technologies (more tech first), then by year
        const aTechCount = a.stack?.length || 0;
        const bTechCount = b.stack?.length || 0;
        if (aTechCount !== bTechCount) return bTechCount - aTechCount;
        return (b.year || 0) - (a.year || 0);
      });
      break;
      
    case "by_status":
      reorderedProjects.sort((a, b) => {
        const statusOrder = { 'completed': 3, 'in-progress': 2, 'planning': 1 };
        const aStatus = statusOrder[a.status as keyof typeof statusOrder] || 0;
        const bStatus = statusOrder[b.status as keyof typeof statusOrder] || 0;
        if (aStatus !== bStatus) return bStatus - aStatus;
        return (b.year || 0) - (a.year || 0);
      });
      break;
      
    case "custom_order":
      if (command.payload.customOrder) {
        const orderMap = new Map(command.payload.customOrder.map((title, index) => [title, index]));
        reorderedProjects.sort((a, b) => {
          const aOrder = orderMap.get(a.title) ?? 999;
          const bOrder = orderMap.get(b.title) ?? 999;
          return aOrder - bOrder;
        });
      }
      break;
      
    default:
      throw new Error(`Unknown reorder strategy: ${command.payload.strategy}`);
  }
  
  const strategyDescription = command.payload.description || `strategy: ${command.payload.strategy}`;
  const commitMessage = `Reorder projects (${strategyDescription}) via AI Assistant`;
  await writeJson("projects.json", reorderedProjects, commitMessage);
}

async function handleAdaptiveSortProjects(command: Extract<Command, { type: "adaptive_sort_projects" }>) {
  const projects = await readJson<any[]>("projects.json");
  
  let sortedProjects = [...projects];
  let reasoning = command.payload.reasoning || "";
  
  // AI-powered adaptive sorting based on intent
  switch (command.payload.intent) {
    case "prioritize_specific_project":
      if (command.payload.targetProject) {
        const targetIndex = sortedProjects.findIndex(p => 
          p.title.toLowerCase() === command.payload.targetProject!.toLowerCase() ||
          p.title.toLowerCase().includes(command.payload.targetProject!.toLowerCase())
        );
        
        if (targetIndex !== -1) {
          // Move target project to first position
          const targetProject = sortedProjects.splice(targetIndex, 1)[0];
          sortedProjects.unshift(targetProject);
          reasoning = `Moved "${targetProject.title}" to first position as requested`;
        } else {
          throw new Error(`Project "${command.payload.targetProject}" not found`);
        }
      }
      break;
      
    case "prioritize_category":
      const categoryKeywords = getCategoryKeywords(command.payload.category || "ai_ml");
      
      sortedProjects.sort((a, b) => {
        const aScore = calculateCategoryScore(a, categoryKeywords);
        const bScore = calculateCategoryScore(b, categoryKeywords);
        
        if (aScore !== bScore) return bScore - aScore; // Higher score first
        return (b.year || 0) - (a.year || 0); // Then by year
      });
      
      reasoning = `Prioritized ${command.payload.category} projects based on content analysis`;
      break;
      
    case "prioritize_technology":
      if (command.payload.technologies && command.payload.technologies.length > 0) {
        sortedProjects.sort((a, b) => {
          const aTechScore = calculateTechScore(a, command.payload.technologies!);
          const bTechScore = calculateTechScore(b, command.payload.technologies!);
          
          if (aTechScore !== bTechScore) return bTechScore - aTechScore;
          return (b.year || 0) - (a.year || 0);
        });
        
        reasoning = `Prioritized projects using: ${command.payload.technologies.join(", ")}`;
      }
      break;
      
    case "prioritize_by_keywords":
      if (command.payload.keywords && command.payload.keywords.length > 0) {
        sortedProjects.sort((a, b) => {
          const aKeywordScore = calculateKeywordScore(a, command.payload.keywords!);
          const bKeywordScore = calculateKeywordScore(b, command.payload.keywords!);
          
          if (aKeywordScore !== bKeywordScore) return bKeywordScore - aKeywordScore;
          return (b.year || 0) - (a.year || 0);
        });
        
        reasoning = `Prioritized by keywords: ${command.payload.keywords.join(", ")}`;
      }
      break;
      
    case "custom_adaptive_sort":
      // This allows for more complex AI-driven sorting logic
      sortedProjects.sort((a, b) => {
        // Combine multiple factors: featured status, tech complexity, year
        const aComplexityScore = (a.stack?.length || 0) + (a.featured ? 10 : 0);
        const bComplexityScore = (b.stack?.length || 0) + (b.featured ? 10 : 0);
        
        if (aComplexityScore !== bComplexityScore) return bComplexityScore - aComplexityScore;
        return (b.year || 0) - (a.year || 0);
      });
      
      reasoning = "Applied custom adaptive sorting based on project complexity and features";
      break;
      
    default:
      throw new Error(`Unknown adaptive sort intent: ${command.payload.intent}`);
  }
  
  const commitMessage = `Adaptive sort projects: ${command.payload.intent} - ${reasoning} via AI Assistant`;
  await writeJson("projects.json", sortedProjects, commitMessage);
}

// Helper functions for adaptive sorting
function getCategoryKeywords(category: string): string[] {
  const keywords: Record<string, string[]> = {
    ai_ml: ["ai", "artificial intelligence", "machine learning", "ml", "neural", "prediction", "model", "algorithm", "tensorflow", "pytorch", "scikit", "data science", "analytics"],
    data_science: ["data", "analytics", "pipeline", "etl", "warehouse", "bigquery", "sql", "pandas", "numpy", "visualization", "dashboard", "insights"],
    web_development: ["web", "website", "next.js", "react", "html", "css", "javascript", "typescript", "frontend", "backend", "full stack"],
    mobile_development: ["mobile", "app", "flutter", "react native", "ios", "android", "dart", "swift", "kotlin"],
    backend: ["api", "server", "database", "backend", "node.js", "python", "express", "rest", "graphql"],
    full_stack: ["full stack", "frontend", "backend", "database", "api", "web app"],
    cloud_computing: ["cloud", "aws", "gcp", "azure", "docker", "kubernetes", "deployment", "hosting"],
    automation: ["automation", "workflow", "pipeline", "ci/cd", "deployment", "orchestration", "airflow"]
  };
  
  return keywords[category] || [];
}

function calculateCategoryScore(project: any, keywords: string[]): number {
  let score = 0;
  const searchText = `${project.title} ${project.description} ${project.stack?.join(" ") || ""}`.toLowerCase();
  
  keywords.forEach(keyword => {
    if (searchText.includes(keyword.toLowerCase())) {
      score += keyword.length > 3 ? 2 : 1; // Longer keywords get higher weight
    }
  });
  
  // Bonus for featured projects
  if (project.featured) score += 5;
  
  return score;
}

function calculateTechScore(project: any, technologies: string[]): number {
  let score = 0;
  const projectTech = project.stack?.map((tech: string) => tech.toLowerCase()) || [];
  
  technologies.forEach(tech => {
    if (projectTech.some((pTech: string) => pTech.includes(tech.toLowerCase()))) {
      score += 3;
    }
  });
  
  return score;
}

function calculateKeywordScore(project: any, keywords: string[]): number {
  let score = 0;
  const searchText = `${project.title} ${project.description}`.toLowerCase();
  
  keywords.forEach(keyword => {
    const matches = (searchText.match(new RegExp(keyword.toLowerCase(), 'g')) || []).length;
    score += matches * 2;
  });
  
  return score;
}

// === About Operations ===

async function handleUpdateAbout(command: Extract<Command, { type: "update_about" }>) {
  const about = await readJson<any>("about.json");
  
  about[command.payload.field] = command.payload.value;
  const commitMessage = `Update about ${command.payload.field}: "${command.payload.value}" via AI Assistant`;
  await writeJson("about.json", about, commitMessage);
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
  const commitMessage = `Add role: "${command.payload.role}" via AI Assistant`;
  await writeJson("about.json", about, commitMessage);
}

// === Goals Operations ===

async function handleAddGoal(command: Extract<Command, { type: "add_goal" }>) {
  const goals = await readJson<any>("goals.json");
  
  if (!goals[command.payload.type]) {
    goals[command.payload.type] = [];
  }
  
  goals[command.payload.type].push(command.payload.goal);
  const commitMessage = `Add ${command.payload.type} goal: "${command.payload.goal}" via AI Assistant`;
  await writeJson("goals.json", goals, commitMessage);
}

async function handleUpdateGoals(command: Extract<Command, { type: "update_goals" }>) {
  const goals = await readJson<any>("goals.json");
  
  goals[command.payload.field] = command.payload.value;
  const commitMessage = `Update goals ${command.payload.field}: "${command.payload.value}" via AI Assistant`;
  await writeJson("goals.json", goals, commitMessage);
}