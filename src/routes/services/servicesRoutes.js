import express from "express";

import fileParser from "../../middlewares/fileParser.js";
import {
  createService,
  deleteService,
  getAllServices,
  getServiceById,
  updateService,
} from "../../controllers/servicesController.js";

const router = express.Router();

router.route("/").get(getAllServices).post(fileParser, createService);
router
  .route("/:id")
  .delete(deleteService)
  .get(getServiceById)
  .patch(updateService);

export default router;
