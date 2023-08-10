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
    age: parseInt(age),
    email: email,
    password: password,
  });

  await user.save();

  res.send("Registeration done");
});

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("Connected to DB");
});

// mongoose.connect("mongodb+srv://Durvesh63:Durvesh63@cluster0.3m115pe.mongodb.net/DURVESH27")
// .then(()=>{
//     console.log("connected to DB")
// })


app.listen(8000, () => {
  console.log("Server running on port 8000");
});
