import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import {
  Login,
  Register,
  getCurrentUser,
  getNumber,
  sentOtp,
  verifyOtp,
} from "./Controllers/User.controller.js";
import {
  addComments,
  addProduct,
  addRating,
  allProducts,
  deleteYourProduct,
  getYourProduct,
  updateYourProduct,
} from "./Controllers/Product.Controller.js";
import {
  Admin,
  checkSeller,
  isValidUser,
} from "./Middlewares/All.Middlewares.js";
import {
  addCart,
  addWishlist,
  deleteCartProduct,
  getCartProducts,
  getWishlistProducts,
} from "./Controllers/Buyer.Controller.js";
import {
  blockProduct,
  blockUser,
  getAllBuyers,
  getAllProducts,
  getAllSellers,
  unBlockProduct,
  unBlockUser,
  verifyProduct,
} from "./Controllers/Admin.Controller.js";
import  jwt  from 'jsonwebtoken'

const app = express();
app.use(express.json());
dotenv.config();
app.use(cors());

app.get("/", (req, res) => {
  console.log("Code running");
});

function checkJWT(req, res, next) {
  const fullToken = req.headers.authorization;
  if (fullToken) {
    const token = fullToken?.split(" ")[1]
    if (token) {
      try {
   const decodedData=jwt.verify(token,process.env.JWT_SECRET)
   const expiryTime=decodedData?.exp;
   const currentTimeStamp=Math.floor(Date.now()/1000)
   if(currentTimeStamp > expiryTime){
    return res
    .status(404)
    .json({success:false, message: "Session Expired please Login" });
   }
   next()
      } catch (error) {
        return res
          .status(500)
          .json({success:false, message: "Token Expired" });
      }
    }
    next()
  }
  next()
}
app.post("/register", Register);
app.post("/login", Login);
app.post("/getCurrentUser", getCurrentUser);
app.post("/addProduct", checkSeller, addProduct);
app.get("/all-products",checkJWT,allProducts);
app.post("/get-your-product", checkSeller, getYourProduct);
app.patch("/update-product", checkSeller, updateYourProduct);
app.delete("/delete-product", checkSeller, deleteYourProduct);
app.post("/add-cart", addCart);
app.get("/get-cart-products", getCartProducts);

app.patch("/add-rating", isValidUser, addRating);
app.patch("/add-comments", isValidUser, addComments);

app.post("/get-number", getNumber);
app.post("/send-otp", sentOtp);
app.post("/verify-otp", verifyOtp);

app.post("/add-wishlist", addWishlist);
app.get("/get-wishlist-products", getWishlistProducts);
app.delete("/delete-cart-product", deleteCartProduct);

app.get("/get-all-buyers", Admin, getAllBuyers);
app.get("/get-all-sellers", Admin, getAllSellers);
app.get("/get-all-products", Admin, getAllProducts);
app.patch("/block-user", Admin, blockUser);
app.patch("/unblock-user", Admin, unBlockUser);

app.patch("/block-product", Admin, blockProduct);
app.patch("/unblock-product", Admin, unBlockProduct);

app.patch("/verify-product", Admin, verifyProduct);
mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("Connected to DB");
});
app.listen(8000, () => {
  console.log("app running on port 8000");
});
