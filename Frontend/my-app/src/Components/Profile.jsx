import React from 'react'
import AuthProtected from './Common/AuthProtected'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useContext } from 'react'
import { AuthContext } from '../MyContext'
import { toast } from 'react-hot-toast'
const Profile = () => {
const {state}=useContext(AuthContext)
const[number,setNumber]=useState()
const [numberVerified,setNumberVerified]=useState(true)
const [otp,setOtp]=useState()
const[otpSent,setOtpSent]=useState(false)




const sendOtp=async ()=>{
const response=await axios.post("http://localhost:8000/send-otp",{userId:state?.user?._id})

if(response.data.success){
    setOtpSent(true)
    toast.success("OTP for Mobile Number Verification has been sent to your RMN")
    }
}

const verifyOtp=async()=>{
    const response=await axios.post("http://localhost:8000/verify-otp",{userId:state?.user?._id,otp})
    if(response.data.success){
        setOtpSent(false)
        setNumberVerified(response.data.numberVerified)
        toast.success("OTP is verified")
        }
}

useEffect(()=>{
async function getNumber(){
try{
    const response=await axios.post("http://localhost:8000/get-number",{userId:state?.user?._id})
    if(response.data.success){
    setNumber(response.data.number)
    setNumberVerified(response.data.numberVerified)
    }
}
catch(error){
console.log(error,"error")
}

}
if(state?.user?._id){
    getNumber()
}
},[state])

  return (

<div style={{margin:"auto",width:"50%",textAlign:"center",paddingTop:"50px"}}>
<h2>Profile</h2>
<h3>Phone Number : {number}</h3>
{
numberVerified? <h4>Your Phone Number verified</h4>:
<button onClick={sendOtp}>Verify your phone Number</button>
}
{
otpSent && 
<div>
<input type="number" onClick={(e)=>setOtp(e.target.value)} />
<button onClick={verifyOtp}>Submit Otp</button>
</div>
}
</div>

  )
}

export default Profile
