import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Header = () => {
  const dispatch = useDispatch();
  const sellerloginReducer = useSelector((state) => state.sellerloginreducer);
  const { issellerloggedin } = sellerloginReducer;
  const customerloginreducer = useSelector(
    (state) => state.customerloginreducer
  );
  const { iscustomerloggedin } = customerloginreducer;

  const sellerlogout = (e) => {
    dispatch({ type: "LOG_OUT" });
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("loggedin");
    sessionStorage.removeItem("rid");
  };
  const customerlogout = (e) => {
    dispatch({ type: "CUSTOMER_LOG_OUT" });
    sessionStorage.removeItem("customer_token");
    sessionStorage.removeItem("iscustomerloggedin");
    sessionStorage.removeItem("cid");
    sessionStorage.removeItem("address");
    sessionStorage.rempveItem("customer_name");
    localStorage.removeItem("orders");
  };

  return (
    <header>
      <Navbar bg="light" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>UberEats</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {!issellerloggedin && (
                <LinkContainer to="/cart">
                  <Nav.Link>Cart</Nav.Link>
                </LinkContainer>
              )}
              {issellerloggedin && (
                <LinkContainer to="/seller/home">
                  <Nav.Link>Home</Nav.Link>
                </LinkContainer>
              )}
              {issellerloggedin && (
                <LinkContainer to="/seller/order">
                  <Nav.Link>Orders</Nav.Link>
                </LinkContainer>
              )}

              {iscustomerloggedin && (
                <LinkContainer to="/customer/orders">
                  <Nav.Link>Order</Nav.Link>
                </LinkContainer>
              )}
              {iscustomerloggedin && (
                <LinkContainer to="/customer/profile">
                  <Nav.Link>Profile</Nav.Link>
                </LinkContainer>
              )}
              {iscustomerloggedin && (
                <LinkContainer to="/customer/favourites">
                  <Nav.Link>Favourites</Nav.Link>
                </LinkContainer>
              )}
              {!issellerloggedin ? (
                !iscustomerloggedin ? (
                  <LinkContainer to="/customer/login">
                    <Nav.Link>Login</Nav.Link>
                  </LinkContainer>
                ) : (
                  <LinkContainer to="/" onClick={customerlogout}>
                    <Nav.Link>Logout</Nav.Link>
                  </LinkContainer>
                )
              ) : (
                <></>
              )}

              {issellerloggedin && (
                <LinkContainer to="/seller/signin" onClick={sellerlogout}>
                  <Nav.Link>Logout</Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
