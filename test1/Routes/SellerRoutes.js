import express from 'express';
import { addProduct, deleteYourProduct, getYourProduct, updateYourProduct } from "../Controllers/Product.Controller.js";
import { checkSeller } from "../Middlewares/All.Middlewares.js";

const router = express.Router();
router.post("/addProduct", checkSeller, addProduct);
router.post("/get-your-product", checkSeller, getYourProduct);
router.patch("/update-product", checkSeller, updateYourProduct);
router.delete("/delete-product", checkSeller, deleteYourProduct);

export default router;