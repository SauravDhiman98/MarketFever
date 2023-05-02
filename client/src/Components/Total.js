import { Button } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
const Total = () => {
  return (
    <Container>
        <Address>
          <label style={{fontWeight:"500", fontSize:"18px"}}>User Address:</label>
          <UserAddress>
          <Ptag>House No. 456,</Ptag>
          <Ptag>Tikrol near UCO BANK</Ptag>
          <Ptag>Saharanpur(Uttar Pradesh), Pin Code: 247452</Ptag>
          </UserAddress>
         <ButtonContainer> <Button style={{border:"2px solid #1F3541",}}>Edit Address</Button></ButtonContainer>
        </Address>
       <TotalPrice>
        <Quantity>
         <h3>Quantity: 18</h3>
        </Quantity>
       <Price> <h3 style={{display:"inline"}}> Total: {<CurrencyRupeeIcon/>}18000</h3></Price>
       <ButtonContainer> <Button style={{border:"2px solid #1F3541"}}>Payment</Button></ButtonContainer>
      
       </TotalPrice>
       
    </Container>
  )
}

export default Total

const Container = styled.div`
 display: flex;
 flex-direction: row;
 width:60%;
 padding:5px ;
`

const Address= styled.div`
flex: 1;
display: flex;
flex-direction: column;
box-shadow:1px 1px 2px #E3E8F0 ;
`

const TotalPrice = styled.div`
 flex:1;
 display: flex;
 flex-direction:column;
 align-items: center;
 justify-content:center;
 margin-left: 10px;
 box-shadow:1px 1px 2px #E3E8F0 
`

const Price = styled.div`
  margin-bottom:10px ;
`

const Ptag = styled.p`

`

const Quantity = styled.div`
  
`

const UserAddress = styled.div`
display: flex;
flex-direction:column;
align-items:center;
`

const ButtonContainer = styled.div`
 margin-right: 10px;
 margin-bottom:10px ;
 display: flex;
 justify-content: flex-end ;
`