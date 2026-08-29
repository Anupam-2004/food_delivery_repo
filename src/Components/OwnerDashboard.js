import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  Table,
  Badge,
  Alert,
  Spinner,
} from "react-bootstrap";

import "./OwnerDashboard.css";

import {
  FaStore,
  FaUtensils,
  FaShoppingBag,
  FaRupeeSign,
  FaPlus,
  FaEye,
  FaEdit,
  FaTrash,
  FaArrowRight,
  FaClock,
} from "react-icons/fa";

import { MdRestaurantMenu } from "react-icons/md";

import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const OwnerDashboard = () => {
  const navigate = useNavigate();

  // ==============================
  // CURRENT USER
  // ==============================

  const { user: currentUser } = useSelector((state) => state.auth);

  // ==============================
  // STATES
  // ==============================

  const [restaurent, setRestaurent] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

// OWNER ID
const ownerId = currentUser?.id || currentUser?._id;

useEffect(() => {
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError("");

      // ==========================================
      // 1. GET RESTAURANT BY OWNER ID
      // ==========================================

      if (!ownerId) {
        setError("Owner ID not found.");
        return;
      }

      const restaurentResponse = await axios.get(
        `http://localhost:8090/api/restaurents/user/${ownerId}`
      );

      console.log("Restaurant API Response:", restaurentResponse.data);

      let restaurentData = restaurentResponse.data;

      // Backend may return array
      if (Array.isArray(restaurentData)) {
        restaurentData = restaurentData[0] || null;
      }

      console.log("Restaurant Data:", restaurentData);

      setRestaurent(restaurentData);

      // ==========================================
      // GET RESTAURANT ID
      // ==========================================

      const restaurentId =
        restaurentData?._id ||
        restaurentData?.id ||
        restaurentData?.restaurentId;

      console.log("Restaurant ID:", restaurentId);

      // ==========================================
      // RESTAURANT NOT FOUND
      // ==========================================

      if (!restaurentId) {
        setProducts([]);
        setOrders([]);
        setError("Restaurant not found for this owner.");
        return;
      }

      // ==========================================
      // 2. GET PRODUCTS BY RESTAURANT ID
      // ==========================================

      const productsResponse = await axios.get(
        `http://localhost:8090/api/products/restaurant/${restaurentId}`
      );

      console.log("Products API Response:", productsResponse.data);

      let productsData = [];

      if (Array.isArray(productsResponse.data)) {
        productsData = productsResponse.data;
      } else if (Array.isArray(productsResponse.data?.products)) {
        productsData = productsResponse.data.products;
      }

      setProducts(productsData);

      // ==========================================
      // 3. GET ORDERS BY RESTAURANT ID
      // ==========================================

      const ordersResponse = await axios.get(
        `http://localhost:8090/api/orders/restaurent/${restaurentId}`
      );

      console.log("Orders API Response:", ordersResponse.data);

      let ordersData = [];

      if (Array.isArray(ordersResponse.data)) {
        ordersData = ordersResponse.data;
      } else if (Array.isArray(ordersResponse.data?.orders)) {
        ordersData = ordersResponse.data.orders;
      }

      // ==========================================
      // LATEST ORDERS FIRST
      // ==========================================

      ordersData.sort((a, b) => {
        const dateA = new Date(
          a.createdAt || a.updatedAt || 0
        );

        const dateB = new Date(
          b.createdAt || b.updatedAt || 0
        );

        return dateB - dateA;
      });

      setOrders(ordersData);

    } catch (err) {
      console.error("Owner Dashboard API Error:", err);

      setError(
        err.response?.data?.message ||
        "Failed to load dashboard data."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // USER CHECK
  // ==========================================

  if (!currentUser) {
    navigate("/");
    return;
  }

  // ==========================================
  // ROLE CHECK
  // ==========================================

  const roles = currentUser?.roles || [];

  if (
    !roles.includes("ROLE_OWNER") &&
    !roles.includes("ROLE_ADMIN")
  ) {
    navigate("/");
    return;
  }

  // ==========================================
  // FETCH
  // ==========================================

  if (ownerId) {
    fetchDashboardData();
  } else {
    setLoading(false);
    setError("Owner information not found.");
  }

}, [currentUser, ownerId, navigate]);
  // ==============================
  // DELETE PRODUCT
  // ==============================

  const handleDeleteProduct = async (productId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(
        `http://localhost:8090/api/products/${productId}`
      );

      // Remove product from UI
      setProducts((previousProducts) =>
        previousProducts.filter(
          (product) =>
            (product._id || product.id) !== productId
        )
      );

      alert("Product deleted successfully.");
    } catch (err) {
      console.error(
        "Delete Product Error:",
        err
      );

      alert(
        err.response?.data?.message ||
          "Failed to delete product."
      );
    }
  };

  // ==============================
  // ORDER STATUS COLOR
  // ==============================

  const getStatusVariant = (status) => {
    switch (status?.toLowerCase()) {
      case "processing":
      case "pending":
        return "warning";

      case "accepted":
        return "primary";

      case "shipped":
      case "preparing":
        return "info";

      case "ready":
        return "secondary";

      case "delivered":
      case "completed":
        return "success";

      case "cancelled":
      case "canceled":
        return "danger";

      default:
        return "secondary";
    }
  };

  // ==============================
  // TOTAL REVENUE
  // ==============================

  const totalRevenue = orders
    .filter(
      (order) =>
        order.orderStatus?.toLowerCase() ===
        "delivered"
    )
    .reduce(
      (total, order) =>
        total + Number(order.totalAmount || 0),
      0
    );

  // ==============================
  // LOADING SCREEN
  // ==============================

  if (loading) {
    return (
      <div
        className="owner-dashboard d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="text-center">
          <Spinner
            animation="border"
            variant="danger"
          />

          <p className="mt-3">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  // ==============================
  // UI
  // ==============================

  return (
    <div className="owner-dashboard">

      {/* ======================================
          SIDEBAR
      ====================================== */}

      <div className="owner-sidebar">

        <div className="sidebar-logo">
          <FaUtensils />

          <span>FoodAdmin</span>
        </div>

        {/* OWNER PROFILE */}

        <div className="owner-profile">

          <div className="owner-avatar">
            {currentUser?.firstName
              ?.charAt(0)
              ?.toUpperCase() || "O"}
          </div>

          <div>
            <h6>
              {currentUser?.firstName || "Owner"}
            </h6>

            <small>
              Restaurant Owner
            </small>
          </div>

        </div>

        {/* SIDEBAR MENU */}

        <ul className="sidebar-menu">

          <li
            className="active"
            onClick={() =>
              navigate("/OwnerDashboard")
            }
          >
            <FaStore />

            <span>Dashboard</span>
          </li>

          <li
            onClick={() =>
              navigate("/AddRestaurent")
            }
          >
            <FaStore />

            <span>Add Restaurant</span>
          </li>

          <li
            onClick={() =>
              navigate("/AddProduct")
            }
          >
            <FaPlus />

            <span>Add Product</span>
          </li>

          <li
            onClick={() =>
              navigate("/OwnerProducts")
            }
          >
            <MdRestaurantMenu />

            <span>View Products</span>
          </li>

          <li
            onClick={() =>
              navigate("/OwnerOrders")
            }
          >
            <FaShoppingBag />

            <span>Orders</span>
          </li>

          <li
            onClick={() =>
              navigate("/OwnerOrderHistory")
            }
          >
            <FaClock />

            <span>Order History</span>
          </li>

        </ul>

        {/* LOGOUT */}

        <div className="sidebar-bottom">

          <div
            onClick={() => {
              navigate("/");
            }}
          >
            🚪 Logout
          </div>

        </div>

      </div>

      {/* ======================================
          MAIN CONTENT
      ====================================== */}

      <div className="owner-main">

        {/* ====================================
            NAVBAR
        ==================================== */}

        <div className="owner-navbar">

          <div>
            <h4>Owner Dashboard</h4>

            <p>
              Manage your restaurant and orders
            </p>
          </div>

          <div className="owner-navbar-right">

            <div className="notification">
              🔔
            </div>

            <div className="owner-user">

              <div className="owner-small-avatar">
                {currentUser?.firstName
                  ?.charAt(0)
                  ?.toUpperCase() || "O"}
              </div>

              <div>
                <strong>
                  {currentUser?.firstName ||
                    "Owner"}
                </strong>

                <small>
                  Restaurant Owner
                </small>
              </div>

            </div>

          </div>

        </div>

        {/* ====================================
            ERROR
        ==================================== */}

        {error && (
          <Alert
            variant="danger"
            dismissible
            onClose={() => setError("")}
          >
            {error}
          </Alert>
        )}

        {/* ====================================
            WELCOME SECTION
        ==================================== */}

        <div className="welcome-section">

          <div>

            <h2>
              Welcome back,{" "}
              {currentUser?.firstName ||
                "Restaurant Owner"}{" "}
              👋
            </h2>

            <p>
              {restaurent?.restaurentName ||
                "Manage your restaurant"}
            </p>

          </div>

          {!restaurent && (
            <Button
              variant="light"
              onClick={() =>
                navigate("/AddRestaurent")
              }
            >
              <FaPlus className="me-2" />

              Add Restaurant
            </Button>
          )}

        </div>

        {/* ====================================
            DASHBOARD CARDS
        ==================================== */}

        <Row className="g-4 mb-4">

          {/* RESTAURANT */}

          <Col xl={3} md={6}>

            <Card className="dashboard-card">

              <Card.Body>

                <div className="card-icon">
                  <FaStore />
                </div>

                <div>

                  <p>My Restaurant</p>

                  <h3>
                    {restaurent ? 1 : 0}
                  </h3>

                  <small
                    className={
                      restaurent
                        ? "text-success"
                        : "text-danger"
                    }
                  >
                    {restaurent
                      ? "Active"
                      : "Not Added"}
                  </small>

                </div>

              </Card.Body>

            </Card>

          </Col>

          {/* PRODUCTS */}

          <Col xl={3} md={6}>

            <Card className="dashboard-card">

              <Card.Body>

                <div className="card-icon">
                  <FaUtensils />
                </div>

                <div>

                  <p>Total Products</p>

                  {/* IMPORTANT FIX */}

                  <h3>
                    {products.length}
                  </h3>

                  <small className="text-success">
                    Added Products
                  </small>

                </div>

              </Card.Body>

            </Card>

          </Col>

          {/* ORDERS */}

          <Col xl={3} md={6}>

            <Card className="dashboard-card">

              <Card.Body>

                <div className="card-icon">
                  <FaShoppingBag />
                </div>

                <div>

                  <p>Total Orders</p>

                  <h3>
                    {orders.length}
                  </h3>

                  <small className="text-success">
                    All Orders
                  </small>

                </div>

              </Card.Body>

            </Card>

          </Col>

          {/* REVENUE */}

          <Col xl={3} md={6}>

            <Card className="dashboard-card">

              <Card.Body>

                <div className="card-icon">
                  <FaRupeeSign />
                </div>

                <div>

                  <p>Revenue</p>

                  <h3>
                    ₹
                    {totalRevenue.toLocaleString(
                      "en-IN"
                    )}
                  </h3>

                  <small className="text-success">
                    Delivered Orders
                  </small>

                </div>

              </Card.Body>

            </Card>

          </Col>

        </Row>

        {/* ====================================
            RESTAURANT INFORMATION
        ==================================== */}

        {restaurent && (

          <Card className="restaurent-info-card mb-4">

            <Card.Body>

              <div className="d-flex justify-content-between align-items-center">

                <div>

                  <h4>
                    {restaurent.restaurentName ||
                      restaurent.restaurantName ||
                      "Restaurant"}
                  </h4>

                  <p className="text-muted mb-1">
                    {restaurent.addressLine1 ||
                      restaurent.address ||
                      "Restaurant Address"}
                  </p>

                  <p className="text-muted mb-0">

                    {restaurent.city || ""}

                    {restaurent.city &&
                    restaurent.state
                      ? ", "
                      : ""}

                    {restaurent.state || ""}

                  </p>

                </div>

                <Button
                  variant="outline-danger"
                  onClick={() =>
                    navigate(
                      `/EditRestaurant/${
                        restaurent._id ||
                        restaurent.id
                      }`
                    )
                  }
                >
                  <FaEdit className="me-2" />

                  Edit
                </Button>

              </div>

            </Card.Body>

          </Card>

        )}

        {/* ====================================
            QUICK ACTIONS
        ==================================== */}

        <div className="section-title">

          <div>

            <h4>Quick Actions</h4>

            <p>
              Manage your restaurant quickly
            </p>

          </div>

        </div>

        <Row className="g-4 mb-4">

          {/* ADD RESTAURANT */}

          <Col lg={4} md={6}>

            <Card className="quick-card">

              <Card.Body>

                <div className="quick-icon restaurent">
                  <FaStore />
                </div>

                <h5>
                  Add Restaurant
                </h5>

                <p>
                  Add your restaurant information
                  and details.
                </p>

                <Button
                  variant="outline-danger"
                  onClick={() =>
                    navigate("/AddRestaurent")
                  }
                >
                  Add Restaurant

                  <FaArrowRight className="ms-2" />
                </Button>

              </Card.Body>

            </Card>

          </Col>

          {/* ADD PRODUCT */}

          <Col lg={4} md={6}>

            <Card className="quick-card">

              <Card.Body>

                <div className="quick-icon product">
                  <FaPlus />
                </div>

                <h5>
                  Add Product
                </h5>

                <p>
                  Add new food items to your
                  restaurant menu.
                </p>

                <Button
                  variant="outline-danger"
              
                  onClick={() =>
                    navigate("/AddProduct")
                  }
                >
                  Add Product

                  <FaArrowRight className="ms-2" />
                </Button>

              </Card.Body>

            </Card>

          </Col>

          {/* VIEW PRODUCTS */}

          <Col lg={4} md={6}>

            <Card className="quick-card">

              <Card.Body>

                <div className="quick-icon view">
                  <FaEye />
                </div>

                <h5>
                  View Products
                </h5>

                <p>
                  View, edit and manage your
                  added products.
                </p>

                <Button
                  variant="outline-danger"
                
                  onClick={() =>
                    navigate("/ViewRestaurent")
                  }
                >
                  View Products

                  <FaArrowRight className="ms-2" />
                </Button>

              </Card.Body>

            </Card>

          </Col>

        </Row>

        {/* ====================================
            RECENT PRODUCTS TITLE
        ==================================== */}

        <div className="section-title">

          <div>

            <h4>
              Recently Added Products
            </h4>

            <p>
              Your latest menu items
            </p>

          </div>

          <Button
            variant="danger"
            disabled={!restaurent}
            onClick={() =>
              navigate("/AddProduct")
            }
          >
            <FaPlus className="me-2" />

            Add Product
          </Button>

        </div>

        {/* ====================================
            PRODUCTS TABLE
        ==================================== */}

        <Card className="table-card mb-4">

          <Card.Body className="p-0">

            {products.length === 0 ? (

              <div className="empty-state">

                <FaUtensils />

                <h5>
                  No Products Added
                </h5>

                <p>
                  Start adding products to your
                  restaurant.
                </p>

                <Button
                  variant="danger"
                  disabled={!restaurent}
                  onClick={() =>
                    navigate("/AddProduct")
                  }
                >
                  <FaPlus className="me-2" />

                  Add Product
                </Button>

              </div>

            ) : (

              <Table
                responsive
                hover
                className="mb-0"
              >

                <thead>

                  <tr>

                    <th>#</th>

                    <th>Food Name</th>

                    <th>Category</th>

                    <th>Food Type</th>

                    <th>Price</th>

                    <th>Status</th>

                    <th>Action</th>

                  </tr>

                </thead>

                <tbody>

                  {products
                    .slice(0, 5)
                    .map((product, index) => {

                      const productId =
                        product._id ||
                        product.id;

                      return (

                        <tr key={productId}>

                          <td>
                            {index + 1}
                          </td>

                          <td>

                            <strong>
                              {product.foodName ||
                                product.name ||
                                "Product"}
                            </strong>

                          </td>

                          <td>
                            {product.category ||
                              "-"}
                          </td>

                          <td>

                            <Badge
                              bg={
                                product.foodType
                                  ?.toLowerCase() ===
                                "veg"
                                  ? "success"
                                  : "danger"
                              }
                            >
                              {product.foodType ||
                                "N/A"}
                            </Badge>

                          </td>

                          <td>
                            ₹
                            {Number(
                              product.price || 0
                            ).toLocaleString(
                              "en-IN"
                            )}
                          </td>

                          <td>

                            <Badge
                              bg={
                                product.active ===
                                false
                                  ? "secondary"
                                  : "success"
                              }
                            >
                              {product.active ===
                              false
                                ? "Inactive"
                                : "Active"}
                            </Badge>

                          </td>

                          <td>

                            <Button
                              size="sm"
                              variant="outline-primary"
                              className="me-2"
                              onClick={() =>
                                navigate(
                                  `/EditProduct/${productId}`
                                )
                              }
                            >
                              <FaEdit />
                            </Button>

                            <Button
                              size="sm"
                              variant="outline-danger"
                              onClick={() =>
                                handleDeleteProduct(
                                  productId
                                )
                              }
                            >
                              <FaTrash />
                            </Button>

                          </td>

                        </tr>

                      );
                    })}

                </tbody>

              </Table>

            )}

          </Card.Body>

        </Card>

        {/* ====================================
            RECENT ORDERS TITLE
        ==================================== */}

        <div className="section-title">

          <div>

            <h4>
              Recent Orders
            </h4>

            <p>
              Latest orders from your restaurant
            </p>

          </div>

          <Button
            variant="outline-danger"
            disabled={!restaurent}
            onClick={() =>
              navigate("/OwnerOrders")
            }
          >
            View All Orders

            <FaArrowRight className="ms-2" />
          </Button>

        </div>

        {/* ====================================
            ORDERS TABLE
        ==================================== */}

        <Card className="table-card">

          <Card.Body className="p-0">

            {orders.length === 0 ? (

              <div className="empty-state">

                <FaShoppingBag />

                <h5>
                  No Orders Yet
                </h5>

                <p>
                  Your customer orders will
                  appear here.
                </p>

              </div>

            ) : (

              <Table
                responsive
                hover
                className="mb-0"
              >

                <thead>

                  <tr>

                    <th>Order ID</th>

                    <th>Customer</th>

                    <th>Items</th>

                    <th>Amount</th>

                    <th>Status</th>

                    <th>Action</th>

                  </tr>

                </thead>

                <tbody>

                  {orders
                    .slice(0, 5)
                    .map((order) => {

                      const orderId =
                        order._id ||
                        order.id;

                      // ==========================
                      // CUSTOMER NAME
                      // ==========================

                      const firstName =
                        order.userId?.firstName ||
                        "";

                      const lastName =
                        order.userId?.lastName ||
                        "";

                      const customerName =
                        `${firstName} ${lastName}`.trim() ||
                        order.userId?.name ||
                        "Customer";

                      // ==========================
                      // ITEMS
                      // ==========================

                      const orderItems =
                        Array.isArray(
                          order.items
                        )
                          ? order.items
                          : [];

                      return (

                        <tr key={orderId}>

                          {/* ORDER ID */}

                          <td>

                            <strong>
                              #
                              {orderId
                                ?.toString()
                                .slice(-6)}
                            </strong>

                          </td>

                          {/* CUSTOMER */}

                          <td>
                            {customerName}
                          </td>

                          {/* ITEMS */}

                          <td>

                            {orderItems.length >
                            0 ? (

                              orderItems.map(
                                (item, index) => (

                                  <div
                                    key={index}
                                    className="mb-1"
                                  >

                                    {item.productId
                                      ?.foodName ||
                                      item.productId
                                        ?.name ||
                                      "Product"}

                                    {" × "}

                                    {item.quantity ||
                                      1}

                                  </div>

                                )
                              )

                            ) : (

                              <span>
                                No Items
                              </span>

                            )}

                          </td>

                          {/* AMOUNT */}

                          <td>

                            ₹
                            {Number(
                              order.totalAmount ||
                                0
                            ).toLocaleString(
                              "en-IN"
                            )}

                          </td>

                          {/* STATUS */}

                          <td>

                            <Badge
                              bg={getStatusVariant(
                                order.orderStatus
                              )}
                            >
                              {order.orderStatus ||
                                "Processing"}
                            </Badge>

                          </td>

                          {/* VIEW */}

                          <td>

                            <Button
                              size="sm"
                              variant="outline-warning"
                              onClick={() =>
                                navigate(
                                  `/OwnerOrder/${orderId}`
                                )
                              }
                            >
                              <FaEye className="me-1" />

                              View
                            </Button>

                          </td>

                        </tr>

                      );
                    })}

                </tbody>

              </Table>

            )}

          </Card.Body>

        </Card>

      </div>

    </div>
  );
};

export default OwnerDashboard;