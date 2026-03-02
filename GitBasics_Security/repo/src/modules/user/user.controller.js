const userService= require("../../modules/user/user.service")
exports.createUser= async(req,res)=>{
    try {
        const data= await userService.createUser(req.body)
        res.status(201).json({message:"User created", data})
    } catch (error) {
        console.log("ERROR: ", error.message)
        res.status(500).json({ message:"error while creating user", error: error.message})
    }
}