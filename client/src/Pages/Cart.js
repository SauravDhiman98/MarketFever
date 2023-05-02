import styled, { keyframes } from "styled-components";
import Annuocement from "../Components/Annoucement";
import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";
import Add from "@mui/icons-material/AddBox";
import Remove from "@mui/icons-material/RemoveCircle";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";
import Payment from "../Components/Payment"

const Cart = () => {
  const navigate = useNavigate();
  const [counter, setCounter] = useState(1);
  const [itemPrice, setItemPrice] = useState(0);
  const [shippingCharges, setShippingCharges] = useState(40);
  const [discount, setDiscount] = useState();
  const [finalPrice, setFinalPrice] = useState();
  const [getCartData, setCartData] = useState();
  const [spinner, setSpinner] = useState(true);
  const [showCart, setShowCart] = useState(true);
  const [showAdressPage, setShowAdressPage] = useState(false);
  const [showPayPage, setShowPayPage] = useState(false);
  const [adressFlg, setAdressFlg] = useState(true);
  const [payFlg, setPayFlg] = useState(true);
  const [userAdress, setUserAdress] = useState({});
  const [adressLoader, setAdressLoader] = useState(false);
  const [getPrvsAddedAdrss, setPrvAddedAdrs] = useState([]);

  const data = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    fetch(`/api/getcartitems/${data?.userInfo?._id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((dt) => {
        setCartData(dt);
        setSpinner(false);
        let totalPrice = 0;
        dt?.map((val) => {
          console.log(val.price);
          totalPrice += Number(val.price);
        });
        setItemPrice(totalPrice);
      });

    fetch(`/api/getuseradress/${data?.userInfo?._id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((val) => {
        setPrvAddedAdrs(val);
      });

    //  return () => {

    //  }
  }, []);

  const Incre = () => {
    if (counter >= 1) {
      setCounter((counter) => counter + 1);
    }
  };

  const Dec = () => {
    if (counter > 1) {
      setCounter((counter) => counter - 1);
    }
  };

  const handleAdressPage = () => {
    setShowCart(false);
    setShowAdressPage(true);
    setAdressFlg(false);
  };

  const getUserAdress = (event) => {
    event.preventDefault();
    setUserAdress((preVal) => ({
      ...preVal,
      [event.target.name]: event.target.value.toString(),
    }));
  };

  const saveUserAdress = () => {
    setAdressLoader(true);
    fetch("/api/AddressOfUser", {
      method: "POST",
      body: JSON.stringify({
        id: data?.userInfo?._id,
        userData: userAdress,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((val) => {
        console.log(val)
        if (val.status == 201) {
          setAdressLoader(false);
          setShowAdressPage(false);
          setShowCart(false);
          setShowPayPage(true);
          setPayFlg(false);
        }
      });
  };

  const updateShippingAdrs = (indx) => {
    const adresData = {
      id: data?.userInfo?._id,
      indx: indx
    }
    setAdressLoader(true);
      fetch('/api/updateshippingadress',{
        method:'POST',
        body: JSON.stringify(adresData),
        headers:{
          "Content-Type": "application/json",
        }
      })
      .then(res => res.json())
      .then(val => {
        if(val.status == 201)
        {
          setAdressLoader(false);
          setShowAdressPage(false);
          setShowCart(false);
          setShowPayPage(true);
          setPayFlg(false);
        }
      })
  }
  return (
    <Container>
      <NavBar />
      <Annuocement />
      <Wrapper>
        <InnerNtfrCntr>
          <Notifier>
            <FrstNtfr flg={false}>
              <h4>1</h4>
            </FrstNtfr>
            <Bar flg={adressFlg}></Bar>
            <FrstNtfr flg={adressFlg}>
              <h4>2</h4>
            </FrstNtfr>
            <Bar flg={payFlg}></Bar>
            <FrstNtfr flg={true}>
              <h4>3</h4>
            </FrstNtfr>
          </Notifier>
          <Notifier2>
            <ScndNtfr>
              <h4>Purchased</h4>
            </ScndNtfr>
            <ScndNtfr>
              <h4>Adress</h4>
            </ScndNtfr>
            <ScndNtfr>
              <h4>Payment</h4>
            </ScndNtfr>
          </Notifier2>
        </InnerNtfrCntr>

        {/* Code written for the CART part */}
        {showCart ? (
          <>
            <Title>Your Cart</Title>
            <Top>
              <TopButton onClick={() => navigate("/")}>
                Continue Shopping
              </TopButton>

              {getCartData?.length == 0 ? (
                <TopText> Shoping Bag is Empty </TopText>
              ) : (
                <TopText> Shopping Bag({getCartData?.length}) </TopText>
              )}

              {/* <TopText>Your WishList(0)</TopText> */}
              <TopButton onClick={handleAdressPage}>Checkout Now</TopButton>
            </Top>
            <Bottom>
              <Info>
                {spinner ? (
                  <div className="loader"></div>
                ) : getCartData?.length == 0 ? null : (
                  getCartData?.map((val, indx) => (
                    <Product>
                      <Details>
                        <IMage src={val.img} />
                        <ProductDetail>
                          <Name>
                            <b>Product:</b>
                            {val.title}
                          </Name>
                          {/* <ProductID><b>ID:</b>13213513</ProductID> */}
                          <ProductColor color="0c1638" />
                          <ProductSize>
                            <b>Size:</b>37
                          </ProductSize>
                        </ProductDetail>
                      </Details>
                      <Price>
                        <ProductPrice>
                          <CurrencyRupeeIcon /> {val.price}
                        </ProductPrice>
                      </Price>
                    </Product>
                  ))
                )}
              </Info>
              <Summary>
                <SummaryTitle>Order Summary</SummaryTitle>
                <SummaryTotal>
                  <SummaryTotalText>Subtotal</SummaryTotalText>
                  <SummaryTitlePrice>
                    <CurrencyRupeeIcon />
                    {itemPrice}
                  </SummaryTitlePrice>
                </SummaryTotal>

                <SummaryTotal>
                  <SummaryTotalText>Shipping Charges</SummaryTotalText>
                  <SummaryTitlePrice>
                    <CurrencyRupeeIcon />
                    {shippingCharges}
                  </SummaryTitlePrice>
                </SummaryTotal>

                <SummaryTotal>
                  {/* <SummaryTotalText>Price AfterDiscount</SummaryTotalText>
                <SummaryTitlePrice>{finalPrice}</SummaryTitlePrice> */}
                </SummaryTotal>

                <SummaryTotal>
                  <SummaryTotalAmount>Total</SummaryTotalAmount>
                  <SummaryTitlePriceAMount>
                    <CurrencyRupeeIcon />
                    {itemPrice + shippingCharges}
                  </SummaryTitlePriceAMount>
                </SummaryTotal>
              </Summary>
            </Bottom>{" "}
          </>
        ) : null}
        {/* CART code ended here.... */}
        {/* Adress Page code will start from here */}
        {showAdressPage ? (
          <OuterForm>
            <InnerForm onChange={getUserAdress}>
              <h3>Shipping Adress</h3>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <FormInput name="flatNumber" placeholder="Flat Number" />
                <FormInput name="nearByMark" placeholder="Near By Mark" />
              </div>
              <FormInput
                name="fullAddress"
                placeholder="Adress"
                style={{ width: "350px" }}
              />
              <div style={{ display: "flex", flexDirection: "row" }}>
                <FormInput name="phoneNumber" placeholder="Phone Number" />
                <FormInput
                  name="altPhoneNumber"
                  placeholder="Alternate Phone Number"
                />
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <FormInput name="pinCode" placeholder="Pin Code" />
                <FormInput name="state" placeholder="State" />
              </div>
            </InnerForm>
            <SaveButton onClick={saveUserAdress}>Save</SaveButton>
            {adressLoader ? <div className="adressLoader"></div> : null}

            <div style={{marginTop: '5px', display: 'flex', flexDirection:'column', alignItems: 'center'}}>
              Use Previous Saved Address
              {getPrvsAddedAdrss?.map((val, key) => (
                <div onClick={() => updateShippingAdrs(key)} key={key} >
                <button style={{margin:'5px', cursor:'pointer',color:"white", background: "teal", border: "none", borderRadius: "2px"}}>Adress {key + 1}</button>
                </div>
              ))}
            </div>
          </OuterForm>
        ) : null}
        {/* Adress Page Code will end here */}

        {/* Payment Page Code will start from here*/}
        {showPayPage ? <Payment  totalCost={itemPrice} shippingCharge={shippingCharges} /> : null}
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const Notifier = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const Notifier2 = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const InnerNtfrCntr = styled.div`
  display: flex;
  flex-direction: column;
`;

const FrstNtfr = styled.div`
  background-color: ${(props) => (props.flg ? "darkgrey" : "green")};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ScndNtfr = styled.div`
  display: flex;
`;

const Bar = styled.div`
  width: 350px;
  height: 5px;
  background-color: ${(props) => (props.flg ? null : "green")};
  transition: background-color 1.5s linear;
`;

const Title = styled.h1`
  font-weight: 200;
  text-align: center;
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 5px;
`;

const Info = styled.div`
  flex: 3;
`;
const Summary = styled.div`
  flex: 1;
  /* box-shadow: 1px 1px 1px 2px rgba(0,0,0,.3) ; */
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px;
`;

const Details = styled.div`
  flex: 2;
  display: flex;
`;

const IMage = styled.img`
  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.3);
  width: 200px;
`;

const ProductDetail = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
`;

const Name = styled.span`
  margin: 10px;
`;

const ProductID = styled.span`
  margin: 10px;
`;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #${(props) => props.color};
  margin: 10px;
`;

const ProductSize = styled.div`
  margin: 10px;
`;

const Price = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ProductAmountContainer = styled.div`
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

const ProductAmount = styled.div`
  margin: 10px;
  padding: 5px;
`;

const ProductPrice = styled.div`
  display: flex;
  font-size: 20px;
  margin: 10px;
`;

const SummaryTitle = styled.div`
  font-size: 30px;
  font-weight: 500;
`;

const SummaryTotal = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const SummaryTotalText = styled.h5`
  margin: 10px;
  padding: 5px;
  font-size: 15px;
  font-weight: 400;
`;

const SummaryTitlePrice = styled.div``;
const SummaryTotalAmount = styled.h2`
  font-size: 25px;
  font-weight: 450;
  margin: 10px;
`;

const SummaryTitlePriceAMount = styled.h2`
  font-size: 25px;
  font-weight: 450;
  margin: 10px;
`;

const OuterForm = styled.div`
  border: 4px solid teal;
  border-radius: 10px;
  min-height: 500px;
  width: 600px;
  margin-left: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InnerForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormInput = styled.input`
  min-width: 150px;
  height: 30px;
  margin: 15px;
  border-style: none;
  background-color: lightgrey;
  border-radius: 2px;
  color: darkblue;
`;

const SaveButton = styled.button`
  margin-top: 50px;
  min-width: 200px;
  min-height: 30px;
  background-color: teal;
  border-style: none;
  cursor: pointer;
  color: whitesmoke;
  font-weight: 600;
  font-size: 15px;
  border-radius: 10px:
`;
