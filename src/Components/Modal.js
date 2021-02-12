import React from "react";
import styled from "styled-components";

const Modal = ({ children, info }) => {
  return (
    <ModalStyled>
      <div>
        <strong>
          <h3>{info}</h3>
        </strong>
        {children}
      </div>
    </ModalStyled>
  );
};

export default Modal;

const ModalStyled = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  div {
    width: 350px;
    height: 200px;
    background: white;
    padding: 2rem;
  }
`;
