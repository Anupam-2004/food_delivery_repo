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


// const data = {
//   labels: monthlyRevenue.map(item => {
//     return new Date(2000, item.month - 1)
//       .toLocaleString("en", { month: "short" });
//   }),

//   datasets: [
//     {
//       label: "Revenue",
//       data: monthlyRevenue.map(item => item.revenue),
//       borderColor: "#4F46E5",
//       backgroundColor: "rgba(79, 70, 229, 0.15)",
//       tension: 0.4,
//       fill: true
//     }
//   ]
// };

const OwnerDashboard = () => {
  const navigate = useNavigate();
  const [restaurent, setRestaurent] = useState(null);
  const [products, setProducts] = useState([]);
  const [restaurantId, setRestaurantId] = useState("");
  const [loading, setLoading] = useState(true);

  // const [orderDetails, setOrderDetails] = useState([]);
  const [orders, setOrders] = useState([]);
  const { user: currentUser } = useSelector((state) => state.auth);
  // const [ordersLength, setOrdersLength] = useState([]);
  const [topSellingItems, setTopSellingItems] = useState([]);
  const userId = currentUser?.id || currentUser?._id;

  console.log("current user : ", currentUser);

  const test = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8090/api/restaurents/user/${userId}`,
      );

      const restaurantData = Array.isArray(res.data) ? res.data[0] : res.data;

      console.log("Restaurant data:", restaurantData);

      setRestaurantId(restaurantData?._id || restaurantData?.id || "");
      setRestaurent(restaurantData);
    } catch (error) {
      console.log("Error in test function:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    test();
  }, [userId]);

  useEffect(() => {
    if (!restaurantId) return;

    Promise.all([
      axios.get(
        `http://localhost:8090/api/products/restaurant/${restaurantId}`,
      ),
      axios.get(`http://localhost:8090/api/orders/restaurent/${restaurantId}`),
    ])
      .then(([productsResponse, ordersResponse]) => {
        const productData = Array.isArray(productsResponse.data)
          ? productsResponse.data
          : [];
        const orderData = Array.isArray(ordersResponse.data)
          ? ordersResponse.data
          : [];

        console.log("Products:", productData);
        console.log("Restaurant Orders:", orderData);

        setProducts(productData);
        setOrders(orderData);
        setTopSellingItems(productData.slice(0, 5));
      })
      .catch((error) => {
        console.log("Failed to fetch owner dashboard data", error);
      });
  }, [restaurantId]);

  const getImageUrl = (images) => {
    const image = Array.isArray(images) ? images[0] : images;
    return image ? `http://localhost:8090/upload/${image}` : "/no-image.png";
  };

  const totalOrders = orders.length;

  const totalRevenue = orders.reduce(
    (total, order) => total + Number(order.totalAmount || 0),
    0,
  );
  const commission = Math.round(totalRevenue * 0.1);
  const netEarnings = Math.max(totalRevenue - commission, 0);

  if (!currentUser) {
    return null;
  }

  const getStatusVariant = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
      case "processing":
        return "warning";

      case "preparing":
        return "info";

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

  return (
    <div className="owner-dashboard">
      <div className="owner-sidebar">
        <div className="sidebar-logo">
          <FaUtensils />
          <span>{restaurent?.restaurentName || "My Restaurant"}</span>
        </div>

        <div className="owner-profile">
          <div className="owner-avatar">{currentUser.firstName.charAt(0)}</div>

          <div>
            <h6>
              {currentUser.firstName} {currentUser.lastName}
            </h6>
            <small>Restaurant Owner</small>
          </div>
        </div>

        <ul className="sidebar-menu">
          <li className="active" onClick={() => navigate("/OwnerDashboard")}>
            <FaStore />
            <span>Dashboard</span>
          </li>

          <li onClick={() => navigate(`/ViewRestaurent/${restaurantId}`)}>
            <FaStream />
            <span>My Restaurant</span>
          </li>

          <li onClick={() => navigate("/AddProduct")}>
            <FaPlus />
            <span>Add Product</span>
          </li>

          <li onClick={() => navigate("/OwnerProducts")}>
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
          <div onClick={() => navigate("/")}>🚪 Logout</div>
        </div>
      </div>

     

      <div className="owner-main">
       

        <div className="owner-header">
          <div>
            <h2>Welcome back, {currentUser.firstName} 👋</h2>
            <p>Here's what's happening with your restaurant today.</p>
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

        <Row className="g-3 mb-3 summary-row">
          <Col xl={4} md={6}>
            <Card className="summary-card">
              <div className="summary-icon summary-purple">
                <FaShoppingBag />
              </div>

              <div className="summary-body">
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

              <div className="summary-body">
                <p>Total Revenue</p>
                <h3>₹{totalRevenue.toLocaleString("en-IN")}</h3>
              </div>
            </Card>
          </Col>

          <Col xl={4} md={6}>
            <Card className="summary-card">
              <div className="summary-icon summary-blue">
                <FaStar />
              </div>

              <div className="summary-body">
                <p>Average Rating</p>

                <h3>
                  4.5 <FaStar className="rating-star" />
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
                  onClick={() => navigate("/OwnerProducts")}
                >
                  View All
                </button>
              </div>

              <div className="panel-body">
                {topSellingItems
                  ? topSellingItems.map((item, index) => (
                      <div className="top-item-row" key={index}>
                        <span
                          className={`rank-badge ${
                            index === 0 ? "rank-orange" : "rank-gray"
                          }`}
                        >
                          {index + 1}
                        </span>

                        <td>
                          <img
                            src={getImageUrl(item.images)}
                            alt={item.foodName || item.productName || "Food"}
                            style={{
                              width: "60px",
                              height: "60px",
                              objectFit: "cover",
                              borderRadius: "8px",
                            }}
                          />
                        </td>

                        <div className="top-item-info">
                          <p className="top-item-name">{item.foodName}</p>

                          <p className="top-item-meta">{item.images}</p>
                        </div>

                        <div className="top-item-price">₹{item.price || 0}</div>
                      </div>
                    ))
                  : " "}
              </div>
            </Card>
          </Col>

          <Col lg={6}>
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

                    <h3>₹{totalRevenue.toLocaleString("en-IN")}</h3>
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
                    <h3>₹{commission.toLocaleString("en-IN")}</h3>
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
                  onClick={() => navigate("/OwnerProducts")}
                >
                  View Products
                  <FaArrowRight className="ms-2" />
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* ================= PRODUCTS ================= */}

        <div className="section-title">
          <div>
            <h4>Recently Added Products</h4>
            <p>Your latest menu items</p>
          </div>
        </div>

        <Card className="table-card mb-4">
          <Card.Body className="p-0">
            <Table responsive hover className="mb-0">
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
                {products
                  ? products.map((product, index) => (
                      <tr key={product.id}>
                        <td>{index + 1}</td>
                        <td>
                          <img
                            src={getImageUrl(product.images)}
                            alt={
                              product.foodName || product.productName || "Food"
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
                          <strong>{product.foodName}</strong>
                        </td>

                        <td>{product.category}</td>

                        <td>
                          <Badge
                            bg={
                              product.foodType === "Veg" ? "success" : "danger"
                            }
                          >
                            {product.foodType}
                          </Badge>
                        </td>

                        <td>₹{product.price}</td>

                        <td>
                          <Badge bg={product.active ? "success" : "secondary"}>
                            {product.active ? "Active" : "Inactive"}
                          </Badge>
                        </td>

                        <td>
                          <Button size="sm" variant="outline-primary">
                            <FaEdit />
                          </Button>
                        </td>
                      </tr>
                    ))
                  : " No products available"}
              </tbody>
            </Table>
          </Card.Body>
        </Card>

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
          {fallbackReviews.map((review, index) => (
            <Col lg={4} md={6} key={index}>
              <Card className="review-card">
                <Card.Body>
                  <div className="review-top">
                    <div
                      className="review-avatar"
                      style={{
                        backgroundColor: review.color,
                      }}
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

        {/* ================= MANAGE ORDERS ================= */}

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

        <Card className="table-card mb-4">
          <Card.Body className="p-0">
            <Table responsive hover className="mb-0">
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
                  orders.slice(0, 5).map((order) => (
                    <tr key={order._id || order.id}>
                      <td>
                        <strong>#{order._id || order.id}</strong>
                      </td>
                      <td>
                        <strong>
                          {order.items[0]?.restaurentId?.restaurentName}
                        </strong>
                      </td>
                      <td>
                        {order.userId?.firstName || "Unknown"}{" "}
                        {order.userId?.lastName || ""}
                      </td>

                      <td>
                        {order.items?.map((item, index) => (
                          <div key={index}>
                            {item.foodName || item.name || "Food"} ×{" "}
                            {item.quantity}
                          </div>
                        ))}
                      </td>

                      <td>₹{order.totalAmount || 0}</td>

                      <td>
                        <Badge bg={getStatusVariant(order.orderStatus)}>
                          {order.orderStatus || "Unknown"}
                        </Badge>
                      </td>

                      <td>
                        <Button size="sm" variant="outline-warning">
                          <FaEye className="me-1" />
                          View
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
                      {loading
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
