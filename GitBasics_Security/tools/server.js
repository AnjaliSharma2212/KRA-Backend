const express=require("express")
require("dotenv").config()

const app= express()
const pool= require("./config/db")
app.use(express.json())

app.post("/users", async(req,res)=>{
    try {
        const {name, email}= req.body;

        const result= await pool.query(
            "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *", 
            [name, email]
        )
        res.status(200).json({message:"User Created successfully.",
            data: result.rows[0]
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Error in endpoint ", error: error})
    }
})
const PORT= process.env.PORT
app.listen(PORT, ()=>{
    console.log(`Server start on server port ${PORT}`)
})