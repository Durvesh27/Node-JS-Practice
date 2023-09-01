
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import api from '../Api Config'

const SingleProduct = () => {
const [singleProduct,setSingleProduct]=useState({})
const {userId}=useParams()

useEffect(()=>{
async function checkFunction(){
    const token = JSON.parse(localStorage.getItem("Token"));
    if(token){
    const response =await api.post("http://localhost:8000/single-product",{userId})  
    if(response.data.success){
    singleProduct(response.data.productData)
    }
}
}
checkFunction()
},[])

  return (
    <div>
      <img src={singleProduct?.image} alt="" />
      <h3>{singleProduct?.category}</h3>
    </div>
  )
}

export default SingleProduct
