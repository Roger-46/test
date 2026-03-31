# Full BA Workflow - Complete End-to-End Process (Affily)

Complete workflow từ feature request → team pickup & execution dành cho dự án Affily.

---

## 📋 Full BA Workflow Overview

```
1. INTAKE          2. ANALYSIS        3. DESIGN          4. JIRA            5. HANDOFF
┌─────────────┐   ┌──────────────┐   ┌──────────────┐   ┌─────────────┐   ┌────────────┐
│ Request     │ → │ Research &   │ → │ PRD + UI     │ → │ Create      │ → │ Team       │
│ Feature     │   │ Analysis     │   │ Mockups      │   │ Jira Tasks  │   │ Pickup     │
└─────────────┘   └──────────────┘   └──────────────┘   └─────────────┘   └────────────┘
  Roger tells       Claude researches  Claude designs    Claude creates    Devs & QA
  Claude what      & understands       & documents       Epic+Stories      work on tasks
  to build         problem deeply      with visuals      in Jira
```

---

## 🔄 Detailed Workflow Steps

### **Stage 1: INTAKE** (5-10 min)

Roger provides:
```
"Tạo feature intake cho [Feature Name]

Problem: [What's wrong/missing?]
Business Value: [Why build this?]
MVP Priority: [P0/P1/P2]
Timeline: [When needed?]
Team: [Who's working on it?]

Scope:
- [Key requirement 1]
- [Key requirement 2]
- [Key requirement 3]

Dependencies: [What's needed first?]
Constraints: [Limitations?]
"
```

**Output:** Feature request logged
**Time:** 5-10 minutes

---

### **Stage 2: ANALYSIS** (30-60 min)

Claude:
- ✅ Research the problem deeply
- ✅ Understand business context
- ✅ Identify edge cases
- ✅ Map dependencies
- ✅ Assess risks
- ✅ Create `analysis.md` file

**File created:** `current-project/feature-[name]/analysis.md`

**Contents:**
```markdown
# Feature Analysis: [Feature Name]

## Problem Statement
[Deep understanding of the problem]

## Business Value
[Why this matters]

## Scope
[What's in/out]

## Constraints
[Limitations & requirements]

## Dependencies
[What else is needed]

## Risks & Mitigation
[Potential issues + solutions]

## Edge Cases
[Unusual scenarios to handle]

## Preliminary AC
[Draft acceptance criteria]
```

**Roger reviews:** ✅ Approve or request changes
**Time:** 30-60 minutes

---

### **Stage 3: DESIGN** (60-90 min)

Claude:
- ✅ Write detailed PRD (Product Requirements Document)
- ✅ Create UI mockups using Polaris components
- ✅ Document technical architecture
- ✅ Write testing strategy
- ✅ Create implementation guide

**Files created:**
```
current-project/feature-[name]/
├── prd.md                    # Product Requirements
├── ui-design.md              # Polaris UI mockups
├── technical-docs.md         # Architecture & implementation
└── test-plan.md              # Testing strategy
```

**PRD Contents:**
```markdown
# PRD: [Feature Name]

## Executive Summary
[Overview for stakeholders]

## User Stories
As a [user], I want [action], so that [benefit]
...

## Acceptance Criteria
Given [context]
When [action]
Then [result]

## User Flows
[Step-by-step workflows]

## Technical Architecture
[System design]

## API Endpoints
[REST endpoints needed]

## Database Schema
[Data models]

## Performance Requirements
[SLA, latency, throughput]

## Security Considerations
[Authorization, data protection]

## Success Metrics
[How to measure success]
```

**UI Design Contents:**
```markdown
# UI Design: [Feature Name]

## Polaris Components

### Form Section
\`\`\`jsx
<Card>
  <BlockStack gap="300">
    <TextField label="..." />
    <Select options={...} />
    <Button onClick={...}>Save</Button>
  </BlockStack>
</Card>
\`\`\`

## User Flow
[Step-by-step screenshots/descriptions]

## Responsive Design
[Mobile/tablet/desktop considerations]

## Accessibility
[A11y requirements]
```

**Roger reviews:** ✅ Approve or request changes
**Time:** 60-90 minutes

---

### **Stage 4: JIRA CREATION** (15-30 min)

Claude automatically:
- ✅ Creates Epic in Jira (feature overview)
- ✅ Creates Stories (breakdown into deliverables)
- ✅ Creates Subtasks (implementation details)
- ✅ Links all documentation
- ✅ Sets priority & estimates

**Jira Structure:**
```
Epic: [Feature Name] (Feature overview)
├─ Story 1: Backend - API Implementation
│  ├─ Subtask: Design DB schema
│  ├─ Subtask: Create API endpoint
│  ├─ Subtask: Add validation
│  └─ Subtask: Write tests
│
├─ Story 2: Frontend - UI Implementation
│  ├─ Subtask: Build form component
│  ├─ Subtask: Wire to API
│  ├─ Subtask: Add error handling
│  └─ Subtask: Style & polish
│
└─ Story 3: QA - Testing & Validation
   ├─ Subtask: Test happy path
   ├─ Subtask: Test error cases
   ├─ Subtask: Performance testing
   └─ Subtask: Security review
```

**Time:** 15-30 minutes (automated)

---

### **Stage 5: HANDOFF** (5 min)

Claude:
- ✅ Posts summary of feature in Jira
- ✅ Links to all documentation files
- ✅ Sets team expectations
- ✅ Marks Epic as "Ready for Development"

**Team sees:**
- ✅ Clear Epic with all requirements
- ✅ Breakdown into Stories
- ✅ Links to design & docs
- ✅ Defined test cases
- ✅ Clear acceptance criteria

**Dev picks up:** ⏳ Assigns Story to self
**Time:** 5 minutes

---

## 📊 Full Timeline per Feature

| Stage | Owner | Time | Output |
|-------|-------|------|--------|
| Intake | Roger | 5-10 min | Feature request |
| Analysis | Claude | 30-60 min | analysis.md |
| Review 1 | Roger | 10-20 min | Feedback/approval |
| Design | Claude | 60-90 min | PRD + UI + Docs |
| Review 2 | Roger | 10-20 min | Feedback/approval |
| Jira Creation | Claude | 15-30 min | Epic + Stories + Subtasks |
| **TOTAL** | **-** | **~2.5-3 hours** | **Ready for dev** |

---

## 🚀 Day-by-Day Example: Affiliate Onboarding Feature (Affily MVP)

### **Day 1 - Morning (9:00 AM)**
Roger: "Tạo feature intake cho Affiliate Onboarding..."
Claude: Starting analysis phase

### **Day 1 - Afternoon (2:00 PM)**
Claude: ✅ analysis.md created
Roger: ✅ Reviews & approves

### **Day 1 - Evening (4:00 PM)**
Claude: Starting design phase

### **Day 2 - Morning (9:00 AM)**
Claude: ✅ PRD + UI + Docs created
Roger: ✅ Reviews & approves

### **Day 2 - Afternoon (2:00 PM)**
Claude: ✅ Jira Epic + Stories created (SB-XXXX)
Team: ✅ Picks up stories from Jira

### **Day 2 - EOD**
Dev 1: Assigned to Backend story
Dev 2: Assigned to Frontend story
QA: Assigned to Testing story

---

## 💡 Key Principles

### 1. **Clarity Over Perfection**
- Requirements should be clear enough for dev to understand
- Not perfect, but good enough to code
- Dev can ask questions if needed

### 2. **Parallelization**
- Multiple stories can be worked in parallel
- Subtasks can be parallelized if dependencies allow
- Different team members work simultaneously

### 3. **Documentation as Source of Truth**
- PRD is the reference
- All decisions logged in decision-log
- Jira tasks link back to docs

### 4. **Quick Feedback Loops**
- Roger reviews & gives feedback quickly
- Claude iterates based on feedback
- No delays = faster development

### 5. **Autonomy with Guidance**
- Dev has authority to make implementation decisions
- But must follow PRD requirements
- QA validates against AC (Acceptance Criteria)

---

## 🔧 Tools Used

| Tool | Purpose |
|------|---------|
| **Memory/Docs** | Store analysis, PRD, designs |
| **Jira** | Track tasks, assign, monitor progress |
| **Claude** | Research, write docs, create tasks |
| **Polaris** | Design components consistently |

---

## ✅ Quality Checklist per Feature

Before handing to team:

- [ ] Analysis is thorough (problem, scope, risks understood)
- [ ] PRD has clear acceptance criteria (Given/When/Then)
- [ ] UI mockups use Polaris components
- [ ] Architecture is documented
- [ ] Dependencies are identified
- [ ] Test cases are defined
- [ ] Jira Epic links to all documentation
- [ ] Stories are sized appropriately (not too big, not too small)
- [ ] Subtasks have clear acceptance criteria
- [ ] Team has no ambiguity about requirements

---

## 📈 Metrics to Track

**Per Feature:**
- Time from intake → Jira creation
- Number of clarifications needed
- Development time (actual vs estimated)
- QA test cases passed on first try

**Per Sprint:**
- Features completed
- Bugs found in QA (should be low)
- Team velocity
- Documentation quality score

---

## 🎯 Success Criteria

A feature is **successfully completed** when:
1. ✅ All acceptance criteria met
2. ✅ QA tests pass (no blockers)
3. ✅ Performance meets requirements
4. ✅ No security issues
5. ✅ Documentation updated
6. ✅ Released to production

---

## 🔄 Continuous Improvement

After each feature:
- Roger + Claude review what worked
- Update this workflow if needed
- Log learnings in daily activity log
- Improve templates based on feedback

---

## 📞 When to Use Different Paths

### Full Path (All 5 stages)
- New features
- Complex features
- Team hasn't seen similar feature

### Fast Path (Skip analysis, go straight to design)
- Similar to recent feature
- Roger already knows the requirements well
- Time-critical feature

### Custom Path (Mix stages)
- Depends on situation
- Adjust as needed
- Document deviations

---

## 📝 Files Structure

```
current-project/
├── feature-affiliate-onboarding/
│   ├── analysis.md          ← Stage 2
│   ├── prd.md               ← Stage 3
│   ├── ui-design.md         ← Stage 3
│   ├── technical-docs.md    ← Stage 3
│   ├── test-plan.md         ← Stage 3
│   ├── jira-link.md         ← Stage 4 (Epic key: SB-XXXX)
│   └── status.md            ← Progress tracking
│
└── feature-commission-tracking/
    └── [same structure]
```

---

## 🚀 Ready?

**Roger can now:**
1. Request a feature anytime
2. Claude handles all 5 stages automatically
3. Team gets clear, well-documented Epic + Stories
4. Development starts immediately

**Time to market:** ~2.5-3 hours per feature from intake → Jira ready!

---

**Version:** 1.0
**Created:** 2026-03-14
**Project:** Affily MVP
**Status:** ✅ Active
