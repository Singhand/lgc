import styled from "styled-components";

export const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1;
  height: 100%;
  border-radius: 50%;
  border: 1px solid #ddd;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
  svg {
    width: 50%;
    height: 50%;
  }
`;

export const Close = styled(Button)`
  display: none;
  border: none;
  @media screen and (max-width: 900px) {
    display: flex;
  }
`;

export const Nonclose = styled(Close)`
  display: flex;
`;
