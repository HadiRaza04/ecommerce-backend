const express = require("express");
const { googleAuth } = require("../controllers/authController.js");

const googleRouter = express.Router();

googleRouter.post("/google", googleAuth);

module.exports = googleRouter;