
import NavBar  from '../Components/NavBar'
import Annoucement from '../Components/Annoucement'
import Slider from '../Components/Slider'
import Categories from '../Components/Categories'
import Products from '../Components/Products'
import Newsletter from "../Components/Newsletter"
import Footer from '../Components/Footer'
import { Context } from './UserContext'
import { useLocation } from 'react-router-dom'




const Home = () => {
 
  
const data = JSON.parse(localStorage.getItem('userData'))

console.log(data)
  
  return (
    <div>
      <Context.Provider value={data}>
       <Annoucement/>   
       <NavBar/>
       <Slider/>
       <Categories/>
       <Products/>
       <Newsletter/>
       <Footer/>
       </Context.Provider>
    </div>
  )
}

export default Home