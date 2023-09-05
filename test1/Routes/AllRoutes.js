import express from 'express';
import { SingleProduct, allProducts } from "../Controllers/Product.Controller.js";
import { Login, Register, getCurrentUser, getNumber, sentOtp, verifyOtp } from "../Controllers/User.controller.js";

const router = express.Router();
router.post("/register", Register);
router.post("/login", Login);
router.post("/getCurrentUser", getCurrentUser);
router.get("/all-products",allProducts);
router.post("/get-number", getNumber);
router.post("/send-otp", sentOtp);
router.post("/verify-otp", verifyOtp);
router.post("/single-product",SingleProduct);


export default router;