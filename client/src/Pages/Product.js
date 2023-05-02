import styled from "styled-components";
import Anncouement from "../Components/Annoucement";
import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";
import Newsletter from "../Components/Newsletter";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Add from "@mui/icons-material/AddBox";
import Remove from "@mui/icons-material/RemoveCircle";
import { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Context } from "./UserContext";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import { Link, useParams, useNavigate } from "react-router-dom";
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";
import CloseButton from "@mui/icons-material/Close";
import Badge from "@mui/material/Badge";
import Loader from "../Components/Loader";
import CustomPopUp from "../Components/CustomPopUp";

const Product = () => {
  const navigate = useNavigate();
  const data = JSON.parse(localStorage.getItem("userData"));
  const itms = useLocation();
  const username = data?.userInfo?.username;
  const price = Number(itms.state.Item.price);
  const title = itms.state.Item.title;
  const img = itms.state.Item.img;
  const [values, setValues] = useState({
    username: username,
    price: price,
    title: title,
    img: img,
  });

  const [productData, setProductData] = useState([]);
  const [showUser, setShow] = useState(false);
  const [color, setColor] = useState(null);
  const [size, setSize] = useState("XS");
  const [quantity, setQuantity] = useState(1);
  const [chckQntity, setChckQuantity] = useState(false)
  const [flag, setFlag] = useState(false);
  const [showLoader, setShowLoader] = useState(false)
  const [showPopUp, setPopUp] = useState(false)

  const handleChangeSize = (event) => {
    setSize(event.target.value);
  };

  const handleSubmit = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    fetch(`/api/getcartitems/${data?.userInfo?._id}`,{
      method: 'GET',
      headers:
      {
        'Content-type':'application/json'
      }
     })
     .then(res => res.json())
     .then(val => setProductData(val))
 }, [chckQntity])

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

  const shutOffPopUp = () => {
    setTimeout(() => {
     setPopUp(false)
    }, 3000)
  }

  const PUTData = async () => {
    if (!values.hasOwnProperty("quantity")) {
      setValues((val) => ({ ...val, ["quantity"]: 1 }));
    }
    await fetch("/api/updateuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((val) => {
        setShowLoader(false)
        setChckQuantity(() => !chckQntity)
        setPopUp(true)
        shutOffPopUp();
      })
      .catch((err) => console.log(err));
  };

  const getCartItemPage = () => {
    navigate('/cart')
}

  const AddtoCart = (event) => {
    event.preventDefault();
    setShowLoader(true)
    PUTData();
    //  setFlag(true);
  };

  // useEffect(() =>
  // {
  //   if(flag)
  //   {
  //    PUTData();
  //   }
  // }
  // ,[flag, values])

  return <div>
     {
      showLoader ? <div style={{position:'absolute'}}><Loader/></div>
      : null
      }
            {
        showPopUp ? <div style={{position: 'absolute'}}> <CustomPopUp  title={itms.state.Item.title} quantity={quantity} /> </div> : null
      }
      <Container>
      <Context.Provider value={itms}>
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
            {data != null ? (
              <>
                {" "}
                <PersonIcon />
                <UserProfile onClick={() => setShow(true)}>
                  {data?.userInfo?.name}
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
              <Badge badgeContent={productData?.length} color="success">
                <ShoppingCartTwoToneIcon onClick={() => getCartItemPage()} color="action" />
              </Badge>
            </MenuItems>
          </Right>
        </Wrapper>
      </Context.Provider>

      <Anncouement />
      <Wrapper1>
        <ImgContainer>
          <Img src={itms.state.Item.img} />
        </ImgContainer>
        <InfoCOntainer>
          <Title>{itms.state.Item.title}</Title>
          <Desc>{itms.state.Item.desc}</Desc>
          <Price>
            <CurrencyRupeeIcon />
            {itms.state.Item.price}
          </Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              <FilterColor color="black" onClick={() => setColor("black")} />
              <FilterColor
                color="darkblue"
                onClick={() => setColor("darkblue")}
              />
              <FilterColor color="gray" onClick={() => setColor("gray")} />
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FIlterSize onChange={handleChangeSize}>
                <FilterSizeOption>XS</FilterSizeOption>
                <FilterSizeOption>S</FilterSizeOption>
                <FilterSizeOption>M</FilterSizeOption>
                <FilterSizeOption>L</FilterSizeOption>
                <FilterSizeOption>XL</FilterSizeOption>
              </FIlterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove
                onClick={() => {
                  if (quantity > 1) {
                    setQuantity((val) => val - 1);
                    setValues((val) => ({
                      ...val,
                      ["quantity"]: quantity - 1,
                    }));
                  }
                }}
              />

              <Amount>{quantity}</Amount>
              <Add
                onClick={() => {
                  setQuantity(quantity + 1);
                  setValues((val) => ({ ...val, ["quantity"]: quantity + 1 }));
                }}
              />
            </AmountContainer>
            <Button onClick={AddtoCart}>Add To Cart</Button>
            <Button onClick={() => navigate('/cart')}>Buy Now</Button>
          </AddContainer>
        </InfoCOntainer>
      </Wrapper1>
      <Newsletter />
      <Footer />
    </Container>   
  </div>
};

export default Product;

const Container = styled.div``;
const Wrapper1 = styled.div`
  padding: 50px;
  display: flex;
`;
const ImgContainer = styled.div`
  flex: 1;
`;
const Img = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: contain;
`;

const InfoCOntainer = styled.div`
  flex: 1;
  padding: 0px 50px;
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;
const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FIlterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.div`
  margin: 10px;
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  margin: 10px;
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 600;
  &: hover {
    background-color: #ebe0d0;
  }
`;
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;

`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.div`
  font-size: 14px;
  cursor: pointer;
`;
const Center = styled.div`
  flex: 1;
`;

const Logo = styled.h1`
  font-weight: bold;
  text-align: center;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
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
