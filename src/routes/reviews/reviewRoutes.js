import express from "express";
import {
  createReview,
  deleteReview,
  getAllReviews,
  getReview,
  updateReview,
} from "../../controllers/reviewsController.js";

const router = express.Router();

router.route("/").get(getAllReviews).post(createReview);
router.route("/:id").delete(deleteReview).get(getReview).patch(updateReview);

export default router;
