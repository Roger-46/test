/**
 * Jira Configuration
 * ⚠️ PRIVATE: Don't commit to git
 */

module.exports = {
  // Jira Server Information
  jira: {
    url: "https://space.avada.net",
    apiVersion: "2",  // v2 (not v3)
    projectKey: "SB",
  },

  // Authentication
  auth: {
    username: "haidx",
    password: "Avada@123",
    // Base64 encoded: haidx:Avada@123
    basicAuth: "aGFpZHg6QXZhZGFAMTIz",
  },

  // Jira Project Settings
  project: {
    key: "SB",
    name: "Affily",
  },

  // Issue Types & Fields
  issueTypes: {
    epic: "Epic",
    story: "Story",
    task: "Task",
    subtask: "Sub-task",
  },

  // Custom Fields (adjust based on your Jira setup)
  customFields: {
    // Components: [{ "name": "Affily" }]
    // Labels: ["affily", "mvp", "feature"]
  },

  // Board Settings
  board: {
    rapidViewId: 10026,  // From your URL: ?rapidView=10026
  },

  // Workflow Columns
  workflow: {
    TODO: "To Do",
    DOING: "In Progress",
    WAITING_TEST: "Waiting to Test",
    TEST_STAGING: "Test Staging",
    WAITING_REVIEW: "Waiting for Review",
    REVIEWING: "Reviewing",
    DONE: "Done",
  },
};
