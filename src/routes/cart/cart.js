import express from "express";
import { addToCart, cartDetails, getCartDataById } from "../../controllers/cartController.js";

const router = express.Router();

router.route("/").get(cartDetails).post(addToCart)
router.route("/:id").get(getCartDataById)


export default router;




