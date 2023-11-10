import React from "react";
import { styled } from "styled-components";

const ModalPlate = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ClosePlate = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  background-color: black;
  opacity: 0.4;
`;

export default function Modal({
  children,
  show,
}: {
  children: React.ReactNode;
  show: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  console.log("modal");
  return (
    <ModalPlate>
      <ClosePlate
        onClick={() => {
          show(false);
        }}
      ></ClosePlate>
      {children}
    </ModalPlate>
  );
}
