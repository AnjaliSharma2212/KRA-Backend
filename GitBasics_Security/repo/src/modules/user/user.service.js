const pool = require("../../config/db")

exports.createUser= async({name, email})=>{
   const result = await pool.query(
    "INSERT INTO users (name, email) VALUES ($1, $2)", 
    [name, email]
   )
   return result.rows[0]
}