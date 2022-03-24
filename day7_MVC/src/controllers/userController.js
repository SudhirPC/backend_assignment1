const express = require("express");
const User = require("../models/userModel");


const router = express.Router();


  router.post("/", async (req, res) => {
    try {
      const users = await User.create(req.body);
      return res.status(201).send(users);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  });
  module.exports = router;
