import express from 'express';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import { Login, Register, getCurrentUser } from './Controllers/User.controller.js';
import { addProduct, allProducts, getYourProduct, updateYourProduct } from './Controllers/Product.Controller.js';
import { checkSeller } from './Middlewares/Seller.Middleware.js';

const app=express()
app.use(express.json())
dotenv.config()


app.get("/",(req,res)=>{
    console.log("Code running")
})

app.post("/register",Register)
app.post("/login",Login)
app.post("/getCurrentUser",getCurrentUser)
app.post("/addProduct",checkSeller,addProduct)
app.get("/all-products",allProducts)
app.get("/get-your-product",checkSeller,getYourProduct)
app.patch("/update-product",checkSeller,updateYourProduct)

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("Connected to DB")
})
app.listen(8000,()=>{
console.log("app running on port 8000")
})