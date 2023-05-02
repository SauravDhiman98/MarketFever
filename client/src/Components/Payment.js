import React,{useState, useEffect} from "react";
import axios from "axios";
import {useLocation} from 'react-router-dom';
import styled from "styled-components";



const PaymentComponent = (props) => {
    const Data = JSON.parse(localStorage.getItem('userData'))
    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    async function displayRazorpay() {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );
        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        const reqData = {
            "username": Data.userInfo.username,
            "amount": ((props.totalCost + props.shippingCharge) * 100).toString(),
            "currency": "INR",
            "receipt": "uyguygwc39847",
            "notes": {
                "description": "Payment For ",
                "language": "Eng"
            }
        }

        const result = await axios.post("/api/createpayment",reqData);
       // console.log(result)

        if (!result) {
            alert("Server error. Are you online?");
            return;
        }
        console.log(result.data)
        const { amount, id, currency } = result.data;

        const options = {
            key: "rzp_test_zOOJFWCByHoowm", // Enter the Key ID generated from the Dashboard
            amount: amount,
            currency: currency,
            name: "VM Corporation",
            description: "Test Transaction",
            order_id: id,
            handler: async function (response) {
                console.log(response)
                const data = {
                    userId: Data.userInfo._id,
                    orderCreationId: id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };

                const result = await axios.post("/api/success", data);
            },
            prefill: {
                name: Data.userInfo.name,
                email: Data.userInfo.email
                // contact: routingData.state.userData.Num.phoneNumber,
            },
            notes: {
                address: "Machine Address will be here",
            },
            theme: {
                color: "#61dafb",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    return (
        <OuterContainer>
            <InnerContainer> 
                <h1>Payment</h1>
                <h5>Total Cost: {props.totalCost}</h5>
                <h5>Shipping Charge: {props.shippingCharge}</h5>
                <h4>Total Amount to Pay: {props.totalCost + props.shippingCharge} rupees</h4>
                <Button  onClick={displayRazorpay}>
                   Pay Now
                </Button>
            </InnerContainer>
        </OuterContainer>
    );
}

export default PaymentComponent

const OuterContainer = styled.div`
 display: flex;
 height: 100%;
 width: 100%;
 justify-content:center;
 margin-top:100px ;
`

const InnerContainer = styled.div`
min-width: 600px;
min-height: 300px;
display: flex;
flex-direction:column;
justify-content: center;
`

const Table = styled.table`
display: flex;
flex-direction: column;
align-items:center ;
box-shadow: lightgray 1px 3px 5px ;
`
const Tr = styled.tr`
 display: flex;
 flex-direction: row;
 justify-content: center;
`
const InnerTr  = styled.tr`
 display: flex;
 justify-content: center;
 align-items:center;
`

const Th = styled.th`
border: 1px solid black;
width: 150px;
padding-top: 10px;
  padding-bottom: 20px;
  padding-left: 30px;
  padding-right: 40px;
  :nth-child(even){
  background-color: rgba(150, 212, 212, 0.4);
}
`
const Td = styled.td`
 border: 1px solid black;
 width: 150px;
 padding-top: 10px;
  padding-bottom: 20px;
  padding-left: 30px;
  padding-right: 40px;
  display: flex;
  justify-content:center;
  align-items: center;
  :nth-child(odd) {
  background-color: rgba(150, 212, 212, 0.4);
}
`

const Button = styled.button`
  width: 150px;
  height: 30px;
  border: none;
  box-shadow: grey 1px 2px 2px;
  cursor: pointer;
  :hover {
    background-color: lightgray;
  }
`
