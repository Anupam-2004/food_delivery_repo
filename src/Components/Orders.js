import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import {
  FaCheck,
  FaClock,
  FaCopy,
  FaBox,
  FaMotorcycle,
  FaHome,
  FaMapMarkerAlt,
  FaTruck,
  FaStar,
  FaUndo
} from "react-icons/fa";
import "./Order.css";
import { useNavigate } from "react-router-dom";

function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div className="order-page">


      <Container className="success-container">

        {/* Success Icon */}
        <div className="success-icon">
          <FaCheck />
        </div>

        <h1>Order Placed Successfully!</h1>

        <p className="success-text">
          Thank you for your order. We have received your order
          <br />
          and it will be delivered soon.
        </p>

        {/* Delivery Time */}
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
                  #FD123456789 <FaCopy />
                </h3>
              </div>
            </Col>
          </Row>
        </Card>

        {/* Order Details */}
        <Card className="order-details">

          <h5>Order Details</h5>

          <div className="restaurant-row">

            <img
              src="https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=200"
              alt="Burger"
            />

            <div>
              <h5>Burger King</h5>
              <p>Order placed on 27 May, 2025 at 11:30 AM</p>
            </div>

            <div className="total">
              <small>Total Amount</small>
              <strong>₹567.00</strong>
            </div>

            <span>⌄</span>

          </div>
        </Card>

        {/* What's Next */}
        <div className="next-section">

          <h5>What's Next?</h5>

          <div className="steps">

            <div className="step active">
              <div className="step-icon">
                <FaBox />
              </div>

              <b>Order Confirmed</b>
              <p>We have received<br />your order</p>
            </div>

            <div className="step">
              <div className="step-icon">
                <FaBox />
              </div>

              <b>Being Prepared</b>
              <p>The restaurant is<br />preparing your food</p>
            </div>

            <div className="step">
              <div className="step-icon">
                <FaMotorcycle />
              </div>

              <b>Out for Delivery</b>
              <p>Our delivery partner<br />is on the way</p>
            </div>

            <div className="step">
              <div className="step-icon">
                <FaHome />
              </div>

              <b>Delivered</b>
              <p>Enjoy your food.</p>
            </div>

          </div>
        </div>

        {/* Buttons */}
        <div className="success-buttons">

          <Button className="track-btn" onClick={() => navigate("/track-order")}>
            <FaMapMarkerAlt /> Track Order
          </Button>

          <Button className="shopping-btn" onClick={() => navigate("/")}>
            Continue Shopping
          </Button>

        </div>

      </Container>

      {/* Bottom Features */}
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

export default OrderSuccess;