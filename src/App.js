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
  Button,
} from "react-bootstrap";
import { Routes, Route, Link } from "react-router-dom";
import Landing from "./Components/Landing";
import Restaurents from "./Components/Restaurents";
import AddRestaurent from "./Components/AddRestaurent";
import AdminRestaurents from "./Components/AdminRestaurents";
import ViewRestaurent from "./Components/ViewRestaurent";
import FoodCategory from "./Components/Categories";
import AddfoodCategory from "./Components/AddfoodCategory";
import Foods from "./Components/Foods";
import Register from "./Components/Register";
import Login from "./Components/Login";
import AddProduct from "./Components/AddProduct";
import Dashboard from "./Components/Dashboard";
import Orders from "./Components/Orders";
import AdminOrders from "./Components/AdminOrders";
import Products from "./Components/Products";
import AdminProducts from "./Components/AdminProducts";
import OwnerOrders from "./Components/OwnerOrders";
import Users from "./Components/Users";
import AddCart from "./Components/AddCart";
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
import Address from "./Components/Address";
import RestaurentOrder from "./Components/RestaurentOrder";
import TrackOrder from "./Components/TrackOrder";
import Categories from "./Components/Categories";
import AdminInvoice from "./Components/AdminInvoice";


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
    useEffect(() => {
      if (!currentUser) {
        navigate("/");
      } else {
        console.log(currentUser);
      }
    }, [currentUser, navigate]);
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
                <Navbar.Toggle
                  aria-controls="offcanvasNavbar"
                  onClick={handleShow}
                />
              
                <Navbar.Offcanvas id="offcanvasNavbar" placement="start">
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Foodie</Offcanvas.Title>
                  </Offcanvas.Header>

                  <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-1">
                      <Nav.Link href="/">
                        {" "}
                        <CiHome /> Home
                      </Nav.Link>
                       <Nav.Link as={Link} to={"/Category"}>
                      <BiFoodMenu /> Categories
                    </Nav.Link>
                      <Nav.Link href="/Restaurents">
                        {" "}
                        <IoRestaurant /> Restaurants
                      </Nav.Link>
                      <Nav.Link href="/offers">
                        {" "}
                        <BiSolidOffer /> Offers
                      </Nav.Link>
                     <Nav.Link as={Link} to={"/cart"}>
                      <PiShoppingCartSimpleThin /> Cart
                    </Nav.Link>
                    </Nav>
                  </Offcanvas.Body>
                </Navbar.Offcanvas>
              </Col>
              <Col md={3} className="text-end">
                {currentUser ? (
                  <div>
                    <DropdownButton
                      id="dropdown-basic-button"
                      title={currentUser.firstName}
                    >
                      {currentUser.roles[0] === "ROLE_ADMIN" ? (
                        <Dropdown.Item as={Link} to={"/Dashboard"}>
                          Dashboard
                        </Dropdown.Item>
                      ) : (
                        "  "
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
                      <Offcanvas.Header closeButton></Offcanvas.Header>
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
        <Route path="/Restaurents" element={<Restaurents />} />
        <Route path="/AddRestaurent" element={<AddRestaurent />} />
        <Route path="/AdminRestaurents" element={<AdminRestaurents />} />
        <Route
          path="/ViewRestaurent/:restaurentId"
          element={<ViewRestaurent />}
        />
        <Route path="/Category" element={<Categories />} />
        <Route path="/AddfoodCategory" element={<AddfoodCategory />} />
        {/* <Route path="/About" element={<About />} /> */}
        <Route path="/menu" element={<Foods />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/AddProduct" element={<AddProduct />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Orders" element={<Orders />} />
        <Route path="/AdminOrders" element={<AdminOrders />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/AdminProducts" element={<AdminProducts />} />
        <Route path="/OwnerOrders" element={<OwnerOrders />} />
        <Route path="/Users" element={<Users />} />
        <Route path="/Account" element={<Account />} />
        <Route path="/cart" element={<AddCart />} />
        <Route path="/Address" element={<Address />} />
        <Route path="/RestaurentOrder" element={<RestaurentOrder/>}/>
        <Route path="/track-order" element={<TrackOrder />} />
        <Route path="/AdminInvoice" element={<AdminInvoice />} />

      </Routes>
    </div>
  );
}

export default App;
