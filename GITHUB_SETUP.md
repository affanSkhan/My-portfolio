# 🚀 GitHub-Based AI Assistant Setup Guide

This guide explains how to set up your AI Assistant to work in production using GitHub as the storage backend.

## 🔑 Step 1: Create GitHub Personal Access Token

1. Go to **[GitHub Settings > Developer Settings > Personal Access Tokens](https://github.com/settings/tokens)**
2. Click **"Generate new token (classic)"**
3. Configure the token:
   - **Name**: `affan-portfolio-ai-assistant`
   - **Expiration**: Choose your preferred duration
   - **Scopes**: Select the following:
     - ✅ `repo` (Full control of private repositories)
     - ✅ `workflow` (Optional - for triggering deployments)

4. Click **"Generate token"**
5. **Copy the token immediately** - it starts with `ghp_` and you'll only see it once

## 🔧 Step 2: Update Environment Variables

### For Local Development (`.env.assistant`):
```bash
GEMINI_API_KEY=your_gemini_api_key_here
ASSISTANT_ADMIN_PIN=1234
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# GitHub Integration
GITHUB_TOKEN=ghp_your_token_here
GITHUB_USERNAME=affanSkhan
GITHUB_REPO=My-portfolio
GITHUB_BRANCH=feature/affan-assistant
```

### For Production (Netlify/Vercel Environment Variables):
Add these in your hosting platform's dashboard:

| Variable Name | Value |
|---------------|-------|
| `GITHUB_TOKEN` | `ghp_your_token_here` |
| `GITHUB_USERNAME` | `affanSkhan` |
| `GITHUB_REPO` | `My-portfolio` |
| `GITHUB_BRANCH` | `main` (or your production branch) |
| `ASSISTANT_ADMIN_PIN` | `1234` |
| `GEMINI_API_KEY` | `your_gemini_api_key` |

## 🧠 How It Works

```
User Command → AI Assistant → GitHub API → Automatic Deployment
     ↓              ↓             ↓              ↓
"Add project"  → JSON Command → Commit to Repo → Site Rebuilds
```

### Development Mode (Local):
- Reads from: `src/assistant_dev/data/*.json` (local files)
- Writes to: Local files directly
- Perfect for testing and development

### Production Mode (Netlify/Vercel):
- Reads from: GitHub repository via API
- Writes to: GitHub repository (creates commits)
- Triggers automatic redeployment

## ✅ Step 3: Test the Integration

### Local Testing:
1. Update your `.env.assistant` with the GitHub token
2. Start development server: `npm run dev` or `bun --env-file=.env.assistant run dev`
3. Go to Private Mode and try: "Add skill React Native with 75% proficiency"
4. Check your GitHub repository - you should see a new commit!

### Production Testing:
1. Deploy your changes to your hosting platform
2. Set the environment variables in your hosting dashboard
3. Visit your live site and test the AI Assistant
4. Commands will now commit directly to your repository

## 🔄 Benefits of This Approach

| Benefit | Description |
|---------|-------------|
| 🗂️ **Version Control** | Every AI edit is a commit with clear messages |
| 🤖 **Automatic Deployment** | Changes trigger rebuilds automatically |
| 👥 **Collaboration Ready** | You can still edit JSON files manually |
| 📈 **Audit Trail** | Complete history of who changed what and when |
| 🔧 **No Database Needed** | Uses GitHub as a free, reliable backend |
| 🔐 **Secure** | Token-based authentication with scope limits |

## 🎯 Example Commit Messages

When the AI Assistant makes changes, you'll see commits like:
- `Add skill: TypeScript (Frontend, 90%) via AI Assistant`
- `Add project: Smart Yoga Mat (Flutter, Firebase) via AI Assistant`
- `Update project: CIE Exam App (description, status) via AI Assistant`
- `Remove skill: Outdated Framework via AI Assistant`

## 🛡️ Security Best Practices

1. **Never commit your `.env.assistant` file** - it's already in `.gitignore`
2. **Use fine-grained tokens** when available (currently in beta)
3. **Regularly rotate your GitHub token** (every 6-12 months)
4. **Monitor your repository** for unexpected commits
5. **Limit token scope** to only necessary permissions

## 🚨 Troubleshooting

### Token Issues:
- **403 Forbidden**: Check token permissions and expiration
- **404 Not Found**: Verify repository name and branch
- **401 Unauthorized**: Token might be expired or invalid

### Environment Issues:
- **Local works, production doesn't**: Check environment variables are set
- **Commits not appearing**: Verify branch name and token permissions
- **Deployment not triggering**: Check your hosting platform's webhook settings

### File Issues:
- **File not found**: Ensure the file exists in the repository
- **Merge conflicts**: Resolve conflicts manually and redeploy

## 🎉 Success!

Once set up, your AI Assistant will:
- ✅ Work in both development and production
- ✅ Create meaningful commit messages
- ✅ Trigger automatic deployments
- ✅ Maintain full version control
- ✅ Allow manual edits alongside AI edits

Your portfolio is now truly dynamic and production-ready! 🚀