import styled from 'styled-components'
import Product from './Product'
import { useEffect, useState,useContext} from 'react'
import { Context } from '../Pages/UserContext';


const Products = () => {
 
  

  const [data, setData] = useState([])

  const fetchData = async () => 
  {
    const fetchingData = await fetch('/api/getData',
    {
      method:'GET',
      headers:
      {
        'Content-type':'application/json'
      }
    })
    .then(response => response.json())
    .then(val => setData(val))
  }
useEffect(()=> 
{
  fetchData();
},[])
    
  return (
    <Container>
      {
    data.map((Item) => 
          <Product Item ={Item}/>
        )
      }
    </Container>
  )
}

export default Products


const Container = styled.div`
 padding: 20px;
 display: flex;
 flex-wrap:wrap ;
 justify-content:space-between ;
`