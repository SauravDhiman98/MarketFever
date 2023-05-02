
import styled  from 'styled-components'
import { mobileDevice } from '../Responsive'
import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
const Register = () => {

const navigate = useNavigate();
const [getUserData, setUserData] = useState();
const [formData, setFormData] = useState({})
const [fnameErr, setFnameErr] = useState({})
const [lnameErr, setLnameErr] = useState({})
const [unameErr, setUnameErr] = useState({})
const [emlErr, setEmlErr] = useState({})
const [pswrdErr, setPswrdErr] = useState({});
const [confPswrdErr, setConfPswrdErr] = useState({})
const [flag, setFlag] = useState(false)
const [isUserExist, setUserFlag] = useState(false)
const [isEmailExist, setEmailFlag] = useState(false)


const handleChange = (e) => 
{
  e.preventDefault();
  
  setFormData(preVal => ({...preVal,[e.target.name]:e.target.value}))
}



const NavigateToHomePage =  () => 
{
 const postIngData =  fetch('/api/register', 
  {
    method:"POST",
    body:JSON.stringify(formData),
    headers:
    {
      'Content-Type':'application/json'
    }
  })
  .then(response => response.json())
  .then(val => {
    setUserData(val)
    if(val.hasOwnProperty('code')){
      const kys = Object.keys(val.keyValue)
      if(kys == "username"){
        setUserFlag(true)
      }
      else{
        setEmailFlag(true)
      }
    }
    else{
      localStorage.setItem("userData", JSON.stringify(val))
      navigate('/',{state: val})
    }
  })
  .catch(err => console.log(err))
}

const Validation = () => 
{


  var isValid = true

 const fnameErr = {}
 if(formData.name == "")
 {
  fnameErr.Err = "Enter the name";
  isValid = false;
 }
 setFnameErr(fnameErr);

 const lnameErr = {}
 if(formData.lastname == "")
 {
  lnameErr.Err = "Enter the Last name";
  isValid = false;
 }

 setLnameErr(lnameErr);

 const unameErr = {}
 const UsernameRegex = "^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$"
 if(!formData.username.match(UsernameRegex))
 {
  unameErr.Err = "Enter an Alphanumeric username";
  isValid = false;
 }
//  isUserExist()
//  if(userFlag)
//  {
//   unameErr.Err = "User exists. Pls change the username";
//   isValid = false 
//  }
 
 
 setUnameErr(unameErr)


 const emlErr = {};
    const emlRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (formData.email == "") {
      emlErr.Err = "Pls enter the Email";
      isValid = false;
    }
    if (formData.email.eml != "") {
      if (!formData.email.match(emlRegex)) {
        emlErr.Err = "Enter a valid email address";
        isValid = false;
      }
    }
    setEmlErr(emlErr);



    const pswrdErr = {}
    // const pswrdRegex = "/^(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/";
    if(formData.password.length < 6)
    {
      pswrdErr.Err = "Enter the Strong Password"
      isValid = false
    }
    else if(formData.password.length == 0)
    {
      pswrdErr.Err = "Pls enter the Password"
      isValid = false 
    }

    // else if(!formData.password.match(pswrdRegex))
    // {
    //   pswrdErr.Err = "Password Must Contains Numbers, Special Characater"
    //   isValid = false
    // }
    setPswrdErr(pswrdErr)


    // const confPswrdErr = {}
    // if(!formData.confirmPassword.includes(formData.password))
    // {
    //   confPswrdErr.Err = "Password does not match...."
    //   isValid = false
    // }
    // setConfPswrdErr(confPswrdErr)

    return isValid;

}

 const handleSubmit = (e) => 
 {
  e.preventDefault()
  if(Validation())
  {
      NavigateToHomePage();
      if(isUserExist) { setUserFlag(false)}
      if(isEmailExist) { setEmailFlag(false)}

  }
 }

  return (
    <Container>
      <Wrapper>
        <Title>Create an Account</Title>
        <Form onChange={handleChange}>
            <Input name="name" type="text" placeholder = "name"/>
        
            {Object.keys(fnameErr).map((err) => <h5 style={{color:"#FAC33C", fontWeight:"500"}}>{fnameErr[err]}</h5>)}
            
            <Input name="lastname" type="text" placeholder = "last name"/>
         
            {Object.keys(lnameErr).map((err) => <h5 style={{color:"#FAC33C", fontWeight:"500"}}>{lnameErr[err]}</h5>)}
            
            <Input name="username" type="text" placeholder = "username"/>

            {isUserExist ? <h5 style={{color:"#FAC33C", fontWeight:"500"}}>Username is already exists.</h5> : null}
            
            {Object.keys(unameErr).map((err) => <h5 style={{color:"#FAC33C", fontWeight:"500"}}>{unameErr[err]}</h5>)}
            
            <Input name="email" type="email" placeholder = "email"/>

            {isEmailExist ? <h5 style={{color:"#FAC33C", fontWeight:"500"}}>Email is already exists.</h5> : null}
            
            {Object.keys(emlErr).map((err) => <h5 style={{color:"#FAC33C", fontWeight:"500"}}>{emlErr[err]}</h5>)}
            
            <Input name="password" type="password" placeholder = "password"/>
         
            {Object.keys(pswrdErr).map((err) => <h5 style={{color:"#FAC33C", fontWeight:"500"}}>{pswrdErr[err]}</h5>)}
            
         
         
            <Button onClick={handleSubmit}>Create Account</Button>
        </Form>
      </Wrapper>
    </Container>
  )
}

export default Register


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background:   url("https://img.freepik.com/free-photo/model-being-covered-by-shopping-bags-copy-space_23-2148674119.jpg?w=2000") center;
  background-size:cover ;
  display: flex;
  align-items:center ;
  justify-content:center;
`
// background-color: #ff4e00;
// #FEDE00
// background-image: linear-gradient(315deg, #ff4e00 0%, #ec9f05 74%);

const Wrapper = styled.div`
 padding: 20px;
 width: 40%;
 background-image: linear-gradient(135deg, #de2b38 85%, white 10%);
 margin-right:700px ;
 
 ${mobileDevice({
    width: "20%"
  })}
`

const Title = styled.h1`
 font-style: 20px;
 font-weight: 300;
 color: white;
`

const Form = styled.form`
 display: flex;
  flex-direction:column ;
 align-items:center;
 justify-content:center;
`

const Input = styled.input`
 flex: 1;
 min-width:40%;
margin: 20px 10px 0px 0px;
padding: 10px;
`

const Button = styled.button`
 width:30%;
 border:none;
 padding: 10px;
 background-color:  #585f6a;
 color: white;
 cursor: pointer;
 margin: 15px;
 box-shadow: 1px 2px 1px rgba(255,255,255, .8) ;
`


