import express from "express";

import fileParser from "../../middlewares/fileParser.js";
import {
  createGuestBook,
  deleteGuestBook,
  getAllGuestBooks,
  getGuestBook,
  updateGuestBook,
} from "../../controllers/guestbookController.js";

const router = express.Router();

router.route("/").get(getAllGuestBooks).post(fileParser, createGuestBook);
router
  .route("/:id")
  .delete(deleteGuestBook)
  .get(getGuestBook)
  .patch(updateGuestBook);

export default router;
