import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useState } from "react";
import { styled } from "styled-components";
import { auth, db, storage } from "../firebase";
import Modal from "./modal";
import { ITweet } from "./timeline";

const Container = styled.div`
  width: 90%;
  height: 70%;
  max-height: 100%;
  max-width: 500px;
  background-color: black;
  border-radius: 20px;
  padding: 20px;
  z-index: 2;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 15px;
  cursor: pointer;
`;

const TextArea = styled.textarea`
  border: 2px solid white;
  padding: 20px;
  border-radius: 20px;
  font-size: 16px;
  color: white;
  background-color: black;
  width: 100%;
  resize: none;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  &::placeholder {
    font-size: 16px;
  }
  &:focus {
    outline: none;
    border-color: #ffffff;
  }
`;

const AttachFileButton = styled.label`
  padding: 10px 0px;
  text-align: center;
  border-radius: 20px;
  border: 1px solid white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;

const AttachFileInput = styled.input`
  display: none;
`;

const SubmitBtn = styled.input`
  border: none;
  padding: 10px 0px;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  &:hover,
  &:active {
    opacity: 0.9;
  }
`;

const CloseBtn = styled(AttachFileButton)`
  color: white;
  border: none;
  background-color: #e74444;
`;

export default function EditTweet({
  show,
  tweetObj,
}: {
  show: React.Dispatch<React.SetStateAction<boolean>>;
  tweetObj: ITweet;
}) {
  console.log("edit tweet");
  let { photo, tweet, id } = tweetObj;

  const [isLoading, setLoading] = useState(false);
  const [fileForEdit, setFile] = useState<File | null>(null);
  const [tweetNew, setTweet] = useState(tweet);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length === 1) {
      if (files[0].size > 1 * 1024 * 1024) {
        alert(`Image size cannot be larger than 1MB.`);
        return;
      }
      setFile(files[0]);
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user || isLoading || tweetNew === "" || tweetNew.length > 180) {
      show(false);
      return;
    }
    try {
      setLoading(true);
      const docRef = doc(db, "tweets", id);
      // 이미지 저장
      if (fileForEdit) {
        const locationRef = ref(storage, `tweets/${user.uid}/${id}`);
        const result = await uploadBytes(locationRef, fileForEdit);
        const url = await getDownloadURL(result.ref);

        // url 추가
        await updateDoc(docRef, {
          tweet: tweetNew,
          photo: url,
        });
      } else {
        await updateDoc(docRef, {
          tweet: tweetNew,
        });
      }
      setTweet("");
      setFile(null);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
      show(false);
    }
  };
  return (
    <Modal show={show}>
      <Container>
        <Form onSubmit={onSubmit}>
          <TextArea
            rows={5}
            maxLength={180}
            onChange={onChange}
            value={tweetNew}
            placeholder="메시지 입력"
          />
          {!fileForEdit && <Photo src={photo} />}
          <AttachFileButton htmlFor="fileEdit">
            {fileForEdit ? "완료 ✅" : "사진 변경"}
          </AttachFileButton>
          <AttachFileInput
            onChange={onFileChange}
            type="file"
            id="fileEdit"
            accept="image/*"
          />
          <SubmitBtn type="submit" value={isLoading ? "진행중..." : "수정"} />
          <CloseBtn
            onClick={() => {
              show(false);
            }}
          >
            닫기
          </CloseBtn>
        </Form>
      </Container>
    </Modal>
  );
}
