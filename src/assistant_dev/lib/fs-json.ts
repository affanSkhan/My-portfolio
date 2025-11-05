import { promises as fs } from "fs";
import path from "path";

/**
 * Reads a JSON file from the assistant_dev/data directory
 * @param name - The filename (e.g., "about.json", "projects.json")
 * @returns Parsed JSON data
 */
export async function readJson<T>(name: string): Promise<T> {
  const file = path.join(process.cwd(), "src", "assistant_dev", "data", name);
  const raw = await fs.readFile(file, "utf-8");
  return JSON.parse(raw);
}

/**
 * Writes JSON data to a file in the assistant_dev/data directory
 * @param name - The filename (e.g., "about.json", "projects.json")
 * @param data - The data to write
 */
export async function writeJson(name: string, data: unknown): Promise<void> {
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