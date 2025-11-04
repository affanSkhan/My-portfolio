# Affan Assistant Development

## 🎯 Overview
This directory contains the isolated development environment for the Affan Assistant feature - a dual-mode AI chatbot for the portfolio built on the latest production codebase.

## 📁 Structure
```
assistant_dev/
├── chat/           # Chat UI components (Phase 2)
├── lib/            # Utility functions and command schemas (Phase 5)
├── app/api/        # API routes for chat and content management (Phases 3-4)
└── data/           # Centralized JSON data files ✅
    ├── about.json     # Personal information and roles
    ├── skills.json    # Technical skills with levels and categories
    ├── projects.json  # Portfolio projects with metadata
    └── goals.json     # Career goals, vision, and values
```

## 🚀 Development Workflow
1. ✅ **Phase 1 - Data Layer** (CURRENT)
2. 🔄 Phase 2 - Chat UI 
3. 🔄 Phase 3 - Auth (PIN)
4. 🔄 Phase 4 - Content API
5. 🔄 Phase 5 - Command Types
6. 🔄 Phase 6 - Chat API (Gemini)
7. 🔄 Phase 7 - Wire UI to Data
8. 🔄 Phase 8 - Guardrails & Polish
9. 🔄 Phase 9 - Deploy & Test

## 🔒 Environment
- Uses `.env.assistant` for isolated development
- Runs on feature branch `feature/affan-assistant`
- Safe testing without affecting main portfolio

## 📊 Data Layer (Phase 1) ✅
All content is centralized in JSON files based on production data:
- **about.json**: 11 roles, personal info, contact details
- **skills.json**: 25 skills with levels, categories, and icon mappings
- **projects.json**: 6 featured projects with complete metadata
- **goals.json**: Short/long-term goals, vision, values, and mission

### Benefits:
- ✅ Easy AI assistant editing in private mode
- ✅ Type safety and validation ready
- ✅ Clean separation of content and UI
- ✅ API-ready structure for future phases
- ✅ Based on actual production content

## 🧪 Testing
Run development server:
```bash
npm run dev
# Data files ready for import/API consumption
```

## 📝 Next Steps
Ready for **Phase 2 - Chat UI (floating widget)** implementation.