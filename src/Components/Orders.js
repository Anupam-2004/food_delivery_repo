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
    const getOrders = async () => {
      const userId = currentUser?._id || currentUser?.id;

      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:8090/api/orders/user/${userId}`
        );

        console.log("ALL USER ORDERS:", response.data);

        const allOrders = Array.isArray(response.data)
          ? response.data
          : [response.data];

        /*
          Only active/current orders will be shown here.

          Delivered and Cancelled orders are moved
          to OrdersHistory page.
        */

        const activeOrders = allOrders.filter((order) => {
          const status = order.orderStatus?.toLowerCase();

          return (
            status !== "delivered" &&
            status !== "cancelled" &&
            status !== "canceled"
          );
        });

        console.log("ACTIVE ORDERS:", activeOrders);

        setOrders(activeOrders);
      } catch (error) {
        console.log("Order Error:", error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    getOrders();
  }, [currentUser]);

  /* ---------------- LOADING ---------------- */

  if (loading) {
    return (
      <div className="order-page">
        <Container className="text-center py-5">
          <h4>Loading Orders...</h4>
        </Container>
      </div>
    );
  }

  /* ---------------- LOGIN ---------------- */

  if (!currentUser) {
    return (
      <div className="order-page">
        <Container className="text-center py-5">
          <h4>Please login to view your orders</h4>

          <Button
            className="track-btn mt-3"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </Container>
      </div>
    );
  }

  /* ---------------- NO ACTIVE ORDER ---------------- */

  if (orders.length === 0) {
    return (
      <div className="order-page">
        <Container className="text-center py-5">
          <div className="success-icon">
            <FaBox />
          </div>

          <h2>No Active Orders</h2>

          <p>
            You don't have any orders currently being processed.
          </p>

          <Button
            className="shopping-btn"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </Button>

          <br />

          <Button
            variant="link"
            className="mt-3"
            onClick={() => navigate("/orders-history")}
          >
            View Order History
          </Button>
        </Container>
      </div>
    );
  }

  /*
    Sort orders by newest first
  */

  const sortedOrders = [...orders].sort(
    (a, b) =>
      new Date(b.createdAt || b.updatedAt) -
      new Date(a.createdAt || a.updatedAt)
  );

  /*
    Only the latest active order is shown.
  */

  const latestOrder = sortedOrders[0];

  const orderDate = new Date(
    latestOrder.createdAt
  ).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const status = latestOrder.orderStatus?.toLowerCase();

  return (
    <div className="order-page">
      <Container className="success-container">

        {/* SUCCESS ICON */}

        <div className="success-icon">
          <FaCheck />
        </div>

        <h1>Order Placed Successfully!</h1>

        <p className="success-text">
          Thank you for your order. We have received your order
          <br />
          and it will be delivered soon.
        </p>

        {/* DELIVERY + ORDER ID */}

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
                  <FaCopy /> {latestOrder.id || latestOrder._id}
                </h3>
              </div>
            </Col>
          </Row>
        </Card>

        {/* CURRENT ORDER ONLY */}

        <Card className="order-details">

          <h5>Current Order</h5>

          <div className="restaurant-row">

            <div>
              <h5>
                Order #
                {latestOrder.id || latestOrder._id}
              </h5>

              <p>
                Order placed on {orderDate}
              </p>
            </div>

            <div className="total">
              <small>Total Amount</small>

              <strong>
                ₹
                {(
                  latestOrder.totalAmount ||
                  latestOrder.price ||
                  0
                ).toFixed(2)}
              </strong>
            </div>

          </div>

          {/* ORDER ITEMS */}

          <div className="order-items">

            {latestOrder.items?.map((item) => {

              const product = item.productId;
              const restaurant = item.restaurentId;

              return (
                <div
                  className="order-item"
                  key={item._id}
                >

                  <img
                    src={
                      product?.images?.length
                        ? `http://localhost:8090/upload/${product.images[0]}`
                        : "/food-placeholder.png"
                    }
                    alt={product?.foodName || "Food"}
                    className="order-img"
                  />

                  <div className="item-info">

                    <h6>
                      {product?.foodName || "Food Item"}
                    </h6>

                    <p>
                      Restaurant:{" "}
                      {restaurant?.restaurentName ||
                        "Restaurant"}
                    </p>

                    <small>
                      Quantity: {item.quantity}
                    </small>

                  </div>

                  <div className="item-price">

                    <span>
                      ₹{Number(item.price || 0).toFixed(2)}
                    </span>

                    <small>
                      × {item.quantity}
                    </small>

                    <strong>
                      ₹
                      {(
                        Number(item.price || 0) *
                        Number(item.quantity || 0)
                      ).toFixed(2)}
                    </strong>

                  </div>

                </div>
              );
            })}

          </div>

          {/* PAYMENT / STATUS */}

          <div className="payment-info">

            <div>
              <small>Payment Status</small>

              <strong className={latestOrder.paymentStatus}>
                {latestOrder.paymentStatus || "Pending"}
              </strong>
            </div>

            <div>
              <small>Order Status</small>

              <strong>
                {latestOrder.orderStatus || "Pending"}
              </strong>
            </div>

          </div>

        </Card>

        {/* ORDER PROGRESS */}

        <div className="next-section">

          <h5>What's Next?</h5>

          <div className="steps">

            {/* CONFIRMED */}

            <div
              className={`step ${
                [
                  "pending",
                  "accepted",
                  "processing",
                  "shipped",
                  "out for delivery",
                ].includes(status)
                  ? "active"
                  : ""
              }`}
            >

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

            {/* PREPARING */}

            <div
              className={`step ${
                [
                  "processing",
                  "preparing",
                  "shipped",
                  "out for delivery",
                ].includes(status)
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

            {/* OUT FOR DELIVERY */}

            <div
              className={`step ${
                [
                  "shipped",
                  "out for delivery",
                ].includes(status)
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

            {/* DELIVERED */}

            <div
              className={`step ${
                status === "delivered"
                  ? "active"
                  : ""
              }`}
            >

              <div className="step-icon">
                <FaHome />
              </div>

              <b>Delivered</b>

              <p>
                Enjoy your food.
              </p>

            </div>

          </div>
        </div>

        {/* BUTTONS */}

        <div className="success-buttons">

          <Button
            className="track-btn"
            onClick={() =>
              navigate(
                `/track-order/${
                  latestOrder.id || latestOrder._id
                }`
              )
            }
          >
            <FaMapMarkerAlt /> Track Order
          </Button>

          <Button
            className="shopping-btn"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </Button>

        </div>

      </Container>

      {/* FEATURES */}

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
            <b>Best Offers</b>
            & Discounts
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