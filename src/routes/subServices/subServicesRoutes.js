import express from "express";

import fileParser from "../../middlewares/fileParser.js";
import {
  createSubService,
  deleteSubService,
  getAllSubServices,
  getSubServiceById,
  updateSubService,
} from "../../controllers/subServicesController.js";

const router = express.Router();

router.route("/").get(getAllSubServices).post(fileParser, createSubService);
router
  .route("/:id")
  .delete(deleteSubService)
  .get(getSubServiceById)
  .patch(updateSubService);

export default router;
