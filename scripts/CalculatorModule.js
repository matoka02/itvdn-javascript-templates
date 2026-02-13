"use strict";

let worker = null;
let startTime = null;

// Get the DOM elements
// const resultsDiv = document.getElementById("results");

const elements = {
  primeForm: document.getElementById("primeForm"),
  numberInput: document.getElementById("numberInput"),
  startBtn: document.getElementById("startBtn"),
  cancelBtn: document.getElementById("cancelBtn"),
  loadingIndicator: document.getElementById("loadingIndicator"),
  progressSpan: document.getElementById("progress"),
  progressBar: document.getElementById("progressBar"),
  executionTimeEl: document.getElementById("executionTime"),
  primeCountEl: document.getElementById("primeCount"),
  lastPrimeEl: document.getElementById("lastPrime"),
  resultsDiv: document.getElementById("results"),
  copyBtn: document.getElementById("copyBtn"),
  clearBtn: document.getElementById("clearBtn"),
};

// Function to create Web Worker
function createWorker() {
  // Create a Blob with the worker code
  const workerCode = `
// Function to check if a number is prime
function isPrime(num) {
if (num < 2) return false;
if (num === 2) return true;
if (num % 2 === 0) return false;

for (let i = 3; i <= Math.sqrt(num); i += 2) {
if (num % i === 0) return false;
}
return true;
}

// Message handler from main script
self.addEventListener('message', function(e) {
const limit = e.data;
const primes = [];

for (let i = 2; i <= limit; i++) {
if (isPrime(i)) {
primes.push(i);
}

// Send progress every 1%
if (i % Math.max(1, Math.floor(limit / 100)) === 0) {
const progress = Math.floor((i / limit) * 100);
self.postMessage({
type: 'progress',
progress: progress
});
}
}

// Send result
self.postMessage({
type: 'result',
primes: primes,
limit: limit
});
});
`;

  const blob = new Blob([workerCode], { type: "application/javascript" });
  return new Worker(URL.createObjectURL(blob));
}

// Function for formatting time
function formatTime(ms) {
  if (ms < 1000) return ms + " ms";
  return (ms / 1000).toFixed(2) + " s";
}

// Function for displaying prime numbers
function displayPrimes(primes) {
  if (primes.length === 0) {
    elements.resultsDiv.innerHTML =
      '<p class="placeholder">No prime numbers found</p>';
    return;
  }

  let html = "<div>";
  primes.forEach((prime) => {
    html += `<span class="prime-number">${prime}</span> `;
  });
  html += "</div>";

  elements.resultsDiv.innerHTML = html;
}

// Function to reset results
function resetResults() {
  elements.executionTimeEl.textContent = "-";
  elements.primeCountEl.textContent = "-";
  elements.lastPrimeEl.textContent = "-";
  elements.resultsDiv.innerHTML =
    '<p class="placeholder">No results yet. Enter a number and start calculating.</p>';
  elements.copyBtn.disabled = true;
}

// Function to stop the worker
function stopWorker() {
  if (worker) {
    worker.terminate();
    worker = null;
  }

  elements.startBtn.disabled = false;
  elements.cancelBtn.disabled = true;
  elements.loadingIndicator.classList.add("hidden");

  if (startTime) {
    const endTime = Date.now();
    elements.executionTimeEl.textContent =
      formatTime(endTime - startTime) + " (interrupted)";
  }
}

// Form submission handler
elements.primeForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const limit = parseInt(elements.numberInput.value);

  // Stop the previous worker, if it exists
  stopWorker();

  // Reset the results
  resetResults();

  // Create a new worker
  worker = createWorker();

  // Remember the start time
  startTime = Date.now();

  // Show the loading indicator
  elements.loadingIndicator.classList.remove("hidden");

  elements.progressSpan.textContent = "0%";

  elements.progressBar.style.width = "0%";

  // Disable the start button and disable the cancel button
  elements.startBtn.disabled = true;
  elements.cancelBtn.disabled = false;

  // Worker message handler
  worker.addEventListener("message", function (e) {
    const data = e.data;

    if (data.type === "progress") {
      // Update progress
      elements.progressSpan.textContent = data.progress + "%";
      elements.progressBar.style.width = data.progress + "%";
    } else if (data.type === "result") {
      // Calculate execution time
      const endTime = Date.now();
      const executionTime = endTime - startTime;

      // Update statistics
      elements.executionTimeEl.textContent = formatTime(executionTime);
      elements.primeCountEl.textContent = data.primes.length;
      elements.lastPrimeEl.textContent =
        data.primes[data.primes.length - 1] || "-";

      // Display prime numbers
      displayPrimes(data.primes);

      // Enable the copy button
      elements.copyBtn.disabled = false;

      // Terminate
      stopWorker();
    }
  });

  // Worker error handler
  worker.addEventListener("error", function (error) {
    console.error("Error worker:", error);
    alert("An error occurred during the calculation. Please try again.");
    stopWorker();
  });

  // Start the worker
  worker.postMessage(limit);
});

// Cancel button handler
elements.cancelBtn.addEventListener("click", function () {
  stopWorker();
});

// Clear button handler
elements.clearBtn.addEventListener("click", function () {
  resetResults();
  elements.numberInput.value = 100;
});

// Copy button handler
elements.copyBtn.addEventListener("click", function () {
  const primes = elements.resultsDiv.textContent;

  navigator.clipboard
    .writeText(primes)
    .then(() => {
      const originalText = elements.copyBtn.textContent;
      elements.copyBtn.textContent = "✓ Copied!";
      setTimeout(() => {
        elements.copyBtn.textContent = originalText;
      }, 2000);
    })
    .catch((err) => {
      console.error("Copy error:", err);
      alert("Failed to copy result");
    });
});

// Stop the worker when the page is closed
window.addEventListener("beforeunload", function () {
  if (worker) {
    worker.terminate();
  }
});

// Add validation for the input field
elements.numberInput.addEventListener("input", function () {
  const value = parseInt(this.value);
  const min = parseInt(this.min);
  const max = parseInt(this.max);

  if (value < min) {
    this.value = min;
  } else if (value > max) {
    this.value = max;
  }
});

// Initial reset of results
resetResults();
