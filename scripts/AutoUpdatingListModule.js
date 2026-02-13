"use strict";

// State of the program
let state = {
  items: [],
  updateCount: 0,
  lastUpdate: null,
  isRunning: false,
  intervalId: null,
  countdownInterval: null,
  timeLeft: 0,
};

// Web Worker
let worker = null;

// DOM elements
const elements = {
  startBtn: document.getElementById("startBtn"),
  stopBtn: document.getElementById("stopBtn"),
  clearBtn: document.getElementById("clearBtn"),
  statusDot: document.getElementById("statusDot"),
  statusText: document.getElementById("statusText"),
  intervalInput: document.getElementById("intervalInput"),
  countdown: document.getElementById("countdown"),
  totalItems: document.getElementById("totalItems"),
  updateCount: document.getElementById("updateCount"),
  lastUpdate: document.getElementById("lastUpdate"),
  itemsList: document.getElementById("itemsList"),
};

// Template
const template = document.getElementById("itemTemplate");

// Function to create a Web Worker
function createWorker() {
  const workerCode = `
// Product Categories
const categories = ['Electronics', 'Clothing', 'Books', 'Food', 'Toys', 'Sports', 'Cosmetics', 'Furniture'];

// Name Prefixes
const prefixes = ['Super', 'Mega', 'Ultra', 'Pro', 'Mini', 'Maxi', 'Eco', 'Smart'];

// Name Bases
const bases = ['background', 'computer', 'phone', 'book', 'chair', 'table', 'cup', 'bag', 'sneakers', 't-shirt'];

// Suffixes for names
const suffixes = ['2024', 'Pro', 'Lite', 'Plus', 'Max', 'Mini', 'HD', 'X', 'Z'];

// Adjectives for description
const adjectives = ['quality', 'reliable', 'stylish', 'convenient', 'compact', 'powerful', 'economical', 'modern'];

// Function for generating a random item
function generateRandomItem(id) {
const category = categories[Math.floor(Math.random() * categories.length)];
const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
const base = bases[Math.floor(Math.random() * bases.length)];
const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];

const name = \`\${prefix}\${base} \${suffix}\`;
const description = \`\${adjective} \${base} from a leading manufacturer. Ideal for everyday use.\`;
const price = Math.floor(Math.random() * 5000) + 100;
const date = new Date().toLocaleTimeString('uk-UA');

return {
id: id,
name: name,
description: description,
category: category,
price: price + ' UAH',
date: date
};
}

// Dataset generation
function generateDataSet(count) {
const items = [];
for (let i = 0; i < count; i++) {
items.push(generateRandomItem(Date.now() + i));
}
return items; 
} 

// Message handler 
self.addEventListener('message', function(e) { 
const data = e.data; 

switch(data.type) { 
case 'generate': 
const items = generateDataSet(data.count || 5); 
self.postMessage({ 
type: 'newData', 
items: items, 
timestamp: Date.now() 
}); 
break 

case 'stop': 
self.close(); 
break 
} 
}); 
`;

  const blob = new Blob([workerCode], { type: "application/javascript" });
  return new Worker(URL.createObjectURL(blob));
}

// Function to start the worker
function startWorker() {
  if (worker) {
    worker.terminate();
  }

  worker = createWorker();

  worker.addEventListener("message", function (e) {
    const data = e.data;
    if (data.type === "newData") {
      updateList(data.items);
      updateStats(data.timestamp);
    }
  });

  worker.addEventListener("error", function (error) {
    console.error("Worker error:", error);
    stopUpdating();
    alert("An error occurred while generating data");
  });
}

// Function to update the list
function updateList(newItems) {
  // Add new items to the beginning of the list
  state.items = [...newItems, ...state.items].slice(0, 50); // Limit to 50 items

  // Clear the container
  elements.itemsList.innerHTML = "";

  if (state.items.length === 0) {
    elements.itemsList.innerHTML =
      '<p class="placeholder">The list is empty. Run a refresh to get data.</p>';
    return;
  }

  // Add elements from the template
  state.items.forEach((item) => {
    const card = template.content.cloneNode(true);

    card.querySelector(".item-id").textContent = `ID: ${item.id}`;
    card.querySelector(".item-category").textContent = item.category;
    card.querySelector(".item-name").textContent = item.name;
    card.querySelector(".item-description").textContent = item.description;
    card.querySelector(".item-price").textContent = item.price;
    card.querySelector(".item-date").textContent = item.date;

    elements.itemsList.appendChild(card);
  });
}

// Function for updating statistics
function updateStats(timestamp) {
  state.updateCount++;
  state.lastUpdate = new Date(timestamp).toLocaleTimeString("uk-UA");

  elements.totalItems.textContent = state.items.length;
  elements.updateCount.textContent = state.updateCount;
  elements.lastUpdate.textContent = state.lastUpdate;
}

// Function to start automatic updating
function startUpdating() {
  if (state.isRunning) return;

  state.isRunning = true;
  state.updateCount = 0;

  // Start the worker
  startWorker();

  // Update the UI
  elements.statusDot.classList.add("active");
  elements.statusText.textContent = "Active";
  elements.startBtn.disabled = true;
  elements.stopBtn.disabled = false;
  elements.intervalInput.disabled = true;

  // Start data generation
  generateData();

  // Start the interval for regular updating
  const interval = parseInt(elements.intervalInput.value);
  state.intervalId = setInterval(generateData, interval);

  // Start the countdown
  startCountdown(interval);
}

// Function to stop updating
function stopUpdating() {
  if (!state.isRunning) return;

  state.isRunning = false;

  // Stop intervals
  if (state.intervalId) {
    clearInterval(state.intervalId);
    state.intervalId = null;
  }

  if (state.countdownInterval) {
    clearInterval(state.countdownInterval);
    state.countdownInterval = null;
  }

  // Stop the worker
  if (worker) {
    worker.postMessage({ type: "stop" });
    worker.terminate();
    worker = null;
  }

  // Update the UI
  elements.statusDot.classList.remove("active");
  elements.statusText.textContent = "Stopped";
  elements.startBtn.disabled = false;
  elements.stopBtn.disabled = true;
  elements.intervalInput.disabled = false;
  elements.countdown.textContent = `${parseInt(elements.intervalInput.value) / 1000}s`;
}

// Function to generate data
function generateData() {
  if (worker && state.isRunning) {
    const count = Math.floor(Math.random() * 3) + 3; // 3-5 new elements
    worker.postMessage({
      type: "generate",
      count: count,
    });
  }
}

// Function to start the countdown
function startCountdown(interval) {
  state.timeLeft = interval / 1000;

  if (state.countdownInterval) {
    clearInterval(state.countdownInterval);
  }

  state.countdownInterval = setInterval(() => {
    state.timeLeft -= 0.1;
    if (state.timeLeft <= 0) {
      state.timeLeft = interval / 1000;
    }
    elements.countdown.textContent = `${state.timeLeft.toFixed(1)}s`;
  }, 100);
}

// Function to clear the list
function clearList() {
  state.items = [];
  elements.itemsList.innerHTML =
    '<p class="placeholder">The list is empty. Run an update to get data.</p>';
  elements.totalItems.textContent = "0";

  if (!state.isRunning) {
    state.updateCount = 0;
    elements.updateCount.textContent = "0";
    elements.lastUpdate.textContent = "-";
  }
}

// Event listeners
const eventListeners = [
  {
    element: elements.startBtn,
    event: "click",
    handler: startUpdating,
  },
  {
    element: elements.stopBtn,
    event: "click",
    handler: stopUpdating,
  },
  {
    element: elements.clearBtn,
    event: "click",
    handler: clearList,
  },
  {
    element: elements.intervalInput,
    event: "change",
    handler: function (e) {
      if (state.isRunning) {
        clearInterval(state.intervalId);
        const interval = parseInt(e.target.value);
        state.intervalId = setInterval(generateData, interval);
        startCountdown(interval);
      }
    },
  },
];

// Add all listeners
eventListeners.forEach(({ element, event, handler }) => {
  if (element) {
    element.addEventListener(event, handler);
  }
});

// Stop everything when the page is closed
window.addEventListener("beforeunload", function () {
  stopUpdating();
});

// Initialization
clearList();
