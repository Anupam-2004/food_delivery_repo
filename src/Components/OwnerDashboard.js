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

  // ==============================
  // OWNER ID
  // ==============================

  const ownerId = currentUser?.id || currentUser?._id;

  // ==============================
  // USER + ROLE CHECK
  // ==============================

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
      return;
    }

    const roles = currentUser?.roles || [];

    if (!roles.includes("ROLE_OWNER") && !roles.includes("ROLE_ADMIN")) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  // ==============================
  // FETCH DASHBOARD DATA
  // ==============================

  useEffect(() => {
    if (!ownerId) {
      setLoading(false);
      setError("Owner information not found.");
      return;
    }

    setLoading(true);
    setError("");

    // ==============================
    // GET RESTAURANT
    // ==============================

    axios
      .get(`http://localhost:8090/api/restaurents/user/${ownerId}`)

      .then((response) => {
        console.log("Restaurent:", response.data);

        let restaurentData = response.data;

        // If backend returns array
        if (Array.isArray(restaurentData)) {
          restaurentData = restaurentData[0] || null;
        }

        setRestaurent(restaurentData);

        // ==============================
        // RESTAURANT ID
        // ==============================

        const restaurentId =
          restaurentData?._id ||
          restaurentData?.id ||
          restaurentData?.restaurentId;

        console.log("Restaurent ID:", restaurentId);

        // No restaurant found
        if (!restaurentId) {
          setProducts([]);
          setOrders([]);
          setLoading(false);
          return;
        }

        // ==============================
        // GET PRODUCTS
        // ==============================

        axios
          .get(`http://localhost:8090/api/products/restaurent/${restaurentId}`)

          .then((response) => {
            console.log("Products:", response.data);

            setProducts(response.data);
          })

          .catch((error) => {
            console.log("Products Error:", error);

            setProducts([]);
          });

        // ==============================
        // GET ORDERS
        // ==============================

        axios
          .get(`http://localhost:8090/api/orders/restaurent/${restaurentId}`)

          .then((response) => {
            console.log("Orders:", response.data);

            const orderData = Array.isArray(response.data)
              ? response.data
              : response.data?.orders || [];

            // Latest orders first
            orderData.sort((a, b) => {
              const dateA = new Date(a.createdAt || a.updatedAt || 0);

              const dateB = new Date(b.createdAt || b.updatedAt || 0);

              return dateB - dateA;
            });

            setOrders(orderData);
          })

          .catch((error) => {
            console.log("Orders Error:", error);

            setOrders([]);
          });
      })

      .catch((error) => {
        console.error("Restaurent Error:", error);

        setError(
          error.response?.data?.message || "Failed to load restaurant data.",
        );
      })

      .finally(() => {
        setLoading(false);
      });
  }, [ownerId]);

  // ==============================
  // DELETE PRODUCT
  // ==============================

  const handleDeleteProduct = (productId) => {
    axios
      .delete(`http://localhost:8090/api/products/${productId}`)

      .then((response) => {
        setProducts(response.data);
        alert("Product deleted successfully.");
      })

      .catch((error) => {
        console.error("Delete Product Error:", error);

        alert(error.response?.data?.message || "Failed to delete product.");
      });
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

  const totalRevenue = orders;
  // .filter((order) => order.orderStatus?.toLowerCase() === "delivered")
  // .reduce((total, order) => total + Number(order.totalAmount || 0), 0);

  // ==============================
  // LOADING
  // ==============================

  if (loading) {
    return (
      <div
        className="owner-dashboard d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="text-center">
          <Spinner animation="border" variant="danger" />

          <p className="mt-3">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // ==============================
  // MAIN UI
  // ==============================

  return (
    <div className="owner-dashboard">
      {/* ================= SIDEBAR ================= */}

      <div className="owner-sidebar">
        <div className="sidebar-logo">
          <FaUtensils />

          <span>FoodAdmin</span>
        </div>

        {/* OWNER PROFILE */}

        <div className="owner-profile">
          <div className="owner-avatar">
            {currentUser?.firstName?.charAt(0)?.toUpperCase() || "O"}
          </div>

          <div>
            <h6>{currentUser?.firstName || "Owner"}</h6>

            <small>Restaurant Owner</small>
          </div>
        </div>

        {/* SIDEBAR MENU */}

        <ul className="sidebar-menu">
          <li className="active" onClick={() => navigate("/OwnerDashboard")}>
            <FaStore />
            <span>Dashboard</span>
          </li>

          <li onClick={() => navigate("/AddRestaurent")}>
            <FaStore />
            <span>Add Restaurant</span>
          </li>

          <li onClick={() => navigate("/AddProduct")}>
            <FaPlus />
            <span>Add Product</span>
          </li>

          <li onClick={() => navigate("/OwnerProducts")}>
            <MdRestaurantMenu />
            <span>View Products</span>
          </li>

          <li onClick={() => navigate("/OwnerOrders")}>
            <FaShoppingBag />
            <span>Orders</span>
          </li>

          <li onClick={() => navigate("/OwnerOrderHistory")}>
            <FaClock />
            <span>Order History</span>
          </li>
        </ul>

        {/* LOGOUT */}

        <div className="sidebar-bottom">
          <div onClick={() => navigate("/")}>🚪 Logout</div>
        </div>
      </div>

      {/* ================= MAIN ================= */}

      <div className="owner-main">
        {/* NAVBAR */}

        <div className="owner-navbar">
          <div>
            <h4>Owner Dashboard</h4>

            <p>Manage your restaurant and orders</p>
          </div>

          <div className="owner-navbar-right">
            <div className="notification">🔔</div>

            <div className="owner-user">
              <div className="owner-small-avatar">
                {currentUser?.firstName?.charAt(0)?.toUpperCase() || "O"}
              </div>

              <div>
                <strong>{currentUser?.firstName || "Owner"}</strong>

                <small>Restaurant Owner</small>
              </div>
            </div>
          </div>
        </div>

        {/* WELCOME */}

        <div className="welcome-section">
          <div>
            <h2>
              Welcome back, {currentUser?.firstName || "Restaurant Owner"} 👋
            </h2>

            <p>{restaurent?.restaurentName || "Manage your restaurant"}</p>
          </div>

          {!restaurent && (
            <Button variant="light" onClick={() => navigate("/AddRestaurent")}>
              <FaPlus className="me-2" />
              Add Restaurant
            </Button>
          )}
        </div>

        {/* ================= DASHBOARD CARDS ================= */}

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

                  <h3>{restaurent ? 1 : 0}</h3>

                  <small
                    className={restaurent ? "text-success" : "text-danger"}
                  >
                    {restaurent ? "Active" : "Not Added"}
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

                  <h3>{products.length}</h3>

                  <small className="text-success">Added Products</small>
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

                  <h3>{orders.length}</h3>

                  <small className="text-success">All Orders</small>
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

                  <h3>₹{totalRevenue.toLocaleString("en-IN")}</h3>

                  <small className="text-success">Delivered Orders</small>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* ================= RESTAURANT INFO ================= */}

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

                    {restaurent.city && restaurent.state ? ", " : ""}

                    {restaurent.state || ""}
                  </p>
                </div>

                <Button
                  variant="outline-danger"
                  onClick={() =>
                    navigate(
                      `/EditRestaurant/${restaurent._id || restaurent.id}`,
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

        {/* ================= QUICK ACTIONS ================= */}

        <div className="section-title">
          <div>
            <h4>Quick Actions</h4>

            <p>Manage your restaurant quickly</p>
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

                <h5>Add Restaurant</h5>

                <p>Add your restaurant information and details.</p>

                <Button
                  variant="outline-danger"
                  onClick={() => navigate("/AddRestaurent")}
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

                <h5>Add Product</h5>

                <p>Add new food items to your restaurant menu.</p>

                <Button
                  variant="outline-danger"
                  onClick={() => navigate("/AddProduct")}
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

                <h5>View Products</h5>

                <p>View, edit and manage your added products.</p>

                <Button
                  variant="outline-danger"
                  onClick={() => navigate("/OwnerProducts")}
                >
                  View Products
                  <FaArrowRight className="ms-2" />
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* ================= PRODUCTS TITLE ================= */}

        <div className="section-title">
          <div>
            <h4>Recently Added Products</h4>

            <p>Your latest menu items</p>
          </div>
        </div>

        {/* ================= PRODUCTS TABLE ================= */}

        <Card className="table-card mb-4">
          <Card.Body className="p-0">
            {products.length === 0 ? (
              <div className="empty-state">
                <FaUtensils />

                <h5>No Products Added</h5>

                <p>Start adding products to your restaurant.</p>
              </div>
            ) : (
              <Table responsive hover className="mb-0">
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
                  {products.slice(0, 5).map((product, index) => {
                    const productId = product._id || product.id;

                    return (
                      <tr key={productId}>
                        <td>{index + 1}</td>

                        <td>
                          <strong>
                            {product.foodName || product.name || "Product"}
                          </strong>
                        </td>

                        <td>{product.category || "-"}</td>

                        <td>
                          <Badge
                            bg={
                              product.foodType?.toLowerCase() === "veg"
                                ? "success"
                                : "danger"
                            }
                          >
                            {product.foodType || "N/A"}
                          </Badge>
                        </td>

                        <td>₹{Number(product.price || 0)}</td>

                        <td>
                          <Badge
                            bg={
                              product.active === false ? "secondary" : "success"
                            }
                          >
                            {product.active === false ? "Inactive" : "Active"}
                          </Badge>
                        </td>

                        <td>
                          <Button
                            size="sm"
                            variant="outline-primary"
                            className="me-2"
                          >
                            <FaEdit />
                          </Button>

                          <Button
                            size="sm"
                            variant="outline-danger"
                            onClick={() => handleDeleteProduct(productId)}
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

        {/* ================= ORDERS TITLE ================= */}

        <div className="section-title">
          <div>
            <h4>Recent Orders</h4>

            <p>Latest orders from your restaurant</p>
          </div>

          <Button
            variant="outline-danger"
           
            onClick={() => navigate("/OwnerOrders")}
          >
            View All Orders
            <FaArrowRight className="ms-2" />
          </Button>
        </div>

        {/* ================= ORDERS TABLE ================= */}

        <Card className="table-card">
          <Card.Body className="p-0">
            {orders.length === 0 ? (
              <div className="empty-state">
                <FaShoppingBag />

                <h5>No Orders Yet</h5>

                <p>Your customer orders will appear here.</p>
              </div>
            ) : (
              <Table responsive hover className="mb-0">
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
                  {orders.slice(0, 5).map((order) => {
                    const orderId = order._id || order.id;

                    // CUSTOMER

                    const firstName = order.userId?.firstName || "";

                    const lastName = order.userId?.lastName || "";

                    const customerName =
                      `${firstName} ${lastName}`.trim() ||
                      order.userId?.name ||
                      "Customer";

                    // ITEMS

                    const orderItems = Array.isArray(order.items)
                      ? order.items
                      : [];

                    return (
                      <tr key={orderId}>
                        {/* ORDER ID */}

                        <td>
                          <strong>#{orderId?.toString().slice(-6)}</strong>
                        </td>

                        {/* CUSTOMER */}

                        <td>{customerName}</td>

                        {/* ITEMS */}

                        <td>
                          {orderItems.length > 0
                            ? orderItems.map((item, index) => (
                                <div key={index} className="mb-1">
                                  {item.productId?.foodName ||
                                    item.productId?.name ||
                                    "Product"}

                                  {" × "}

                                  {item.quantity || 1}
                                </div>
                              ))
                            : "No Items"}
                        </td>

                        {/* AMOUNT */}

                        <td>₹{Number(order.totalAmount || 0)}</td>

                        {/* STATUS */}

                        <td>
                          <Badge bg={getStatusVariant(order.orderStatus)}>
                            {order.orderStatus || "Processing"}
                          </Badge>
                        </td>

                        {/* ACTION */}

                        <td>
                          <Button size="sm" variant="outline-warning">
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
