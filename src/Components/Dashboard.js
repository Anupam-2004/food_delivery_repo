import React, { useEffect, useState } from "react";

import Sidebar from "./Sidebar";
import Box from "@mui/material/Box";
import "./Dashboard.css";

import { LineChart } from "@mui/x-charts/LineChart";

import { Col, Container, Row, Card, Table } from "react-bootstrap";

import {
  FaArrowUp,
  FaArrowDown,
  FaEllipsisV,
  FaUsers,
  FaUserCheck,
  FaUserPlus,
  FaUserSlash,
  FaUtensils,
} from "react-icons/fa";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
);

const salesBreakdown = [
  {
    label: "Food Orders",
    amount: "₹1,45,680",
    value: 145680,
    color: "#7c3aed",
  },
  {
    label: "Delivery Charges",
    amount: "₹45,230",
    value: 45230,
    color: "#16a34a",
  },
  {
    label: "Offers Discount",
    amount: "₹25,300",
    value: 25300,
    color: "#f97316",
  },
  {
    label: "Other Charges",
    amount: "₹29,470",
    value: 29470,
    color: "#2563eb",
  },
];

const statusClassMap = {
  Delivered: "status-delivered",
  Preparing: "status-preparing",
  "On The Way": "status-ontheway",
  Cancelled: "status-cancelled",
  processing: "status-preparing",
  pending: "status-preparing",
};

// ======================================================
// DASHBOARD
// ======================================================

const Dashboard = () => {
  const navigate = useNavigate();

  const { user: currentUser } = useSelector((state) => state.auth);

  // ====================================================
  // STATES
  // ====================================================

  const [totalUsers, setTotalUsers] = useState(0);

  const [totalRestaurants, setTotalRestaurants] = useState(0);

  const [restaurants, setRestaurants] = useState([]);

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);
  const [displayedRestaurants, setDisplayedRestaurants] = useState([]);
  // const[users, setUsers] = useState([]);

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
      return;
    }

    if (!currentUser.roles || currentUser.roles[0] !== "ROLE_ADMIN") {
      navigate("/");
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    axios
      .get("http://localhost:8090/api/orders")
      .then((response) => {
        console.log("Orders fetched successfully:", response.data);

        if (Array.isArray(response.data)) {
          setOrders(response.data);
        } else {
          setOrders([]);
        }
      })
      .catch((error) => {
        console.log("Failed to fetch orders:", error);

        setOrders([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8090/api/restaurents/count")
      .then((response) => {
        console.log("Restaurant count:", response.data);

        setTotalRestaurants(response.data?.totalRestaurents || 0);
      })
      .catch((error) => {
        console.log("Failed to fetch restaurant count:", error);

        setTotalRestaurants(0);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8090/api/restaurents")
      .then((response) => {
        console.log("Restaurants:", response.data);

        if (Array.isArray(response.data)) {
          setRestaurants(response.data);
        } else {
          setRestaurants([]);
        }
      })
      .catch((error) => {
        console.log("Failed to fetch restaurants:", error);

        setRestaurants([]);
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:8090/api/auth/alluser")
      .then((response) => {
        console.log("Users:", response.data);
        setTotalUsers(Array.isArray(response.data) ? response.data.length : 0);
      })
      .catch((error) => {
        console.log("Failed to fetch users:", error);

        setTotalUsers(0);
      });
  }, []);
  useEffect(() => {
  axios
    .get("http://localhost:8090/api/orders/analytics/top-restaurants")
    .then((response) => {
      console.log("TOP RESTAURANTS RESPONSE:", response.data);

      if (Array.isArray(response.data)) {
        setDisplayedRestaurants(response.data);
      } else {
        setDisplayedRestaurants([]);
      }
    })
    .catch((error) => {
      console.log("Failed to fetch Top Restaurants:", error);
      setDisplayedRestaurants([]);
    });
}, []);

  const xLabels = [
    "01 May",
    "05 May",
    "10 May",
    "15 May",
    "20 May",
    "25 May",
    "30 May",
  ];

  const totalOrdersData = [320, 480, 430, 610, 590, 720, 680];

  const completedData = [230, 340, 320, 430, 460, 540, 520];

  const cancelledData = [40, 55, 48, 65, 58, 72, 60];

  const displayedOrders = Array.isArray(orders) ? orders.slice(0, 5) : [];

  // const displayedRestaurants =
  //   restaurants.length > 0
  //     ? restaurants.slice(0, 4)
  //     : " ";

  const totalSales = salesBreakdown.reduce((sum, item) => sum + item.value, 0);

  const doughnutData = {
    labels: salesBreakdown.map((item) => item.label),

    datasets: [
      {
        data: salesBreakdown.map((item) => item.value),

        backgroundColor: salesBreakdown.map((item) => item.color),

        borderWidth: 0,

        cutout: "72%",
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        enabled: true,
      },
    },
  };

  const userStatistics = [
    {
      title: "Total Users",
      count: totalUsers,
      icon: <FaUsers />,
      className: "total-users",
      up: true,
      trend: "12.5%",
    },

    {
      title: "Active Users",
      count: totalUsers,
      icon: <FaUserCheck />,
      className: "active-users",
      up: true,
      trend: "8.2%",
    },

    {
      title: "New Users",
      count: totalUsers,
      icon: <FaUserPlus />,
      className: "new-users",
      up: true,
      trend: "5.4%",
    },

    {
      title: "Blocked Users",
      count: 0,
      icon: <FaUserSlash />,
      className: "blocked-users",
      up: false,
      trend: "2.1%",
    },
  ];

  const getCustomerName = (order) => {
    if (order.userId) {
      return `${order.userId.firstName || ""} ${
        order.userId.lastName || ""
      }`.trim();
    }

    return "Customer";
  };

  const getRestaurantName = (order) => {
    return order.items?.[0]?.restaurentId?.restaurentName || "Restaurant";
  };

  const getOrderAmount = (order) => {
    if (order.amount) {
      return `₹${order.amount}`;
    }

    const amount =
      order.items?.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0,
      ) || 0;

    return `₹${amount.toLocaleString("en-IN")}`;
  };

  const getOrderId = (order) => {
    return order.orderId || order.id || order._id || "N/A";
  };

  // Always return a React-safe primitive.
  const getSafeText = (value, fallback = "N/A") => {
    if (value === null || value === undefined || value === "") {
      return fallback;
    }

    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean"
    ) {
      return String(value);
    }

    if (typeof value === "object") {
      return (
        value.restaurentName ||
        value.restaurantName ||
        value.name ||
        value.category ||
        value.city ||
        value.location ||
        value.title ||
        value._id ||
        value.id ||
        fallback
      );
    }

    return fallback;
  };

  const getOrderStatus = (order) => getSafeText(order?.orderStatus, "Pending");

  if (!currentUser) {
    return null;
  }

  return (
    <Container fluid className="dashboard-page">
      <Row className="g-0">
        <Col md={1} className="p-0 dashboard-sidebar">
          <Sidebar />
        </Col>

        <Col md={11} className="dashboard">
          <header className="dashboard-header">
            <div>
              <p className="dashboard-eyebrow">ADMIN WORKSPACE</p>

              <h1 className="dashboard-title">Dashboard</h1>

              <p className="dashboard-subtitle">
                Welcome back,{" "}
                <b>{getSafeText(currentUser?.firstName, "Admin")}</b>! Here's
                what's happening today.
              </p>
            </div>

            <div className="dashboard-header-meta">
              <span className="dashboard-live-dot"></span>
              Live overview
            </div>
          </header>

          <section className="dashboard-section">
            <Row className="dashboard_cards g-3">
              {/* TOTAL USERS */}

              <Col lg={3} md={6} sm={6}>
                <Card className="dashboard_card stat-card">
                  <div className="stat-icon total-users">
                    <FaUsers />
                  </div>

                  <div
                    className="stat-card-body"
                    onClick={() => navigate("/Users")}
                    style={{ cursor: "pointer" }}
                  >
                    <p className="stat-card-title">Total Users</p>

                    <h4 className="stat-card-count">{totalUsers}</h4>

                    <span className="stat-card-note">Registered accounts</span>
                  </div>
                </Card>
              </Col>

              {/* TOTAL RESTAURANTS */}

              <Col lg={3} md={6} sm={6}>
                <Card className="dashboard_card stat-card">
                  <div className="stat-icon active-users">
                    <FaUtensils />
                  </div>

                  <div
                    className="stat-card-body"
                    onClick={() => navigate("/AdminRestaurants")}
                    style={{ cursor: "pointer" }}
                  >
                    <p className="stat-card-title">Total Restaurants</p>

                    <h4 className="stat-card-count">{totalRestaurants}</h4>

                    <span className="stat-card-note">Available partners</span>
                  </div>
                </Card>
              </Col>

              {/* TOTAL ORDERS */}

              <Col lg={3} md={6} sm={6}>
                <Card className="dashboard_card stat-card">
                  <div className="stat-icon new-users">
                    <FaUserPlus />
                  </div>

                  <div
                    className="stat-card-body"
                    onClick={() => navigate("/AdminOrders")}
                    style={{ cursor: "pointer" }}
                  >
                    <p className="stat-card-title">Total Orders</p>

                    <h4 className="stat-card-count">{orders.length}</h4>

                    <span className="stat-card-note">All placed orders</span>
                  </div>
                </Card>
              </Col>

              {/* REVENUE */}

              <Col lg={3} md={6} sm={6}>
                <Card className="dashboard_card stat-card">
                  <div className="stat-icon blocked-users">
                    <FaArrowUp />
                  </div>

                  <div
                    className="stat-card-body"
                    onClick={() => navigate("/Revenue")}
                    style={{ cursor: "pointer" }}
                  >
                    <p className="stat-card-title">Revenue</p>

                    <h4 className="stat-card-count">
                      ₹{totalSales.toLocaleString("en-IN")}
                    </h4>

                    <span className="stat-card-note">Current sales total</span>
                  </div>
                </Card>
              </Col>
            </Row>
          </section>

          {/* ================= ORDER OVERVIEW ================= */}

          <section className="dashboard-section">
            <Row className="g-3">
              {/* LINE CHART */}

              <Col lg={7}>
                <Card className="panel-card h-100">
                  <Card.Header className="panel-header">
                    <div>
                      <span className="panel-kicker">PERFORMANCE</span>

                      <h2>Order Overview</h2>
                    </div>

                    <select className="panel-select" defaultValue="month">
                      <option value="month">This Month</option>

                      <option value="week">This Week</option>

                      <option value="year">This Year</option>
                    </select>
                  </Card.Header>

                  <Card.Body>
                    <Box
                      sx={{
                        width: "100%",
                      }}
                    >
                      <LineChart
                        height={330}
                        xAxis={[
                          {
                            scaleType: "point",
                            data: xLabels,
                          },
                        ]}
                        series={[
                          {
                            data: totalOrdersData,
                            label: "Total Orders",
                            color: "#7c3aed",
                          },

                          {
                            data: completedData,
                            label: "Completed",
                            color: "#16a34a",
                          },

                          {
                            data: cancelledData,
                            label: "Cancelled",
                            color: "#ef4444",
                          },
                        ]}
                        grid={{
                          horizontal: true,
                        }}
                        margin={{
                          top: 30,
                          right: 20,
                          bottom: 30,
                          left: 40,
                        }}
                      />
                    </Box>
                  </Card.Body>
                </Card>
              </Col>

              {/* RECENT ORDERS */}

              <Col lg={5}>
                <Card className="panel-card h-100">
                  <Card.Header className="panel-header">
                    <div>
                      <span className="panel-kicker">LATEST ACTIVITY</span>

                      <h2>Recent Orders</h2>
                    </div>

                    <button
                      className="view-all-btn"
                      type="button"
                      onClick={() => navigate("/AdminOrders")}
                    >
                      View All
                    </button>
                  </Card.Header>

                  <div className="recent-orders-wrapper">
                    <Table responsive className="orders-table">
                      <thead>
                        <tr>
                          <th>Order</th>
                          <th>Customer</th>
                          <th>Amount</th>
                          <th>Status</th>
                        </tr>
                      </thead>

                      <tbody>
                        {loading ? (
                          <tr>
                            <td colSpan="4" className="empty-table-state">
                              Loading orders...
                            </td>
                          </tr>
                        ) : displayedOrders.length > 0 ? (
                          displayedOrders.map((order, index) => (
                            <tr key={index}>
                              <td>
                                <span className="order-id">
                                  #{String(getOrderId(order)).slice(-6)}
                                </span>
                              </td>

                              <td>
                                <div className="customer-cell">
                                  <div className="customer-avatar">
                                    {getCustomerName(order)
                                      .charAt(0)
                                      .toUpperCase()}
                                  </div>

                                  <span>{getCustomerName(order)}</span>
                                </div>
                              </td>

                              <td>
                                <strong>{getOrderAmount(order)}</strong>
                              </td>

                              <td>
                                <span
                                  className={`status-badge ${
                                    statusClassMap[getOrderStatus(order)] ||
                                    "status-preparing"
                                  }`}
                                >
                                  {getOrderStatus(order)}
                                </span>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="4" className="empty-table-state">
                              No orders available.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                  </div>
                </Card>
              </Col>
            </Row>
          </section>

          {/* ================= INSIGHTS ================= */}

          <section className="dashboard-section">
            <Row className="g-3">
              {/* TOP RESTAURANTS */}

              <Col lg={4}>
                <Card className="panel-card h-100">
                  <Card.Body>
                    <div className="panel-header no-border">
                      <div>
                        <span className="panel-kicker">PARTNERS</span>

                        <h2>Top Restaurants</h2>
                      </div>

                      <button className="view-all-btn" type="button">
                        View All
                      </button>
                    </div>

                    <div className="top-restaurants-list">
                      {Array.isArray(displayedRestaurants) &&
                      displayedRestaurants.length > 0 ? (
                        displayedRestaurants.map((restaurant, index) => {
                          const restaurantName = getSafeText(
                            restaurant?.restaurentName ||
                              restaurant?.restaurantName ||
                              restaurant?.name,
                            "Restaurant",
                          );

                          const category = getSafeText(
                            restaurant?.category ||
                              restaurant?.city ||
                              restaurant?.location,
                            "Food Partner",
                          );

                          const orderCount = getSafeText(
                            restaurant?.orders ||
                              restaurant?.orderCount ||
                              restaurant?.totalOrders,
                            "0",
                          );

                          const image =
                            typeof restaurant?.image === "string"
                              ? restaurant.image
                              : typeof restaurant?.imageUrl === "string"
                                ? restaurant.imageUrl
                                : "/REStaurent/inner-view copy.jpg";

                          return (
                            <div
                              className="top-restaurant-row"
                              key={restaurant?._id || restaurant?.id || index}
                            >
                              <span
                                className={`rank-badge ${
                                  index % 2 === 0 ? "rank-orange" : "rank-gray"
                                }`}
                              >
                                {index + 1}
                              </span>

                              <img
                                src={image}
                                alt={restaurantName}
                                className="top-restaurant-img"
                                onError={(event) => {
                                  event.currentTarget.src =
                                    "/REStaurent/inner-view copy.jpg";
                                }}
                              />

                              <div className="top-restaurant-info">
                                <p className="top-restaurant-name">
                                  {restaurantName}
                                </p>

                                <p className="top-restaurant-category">
                                  {category}
                                </p>
                              </div>

                              <div className="top-restaurant-orders">
                                {orderCount} Orders
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="empty-table-state">
                          No top restaurants available.
                        </div>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              {/* SALES OVERVIEW */}

              <Col lg={4}>
                <Card className="panel-card h-100">
                  <Card.Header className="panel-header">
                    <div>
                      <span className="panel-kicker">REVENUE MIX</span>

                      <h2>Sales Overview</h2>
                    </div>

                    <select className="panel-select" defaultValue="month">
                      <option value="month">This Month</option>

                      <option value="week">This Week</option>
                    </select>
                  </Card.Header>

                  <Card.Body className="sales-overview-body">
                    <div className="doughnut-wrapper">
                      <Doughnut data={doughnutData} options={doughnutOptions} />

                      <div className="doughnut-center">
                        <span className="doughnut-total-label">Total</span>

                        <span className="doughnut-total-value">
                          ₹{totalSales.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>

                    <ul className="sales-legend">
                      {salesBreakdown.map((item, index) => (
                        <li key={index}>
                          <span
                            className="legend-dot"
                            style={{
                              backgroundColor: item.color,
                            }}
                          />

                          <span className="legend-label">{item.label}</span>

                          <span className="legend-amount">{item.amount}</span>
                        </li>
                      ))}
                    </ul>
                  </Card.Body>
                </Card>
              </Col>

              {/* USER STATISTICS */}

              <Col lg={4}>
                <Card className="panel-card h-100">
                  <Card.Header className="panel-header">
                    <div>
                      <span className="panel-kicker">ACCOUNT HEALTH</span>

                      <h2>User Statistics</h2>
                    </div>

                    <button className="view-all-btn" type="button">
                      View All
                    </button>
                  </Card.Header>

                  <Card.Body className="user-stats-body">
                    {userStatistics.map((stat, index) => (
                      <div className="user-stat-row" key={index}>
                        <div className={`user-stat-icon ${stat.className}`}>
                          {stat.icon}
                        </div>

                        <div className="user-stat-content">
                          <p>{stat.title}</p>

                          <h3>{stat.count}</h3>
                        </div>

                        <span
                          className={`stat-trend ${
                            stat.up ? "trend-up" : "trend-down"
                          }`}
                        >
                          {stat.up ? <FaArrowUp /> : <FaArrowDown />}{" "}
                          {stat.trend}
                        </span>
                      </div>
                    ))}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </section>

          {/* ================= RECENT RESTAURANTS ================= */}

          <section className="dashboard-section">
            <Card className="recent-restaurants-card">
              <div className="recent-restaurants-header">
                <div>
                  <span className="panel-kicker">PARTNER DIRECTORY</span>
                  <h2>Recent Restaurants</h2>
                </div>

                <button className="view-all-btn" type="button">
                  View All
                </button>
              </div>

              <div className="recent-restaurants-list">
                {displayedRestaurants.length > 0 ? (
                  displayedRestaurants.map((restaurant, index) => (
                    <div
                      className="recent-restaurant-item"
                      key={restaurant.restaurantId || index}
                    >
                      <img
                        src={
                          restaurant.image ||
                          restaurant.imageUrl ||
                          "/REStaurent/inner-view copy.jpg"
                        }
                        alt={restaurant.restaurantName || "Restaurant"}
                        className="restaurant-image"
                        onError={(event) => {
                          event.currentTarget.src =
                            "/REStaurent/inner-view copy.jpg";
                        }}
                      />

                      <div className="restaurant-details">
                        <div className="restaurant-details-text">
                          <h6>{restaurant.restaurantName || "Restaurant"}</h6>

                          <p>
                            {restaurant.city ||
                              restaurant.location ||
                              "Location not available"}
                          </p>

                          <span className="status-active">Active</span>
                        </div>

                        <button className="menu-btn" type="button">
                          <FaEllipsisV />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="empty-table-state">
                    No restaurants available.
                  </div>
                )}
              </div>
            </Card>
          </section>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
