/**
 * Jira API Client
 * Wrapper for Jira REST API v2
 */

const https = require("https");
const config = require("./jira-config");

class JiraClient {
  constructor() {
    this.baseUrl = config.jira.url;
    this.auth = Buffer.from(
      `${config.auth.username}:${config.auth.password}`
    ).toString("base64");
  }

  /**
   * Make HTTP request to Jira API
   */
  async request(method, path, body = null) {
    return new Promise((resolve, reject) => {
      const url = new URL(`${this.baseUrl}/rest/api/${config.jira.apiVersion}${path}`);

      const options = {
        method,
        headers: {
          Authorization: `Basic ${this.auth}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };

      const req = https.request(url, options, (res) => {
        let data = "";

        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", () => {
          try {
            if (res.statusCode >= 200 && res.statusCode < 300) {
              resolve(JSON.parse(data || "{}"));
            } else {
              reject({
                statusCode: res.statusCode,
                message: data,
              });
            }
          } catch (e) {
            reject(e);
          }
        });
      });

      req.on("error", reject);

      if (body) {
        req.write(JSON.stringify(body));
      }

      req.end();
    });
  }

  /**
   * Get current user info
   */
  async getCurrentUser() {
    return this.request("GET", "/myself");
  }

  /**
   * Get project info
   */
  async getProject(projectKey = config.project.key) {
    return this.request("GET", `/project/${projectKey}`);
  }

  /**
   * Create new issue (Epic/Story/Task)
   */
  async createIssue({
    summary,
    description,
    issueType = "Story",
    projectKey = config.project.key,
    assignee = null,
    labels = [],
    components = [],
  }) {
    const body = {
      fields: {
        project: { key: projectKey },
        summary,
        description,
        issuetype: { name: issueType },
        labels,
      },
    };

    if (components.length > 0) {
      body.fields.components = components.map((c) => ({ name: c }));
    }

    if (assignee) {
      body.fields.assignee = { name: assignee };
    }

    return this.request("POST", "/issue", body);
  }

  /**
   * Create subtask
   */
  async createSubtask({
    parentIssueKey,
    summary,
    description = "",
    assignee = null,
  }) {
    const body = {
      fields: {
        project: { key: config.project.key },
        parent: { key: parentIssueKey },
        summary,
        description,
        issuetype: { name: "Sub-task" },
      },
    };

    if (assignee) {
      body.fields.assignee = { name: assignee };
    }

    return this.request("POST", "/issue", body);
  }

  /**
   * Update issue
   */
  async updateIssue(issueKey, fields = {}) {
    const body = { fields };
    return this.request("PUT", `/issue/${issueKey}`, body);
  }

  /**
   * Add comment to issue
   */
  async addComment(issueKey, comment) {
    const body = { body: comment };
    return this.request("POST", `/issue/${issueKey}/comment`, body);
  }

  /**
   * Get issue
   */
  async getIssue(issueKey) {
    return this.request("GET", `/issue/${issueKey}`);
  }

  /**
   * Search issues by JQL
   */
  async searchIssues(jql) {
    return this.request("GET", `/search?jql=${encodeURIComponent(jql)}`);
  }

  /**
   * Transition issue (move between workflow states)
   */
  async transitionIssue(issueKey, transitionId) {
    const body = { transition: { id: transitionId } };
    return this.request("POST", `/issue/${issueKey}/transitions`, body);
  }

  /**
   * Get available transitions for an issue
   */
  async getTransitions(issueKey) {
    return this.request("GET", `/issue/${issueKey}/transitions`);
  }
}

module.exports = JiraClient;
