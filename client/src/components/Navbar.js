import React from "react";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";
import { mobile, tablet } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Badge } from "@material-ui/core";
import ShoppingCartOutlined from "@material-ui/icons/ShoppingCartOutlined";
import { signout } from "../redux/userRedux.js";

const Container = styled.div`
  padding: 10px;
  width: 100%;
  ${mobile({ padding: "10px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px", flexWrap: "wrap" })}
`;
const Left = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
const Language = styled.div`
  cursor: pointer;
  font-size: 14px;
  ${mobile({ display: "none" })}
  ${tablet({ display: "flex" })}
`;
const SearchContainer = styled.div`
  border: 0.5px solid lightgrey;
  display: flex;
  align-items: center;
  padding: 5px;
  border-radius: 50px;
  margin-left: 5px;
`;

const Input = styled.input`
  border: none;
  width: 100%;
  outline: none;
  padding: 10px;
  ${mobile({ padding: "5px" })}
`;
const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled(Link)`
  font-weight: bold;
  font-size: 30px;
  text-decoration: none;
  color: #000;
  cursor: pointer;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({
    flex: 2,
    justifyContent: "flex-start",
    minWidth: "300px",
    marginTop: "20px",
  })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ foontSize: "12px", marginLeft: "10px" })}
`;

function Navbar() {
  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignout = () => {
    dispatch(signout());
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="search" />
            <FiSearch style={{ color: "grey", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo to="/">SWIFTSHOP</Logo>
        </Center>
        <Right>
          <MenuItem onClick={() => navigate("/register")}>REGISTER</MenuItem>
          {user ? (
            <MenuItem onClick={handleSignout}>SIGN OUT</MenuItem>
          ) : (
            <MenuItem onClick={() => navigate("/login")}>SIGN IN</MenuItem>
          )}
          <Link to="/cart">
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
}

export default Navbar;
