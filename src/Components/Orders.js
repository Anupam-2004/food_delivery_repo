import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

import {
  FaCheck,
  FaClock,
  FaCopy,
  FaBox,
  FaMotorcycle,
  FaHome,
  FaMapMarkerAlt,
} from "react-icons/fa";

import "./Order.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

function Orders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user: currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!currentUser?.id) {
      setLoading(false);
      return;
    }
    axios
      .get(`http://localhost:8090/api/orders/user/${currentUser.id}`)
      .then((response) => {
        console.log("ORDER DATA:", response.data);
        setOrders(
          Array.isArray(response.data) ? response.data : [response.data],
        );
      })
      .catch((error) => {
        console.log("Order Error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentUser]);

  if (loading) {
    return (
      <div className="order-page">
        <Container className="text-center py-5">
          <h4>Loading Orders...</h4>
        </Container>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="order-page">
        <Container className="text-center py-5">
          <h4>Please login to view your orders</h4>

          <Button className="track-btn mt-3" onClick={() => navigate("/login")}>
            Login
          </Button>
        </Container>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="order-page">
        <Container className="text-center py-5">
          <div className="success-icon">
            <FaBox />
          </div>

          <h2>No Orders Found</h2>

          <p>You haven't placed any orders yet.</p>

          <Button className="shopping-btn" onClick={() => navigate("/")}>
            Continue Shopping
          </Button>
        </Container>
      </div>
    );
  }

  const latestOrder = orders[0];

  return (
    <div className="order-page">
      <Container className="success-container">
        <div className="success-icon">
          <FaCheck />
        </div>

        <h1>Order Placed Successfully!</h1>

        <p className="success-text">
          Thank you for your order. We have received your order
          <br />
          and it will be delivered soon.
        </p>

        <Card className="delivery-card">
          <Row>
            <Col md={6} className="delivery-time">
              <FaClock />

              <div>
                <small>Estimated Delivery Time</small>

                <h3>25 - 30 mins</h3>
              </div>
            </Col>

            <Col md={6} className="order-id">
              <div>
                <small>Order ID</small>

                <h3>
                  <FaCopy /> {latestOrder.id}
                </h3>
              </div>
            </Col>
          </Row>
        </Card>

        {orders.map((order) => {
          const orderDate = new Date(order.createdAt).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          });

          return (
            <Card key={order.id} className="order-details">
              <h5>Order Details</h5>

              <div className="restaurant-row">
                <div>
                  <h5>Order #{order.id}</h5>

                  <p>Order placed on {orderDate}</p>
                </div>

                <div className="total">
                  <small>Total Amount</small>

                  <strong>₹{order.totalAmount?.toFixed(2)}</strong>
                </div>
              </div>

              <div className="order-items">
                {order.items?.map((item) => {
                  const product = item.productId;

                  const restaurant = item.restaurentId;

                  return (
                    <div className="order-item" key={item._id}>
                      <img
                        src={`http://localhost:8090/upload/${product.images[0]}`}
                        alt={product?.foodName}
                        className="order-img"
                      />

                      <div className="item-info">
                        <h6>Food Name -{product?.foodName || "Food Item"}</h6>

                        <p>
                          Restaurant Name -
                          {restaurant?.restaurentName || "Restaurant"}
                        </p>

                        <small>Quantity: {item.quantity}</small>
                      </div>

                      <div className="item-price">
                        <span>₹{item.price?.toFixed(2)}</span>

                        <small>× {item.quantity}</small>

                        <strong>
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </strong>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="payment-info">
                <div>
                  <small>Payment Status</small>

                  <strong className={order.paymentStatus}>
                    {order.paymentStatus}
                  </strong>
                </div>

                <div>
                  <small>Order Status</small>

                  <strong>{order.orderStatus}</strong>
                </div>
              </div>
            </Card>
          );
        })}

        <div className="next-section">
          <h5>What's Next?</h5>

          <div className="steps">
          

            <div className={`step ${latestOrder.orderStatus ? "active" : ""}`}>
              <div className="step-icon">
                <FaBox />
              </div>

              <b>Order Confirmed</b>

              <p>
                We have received
                <br />
                your order
              </p>
            </div>

            <div
              className={`step ${
                ["processing", "shipped", "delivered"].includes(
                  latestOrder.orderStatus,
                )
                  ? "active"
                  : ""
              }`}
            >
              <div className="step-icon">
                <FaBox />
              </div>

              <b>Being Prepared</b>

              <p>
                The restaurant is
                <br />
                preparing your food
              </p>
            </div>

            <div
              className={`step ${
                ["shipped", "delivered"].includes(latestOrder.orderStatus)
                  ? "active"
                  : ""
              }`}
            >
              <div className="step-icon">
                <FaMotorcycle />
              </div>

              <b>Out for Delivery</b>

              <p>
                Our delivery partner
                <br />
                is on the way
              </p>
            </div>

            <div
              className={`step ${
                latestOrder.orderStatus === "delivered" ? "active" : ""
              }`}
            >
              <div className="step-icon">
                <FaHome />
              </div>

              <b>Delivered</b>

              <p>Enjoy your food.</p>
            </div>
          </div>
        </div>

        <div className="success-buttons">
          <Button
            className="track-btn"
            onClick={() => navigate(`/track-order/${latestOrder.id}`)}
          >
            <FaMapMarkerAlt /> Track Order
          </Button>

          <Button className="shopping-btn" onClick={() => navigate("/")}>
            Continue Shopping
          </Button>
        </div>
      </Container>

      <div className="bottom-features">
        <div>
          🔒
          <span>
            <b>100% Secure</b>
            Payments
          </span>
        </div>

        <div>
          🚚
          <span>
            <b>On Time</b>
            Delivery
          </span>
        </div>

        <div>
          ⭐
          <span>
            <b>Best Offers</b>& Discounts
          </span>
        </div>

        <div>
          ↩️
          <span>
            <b>Easy Returns</b>
            Policy
          </span>
        </div>
      </div>
    </div>
  );
}

export default Orders;
