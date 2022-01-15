import React from "react";
import { FiFacebook, FiInstagram, FiMail, FiTwitter } from "react-icons/fi";
import { FaLocationArrow, FaPhone, FaPinterest } from "react-icons/fa";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;
const Logo = styled.h1``;
const Desc = styled.p`
  margin: 20px 0px;
`;
const SocialContainer = styled.div`
  display: flex;
`;
const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;
const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;
const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;
const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#fff8f8" })}
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;
const Payment = styled.img`
  width: 100%auto;
`;

function Footer() {
  return (
    <Container>
      <Left>
        <Logo>SWIFTSHOP</Logo>
        <Desc>
          There are many varieties of pasages of lorek ipsum available, but the
          majiority have sufferes alteration inome form, by injected humour or
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus,
          dolores!
        </Desc>
        <SocialContainer>
          <SocialIcon color="3B5999">
            <FiFacebook />
          </SocialIcon>
          <SocialIcon color="E4405F">
            <FiInstagram />
          </SocialIcon>
          <SocialIcon color="55ACEE">
            <FiTwitter />
          </SocialIcon>
          <SocialIcon color="E60023">
            <FaPinterest />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Man Fashion</ListItem>
          <ListItem>Woman Fashion</ListItem>
          <ListItem>Accessories</ListItem>
          <ListItem>My Account</ListItem>
          <ListItem>Order Tracing</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Terms</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <FaLocationArrow style={{ marginRight: "10px" }} />
          48G Onyebuchi street Nsukka Enugu
        </ContactItem>
        <ContactItem>
          <FaPhone style={{ marginRight: "10px" }} />
          +243 7044377963
        </ContactItem>
        <ContactItem>
          <FiMail style={{ marginRight: "10px" }} />
          ekwealorhillary@gmail.com
        </ContactItem>
        <Payment src="https://1.bb.co/Qfvn4z6/payment.png" />
      </Right>
    </Container>
  );
}

export default Footer;
