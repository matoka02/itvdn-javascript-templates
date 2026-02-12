// Web Workers
// Handle a message from the main thread
onMessage = function (event) {
  // Get data from the message
  const message = event.data;

  // Perform long calculations or operations
  const result = "Hello from Worker! You sent: " + message;

  // Send the result back to the main thread
  postMessage(result);
};
