"use strict";

// Array with initial user data
let users = [
  {
    id: 1,
    name: "Olexandr Petrenko",
    age: 28,
    email: "oleksandr@example.com",
    city: "Kyiv",
  },
  {
    id: 2,
    name: "Maria Ivanenko",
    age: 32,
    email: "maria@example.com",
    city: "Lviv",
  },
  {
    id: 3,
    name: "Ivan Kovalenko",
    age: 25,
    email: "ivan@example.com",
    city: "Kharkiv",
  },
];

// Variables for tracking editing status
let editingId = null;
let nextId = 4; // Initial value for new IDs

// Get DOM elements
const userForm = document.getElementById("userForm");
const nameInput = document.getElementById("name");
const ageInput = document.getElementById("age");
const emailInput = document.getElementById("email");
const cityInput = document.getElementById("city");
const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");
const formTitle = document.getElementById("form-title");
const tableBody = document.getElementById("userTableBody");
const emptyMessage = document.getElementById("emptyTableMessage");

// Table row template
const rowTemplate = document.getElementById("userRowTemplate");

// Table loading function
function loadTable() {
  // Clear the table
  tableBody.innerHTML = "";

  if (users.length === 0) {
    emptyMessage.classList.remove("hidden");
  } else {
    emptyMessage.classList.add("hidden");

    // Create rows for each user
    users.forEach((user) => {
      addUserRow(user);
    });
  }
}
// Function to add a row with a user
function addUserRow(user) {
  const row = rowTemplate.content.cloneNode(true);

  // Fill in the data
  row.querySelector(".user-id").textContent = user.id;
  row.querySelector(".user-name").textContent = user.name;
  row.querySelector(".user-age").textContent = user.age;
  row.querySelector(".user-email").textContent = user.email;
  row.querySelector(".user-city").textContent = user.city;

  // Get the row element
  const rowElement = row.querySelector(".user-row");
  rowElement.dataset.userId = user.id;

  // Add handlers for the buttons
  const editBtn = row.querySelector(".btn-edit");
  const deleteBtn = row.querySelector(".btn-delete");

  editBtn.addEventListener("click", () => editUser(user.id));

  deleteBtn.addEventListener("click", () => deleteUser(user.id));

  // Add a row to the table
  tableBody.appendChild(row);
}

// Function for adding a new user
function addUser(userData) {
  const newUser = {
    id: nextId++,
    ...userData,
  };

  users.push(newUser);
  addUserRow(newUser);

  if (users.length === 1) {
    emptyMessage.classList.add("hidden");
  }
}

// Function for editing a user
function editUser(id) {
  const user = users.find((u) => u.id === id);

  if (user) {
    editingId = id;

    // Fill the form with user data
    nameInput.value = user.name;
    ageInput.value = user.age;
    emailInput.value = user.email;
    cityInput.value = user.city;

    // Change the UI for edit mode
    formTitle.textContent = "Edit User";
    submitBtn.textContent = "Update";
    submitBtn.style.background =
      "linear-gradient(135deg, #28a745 0%, #218838 100%)";
    cancelBtn.classList.remove("hidden");
  }
}

// Function to update user
function updateUser(id, userData) {
  const index = users.findIndex((u) => u.id === id);

  if (index !== -1) {
    users[index] = {
      id: id,
      ...userData,
    };

    // Reload the table
    loadTable();
  }
}

// Function to delete a user
function deleteUser(id) {
  if (confirm("Are you sure you want to delete this user?")) {
    users = users.filter((user) => user.id !== id);
    loadTable();

    // If you deleted a user in editing mode
    if (editingId === id) {
      resetForm();
    }
  }
}

// Function to reset the form
function resetForm() {
  userForm.reset();
  editingId = null;
  formTitle.textContent = "Add new user";
  submitBtn.textContent = "Add";
  submitBtn.style.background =
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
  cancelBtn.classList.add("hidden");
}

// Form validation function
function validateForm(userData) {
  if (!userData.name || userData.name.trim() === "") {
    alert("Please enter a name");
    return false;
  }

  if (!userData.age || userData.age < 1 || userData.age > 120) {
    alert("Please enter a valid age (1-120)");
    return false;
  }

  if (
    !userData.email ||
    !userData.email.includes("@") ||
    !userData.email.includes(".")
  ) {
    alert("Please enter a valid email");
    return false;
  }

  if (!userData.city || userData.city.trim() === "") {
    alert("Please enter a city");
    return false;
  }

  return true;
}

// Form submission handler
userForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const userData = {
    name: nameInput.value.trim(),
    age: parseInt(ageInput.value),
    email: emailInput.value.trim(),
    city: cityInput.value.trim(),
  };

  if (!validateForm(userData)) {
    return;
  }

  if (editingId) {
    updateUser(editingId, userData);
  } else {
    addUser(userData);
  }

  resetForm();
});

// Cancel button handler
cancelBtn.addEventListener("click", resetForm);

// Clearing the form when the page loads
document.addEventListener("DOMContentLoaded", function () {
  resetForm();
  loadTable();
});
