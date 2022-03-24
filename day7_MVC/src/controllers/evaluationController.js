const express = require("express");
const Evaluation = require("../models/evaluationModel");


const router = express.Router();


  router.post("/", async (req, res) => {
    try {
      const evaluation = await Evaluation.create(req.body);
      return res.status(201).send(evaluation);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  });


  module.exports = router;
