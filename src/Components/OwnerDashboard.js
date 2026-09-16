
import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button, Table, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

import "./OwnerDashboard.css";

import {
  FaStore,
  FaUtensils,
  FaShoppingBag,
  FaRupeeSign,
  FaPlus,
  FaEye,
  FaEdit,
  FaArrowRight,
  FaArrowUp,
  FaArrowDown,
  FaClock,
  FaStar,
  FaBell,
  FaCalendarAlt,
  FaChevronDown,
  FaWallet,
  FaFileInvoiceDollar,
  FaPiggyBank,
  FaUsers,
  FaGift,
  FaChartBar,
  FaCog,
  FaStream,
  FaRegStar,
} from "react-icons/fa";

import { Select, MenuItem } from "@mui/material";
import { MdRestaurantMenu } from "react-icons/md";

const fallbackReviews = [
  {
    name: "Rahul Sharma",
    date: "30 May 2024",
    rating: 5,
    text: "Great food and fast delivery!",
    color: "#7c3aed",
    emoji: "🍔",
  },
  {
    name: "Priya Singh",
    date: "29 May 2024",
    rating: 4,
    text: "Pizza was awesome. Will order again.",
    color: "#16a34a",
    emoji: "🍕",
  },
  {
    name: "Amit Kumar",
    date: "29 May 2024",
    rating: 5,
    text: "Very tasty biryani and good packing.",
    color: "#f97316",
    emoji: "🍛",
  },
];

const OwnerDashboard = () => {
  const navigate = useNavigate();

  const { user: currentUser } = useSelector((state) => state.auth);

  const [totalOrders, setTotalOrders] = useState(0);
  const [restaurent, setRestaurent] = useState(null);
  const [restaurantId, setRestaurantId] = useState("");

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [topSellingItems, setTopSellingItems] = useState([]);

  const [loading, setLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(false);
  const [ordersLoading, setOrdersLoading] = useState(false);

  const [earningPeriod, setEarningPeriod] = useState("monthly");
  const [revenueData, setRevenueData] = useState(null);

  const userId = currentUser?.id || currentUser?._id;

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:8090/api/restaurents/user/${userId}`)
      .then((response) => {
        const restaurantData = Array.isArray(response.data)
          ? response.data[0]
          : response.data;

        if (restaurantData) {
          const id = restaurantData._id || restaurantData.id || "";

          setRestaurantId(id);
          setRestaurent(restaurantData);
        } else {
          setRestaurantId("");
          setRestaurent(null);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch restaurant:", error);
        setRestaurantId("");
        setRestaurent(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userId]);

  useEffect(() => {
    if (!restaurantId) {
      setProducts([]);
      return;
    }

    setProductsLoading(true);

    axios
      .get(
        `http://localhost:8090/api/products/restaurant/${restaurantId}`
      )
      .then((response) => {
        const productData = Array.isArray(response.data)
          ? response.data
          : [];

        setProducts(productData);
      })
      .catch((error) => {
        console.error("Failed to fetch products:", error);
        setProducts([]);
      })
      .finally(() => {
        setProductsLoading(false);
      });
  }, [restaurantId]);

  useEffect(() => {
    if (!restaurantId) {
      setOrders([]);
      setTotalOrders(0);
      return;
    }

    setOrdersLoading(true);

    axios
      .get(
        `http://localhost:8090/api/orders/restaurent/${restaurantId}`
      )
      .then((response) => {
        const orderData = Array.isArray(response.data)
          ? response.data
          : [];

        setOrders(orderData);
        setTotalOrders(orderData.length);
      })
      .catch((error) => {
        console.error("Failed to fetch orders:", error);
        setOrders([]);
        setTotalOrders(0);
      })
      .finally(() => {
        setOrdersLoading(false);
      });
  }, [restaurantId]);

  useEffect(() => {
    if (!restaurantId) {
      setTopSellingItems([]);
      return;
    }

    axios
      .get(
        `http://localhost:8090/api/orders/restaurent/${restaurantId}/topProducts`
      )
      .then((response) => {
        const topProducts = Array.isArray(response.data)
          ? response.data
          : [];

        setTopSellingItems(topProducts.slice(0, 5));
      })
      .catch((error) => {
        console.warn(
          "Top selling API not available. Using products instead:",
          error
        );

        setTopSellingItems(products.slice(0, 5));
      });
  }, [restaurantId, products]);

  useEffect(() => {
    if (!restaurantId) {
      setRevenueData(null);
      return;
    }

    let endpoint = "monthly";

    if (earningPeriod === "daily") {
      endpoint = "daily";
    }

    if (earningPeriod === "yearly") {
      endpoint = "yearly";
    }

    axios
      .get(
        `http://localhost:8090/api/orders/restaurent/${restaurantId}/revenue/${endpoint}`
      )
      .then((response) => {
        setRevenueData(response.data);
      })
      .catch((error) => {
        console.warn(
          `Failed to fetch ${earningPeriod} revenue:`,
          error
        );

        setRevenueData(null);
      });
  }, [restaurantId, earningPeriod]);

  const getImageUrl = (images) => {
    const image = Array.isArray(images) ? images[0] : images;

    if (!image) {
      return "/no-image.png";
    }

    if (image.startsWith("http")) {
      return image;
    }

    return `http://localhost:8090/upload/${image}`;
  };

  const totalRevenue = orders.reduce((total, order) => {
    return total + Number(order.totalAmount || 0);
  }, 0);

  const commission = Math.round(totalRevenue * 0.1);

  const netEarnings = Math.max(
    totalRevenue - commission,
    0
  );

  const getStatusVariant = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
      case "processing":
        return "warning";

      case "accepted":
        return "primary";

      case "preparing":
        return "info";

      case "out for delivery":
      case "outfordelivery":
        return "primary";

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

  if (!currentUser) {
    return null;
  }

  const chartLabels = {
    daily: ["1", "5", "10", "15", "20", "25", "30"],
    monthly: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    yearly: ["2022", "2023", "2024", "2025", "2026"],
  };

  const goToOrders = () => {
    if (restaurantId) {
      navigate(`/RestaurentOrder/${restaurantId}`);
    } else {
      navigate("/OwnerOrders");
    }
  };

  const goToProducts = () => {
    navigate("/OwnerProducts");
  };

  const goToRestaurant = () => {
    if (restaurantId) {
      navigate(`/ViewRestaurent/${restaurantId}`);
    } else {
      navigate("/AddRestaurent");
    }
  };

  return (
    <div className="owner-dashboard">
      <div className="owner-sidebar">
        <div className="sidebar-logo">
          <FaUtensils />

          <span>
            {restaurent?.restaurentName || "My Restaurant"}
          </span>
        </div>

        <div className="owner-profile">
          <div className="owner-avatar">
            {currentUser?.firstName
              ? currentUser.firstName.charAt(0).toUpperCase()
              : "O"}
          </div>

          <div>
            <h6>
              {currentUser?.firstName || ""}{" "}
              {currentUser?.lastName || ""}
            </h6>

            <small>Restaurant Owner</small>
          </div>
        </div>

        <ul className="sidebar-menu">
          <li
            className="active"
            onClick={() => navigate("/OwnerDashboard")}
          >
            <FaStore />
            <span>Dashboard</span>
          </li>

          <li onClick={goToRestaurant}>
            <FaStream />
            <span>My Restaurant</span>
          </li>

          <li onClick={() => navigate("/AddProduct")}>
            <FaPlus />
            <span>Add Product</span>
          </li>

          <li onClick={goToProducts}>
            <MdRestaurantMenu />
            <span>Menu / Products</span>
          </li>

          <li onClick={() => navigate("/OwnerOrders")}>
            <FaShoppingBag />
            <span>Orders</span>
          </li>

          <li onClick={() => navigate("/OwnerOrderHistory")}>
            <FaClock />
            <span>Order History</span>
          </li>

          <li onClick={() => navigate("/OwnerUsers")}>
            <FaUsers />
            <span>Customers</span>
          </li>

          <li onClick={() => navigate("/OwnerReviews")}>
            <FaRegStar />
            <span>Reviews</span>
          </li>

          <li onClick={() => navigate("/OwnerCoupons")}>
            <FaGift />
            <span>Coupons & Offers</span>
          </li>

          <li onClick={() => navigate("/OwnerReports")}>
            <FaChartBar />
            <span>Reports</span>
          </li>

          <li onClick={() => navigate("/OwnerEarnings")}>
            <FaWallet />
            <span>Earnings</span>
          </li>

          <li onClick={() => navigate("/OwnerSettings")}>
            <FaCog />
            <span>Settings</span>
          </li>
        </ul>

        <div className="sidebar-bottom">
          <div onClick={() => navigate("/")}>
            🚪 Logout
          </div>
        </div>
      </div>

      <div className="owner-main">
        <div className="owner-header">
          <div>
            <h2>
              Welcome back,{" "}
              {currentUser?.firstName || "Owner"} 👋
            </h2>

            <p>
              Here's what's happening with your restaurant today.
            </p>
          </div>

          <div className="owner-header-right">
            <button className="date-pill">
              <FaCalendarAlt />
              <span>Today</span>
              <FaChevronDown size={11} />
            </button>

            <button className="bell-btn">
              <FaBell />
              <span className="bell-badge">5</span>
            </button>
          </div>
        </div>

        <Row className="g-3 mb-4 summary-row">
          <Col xl={4} md={6}>
            <Card className="summary-card">
              <div className="summary-icon summary-purple">
                <FaShoppingBag />
              </div>

              <div
                className="summary-body"
                onClick={goToOrders}
                style={{ cursor: "pointer" }}
              >
                <p>Total Orders</p>
                <h3>{totalOrders}</h3>
              </div>
            </Card>
          </Col>

          <Col xl={4} md={6}>
            <Card className="summary-card">
              <div className="summary-icon summary-green">
                <FaRupeeSign />
              </div>

              <div
                className="summary-body"
                onClick={() => navigate("/OwnerRevenue")}
                style={{ cursor: "pointer" }}
              >
                <p>Total Revenue</p>

                <h3>
                  ₹{totalRevenue.toLocaleString("en-IN")}
                </h3>
              </div>
            </Card>
          </Col>

          <Col xl={4} md={6}>
            <Card className="summary-card">
              <div className="summary-icon summary-blue">
                <FaStar />
              </div>

              <div
                className="summary-body"
                onClick={() => navigate("/OwnerReviews")}
                style={{ cursor: "pointer" }}
              >
                <p>Average Rating</p>

                <h3>
                  4.5{" "}
                  <FaStar className="rating-star" />
                </h3>
              </div>
            </Card>
          </Col>
        </Row>

        <Row className="g-3 mb-4">
          <Col lg={6}>
            <Card className="panel-card h-100">
              <div className="panel-header">
                <span>Top Selling Items</span>

                <button
                  className="view-all-btn"
                  onClick={goToProducts}
                >
                  View All
                </button>
              </div>

              <div className="panel-body">
                {topSellingItems.length > 0 ? (
                  topSellingItems.map((item, index) => (
                    <div
                      className="top-item-row"
                      key={
                       
                        index
                      }
                    >
                      <span
                        className={`rank-badge ${
                          index === 0
                            ? "rank-orange"
                            : "rank-gray"
                        }`}
                      >
                        {index + 1}
                      </span>

                      <img
                        src={getImageUrl(item.images)}
                        alt={
                          item.foodName ||
                         
                          "Food"
                        }
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />

                      <div className="top-item-info">
                        <p className="top-item-name">
                          {item.foodName ||
                          
                            "Food"}
                        </p>

                        <p className="top-item-meta">
                          {item.category ||
                            "Food Item"}
                        </p>
                      </div>

                      <div className="top-item-price">
                        ₹{item.price || 0}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center p-3">
                    {productsLoading
                      ? "Loading products..."
                      : "No products available"}
                  </div>
                )}
              </div>
            </Card>
          </Col>

          <Col lg={6}>
            <Card className="panel-card h-100">
              <div className="panel-header">
                <span>Earnings Summary</span>

                <Select
                  size="small"
                  value={earningPeriod}
                  onChange={(e) =>
                    setEarningPeriod(e.target.value)
                  }
                  sx={{
                    minWidth: 120,
                    height: 35,
                    fontSize: 13,
                  }}
                >
                  <MenuItem value="daily">
                    Daily
                  </MenuItem>

                  <MenuItem value="monthly">
                    Monthly
                  </MenuItem>

                  <MenuItem value="yearly">
                    Yearly
                  </MenuItem>
                </Select>
              </div>

              <div className="panel-body earnings-body">
                <div className="earnings-row">
                  <div className="earnings-icon earnings-green">
                    <FaPiggyBank />
                  </div>

                  <div className="earnings-content">
                    <p>Total Earnings</p>

                    <h3>
                      ₹{totalRevenue.toLocaleString("en-IN")}
                    </h3>
                  </div>

                  <span className="summary-trend trend-up">
                    <FaArrowUp /> 18.5%
                  </span>
                </div>

                <div className="earnings-row">
                  <div className="earnings-icon earnings-pink">
                    <FaFileInvoiceDollar />
                  </div>

                  <div className="earnings-content">
                    <p>Commission / Fees</p>

                    <h3>
                      ₹{commission.toLocaleString("en-IN")}
                    </h3>
                  </div>

                  <span className="summary-trend trend-down">
                    <FaArrowDown /> 3.2%
                  </span>
                </div>

                <div className="earnings-row">
                  <div className="earnings-icon earnings-blue">
                    <FaWallet />
                  </div>

                  <div className="earnings-content">
                    <p>Net Earnings</p>

                    <h3>
                      ₹{netEarnings.toLocaleString("en-IN")}
                    </h3>
                  </div>

                  <span className="summary-trend trend-up">
                    <FaArrowUp /> 16.3%
                  </span>
                </div>
              </div>
            </Card>
          </Col>
        </Row>

        <div className="section-title">
          <div>
            <h4>Quick Actions</h4>
            <p>Manage your restaurant quickly</p>
          </div>
        </div>

        <Row className="g-4 mb-4">
          <Col lg={4} md={6}>
            <Card className="quick-card">
              <Card.Body>
                <div className="quick-icon restaurent">
                  <FaStore />
                </div>

                <h5>Add Restaurant</h5>

                <p>
                  Add your restaurant information and details.
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

          <Col lg={4} md={6}>
            <Card className="quick-card">
              <Card.Body>
                <div className="quick-icon product">
                  <FaPlus />
                </div>

                <h5>Add Product</h5>

                <p>
                  Add new food items to your restaurant menu.
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

          <Col lg={4} md={6}>
            <Card className="quick-card">
              <Card.Body>
                <div className="quick-icon view">
                  <FaEye />
                </div>

                <h5>View Products</h5>

                <p>
                  View, edit and manage your added products.
                </p>

                <Button
                  variant="outline-danger"
                  onClick={goToProducts}
                >
                  View Products
                  <FaArrowRight className="ms-2" />
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col lg={12}>
            <Card className="panel-card">
              <div className="panel-header">
                <span>Earnings Analytics</span>

                <Select
                  size="small"
                  value={earningPeriod}
                  onChange={(e) =>
                    setEarningPeriod(e.target.value)
                  }
                  sx={{
                    minWidth: 120,
                    height: 35,
                    fontSize: 13,
                  }}
                >
                  <MenuItem value="daily">
                    Daily
                  </MenuItem>

                  <MenuItem value="monthly">
                    Monthly
                  </MenuItem>

                  <MenuItem value="yearly">
                    Yearly
                  </MenuItem>
                </Select>
              </div>

              <div className="panel-body">
                <div className="earnings-chart-header">
                  <div>
                    <p>Total Earnings</p>

                    <h3>
                      ₹{totalRevenue.toLocaleString("en-IN")}
                    </h3>
                  </div>

                  <span className="summary-trend trend-up">
                    <FaArrowUp /> 18.5%
                  </span>
                </div>

                <div className="earning-chart">
                  <svg
                    viewBox="0 0 600 230"
                    width="100%"
                    height="230"
                  >
                    <line
                      x1="0"
                      y1="40"
                      x2="600"
                      y2="40"
                      stroke="#eee"
                    />

                    <line
                      x1="0"
                      y1="90"
                      x2="600"
                      y2="90"
                      stroke="#eee"
                    />

                    <line
                      x1="0"
                      y1="140"
                      x2="600"
                      y2="140"
                      stroke="#eee"
                    />

                    <line
                      x1="0"
                      y1="190"
                      x2="600"
                      y2="190"
                      stroke="#eee"
                    />

                    <path
                      d="M0 160 Q70 80 140 130 T280 80 T420 105 T600 45"
                      fill="none"
                      stroke="#7c3aed"
                      strokeWidth="4"
                    />

                    <path
                      d="M0 185 Q70 125 140 155 T280 115 T420 135 T600 85"
                      fill="none"
                      stroke="#16a34a"
                      strokeWidth="4"
                    />

                    <path
                      d="M0 210 Q70 165 140 185 T280 150 T420 170 T600 125"
                      fill="none"
                      stroke="#f97316"
                      strokeWidth="4"
                    />
                  </svg>

                  <div className="earning-labels">
                    {chartLabels[earningPeriod].map(
                      (item) => (
                        <span key={item}>
                          {item}
                        </span>
                      )
                    )}
                  </div>
                </div>

                <div className="earning-legend">
                  <span>
                    <i className="legend-earning"></i>
                    Earnings
                  </span>

                  <span>
                    <i className="legend-orders"></i>
                    Orders
                  </span>

                  <span>
                    <i className="legend-profit"></i>
                    Profit
                  </span>
                </div>
              </div>
            </Card>
          </Col>
        </Row>

        <div className="section-title">
          <div>
            <h4>Recently Added Products</h4>
            <p>Your latest menu items</p>
          </div>
        </div>

        <Card className="table-card mb-4">
          <Card.Body className="p-0">
            <Table
              responsive
              hover
              className="mb-0"
            >
              <thead>
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Food Name</th>
                  <th>Category</th>
                  <th>Food Type</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {products.length > 0 ? (
                  products
                    .slice(0, 5)
                    .map((product, index) => (
                      <tr
                        key={
                          product._id ||
                          product.id ||
                          index
                        }
                      >
                        <td>{index + 1}</td>

                        <td>
                          <img
                            src={getImageUrl(
                              product.images
                            )}
                            alt={
                              product.foodName ||
                              product.productName ||
                              "Food"
                            }
                            style={{
                              width: "60px",
                              height: "60px",
                              objectFit: "cover",
                              borderRadius: "8px",
                            }}
                          />
                        </td>

                        <td>
                          <strong>
                            {product.foodName ||
                              product.productName ||
                              "Food"}
                          </strong>
                        </td>

                        <td>
                          {product.category || "-"}
                        </td>

                        <td>
                          <Badge
                            bg={
                              product.foodType
                                ?.toLowerCase()
                                .includes("veg")
                                ? "success"
                                : "danger"
                            }
                          >
                            {product.foodType || "-"}
                          </Badge>
                        </td>

                        <td>
                          ₹{product.price || 0}
                        </td>

                        <td>
                          <Badge
                            bg={
                              product.active
                                ? "success"
                                : "secondary"
                            }
                          >
                            {product.active
                              ? "Active"
                              : "Inactive"}
                          </Badge>
                        </td>

                        <td>
                          <Button
                            size="sm"
                            variant="outline-primary"
                            onClick={() =>
                              navigate(
                                `/EditProduct/${
                                  product._id ||
                                  product.id
                                }`
                              )
                            }
                          >
                            <FaEdit />
                          </Button>
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td
                      colSpan="8"
                      className="text-center py-4"
                    >
                      {productsLoading
                        ? "Loading products..."
                        : "No products available"}
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>

        <div className="section-title">
          <div>
            <h4>Recent Reviews</h4>

            <p>
              What your customers are saying
            </p>
          </div>

          <button
            className="view-all-btn"
            onClick={() =>
              navigate("/OwnerReviews")
            }
          >
            View All Reviews
          </button>
        </div>

        <Row className="g-3 mb-4">
          {fallbackReviews.map(
            (review, index) => (
              <Col
                lg={4}
                md={6}
                key={index}
              >
                <Card className="review-card">
                  <Card.Body>
                    <div className="review-top">
                      <div
                        className="review-avatar"
                        style={{
                          backgroundColor:
                            review.color,
                        }}
                      >
                        {review.name.charAt(0)}
                      </div>

                      <div className="review-meta">
                        <h6>
                          {review.name}
                        </h6>

                        <small>
                          {review.date}
                        </small>
                      </div>

                      <div className="review-food">
                        {review.emoji}
                      </div>
                    </div>

                    <div className="review-stars">
                      {Array.from({
                        length: 5,
                      }).map((_, i) =>
                        i < review.rating ? (
                          <FaStar
                            key={i}
                            className="star-filled"
                          />
                        ) : (
                          <FaRegStar
                            key={i}
                            className="star-empty"
                          />
                        )
                      )}
                    </div>

                    <p className="review-text">
                      {review.text}
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            )
          )}
        </Row>

        <div className="section-title">
          <div>
            <h4>
              Manage Recent Orders
            </h4>

            <p>
              Latest orders from your restaurant
            </p>
          </div>

          <Button
            variant="outline-danger"
            onClick={goToOrders}
          >
            View All Orders
            <FaArrowRight className="ms-2" />
          </Button>
        </div>

        <Card className="table-card mb-4">
          <Card.Body className="p-0">
            <Table
              responsive
              hover
              className="mb-0"
            >
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Restaurant</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {orders.length > 0 ? (
                  orders
                    .slice(0, 5)
                    .map((order) => {
                      const orderId =
                        order._id ||
                        order.id;

                      const firstItem =
                        order.items?.[0];

                      const restaurantName =
                        firstItem?.restaurentId
                          ?.restaurentName ||
                        restaurent?.restaurentName ||
                        "My Restaurant";

                      return (
                        <tr key={orderId}>
                          <td>
                            <strong>
                              #{orderId}
                            </strong>
                          </td>

                          <td>
                            <strong>
                              {restaurantName}
                            </strong>
                          </td>

                          <td>
                            {order.userId
                              ?.firstName ||
                              "Unknown"}{" "}
                            {order.userId
                              ?.lastName ||
                              ""}
                          </td>

                          <td>
                            {order.items?.length > 0
                              ? order.items.map(
                                  (
                                    item,
                                    index
                                  ) => (
                                    <div
                                      key={
                                        index
                                      }
                                    >
                                      {item.foodName ||
                                        item.name ||
                                        item
                                          .productId
                                          ?.foodName ||
                                        "Food"}{" "}
                                      ×{" "}
                                      {item.quantity ||
                                        1}
                                    </div>
                                  )
                                )
                              : "No items"}
                          </td>

                          <td>
                            ₹
                            {Number(
                              order.totalAmount ||
                                0
                            ).toLocaleString(
                              "en-IN"
                            )}
                          </td>

                          <td>
                            <Badge
                              bg={getStatusVariant(
                                order.orderStatus
                              )}
                            >
                              {order.orderStatus ||
                                "Unknown"}
                            </Badge>
                          </td>

                          <td>
                            <Button
                              size="sm"
                              variant="outline-warning"
                              onClick={() =>
                                navigate(
                                  `/OrderDetails/${orderId}`
                                )
                              }
                            >
                              <FaEye className="me-1" />
                              View
                            </Button>
                          </td>
                        </tr>
                      );
                    })
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="text-center py-4"
                    >
                      {loading ||
                      ordersLoading
                        ? "Loading dashboard data..."
                        : "No orders available"}
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default OwnerDashboard;
