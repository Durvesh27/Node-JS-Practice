import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import  jwt  from 'jsonwebtoken'
import routeIndex from './Routes/index.js';
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





app.use('/api/v1', routeIndex)



mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("Connected to DB");
});
app.listen(8000, () => {
  console.log("app running on port 8000");
});
