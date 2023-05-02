import { useEffect, useState } from "react";
import styled from "styled-components";

const CustomPopUp = (props) => {

  return (

        <OuterContainer>
          <StyledPopUp>
            <h2 style={{color:'teal'}}>Product has been added to cart....</h2>
            <div><b>Product:</b> {props.title}</div>
            <div><b>Quantity:</b> {props.quantity}</div>
          </StyledPopUp>
        </OuterContainer>

  );
};

export default CustomPopUp;

const StyledCustomPopUp = styled.div`
 background-color: rgba(0,0,0,.5);
`;

const OuterContainer = styled.div`
  width: 100vw;
  height: 100vh;
 background-color: rgba(0,0,0,.5);
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;

`

const StyledPopUp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 10rem;
  width: 30rem;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;
