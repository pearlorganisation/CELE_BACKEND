import express from "express";

import fileParser from "../../middlewares/fileParser.js";
import {
  createObituary,
  deleteObituary,
  getAllObituaries,
  getObituary,
  updateObituary,
} from "../../controllers/obituariesController.js";

const router = express.Router();

router.route("/").get(getAllObituaries).post(fileParser, createObituary);
router
  .route("/:id")
  .delete(deleteObituary)
  .get(getObituary)
  .patch(updateObituary);

export default router;
