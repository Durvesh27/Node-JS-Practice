
import mongoose, {Schema} from "mongoose";

const userSchema=new Schema({
name:{
    type:String,
    required:true
},
number:{
type:Number,
required:true
},
numberVerified:{
type:Boolean,
default:false
},
otpForNumberVerification:{
type:Number,
default:null
},
email:{
    type:String,
    required:true
},
password:{
    type:String,
    required:true
},
role:{
    type:String,
    enum:["Buyer","Seller","Admin"],
    default:"Buyer"
},
cart:{
    type:[String]
},
wishlist:{
    type:[String]
},
isBlocked:{
    type:Boolean,
    default:false
}
})

export default mongoose.model("User",userSchema)