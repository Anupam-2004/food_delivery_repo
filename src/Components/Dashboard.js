import React, { useEffect, useState } from "react";

import Sidebar from "./Sidebar";
import Box from "@mui/material/Box";
import "./Dashboard.css";

import { LineChart } from "@mui/x-charts/LineChart";

import { Col, Container, Row, Card, Table } from "react-bootstrap";
import {
  FaStore,
  FaUtensils,
  FaClipboardList,
  FaRupeeSign,
  FaArrowUp,
  FaArrowDown,
  FaEllipsisV,
  FaUsers,
  FaUserCheck,
  FaUserPlus,
  FaUserSlash,
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
import { Link } from "react-router";

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

// -------------------------------------------------
// Static content used only when live data isn't available yet
// -------------------------------------------------

const fallbackRecentOrders = [
  { id: "#ORD1234", customer: "Rahul Sharma", restaurant: "Spicy Bites", amount: "₹520", status: "Delivered" },
  { id: "#ORD1235", customer: "Priya Singh", restaurant: "Tasty Treats", amount: "₹350", status: "Preparing" },
  { id: "#ORD1236", customer: "Amit Kumar", restaurant: "Pizza Palace", amount: "₹680", status: "On The Way" },
  { id: "#ORD1237", customer: "Neha Verma", restaurant: "Burger House", amount: "₹420", status: "Delivered" },
  { id: "#ORD1238", customer: "Rohit Raj", restaurant: "Chinese Wok", amount: "₹310", status: "Cancelled" },
];

const fallbackTopRestaurants = [
  { name: "Spicy Bites", category: "North Indian, Chinese", orders: 425, image: "/REStaurent/Blue_diamond.jpg" },
  { name: "Tasty Treats", category: "Fast Food, Beverages", orders: 380, image: "/REStaurent/Blue_diamond.jpg" },
  { name: "Pizza Palace", category: "Pizza, Italian", orders: 310, image: "/REStaurent/Blue_diamond.jpg" },
  { name: "Burger House", category: "Burgers, Fast Food", orders: 280, image: "/REStaurent/Blue_diamond.jpg" },
];

const recentRestaurants = [
  { id: 1, name: "The Biryani House", location: "Lucknow, Uttar Pradesh", image: "/REStaurent/inner-view copy.jpg", status: "Active" },
  { id: 2, name: "Cafe Coffee Day", location: "Bangalore, Karnataka", image: "/REStaurent/inner-view copy.jpg", status: "Active" },
  { id: 3, name: "Wow! Momos", location: "Delhi, Delhi", image: "/REStaurent/inner-view copy.jpg", status: "Active" },
  { id: 4, name: "Kenters", location: "Mumbai, Maharashtra", image: "/REStaurent/inner-view copy.jpg", status: "Active" },
];

const salesBreakdown = [
  { label: "Food Orders", amount: "₹1,45,680", value: 145680, color: "#7c3aed" },
  { label: "Delivery Charges", amount: "₹45,230", value: 45230, color: "#16a34a" },
  { label: "Offers Discount", amount: "₹25,300", value: 25300, color: "#f97316" },
  { label: "Other Charges", amount: "₹29,470", value: 29470, color: "#2563eb" },
];

const statusClassMap = {
  Delivered: "status-delivered",
  Preparing: "status-preparing",
  "On The Way": "status-ontheway",
  Cancelled: "status-cancelled",
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { user: currentUser } = useSelector((state) => state.auth);

  const [numberofusers, setNumberofUsers] = useState(null);
  const [numberofrestaurents, setNumberofRestaurents] = useState(null);
  const [numberofproducts, setNumberofProducts] = useState(null);

  const [orders, setOrders] = useState([]);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8090/api/products/count")
      .then((response) => setNumberofProducts(response.data))
      .catch((error) => console.log("Failed to fetch products count", error));

    axios
      .get("http://localhost:8090/api/auth/usercount")
      .then((response) => setNumberofUsers(response.data))
      .catch((error) => console.log("Failed to fetch users count", error));

    axios
      .get("http://localhost:8090/api/restaurents/count")
      .then((response) => setNumberofRestaurents(response.data))
      .catch((error) => console.log("Failed to fetch restaurants count", error));

    axios
      .get("http://localhost:8090/api/orders")
      .then((response) => {
        const data = Array.isArray(response.data) ? response.data : response.data.orders || [];
        setOrders(data);
      })
      .catch((error) => console.log("Failed to fetch orders", error));

    axios
      .get("http://localhost:8090/api/restaurents")
      .then((response) => {
        const data = Array.isArray(response.data) ? response.data : response.data.restaurents || [];
        setRestaurants(data);
      })
      .catch((error) => console.log("Failed to fetch restaurants", error));
  }, []);

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    } else if (currentUser.roles[0] !== "ROLE_ADMIN") {
      navigate("/");
    }
  }, [currentUser, navigate]);

  // Order Overview chart data
  const xLabels = ["01 May", "05 May", "10 May", "15 May", "20 May", "25 May", "30 May"];
  const totalOrdersData = [320, 480, 430, 610, 590, 720, 680];
  const completedData = [230, 340, 320, 430, 460, 540, 520];
  const cancelledData = [40, 55, 48, 65, 58, 72, 60];

  const totalRestaurantsCount = numberofrestaurents?.totalRestaurents ?? 128;
  const totalProductsCount = numberofproducts?.totalProducts ?? 1246;
  const totalOrdersCount = orders.length || 3562;
  const totalUsersCount = numberofusers?.totalUsers ?? 12845;

  const statCards = [
    {
      title: "Total Restaurants",
      count: totalRestaurantsCount.toLocaleString("en-IN"),
      trend: "+12.5%",
      up: true,
      icon: <FaStore />,
      className: "stat-purple",
      link: "/AdminRestaurents",
    },
    {
      title: "Total Products",
      count: totalProductsCount.toLocaleString("en-IN"),
      trend: "+8.4%",
      up: true,
      icon: <FaUtensils />,
      className: "stat-green",
      link: "/Foods",
    },
    {
      title: "Total Orders",
      count: totalOrdersCount.toLocaleString("en-IN"),
      trend: "+15.2%",
      up: true,
      icon: <FaClipboardList />,
      className: "stat-orange",
      link: "/Dashboard",
    },
    {
      title: "Total Revenue",
      count: "₹2,45,680",
      trend: "+18.7%",
      up: true,
      icon: <FaRupeeSign />,
      className: "stat-blue",
      link: "/Dashboard",
    },
  ];

  const userStats = [
    { title: "Total Users", count: totalUsersCount.toLocaleString("en-IN"), trend: "+10.2%", up: true, icon: <FaUsers />, className: "total-users" },
    { title: "Active Users", count: "8,756", trend: "+8.7%", up: true, icon: <FaUserCheck />, className: "active-users" },
    { title: "New Users This Month", count: "1,245", trend: "+15.3%", up: true, icon: <FaUserPlus />, className: "new-users" },
    { title: "Blocked Users", count: "152", trend: "-2.1%", up: false, icon: <FaUserSlash />, className: "blocked-users" },
  ];

  const displayedOrders =
    orders.length > 0
      ? orders.slice(0, 5).map((o, i) => ({
          id: o.id ? `#ORD${o.id}` : fallbackRecentOrders[i % fallbackRecentOrders.length].id,
          customer: o.customerName || o.userName || fallbackRecentOrders[i % fallbackRecentOrders.length].customer,
          restaurant: o.restaurantName || fallbackRecentOrders[i % fallbackRecentOrders.length].restaurant,
          amount: o.amount ? `₹${o.amount}` : fallbackRecentOrders[i % fallbackRecentOrders.length].amount,
          status: o.status || fallbackRecentOrders[i % fallbackRecentOrders.length].status,
        }))
      : fallbackRecentOrders;

  const displayedTopRestaurants =
    restaurants.length > 0
      ? restaurants.slice(0, 4).map((r, i) => ({
          name: r.name || fallbackTopRestaurants[i % fallbackTopRestaurants.length].name,
          category: r.category || fallbackTopRestaurants[i % fallbackTopRestaurants.length].category,
          orders: r.orders || fallbackTopRestaurants[i % fallbackTopRestaurants.length].orders,
          image: fallbackTopRestaurants[i % fallbackTopRestaurants.length].image,
        }))
      : fallbackTopRestaurants;

  const totalSales = salesBreakdown.reduce((sum, s) => sum + s.value, 0);

  const doughnutData = {
    labels: salesBreakdown.map((s) => s.label),
    datasets: [
      {
        data: salesBreakdown.map((s) => s.value),
        backgroundColor: salesBreakdown.map((s) => s.color),
        borderWidth: 0,
        cutout: "72%",
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
  };

  if (!currentUser) {
    return null;
  }

  return (
    <Container fluid className="dashboard-page">
      <Row>
        <Col md={1} className="p-0">
          <Sidebar />
        </Col>

        <Col className="dashboard" md={11}>
          {/* HEADER */}
          <Row>
            <Col>
              <h2 className="dashboard-title">Dashboard</h2>
              <p className="dashboard-subtitle">
                Welcome back, <b>{currentUser.firstName}</b>!
              </p>
            </Col>
          </Row>

          {/* SUMMARY CARDS */}
          <Row className="dashboard_cards g-3">
            {statCards.map((stat) => (
              <Col lg={3} md={6} sm={6} key={stat.title}>
                <Link to={stat.link} className="stat-card-link">
                  <Card className="dashboard_card stat-card">
                    <div className={`stat-icon ${stat.className}`}>{stat.icon}</div>
                    <div className="stat-card-body">
                      <p className="stat-card-title">{stat.title}</p>
                      <h4 className="stat-card-count">{stat.count}</h4>
                      <span className={`stat-trend ${stat.up ? "trend-up" : "trend-down"}`}>
                        {stat.up ? <FaArrowUp /> : <FaArrowDown />} {stat.trend}
                        <span className="stat-trend-label"> from last month</span>
                      </span>
                    </div>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>

          {/* ORDER OVERVIEW + RECENT ORDERS */}
          <Row className="mt-4 g-3 align-items-stretch">
            <Col lg={6}>
              <Card className="panel-card h-100">
                <Card.Header className="panel-header">
                  <span>Order Overview</span>
                  <select className="panel-select" defaultValue="month">
                    <option value="month">This Month</option>
                    <option value="week">This Week</option>
                    <option value="year">This Year</option>
                  </select>
                </Card.Header>
                <Box sx={{ width: "100%", px: 1 }}>
                  <LineChart
                    height={330}
                    xAxis={[{ scaleType: "point", data: xLabels }]}
                    series={[
                      { data: totalOrdersData, label: "Total Orders", color: "#7c3aed" },
                      { data: completedData, label: "Completed", color: "#16a34a" },
                      { data: cancelledData, label: "Cancelled", color: "#ef4444" },
                    ]}
                    grid={{ horizontal: true }}
                    margin={{ top: 40, right: 20, bottom: 30, left: 40 }}
                  />
                </Box>
              </Card>
            </Col>

            <Col lg={6}>
              <Card className="panel-card h-100">
                <Card.Header className="panel-header">
                  <span>Recent Orders</span>
                  <button className="view-all-btn">View All</button>
                </Card.Header>
                <Table className="orders-table" responsive>
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Restaurant</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedOrders.map((order, idx) => (
                      <tr key={idx}>
                        <td>{order.id}</td>
                        <td>{order.customer}</td>
                        <td>{order.restaurant}</td>
                        <td>{order.amount}</td>
                        <td>
                          <span className={`status-badge ${statusClassMap[order.status] || "status-preparing"}`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card>
            </Col>
          </Row>

          {/* TOP RESTAURANTS + SALES OVERVIEW + USER STATISTICS */}
          <Row className="mt-3 g-3 align-items-stretch">
            <Col lg={4}>
              <Card className="panel-card h-100">
                <Card.Body>
                  <div className="panel-header no-border">
                    <span>🍽️ Top Restaurants</span>
                    <button className="view-all-btn">View All</button>
                  </div>

                  {displayedTopRestaurants.map((restaurant, idx) => (
                    <div className="top-restaurant-row" key={idx}>
                      <span className={`rank-badge ${idx % 2 === 0 ? "rank-orange" : "rank-gray"}`}>{idx + 1}</span>
                      <img src={restaurant.image} alt={restaurant.name} className="top-restaurant-img" />
                      <div className="top-restaurant-info">
                        <p className="top-restaurant-name">{restaurant.name}</p>
                        <p className="top-restaurant-category">{restaurant.category}</p>
                      </div>
                      <div className="top-restaurant-orders">{restaurant.orders} Orders</div>
                    </div>
                  ))}
                </Card.Body>
              </Card>
            </Col>

            <Col lg={4}>
              <Card className="panel-card h-100">
                <Card.Header className="panel-header">
                  <span>Sales Overview</span>
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
                    {salesBreakdown.map((s) => (
                      <li key={s.label}>
                        <span className="legend-dot" style={{ backgroundColor: s.color }} />
                        <span className="legend-label">{s.label}</span>
                        <span className="legend-amount">{s.amount}</span>
                      </li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={4}>
              <Card className="panel-card h-100">
                <Card.Header className="panel-header">
                  <span>User Statistics</span>
                  <button className="view-all-btn">View All</button>
                </Card.Header>
                <Card.Body className="user-stats-body">
                  {userStats.map((stat) => (
                    <div className="user-stat-row" key={stat.title}>
                      <div className={`user-stat-icon ${stat.className}`}>{stat.icon}</div>
                      <div className="user-stat-content">
                        <p>{stat.title}</p>
                        <h3>{stat.count}</h3>
                      </div>
                      <span className={`stat-trend ${stat.up ? "trend-up" : "trend-down"}`}>
                        {stat.up ? <FaArrowUp /> : <FaArrowDown />} {stat.trend}
                      </span>
                    </div>
                  ))}
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* RECENT RESTAURANTS */}
          <Row className="mt-3">
            <Col>
              <Card className="recent-restaurants-card">
                <div className="recent-restaurants-header">
                  <h5>Recent Restaurants</h5>
                  <button className="view-all-btn">View All</button>
                </div>

                <div className="recent-restaurants-list">
                  {recentRestaurants.map((recentRestaurant) => (
                    <div className="recent-restaurant-item" key={recentRestaurant.id}>
                      <img
                        src={recentRestaurant.image}
                        alt={recentRestaurant.name}
                        className="restaurant-image"
                      />
                      <div className="restaurant-details">
                        <div className="restaurant-details-text">
                          <h6>{recentRestaurant.name}</h6>
                          <p>{recentRestaurant.location}</p>
                          <span className="status-active">{recentRestaurant.status}</span>
                        </div>
                        <button className="menu-btn">
                          <FaEllipsisV />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;