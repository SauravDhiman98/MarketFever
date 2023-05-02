

import styled from 'styled-components'
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../Pages/UserContext';
import { useState } from 'react';



const Product = ({Item}) => {
    
  const data = JSON.parse(localStorage.getItem('userData'))

  const [isValidUser, setValidUser] = useState(false)
  const navigate = useNavigate()
  

  const handleClick =  () => {
    const userData = JSON.parse(localStorage.getItem('userData'))
    console.log(userData)
    if(userData?.token != null){
      fetch('/api/verifytoken',{
        method: 'GET',
        headers:{
          "Content-Type": "application/json",
          token: userData.token
        }
     })
     .then(res => res.json())
     .then(val => {
      if(val.hasOwnProperty('name')){
        localStorage.clear()
        navigate('/login')
      }
      else{
        console.log(Item)
        if(Item != null){
          navigate('/productpage',{state:{Item}})
                          }
          else 
          {
           navigate('/login')
          }         
      }
     })
    }
    else{
      navigate('/login')
    }
  }
  return (
    <Container onClick={handleClick}>
         <Circle/>
       <Img src={Item.img}   />
         <Info>
            <Icon><ShoppingCartTwoToneIcon/></Icon>
            <Icon><SearchIcon/></Icon>
            <Icon><FavoriteBorderRoundedIcon/></Icon>
         </Info>
    </Container>
  )
}

export default Product

const Info = styled.div`
opacity:0 ;
   width:100% ;
   height:100% ;
   position:absolute ;
   top:0 ;
   left:0;
   background-color: rgba(0,0,0,.1);
   z-index : 3;
   display: flex;
   align-items:center ;
   justify-content: center;
   transition: all .5s ;
    cursor: pointer;
`

 const Container = styled.div`
  flex:1;
  margin: 5px;
  min-width:280px;
  height:350px ;
  display: flex;
  justify-content:center ;
  align-items:center ;
  background-color:#f5fbfd ;
  box-shadow: 1px 1px 1px rgba(0,0,0,.1) ;
  position:relative ;
  &: hover ${Info}
  {
    opacity: 1;
  }
 `

 const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius:50% ;
  background-color:white ;
  position:absolute ;
 `

 const Img = styled.img`
  height:75% ;
   z-index: 2;
 `



const Icon = styled.div`
 width: 40px;
 height: 40px;
 border-radius:50% ;
 background-color:white ;
 display: flex;
 align-items: center;
 justify-content: center ;
 margin:10px ;
 transition: all .5s ;
 &:hover
 {
  background-color: #e9f5f5;
  transform: scale(1.1) ;
 }
`