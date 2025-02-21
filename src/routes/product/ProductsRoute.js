import express from "express";
import { CreateProduct, getProductData } from "../../controllers/productController.js"
import fileParser from "../../middlewares/fileParser.js";

const router = express.Router();

router.route("/").get(getProductData).post(fileParser,CreateProduct);

export default router; 
 