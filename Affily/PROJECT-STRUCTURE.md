# Affily Project Structure - Complete Guide

Your optimal folder structure has been created at: `e:/claude AI/Affily/`

## 📁 Folder Overview

```
Affily/
│
├── 📄 CLAUDE.md
│   └─ Global context for Claude (your role, project, preferences)
│
├── 📁 docs/
│   ├── requirements/        ← All feature requirements live here
│   │   ├── template-user-story.md
│   │   ├── README.md
│   │   ├── core-features.md
│   │   ├── shopify-integration.md
│   │   └── [your feature files]
│   │
│   ├── architecture/        ← Technical design & architecture
│   │   ├── README.md
│   │   ├── system-overview.md
│   │   ├── api-endpoints.md
│   │   └── database-schema.md
│   │
│   ├── team/                ← Team context & coordination
│   │   └── team-context.md
│   │
│   └── mvp/                 ← MVP scope & constraints
│       ├── scope.md
│       ├── priorities.md (add this yourself)
│       └── roadmap.md (add this yourself)
│
├── 📁 .claude/
│   └── memory/
│       ├── MEMORY.md        ← Persistent memory for Claude
│       ├── agents-setup.md  ← Your 3 agents guide
│       ├── po-claude.md
│       ├── designer-claude.md
│       ├── tester-claude.md
│       │
│       └── ba-workflows/    ← BA workflow templates
│           ├── decision-log.md
│           ├── requirement-gathering-checklist.md
│           └── feature-planning-template.md
│
└── 📁 current-project/      ← Active work items
    ├── feature-[name]/
    │   ├── requirements.md
    │   ├── design-notes.md
    │   ├── test-plan.md
    │   └── status.md
    │
    └── README.md
```

---

## 🚀 Quick Start

### 1. Update CLAUDE.md (Your Global Context)
Open `CLAUDE.md` and fill in:
- [ ] Team member names & skills (in team context)
- [ ] Your communication preferences
- [ ] Any project-specific notes

### 2. Fill in docs/team/team-context.md
Add your team information:
- [ ] Developer names & skills
- [ ] Tester name & specialty
- [ ] Communication channels
- [ ] Team capacity

### 3. Fill in docs/mvp/scope.md
Define MVP scope:
- [ ] MVP launch date
- [ ] P0 features (critical)
- [ ] P1 features (important)
- [ ] Known risks & blockers

### 4. Start Using!
- For each new feature → Create folder in `current-project/`
- For requirements → Use `docs/requirements/`
- For decisions → Log in `.claude/memory/ba-workflows/decision-log.md`

---

## 📖 How to Use With Claude

### Quick Pattern: Reference Files

Instead of copy/pasting, reference files directly:

```
"Review @docs/requirements/affiliate-onboarding.md
and @docs/architecture/api-endpoints.md

Identify conflicts between requirements and architecture."
```

### Recommended: Use Templates

For new features, follow this pattern:

```
"Create feature plan for [feature name]

Use template: @.claude/memory/ba-workflows/feature-planning-template.md

Context:
- Team capacity: [X hours this sprint]
- Timeline: [When needed]
- Stakeholders: [Who]

Provide:
1. Requirement breakdown
2. Implementation plan
3. Risk assessment"
```

### Pro Tip: Ask Claude to Update Your Files

```
"Update @docs/mvp/scope.md to mark these features as P0:
- [Feature 1]
- [Feature 2]

Explain the business rationale."
```

---

## 💡 Best Practices

### ✅ DO
- [ ] Reference files using `@path/file.md` format
- [ ] Keep requirements in `docs/requirements/`
- [ ] Log all decisions in `decision-log.md`
- [ ] Update `status.md` as work progresses
- [ ] Use templates for consistency
- [ ] Share folder paths with team: `@docs/...` or `@current-project/...`

### ❌ DON'T
- [ ] Keep requirements scattered across multiple places
- [ ] Forget to update decision log
- [ ] Let decisions slip without documentation
- [ ] Copy/paste everything into chat (use `@file` references instead)
- [ ] Skip templates (they ensure consistency)

---

## 🎯 Workflow Steps

### When Starting a New Feature:

1. **Gather Requirements**
   - Use: `@.claude/memory/ba-workflows/requirement-gathering-checklist.md`
   - Create: `@docs/requirements/feature-name.md`

2. **Plan the Feature**
   - Use: `@.claude/memory/ba-workflows/feature-planning-template.md`
   - Create: `@current-project/feature-name/`

3. **Share with Team**
   - Reference: `@current-project/feature-name/requirements.md`
   - Share with devs for estimation

4. **Track Progress**
   - Update: `@current-project/feature-name/status.md`
   - Log decision: `@.claude/memory/ba-workflows/decision-log.md`

5. **Coordinate Across Roles**
   - Use agents: "Hãy đóng vai [PO/Designer/Tester]"
   - Or reference files: `@current-project/feature-name/`

---

## 📞 How to Ask Claude (Examples)

### Example 1: Gather Requirements
```
"I need to gather requirements for affiliate onboarding feature.

Context:
- Merchants are complaining it's too complicated
- Current process takes 15 minutes per affiliate
- We want to reduce to <5 minutes

Use: @.claude/memory/ba-workflows/requirement-gathering-checklist.md

Help me:
1. Define what 'easy onboarding' means
2. Write user stories
3. Create acceptance criteria"
```

### Example 2: Plan a Feature
```
"Plan the commission tracking feature.

Context: @docs/requirements/commission-tracking.md
Team: @docs/team/team-context.md

Use template: @.claude/memory/ba-workflows/feature-planning-template.md

Provide:
1. Detailed implementation breakdown
2. Which tasks are parallelizable?
3. Risk assessment
4. Timeline estimate"
```

### Example 3: Get Multiple Perspectives
```
"Hãy dùng /agents để lấy perspectives từ:
- PO: Business rationale
- Designer: UX approach
- Tester: Testing strategy

Feature: Commission auto-calculation

Files: @docs/requirements/, @docs/architecture/"
```

---

## 🔄 Regular Maintenance

### Weekly
- [ ] Update sprint progress in `@current-project/feature-x/status.md`
- [ ] Add new decisions to `decision-log.md`

### Sprint End
- [ ] Mark completed features as Done
- [ ] Review scope vs. actual progress
- [ ] Update `docs/mvp/roadmap.md` if needed

### Monthly
- [ ] Review decisions in `decision-log.md`
- [ ] Update team context if things changed
- [ ] Check if any archived decisions need resurrection

---

## 📍 Quick Navigation

| Need | Where |
|---|---|
| Write requirement | `@docs/requirements/` |
| Understand architecture | `@docs/architecture/` |
| Know team info | `@docs/team/team-context.md` |
| Check MVP scope | `@docs/mvp/scope.md` |
| Log decision | `@.claude/memory/ba-workflows/decision-log.md` |
| Plan feature | `@.claude/memory/ba-workflows/feature-planning-template.md` |
| Track progress | `@current-project/feature-name/status.md` |

---

**Created:** 2026-03-07
**Owner:** Roger (BA)
**Ready to use:** ✅ Yes

Next step: Fill in your team info & start using!
