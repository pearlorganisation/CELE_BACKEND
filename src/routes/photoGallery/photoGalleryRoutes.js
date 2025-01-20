import express from "express";

import fileParser from "../../middlewares/fileParser.js";
import {
  createPhotoGallery,
  deletePhotoGallery,
  getAllPhotoGalleries,
  getPhotoGallery,
  updatePhotoGallery,
} from "../../controllers/photoGalleryController.js";

const router = express.Router();

router
  .route("/")
  .get(getAllPhotoGalleries)
  .post(fileParser, createPhotoGallery);
router
  .route("/:id")
  .delete(deletePhotoGallery)
  .get(getPhotoGallery)
  .patch(updatePhotoGallery);

export default router;
