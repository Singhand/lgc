import React from "react";
import { styled } from "styled-components";

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Ball = styled.div`
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
    switch (props.color) {
      case "yellow":
        return "background-color: #ecc33c;";
      case "blue":
        return "background-color: #5085e8;";
      case "red":
        return "background-color: #e32b2b;";
      case "gray":
        return "background-color: gray;";
      case "green":
        return "background-color: #31cc31;";
      default:
        return "";
    }
  }}
`;

const getColorClass = (number: number) => {
  if (number >= 1 && number <= 10) {
    return "yellow";
  } else if (number >= 11 && number <= 20) {
    return "blue";
  } else if (number >= 21 && number <= 30) {
    return "red";
  } else if (number >= 31 && number <= 40) {
    return "gray";
  } else if (number >= 41 && number <= 45) {
    return "green";
  }
  return ""; // Default color
};

export default function TitleBalls({ numbers }: { numbers: any }) {
  return (
    <Wrap>
      {numbers.map((number: number, index: React.Key | null) => (
        <Ball key={index} color={getColorClass(number)}>
          {number}
        </Ball>
      ))}
    </Wrap>
  );
}
