import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import styled from "styled-components";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 420px;
  padding: 50px 0px;
`;

const Title = styled.h1`
  font-size: 42px;
`;

const Form = styled.form`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;
const Input = styled.input`
  padding: 10px 20px;
  border-radius: 50px;
  border: none;
  width: 100%;
  font-size: 16px;
  &[type="submit"] {
    cursor: pointer;
    background-color: #3995e7;
    &:hover {
      opacity: 0.9;
    }
  }
`;

const Error = styled.span`
  font-weight: 600;
  margin-top: 10px;
  color: tomato;
`;

export default function CreateAccount() {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "name") {
      setName(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "email") {
      setEmail(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (isLoading || name === "" || email === "" || password === "") return;

    try {
      setIsLoading(true);
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(credential.user);
      await updateProfile(credential.user, {
        displayName: name,
      });
      navigate("/");
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
    console.log(name, email, password);
  };
  return (
    <>
      <Wrapper>
        <Title>Join 𝕏</Title>
        <Form onSubmit={onSubmit}>
          <Input
            onChange={onChange}
            value={name}
            name="name"
            placeholder="Name"
            type="text"
            required
          ></Input>
          <Input
            onChange={onChange}
            value={email}
            name="email"
            placeholder="Email"
            type="email"
            required
          ></Input>
          <Input
            onChange={onChange}
            value={password}
            name="password"
            placeholder="Password"
            type="password"
            required
          ></Input>
          <Input
            type="submit"
            value={isLoading ? "Loading" : "Create Account"}
          ></Input>
        </Form>
        {error !== "" ? <Error>{error}</Error> : null}
      </Wrapper>
    </>
  );
}
