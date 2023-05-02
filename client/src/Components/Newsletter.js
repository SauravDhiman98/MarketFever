import styled from 'styled-components'
import SendIcon from '@mui/icons-material/Send';
import { mobileDevice } from '../Responsive';
const Newsletter = () => {
  return (
    <Container>
         <Title>News Letter</Title>
         <Description>get timely update on your favorite products....</Description>
         <InputContainer>
           <Input placeholder="Your Email"/>
           <Button>
              <SendIcon/>
           </Button>
         </InputContainer>
    </Container>
  )
}

export default Newsletter


const Container = styled.div`
  height: 60vh;
  background-color:#fcf5f5 ;
  display: flex;
  align-items:center;
  justify-content:center ;
  flex-direction:column ;
`


const Title= styled.h1`
 font-size:70px;
 margin-bottom:20px;
 ${mobileDevice({
    fontSize:"35px"
  })}
`

const Description = styled.div`
  font-size:24px ;
  font-weight: 300;
  margin-bottom: 20px;
  ${mobileDevice({
    textAlign: "center",
    fontSize: "20px"
  })}
`

const InputContainer = styled.div`
  width:50%;
  height: 40px;
  background-color: white ;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray ;
  ${mobileDevice({
   width:"80%"
  })}
`


const Input = styled.input`
 border:none;
 flex:8;
 padding-left: 20px;
`


const Button = styled.button`
  flex:1;
  border:none ;
  background-color: teal;
  color: whitesmoke  ;
`