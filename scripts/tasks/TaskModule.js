// ============================================
// Task Class
// ============================================

/**
 * Task entity class
 */
export class Task {
  constructor(title, description = "", priority = "medium", dueDate = null) {
    this.id =
      "TASK_" + Date.now() + "_" + Math.random().toString(36).substr(2, 8);
    this.title = title;
    this.description = description;
    this.priority = priority; // 'low', 'medium', 'high', 'critical'
    this.dueDate = dueDate ? new Date(dueDate) : null;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.completed = false;
    this.completedAt = null;
    this.tags = [];
    this.category = "General";
  }

  /**
   * Mark task as completed
   */
  complete() {
    this.completed = true;
    this.completedAt = new Date();
    this.updatedAt = new Date();
  }

  /**
   * Mark task as incomplete
   */
  reopen() {
    this.completed = false;
    this.completedAt = null;
    this.updatedAt = new Date();
  }

  /**
   * Update task details
   */
  update(updates) {
    Object.assign(this, updates);
    this.updatedAt = new Date();
  }

  /**
   * Add tag to task
   */
  addTag(tag) {
    if (!this.tags.includes(tag)) {
      this.tags.push(tag);
      this.updatedAt = new Date();
    }
  }

  /**
   * Remove tag from task
   */
  removeTag(tag) {
    const index = this.tags.indexOf(tag);
    if (index !== -1) {
      this.tags.splice(index, 1);
      this.updatedAt = new Date();
    }
  }

  /**
   * Get task status
   */
  getStatus() {
    return {
      id: this.id,
      title: this.title,
      completed: this.completed,
      priority: this.priority,
      dueDate: this.dueDate,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  /**
   * Get formatted task info
   */
  getInfo() {
    const status = this.completed ? "✅" : "⭕";
    const priorityIcon = {
      low: "🔵",
      medium: "🟢",
      high: "🟠",
      critical: "🔴",
    };

    const dueDateStr = this.dueDate
      ? `Due: ${this.dueDate.toLocaleDateString()}`
      : "No due date";

    const tagsStr = this.tags.length > 0 ? `Tags: ${this.tags.join(", ")}` : "";

    return (
      `${status} ${priorityIcon[this.priority] || "⚪"} ${this.title} ` +
      `[${dueDateStr}] ${tagsStr}`.trim()
    );
  }
}
