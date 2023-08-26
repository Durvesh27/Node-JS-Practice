import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../MyContext'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const SellerProtected = ({children}) => {
const{state}=useContext(AuthContext)
const router=useNavigate();
useEffect(()=>{
if(state?.user?.role!=="Seller"){
router('/')
}
},[state])
  return state?.user?.role==="Seller" ? children:null;
}

export default SellerProtected