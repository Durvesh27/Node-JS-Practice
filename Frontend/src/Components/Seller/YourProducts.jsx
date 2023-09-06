import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const YourProducts = () => {

const[myProducts,setMyProducts]=useState()
const router=useNavigate()
useEffect(()=>{
async function getProducts() {
const token = JSON.parse(localStorage.getItem("Token"));
if(token){
    const response =await axios.post("/seller/get-your-product",{token})  
    if(response.data.success){
    setMyProducts(response.data.products)
    }
}
}
getProducts()
},[])
  return (
    <div>
      <h2 style={{marginLeft:"20px",marginTop:"20px"}}>My Products</h2>
      {
        myProducts?.length ?
      <div style={{display:"flex"}}>
      {    
            myProducts?.map((product)=>(
            <div key={product?._id} style={{margin:"20px",boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",width:"20%",padding:"10px"}}>
             <img src={product?.image} alt="" style={{width:"100%",height:"300px"}} onClick={()=>router(`/single-product/${product?._id}`)} />
             {/* <img src={product?.image} alt="" style={{width:"100%",height:"300px"}} /> */}
             <h3>{product?.category}</h3>
             <h4>{product?.price} Rs.</h4>
                </div>
            ))
      }
      </div>:
      <p style={{marginLeft:"20px",marginTop:"20px"}}>No Products</p>
      }
    </div>
  )
}

export default YourProducts
