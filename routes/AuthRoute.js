import express from "express";
import googleAuth from "../controllers/AuthController.js";

const googleRouter = express.Router();

googleRouter.post("/google", googleAuth);

export default googleRouter;