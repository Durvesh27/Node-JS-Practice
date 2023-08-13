import express from "express";
import dotenv from "dotenv";

import User from "./Modals/User.modals.js";
import mongoose from "mongoose";
const app = express();
dotenv.config();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("App Working...");
});

app.post("/login", (req, res) => {
  res.send("Login page");
});

app.post("/register", async function (req, res) {
  console.log(req.body, "req.body");
  const { name, age, email, password, confirmPassword } = req.body;
  if (!name) return res.send("name is missing");
  if (!age) return res.send("age is missing");
  if (!email) return res.send("email is missing");
  if (!password) return res.send("password is missing");
  if (!confirmPassword) return res.send("confirm password is missing");
  if (password != confirmPassword) return res.send("Check Entered password");

  const user = new User({
    name: name,
    age,
    email: email,
    password: password,
  });

  await user.save();

  res.send("Registeration done");
});

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("Connected to DB");
});

// app.get("/find",async(req,res)=>{
// const{email}=req.body
// if(!email) return req.send("Email is required")

// const user=await User.find({email:email})
// if(user.length){
//   return res.send(user[0])
// }
// return res.send("No User found")
// })

// app.patch("/update/:id",async(req,res)=>{
//   const{age}=req.body
//   const{id}=req.params

//   if (!id) return res.send("id is required..")
//   if (!age) return res.send("age is required..")

//   const updatedUser=await User.findByIdAndUpdate(id,{age},{new:true})

//   return res.json({message:"Updated...",data:updatedUser})
// })

// app.put("/update/:id",async(req,res)=>{
//   const{age}=req.body
//   const{id}=req.params

//   if (!id) return res.send("id is required..")
//   if (!age) return res.send("age is required..")

//   const updatedUser=await User.findByIdAndUpdate(id,{age},{new:true}).select("-password")

//   return res.json({message:"Updated...",data:updatedUser})
// })

// app.delete("/delete",async(req,res)=>{
// const{id,name} =req.query

// if(!id) return res.send("ID is required")

// const deletedUser=await User.findByIdAndDelete(id)
// return res.json({message:"User Deleted",data:deletedUser})
// })


app.listen(8000, () => {
  console.log("Server running on port 8000");
});
