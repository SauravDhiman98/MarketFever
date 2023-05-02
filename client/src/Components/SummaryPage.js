import React from 'react'
import styled from 'styled-components'
import NavBar1 from './Navbar1'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import styledEngine from '@mui/styled-engine';
const SummaryPage = (props) => {
  return (
    <Container>
    
    <Wrapper>
        <Left>
            <Img alt="" src={props.Img}/>
        </Left>
        <Center>
         {props.title}
         {props.desc.map((item)=>
            <List>
            <li>{item}</li>
           
        </List>
         )}
       
       
        </Center>
        <Right>
            <Price>
            <CurrencyRupeeIcon/>
               <h3 style={{display:"inline"}}> {props.price}</h3> 
             
            </Price>
            <Quantity>
                <h3> Quantity: {props.Quantity}</h3>
            </Quantity>
            <Size><h3> Size: {props.size}</h3></Size>
            <Color><h3>Color: {props.color}</h3></Color>
        </Right>
    </Wrapper>
    
    </Container>
  )
}

export default SummaryPage

const Container = styled.div`
 margin-top:10px;
 box-shadow: 1px 2px 3px #E3E8F0  ;
 width: 80%;
 background: white ;
`

const Wrapper = styled.div`
 display: flex;
 margin-top: 10px;
`

const Left = styled.div`
 flex: 1;
 display: flex;
 justify-content:center;
 align-items: center;
 margin-right:10px;
`

const Center = styled.div`
 flex: 1;
 background:#F8FAFD ;
 display: flex;
 flex-direction: column ;
 justify-content: flex-start;
 align-items: center;
padding: 10px;
font-size: 20px ;
font-weight:600 ;
`

const Right = styled.div`
 flex: 1;
 display: flex;
 flex-direction:column;
 align-items:center;
 justify-content: center;
 padding: 10px;
`

const Img = styled.img`
 height: 80% ;
 width: 50% ;
 object-fit:contain ;
`

const Price = styled.div`

`

const Quantity = styled.div`

`

const Size = styled.div`

`

const Color = styled.div`

`

const List = styled.ul`
 list-style: disc;
 font-size: 15px ;
 font-weight: 350;
`
