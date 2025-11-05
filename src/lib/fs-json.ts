import { promises as fs } from "fs";
import path from "path";
import { getGitHubStorage } from "./github-storage";

// Detect if we should use GitHub (production) or local files (development)
const shouldUseGitHub = () => {
  const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL || process.env.NETLIFY;
  const hasGitHubConfig = process.env.GITHUB_TOKEN && process.env.GITHUB_USERNAME && process.env.GITHUB_REPO;
  return isProduction && hasGitHubConfig;
};

/**
 * Reads a JSON file from the assistant_dev/data directory
 * In production: reads from GitHub repository
 * In development: reads from local file system
 * @param name - The filename (e.g., "about.json", "projects.json")
 * @returns Parsed JSON data
 */
export async function readJson<T>(name: string): Promise<T> {
  if (shouldUseGitHub()) {
    const github = getGitHubStorage();
    return github.readJson<T>(name);
  }

  // Local file system (development)
  const file = path.join(process.cwd(), "src", "assistant_dev", "data", name);
  const raw = await fs.readFile(file, "utf-8");
  return JSON.parse(raw);
}

/**
 * Writes JSON data to a file in the assistant_dev/data directory
 * In production: commits to GitHub repository  
 * In development: writes to local file system
 * @param name - The filename (e.g., "about.json", "projects.json")
 * @param data - The data to write
 * @param commitMessage - Optional commit message for GitHub
 */
export async function writeJson(name: string, data: unknown, commitMessage?: string): Promise<void> {
  if (shouldUseGitHub()) {
    const github = getGitHubStorage();
    return github.writeJson(name, data, commitMessage);
  }

  // Local file system (development)
  const file = path.join(process.cwd(), "src", "assistant_dev", "data", name);
  const raw = JSON.stringify(data, null, 2);
  await fs.writeFile(file, raw, "utf-8");
}

/**
 * Validates if a filename is allowed for read/write operations
 * @param filename - The filename to validate
 * @returns True if the file is allowed
 */
export function isAllowedFile(filename: string): boolean {
  const allowed = ["about.json", "skills.json", "projects.json", "goals.json", "journey.json"];
  return allowed.includes(filename);
}