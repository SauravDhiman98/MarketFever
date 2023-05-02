import React from 'react'
import NavBar1  from '../Components/Navbar1'
import Slider from '../Components/Slider'
import Categories from '../Components/Categories'
import Products from '../Components/Products'
import Newsletter from "../Components/Newsletter"
import Footer from '../Components/Footer'
import Annuocement from '../Components/Annoucement'




const HOme1 = () => {

  return (
    <div>
       <Annuocement/>
       <NavBar1/>
       <Slider/>
       <Categories/>
       <Products/>
       <Newsletter/>
       <Footer/>
    </div>
  )
}

export default HOme1