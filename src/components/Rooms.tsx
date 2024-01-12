import styled from "styled-components";
import TitleBalls from "./TitleBalls";
import { Button, Close } from "./Buttons";

interface WrapProps {
  show: boolean;
}

const Wrap = styled.div<WrapProps>`
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  @media screen and (max-width: 900px) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #fafafa;
    z-index: 1;
    animation: dropright 0.5s ease;

    ${(props) => (props.show ? "display:flex;" : "display:none;")}
  }

  @keyframes dropright {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(0);
    }
  }
`;

const Header = styled.div`
  padding: 10px 20px;
  display: flex;
  background-color: #fafafa;
  align-items: center;
  height: 60px;
  gap: 5px;
  border: 1px solid #ddd;

  font-weight: 600;
  font-size: 18px;
`;

const Title = styled.div`
  margin-right: auto;
`;

const Room = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background-color: #fafafa;
  border: 1px solid #ddd;
  border-top: none;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

export default function Rooms({
  rooms,
  setIndex,
  showMenu,
  setShowMenu,
}: {
  rooms: number[][];
  idx?: number;
  setRooms?: React.Dispatch<React.SetStateAction<number[][]>>;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  showMenu: boolean;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Wrap show={showMenu}>
      <Header>
        <Title>그룹</Title>
        <Button
          onClick={() => {
            setIndex(-1);
            setShowMenu(false);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </Button>
        <Close
          onClick={() => {
            setShowMenu(false);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </Close>
      </Header>
      {rooms.map((room, index) => (
        <Room
          key={index}
          onClick={() => {
            setIndex(index);
            setShowMenu(false);
            localStorage.setItem("index", JSON.stringify(index));
          }}
        >
          <TitleBalls numbers={room}></TitleBalls>
        </Room>
      ))}
    </Wrap>
  );
}
