import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { validateCommand, executeCommand } from '@/assistant_dev/lib/commands';
import { readJson } from '@/assistant_dev/lib/fs-json';

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

export async function POST(request: NextRequest) {
  try {
    const { message, isPrivate } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Get portfolio context
    const portfolioContext = await getPortfolioContext();

    // Create system prompt based on mode
    const systemPrompt = isPrivate 
      ? createPrivateSystemPrompt(portfolioContext)
      : createPublicSystemPrompt(portfolioContext);

    // Generate response from Gemini
    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: systemPrompt }],
        },
        {
          role: 'model',
          parts: [{ text: 'I understand. I\'m ready to help!' }],
        },
      ],
    });

    const result = await chat.sendMessage(message);
    const response = result.response.text();

    // If private mode, try to extract and execute commands
    if (isPrivate) {
      const commands = extractCommands(response);
      const executionResults = [];

      for (const commandText of commands) {
        try {
          const command = JSON.parse(commandText);
          const validation = validateCommand(command);
          
          if (validation.success) {
            const result = await executeCommand(validation.data);
            executionResults.push(result);
          }
        } catch {
          // Command parsing failed, skip
        }
      }

      return NextResponse.json({ 
        response,
        executionResults: executionResults.length > 0 ? executionResults : undefined
      });
    }

    return NextResponse.json({ response });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
}

async function getPortfolioContext() {
  try {
    const [about, skills, projects, goals] = await Promise.all([
      readJson('about.json').catch(() => ({})),
      readJson('skills.json').catch(() => ({})),
      readJson('projects.json').catch(() => ({})),
      readJson('goals.json').catch(() => ({})),
    ]);

    return { about, skills, projects, goals };
  } catch {
    return { about: {}, skills: {}, projects: {}, goals: {} };
  }
}

function createPublicSystemPrompt(context: Record<string, unknown>) {
  const { about, skills, projects } = context;
  
  // Safely extract projects array
  const projectsArray = Array.isArray(projects) ? projects.slice(0, 3) : projects;

  return `You are Affan Ahmed's AI assistant. You can answer questions about Affan's background, skills, and projects.

Current Portfolio Information:
${JSON.stringify({ about, skills, projects: projectsArray }, null, 2)}

Guidelines:
- Be friendly and professional
- Provide accurate information based on the portfolio data
- If asked about something not in the data, politely say you don't have that information
- Don't mention technical implementation details
- Focus on Affan's achievements and capabilities`;
}

function createPrivateSystemPrompt(context: Record<string, unknown>) {
  return `You are Affan Ahmed's portfolio management assistant. You can read and modify portfolio data.

Current Portfolio Data:
${JSON.stringify(context, null, 2)}

You can execute commands to modify the portfolio. Available commands:
- add_project: Add new project
- update_project: Modify existing project  
- remove_project: Delete project
- add_skill: Add new skill
- update_skill: Modify existing skill
- remove_skill: Delete skill
- update_about: Modify about section
- update_goals: Modify goals/vision

To execute a command, include it in your response as a JSON code block:
\`\`\`json
{
  "type": "add_project",
  "data": {
    "title": "New Project",
    "description": "Project description"
  }
}
\`\`\`

Always explain what you're doing and confirm the changes.`;
}

function extractCommands(text: string): string[] {
  const codeBlockRegex = /```json\s*([\s\S]*?)\s*```/g;
  const commands: string[] = [];
  let match;

  while ((match = codeBlockRegex.exec(text)) !== null) {
    commands.push(match[1].trim());
  }

  return commands;
}