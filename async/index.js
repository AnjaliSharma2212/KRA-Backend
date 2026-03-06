//------------------------------------------------Callback-----------------------------
// Callback is a function that passed as an arguments in another function and executes later.

function fetchData(callback){
    setTimeout(()=>{
     console.log("Data received")
    },1000)
}
console.log("Data will get received after 1 sec")

fetchData()
// Callback function also crete callback hell
// Callback hell a pyramid like structure


getUser(userId, function(user) {
  getOrders(user.id, function(orders) {
    getPayment(orders[0].id, function(payment) {
      console.log(payment);
    });
  });
});

// hard to read
// hard to debug
// hard to maintain


//-----------------------------Promises----------------------------------------------------
// Promise is an eventual completion of async operation
function step1(){
    return Promise.resolve("Step 1 resolved")
}

function step2(){
    return Promise.resolve("Step 2 resolved.")
}

function step3(){
    return Promise.resolve("Step 3 resolved")
}

step1()
.then(result => step2(result))
.then(result => step3(result))
.then(finalResult=> console.log(finalResult))
.catch((error)=> console.log(error.message))

// Step 1 done → Step 2 done → Step 3 done

// ✔ Each .then() returns a new Promise
// ✔ Errors automatically go to .catch()


// ------------------------------Async/await-------------------

// Async await is nothing much its a syntatic sugar over promises that is also used to handle the async task 
function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Data received");
    }, 1000);
  });
}

async function main() {
  const result = await fetchData();
  console.log(result);
}

main();


//try Catch
// try catch is used to handle the errors efficiently

function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("Something went wrong");
    }, 1000);
  });
}

async function main() {
  try {
    const result = await fetchData();
    console.log(result);
  } catch (error) {
    console.error("Error:", error);
  }
}

main();

//  Always wrap await inside try/catch in backend

function getUser() {
  return new Promise(resolve => {
    setTimeout(() => resolve("User Data"), 1000);
  });
}

function getOrders() {
  return new Promise(resolve => {
    setTimeout(() => resolve("Orders Data"), 2000);
  });
}

async function main() {
  const [user, orders] = await Promise.all([
    getUser(),
    getOrders()
  ]);

  console.log(user);
  console.log(orders);
}

main();

// --------------------------PROMISE.ALL-----------------------------
// (Parallel Execution)
// Runs multiple promises at the same time.
// Very useful for:
// Fetching multiple DB queries
// Calling multiple APIs
function getUser() {
  return new Promise(resolve => {
    setTimeout(() => resolve("User Data"), 1000);
  });
}

function getOrders() {
  return new Promise(resolve => {
    setTimeout(() => resolve("Orders Data"), 2000);
  });
}

async function main() {
  const [user, orders] = await Promise.all([
    getUser(),
    getOrders()
  ]);

  console.log(user);
  console.log(orders);
}

main();