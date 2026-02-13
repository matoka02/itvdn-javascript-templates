"use strict";

// Application state
const state = {
  tasks: [],
  currentFilter: "all",
  nextId: 1,
};

// DOM elements
const elements = {
  taskForm: document.getElementById("taskForm"),
  taskInput: document.getElementById("taskInput"),
  tasksList: document.getElementById("tasksList"),
  emptyMessage: document.getElementById("emptyMessage"),
  totalCount: document.getElementById("totalCount"),
  activeCount: document.getElementById("activeCount"),
  completedCount: document.getElementById("completedCount"),
  filterBtns: document.querySelectorAll(".filter-btn"),
  clearCompletedBtn: document.getElementById("clearCompletedBtn"),
  markAllBtn: document.getElementById("markAllBtn"),
  editModal: document.getElementById("editModal"),
  editInput: document.getElementById("editInput"),
  saveEditBtn: document.getElementById("saveEditBtn"),
  cancelEditBtn: document.getElementById("cancelEditBtn"),
};

// Template
const taskTemplate = document.getElementById("taskTemplate");

// Variable to store the ID of the task being edited
let editingTaskId = null;

// Function to load data from localStorage
function loadFromStorage() {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    state.tasks = JSON.parse(savedTasks);
    state.nextId =
      state.tasks.length > 0
        ? Math.max(...state.tasks.map((t) => t.id)) + 1
        : 1;
  } else {
    // Add some test tasks
    state.tasks = [
      {
        id: state.nextId++,
        text: "Buy products",
        completed: false,
        date: getCurrentDate(),
      },
      {
        id: state.nextId++,
        text: "Do some exercise",
        completed: true,
        date: getCurrentDate(),
      },
      {
        id: state.nextId++,
        text: "Read a book",
        completed: false,
        date: getCurrentDate(),
      },
      {
        id: state.nextId++,
        text: "Learn JavaScript",
        completed: false,
        date: getCurrentDate(),
      },
    ];
  }
}

// Function to save data to localStorage
function saveToStorage() {
  localStorage.setItem("tasks", JSON.stringify(state.tasks));
}

// Function to get the current date
function getCurrentDate() {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  return `${day}.${month}.${year} ${hours}:${minutes}`;
}

// Function to add a new task
function addTask(text) {
  const newTask = {
    id: state.nextId++,
    text: text,
    completed: false,
    date: getCurrentDate(),
  };

  state.tasks.push(newTask);
  saveToStorage();
  renderTasks();
}

// Function to delete a task
function deleteTask(taskId) {
  state.tasks = state.tasks.filter((task) => task.id !== taskId);
  saveToStorage();
  renderTasks();
}

// Function to change the status of a task
function toggleTask(taskId) {
  const task = state.tasks.find((task) => task.id === taskId);
  if (task) {
    task.completed = !task.completed;
    task.date = getCurrentDate(); // Update the date when changing the status
    saveToStorage();
    renderTasks();
  }
}

// Function to edit a task
function editTask(taskId, newText) {
  const task = state.tasks.find((task) => task.id === taskId);
  if (task) {
    task.text = newText;
    task.date = getCurrentDate(); // Update the date when editing
    saveToStorage();
    renderTasks();
  }
}

// Function to clear completed tasks
function clearCompleted() {
  state.tasks = state.tasks.filter((task) => !task.completed);
  saveToStorage();
  renderTasks();
}

// Function to mark all tasks
function markAllTasks() {
  const allCompleted = state.tasks.every((task) => task.completed);
  state.tasks.forEach((task) => {
    task.completed = !allCompleted;
  });
  saveToStorage();
  renderTasks();
}

// Function to update statistics
function updateStats() {
  const total = state.tasks.length;
  const active = state.tasks.filter((task) => !task.completed).length;
  const completed = state.tasks.filter((task) => task.completed).length;

  elements.totalCount.textContent = total;
  elements.activeCount.textContent = active;
  elements.completedCount.textContent = completed;

  // Show/hide empty list message
  if (total === 0) {
    elements.emptyMessage.classList.remove("hidden");
  } else {
    elements.emptyMessage.classList.add("hidden");
  }
}

// Function for filtering tasks
function getFilteredTasks() {
  switch (state.currentFilter) {
    case "active":
      return state.tasks.filter((task) => !task.completed);
    case "completed":
      return state.tasks.filter((task) => task.completed);
    default:
      return state.tasks;
  }
}

// Function for displaying tasks
function renderTasks() {
  const filteredTasks = getFilteredTasks();

  // Clear the list
  elements.tasksList.innerHTML = "";

  // Add tasks from the template
  filteredTasks.forEach((task) => {
    const taskElement = taskTemplate.content.cloneNode(true);
    const taskDiv = taskElement.querySelector(".task-item");

    // Set the ID
    taskDiv.dataset.taskId = task.id;

    // Add a class for completed tasks
    if (task.completed) {
      taskDiv.classList.add("completed");
    }

    // Fill in the data
    taskElement.querySelector(".task-checkbox").checked = task.completed;
    taskElement.querySelector(".task-text").textContent = task.text;
    taskElement.querySelector(".task-date").textContent = task.date;

    // Add handlers
    const checkbox = taskElement.querySelector(".task-checkbox");
    const deleteBtn = taskElement.querySelector(".delete-btn");
    const editBtn = taskElement.querySelector(".edit-btn");

    // Handler for checkbox
    checkbox.addEventListener("change", () => {
      toggleTask(task.id);
    });

    // Handler for delete button
    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (confirm("Are you sure you want to delete this task?")) {
        deleteTask(task.id);
      }
    });

    // Handler for edit button
    editBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      openEditModal(task.id, task.text);
    });

    elements.tasksList.appendChild(taskElement);
  });

  updateStats();
}

// Function to open the modal editing window
function openEditModal(taskId, currentText) {
  editingTaskId = taskId;
  elements.editInput.value = currentText;
  elements.editModal.classList.remove("hidden");
  elements.editInput.focus();
}

// Function to close the modal window
function closeEditModal() {
  editingTaskId = null;
  elements.editModal.classList.add("hidden");
  elements.editInput.value = "";
}

// Function to change the filter
function setFilter(filter) {
  state.currentFilter = filter;

  // Update the active class on the buttons
  elements.filterBtns.forEach((btn) => {
    if (btn.dataset.filter === filter) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  renderTasks();
}
// Event Listeners
const eventListeners = [
  // Task Add Form
  {
    element: elements.taskForm,
    event: "submit",
    handler: function (e) {
      e.preventDefault();
      const text = elements.taskInput.value.trim();

      if (text) {
        addTask(text);
        elements.taskInput.value = "";
      }
    },
  },

  // Filter Buttons
  ...Array.from(elements.filterBtns).map((btn) => ({
    element: btn,
    event: "click",
    handler: function () {
      setFilter(this.dataset.filter);
    },
  })),

  // Clear Completed Button
  {
    element: elements.clearCompletedBtn,
    event: "click",
    handler: function () {
      if (confirm("Delete all completed tasks?")) {
        clearCompleted();
      }
    },
  },

  // Mark All Button
  {
    element: elements.markAllBtn,
    event: "click",
    handler: function () {
      markAllTasks();
    },
  },

  // Save Edit
  {
    element: elements.saveEditBtn,
    event: "click",
    handler: function () {
      const newText = elements.editInput.value.trim();
      if (newText && editingTaskId) {
        editTask(editingTaskId, newText);
        closeEditModal();
      }
    },
  },

  // Cancel editing
  {
    element: elements.cancelEditBtn,
    event: "click",
    handler: closeEditModal,
  },

  // Close modal window by Escape
  {
    element: document,
    event: "keydown",
    handler: function (e) {
      if (
        e.key === "Escape" &&
        !elements.editModal.classList.contains("hidden")
      ) {
        closeEditModal();
      }
    },
  },

  // Close modal window by clicking on background
  {
    element: elements.editModal,
    event: "click",
    handler: function (e) {
      if (e.target === elements.editModal) {
        closeEditModal();
      }
    },
  },

  // Adding on Enter (already handled by the form)
  // Additional handler for the Enter button in the modal window
  {
    element: elements.editInput,
    event: "keypress",
    handler: function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        elements.saveEditBtn.click();
      }
    },
  },
];

// Adding all listeners
eventListeners.forEach(({ element, event, handler }) => {
  if (element) {
    element.addEventListener(event, handler);
  }
});

// Initializing when the page loads
document.addEventListener("DOMContentLoaded", function () {
  loadFromStorage();
  renderTasks();
  setFilter("all");
});
