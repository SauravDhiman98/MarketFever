import React from 'react'
import styled from 'styled-components'
import { SummaryArray } from '../Pages/data'
import Footer from './Footer'
import NavBar1 from './Navbar1'
import Newsletter from './Newsletter'
import SummaryPage from './SummaryPage'
import Annoucement from './Annoucement'
import Total from './Total'

const SummaryPages = () => {


  return (
  <Container>
    <NavBar1/>
    <Annoucement/>
    <Wrapper>
      {
        SummaryArray.map((item, index) => 
        
      <SummaryPage Img={item.img} title={item.title} desc={item.desc} price={item.price} Quantity={item.Quantity} size={item.size} color={item.color} /> 
        )
      }
      <Total/>
      </Wrapper>
      <Newsletter/>
      <Footer/>
  </Container>
  )
}

export default SummaryPages


const Container = styled.div`
 display: flex;
 flex-direction:column;
 `

 const Wrapper = styled.div`
  display: flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  margin-bottom:10px;
 `