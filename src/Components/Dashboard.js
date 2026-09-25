
import React, { useEffect, useState } from "react";

import Sidebar from "./Sidebar";
import Box from "@mui/material/Box";
import "./Dashboard.css";

import { LineChart } from "@mui/x-charts/LineChart";

import { Col, Container, Row, Card, Table } from "react-bootstrap";

import {
  FaArrowUp,
  FaEllipsisV,
  FaUsers,
  FaUtensils,
  FaUserPlus,
  FaUserCheck,
  FaUserSlash,
  FaArrowDown,
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
  Legend
);

// ======================================================
// SALES BREAKDOWN
// ======================================================

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

// ======================================================
// DASHBOARD
// ======================================================

const Dashboard = () => {
  const navigate = useNavigate();

  const { user: currentUser } = useSelector((state) => state.auth);

  // ======================================================
  // STATES
  // ======================================================

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalRestaurants, setTotalRestaurants] = useState(0);

  const [orders, setOrders] = useState([]);

  const [displayedRestaurants, setDisplayedRestaurants] = useState([]);

  const [overview, setOverview] = useState({
    labels: [],
    totalOrders: [],
    completed: [],
    cancelled: [],
  });

  const [salesOverView, setSalesOverView] = useState([]);

  const [revenue, setRevenue] = useState({
    totalRevenue: 0,
  });

  const [restaurantId, setRestaurantId] = useState(null);

  // ======================================================
  // ADMIN AUTH CHECK
  // ======================================================

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
      return;
    }

    if (
      !currentUser.roles ||
      currentUser.roles[0] !== "ROLE_ADMIN"
    ) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  // ======================================================
  // RESTAURANT SALES OVERVIEW
  // ======================================================

  useEffect(() => {
    if (!restaurantId) {
      return;
    }

    axios
      .get(
        `http://localhost:8090/api/orders/restaurent/${restaurantId}/sales-overview`
      )
      .then((response) => {
        console.log(
          "Restaurant Sales Overview:",
          response.data
        );

        const data = Array.isArray(response.data)
          ? response.data
          : [];

        setOverview({
          labels: data.map((item) => item?.date || ""),
          totalOrders: data.map(
            (item) => Number(item?.totalOrders) || 0
          ),
          completed: data.map(
            (item) => Number(item?.completed) || 0
          ),
          cancelled: data.map(
            (item) => Number(item?.cancelled) || 0
          ),
        });
      })
      .catch((error) => {
        console.error(
          "Restaurant sales overview error:",
          error
        );

        setOverview({
          labels: [],
          totalOrders: [],
          completed: [],
          cancelled: [],
        });
      });
  }, [restaurantId]);

  // ======================================================
  // SALES OVERVIEW
  // ======================================================

  useEffect(() => {
    axios
      .get(
        "http://localhost:8090/api/orders/analytics/sales-overview"
      )
      .then((response) => {
        console.log(
          "Sales Overview:",
          response.data
        );

        if (Array.isArray(response.data)) {
          setSalesOverView(response.data);
        } else {
          setSalesOverView([]);
        }
      })
      .catch((error) => {
        console.error(
          "Sales overview error:",
          error
        );

        setSalesOverView([]);
      });
  }, []);

  // ======================================================
  // REVENUE
  // ======================================================

  useEffect(() => {
    axios
      .get(
        "http://localhost:8090/api/orders/analytics/revenue/monthly"
      )
      .then((response) => {
        console.log(
          "Revenue Analytics:",
          response.data
        );

        setRevenue(response.data || { totalRevenue: 0 });
      })
      .catch((error) => {
        console.error(
          "Failed to fetch revenue analytics:",
          error
        );

        setRevenue({
          totalRevenue: 0,
        });
      });
  }, []);
   useEffect(() => {
    axios
      .get(
        "http://localhost:8090/api/orders/analytics/revenue/daily"
      )
      .then((response) => {
        console.log(
          "Revenue Analytics:",
          response.data
        );

        setRevenue(response.data);
      })
      .catch((error) => {
        console.error(
          "Failed to fetch revenue analytics:",
          error
        );

        setRevenue({
          totalRevenue: 0,
        });
      });
  }, []);

  // ======================================================
  // RECENT ORDERS
  // ======================================================

  useEffect(() => {
    axios
      .get(
        "http://localhost:8090/api/orders/analytics/recent-orders"
      )
      .then((response) => {
        console.log(
          "Orders fetched successfully:",
          response.data
        );

        if (Array.isArray(response.data)) {
          setOrders(response.data);
        } else {
          setOrders([]);
        }
      })
      .catch((error) => {
        console.error(
          "Failed to fetch orders:",
          error
        );

        setOrders([]);
      });
  }, []);

  // ======================================================
  // RESTAURANT COUNT
  // ======================================================

  useEffect(() => {
    axios
      .get(
        "http://localhost:8090/api/restaurents/count"
      )
      .then((response) => {
        console.log(
          "Restaurant count:",
          response.data
        );

        setTotalRestaurants(
          Number(response.data?.totalRestaurents) || 0
        );
      })
      .catch((error) => {
        console.error(
          "Failed to fetch restaurant count:",
          error
        );

        setTotalRestaurants(0);
      });
  }, []);

  // ======================================================
  // USERS
  // ======================================================

  useEffect(() => {
    axios
      .get(
        "http://localhost:8090/api/auth/alluser"
      )
      .then((response) => {
        console.log(
          "Users:",
          response.data
        );

        if (Array.isArray(response.data)) {
          setTotalUsers(response.data.length);
        } else {
          setTotalUsers(0);
        }
      })
      .catch((error) => {
        console.error(
          "Failed to fetch users:",
          error
        );

        setTotalUsers(0);
      });
  }, []);

  // ======================================================
  // TOP RESTAURANTS
  // ======================================================

  useEffect(() => {
    axios
      .get(
        "http://localhost:8090/api/orders/analytics/top-restaurants"
      )
      .then((response) => {
        console.log(
          "TOP RESTAURANTS RESPONSE:",
          response.data
        );

        if (Array.isArray(response.data)) {
          setDisplayedRestaurants(response.data);

          // Get restaurant ID dynamically
          if (response.data.length > 0) {
            const id =
              response.data[0]?.restaurantId ||
              response.data[0]?._id ||
              response.data[0]?.id;

            if (id) {
              setRestaurantId(id);
            }
          }
        } else {
          setDisplayedRestaurants([]);
        }
      })
      .catch((error) => {
        console.error(
          "Failed to fetch Top Restaurants:",
          error
        );

        setDisplayedRestaurants([]);
      });
  }, []);

  // ======================================================
  // DISPLAYED ORDERS
  // ======================================================

  const displayedOrders = Array.isArray(orders)
    ? orders.slice(0, 5)
    : [];

  // ======================================================
  // DOUGHNUT DATA
  // ======================================================

  const doughnutData = {
    labels: salesBreakdown.map(
      (item) => item.label
    ),

    datasets: [
      {
        data: salesBreakdown.map(
          (item) => item.value
        ),

        backgroundColor: salesBreakdown.map(
          (item) => item.color
        ),

        borderWidth: 0,
        cutout: "72%",
      },
    ],
  };

  // ======================================================
  // DOUGHNUT OPTIONS
  // ======================================================

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

  // ======================================================
  // SAFE TEXT
  // ======================================================

  const getSafeText = (
    value,
    fallback = "N/A"
  ) => {
    if (
      value === null ||
      value === undefined ||
      value === ""
    ) {
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

  // ======================================================
  // SALES TOTAL
  // ======================================================

  const salesTotal = Array.isArray(salesOverView)
    ? salesOverView.reduce(
        (sum, item) =>
          sum + Number(item?.totalOrders || 0),
        0
      )
    : 0;

  // ======================================================
  // NO USER
  // ======================================================

  if (!currentUser) {
    return null;
  }

  // ======================================================
  // JSX
  // ======================================================

  return (
    <Container
      fluid
      className="dashboard-page"
    >
      <Row className="g-0">

        {/* ==================================================
            SIDEBAR
        ================================================== */}

        <Col
          md={1}
          className="p-0 dashboard-sidebar"
        >
          <Sidebar />
        </Col>

        <Col
          md={11}
          className="dashboard"
        >

          {/* ==================================================
              HEADER
          ================================================== */}

          <header className="dashboard-header">
            <div>
              <p className="dashboard-eyebrow">
                ADMIN WORKSPACE
              </p>

              <h1 className="dashboard-title">
                Dashboard
              </h1>

              <p className="dashboard-subtitle">
                Welcome back,{" "}
                <b>
                  {getSafeText(
                    currentUser?.firstName,
                    "Admin"
                  )}
                </b>
                ! Here's what's happening today.
              </p>
            </div>

            <div className="dashboard-header-meta">
              <span className="dashboard-live-dot"></span>
              Live overview
            </div>
          </header>

          {/* ==================================================
              STATISTICS CARDS
          ================================================== */}

          <section className="dashboard-section">
            <Row className="dashboard_cards g-3">

              {/* TOTAL USERS */}

              <Col
                lg={3}
                md={6}
                sm={6}
              >
                <Card
                  className="dashboard_card stat-card"
                  onClick={() =>
                    navigate("/Users")
                  }
                  style={{
                    cursor: "pointer",
                  }}
                >
                  <div className="stat-icon total-users">
                    <FaUsers />
                  </div>

                  <div className="stat-card-body">
                    <p className="stat-card-title">
                      Total Users
                    </p>

                    <h4 className="stat-card-count">
                      {totalUsers}
                    </h4>

                    <span className="stat-card-note">
                      Registered accounts
                    </span>
                  </div>
                </Card>
              </Col>

              {/* TOTAL RESTAURANTS */}

              <Col
                lg={3}
                md={6}
                sm={6}
              >
                <Card
                  className="dashboard_card stat-card"
                  onClick={() =>
                    navigate(
                      "/AdminRestaurants"
                    )
                  }
                  style={{
                    cursor: "pointer",
                  }}
                >
                  <div className="stat-icon active-users">
                    <FaUtensils />
                  </div>

                  <div className="stat-card-body">
                    <p className="stat-card-title">
                      Total Restaurants
                    </p>

                    <h4 className="stat-card-count">
                      {totalRestaurants}
                    </h4>

                    <span className="stat-card-note">
                      Available partners
                    </span>
                  </div>
                </Card>
              </Col>

              {/* TOTAL ORDERS */}

              <Col
                lg={3}
                md={6}
                sm={6}
              >
                <Card
                  className="dashboard_card stat-card"
                  onClick={() =>
                    navigate("/AdminOrders")
                  }
                  style={{
                    cursor: "pointer",
                  }}
                >
                  <div className="stat-icon new-users">
                    <FaUserPlus />
                  </div>

                  <div className="stat-card-body">
                    <p className="stat-card-title">
                      Total Orders
                    </p>

                    <h4 className="stat-card-count">
                      {orders.length}
                    </h4>

                    <span className="stat-card-note">
                      All placed orders
                    </span>
                  </div>
                </Card>
              </Col>

              {/* REVENUE */}

              <Col
                lg={3}
                md={6}
                sm={6}
              >
                <Card
                  className="dashboard_card stat-card"
                  onClick={() =>
                    navigate("/Revenue")
                  }
                  style={{
                    cursor: "pointer",
                  }}
                >
                  <div className="stat-icon blocked-users">
                    <FaArrowUp />
                  </div>

                  <div className="stat-card-body">
                    <p className="stat-card-title">
                      Revenue
                    </p>

                    <h4 className="stat-card-count">
                      ₹
                      {Number(
                        revenue?.totalRevenue || 0
                      )}
                    </h4>

                    <span className="stat-card-note">
                      Current sales total
                    </span>
                  </div>
                </Card>
              </Col>

            </Row>
          </section>

          {/* ==================================================
              ORDER OVERVIEW
          ================================================== */}

          <section className="dashboard-section">
            <Row className="g-3">

              {/* LINE CHART */}

              <Col lg={6}>
                <Card className="panel-card h-100">

                  <Card.Header className="panel-header">
                    <div>
                      <span className="panel-kicker">
                        PERFORMANCE
                      </span>

                      <h2>
                        Order Overview
                      </h2>
                    </div>

                    <select
                      className="panel-select"
                      defaultValue="month"
                    >
                      <option value="month">
                        This Month
                      </option>

                      <option value="week">
                        This Week
                      </option>

                      <option value="year">
                        This Year
                      </option>
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
                            data: overview.labels,
                          },
                        ]}
                        series={[
                          {
                            data:
                              overview.totalOrders,
                            label: "Total Orders",
                            color: "#7c3aed",
                          },
                          {
                            data:
                              overview.completed,
                            label: "Completed",
                            color: "#16a34a",
                          },
                          {
                            data:
                              overview.cancelled,
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

              <Col lg={6}>
                <Card className="panel-card h-100">

                  <Card.Header className="panel-header">
                    <div>
                      <span className="panel-kicker">
                        LATEST ACTIVITY
                      </span>

                      <h2>
                        Recent Orders
                      </h2>
                    </div>

                    <button
                      className="view-all-btn"
                      type="button"
                      onClick={() =>
                        navigate(
                          "/AdminOrders"
                        )
                      }
                    >
                      View All
                    </button>
                  </Card.Header>

                  <div className="recent-orders-wrapper">

                    <Table
                      responsive
                      className="orders-table"
                    >
                      <thead>
                        <tr>
                          <th>Order</th>
                          <th>
                            Restaurant Name
                          </th>
                          <th>
                            Customer
                          </th>
                          <th>Amount</th>
                          <th>Status</th>
                        </tr>
                      </thead>

                      <tbody>

                        {displayedOrders.length >
                        0 ? (

                          displayedOrders.map(
                            (order, index) => (
                              <tr
                                key={
                                  order?._id ||
                                  order?.id ||
                                  index
                                }
                              >

                                <td>
                                  <span className="order-id">
                                    {getSafeText(
                                      order?._id ||
                                        order?.id
                                    )}
                                  </span>
                                </td>

                                <td>
                                  {getSafeText(
                                    order
                                      ?.items?.[0]
                                      ?.restaurentId
                                      ?.restaurentName ||
                                      order
                                        ?.items?.[0]
                                        ?.restaurentId
                                        ?.restaurantName,
                                    "Restaurant"
                                  )}
                                </td>

                                <td>
                                  <div className="customer-cell">

                                    <div className="customer-avatar">
                                      {getSafeText(
                                        order
                                          ?.userId
                                          ?.firstName,
                                        "U"
                                      )}
                                    </div>

                                    <span>
                                      {getSafeText(
                                        order
                                          ?.userId
                                          ?.lastName,
                                        "Customer"
                                      )}
                                    </span>

                                  </div>
                                </td>

                                <td>
                                  <strong>
                                    ₹
                                    {getSafeText(
                                      order?.totalAmount,
                                      "0"
                                    )}
                                  </strong>
                                </td>

                                <td>
                                  <span>
                                    {getSafeText(
                                      order?.paymentStatus,
                                      "N/A"
                                    )}
                                  </span>
                                </td>

                              </tr>
                            )
                          )

                        ) : (

                          <tr>
                            <td
                              colSpan="5"
                              className="empty-table-state"
                            >
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

          {/* ==================================================
              RECENT RESTAURANTS
          ================================================== */}

          <section className="dashboard-section">

            <Card className="recent-restaurants-card">

              <div className="recent-restaurants-header">

                <div>
                  <span className="panel-kicker">
                    PARTNER DIRECTORY
                  </span>

                  <h2>
                    Recent Restaurants
                  </h2>
                </div>

                <button
                  className="view-all-btn"
                  type="button"
                  onClick={() =>
                    navigate(
                      "/AdminRestaurants"
                    )
                  }
                >
                  View All
                </button>

              </div>

              <div className="recent-restaurants-list">

                {displayedRestaurants.length >
                0 ? (

                  displayedRestaurants.map(
                    (restaurant, index) => (

                      <div
                        className="recent-restaurant-item"
                        key={
                          restaurant?.restaurantId ||
                          restaurant?._id ||
                          restaurant?.id ||
                          index
                        }
                      >

                        <img
                          src={
                            restaurant?.image ||
                            restaurant?.imageUrl ||
                            "/REStaurent/inner-view copy.jpg"
                          }
                          alt={
                            restaurant?.restaurantName ||
                            "Restaurant"
                          }
                          className="restaurant-image"
                          onError={(event) => {
                            event.currentTarget.src =
                              "/REStaurent/inner-view copy.jpg";
                          }}
                        />

                        <div className="restaurant-details">

                          <div className="restaurant-details-text">

                            <h6>
                              {restaurant?.restaurantName ||
                                restaurant?.restaurentName ||
                                "Restaurant"}
                            </h6>

                            <p>
                              {restaurant?.location ||
                                restaurant?.city ||
                                "Location not available"}
                            </p>

                            <span className="status-active">
                              Active
                            </span>

                          </div>

                          <button
                            className="menu-btn"
                            type="button"
                          >
                            <FaEllipsisV />
                          </button>

                        </div>

                      </div>

                    )
                  )

                ) : (

                  <div className="empty-table-state">
                    No restaurants available.
                  </div>

                )}

              </div>

            </Card>

          </section>

          {/* ==================================================
              BOTTOM SECTION
          ================================================== */}

          <section className="dashboard-section">

            <Row className="g-3">

              {/* ==================================================
                  TOP RESTAURANTS
              ================================================== */}

              <Col lg={4}>

                <Card className="panel-card h-100">

                  <Card.Body>

                    <div className="panel-header no-border">

                      <div>
                        <span className="panel-kicker">
                          PARTNERS
                        </span>

                        <h2>
                          Top Restaurants
                        </h2>
                      </div>

                      <button
                        className="view-all-btn"
                        type="button"
                        onClick={() =>
                          navigate(
                            "/AdminRestaurants"
                          )
                        }
                      >
                        View All
                      </button>

                    </div>

                    <div className="top-restaurants-list">

                      {displayedRestaurants.length >
                      0 ? (

                        displayedRestaurants.map(
                          (restaurant, index) => {

                            const restaurantName =
                              restaurant?.restaurantName ||
                              restaurant?.restaurentName ||
                              "Restaurant";

                            const location =
                              restaurant?.city ||
                              restaurant?.location ||
                              "Location not available";

                            const orderCount =
                              Number(
                                restaurant?.totalOrdersCount ||
                                  0
                              );

                            const image =
                              restaurant?.image ||
                              restaurant?.imageUrl ||
                              "/REStaurent/inner-view copy.jpg";

                            return (
                              <div
                                className="top-restaurant-row"
                                key={
                                  restaurant?.restaurantId ||
                                  restaurant?._id ||
                                  restaurant?.id ||
                                  index
                                }
                              >

                                <span
                                  className={`rank-badge ${
                                    index % 2 === 0
                                      ? "rank-orange"
                                      : "rank-gray"
                                  }`}
                                >
                                  {index + 1}
                                </span>

                                <img
                                  src={image}
                                  alt={
                                    restaurantName
                                  }
                                  className="top-restaurant-img"
                                  onError={(
                                    event
                                  ) => {
                                    event.currentTarget.src =
                                      "/REStaurent/inner-view copy.jpg";
                                  }}
                                />

                                <div className="top-restaurant-info">

                                  <p className="top-restaurant-name">
                                    {
                                      restaurantName
                                    }
                                  </p>

                                  <p className="top-restaurant-category">
                                    {location}
                                  </p>

                                </div>

                                <div className="top-restaurant-orders">
                                  {orderCount}{" "}
                                  Orders
                                </div>

                              </div>
                            );
                          }
                        )

                      ) : (

                        <div className="empty-table-state">
                          No top restaurants available.
                        </div>

                      )}

                    </div>

                  </Card.Body>

                </Card>

              </Col>

              {/* ==================================================
                  SALES OVERVIEW
              ================================================== */}

              <Col lg={4}>

                <Card className="panel-card h-100">

                  <Card.Header className="panel-header">

                    <div>
                      <span className="panel-kicker">
                        REVENUE MIX
                      </span>

                      <h2>
                        Sales Overview
                      </h2>
                    </div>

                    <select
                      className="panel-select"
                      defaultValue="month"
                    >
                      <option value="month">
                        This Month
                      </option>

                      <option value="week">
                        This Week
                      </option>
                    </select>

                  </Card.Header>

                  <Card.Body className="sales-overview-body">

                    <div className="doughnut-wrapper">

                      <Doughnut
                        data={doughnutData}
                        options={
                          doughnutOptions
                        }
                      />

                      <div className="doughnut-center">

                        <span className="doughnut-total-label">
                          Total
                        </span>

                        <span className="doughnut-total-value">
                          {salesTotal}
                        </span>

                      </div>

                    </div>

                    <ul className="sales-legend">

                      {salesOverView.length >
                      0 ? (

                        salesOverView.map(
                          (item, index) => (

                            <li
                              key={
                                item?._id ||
                                index
                              }
                            >

                              <span
                                className="legend-dot"
                                style={{
                                  backgroundColor:
                                    salesBreakdown[
                                      index %
                                        salesBreakdown.length
                                    ].color,
                                }}
                              />

                              <span className="legend-label">
                                {getSafeText(
                                  item?.timeline,
                                  "Sales"
                                )}
                              </span>

                              <span className="legend-amount">
                                {Number(
                                  item?.totalOrders ||
                                    0
                                )}{" "}
                                Orders
                              </span>

                            </li>

                          )
                        )

                      ) : (

                        <li>
                          <span className="legend-label">
                            No sales data available
                          </span>
                        </li>

                      )}

                    </ul>

                  </Card.Body>

                </Card>

              </Col>

              {/* ==================================================
                  USER STATISTICS
              ================================================== */}

              <Col lg={4}>

                <Card className="panel-card h-100">

                  <Card.Header className="panel-header">

                    <div>
                      <span className="panel-kicker">
                        ACCOUNT HEALTH
                      </span>

                      <h2>
                        User Statistics
                      </h2>
                    </div>

                    <button
                      className="view-all-btn"
                      type="button"
                      onClick={() =>
                        navigate("/Users")
                      }
                    >
                      View All
                    </button>

                  </Card.Header>

                  <Card.Body className="user-stats-body">

                    {/* TOTAL USERS */}

                    <div className="user-stat-row">

                      <div className="user-stat-icon total-users">
                        <FaUsers />
                      </div>

                      <div className="user-stat-content">

                        <p>
                          Total Users
                        </p>

                        <h3>
                          {totalUsers}
                        </h3>

                      </div>

                      <span className="stat-trend trend-up">
                        <FaArrowUp /> 12.5%
                      </span>

                    </div>

                    {/* ACTIVE USERS */}

                    <div className="user-stat-row">

                      <div className="user-stat-icon active-users">
                        <FaUserCheck />
                      </div>

                      <div className="user-stat-content">

                        <p>
                          Active Users
                        </p>

                        <h3>
                          {totalUsers}
                        </h3>

                      </div>

                      <span className="stat-trend trend-up">
                        <FaArrowUp /> 8.2%
                      </span>

                    </div>

                    {/* NEW USERS */}

                    <div className="user-stat-row">

                      <div className="user-stat-icon new-users">
                        <FaUserPlus />
                      </div>

                      <div className="user-stat-content">

                        <p>
                          New Users
                        </p>

                        <h3>
                          {totalUsers}
                        </h3>

                      </div>

                      <span className="stat-trend trend-up">
                        <FaArrowUp /> 5.4%
                      </span>

                    </div>

                    {/* BLOCKED USERS */}

                    <div className="user-stat-row">

                      <div className="user-stat-icon blocked-users">
                        <FaUserSlash />
                      </div>

                      <div className="user-stat-content">

                        <p>
                          Blocked Users
                        </p>

                        <h3>
                          0
                        </h3>

                      </div>

                      <span className="stat-trend trend-down">
                        <FaArrowDown /> 2.1%
                      </span>

                    </div>

                  </Card.Body>

                </Card>

              </Col>

            </Row>

          </section>

        </Col>

      </Row>

    </Container>
  );
};

export default Dashboard;
