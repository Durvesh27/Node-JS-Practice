import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../MyContext'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthProtected = ({children}) => {
const{state}=useContext(AuthContext)
const router=useNavigate();
useEffect(()=>{
if(state?.user?.name){
router('/')
}
},[state])
  return state?.user?.name ? children:null;
}

export default AuthProtected
