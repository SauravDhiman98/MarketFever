import { useState, useContext, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";
import CloseButton from "@mui/icons-material/Close";
import { mobileDevice } from "../Responsive";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import { Context } from "../Pages/UserContext";
import PersonIcon from "@mui/icons-material/Person";

const NavBar = () => {
  const navigate = useNavigate();

  const msg = JSON.parse(localStorage.getItem("userData"));
  const [showUser, setShow] = useState(false);
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    fetch(`/api/getcartitems/${msg?.userInfo?._id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((val) => setProductData(val));
    //  return () => {

    //  }
  }, []);

  console.log(productData);

  const handleSubmit = () => {
    localStorage.clear();
    navigate("/login");
  };

  const getCartItemPage = () => {
    navigate("/cart");
  };

  const getUserProfile = () => {
    return (
      <ButtonContainer>
        <Profile>
          <CloseButton
            style={{
              cursor: "pointer",
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              border: "1px solid white",
            }}
            onClick={() => setShow(false)}
          />
        </Profile>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Parameters>User Profile</Parameters>
            <Parameters>Order</Parameters>
            <Parameters>Contact Us</Parameters>
            <Parameters>Settings</Parameters>
          </div>
        </div>
        <LogOut onClick={handleSubmit}>Log Out</LogOut>
      </ButtonContainer>
    );
  };
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchBar>
            <Input />

            <SearchIcon style={{ color: "gray", fontSize: 16 }} />
          </SearchBar>
        </Left>
        <Center>
          <Logo>Market Fever</Logo>
        </Center>
        <Right>
          {msg != null && msg.userInfo != null ? (
            <>
              {" "}
              <PersonIcon />
              <UserProfile onClick={() => setShow(true)}>
                {msg?.userInfo?.name}
              </UserProfile>
            </>
          ) : (
            <>
              {" "}
              <RightText>
                <Link to="/register">Register</Link>
              </RightText>
              <RightText>
                <Link to="/login">Login</Link>
              </RightText>
            </>
          )}

          {showUser ? getUserProfile() : null}
          <MenuItems>
            <Badge badgeContent={productData.length} color="success">
              <ShoppingCartTwoToneIcon
                onClick={() => getCartItemPage()}
                color="action"
              />
            </Badge>
          </MenuItems>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default NavBar;

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  /* ${mobileDevice({
    padding: "10px 0px",
  })} */
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.div`
  font-size: 14px;
  cursor: pointer;
  /* ${mobileDevice({
    display: "none",
  })} */
`;
const Center = styled.div`
  flex: 1;
`;

const Logo = styled.h1`
  font-weight: bold;
  text-align: center;
  /* ${mobileDevice({
    fontSize: "20px",
  })} */
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  /* ${mobileDevice({
    justifyContent: "center",
    flex: "2",
  })} */
`;

const RightText = styled.div`
  font-size: 15px;
  margin-left: 10px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
`;
const MenuItems = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  /* ${mobileDevice({
    fontSize: "12px",
    marginLeft: "10px",
  })} */
`;

const SearchBar = styled.div`
  border: 0.5px solid lightgrey;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  /* ${mobileDevice({
    width: "50px",
  })} */
`;

const Props = styled.div`
  width: auto;
  height: 20px;
  padding: 8px;
  background-color: transparent;
  border-radius: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  box-shadow: 1px 1px 3px 2px #b1b1b1;
`;

const UserProfile = styled.div`
  color: black;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  padding: 10px;
  text-decoration: none;
  border-radius: 10px;
  position: relative;
`;

const ButtonContainer = styled.div`
  width: 150px;
  height: auto;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  position: absolute;
  margin-top: 200px;
  z-index: 3;
  background: teal;
  color: white;
`;

const Profile = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const LogOut = styled.button`
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

const Parameters = styled.div`
  display: flex;
  justify-content: center;
  font-size:15px;
  font-weight: 500;
  cursor: pointer;
`;
