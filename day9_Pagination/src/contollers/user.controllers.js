const express = require("express");
// const { modelName } = require('../models/user.models')
const transporter = require("../config/mailer");

const router = express.Router();
const User = require("../models/user.models");
const Admin = require("../models/admin.models");

router.get("/", async (req, res) => {
  try {
    let page = req.query.page;
    let pageSize = req.query.pageSize;
    let skip = Math.ceil((page - 1) * pageSize);
    const users = await User.find().skip(skip).limit(pageSize).lean().exec();
    res.send(users);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    console.log(req.body);

    const user = await User.create(req.body);
    res.send("registration seccessful");
    transporter.sendMail({
      from: "Admin add 👻 <foo@example.com>", // sender address
      to: user.email, // list of receivers
      subject: `Welcome to ABC system ${(user.first_name, user.last_name)}`, // Subject line
      text: ` Hi ${user.first_name}, Please confirm your email address`,
    });

    
    transporter.sendMail({
      from: "Admin add 👻 <foo@example.com>", // sender address
      to: "sfsdfsdsfsd@gmail.com,saga@gmail.com,sasfsd@gmail.com,saadfdfsd@gmail.com,saadfdfsd@gmail.com", // list of receivers
      subject: `${user.first_name} ${user.last_name} has registered with us`, // Subject line
      text: `Please welcome ${user.first_name} ${user.last_name}`,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

module.exports = router;
