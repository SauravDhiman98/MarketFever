import styled from 'styled-components';
import ArrowLeftOutlinedIcon from '@mui/icons-material/ArrowLeftOutlined';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import { useState } from 'react';
import {dataArray} from '../Pages/data';
import { mobileDevice } from '../Responsive';

const Slider = () => {

    
    const [slideIndex, setSlideIndex] = useState(0)
    const handleClick = (direction) => 
    {
        
     if(direction === "left")
     {
        setSlideIndex(slideIndex > 0 ? slideIndex - 1: 2)
     }
     else
     {
        setSlideIndex(slideIndex < 2 ? slideIndex + 1: 0)
     }
       
    } 
  return (
    <Container>
        <Arrow  direction = "left" onClick={ () => handleClick("left")}>
            <ArrowLeftOutlinedIcon/>
        </Arrow>
        <Wrapper slideIndex={slideIndex}>
            {
                dataArray.map((item) => 
            <Slide bg={item.bg} key={item.id}>
            <ImageContainer>
                <Img src={item.img}/>
            </ImageContainer>
            <ContentContainer>
                <Title>{item.title}</Title>
                <Desc>{item.desc}</Desc>
                <Button>Show Now</Button>
            </ContentContainer>
            </Slide>
            )
         
}
        </Wrapper>
        <Arrow  direction = "right" onClick={ () => handleClick("right")}>
            <ArrowRightOutlinedIcon/>
        </Arrow>
    </Container>
  )
}

export default Slider

const Container = styled.div`
 width: 100%;
 height: 100vh;
 display: flex; 
 position: relative;
 overflow:hidden;
 ${mobileDevice({
    display:"none"
  })}
`

const Arrow  = styled.div`
 width: 50px;
 height: 50px;
 background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content:center ;
  position:absolute ;
  top:0 ;
  bottom:0;
  left: ${props => props.direction === "left" &&  "10px"};
  right: ${props => props.direction === "right" &&  "10px"};
  margin:auto;
  cursor: pointer;
  opacity: .5;
  z-index: 2;
`

const Wrapper = styled.div`
height: 100%;
display: flex;
transform: translateX(${props => props.slideIndex * -200}vh);
transition: all 1.5s ease ;

`

const Slide = styled.div`
display: flex;
align-items: center;
width: 100vw;
height: 100vh;
background-color: #${props => props.bg} ;
`
const ImageContainer = styled.div`
flex:1 ;
height:100%  ;
`
const Img =  styled.img`
 height:80% ;
 
`

const ContentContainer = styled.div`
flex:1 ;
padding: 50px;
`

 const Title = styled.h1`
 font-style: 70px;

 `

  const Desc = styled.p`
  margin: 50px 0px;
  font-weight: 500;
  letter-spacing:3px ;
  `

  const Button = styled.button`
  padding: 10px;
  font-style: 20px;
  background-color: transparent;
  cursor: pointer;
  `