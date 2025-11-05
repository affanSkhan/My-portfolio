/**
 * GitHub API integration for portfolio data management
 * Allows AI Assistant to commit changes directly to the repository
 */

interface GitHubFileResponse {
  name: string;
  path: string;
  sha: string;
  content: string;
  encoding: string;
}

interface GitHubCommitResponse {
  content: {
    name: string;
    path: string;
    sha: string;
  };
  commit: {
    sha: string;
    message: string;
  };
}

export class GitHubStorage {
  private token: string;
  private username: string;
  private repo: string;
  private branch: string;

  constructor() {
    this.token = process.env.GITHUB_TOKEN!;
    this.username = process.env.GITHUB_USERNAME!;
    this.repo = process.env.GITHUB_REPO!;
    this.branch = process.env.GITHUB_BRANCH || 'main';

    if (!this.token || !this.username || !this.repo) {
      throw new Error('Missing GitHub configuration. Please set GITHUB_TOKEN, GITHUB_USERNAME, and GITHUB_REPO environment variables.');
    }
  }

  /**
   * Read a JSON file from the GitHub repository
   */
  async readJson<T>(filename: string): Promise<T> {
    const path = `src/assistant_dev/data/${filename}`;
    
    try {
      const response = await fetch(
        `https://api.github.com/repos/${this.username}/${this.repo}/contents/${path}?ref=${this.branch}`,
        {
          headers: {
            'Authorization': `Bearer ${this.token}`,
            'Accept': 'application/vnd.github.v3+json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
      }

      const data: GitHubFileResponse = await response.json();
      const content = Buffer.from(data.content, 'base64').toString('utf-8');
      return JSON.parse(content);
    } catch (error) {
      throw new Error(`Failed to read ${filename} from GitHub: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Write a JSON file to the GitHub repository
   */
  async writeJson(filename: string, data: unknown, commitMessage?: string): Promise<void> {
    const path = `src/assistant_dev/data/${filename}`;
    const content = JSON.stringify(data, null, 2);
    const encodedContent = Buffer.from(content).toString('base64');
    
    try {
      // First, get the current file to obtain its SHA
      const getResponse = await fetch(
        `https://api.github.com/repos/${this.username}/${this.repo}/contents/${path}?ref=${this.branch}`,
        {
          headers: {
            'Authorization': `Bearer ${this.token}`,
            'Accept': 'application/vnd.github.v3+json',
          },
        }
      );

      let sha: string | undefined;
      if (getResponse.ok) {
        const existingFile: GitHubFileResponse = await getResponse.json();
        sha = existingFile.sha;
      }

      // Commit the updated file
      const commitResponse = await fetch(
        `https://api.github.com/repos/${this.username}/${this.repo}/contents/${path}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${this.token}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: commitMessage || `Update ${filename} via AI Assistant`,
            content: encodedContent,
            branch: this.branch,
            ...(sha && { sha }),
          }),
        }
      );

      if (!commitResponse.ok) {
        const errorText = await commitResponse.text();
        throw new Error(`GitHub commit failed: ${commitResponse.status} ${commitResponse.statusText}\n${errorText}`);
      }

      const result: GitHubCommitResponse = await commitResponse.json();
      console.log(`✅ Successfully committed ${filename} to GitHub:`, result.commit.sha);
    } catch (error) {
      throw new Error(`Failed to write ${filename} to GitHub: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Check if GitHub integration is properly configured
   */
  isConfigured(): boolean {
    return !!(this.token && this.username && this.repo);
  }

  /**
   * Get repository information
   */
  getRepoInfo() {
    return {
      username: this.username,
      repo: this.repo,
      branch: this.branch,
      configured: this.isConfigured(),
    };
  }
}

// Singleton instance
let githubStorage: GitHubStorage | null = null;

export function getGitHubStorage(): GitHubStorage {
  if (!githubStorage) {
    githubStorage = new GitHubStorage();
  }
  return githubStorage;
}