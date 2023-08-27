import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Navbar from './Components/Common/Navbar'
import AddProduct from "./Components/Seller/AddProduct";
import YourProducts from "./Components/Seller/YourProducts";
import Profile from "./Components/Profile";
function App() {
  return (
    <div className="App">
    <Navbar/>
     <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route exact path='/login' element={<Login/>}/>
      <Route exact path='/register' element={<Register/>}/>
      <Route exact path='/add-product' element={<AddProduct/>}/>
      <Route exact path='/your-products' element={<YourProducts/>}/>
      <Route exact path='/profile' element={<Profile/>}/>
     </Routes>
    </div>
  );
}

export default App;
