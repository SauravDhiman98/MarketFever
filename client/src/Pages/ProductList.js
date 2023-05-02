import styled from 'styled-components'
import Annoucement from '../Components/Annoucement'
import Footer from '../Components/Footer'
import NavBar from '../Components/NavBar'
import Newsletter from '../Components/Newsletter'
import Products from '../Components/Products'



const ProductList = () => {
  return (
    <Container>
        <NavBar/>
        <Annoucement/>
        <Title>Dresses</Title>
        <FilterContainer>
            <Filter>
                <FilterText>FilterProducts:</FilterText>
                <Select>
                <Option>Color</Option>
                    <Option>White</Option>
                    <Option>Black</Option>
                    <Option>Red</Option>
                    <Option>Blue</Option>
                    <Option>Yellow</Option>
                    <Option>Green</Option>
                </Select>
                <Select>
                <Option>Size</Option>
                    <Option>XS</Option>
                    <Option>S</Option>
                    <Option>M</Option>
                    <Option>L</Option>
                    <Option>XL</Option>
                </Select>
            </Filter>
            <FilterText>Sort Products:

                <Select>
                    <Option selected>Newest</Option>
                    <Option>Price(asc)</Option>
                    <Option>Price(desc)</Option>
                </Select>
            </FilterText>

        </FilterContainer>
        <Products/>
        <Newsletter/>
        <Footer/>
    </Container>
  )
}

export default ProductList


const Container = styled.div`
 
`


const Title = styled.h1`
 display: flex;
`

const FilterContainer = styled.div`
 display: flex;
 justify-content:space-between;
 margin: 20px;
 
`

const Filter = styled.div`
 margin: 20px;
`

const FilterText = styled.span`
font-style: 20px;
font-weight: 600;
margin-right: 20px;
`

const Select = styled.select`
 padding: 10px;
 margin-right: 20px;
 border: 2px solid ;
 border-color: black;
 border-radius: 30% ;
`

const Option = styled.option`
 
`

