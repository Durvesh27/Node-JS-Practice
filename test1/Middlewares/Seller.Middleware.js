import UserModal from "../Modals/User.Modal.js"
import jwt  from "jsonwebtoken"
export const checkSeller=async (req,res,next)=>{
try{
    const {token}=req.body
    if(!token) res.status(404).json({status:"error",message:"Token is required"})
    const decodedData=jwt.verify(token,process.env.JWT_SECRET)
    if(!decodedData){
    return res.status(404).json({status:"error",message:"Not a valid token"})
    }
    const userId=decodedData?.userId
    const user=await UserModal.findById(userId)

    if(!user || user?.role!="Seller"){
        return res.status(404).json({status:"error",message:"User not allowed to add product from Middleware"})
    }
    next();
}
catch(error){
return res.status(500).json({error:error.message,status:"error"})
}
}