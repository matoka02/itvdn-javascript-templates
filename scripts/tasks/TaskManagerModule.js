// ============================================
// TaskManager Singleton Class
// ============================================

import { Task } from "./TaskModule.js";

/**
 * Task Manager Singleton
 * Ensures only one instance of task manager exists
 */
class TaskManager {
  /**
   * Private constructor - use getInstance() instead
   * @private
   */
  constructor() {
    this.tasks = new Map();
    this.categories = new Set([
      "General",
      "Work",
      "Personal",
      "Study",
      "Shopping",
    ]);
    this.filters = {
      showCompleted: true,
      priority: null,
      category: null,
      searchQuery: "",
    };
    this.sortOrder = "newest";
    this.stats = {
      totalTasks: 0,
      completedTasks: 0,
      activeTasks: 0,
      overdueTasks: 0,
      highPriorityTasks: 0,
    };

    console.log("📋 TaskManager instance created");
  }

  /**
   * Get singleton instance
   * @returns {TaskManager} - Single instance of TaskManager
   */
  static getInstance() {
    if (!TaskManager.instance) {
      TaskManager.instance = new TaskManager();
    }
    return TaskManager.instance;
  }

  /**
   * Create a new task
   * @param {string} title - Task title
   * @param {Object} options - Additional task options
   * @returns {Task} - Created task
   */
  createTask(title, options = {}) {
    if (!title || typeof title !== "string") {
      throw new Error("Task title is required");
    }

    const task = new Task(
      title,
      options.description || "",
      options.priority || "medium",
      options.dueDate || null,
    );

    if (options.category) {
      this.addCategory(options.category);
      task.category = options.category;
    }

    if (options.tags && Array.isArray(options.tags)) {
      options.tags.forEach((tag) => task.addTag(tag));
    }

    this.tasks.set(task.id, task);
    this.updateStats();

    console.log(`✅ Task created: "${task.title}" (${task.id})`);
    return task;
  }

  /**
   * Get task by ID
   * @param {string} taskId - Task ID
   * @returns {Task|null} - Task or null if not found
   */
  getTask(taskId) {
    return this.tasks.get(taskId) || null;
  }

  /**
   * Get all tasks
   * @param {Object} filters - Optional filters
   * @returns {Array} - Array of tasks
   */
  getAllTasks(filters = {}) {
    let tasks = Array.from(this.tasks.values());

    // Apply filters
    if (filters.showCompleted === false) {
      tasks = tasks.filter((task) => !task.completed);
    }

    if (filters.priority) {
      tasks = tasks.filter((task) => task.priority === filters.priority);
    }

    if (filters.category) {
      tasks = tasks.filter((task) => task.category === filters.category);
    }

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      tasks = tasks.filter(
        (task) =>
          task.title.toLowerCase().includes(query) ||
          task.description.toLowerCase().includes(query),
      );
    }

    if (filters.tags && filters.tags.length > 0) {
      tasks = tasks.filter((task) =>
        filters.tags.some((tag) => task.tags.includes(tag)),
      );
    }

    // Apply sorting
    const sortOrder = filters.sortOrder || this.sortOrder;
    tasks.sort((a, b) => {
      switch (sortOrder) {
        case "newest":
          return b.createdAt - a.createdAt;
        case "oldest":
          return a.createdAt - b.createdAt;
        case "dueDate":
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return a.dueDate - b.dueDate;
        case "priority":
          const priorityWeight = { critical: 4, high: 3, medium: 2, low: 1 };
          return priorityWeight[b.priority] - priorityWeight[a.priority];
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return b.createdAt - a.createdAt;
      }
    });

    return tasks;
  }

  /**
   * Update task
   * @param {string} taskId - Task ID
   * @param {Object} updates - Updates to apply
   * @returns {Task|null} - Updated task or null
   */
  updateTask(taskId, updates) {
    const task = this.tasks.get(taskId);

    if (!task) {
      console.log(`❌ Task not found: ${taskId}`);
      return null;
    }

    task.update(updates);
    this.updateStats();

    console.log(`✏️ Task updated: "${task.title}"`);
    return task;
  }

  /**
   * Delete task
   * @param {string} taskId - Task ID
   * @returns {boolean} - Success status
   */
  deleteTask(taskId) {
    const task = this.tasks.get(taskId);

    if (!task) {
      console.log(`❌ Task not found: ${taskId}`);
      return false;
    }

    this.tasks.delete(taskId);
    this.updateStats();

    console.log(`🗑️ Task deleted: "${task.title}"`);
    return true;
  }

  /**
   * Complete task
   * @param {string} taskId - Task ID
   * @returns {Task|null} - Completed task or null
   */
  completeTask(taskId) {
    const task = this.tasks.get(taskId);

    if (!task) {
      console.log(`❌ Task not found: ${taskId}`);
      return null;
    }

    task.complete();
    this.updateStats();

    console.log(`✅ Task completed: "${task.title}"`);
    return task;
  }

  /**
   * Reopen task
   * @param {string} taskId - Task ID
   * @returns {Task|null} - Reopened task or null
   */
  reopenTask(taskId) {
    const task = this.tasks.get(taskId);

    if (!task) {
      console.log(`❌ Task not found: ${taskId}`);
      return null;
    }

    task.reopen();
    this.updateStats();

    console.log(`🔄 Task reopened: "${task.title}"`);
    return task;
  }

  /**
   * Add new category
   * @param {string} category - Category name
   */
  addCategory(category) {
    if (category && !this.categories.has(category)) {
      this.categories.add(category);
      console.log(`📁 Category added: ${category}`);
    }
  }

  /**
   * Get all categories
   * @returns {Array} - Array of categories
   */
  getCategories() {
    return Array.from(this.categories);
  }

  /**
   * Get all unique tags from tasks
   * @returns {Array} - Array of tags
   */
  getAllTags() {
    const tags = new Set();
    this.tasks.forEach((task) => {
      task.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }

  /**
   * Update statistics
   */
  updateStats() {
    const tasks = Array.from(this.tasks.values());
    const now = new Date();

    this.stats = {
      totalTasks: tasks.length,
      completedTasks: tasks.filter((t) => t.completed).length,
      activeTasks: tasks.filter((t) => !t.completed).length,
      overdueTasks: tasks.filter(
        (t) => !t.completed && t.dueDate && t.dueDate < now,
      ).length,
      highPriorityTasks: tasks.filter(
        (t) =>
          !t.completed && (t.priority === "high" || t.priority === "critical"),
      ).length,
      byCategory: {},
      byPriority: {},
    };

    // Tasks by category
    tasks.forEach((task) => {
      this.stats.byCategory[task.category] =
        (this.stats.byCategory[task.category] || 0) + 1;
    });

    // Tasks by priority
    tasks.forEach((task) => {
      this.stats.byPriority[task.priority] =
        (this.stats.byPriority[task.priority] || 0) + 1;
    });
  }

  /**
   * Get statistics
   * @returns {Object} - Task statistics
   */
  getStats() {
    return { ...this.stats };
  }

  /**
   * Display all tasks
   * @param {Object} filters - Optional filters
   */
  displayTasks(filters = {}) {
    console.log("\n" + "📋".repeat(20));
    console.log("📋 TASK MANAGER");
    console.log("📋".repeat(20));

    const tasks = this.getAllTasks(filters);

    if (tasks.length === 0) {
      console.log("No tasks found");
      return;
    }

    console.log(`Found ${tasks.length} task(s):\n`);

    tasks.forEach((task, index) => {
      console.log(`${index + 1}. ${task.getInfo()}`);

      if (task.description) {
        console.log(`   📝 ${task.description}`);
      }

      if (task.tags.length > 0) {
        console.log(`   🏷️ Tags: ${task.tags.join(", ")}`);
      }

      console.log("");
    });

    console.log("📋".repeat(20) + "\n");
  }

  /**
   * Display statistics
   */
  displayStats() {
    console.log("\n" + "📊".repeat(20));
    console.log("📊 TASK STATISTICS");
    console.log("📊".repeat(20));

    console.log(`📊 Total Tasks: ${this.stats.totalTasks}`);
    console.log(`✅ Completed: ${this.stats.completedTasks}`);
    console.log(`⭕ Active: ${this.stats.activeTasks}`);
    console.log(`⚠️ Overdue: ${this.stats.overdueTasks}`);
    console.log(`🔴 High Priority: ${this.stats.highPriorityTasks}`);

    console.log("\n📊 By Category:");
    Object.entries(this.stats.byCategory).forEach(([category, count]) => {
      console.log(`   ${category}: ${count} task(s)`);
    });

    console.log("\n📊 By Priority:");
    Object.entries(this.stats.byPriority).forEach(([priority, count]) => {
      const icon =
        { low: "🔵", medium: "🟢", high: "🟠", critical: "🔴" }[priority] ||
        "⚪";
      console.log(`   ${icon} ${priority}: ${count} task(s)`);
    });

    console.log("📊".repeat(20) + "\n");
  }

  /**
   * Search tasks
   * @param {string} query - Search query
   * @returns {Array} - Matching tasks
   */
  searchTasks(query) {
    return this.getAllTasks({ searchQuery: query });
  }

  /**
   * Get overdue tasks
   * @returns {Array} - Overdue tasks
   */
  getOverdueTasks() {
    const now = new Date();
    return Array.from(this.tasks.values()).filter(
      (task) => !task.completed && task.dueDate && task.dueDate < now,
    );
  }

  /**
   * Clear completed tasks
   * @returns {number} - Number of deleted tasks
   */
  clearCompletedTasks() {
    let count = 0;
    this.tasks.forEach((task, id) => {
      if (task.completed) {
        this.tasks.delete(id);
        count++;
      }
    });

    this.updateStats();
    console.log(`🧹 Cleared ${count} completed task(s)`);
    return count;
  }

  /**
   * Export tasks to JSON
   * @returns {Object} - Tasks data
   */
  exportToJSON() {
    const tasksData = Array.from(this.tasks.values()).map((task) => ({
      id: task.id,
      title: task.title,
      description: task.description,
      priority: task.priority,
      category: task.category,
      dueDate: task.dueDate,
      completed: task.completed,
      completedAt: task.completedAt,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
      tags: task.tags,
    }));

    return {
      exportedAt: new Date(),
      taskCount: tasksData.length,
      categories: Array.from(this.categories),
      tasks: tasksData,
    };
  }
}

export default TaskManager;
