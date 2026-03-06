const express = require("express")
const logger = require("./middleware/logger.middleware")
const error = require("./middleware/errror.middleware")
const userRoutes= require("./routes/user.routes")
const app= express()

app.use(express.json())
app.use(logger)
app.use("/api/users", userRoutes)

app.use(error)
const PORT= 3000
app.listen(PORT, ()=>{
   console.log(`Server started at port ${PORT}`)
})