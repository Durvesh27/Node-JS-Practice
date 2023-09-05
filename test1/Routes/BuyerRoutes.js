import express from 'express';
import { addComments, addRating } from "../Controllers/Product.Controller.js";
import { isValidUser } from "../Middlewares/All.Middlewares.js";
import {
    addCart,
    addWishlist,
    deleteCartProduct,
    getCartProducts,
    getWishlistProducts,
    updateCart,
  } from "../Controllers/Buyer.Controller.js";

const router = express.Router();
router.patch("/add-rating", isValidUser, addRating);
router.patch("/add-comments", isValidUser, addComments);
router.post("/add-wishlist", addWishlist);
router.get("/get-wishlist-products", getWishlistProducts);
router.delete("/delete-cart-product", deleteCartProduct);
router.post("/add-cart", addCart);
router.post("/get-cart-products", getCartProducts);
router.post("/cart-user",updateCart)
export default router;