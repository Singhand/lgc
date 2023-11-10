import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import styled from "styled-components";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import GithubButton from "../components/github-button";

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
      opacity: 0.8;
    }
  }
`;

const Error = styled.span`
  font-weight: 600;
  margin-top: 10px;
  color: tomato;
`;

const Switcher = styled.span`
  margin-top: 20px;
  a {
    color: skyblue;
  }
`;

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "password") {
      setPassword(value);
    } else if (name === "email") {
      setEmail(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (isLoading || email === "" || password === "") return;

    try {
      setIsLoading(true);
      const credential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log(credential.user);
      navigate("/");
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
    console.log(email, password);
  };
  return (
    <>
      <Wrapper>
        <Title>Log into 𝕏</Title>
        <Form onSubmit={onSubmit}>
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
          <Input type="submit" value={isLoading ? "Loading" : "Login"}></Input>
        </Form>
        {error !== "" ? <Error>{error}</Error> : null}
        <Switcher>
          Don't have an account? <Link to="/create-account">Create one</Link>
        </Switcher>
        <GithubButton></GithubButton>
      </Wrapper>
    </>
  );
}
