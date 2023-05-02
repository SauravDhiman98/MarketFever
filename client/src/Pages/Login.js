import styled from "styled-components";
import { mobileDevice } from "../Responsive";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../Components/NavBar";
import Home from "./Home";
import { Context } from "./UserContext";
import "../index.css";

const Login = () => {
  const [Nameflag, setNameFlag] = useState(false);
  const [Passflag, setPassFlag] = useState(false);
  const [info, setInfo] = useState({});
  const [response, setResponse] = useState(null);
  const [onLoader, setOffLoader] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    event.preventDefault();
    setInfo((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleClick = (event) => {
    event.preventDefault();
    setOffLoader(true)
    fetch("/api/Login", {
      method: "POST",
      body: JSON.stringify(info),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("userData", JSON.stringify(data));
        setResponse(data);
      });
  };

  useEffect(() => {
    if (response == "Wrong Password") {
      setOffLoader(false)
      setPassFlag(true);
    } else if (response == "Wrong username") {
      setOffLoader(false)
      setNameFlag(true);
    } else {
      setOffLoader(false)
      setNameFlag(false);
      setPassFlag(false);
      if (response != null) {
        let name = response.username;
        navigate("/");
      }
    }
  }, [response, Passflag, Nameflag, navigate]);

  return (
    <Container>
      <Wrapper>
        <Title>Sign In</Title>
        <Form>
          <Input1
            Nameflag={Nameflag}
            name="username"
            type="text"
            placeholder="username"
            onChange={handleChange}
          />

          <Input2
            Passflag={Passflag}
            name="password"
            type="password"
            placeholder="password"
            onChange={handleChange}
          />

          <Button onClick={handleClick}>Log in</Button>
          {
            onLoader ? <div className="loginLoader"></div> : null
          }
          <Link1>Forgot your Password or Username</Link1>
          <Link1>
            <Link to="/register">Don't have Account</Link>
          </Link1>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: url("https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80")
    center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;
// background-color: #ff4e00;
// #FEDE00
// background-image: linear-gradient(315deg, #ff4e00 0%, #ec9f05 74%);

const Wrapper = styled.div`
  padding: 20px;
  width: 40%;
  display: flex;
  flex-direction: column;
  background: rgba(121, 94, 59);
  ${mobileDevice({
    width: "75%",
  })}
`;

const Title = styled.h1`
  font-style: 20px;
  font-weight: 500;
  color: #252920;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Input1 = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
  ${(props) =>
    props.Nameflag === true
      ? `
  border: 2px solid red;
 `
      : null}
`;

const Input2 = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
  ${(props) =>
    props.Passflag === true
      ? `
  border: 2px solid red;
 `
      : null}
`;

const Button = styled.button`
  width: 30%;
  border: none;
  padding: 10px;
  background-color: rgb(39, 58, 38);
  color: white;
  cursor: pointer;
  margin: 15px;
  box-shadow: 1px 2px 1px rgba(255, 255, 255, 0.8);
`;

const Link1 = styled.a`
  &:hover {
    color: #f2a715;
    cursor: pointer;
  }
`;
