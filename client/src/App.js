import {BrowserRouter,Routes,Route, useLocation} from "react-router-dom";
import './App.css';
import Home from './Pages/Home'
import HOme1 from "./Pages/HOme1";
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import ProductList from "./Pages/ProductList";
import Product from "./Pages/Product";
import Products from "./Components/Products";
import SummaryPages from "./Components/SummaryPages";
import Cart  from "./Pages/Cart"
import {Context} from "./Pages/UserContext";
import  Adress  from "./Pages/Adress";
import CustomPopUp from "./Components/CustomPopUp";
import Loader from "./Components/Loader";

function App() {


  return <>
     <BrowserRouter>
     <Routes>
      <Route exact path="/E-Commerce-App" element={<Home/>}/>
      <Route exact path="/login" element={<Login/>}/>
      <Route exact path="/register" element={<Register/>}/>
      <Route exact path="/productpage" element={<Product/>}/> 
      <Route exact path='/cart' element = {<Cart/>}/>
      <Route exact path='/adress' element = {<Adress/>}/>
     </Routes>
     </BrowserRouter>
  </>
}

export default App;
