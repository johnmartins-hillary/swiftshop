import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";
import { publicRequest } from "../requestMethod.js";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("/images/pic6.webp") center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;
const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;
const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;
const Agreement = styled.div`
  font-size: 12px;
  margin: 20px 0px;
`;
const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;
const LINK = styled(Link)`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
  color: #000;
`;

function Register() {
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const password = useRef();
  const confirmPassword = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { confirmPassword, ...others } = userData;
    try {
      const res = await publicRequest.post("auth/signup", others);
      if (res) {
        navigate("/login");
      } else {
        console.log("something went wrong");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (event) => {
    setUserData((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }));
  };

  return (
    <>
      <Navbar />
      <Container>
        <Wrapper>
          <Title>CREATE AN ACCOUNT</Title>
          <Form onSubmit={handleSubmit}>
            <Input
              placeholder="firstname"
              type="text"
              id="firstname"
              required
              onChange={handleChange}
            />
            <Input
              placeholder="lastname"
              type="text"
              id="lastname"
              required
              onChange={handleChange}
            />
            <Input
              placeholder="username"
              type="text"
              id="username"
              required
              minLength="6"
              onChange={handleChange}
            />
            <Input
              placeholder="email"
              id="email"
              type="email"
              required
              onChange={handleChange}
            />
            <Input
              type="password"
              placeholder="......"
              required
              id="password"
              minLength="6"
              onChange={handleChange}
              ref={password}
            />
            <Input
              type="password"
              placeholder="......"
              required
              minLength="6"
              id="confirmPassword"
              onChange={handleChange}
              ref={confirmPassword}
            />
            <Agreement>
              By creating an account, I consent to the processing of my personal
              data in accordance with thew <b>PRIVACY POLICY</b>
            </Agreement>
            <div style={{ width: "100%", marginBottom: "10px" }}>
              <LINK to="/login">Already a user? login</LINK>
            </div>
            <Button type="submit">CREATE</Button>
          </Form>
        </Wrapper>
      </Container>
    </>
  );
}

export default Register;
