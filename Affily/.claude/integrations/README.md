# Jira Integration & Feature Intake Workflow

## 📋 Overview

This folder contains **Jira integration modules** to automate the feature intake workflow:

```
Request Feature → Analysis File → PRD + Design → Jira Tasks
    (Claude)        (Local)         (Local)       (Jira)
```

---

## 🗂️ Files

### 1. `jira-config.js`
Configuration file with Jira credentials and settings.

**Contains:**
- Jira URL, API version
- Authentication (username + password)
- Project key (SB)
- Issue types, workflow columns

### 2. `jira-client.js`
Jira API wrapper for REST API v2.

**Main Methods:**
- `createIssue()` - Create Epic/Story/Task
- `createSubtask()` - Create subtask
- `updateIssue()` - Update issue fields
- `addComment()` - Add comment to issue
- `searchIssues()` - Search by JQL
- `transitionIssue()` - Move between workflow states

### 3. `feature-intake-workflow.js`
Automation for the complete 3-stage feature intake process.

**Methods:**
- `stage1_createAnalysisFile()` - Generate analysis.md
- `stage2_createPRDandDesigns()` - Generate PRD + UI design files
- `stage3_createJiraTasks()` - Create Jira epic + stories + subtasks
- `createCompleteFeature()` - Run all 3 stages together

---

## 🔐 Security

⚠️ **IMPORTANT:**
- `jira-config.js` contains your Jira password - **NEVER commit to git**
- Add to `.gitignore`:
  ```
  .claude/integrations/jira-config.js
  ```
- Keep credentials safe and rotate password periodically

---

## 📖 Usage Examples

### Example 1: Test Connection

```javascript
const JiraClient = require('./jira-client');
const client = new JiraClient();

// Test
client.getCurrentUser().then(user => {
  console.log(`Connected as: ${user.displayName}`);
}).catch(err => console.error('Auth failed:', err));
```

### Example 2: Create Feature (All 3 Stages)

```javascript
const FeatureIntakeWorkflow = require('./feature-intake-workflow');
const workflow = new FeatureIntakeWorkflow();

workflow.createCompleteFeature({
  featureName: 'Affiliate Onboarding',

  // Stage 1: Analysis
  analysis: {
    problem: 'Current onboarding takes 15 min, should be <5 min',
    businessValue: 'Faster affiliate signup → more partners → more revenue',
    scope: 'Form simplification, auto-validation, progress indicator',
    constraints: 'Must work with Shopify oauth',
    dependencies: ['Shopify API', 'Database schema'],
    risks: 'API rate limits could delay data sync',
    acceptanceCriteria: 'Onboarding complete in <5 min without errors',
  },

  // Stage 2: PRD + Design
  prd: {
    overview: 'Streamlined affiliate onboarding flow',
    userStories: `
      - As a merchant, I want to quickly add affiliates with minimal info
      - As an affiliate, I want step-by-step guidance
    `,
    acceptanceCriteria: `
      Given merchant visits Affiliates page
      When clicks "Add Affiliate" button
      Then form appears with 3 required fields: name, email, commission rate
    `,
    architecture: 'Next.js form + Node.js API + PostgreSQL storage',
    apiEndpoints: 'POST /api/affiliates, GET /api/affiliates, PUT /api/affiliates/:id',
  },

  designs: {
    components: `
      <Card>
        <BlockStack gap="300">
          <TextField label="Name" />
          <TextField label="Email" type="email" />
          <TextField label="Commission %" type="number" />
          <Button onClick={handleSubmit}>Save</Button>
        </BlockStack>
      </Card>
    `,
    wireframes: 'Form with 3 fields, side-by-side layout',
  },

  // Stage 3: Jira Stories
  stories: [
    {
      title: 'Backend: Create affiliate API',
      description: 'POST /api/affiliates endpoint with validation',
      subtasks: [
        { title: 'Create DB schema', description: 'affiliates table' },
        { title: 'Add API route', description: 'Express endpoint' },
        { title: 'Add validation', description: 'Email, commission % validation' },
      ],
    },
    {
      title: 'Frontend: Affiliate form UI',
      description: 'Create form component with Polaris',
      subtasks: [
        { title: 'Build form component', description: 'TextField + Button' },
        { title: 'Add form validation', description: 'Client-side validation' },
        { title: 'Wire to API', description: 'Call POST /api/affiliates' },
      ],
    },
    {
      title: 'Testing: Affiliate onboarding flows',
      description: 'Test happy path and error cases',
      subtasks: [
        { title: 'Test happy path', description: 'Valid affiliate created' },
        { title: 'Test validation errors', description: 'Invalid email rejected' },
        { title: 'Test edge cases', description: 'Duplicate email, rate limits' },
      ],
    },
  ],
});
```

### Example 3: Create Just Jira Tasks

```javascript
const workflow = new FeatureIntakeWorkflow();

workflow.stage3_createJiraTasks({
  featureName: 'Commission Tracking',
  description: 'Real-time commission calculation and tracking dashboard',
  stories: [
    {
      title: 'Commission calculation engine',
      description: 'Calculate commissions based on rules',
      assignee: 'dev-lead',
      subtasks: [
        { title: 'Parse commission rules', description: 'From DB' },
        { title: 'Calculate per order', description: 'Apply rules' },
      ],
    },
  ],
});
```

---

## 🚀 Claude Integration

In your prompts, I can now:

1. **Automatically create Jira tasks** when you finalize a feature
2. **Update Jira** as development progresses
3. **Add comments** with status updates
4. **Link issues** together (epic → stories → subtasks)

### Prompt Example:

```
"Create a feature intake for [Feature Name]

Use the 3-stage workflow:
1. Analysis - research and understand requirements
2. PRD + Design - write detailed docs and UI mockups
3. Jira - create Epic + Stories + Subtasks

Context:
- Problem: [describe]
- Business value: [explain]
- Timeline: [when needed]
- Team: @docs/team/team-context.md
"
```

I will:
1. ✅ Create analysis.md (for your review)
2. ✅ Create PRD + design files (for your review)
3. ✅ Create Jira epic/stories (automatically linked)

---

## 🔗 Jira Connection Details

- **URL:** https://space.avada.net
- **API:** /rest/api/2/ (not v3)
- **Auth:** Basic auth with username + password
- **Project:** SB (Affily)
- **Board:** Sprint 50
- **User:** haidx (haidx@avada.io)

---

## ⚙️ Next Steps

1. ✅ Test connection:
   ```bash
   node -e "require('./jira-client').prototype.getCurrentUser.call(new (require('./jira-client'))()).then(console.log)"
   ```

2. ✅ Create your first feature intake
   ```bash
   node -e "const w = require('./feature-intake-workflow'); new w().createCompleteFeature({...})"
   ```

3. ✅ Check Jira - Epic should appear in project SB!

---

## 📞 Troubleshooting

**401 Unauthorized:**
- Check `jira-config.js` credentials
- Verify password hasn't expired
- Try updating password in Jira settings

**Connection timeout:**
- Check Jira URL is accessible
- Verify network/firewall rules
- Try accessing Jira in browser first

**Task creation fails:**
- Check project key (SB)
- Verify issue type exists
- Check field requirements

---

**Created:** 2026-03-09
**Last Updated:** 2026-03-09
**Status:** ✅ Ready to use

