import React, { useContext } from "react";
import {useNavigate} from 'react-router-dom'
import './Home.css'
import { AuthContext } from "../../MyContext.js";
const Navbar = () => {
const {state,Logout}=useContext(AuthContext)
console.log(state?.user)
const router=useNavigate();
  return (
    <div className="navbar flex">
    <div className="flex primary">
      <div className="logo" onClick={()=>router('/')}>MyStore!</div>
      <div className="navi flex">
        {
          state?.user?.role !="Seller" ?
          <>
          <p>Men</p>
          <p>Women</p>
          <p>Kids</p>
          </>:
           <>
           <p onClick={()=>router('/add-product')}>Add Products</p>
           <p onClick={()=>router('/your-products')}>My Products</p>
           </>
        }
      </div>
      </div>
      <div className="secondary flex">
        {state?.user?.name?
         <>
         {state?.user?.role!="Seller" && <p>Cart</p>}
         <p onClick={()=>router("/profile")}>Profile</p>
         <p onClick={()=>Logout()}>Logout</p>
         </>
        :
        <p onClick={()=>router("/login")}>Login/Register</p>}
      </div>
    </div>
  );
};

export default Navbar;
