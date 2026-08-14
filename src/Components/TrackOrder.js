import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  FaCheck,
  FaMotorcycle,
  FaPhone,
  FaComments,
  FaCopy,
  FaTrash,
} from "react-icons/fa";

import "./Order.css";

function TrackOrder() {
  const { orderId } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrder();
  }, []);
  const handleCancelOrder = async (orderId) => {
    try {
      const response = await axios.put(
        `http://localhost:8090/api/orders/${orderId}`,
        {
          orderStatus: "Cancelled",
        },
      );

      console.log("Order cancelled:", response.data);
      alert("cancel");
    } catch (error) {
      console.log("Cancel order error:", error);
      alert("cancel error");
    }
  };

  const getOrder = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8090/api/orders/${orderId}`,
      );
      setOrder(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <h4>Loading Order...</h4>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center mt-5">
        <h4>Order not found</h4>
      </div>
    );
  }

  const restaurant = order.items?.[0]?.restaurentId;

  const itemTotal =
    order.itemTotal ||
    order.items?.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const deliveryFee = order.deliveryFee || 0;
  const packagingFee = order.packagingFee || 0;
  const discount = order.discount || 0;

  const total =
    order.totalAmount || itemTotal + deliveryFee + packagingFee - discount;

  const currentStatus = order.status || "Confirmed";

  const statuses = [
    "Confirmed",
    "Preparing",
    "Picked Up",
    "On the Way",
    "Delivered",
  ];

  const currentIndex = statuses.indexOf(currentStatus);

  return (
    <div className="order-page">
      <Container className="track-container">
        {/* Header */}

        <div className="track-header">
          <div>
            <h1>Track Order</h1>

            <p>
              Order ID: #{order.id || order._id}
              <FaCopy className="copy-icon" />
            </p>
          </div>

          <div>
            Need help?
            <span className="support"> Contact Support</span>
          </div>
        </div>

        <Row>
          {/* Timeline */}

          <Col md={4}>
            <Card className="status-card">
              <h5>Order Status</h5>

              <div className="timeline">
                {statuses.map((status, index) => (
                  <div
                    key={index}
                    className={`timeline-item ${
                      index < currentIndex
                        ? "completed"
                        : index === currentIndex
                          ? "current"
                          : ""
                    }`}
                  >
                    <div className="circle">
                      {index <= currentIndex ? (
                        index === currentIndex && status === "On the Way" ? (
                          <FaMotorcycle />
                        ) : (
                          <FaCheck />
                        )
                      ) : (
                        ""
                      )}
                    </div>

                    <div>
                      <b>{status}</b>

                      <small>{order.updatedAt?.slice(0, 10)}</small>

                      <p>
                        {status === "Confirmed" &&
                          "Your order has been confirmed"}

                        {status === "Preparing" &&
                          "Restaurant is preparing your order"}

                        {status === "Picked Up" &&
                          "Delivery partner picked up your order"}

                        {status === "On the Way" && "Your order is on the way"}

                        {status === "Delivered" &&
                          "Order delivered successfully"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </Col>

          {/* Map */}

          <Col md={8}>
            <div className="map-box">
              <div className="restaurant-marker">
                🍔
                <div>
                  <b>{restaurant?.restaurentName}</b>

                  <small>{currentStatus}</small>
                </div>
              </div>

              <div className="route-line"></div>

              <div className="rider-marker">🛵</div>

              <div className="home-marker">🏠</div>

              <div className="location-box">
                <b>Your Location</b>
                <br />

                <span>
                  {order.addressId?.addressLine1},{order.addressId?.city},
                  {order.addressId?.state},{order.addressId?.pincode}
                </span>
              </div>

              <div className="map-controls">
                +
                <hr />
                −
                <hr />◉
              </div>
            </div>
          </Col>
        </Row>

        <Row className="bottom-cards">
          {/* Delivery Partner */}

          <Col md={5}>
            <Card className="partner-card">
              <h5>Delivery Partner</h5>

              <div className="partner-info">
                <div className="partner-image">👨🏻</div>

                <div>
                  <h5>
                    {order.deliveryPartner?.name || "Delivery Partner"}

                    <span className="rating">
                      ★ {order.deliveryPartner?.rating || "4.8"}
                    </span>
                  </h5>

                  <p>
                    {order.deliveryPartner?.deliveries || "500+"} Deliveries
                  </p>
                </div>
              </div>

              <hr />

              <div className="vehicle">
                <span>
                  Vehicle
                  <br />
                  <b>{order.deliveryPartner?.vehicleType || "Bike"}</b>
                </span>

                <span className="vehicle-number">
                  🛵 {order.deliveryPartner?.vehicleNumber || "BR01 XX 1234"}
                </span>
              </div>

              <div className="partner-buttons">
                <Button>
                  <FaPhone /> Call Rider
                </Button>

                <Button>
                  <FaComments /> Chat
                </Button>
              </div>
            </Card>
          </Col>

          {/* Order Summary */}

          <Col md={7}>
            <Card className="summary-card">
              <h5>Order Summary</h5>

              {order.items?.map((item, index) => (
                <div key={index}>
                  <div className="summary-product">
                    <img
                      src={
                        item.productId?.images?.[0]
                          ? `http://localhost:8090/uploads/${item.productId.images[0]}`
                          : "https://via.placeholder.com/80"
                      }
                      alt={item.productId?.productName}
                    />

                    <div>
                      <b>{item.productId?.productName}</b>

                      <small>Qty: {item.quantity}</small>
                    </div>

                    <strong>₹{item.price * item.quantity}</strong>
                  </div>

                  <hr />
                </div>
              ))}

              <div className="price-row">
                <span>Item Total</span>
                <span>₹{itemTotal}</span>
              </div>

              <div className="price-row">
                <span>Delivery Fee</span>
                <span>₹{deliveryFee}</span>
              </div>

              <div className="price-row">
                <span>Packaging Fee</span>
                <span>₹{packagingFee}</span>
              </div>

              <div className="price-row discount">
                <span>Coupon Discount</span>
                <span>- ₹{discount}</span>
              </div>

              <hr />

              <div className="final-price">
                <b>Total Amount</b>

                <strong>₹{total}</strong>
              </div>
            </Card>
          </Col>
        </Row>

        {/* Customer Details */}

        <Row className="mt-4">
          <Col>
            <Card className="summary-card">
              <h5>Customer Details</h5>

              <p>
                <b>Name:</b> {order.userId?.firstName}
                {order.userId?.lastName}
              </p>

              <p>
                <b>Email:</b> {order.userId?.email}
              </p>

              <p>
                <b>Mobile:</b> {order.userId?.mobileNumber}
              </p>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Bottom Bar */}

      <div className="tracking-bottom">
        {currentStatus !== "Delivered" && (
          <Button
            variant="danger"
            className="cancel-btn"
            onClick={() => handleCancelOrder(order.id)}
            href="/"
          >
            <FaTrash /> Cancel Order
          </Button>
        )}

        <div className="live-delivery">
          <span>
            Estimated Delivery
            <b>{order.estimatedTime || "15 mins"}</b>
          </span>

          <strong>🟢 LIVE</strong>
        </div>
      </div>
    </div>
  );
}

export default TrackOrder;
