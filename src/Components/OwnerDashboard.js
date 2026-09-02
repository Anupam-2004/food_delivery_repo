import React, { useEffect, useState } from "react";

import { Row, Col, Card, Button, Table, Badge, Spinner } from "react-bootstrap";

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
  FaTags,
  FaGift,
  FaChartBar,
  FaCog,
  FaStream,
  FaRegStar,
} from "react-icons/fa";

import { MdRestaurantMenu } from "react-icons/md";

import { LineChart } from "@mui/x-charts/LineChart";
import Box from "@mui/material/Box";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip as ChartTooltip,
  Legend as ChartLegend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

ChartJS.register(
  ArcElement,
  ChartTooltip,
  ChartLegend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
);

// ==============================
// SMALL INLINE SPARKLINE (no extra chart dependency needed for these tiny previews)
// ==============================

const Sparkline = ({ data, color }) => {
  const width = 76;
  const height = 34;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((v - min) / range) * (height - 6) - 3;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg width={width} height={height} className="sparkline">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// ==============================
// FALLBACK / PLACEHOLDER DEMO DATA
// Used only where the app doesn't yet expose a real endpoint
// (reviews, per-item sales counts, day-by-day order history),
// so the dashboard still looks right before that data exists.
// ==============================

const fallbackChartLabels = [
  "24 May",
  "25 May",
  "26 May",
  "27 May",
  "28 May",
  "29 May",
  "30 May",
];
const fallbackTotalOrders = [22, 26, 25, 30, 34, 33, 38];
const fallbackCompleted = [16, 19, 18, 22, 24, 23, 27];
const fallbackCancelled = [4, 6, 5, 7, 6, 8, 7];

const fallbackRecentOrders = [
  {
    id: "ORD1234",
    customer: "Rahul Sharma",
    items: "2 Items",
    amount: "₹520",
    status: "Preparing",
    time: "10:30 AM",
  },
  {
    id: "ORD1235",
    customer: "Priya Singh",
    items: "3 Items",
    amount: "₹350",
    status: "Confirmed",
    time: "10:15 AM",
  },
  {
    id: "ORD1236",
    customer: "Amit Kumar",
    items: "1 Item",
    amount: "₹680",
    status: "On the Way",
    time: "10:05 AM",
  },
  {
    id: "ORD1237",
    customer: "Neha Verma",
    items: "4 Items",
    amount: "₹420",
    status: "Preparing",
    time: "09:50 AM",
  },
  {
    id: "ORD1238",
    customer: "Rohit Raj",
    items: "2 Items",
    amount: "₹310",
    status: "Delivered",
    time: "09:30 AM",
  },
];

const fallbackTopItems = [
  { name: "Veg Burger", meta: "76 Orders", price: "₹5,320", emoji: "🍔" },
  { name: "Paneer Pizza", meta: "58 Orders", price: "₹4,350", emoji: "🍕" },
  { name: "Chicken Biryani", meta: "44 Orders", price: "₹4,120", emoji: "🍛" },
  { name: "French Fries", meta: "40 Orders", price: "₹2,000", emoji: "🍟" },
  { name: "Cold Coffee", meta: "35 Orders", price: "₹1,750", emoji: "🥤" },
];

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

const statusStyleMap = {
  Preparing: "status-preparing",
  Confirmed: "status-confirmed",
  "On the Way": "status-ontheway",
  Delivered: "status-delivered",
  Cancelled: "status-cancelled",
};

const OwnerDashboard = () => {
  const navigate = useNavigate();

  // ==============================
  // CURRENT USER
  // ==============================

  const { user: currentUser } = useSelector((state) => state.auth);
  console.log(currentUser);

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

  //   const restaurantId = response.data?._id;
  //    console.log("Owner ID:", restaurentId);
  // axios
  //   .get(`http://localhost:8090/api/products/restaurant/${restaurentId}`)
  //   .then((response) => {
  //     console.log("Products:", response.data);
  //   })
  //   .catch((error) => {
  //     console.log("Product Error:", error);
  //   });

  // ==============================
  // FETCH DASHBOARD DATA
  // ==============================
  console.log("Owner ID:", ownerId);
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
      .get(`http://localhost:8090/api/restaurents/mobile/${currentUser.username}`)

      .then((response) => {
        console.log("Restaurent:", response.data);

        let restaurentData = response.data;

        // If backend returns array
        if (Array.isArray(restaurentData)) {
          restaurentData = restaurentData[0];
        }

        setRestaurent(restaurentData);

        // ==============================
        // RESTAURANT ID
        // ==============================

        const restaurentId =restaurentData.id;

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
          .get(`http://localhost:8090/api/products/restaurant/${restaurentId}`)

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

            setOrders(response.data);
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

  // const handleDeleteProduct = (productId) => {
  //   axios
  //     .delete(`http://localhost:8090/api/products/${productId}`)

  //     .then((response) => {
  //       setProducts(response.data);
  //       alert("Product deleted successfully.");
  //     })

  //     .catch((error) => {
  //       console.error("Delete Product Error:", error);

  //       alert(error.response?.data?.message || "Failed to delete product.");
  //     });
  // };

  // ==============================
  // ORDER STATUS COLOR (bootstrap Badge variant, used in the full orders table)
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
  // DERIVED METRICS
  // ==============================

  const totalOrdersCount = orders.length;

  const deliveredOrders = orders.filter((order) =>
    ["delivered", "completed"].includes(order.orderStatus?.toLowerCase()),
  );

  const totalRevenue = deliveredOrders.reduce(
    (total, order) => total + Number(order.totalAmount || 0),
    0,
  );

  const pendingOrdersCount = orders.filter((order) =>
    ["processing", "pending", "accepted", "preparing", "ready"].includes(
      order.orderStatus?.toLowerCase(),
    ),
  ).length;

  // No ratings endpoint wired up yet, so this stays a placeholder until reviews are connected
  const averageRating = 4.6;

  const hasRealOrders = orders.length > 0;

  // Build the last 7 days' order-count series from real orders when we have them,
  // otherwise fall back to sample data so the chart still looks right on day one.
  const buildOrderOverview = () => {
    if (!hasRealOrders) {
      return {
        labels: fallbackChartLabels,
        totalSeries: fallbackTotalOrders,
        completedSeries: fallbackCompleted,
        cancelledSeries: fallbackCancelled,
      };
    }

    const days = [];
    for (let i = 6; i >= 0; i -= 1) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      days.push(d);
    }

    const labels = days.map((d) =>
      d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" }),
    );

    const totalSeries = days.map(
      (d) =>
        orders.filter(
          (o) =>
            new Date(o.createdAt || o.updatedAt || 0).toDateString() ===
            d.toDateString(),
        ).length,
    );

    const completedSeries = days.map(
      (d) =>
        orders.filter(
          (o) =>
            new Date(o.createdAt || o.updatedAt || 0).toDateString() ===
              d.toDateString() &&
            ["delivered", "completed"].includes(o.orderStatus?.toLowerCase()),
        ).length,
    );

    const cancelledSeries = days.map(
      (d) =>
        orders.filter(
          (o) =>
            new Date(o.createdAt || o.updatedAt || 0).toDateString() ===
              d.toDateString() &&
            ["cancelled", "canceled"].includes(o.orderStatus?.toLowerCase()),
        ).length,
    );

    return { labels, totalSeries, completedSeries, cancelledSeries };
  };

  const orderOverview = buildOrderOverview();

  // Compact "Recent Orders" preview (top panel) — real orders when available, sample otherwise
  const recentOrdersPreview = hasRealOrders
    ? orders.slice(0, 5).map((order) => {
        const orderId = order._id || order.id;

        const firstName = order.userId?.firstName || "";
        const lastName = order.userId?.lastName || "";
        const customerName =
          `${firstName} ${lastName}`.trim() || order.userId?.name || "Customer";

        const orderItems = Array.isArray(order.items) ? order.items : [];
        const itemCount = orderItems.reduce(
          (sum, item) => sum + Number(item.quantity || 1),
          0,
        );

        const createdAt = order.createdAt ? new Date(order.createdAt) : null;

        return {
          id: orderId?.toString().slice(-6) || "------",
          customer: customerName,
          items: `${itemCount || orderItems.length || 1} Item${
            itemCount === 1 ? "" : "s"
          }`,
          amount: `₹${Number(order.totalAmount || 0)}`,
          status: order.orderStatus || "Processing",
          time: createdAt
            ? createdAt.toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "--",
        };
      })
    : fallbackRecentOrders;

  // Top selling items — from real products when available, sample otherwise
  const topSellingItems =
    products.length > 0
      ? products.slice(0, 5).map((product, i) => ({
          name: product.foodName || product.name || "Product",
          meta: product.category || "—",
          price: `₹${Number(product.price || 0)}`,
          emoji: fallbackTopItems[i % fallbackTopItems.length].emoji,
        }))
      : fallbackTopItems;

  // Sales breakdown for the donut — proportional to real revenue once there is any,
  // otherwise the sample split shown in the design
  const salesTotal = totalRevenue > 0 ? totalRevenue : 45680;
  const salesBreakdown = [
    { label: "Food Orders", pct: 0.71, color: "#7c3aed" },
    { label: "Delivery Charges", pct: 0.14, color: "#16a34a" },
    { label: "Offers Discount", pct: 0.09, color: "#f97316" },
    { label: "Other Charges", pct: 0.06, color: "#2563eb" },
  ].map((s) => ({ ...s, amount: Math.round(salesTotal * s.pct) }));

  // Earnings summary — derived from real revenue once there is any
  const earningsTotal = totalRevenue > 0 ? totalRevenue : 145680;
  const commissionFees = Math.round(earningsTotal * 0.085);
  const netEarnings = earningsTotal - commissionFees;

  const today = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

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
          <span>{restaurent?.restaurentName || "FoodAdmin"}</span>
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
            <FaStream />
            <span>My Restaurant</span>
          </li>

          <li onClick={() => navigate("/AddProduct")}>
            <FaPlus />
            <span>Add Product</span>
          </li>

          <li>
            <MdRestaurantMenu />
            <span>Menu / Products</span>
          </li>

          {/* <li onClick={() => navigate("/OwnerCategories")}>
            <FaTags />
            <span>Categories</span>
          </li> */}

          <li onClick={() => navigate("/OwnerOrders")}>
            <FaShoppingBag />
            <span>Orders</span>
          </li>

          <li onClick={() => navigate("/OwnerOrderHistory")}>
            <FaClock />
            <span>Order History</span>
          </li>

          <li onClick={() => navigate("/OwnerCustomers")}>
            <FaUsers />
            <span>Customers</span>
          </li>

          <li onClick={() => navigate("/OwnerReviews")}>
            <FaRegStar />
            <span>Reviews</span>
          </li>

          <li onClick={() => navigate("/OwnerCoupons")}>
            <FaGift />
            <span>Coupons &amp; Offers</span>
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

        {/* LOGOUT */}

        <div className="sidebar-bottom">
          <div onClick={() => navigate("/")}>🚪 Logout</div>
        </div>
      </div>

      {/* ================= MAIN ================= */}

      <div className="owner-main">
        {/* HEADER */}

        <div className="owner-header">
          <div>
            <h2>
              Welcome back, {currentUser?.firstName} 👋
            </h2>
            <p>
              {restaurent
                ? "Here's what's happening with your restaurant today."
                : "Add your restaurant to start managing orders and products."}
            </p>
          </div>

          <div className="owner-header-right">
            {!restaurent && (
              <Button
                variant="danger"
                onClick={() => navigate("/AddRestaurent")}
              >
                <FaPlus className="me-2" />
                Add Restaurant
              </Button>
            )}

            <button className="date-pill">
              <FaCalendarAlt />
              <span>{today}</span>
              <FaChevronDown size={11} />
            </button>

            <button className="bell-btn">
              <FaBell />
              <span className="bell-badge">5</span>
            </button>
          </div>
        </div>

        {error && <div className="owner-error-banner">{error}</div>}

        {/* ================= SUMMARY CARDS ================= */}

        <Row className="g-3 mb-3 summary-row">
          <Col xl={3} md={6}>
            <Card className="summary-card">
              <div className="summary-icon summary-purple">
                <FaShoppingBag />
              </div>
              <div className="summary-body">
                <p>Total Orders</p>
                <h3>{totalOrdersCount || 128}</h3>
                <span className="summary-trend trend-up">
                  <FaArrowUp /> 18.6% <em>from last 7 days</em>
                </span>
              </div>
              <Sparkline data={[4, 6, 5, 8, 7, 9, 10]} color="#7c3aed" />
            </Card>
          </Col>

          <Col xl={3} md={6}>
            <Card className="summary-card">
              <div className="summary-icon summary-green">
                <FaRupeeSign />
              </div>
              <div className="summary-body">
                <p>Total Revenue</p>
                <h3>₹{(totalRevenue || 45680).toLocaleString("en-IN")}</h3>
                <span className="summary-trend trend-up">
                  <FaArrowUp /> 22.8% <em>from last 7 days</em>
                </span>
              </div>
              <Sparkline data={[5, 5, 7, 6, 8, 9, 12]} color="#16a34a" />
            </Card>
          </Col>

          <Col xl={3} md={6}>
            <Card className="summary-card">
              <div className="summary-icon summary-orange">
                <FaClock />
              </div>
              <div className="summary-body">
                <p>Pending Orders</p>
                <h3>{pendingOrdersCount || 12}</h3>
                <span className="summary-trend trend-up">
                  <FaArrowUp /> 5 <em>from yesterday</em>
                </span>
              </div>
              <Sparkline data={[8, 6, 9, 7, 10, 9, 11]} color="#f97316" />
            </Card>
          </Col>

          <Col xl={3} md={6}>
            <Card className="summary-card">
              <div className="summary-icon summary-blue">
                <FaStar />
              </div>
              <div className="summary-body">
                <p>Average Rating</p>
                <h3>
                  {averageRating} <FaStar className="rating-star" />
                </h3>
                <span className="summary-trend trend-up">
                  <FaArrowUp /> 0.3 <em>from last 7 days</em>
                </span>
              </div>
              <Sparkline data={[7, 8, 7, 9, 8, 10, 9]} color="#2563eb" />
            </Card>
          </Col>
        </Row>

        {/* ================= ORDER OVERVIEW + RECENT ORDERS ================= */}

        <Row className="g-3 mb-3 align-items-stretch">
          <Col lg={6}>
            <Card className="panel-card h-100">
              <div className="panel-header">
                <span>Order Overview</span>
                <select className="panel-select" defaultValue="week">
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
              </div>
              <Box sx={{ width: "100%", px: 1 }}>
                <LineChart
                  height={330}
                  xAxis={[{ scaleType: "point", data: orderOverview.labels }]}
                  series={[
                    {
                      data: orderOverview.totalSeries,
                      label: "Total Orders",
                      color: "#7c3aed",
                    },
                    {
                      data: orderOverview.completedSeries,
                      label: "Completed",
                      color: "#16a34a",
                    },
                    {
                      data: orderOverview.cancelledSeries,
                      label: "Cancelled",
                      color: "#ef4444",
                    },
                  ]}
                  grid={{ horizontal: true }}
                  margin={{ top: 40, right: 20, bottom: 30, left: 40 }}
                />
              </Box>
            </Card>
          </Col>

          <Col lg={6}>
            <Card className="panel-card h-100">
              <div className="panel-header">
                <span>Recent Orders</span>
                <button
                  className="view-all-btn"
                  onClick={() => navigate("/OwnerOrders")}
                >
                  View All Orders
                </button>
              </div>
              <Table className="orders-table" responsive>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  
                  {
                    recentOrdersPreview ? 
                  recentOrdersPreview.map((order, idx) => (
                    <tr key={idx}>
                      <td>#{order.id}</td>
                      <td>{order.addressId? order.addressId.name :"N/A"}</td>
                      {/* <td>{order.items.restaurentId.quantity}</td> */}
                      <td>{order.totalAmount}</td>
                      <td>
                        <span
                          className={`status-badge ${statusStyleMap[order.status] || "status-preparing"}`}
                        >
                          {order.orderStatus}
                        </span>
                      </td>
                      <td className="muted-cell">{order.time}</td>
                    </tr>
                  )) :" orders not found"}
                </tbody>
              </Table>
              <div className="panel-footer">
                <button
                  className="view-all-btn"
                  onClick={() => navigate("/OwnerOrders")}
                >
                  View All Orders <FaArrowRight size={11} />
                </button>
              </div>
            </Card>
          </Col>
        </Row>

        {/* ================= TOP SELLING + SALES OVERVIEW + EARNINGS ================= */}

        <Row className="g-3 mb-3 align-items-stretch">
          <Col lg={4}>
            <Card className="panel-card h-100">
              <div className="panel-header">
                <span>Top Selling Items</span>
                <button
                  className="view-all-btn"
                  onClick={() => navigate("/OwnerProducts")}
                >
                  View All
                </button>
              </div>
              <div className="panel-body">
                {topSellingItems.map((item, idx) => (
                  <div className="top-item-row" key={idx}>
                    <span
                      className={`rank-badge ${idx === 0 ? "rank-orange" : "rank-gray"}`}
                    >
                      {idx + 1}
                    </span>
                    <div className="top-item-emoji">{item.emoji}</div>
                    <div className="top-item-info">
                      <p className="top-item-name">{item.name}</p>
                      <p className="top-item-meta">{item.meta}</p>
                    </div>
                    <div className="top-item-price">{item.price}</div>
                  </div>
                ))}
              </div>
            </Card>
          </Col>

          <Col lg={4}>
            <Card className="panel-card h-100">
              <div className="panel-header">
                <span>Sales Overview</span>
                <select className="panel-select" defaultValue="week">
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
              </div>
              <Card.Body className="sales-overview-body">
                <div className="doughnut-wrapper">
                  <Doughnut
                    data={{
                      labels: salesBreakdown.map((s) => s.label),
                      datasets: [
                        {
                          data: salesBreakdown.map((s) => s.amount),
                          backgroundColor: salesBreakdown.map((s) => s.color),
                          borderWidth: 0,
                          cutout: "72%",
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      plugins: { legend: { display: false } },
                    }}
                  />
                  <div className="doughnut-center">
                    <span className="doughnut-total-label">Total Sales</span>
                    <span className="doughnut-total-value">
                      ₹{salesTotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
                <ul className="sales-legend">
                  {salesBreakdown.map((s) => (
                    <li key={s.label}>
                      <span
                        className="legend-dot"
                        style={{ backgroundColor: s.color }}
                      />
                      <span className="legend-label">{s.label}</span>
                      <span className="legend-amount">
                        ₹{s.amount.toLocaleString("en-IN")}{" "}
                        <em>({Math.round(s.pct * 100)}%)</em>
                      </span>
                    </li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <Card className="panel-card h-100">
              <div className="panel-header">
                <span>Earnings Summary</span>
                <select className="panel-select" defaultValue="month">
                  <option value="month">This Month</option>
                  <option value="week">This Week</option>
                </select>
              </div>
              <div className="panel-body earnings-body">
                <div className="earnings-row">
                  <div className="earnings-icon earnings-green">
                    <FaPiggyBank />
                  </div>
                  <div className="earnings-content">
                    <p>Total Earnings</p>
                    <h3>₹{earningsTotal.toLocaleString("en-IN")}</h3>
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
                    <h3>₹{commissionFees.toLocaleString("en-IN")}</h3>
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
                    <h3>₹{netEarnings.toLocaleString("en-IN")}</h3>
                  </div>
                  <span className="summary-trend trend-up">
                    <FaArrowUp /> 16.3%
                  </span>
                </div>
              </div>
              <div className="panel-footer">
                <button
                  className="view-all-btn"
                  onClick={() => navigate("/OwnerEarnings")}
                >
                  View Detailed Report <FaArrowRight size={11} />
                </button>
              </div>
            </Card>
          </Col>
        </Row>

        {/* ================= RESTAURANT INFO ================= */}

        {/* {restaurent && (
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
        )} */}

        {/* ================= QUICK ACTIONS ================= */}

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
                  onClick={() => navigate("/ViewRestaurent")}
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
                            {product.foodType}
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

                          {/* <Button
                            size="sm"
                            variant="outline-danger"
                            onClick={() => handleDeleteProduct(productId)}
                          >
                            <FaTrash />
                          </Button> */}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            )}
          </Card.Body>
        </Card>

        {/* ================= RECENT REVIEWS ================= */}

        <div className="section-title">
          <div>
            <h4>Recent Reviews</h4>
            <p>What your customers are saying</p>
          </div>
          <button
            className="view-all-btn"
            onClick={() => navigate("/OwnerReviews")}
          >
            View All Reviews
          </button>
        </div>

        <Row className="g-3 mb-4">
          {fallbackReviews.map((review, idx) => (
            <Col lg={4} md={6} key={idx}>
              <Card className="review-card">
                <Card.Body>
                  <div className="review-top">
                    <div
                      className="review-avatar"
                      style={{ backgroundColor: review.color }}
                    >
                      {review.name.charAt(0)}
                    </div>
                    <div className="review-meta">
                      <h6>{review.name}</h6>
                      <small>{review.date}</small>
                    </div>
                    <div className="review-food">{review.emoji}</div>
                  </div>
                  <div className="review-stars">
                    {Array.from({ length: 5 }).map((_, i) =>
                      i < review.rating ? (
                        <FaStar key={i} className="star-filled" />
                      ) : (
                        <FaRegStar key={i} className="star-empty" />
                      ),
                    )}
                  </div>
                  <p className="review-text">{review.text}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* ================= ORDERS TITLE ================= */}

        <div className="section-title">
          <div>
            <h4>Manage Recent Orders</h4>
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
              <Table >
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
                  {orders.map((order) => {
                    const orderId =  order.id;

                    const firstName = order.userId?.firstName || "";
                    const lastName = order.userId?.lastName || "";

                    const customerName =
                      `${firstName} ${lastName}`.trim() ||
                    
                      "Customer";

                    const orderItems = Array.isArray(order.items)
                      ? order.items
                      : [];

                    return (
                      <tr key={orderId}>
                        <td>
                          <strong>#{orderId?.toString()}</strong>
                        </td>

                        <td>{customerName}</td>

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

                        <td>₹{Number(order.totalAmount || 0)}</td>

                        <td>
                          <Badge bg={getStatusVariant(order.orderStatus)}>
                            {order.orderStatus || "Processing"}
                          </Badge>
                        </td>

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
