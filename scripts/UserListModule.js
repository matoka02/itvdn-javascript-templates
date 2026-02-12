"use strict";

// Array with user data
const users = [
  {
    id: 1,
    name: "Olexandr Petrenko",
    age: 28,
    email: "oleksandr@example.com",
    role: "Developer",
    phone: "+380 (67) 123-45-67",
    address: "Kyiv, Khreshchatyk St., 1",
    company: "Tech Solutions Ltd",
  },
  {
    id: 2,
    name: "Maria Ivanenko",
    age: 32,
    email: "maria@example.com",
    role: "Designer",
    phone: "+380 (50) 234-56-78",
    address: "Lviv, Shevchenko St., 45",
    company: "Creative Studio",
  },
  {
    id: 3,
    name: "Ivan Kovalenko",
    age: 25,
    email: "ivan@example.com",
    role: "Tester",
    phone: "+380 (63) 345-67-89",
    address: "Kharkiv, Sumska st., 12",
    company: "QA Pro",
  },
  {
    id: 4,
    name: "Olena Bondarenko",
    age: 35,
    email: "olena@example.com",
    role: "Project Manager",
    phone: "+380 (73) 456-78-90",
    address: "Odessa, Deribasivska st., 10",
    company: "IT Consulting",
  },
  {
    id: 5,
    name: "Dmytro Shevchenko",
    age: 29,
    email: "dmytro@example.com",
    role: "DevOps",
    phone: "+380 (99) 567-89-01",
    address: "Dnipro, Tsentralna st., 25",
    company: "Cloud Systems",
  },
];

// Function to load users into the DOM
function loadUsers() {
  const userList = document.getElementById("user-list");
  const template = document.getElementById("user-template");

  // Clear the container before loading
  userList.innerHTML = "";

  // Create DOM elements for each user
  users.forEach((user) => {
    // Clone the template
    const userCard = template.content.cloneNode(true);

    // Fill in the user data
    userCard.querySelector(".user-name").textContent = user.name;
    userCard.querySelector(".user-age").textContent = `${user.age} years`;
    userCard.querySelector(".user-email").textContent = user.email;
    userCard.querySelector(".user-role").textContent = user.role;
    userCard.querySelector(".user-phone").innerHTML =
      `<strong>Phone:</strong> ${user.phone}`;
    userCard.querySelector(".user-address").innerHTML =
      `<strong>Address:</strong> ${user.address}`;
    userCard.querySelector(".user-company").innerHTML =
      `<strong>Company:</strong> ${user.company}`;

    // Add data-id attribute to card
    const cardElement = userCard.querySelector(".user-card");
    cardElement.dataset.userId = user.id;

    // Add click handler to display detailed information
    cardElement.addEventListener("click", function (e) {
      // Prevent firing when clicking on delete button
      if (e.target.classList.contains("delete-btn")) {
        return;
      }

      const details = this.querySelector(".user-details");
      details.classList.toggle("hidden");
    });

    // Add handler for delete button
    const deleteBtn = userCard.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", function (e) {
      e.stopPropagation(); // Prevent opening detailed information

      // Remove a user from the array
      const userId = parseInt(cardElement.dataset.userId);
      const userIndex = users.findIndex((u) => u.id === userId);

      if (userIndex !== -1) {
        users.splice(userIndex, 1);
        // Reload the user list
        loadUsers();
      }
    });

    // Add a card to the container
    userList.appendChild(userCard);
  });

  // console.table(users);

  // If the list is empty, show a message
  if (users.length === 0) {
    userList.innerHTML = '<div class="empty-message">User list is empty</div>';
  }
}

// Add styles for the empty list
const style = document.createElement("style");
style.textContent = `
.empty-message {
grid-column: 1 / -1;
text-align: center;
padding: 40px;
background: white;
border-radius: 10px;
color: #666;
font-size: 1.2em;
}
`;
document.head.appendChild(style);

// Load users on page load
document.addEventListener("DOMContentLoaded", loadUsers);
