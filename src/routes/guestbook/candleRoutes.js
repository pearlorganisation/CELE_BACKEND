import express from "express";
import { createCandle, getAllcandles } from "../../controllers/candleController.js";
import fileParser from "../../middlewares/fileParser.js";

const router = express.Router();

// POST route for creating candles
router.route("/").get(getAllcandles).post(fileParser, createCandle);

export default router;
