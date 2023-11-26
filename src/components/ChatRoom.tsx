import { Unsubscribe } from "firebase/auth";
import { collection, doc, onSnapshot, query, setDoc } from "firebase/firestore";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import { Button, Close, Nonclose } from "./Buttons";
import NumberForm from "./NumberForm";
import TitleBalls from "./TitleBalls";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-left: none;
  background-color: #fafafa;
  margin-bottom: 20px;
  @media screen and (max-width: 900px) {
    margin: 0;
  }
`;

const Header = styled.div`
  padding: 10px;
  height: 60px;
  display: flex;
  align-items: center;
  gap: 5px;
  border-bottom: 1px solid #ddd;
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 18px;
  @media screen and (max-width: 900px) {
    display: none;
  }
`;

const FormWrap = styled.div`
  margin-top: 20px;
`;

const Fill = styled.div`
  flex: 1;
`;

const ChatWrap = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 10px;
  flex: 1;
  margin: 10px;
  padding: 0 20px;
  background-color: #f0f0f0;
  overflow-x: hidden;
  overflow-y: auto;
`;

const Chat = styled.div`
  background-color: #fafafa;
  border-radius: 10px;
  padding: 10px;
  width: fit-content;
  max-width: 80%;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.1);

  &:first-child {
    margin-top: 10px;
  }

  &:nth-last-child(1) {
    margin-bottom: 10px;
  }
`;

const Ciw = styled.div`
  display: flex;
  align-items: end;
  padding: 0 10px;
  padding-bottom: 10px;
  width: 100%;
  height: 40px;
  background-color: #fafafa;
`;

const Ci = styled.input`
  border: none;
  background: none;
  flex: 1;
  border-bottom: 2px solid #989898;
  outline: none;
  transition: 0.3s;
  &:focus {
    border-bottom: 2px solid #353535;
  }
`;

let roomInfo: string | undefined = undefined;
let unsubscribe: Unsubscribe | null = null;

export default function ChatRoom({
  rooms,
  idx,
  setRooms,
  setIndex,
  setShowMenu,
}: {
  rooms: number[][];
  idx: number;
  setRooms: any;
  setIndex: any;
  setShowMenu: any;
}) {
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  const [inputValue, setInputValue] = useState("");
  const [chats, setChats] = useState<any[]>([]);

  useEffect(() => {
    let newRoomInfo = JSON.stringify(rooms[idx]);
    if (newRoomInfo && newRoomInfo != roomInfo) {
      console.log("room changed");

      // 구독 해제
      unsubscribe && unsubscribe();

      // 채팅 목록 초기화
      setChats([]);

      // 스냅샷 리스너 체인지
      const fetch = async () => {
        console.log("try to connect to", newRoomInfo);
        const chatsQuery = query(collection(db, "rooms", newRoomInfo, "chats"));
        unsubscribe = onSnapshot(chatsQuery, (snapshot) => {
          console.log("snapshot called");
          const nd = snapshot.docs.map((doc) => {
            const { content } = doc.data();
            return {
              content,
            };
          });
          setChats(nd);
        });
      };
      fetch();
    } else if (!newRoomInfo) {
      unsubscribe && unsubscribe();
    }
    roomInfo = newRoomInfo;
    return () => {
      unsubscribe && unsubscribe();
    };
  }, [rooms, idx]);

  useEffect(() => {
    if (chats && chats.length > 0) {
      scrollToBottom();
    }
  }, [chats]);

  const scrollToBottom = useCallback(() => {
    // Check if the ref and current are not null before accessing properties
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatContainerRef]);

  const handleKeyPress = useCallback(
    (
      event: { key: string },
      input: string,
      set: React.Dispatch<React.SetStateAction<string>>
    ) => {
      if (event.key === "Enter") {
        handleEnter(input, set);
      }
    },
    []
  );

  const handleEnter = useCallback(
    async (
      input: string,
      set: React.Dispatch<React.SetStateAction<string>>
    ) => {
      if (input.length > 0 && input.length <= 1000) {
        set("");

        // data add
        console.log("data add to", roomInfo);
        let docRef = doc(
          db,
          "rooms",
          roomInfo || "limbo",
          "chats",
          `${new Date().getTime()}`
        );

        await setDoc(docRef, {
          content: input,
        });
      }
    },
    [roomInfo]
  );

  const inputChange = useCallback(
    (event: { target: { value: React.SetStateAction<string> } }) => {
      setInputValue(event.target.value);
    },
    []
  );

  const leave = useCallback(() => {
    if (confirm("정말 방을 나가겠습니까?")) {
      console.log("leave room");
      let newRoom = [...rooms];
      newRoom.splice(idx, 1);
      let newIndex = idx >= newRoom.length ? idx - 1 : idx;
      localStorage.setItem("rooms", JSON.stringify(newRoom));
      localStorage.setItem("index", JSON.stringify(newIndex));
      setRooms(newRoom);
      setIndex(newIndex);
    }
  }, [rooms, idx]);

  return (
    <Wrap>
      <Header>
        <Close
          onClick={() => {
            setShowMenu(true);
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
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </Close>
        <Title>{idx != -1 ? "방 번호" : "새 그룹 추가"}</Title>
        {idx != -1 && (
          <>
            <TitleBalls numbers={rooms[idx]}></TitleBalls>
            <Fill></Fill>
            <Nonclose onClick={leave}>
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
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                />
              </svg>
            </Nonclose>
          </>
        )}
      </Header>
      {idx == -1 && (
        <FormWrap>
          <NumberForm
            setRooms={setRooms}
            setIndex={setIndex}
            rooms={rooms}
          ></NumberForm>
        </FormWrap>
      )}

      {idx != -1 && (
        <>
          <ChatWrap ref={chatContainerRef}>
            {chats.map((v, i) => (
              <Chat key={i}>{v.content ? v.content : ""}</Chat>
            ))}
          </ChatWrap>
          <Ciw>
            <Ci
              type="text"
              value={inputValue}
              onChange={inputChange}
              onKeyDown={(e) => {
                handleKeyPress(e, inputValue, setInputValue);
              }}
            ></Ci>
            <Button
              onClick={() => {
                handleEnter(inputValue, setInputValue);
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
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                />
              </svg>
            </Button>
          </Ciw>
        </>
      )}
    </Wrap>
  );
}
