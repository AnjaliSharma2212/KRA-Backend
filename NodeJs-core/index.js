//--------------------------------- FILE SYSTEM--------------------------
const fs = require("fs")

// write file
fs.writeFileSync("data.txt", "Hello world")

// read file 
const data=fs.readFileSync("data.txt", "utf-8")
console.log(data)


// async version 
fs.readFile("data.txt", "utf-8", (err, data)=>{
    if(err) throw err
    console.log(data)
})

// --------------------------------HTTP------------------------------
// Create Web servers
// Handles req and responses

const http= require("http")
const server= http.createServer((req,res)=>{
    res.write("Hello from Server")
    res.end()
})
server.listen(5000)

// run the server and you will see Helo from Server


//-------------------------------------PATH-----------------------
const path = require("path")
const filePath = path.join(__dirname,"data","file.txt")
console.log(filePath)

// -------------------------------STREAMS--------------------------
const fs= require("fs")
const readStream= fs.createReadStream("bigFile.txt","utf-8")

readStream.on("data",(chunk)=>{
    console.log("Chunk received: ",chunk)
})


//------------------------BUFFERS----------------------
const buffer= Buffer.from("Hello")
console.log(buffer)
console.log(buffer.toString())


//------------------------Crypto-----------------------

const crypto= require("crypto")
const hash= crypto.createHash("sh256")
     .update("password123")
     .digest("hex")

     console.log(hash)