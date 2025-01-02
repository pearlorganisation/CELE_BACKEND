import express from "express";
import {
  deleteContactById,
  getAllContacts,
  submitContactForm,
} from "../../controllers/contactController.js";

const router = express.Router();

router.route("/").post(submitContactForm).get(getAllContacts);
router.route("/:id").delete(deleteContactById);

export default router;
