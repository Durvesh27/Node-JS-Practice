import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../Api Config";
import { toast } from "react-hot-toast";

const SingleProduct = () => {
  const [singleProduct, setSingleProduct] = useState({});
  const { userId } = useParams();
  const router=useNavigate()
  useEffect(() => {
    async function checkFunction() {
      try {
          const response = await api.post(
            "/all/single-product",
            { productId:userId }
          );
          if (response.data.success) {
            setSingleProduct(response.data.productData);
          }
      } catch (error) {
        console.log(error);
      }
    }
    checkFunction();
  }, [userId]);
  
 async function addCart(productId){

  try{
  const token=JSON.parse(localStorage.getItem("Token"))
  const response=await api.post("/buyer/add-cart",{productId,token})
  if (response.data.success) {
   console.log("success")
    toast.success("Product Added to Cart")
  }
  }
  catch(error){
    console.log(error)
  }
 }
  return (
    <div style={{display:"flex",justifyContent:"space-around",marginTop:"100px"}}>
      <img src={singleProduct?.image} alt="" style={{width:"300px",height:"350px"}} />
      <div style={{marginTop:"100px"}}>
      <h2>{singleProduct?.name}</h2>
      <h3>Category: {singleProduct?.category}</h3>
      <h3>Price: {singleProduct?.price}</h3>
      <button onClick={()=>addCart(singleProduct?._id)}>Add to Cart</button>
      </div>
    </div>
  );
};

export default SingleProduct;
