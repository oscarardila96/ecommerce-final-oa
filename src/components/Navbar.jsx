import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import SideCart from './SideCart';

const NavBar = () => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar bg="light" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand href="/#/">e-Commerce <i className="fa-solid fa-shop"></i></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/"> <i className="fa-solid fa-house-user"></i> Home</Nav.Link>
              <Nav.Link as={Link} to="/login"><i className="fa-solid fa-right-to-bracket"></i>  Log In</Nav.Link>
              <Nav.Link as={Link} to="/purchases"> <i className="fa-solid fa-bag-shopping"></i> Purchases</Nav.Link>
              <Nav.Link onClick={handleShow}><i className="fa-solid fa-cart-shopping"></i> Cart</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <SideCart show={show} handleClose={handleClose} />
    </>
  );
};

export default NavBar;