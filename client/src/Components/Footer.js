import styled from 'styled-components'
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import HomeIcon from '@mui/icons-material/Home';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import EmailIcon from '@mui/icons-material/Email';
import { mobileDevice } from '../Responsive';

const Footer = () => {
  return (
    <Container>
         <Left>
          <Logo>Market Fever</Logo>
          <Desc>It's been said that 'thoughts are like things'... that they actually contain dynamic power.
             Have you ever thought about thoughts like that?
              Whether or not you believe this,
               I think we can all agree that our thoughts ARE important and
                we should be mindful of them. They're what make us human and can have a positive or negative effect on how we feel and
                 how we tackle our days. When we reflect and meditate on all that's good - creativity begins to flow naturally too...
                 </Desc>
                 <SocailContainer>
                  <SocialIcon color="3B5999">
                    <FacebookIcon />
                    </SocialIcon>
                    <SocialIcon color="55ACEE">
                    <TwitterIcon />
                    </SocialIcon>
                    <SocialIcon  color = "E4405F">
                    <InstagramIcon />
                  </SocialIcon>
                 </SocailContainer>
         </Left>
         <Center>
            <Title>UseFul Links</Title>  
            <List>
                <ListItem>Home</ListItem>
                <ListItem>Cart</ListItem>
                <ListItem>Man Fashion</ListItem>
                <ListItem>Woman Fashion</ListItem>
                <ListItem>Accessories</ListItem>
                <ListItem>My Account</ListItem>
                <ListItem>Order Tracking</ListItem>
                <ListItem>WishList</ListItem>
                <ListItem>Terms</ListItem>
                <ListItem>About Us</ListItem>
              </List>        
         </Center>
         <Right>
          <Title>Contact</Title>
          <ContactItems>
            <HomeIcon style={{color: "#391306", fontSize:"30px"}}/>
          Contact Address: Postmaster,
           Agra City S.O, Agra, Uttar Pradesh, India (IN), 
           Pin Code:-282003

          </ContactItems>
          <ContactItems>
            <PhoneIphoneIcon style={{color: "#391306", fontSize:"30px"}}/>
             +91 923012****
          </ContactItems>
          <ContactItems>
            <EmailIcon style={{color: "#391306", fontSize:"30px"}}/>
            Contact@marketNuro.ac.in
            </ContactItems> 

         </Right>
    </Container>
  )
}

export default Footer

const Container = styled.div`
display: flex;
background-color: #F9F1F0 ;
${mobileDevice({
    flexDirection: "column"
  })}
`

const Left = styled.div`
flex:1 ;
display: flex;
flex-direction: column ;
padding: 20px;
`
const Center = styled.div`
 flex:1 ;
 padding: 20px;
 ${mobileDevice({
    display: "none"
  })}
`
const Title = styled.h3`
 margin-bottom: 30px;
 color: #391306;
`
const List = styled.ul`
 margin: 0;
 padding: 0; 
 list-style:none;
 display: flex;
 flex-wrap:wrap;
`
const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
  color:#D48C70 ;
`


const Right  = styled.div`
 flex:1 ;
 padding: 20px;
 ${mobileDevice({
    backgroundColor: "#fff8f8"
  })}
`

const Logo = styled.h1`
color:#391306;
`

const Desc = styled.p`
margin: 20px 0px;
color:#D48C70 ;
`

const SocailContainer = styled.div`
 display: flex;

`

const SocialIcon = styled.div`
width: 40px;
height: 40px;
border-radius:50%;
color: white;
background-color: #${(props => props.color)};
display: flex;
align-items:center ;
justify-content: center ;
margin-right:20px ;
`

const ContactItems = styled.div`
color: #D48C70;
padding: 10px;
display: flex;
justify-content: flex-start;

`