import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Col,
  Container,
  Row,
  Nav,
  NavDropdown,
  Navbar,
  Offcanvas,
} from "react-bootstrap";
import { Routes, Route, Link } from "react-router-dom";
import Landing from "./Components/Landing";
import Restaurent from "./Components/Restaurent";
import AddRestaurent from "./Components/AddRestaurent";
import AdminRestaurent from "./Components/AdminRestaurent";
import ViewRestaurent from "./Components/ViewRestaurent";
import FoodCategory from "./Components/FoodCategory";
import AddfoodCategory from "./Components/AddfoodCategory";
import Addfood from "./Components/Addfood";
import Foods from "./Components/Foods";
import Register from "./Components/Register";
import Login from "./Components/Login";
import AddProduct from "./Components/AddProduct";
import Dashboard from "./Components/Dashboard";
import Order from "./Components/Order";
import AdminOrders from "./Components/AdminOrders";

function App() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <Row>
        <Navbar expand="lg">
          <Container fluid>
            <Row className="nav">
              <Col md={3}>
                <Navbar.Brand href="#home" className="logo_name">
                  <img src="/logo.png" alt="Logo" className="logo" />
                  Foodie
                </Navbar.Brand>
              </Col>
              <Col md={6}>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="mx-auto">
                    <Nav.Link as={Link} to={"/"}>
                      Home
                    </Nav.Link>
                    <Nav.Link as={Link} to={"/about"}>
                      About
                    </Nav.Link>
                    <Nav.Link as={Link} to={"/restaurent"}>
                      Restaurent
                    </Nav.Link>

                    <NavDropdown title="Services" id="basic-nav-dropdown">
                      <NavDropdown.Item href="#">Action</NavDropdown.Item>

                      <NavDropdown.Item href="#">
                        Another Action
                      </NavDropdown.Item>
                    </NavDropdown>

                    <Nav.Link href="#contact">Contact</Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Col>
              <Col md={3} className="text-end">
                <button className="btn btn-danger" onClick={handleShow}>
                  Log In
                </button>
                <Offcanvas show={show} onHide={handleClose} placement="end">
                  <Offcanvas.Header closeButton>
                    {/* <Offcanvas.Title>Register</Offcanvas.Title> */}
                  </Offcanvas.Header>
                  <Offcanvas.Body> 

                    <Login/>
                  </Offcanvas.Body>
                </Offcanvas>
              </Col>
            </Row>
          </Container>
        </Navbar>
      </Row>
      <Routes>
        <Route path="" element={<Landing />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/restaurent" element={<Restaurent />} />
        <Route path="/AddRestaurent" element={<AddRestaurent />} />
        <Route path="/AdminRestaurent" element={<AdminRestaurent />} />
        <Route path="/ViewRestaurent" element={<ViewRestaurent />} />
        <Route path="/FoodCategory" element={<FoodCategory />} />
        <Route path="/AddfoodCategory" element={<AddfoodCategory />} />
        <Route path="/Addfood" element={<Addfood />} />
        <Route path="/Foods" element={<Foods />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/AddProduct" element={<AddProduct />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard/>}/>
        <Route path="/Order" element={<Order />} />
        <Route path="/AdminOrders" element={<AdminOrders />} />

      </Routes>
    </div>
  );
}

export default App;
