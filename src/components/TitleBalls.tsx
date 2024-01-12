import React from "react";
import { styled } from "styled-components";

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Ball = styled.div<{ $num: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  margin: 5px;
  border-radius: 50%;
  font-size: 14px;
  font-weight: bold;
  color: white;

  ${(props) => {
    if (props.$num >= 1 && props.$num <= 10) {
      return "background-color: #ecc33c;";
    } else if (props.$num >= 11 && props.$num <= 20) {
      return "background-color: #5085e8;";
    } else if (props.$num >= 21 && props.$num <= 30) {
      return "background-color: #e32b2b;";
    } else if (props.$num >= 31 && props.$num <= 40) {
      return "background-color: gray;";
    } else if (props.$num >= 41 && props.$num <= 45) {
      return "background-color: #31cc31;";
    }
    return "";
  }}
`;

export default function TitleBalls({ numbers }: { numbers: number[] }) {
  return (
    <Wrap>
      {numbers.map((number: number, index: React.Key | null) => (
        <Ball key={index} $num={number}>
          {number}
        </Ball>
      ))}
    </Wrap>
  );
}
