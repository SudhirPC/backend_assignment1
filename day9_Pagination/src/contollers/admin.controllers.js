
const express = require('express')
const Admin = require('../models/admin.models')

// router is used for routing
const router = express.Router()

// ----------------------------------- get method for admin -----------------------------------
router.get("/", async (req, res) => {
    try {
        const admins = await Admin.find().lean().exec()
        res.send(admins)
    }
    catch (err) {
        res.send({ message: err.message })
    }
})
// -----------------------------------post method for admin -----------------------------------
router.post("/", async (req, res) => {
    try {
        const admin = await Admin.create(req.body)
        console.log(admin)
        res.send(" Now you are the admin")
    } catch (error) {
        res.send({ message: error.message })
    }
})

module.exports = router