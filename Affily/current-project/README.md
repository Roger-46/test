# Current Projects

This folder contains the features/work items being actively developed.

## Folder Structure

Each project/feature gets its own folder:

```
current-project/
├── feature-affiliate-onboarding/
│   ├── requirements.md
│   ├── design-notes.md
│   ├── test-plan.md
│   └── status.md
│
├── feature-commission-tracking/
│   ├── requirements.md
│   ├── design-notes.md
│   ├── test-plan.md
│   └── status.md
│
└── README.md
```

## Files in Each Feature Folder

### requirements.md
- User stories
- Acceptance criteria
- Business rationale
- Dependencies

### design-notes.md
- User flows
- Mockups/wireframes
- Design decisions
- UX notes

### test-plan.md
- Test cases
- Edge cases
- Test scenarios
- Performance criteria

### status.md
- Current status (Planning/In Progress/Testing/Done)
- Progress checklist
- Blockers/issues
- Timeline

## How to Use

1. **When starting a feature:**
   - Create new folder: `feature-[name]/`
   - Copy templates from @docs/requirements/template-user-story.md
   - Fill in requirements.md

2. **During development:**
   - Update status.md with progress
   - Share with team via folder reference: @current-project/feature-x/

3. **When done:**
   - Mark as Done in status.md
   - Move folder to archive (or just leave for reference)

## Example Status File Content

```markdown
# Status: Affiliate Onboarding Feature

## Current Status
- **Phase:** In Progress
- **Started:** 2026-03-05
- **Expected Done:** 2026-03-19
- **Owner:** Dev Lead + QA

## Progress
- [ ] Requirements gathering (100% - Done)
- [ ] Design (75% - In progress)
- [ ] Backend implementation (50% - In progress)
- [ ] Frontend implementation (10%)
- [ ] QA Testing (0%)
- [ ] Deployment (0%)

## Blockers
- Waiting on Shopify API documentation (due 2026-03-08)

## Recent Updates
- 2026-03-07: Design phase started, first mockups completed
- 2026-03-06: Requirements signed off by stakeholders
```

---

Created: 2026-03-07
