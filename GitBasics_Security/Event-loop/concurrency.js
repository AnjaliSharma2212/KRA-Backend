// Node is:

//  Single-threaded (for JavaScript execution)
//  Concurrent (via Event Loop)
//  Not parallel for JS by default

// Node achieves concurrency using:

//  Event Loop
//  Async callbacks
//  libuv thread pool

// (libuv is the async I/O engine used internally by Node)

//  Practical Example: Concurrency
// ------------------------- Concurrency ----------------------
// Concurrency means:

// Handling multiple tasks by switching between them, not running them at the exact same time.

concurrency-demo.js
const fs = require("fs");

console.log("Start");

fs.readFile(__filename, () => {
  console.log("File 1 Done");
});

fs.readFile(__filename, () => {
  console.log("File 2 Done");
});

fs.readFile(__filename, () => {
  console.log("File 3 Done");
});

console.log("End");

// Output:

// Start
// End
// File 1 Done
// File 2 Done
// File 3 Done


// ---------------Parallelism---------
// Parallelism means:

// Running multiple tasks at the exact same time.

const { Worker, isMainThread, parentPort } = require("worker_threads");

if (isMainThread) {
  console.log("Main thread started");

  // Create 2 workers (parallel execution)
  new Worker(__filename);
  new Worker(__filename);

  console.log("Main thread continues running...");
} else {
  // Heavy CPU task
  let sum = 0;
  for (let i = 0; i < 1e9; i++) {
    sum += i;
  }

  console.log("Worker finished calculation");
}

// What Happens Here?

//  Main thread starts
//  Two worker threads are created
//  Both workers calculate heavy loop
//  They run at the SAME TIME on different CPU cores
//  Main thread is not blocked

// That is parallelism.