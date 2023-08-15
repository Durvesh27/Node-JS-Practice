import mongoose,{Schema} from "mongoose";

const productSchema=new Schema({
 name:{
    type:String,
    required:true
 },
 price:{
    type:Number,
    required:true
 },
 category:{
    type:String,
    required:true
 },
 image:{
    type:String,
    required:true
 }
})

export default mongoose.model("product",productSchema)