import express from "express";
import { createEulogy, deleteEulogy, getEulogies, getEulogyById, updateEulogy } from "../../controllers/eulogyController.js";

const router = express.Router();

router.post("/", createEulogy);
router.get("/", getEulogies);
router.get("/:id", getEulogyById);
router.put("/:id", updateEulogy);
router.delete("/:id", deleteEulogy);

export default router;
