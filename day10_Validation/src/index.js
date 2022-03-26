const connect=require("./config/db");
const express=require("express");
const app = express();
app.use(express.json());



const userController = require("./controller/user_controller")
app.use("/users", userController)


app.listen(3750, async()=>{
    try{
        await connect();
        console.log("listening on port 3750")
    }
    catch(error){
        console.log(error.message)
    }
})