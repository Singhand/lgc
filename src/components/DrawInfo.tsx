import { useCallback, useEffect, useState } from "react";
import { styled } from "styled-components";
import { WhiteBtn } from "./Buttons";
import TitleBalls from "./TitleBalls";

const Wrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const Con1 = styled.div`
  font-weight: bold;
`;

const Red = styled.div`
  color: #cf1212;
`;

export default function DrawInfo() {
  const [text, setText] = useState("");
  const [showBtn1, setShowBtn1] = useState(false);
  const [showBtn2, setShowBtn2] = useState(false);
  const [numbers, setNumbers] = useState<number[] | null>(null);

  const openDh = useCallback(() => {
    window.open("https://dhlottery.co.kr/common.do?method=main");
  }, []);

  const openLive = useCallback(() => {
    window.open("https://onair.imbc.com/");
  }, []);

  const showComingTime = useCallback(() => {
    const draw = new Date();
    while (draw.getDay() != 6) {
      draw.setDate(draw.getDate() + 1);
    }
    setText(
      `다음 추첨은 ${draw.getFullYear()}.${
        draw.getMonth() + 1
      }.${draw.getDate()} 오후 8시 35분입니다`
    );
    setShowBtn1(true);
  }, []);

  const getDrawResult = useCallback(async () => {
    let offset = new Date();
    offset.setFullYear(2023, 11, 2);

    let today = new Date();
    let no = 1096;

    while (offset.getTime() <= today.getTime()) {
      if (
        offset.getFullYear() == today.getFullYear() &&
        offset.getMonth() == today.getMonth() &&
        offset.getDate() == today.getDate()
      ) {
        break;
      }
      no += 1;
      offset.setDate(offset.getDate() + 7);
    }

    let res = await fetch(`/api/common.do?method=getLottoNumber&drwNo=${no}`);
    let rj = await res.json();
    if (rj["returnValue"] == "success") {
      let balls = [];
      for (let index = 1; index <= 6; index++) {
        balls.push(rj[`drwtNo${index}`]);
      }
      setText(`${no}회 당첨번호`);
      setNumbers(balls);
    }
  }, []);

  useEffect(() => {
    const date = new Date();

    if (date.getDay() == 6) {
      if (date.getHours() == 20) {
        if (date.getMinutes() >= 35 && date.getMinutes() <= 40) {
          // 추첨 보러 가기
          setText("추첨중입니다");
          setShowBtn2(true);
        } else if (date.getMinutes() > 40) {
          // 추첨 결과 대기중
          setText("추첨 결과 대기중...");
        } else {
          // 추첨 시간 표시
          showComingTime();
        }
      } else if (date.getHours() > 20) {
        // 추첨 결과
        getDrawResult();
      } else {
        // 추첨 시간 표시
        showComingTime();
      }
    } else {
      // 추첨 시간 표시
      showComingTime();
    }

    return () => {};
  }, []);

  return (
    <Wrap>
      <Con1>{text}</Con1>
      {showBtn1 && <WhiteBtn onClick={openDh}>구매하러 가기</WhiteBtn>}
      {showBtn2 && (
        <WhiteBtn onClick={openLive}>
          <Red>●</Red>라이브 보러가기
        </WhiteBtn>
      )}
      {numbers && <TitleBalls numbers={numbers}></TitleBalls>}
    </Wrap>
  );
}
