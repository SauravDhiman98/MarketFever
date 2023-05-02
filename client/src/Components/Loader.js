import "../index.css";
import styled from 'styled-components'

const Loader = () => {
  return (
    <OuterContainer>
      <div className="bigLoader"></div>
    </OuterContainer>
  );
};

export default Loader;

const OuterContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
