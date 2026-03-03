// =======================================
// NODE PROCESS INTERNALS - FULL DEMO
// =======================================

console.log("===== Node Process Internals Demo =====");

// =======================================
// 1️ Basic Process Information
// =======================================

console.log("\n--- Basic Process Info ---");

console.log("Process ID:", process.pid);
console.log("Parent Process ID:", process.ppid);
console.log("Node Version:", process.version);
console.log("Platform:", process.platform);
console.log("Architecture:", process.arch);
console.log("Current Directory:", process.cwd());
console.log("Uptime:", process.uptime(), "seconds");


// =======================================
// 2️ Environment Variables
// =======================================

console.log("\n--- Environment Variables ---");

console.log({
  NODE_ENV: process.env.NODE_ENV || "Not Set",
  HOME: process.env.HOME || "Not Available",
  PATH: process.env.PATH ? "SET" : "NOT SET",
});


// =======================================
// 3️ Command Line Arguments
// =======================================

console.log("\n--- Command Line Arguments ---");

console.log("Raw Args:", process.argv);


// =======================================
// 4️ Memory Monitoring
// =======================================

function printMemoryUsage() {
  const memory = process.memoryUsage();

  console.log("\n--- Memory Usage (MB) ---");
  console.log({
    rss: (memory.rss / 1024 / 1024).toFixed(2) + " MB",
    heapTotal: (memory.heapTotal / 1024 / 1024).toFixed(2) + " MB",
    heapUsed: (memory.heapUsed / 1024 / 1024).toFixed(2) + " MB",
    external: (memory.external / 1024 / 1024).toFixed(2) + " MB",
  });
}

printMemoryUsage();


// =======================================
// 5️ CPU Usage
// =======================================

const startCPU = process.cpuUsage();

setTimeout(() => {
  const endCPU = process.cpuUsage(startCPU);

  console.log("\n--- CPU Usage (microseconds) ---");
  console.log(endCPU);
}, 2000);


// =======================================
// 6️ Interval Monitoring (Live Memory)
// =======================================

const memoryInterval = setInterval(() => {
  console.log("\nMonitoring Memory...");
  printMemoryUsage();
}, 5000);


// =======================================
// 7️ Process Lifecycle Events
// =======================================

process.on("beforeExit", (code) => {
  console.log("\n⚠ beforeExit Event Triggered. Code:", code);
});

process.on("exit", (code) => {
  console.log("\n✅ Process Exiting with Code:", code);
});

process.on("uncaughtException", (err) => {
  console.error("\n❌ Uncaught Exception:", err.message);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  console.error("\n❌ Unhandled Rejection:", reason);
  process.exit(1);
});


// =======================================
// 8️ Graceful Shutdown (Ctrl + C)
// =======================================

process.on("SIGINT", () => {
  console.log("\n🔴 SIGINT Received (Ctrl+C)");
  shutdown();
});

process.on("SIGTERM", () => {
  console.log("\n🔴 SIGTERM Received");
  shutdown();
});

function shutdown() {
  console.log("Cleaning up resources...");

  clearInterval(memoryInterval);

  setTimeout(() => {
    console.log("Shutdown complete.");
    process.exit(0);
  }, 1000);
}


// =======================================
// 9️ Simulate Error (Uncomment to Test)
// =======================================

// setTimeout(() => {
//   throw new Error("Simulated Crash!");
// }, 8000);


// =======================================
// 10 Simulate Memory Leak (Uncomment to Test)
// =======================================

// let arr = [];
// setInterval(() => {
//   arr.push(new Array(1000000).fill("*"));
//   console.log("Memory Growing...");
// }, 1000);
