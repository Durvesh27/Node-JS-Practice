import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../MyContext";
import SellerProtected from "../Common/SellerProtected";
const AddProduct = () => {
  const{state}=useContext(AuthContext)
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    image: "",
    category: "Men",
  });
  const router = useNavigate();
  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      productData.name &&
      productData.price &&
      productData.image&&
      productData.category 
    ) {
        const token=JSON.parse(localStorage.getItem("Token"))
        const response = await axios.post("http://localhost:8000/addProduct", {token, productData });
        if (response.data.success) {
          setProductData({
            name: "",
            price:"",
            image:"",
            category:""
          });
          toast.success(response.data.message);
          router("/");
        } else {
          toast.error(response.data.message);
        }
    } else {
      toast.error("Please fill all the Fields");
    }
  };

  return (
    <SellerProtected>
    <div>
      <form onSubmit={handleSubmit} className="form">
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Add Product</h2>
        <input
          type="text"
          name="name"
          placeholder="Enter product name"
          onChange={handleChange}
          value={productData.name}
          className="input"
        />
        <br />
        <input
          type="number"
          name="price"
          placeholder="Enter Price"
          onChange={handleChange}
          value={productData.price}
          className="input"
        />
        <p style={{fontSize:"14px",marginBottom:"10px"}}>Select product Category :</p>
        <select
          name="category"
          onChange={handleChange}
          className="input"
          style={{ marginBottom: "25px"}}
          value={productData.category}
        >
          <option value="Buyer">Men</option>
          <option value="Seller">Women</option>
          <option value="Kids">Kids</option>
        </select>
        <br />
        <input
          type="text"
          name="image"
          placeholder="Enter image url"
          onChange={handleChange}
          value={productData.image}
          className="input"
        />
        <br/>
        <input type="submit" value="Add" />
        <br />
        <p>
          View your Products?{" "}
          <b style={{ color: "green" }} onClick={() => router("/login")}>
            My-Products
          </b>
        </p>
      </form>
    </div>
    </SellerProtected>
  );
};

export default AddProduct;
