/**
 * Feature Intake Workflow
 * Automates: Analysis → PRD → UI Design → Jira Task Creation
 */

const JiraClient = require("./jira-client");
const config = require("./jira-config");

class FeatureIntakeWorkflow {
  constructor() {
    this.jira = new JiraClient();
  }

  /**
   * Stage 1: Create Analysis File (Local)
   * Output: e:/Roger/Affily/current-project/feature-[name]/analysis.md
   */
  async stage1_createAnalysisFile({ featureName, analysis }) {
    const fileName = `feature-${featureName.toLowerCase().replace(/\s+/g, "-")}`;
    const filePath = `e:/Roger/Affily/current-project/${fileName}/analysis.md`;

    const content = `# Feature Analysis: ${featureName}

## Problem Statement
${analysis.problem || "[TBD]"}

## Business Value
${analysis.businessValue || "[TBD]"}

## Scope
${analysis.scope || "[TBD]"}

## Constraints
${analysis.constraints || "[TBD]"}

## Dependencies
${analysis.dependencies || "[None]"}

## Risks & Mitigation
${analysis.risks || "[TBD]"}

## Acceptance Criteria (Draft)
${analysis.acceptanceCriteria || "[TBD]"}

---
**Status:** Analysis Phase
**Created:** ${new Date().toISOString()}
**Next Step:** Review & Finalize, then proceed to Stage 2 (PRD + UI)
`;

    return { fileName, filePath, content };
  }

  /**
   * Stage 2: Create PRD + Docs + UI Mockup (Local)
   * Output: Multiple files
   */
  async stage2_createPRDandDesigns({ featureName, prd, designs }) {
    const fileName = `feature-${featureName.toLowerCase().replace(/\s+/g, "-")}`;
    const baseFolder = `e:/Roger/Affily/current-project/${fileName}`;

    const files = {
      prd: {
        path: `${baseFolder}/prd.md`,
        content: `# PRD: ${featureName}

## Overview
${prd.overview || "[TBD]"}

## User Stories
${prd.userStories || "[TBD]"}

## Acceptance Criteria
${prd.acceptanceCriteria || "[TBD]"}

## Technical Architecture
${prd.architecture || "[TBD]"}

## API Endpoints
${prd.apiEndpoints || "[TBD]"}

## Database Schema
${prd.schema || "[TBD]"}

---
**Status:** PRD Phase
**Created:** ${new Date().toISOString()}
`,
      },
      design: {
        path: `${baseFolder}/ui-design.md`,
        content: `# UI Design: ${featureName}

## Polaris Components
\`\`\`jsx
${designs.components || "// Polaris component code here"}
\`\`\`

## Wireframes
${designs.wireframes || "[ASCII mockups or descriptions]"}

## User Flows
${designs.flows || "[TBD]"}

---
**Status:** Design Phase
**Created:** ${new Date().toISOString()}
`,
      },
      docs: {
        path: `${baseFolder}/technical-docs.md`,
        content: `# Technical Documentation: ${featureName}

## Implementation Guide
${prd.implementation || "[TBD]"}

## Testing Strategy
${prd.testing || "[TBD]"}

## Deployment Checklist
${prd.deployment || "[TBD]"}

---
**Status:** Documentation Phase
**Created:** ${new Date().toISOString()}
`,
      },
    };

    return { fileName, baseFolder, files };
  }

  /**
   * Stage 3: Create Jira Tasks (Epic + Stories + Subtasks)
   */
  async stage3_createJiraTasks({
    featureName,
    description,
    stories = [],
    assignee = null,
  }) {
    try {
      // Create Epic
      const epicResponse = await this.jira.createIssue({
        summary: `[Epic] ${featureName}`,
        description: description || featureName,
        issueType: "Epic",
        assignee,
        labels: ["affily", "mvp"],
      });

      const epicKey = epicResponse.key;
      console.log(`✅ Epic created: ${epicKey}`);

      // Create Stories + Subtasks
      const taskResults = {
        epic: epicKey,
        stories: [],
      };

      for (const story of stories) {
        const storyResponse = await this.jira.createIssue({
          summary: story.title,
          description: story.description,
          issueType: "Story",
          assignee: story.assignee || assignee,
          labels: ["affily"],
        });

        const storyKey = storyResponse.key;
        console.log(`✅ Story created: ${storyKey}`);

        // Link to Epic (via comment for now, or custom field)
        await this.jira.addComment(
          storyKey,
          `Part of epic: ${epicKey}`
        );

        // Create subtasks
        const subtaskResults = [];
        if (story.subtasks) {
          for (const subtask of story.subtasks) {
            const subtaskResponse = await this.jira.createSubtask({
              parentIssueKey: storyKey,
              summary: subtask.title,
              description: subtask.description,
              assignee: subtask.assignee,
            });

            subtaskResults.push(subtaskResponse.key);
            console.log(`  ✅ Subtask: ${subtaskResponse.key}`);
          }
        }

        taskResults.stories.push({
          key: storyKey,
          title: story.title,
          subtasks: subtaskResults,
        });
      }

      return taskResults;
    } catch (error) {
      console.error("❌ Error creating Jira tasks:", error);
      throw error;
    }
  }

  /**
   * Helper: Create Complete Feature Workflow (All 3 Stages)
   */
  async createCompleteFeature({ featureName, analysis, prd, designs, stories }) {
    console.log(`\n🚀 Starting Feature Intake Workflow: ${featureName}\n`);

    // Stage 1
    console.log("📝 Stage 1: Creating Analysis File...");
    const stage1 = await this.stage1_createAnalysisFile({
      featureName,
      analysis,
    });
    console.log(`   Path: ${stage1.filePath}`);

    // Stage 2
    console.log("\n📋 Stage 2: Creating PRD + Designs...");
    const stage2 = await this.stage2_createPRDandDesigns({
      featureName,
      prd,
      designs,
    });
    console.log(`   Folder: ${stage2.baseFolder}`);
    Object.entries(stage2.files).forEach(([type, file]) => {
      console.log(`   - ${type}: ${file.path}`);
    });

    // Stage 3
    console.log("\n🎯 Stage 3: Creating Jira Tasks...");
    const stage3 = await this.stage3_createJiraTasks({
      featureName,
      description: prd.overview,
      stories,
    });
    console.log(`   Epic: ${stage3.epic}`);
    stage3.stories.forEach((s) => {
      console.log(`   - Story: ${s.key} - ${s.title}`);
      s.subtasks.forEach((st) => {
        console.log(`      - Subtask: ${st}`);
      });
    });

    console.log("\n✅ Feature Intake Complete!\n");

    return { stage1, stage2, stage3 };
  }
}

module.exports = FeatureIntakeWorkflow;
