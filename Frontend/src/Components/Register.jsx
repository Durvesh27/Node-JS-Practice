import React, { useContext, useEffect } from "react";
import { useState } from "react";
import "./Form.css";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../MyContext";
import api from "./Api Config";
const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    role: "Buyer",
    number:"",
    password: "",
    confirmPassword: "",
  });
  const{state}=useContext(AuthContext)
  const router = useNavigate();
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const handleChangeForSelect = (event) => {
    setUserData({ ...userData, "role": event.target.value })
}
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      userData.name &&
      userData.email &&
      userData.role&&
      userData.number&&
      userData.password &&
      userData.confirmPassword
    ) {
      if (userData.password === userData.confirmPassword) {
        const response = await api.post("/all/register", { userData });
        if (response.data.success) {
          setUserData({
            name: "",
            email: "",
            role: "Buyer",
            number:"",
            password: "",
            confirmPassword: ""
          });
          toast.success(response.data.message);
          router("/login");
        } else {
          toast.error(response.data.message);
        }
      } else {
        toast.error("Password & Confirm Password not matched");
      }
    } else {
      toast.error("Please fill all the Fields");
    }
  };
  useEffect(()=>{
    if(state?.user?.name){
    router("/")
    }
    },[state])
  return (
    <div>
       
      <form onSubmit={handleSubmit} className="form">
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Register</h2>
        <>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          onChange={handleChange}
          value={userData.name}
          className="input"
        />
        <br />
        <input
          type="email"
          name="email"
          placeholder="Enter Email Id"
          onChange={handleChange}
          value={userData.email}
          className="input"
        />
        <select
          onChange={handleChangeForSelect}
          className="input"
          style={{ marginBottom: "25px"}}
          value={userData.role}
        >
          <option value="Buyer">Buyer</option>
          <option value="Seller">Seller</option>
        </select>
        <br />
        <input
          type="number"
          name="number"
          placeholder="Enter Mobile Number"
          onChange={handleChange}
          value={userData.number}
          className="input"
        />
        <input
          type="password"
          name="password"
          placeholder="Create new password"
          onChange={handleChange}
          className="input"
          value={userData.password}
        />
        <br />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          onChange={handleChange}
          value={userData.confirmPassword}
          className="input"
        />
        <br />
        <input type="submit" value="Register" />
        </>
        <p>
          Already have an account?{" "}
          <b style={{ color: "green" }} onClick={() => router("/login")}>
            Login
          </b>
        </p>
      </form>
    </div>
  );
};

export default Register;
