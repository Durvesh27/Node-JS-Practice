import React, { useContext } from 'react'
import { AuthContext } from '../MyContext'
import { useEffect } from 'react'
import { useState } from 'react'
import api from './Api Config'
import { useNavigate } from 'react-router-dom'
const Home = () => {
const {state}=useContext(AuthContext)
const[myProducts,setMyProducts]=useState()
const router=useNavigate()
useEffect(()=>{
async function getProducts() {

const response =await api.get("/all/all-products")  
if(response.data.success){
setMyProducts(response.data.products)
}
}
getProducts()
},[])
  return (
    <>
    <h3 style={{textAlign:"center",color:"grey",marginTop:"15px"}}>{state?.user?.name}</h3>
    <div>
      <h2 style={{marginLeft:"20px",marginTop:"20px"}}>All Products</h2>
      {
        myProducts?.length ?
      <div style={{display:"flex"}}>
      {    
            myProducts?.map((product)=>(
            <div key={product?._id} style={{margin:"20px",boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",width:"20%",padding:"10px"}}>
             <img src={product?.image} alt="" style={{width:"100%",height:"300px"}} onClick={()=>router(`/single-product/${product?._id}`)}/>
             <h3>{product?.category}</h3>
             <h4>{product?.price} Rs.</h4>
                </div>
            ))
      }
      </div>:
      <p style={{marginLeft:"20px",marginTop:"20px"}}>No Products</p>
      }
    </div>
    </>
  )
}

export default Home
