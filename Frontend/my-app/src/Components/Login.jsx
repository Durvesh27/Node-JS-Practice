import React, { useContext, useEffect } from "react";
import { useState } from "react";
import './Form.css'
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { AuthContext } from "../MyContext";
const Login = () => {
const router=useNavigate();
const [userData,setUserData]=useState({email:"",password:""})
const{Login,state}=useContext(AuthContext)
const handleChange=(e)=>{
setUserData({...userData,[e.target.name]:e.target.value})
}

const handleSubmit=async(e)=>{
e.preventDefault();
if (userData.email && userData.password) {
    const response = await axios.post("http://localhost:8000/login", { userData });
    if (response.data.success) {
        setUserData({ email: "", password: "" })
        router('/')
        toast.success(response.data.message)
        localStorage.setItem("Token",JSON.stringify(response.data.token))
        Login(response.data.user)
    } else {
        toast.error(response.data.message)
    }
} else {
    toast.error("All fields are mandtory.")
}
}
useEffect(()=>{
if(state?.user?.name){
router("/")
}
},[state])

  return (
    <div>
   
      <form onSubmit={handleSubmit} className="form">
      <h2 style={{textAlign:"center","marginBottom":"20px"}}>Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Enter Email Id"
          onChange={handleChange}
          className="input"
          value={userData.email}
        />
<br/>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          onChange={handleChange}
          className="input"
          value={userData.password}
        />
        <br />
        <input type="submit" value="Login" />
        <br />
        <p>New User? <b style={{color:"green"}} onClick={()=>router('/register')}>Register</b></p>
      </form>
    </div>
  );
};

export default Login;
