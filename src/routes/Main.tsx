import { useEffect, useState } from "react";
import styled from "styled-components";
import ChatRoom from "../components/ChatRoom";
import Rooms from "../components/Rooms";
import DrawInfo from "../components/DrawInfo";

const Wrapper = styled.div`
  width: 100%;
  max-width: 900px;
  padding-top: 25px;
  gap: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  font-size: 30px;
  text-align: center;
`;

const T2 = styled(Title)`
  font-size: 20px;

  @media screen and (max-width: 900px) {
    display: none;
  }
`;

const Grid = styled.div`
  width: 100%;
  display: grid;
  flex: 1;
  overflow: hidden;
  position: relative;
  grid-template-columns: 1.2fr 3fr;
  grid-template-rows: auto;

  @media screen and (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;
export default function Main() {
  const [rooms, setRooms] = useState<number[][]>([]);
  const [index, setIndex] = useState<number>(-1);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  console.log(rooms, index);
  useEffect(() => {
    let data = localStorage.getItem("rooms");
    let i = localStorage.getItem("index");
    if (data) setRooms(JSON.parse(data));
    if (i) setIndex(JSON.parse(i));
  }, []);
  return (
    <Wrapper>
      <Title>로또 번호별 그룹채팅</Title>
      <T2>같은 번호를 산 사람들과 대화해 보세요</T2>
      <DrawInfo></DrawInfo>
      <Grid>
        <Rooms
          rooms={rooms}
          idx={index}
          setRooms={setRooms}
          setIndex={setIndex}
          showMenu={showMenu}
          setShowMenu={setShowMenu}
        ></Rooms>
        <ChatRoom
          rooms={rooms}
          idx={index}
          setRooms={setRooms}
          setIndex={setIndex}
          setShowMenu={setShowMenu}
        ></ChatRoom>
      </Grid>
    </Wrapper>
  );
}
