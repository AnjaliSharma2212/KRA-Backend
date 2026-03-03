// Event Loop has three phases 
// 1. Timers
// 2. Callbacks
// 3. Poll (I/O)
// 4. Check
// 5. Close Callbacks


//=========================================================
// ------------TIMER PHASE---------------
// In timer phase it executes callbacks schedules by
// setTimeOut()
// setInterval()
// -> It executes the timer whose delay time has expired.

console.log("Start")
setTimeout(() => {
    console.log("Timer ended")
}, 1000);
console.log("End")
// Output will be:
// Start
// End
// Timer ended -> after 1 sec

//============================== 
// ------------------ Poll Phase (I/O phase) ------------------
// This phase executes input/output callbacks 
// Handles file system operations
// Handles incoming network requests 
// Wait for new input/output events
// Example: Data read file, Http request, Database query

const fs = require("fs")

fs.readFile(__filename, ()=>{
    console.log("I/O Callback")
})

// this callback executes inside poll phase

//========================= Check Phase ==========
// It executes the setImmediate()
// Imp:
// Timer phase -> setTimeout()
// Check phase -> setImmediate()

setImmediate(()=>{
    console.log("SetImmediate ( Check Phase )")
})

// ---------------------------- MicroTask queue ---------
Promise.resolve().then(() => {
  console.log("Promise (Microtask)");
});

process.nextTick(() => {
  console.log("process.nextTick (Microtask - highest priority)");
});

console.log("Script End");


// Timers
// ↓
// Pending Callbacks
// ↓
// Idle / Prepare
// ↓
// Poll (I/O happens here)
// ↓
// Check (setImmediate)
// ↓
// Close Callbacks


setTimeout(() => console.log("Timer 1"), 0);
setImmediate(() => console.log("Immediate 1"));

Promise.resolve().then(() => console.log("Promise 1"));

process.nextTick(() => console.log("NextTick 1"));

console.log("End");