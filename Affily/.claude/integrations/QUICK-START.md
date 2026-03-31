# Jira + Feature Intake Workflow - Quick Start

## 🚀 How to Use (3 Steps)

### Step 1: Request a Feature
```
"Hãy create feature intake cho [Feature Name]

Problem: [What's wrong?]
Business Value: [Why build this?]
Timeline: [When needed?]
Team: [Who's working on it?]"
```

### Step 2: Review & Approve
I will:
1. ✅ Create **analysis.md** (research + findings)
2. ✅ Create **prd.md** (detailed requirements)
3. ✅ Create **ui-design.md** (Polaris mockups)

You review each file, then say: **"Chốt cái này"** when ready.

### Step 3: Push to Jira
I will automatically:
1. ✅ Create **Epic** in Jira (feature overview)
2. ✅ Create **Stories** (breakdown into tasks)
3. ✅ Create **Subtasks** (implementation details)
4. ✅ Link everything in Jira

Team picks up tasks from Jira!

---

## 📝 Example: Real Feature Request

### Your Request:
```
"Create feature intake cho Affiliate Onboarding

Problem: Current process takes 15 min per affiliate
Business Value: Faster signup → more partners → more commission
Timeline: Day 2 của MVP
Team: Frontend dev + Backend dev
```

### What I Do:

#### 📋 Stage 1: Analysis (Auto-created)
```
e:/Roger/Affily/current-project/feature-affiliate-onboarding/analysis.md
```

Contains: Problem, business value, scope, constraints, dependencies, risks

#### 📄 Stage 2: PRD + Design (Auto-created)
```
e:/Roger/Affily/current-project/feature-affiliate-onboarding/
├── prd.md                 # Requirements + User Stories + AC
├── ui-design.md          # Polaris components + wireframes
└── technical-docs.md     # Architecture + Testing plan
```

#### 🎯 Stage 3: Jira Tasks (Auto-created)
```
Jira Epic: [Epic] Affiliate Onboarding
├─ Story: Backend - Create affiliate API
│  ├─ Subtask: Design DB schema
│  ├─ Subtask: Create Express endpoint
│  └─ Subtask: Add validation
├─ Story: Frontend - Affiliate form
│  ├─ Subtask: Build Polaris form
│  ├─ Subtask: Add validation
│  └─ Subtask: Wire to API
└─ Story: QA - Test onboarding flows
   ├─ Subtask: Happy path test
   ├─ Subtask: Validation error test
   └─ Subtask: Edge case test
```

---

## 🎯 Key Prompts

### Create New Feature
```
"Tạo feature intake cho [Feature Name]

Context:
- Problem: [Describe issue]
- Business value: [Why important?]
- MVP priority: [P0/P1/P2]
- Timeline: [When?]

Use: @.claude/integrations/ for Jira automation"
```

### Review & Approve
```
"Chốt cái này"
or
"Approve rồi, đẩy lên Jira"
or
"Update [file] thêm..."
```

### Skip to Jira (Already Have PRD)
```
"Đẩy lên Jira luôn

Feature: [Name]
Epic description: [...]
Stories:
- [Story 1]
- [Story 2]
- [Story 3]"
```

---

## 📊 File Organization

```
e:/Roger/Affily/
├── .claude/integrations/
│   ├── jira-config.js              ← Jira credentials
│   ├── jira-client.js              ← API wrapper
│   ├── feature-intake-workflow.js  ← Automation
│   └── README.md                   ← Full documentation
│
└── current-project/
    ├── feature-affiliate-onboarding/
    │   ├── analysis.md              ← Stage 1
    │   ├── prd.md                  ← Stage 2
    │   ├── ui-design.md            ← Stage 2
    │   ├── technical-docs.md       ← Stage 2
    │   └── status.md               ← Progress tracking
    │
    └── feature-commission-tracking/
        └── [same structure]
```

---

## ✅ Workflow Checklist

For each new feature:

- [ ] **Stage 1 - Analysis**
  - [ ] Create analysis.md
  - [ ] Roger reviews
  - [ ] Roger approves

- [ ] **Stage 2 - PRD + Design**
  - [ ] Create prd.md, ui-design.md, technical-docs.md
  - [ ] Roger reviews each file
  - [ ] Roger approves design

- [ ] **Stage 3 - Jira**
  - [ ] Create Epic in Jira
  - [ ] Create Stories in Jira
  - [ ] Create Subtasks
  - [ ] Verify links in Jira
  - [ ] Team picks up stories

---

## 💡 Pro Tips

1. **Keep PRD files simple** - They're for team clarity, not perfection
2. **Use Polaris components** - Code is ready for dev to copy-paste
3. **Estimate early** - Add story points when creating in Jira
4. **Link to docs** - Add file paths in Jira comments for reference
5. **Update status.md** - Track progress as dev works

---

## 🔗 Quick Links

- **Integration Module:** `@.claude/integrations/README.md`
- **Feature Template:** `@.claude/memory/ba-workflows/feature-planning-template.md`
- **Requirement Writer:** `@.claude/skills/skill-requirement-writer/`
- **Current Projects:** `@current-project/`

---

**Ready?** Just ask me to create your first feature intake! 🚀

```
"Tạo feature intake cho [Feature Name]..."
```
