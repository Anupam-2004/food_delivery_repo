import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Col,
  Container,
  Row,
  Nav,
  Navbar,
  Offcanvas,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import { Routes, Route, Link } from "react-router-dom";
import Landing from "./Components/Landing";
import Restaurents from "./Components/Restaurents";
import AddRestaurent from "./Components/AddRestaurent";
import AdminRestaurents from "./Components/AdminRestaurents";
import ViewRestaurent from "./Components/ViewRestaurent";
import FoodCategory from "./Components/FoodCategory";
import AddfoodCategory from "./Components/AddfoodCategory";
import Foods from "./Components/Foods";
import Register from "./Components/Register";
import Login from "./Components/Login";
import AddProducts from "./Components/AddProducts";
import Dashboard from "./Components/Dashboard";
import Orders from "./Components/Orders";
import AdminOrders from "./Components/AdminOrders";
import Products from "./Components/Products";
import AdminProducts from "./Components/AdminProducts";
import OwnerOrders from "./Components/OwnerOrders";
import Users from "./Components/Users";
// import About from "./Components/About";
import Account from "./Components/Account";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { IoIosLogOut } from "react-icons/io";
import { logout } from "./slices/auth";
import { PiShoppingCartSimpleThin } from "react-icons/pi";
import { BiSolidOffer } from "react-icons/bi";
import { IoRestaurant } from "react-icons/io5";
import { CiHome } from "react-icons/ci";
import { BiFoodMenu } from "react-icons/bi";

function App() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);
  useEffect(() => {
    if (currentUser) {
      console.log(currentUser);
    }
  }, [currentUser]);
  const handleLogout = () => {
    dispatch(logout());
    window.location.reload();
  };
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
                      <CiHome />
                      Home
                    </Nav.Link>
                    <Nav.Link as={Link} to={"/menu"}>
                      <BiFoodMenu /> Menu
                    </Nav.Link>
                    <Nav.Link as={Link} to={"/restaurent"}>
                      <IoRestaurant /> Restaurent
                    </Nav.Link>
                    <Nav.Link as={Link} to={"/"}>
                      <PiShoppingCartSimpleThin /> Cart
                    </Nav.Link>

                    <Nav.Link href="#offers">
                      <BiSolidOffer />
                      Offer
                    </Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Col>
              <Col md={3} className="text-end">
                {currentUser ? (
                  <div>
                    {/* <span className="me-2">
                      Welcome {currentUser.firstName}
                    </span>{" "} */}
                    <DropdownButton
                      id="dropdown-basic-button"
                      title={currentUser.firstName}
                    >
                      {currentUser.roles[0] == "ROLE_ADMIN" ? (
                        <Dropdown.Item as={Link} to={"/Dashboard"}>
                          Dashboard
                        </Dropdown.Item>
                      ) : (
                        ""
                      )}
                      <Dropdown.Item href="#/action-1">Account</Dropdown.Item>

                      <Dropdown.Item as={Link} to={"/Order"}>
                        Orders
                      </Dropdown.Item>

                      <Dropdown.Item onClick={handleLogout}>
                        Logout <IoIosLogOut />
                      </Dropdown.Item>
                    </DropdownButton>

                    {/* <Button onClick={handleLogout}>
                      <IoIosLogOut />
                    </Button> */}
                  </div>
                ) : (
                  <div>
                    <button className="btn btn-danger" onClick={handleShow}>
                      Log In
                    </button>
                    <Offcanvas show={show} onHide={handleClose} placement="end">
                      <Offcanvas.Header closeButton>
                      
                      </Offcanvas.Header>
                      <Offcanvas.Body>
                        <Login />
                      </Offcanvas.Body>
                    </Offcanvas>
                  </div>
                )}
              </Col>
            </Row>
          </Container>
        </Navbar>
      </Row>

      <Routes>
        <Route path="" element={<Landing />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/restaurents" element={<Restaurents />} />
        <Route path="/AddRestaurent" element={<AddRestaurent />} />
        <Route path="/AdminRestaurents" element={<AdminRestaurents />} />
        <Route
          path="/ViewRestaurent/:restaurentId"
          element={<ViewRestaurent />}
        />
        <Route path="/FoodCategory" element={<FoodCategory />} />
        <Route path="/AddfoodCategory" element={<AddfoodCategory />} />
        {/* <Route path="/About" element={<About />} /> */}
        <Route path="/menu" element={<Foods />} />
        <Route path="/Register" element={<Register />} />
      <Route path="/Addproducts/:id" element={<AddProducts />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Orders" element={<Orders />} />
        <Route path="/AdminOrders" element={<AdminOrders />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/AdminProducts" element={<AdminProducts />} />
        <Route path="/OwnerOrders" element={<OwnerOrders />} />
        <Route path="/Users" element={<Users />} />
        <Route path="/Account" element={<Account />} />
        {/* <Route path="/Foods" element={<Foods/>} /> */}
      </Routes>
    </div>
  );
}

export default App;
