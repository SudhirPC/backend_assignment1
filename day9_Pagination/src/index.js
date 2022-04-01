const express = require('express')
const app = express()
app.use(express.json())

// ----------------------------------- require the all controller  -----------------------------------


const userController = require('./contollers/user.controllers')
const adminController = require('./contollers/admin.controllers')

const connect = require('./config/db')

// -----------------------------------all midddlewares -----------------------------------
app.use("/user", userController)
app.use("/admin", adminController)


// ----------------------------------- connect to server -----------------------------------
app.listen(3750, async () => {
    try {
        await connect()
    }
    catch (error) {
        console.log("message :", error.message)
    }
    console.log("listening to the port number 3750")
})