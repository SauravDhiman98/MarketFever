import React from "react";
import styled from "styled-components";
import Annuocement from "../Components/Annoucement";
import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";

const Adress = () => {
  return (
    <OuterContainer>
      <NavBar />
      <Annuocement />
      <InnerNtfrCntr>
        <Notifier>
          <FrstNtfr flg={false}>
            <h4>1</h4>
          </FrstNtfr>
          <Bar flg={false}></Bar>
          <FrstNtfr flg={true}>
            <h4>2</h4>
          </FrstNtfr>
          <Bar flg={true}></Bar>
          <FrstNtfr flg={true}>
            <h4>3</h4>
          </FrstNtfr>
        </Notifier>
        <Notifier2>
          <ScndNtfr><h4>Purchased</h4></ScndNtfr>
          <ScndNtfr><h4>Adress</h4></ScndNtfr>
          <ScndNtfr><h4>Payment</h4></ScndNtfr>
        </Notifier2>
      </InnerNtfrCntr>
      <Footer />
    </OuterContainer>
  );
};

export default Adress;

const OuterContainer = styled.div``;

const Notifier = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

 const Notifier2 = styled.div`
 display: flex;
 justify-content: space-evenly ;
 `;


const InnerNtfrCntr = styled.div`
display: flex;
flex-direction: column;
`;

const FrstNtfr = styled.div`
  background-color: ${(props) => (props.flg ? 'darkgrey' : 'green')};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ScndNtfr = styled.div`
 display: flex;
`

const Bar = styled.div`
  background-color: ${props => (props.flg ? 'darkgrey': 'green') };
  width: 350px;
  height: 5px;
`;
