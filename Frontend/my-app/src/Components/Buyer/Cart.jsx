import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import api from '../Api Config'
import { AuthContext } from '../../MyContext'
import { toast } from 'react-hot-toast'

const Cart = () => {
const[cartProducts,setCartproducts]=useState([])
const [final, setFinal] = useState(0);
const {state}=useContext(AuthContext)
useEffect(()=>{
    async function cartProducts(){
        try{
        const token=JSON.parse(localStorage.getItem("Token"))
        if(token){
          const response=await api.post("http://localhost:8000/get-cart-products",{token})   
          if (response.data.success) {
          setCartproducts(response.data.products)
          }
        }
        }
        catch(error){
          console.log(error)
        }
       }
       cartProducts()
},[])
useEffect(() => {
  if (cartProducts?.length >= 0) {
    let totalPrice = 0;
  cartProducts.forEach((item) => {
      totalPrice += item?.price;
    });
    setFinal(totalPrice);
  }
}, [cartProducts]);

// function delItem(itemId) {
//   let updatedItems = cartProducts.filter((ele) => {
//     return ele.id !== itemId;
//   });
//   state.user.cart = updatedItems;
//   toast("Item deleted")
//   setCartproducts(updatedItems);
// }

  return (
    <div style={{width:"80%",margin:"auto",border:"1px solid black",marginTop:"50px",display:"flex",justifyContent:"space-between",padding:"20px"}}>
      <div>
      {
        cartProducts?.map((pro)=>(
         <div key={pro?._id} style={{display:"flex",marginBottom:"20px"}}>
           <img src={pro?.image} alt="" style={{width:"190px",height:"200px"}}/>
           <div style={{marginLeft:"20px",marginTop:"10px"}}>
           <h3>{pro?.name}</h3>
          <h3>Rs.{pro?.price}</h3>
          {/* <button style={{padding:"3px",backgroundColor:"black",color:"white"}} onClick={()=>{delItem(pro?._id)}}>Remove</button> */}
          <button style={{padding:"3px",backgroundColor:"black",color:"white"}} >Remove</button>
            </div> 
         </div>
        ))
      }
      </div>
    <div style={{width:"30%"}}>
      <h3>Prize Summary</h3>
      <div style={{display:"flex",justifyContent:"space-between",margin:"20px 0"}}>
      <p>Total Prize</p>
      <p>Rs.{final}</p>
      </div>
      <div style={{display:"flex",justifyContent:"space-between",margin:"20px 0"}}>
      <p>Discount Prize</p>
      <p>Rs.{final/2}</p>
      </div>
      <div style={{display:"flex",justifyContent:"space-between",margin:"20px 0"}}>
      <h3>Total Prize</h3>
      <h3>Rs.{final}</h3>
      </div>
      <button style={{width:"100%",padding:"10px 0",backgroundColor:"black",color:"white",fontWeight:550}}>CHECKOUT</button>
    </div>
    </div>
  )
}

export default Cart
