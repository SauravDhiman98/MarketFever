import styled from 'styled-components'
import { mobileDevice } from '../Responsive'
const CategoriesItem = ({item}) => {
  return (
    <Container>
       <Img src={item.img}/>
       <Info>
        <Title>{item.title}</Title>
        <Button>Shop Now</Button>
       </Info>
    </Container>
  )
}

export default CategoriesItem

const Container = styled.div`
flex:1;
margin: 3px;
height: 70vh;
position: relative;
`
const Img = styled.img`
width:100% ;
height:100% ;
object-fit:cover ;
${mobileDevice({
   height:"20vh"
  })}
`
const Info = styled.div`
position: absolute ;
width: 100%;
height: 100%;
top:0;
left:0 ;
display: flex;
align-items:center;
justify-content:center ;
flex-direction:column;
`

const Title = styled.h1`
 color: white;
 margin-bottom: 20px;
`

const Button  = styled.button`
  border:none ;
  color: gray;
  font-weight: 500;
  padding: 10px;
  cursor: pointer;
`