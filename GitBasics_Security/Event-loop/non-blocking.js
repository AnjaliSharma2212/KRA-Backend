// JavaScript is a single threaded language
// Node JS has :
// One main Thread
// One Call stack
// One event Loop 
// Only one line runs at a time

console.log("First")
console.log("Second")
console.log("Third")

// output :
// First
// Second
// Third

// What is Blocking?

// The Thread does not do any other task until the executing task finished or completes its execution.
// Example of Blocking code 
const fs= require("fs")
const data=fs.readFileSync("bigFile.txt")
console.log("File read done")

// What happens
// -> Node reads entire file
// -> the main thread will wait
// -> so this block the further execution until it finishes the code

const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/blocking") {
    // Simulate heavy CPU task
    const start = Date.now();
    while (Date.now() - start < 5000) {} // 5 seconds block

    res.end("Blocking Done");
  } else {
    res.end("Normal Response");
  }
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});

const http = require("http");

const server2  = http.createServer((req, res) => {
  if (req.url === "/non-blocking") {
    setTimeout(() => {
      res.end("Non Blocking Done");
    }, 5000);
  } else {
    res.end("Normal Response");
  }
});

server2.listen(3000);


// Client Request
// ↓
// Event Loop
// ↓
// Callback execution
// ↓
// If I/O needed → libuv
// ↓
// Main thread free
// ↓
// When done → callback queued
// ↓
// Event Loop executes callback