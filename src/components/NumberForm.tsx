import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 20px;

  @keyframes popup {
    0% {
      opacity: 0;
      transform: translateY(50%);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  animation: popup 0.5s ease;
`;
const Input = styled.input`
  padding: 5px;
  border: none;
  background: none;
  border-bottom: 2px solid #7e7e7e;
  text-align: center;
  outline: none;
  transition: 0.3s;
  &:focus {
    border-bottom: 2px solid #353535;
  }
`;

const Submit = styled.button`
  padding: 5px 20px;
  padding-bottom: 8px;
  border: none;
  background-color: #1f2e9f;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  transition: 0.3s;
  &:hover {
    opacity: 0.8;
  }

  &img {
    width: 10px;
    height: 10px;
  }
`;

const NumberForm = ({
  rooms,
  setRooms,
  setIndex,
}: {
  rooms: number[][];
  setRooms: React.Dispatch<React.SetStateAction<number[][]>>;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [values, setValues] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);

  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    let newValues = [...values];
    newValues[index] = value.slice(0, 2); // Allow up to 2 digits
    setValues(newValues);

    console.log(inputRefs);
    // If two digits are entered, focus on the next input
    if (value.length === 2 && index < values.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const sortInputs = () => {
    const sortedValues = [...values]
      .map((value) => parseInt(value, 10))
      .sort((a, b) => a - b);
    return sortedValues;
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const uniqueValues = new Set(values);
    if (values.length !== uniqueValues.size) {
      alert("중복되지 않는 숫자를 입력하세요");
      return;
    }

    const validRange = values.every(
      (value) => parseInt(value, 10) >= 1 && parseInt(value, 10) <= 45
    );

    if (!validRange) {
      alert("Please enter numbers between 1 and 45.");
      return;
    }

    let arr = sortInputs();
    console.log("Submitted values:", arr.join(", "));

    for (let i = 0; i < rooms.length; i++) {
      // 이미 같은 번호가 존재하는지 체크
      if (JSON.stringify(rooms[i]) == JSON.stringify(arr)) {
        console.log("find existing room");
        setIndex(i);
        return;
      }
    }

    console.log("add new room");
    let newRoom = [...rooms];
    newRoom.push(arr);
    localStorage.setItem("rooms", JSON.stringify(newRoom));
    localStorage.setItem("index", JSON.stringify(newRoom.length - 1));
    setRooms(newRoom);
    setIndex(newRoom.length - 1);
  };

  return (
    <Form onSubmit={handleSubmit}>
      {values.map((value, index) => (
        <Input
          key={index}
          type="number"
          value={value}
          onChange={(event) => handleInputChange(index, event)}
          ref={(el: HTMLInputElement) => (inputRefs.current[index] = el)}
          max="45"
          min="1"
          required
        />
      ))}
      <Submit type="submit">입장</Submit>
    </Form>
  );
};

export default NumberForm;
