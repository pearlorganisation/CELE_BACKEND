import express from "express";
import { addToCart, cartDetails, decrementCartItem, getCartDataById, Incrementquantity } from "../../controllers/cartController.js";

const router = express.Router();

router.route("/").get(cartDetails).post(addToCart).post(Incrementquantity).post(decrementCartItem)
router.route("/:id").get(getCartDataById)



export default router;




