import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import {
  FaCheck,
  FaMotorcycle,
  FaHome,
  FaPhone,
  FaComments,
  FaCopy,
  FaMapMarkerAlt,
  FaClock,
  FaTrash
} from "react-icons/fa";

import "./Order.css";

function TrackOrder() {
  return (
    <div className="order-page">
      <Container className="track-container">

        {/* Header */}
        <div className="track-header">

          <div>
            <h1>Track Order</h1>

            <p>
              Order ID: #FD123456789
              <FaCopy className="copy-icon" />
            </p>
          </div>

          <div>
            Need help?
            <span className="support"> Contact Support</span>
          </div>

        </div>

        <Row>

          {/* Order Status */}
          <Col md={4}>

            <Card className="status-card">

              <h5>Order Status</h5>

              <div className="timeline">

                <div className="timeline-item completed">

                  <div className="circle">
                    <FaCheck />
                  </div>

                  <div>
                    <b>Order Confirmed</b>
                    <small>27 May, 11:30 AM</small>
                    <p>Your order has been confirmed</p>
                  </div>

                </div>

                <div className="timeline-item completed">

                  <div className="circle">
                    <FaCheck />
                  </div>

                  <div>
                    <b>Restaurant Preparing</b>
                    <small>27 May, 11:35 AM</small>
                    <p>The restaurant is preparing your order</p>
                  </div>

                </div>

                <div className="timeline-item completed">

                  <div className="circle">
                    <FaCheck />
                  </div>

                  <div>
                    <b>Rider Picked Up</b>
                    <small>27 May, 11:50 AM</small>
                    <p>Your order has been picked up by the delivery partner</p>
                  </div>

                </div>

                <div className="timeline-item current">

                  <div className="circle">
                    <FaMotorcycle />
                  </div>

                  <div>
                    <b>On the Way</b>
                    <small>27 May, 11:55 AM</small>
                    <p>Your order is on the way</p>
                  </div>

                </div>

                <div className="timeline-item">

                  <div className="circle empty"></div>

                  <div>
                    <b>Delivered</b>
                    <small>Estimated: 12:15 PM</small>
                    <p>Your order will be delivered soon</p>
                  </div>

                </div>

              </div>

            </Card>

          </Col>

          {/* Map */}
          <Col md={8}>

            <div className="map-box">

              <div className="restaurant-marker">
                🍔
                <div>
                  <b>Burger King</b>
                  <small>Preparing your order</small>
                </div>
              </div>

              <div className="route-line"></div>

              <div className="rider-marker">
                🛵
              </div>

              <div className="home-marker">
                🏠
              </div>

              <div className="location-box">
                <b>Your Location</b>
                <br />
                <span>123, Green Street, Lucknow</span>
              </div>

              <div className="map-controls">
                +
                <hr />
                −
                <hr />
                ◉
              </div>

            </div>

          </Col>

        </Row>

        {/* Bottom cards */}

        <Row className="bottom-cards">

          {/* Delivery Partner */}
          <Col md={5}>

            <Card className="partner-card">

              <h5>Delivery Partner</h5>

              <div className="partner-info">

                <div className="partner-image">
                  👨🏻
                </div>

                <div>
                  <h5>
                    Rahul Kumar
                    <span className="rating">★ 4.8</span>
                  </h5>

                  <p>500+ Deliveries</p>
                </div>

              </div>

              <hr />

              <div className="vehicle">

                <span>
                  Vehicle
                  <br />
                  <b>Bike</b>
                </span>

                <span className="vehicle-number">
                  🛵 &nbsp; BR01 XX 1234
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

              <div className="summary-product">

                <img
                  src="https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=200"
                  alt="Burger"
                />

                <div>
                  <b>Burger King</b>
                  <small>2 Items</small>
                </div>

                <strong>₹567.00</strong>

              </div>

              <hr />

              <div className="price-row">
                <span>Item Total</span>
                <span>₹478.00</span>
              </div>

              <div className="price-row">
                <span>Delivery Fee</span>
                <span>₹29.00</span>
              </div>

              <div className="price-row">
                <span>Packaging Fee</span>
                <span>₹20.00</span>
              </div>

              <div className="price-row discount">
                <span>Coupon Discount</span>
                <span>- ₹60.00</span>
              </div>

              <hr />

              <div className="final-price">
                <b>Total Amount</b>
                <strong>₹567.00</strong>
              </div>

            </Card>

          </Col>

        </Row>

      </Container>

      {/* Bottom bar */}
      <div className="tracking-bottom">

        <Button className="cancel-btn">
          <FaTrash /> Cancel Order
        </Button>

        <div className="live-delivery">

          <span>
            Estimated Delivery
            <b>12 mins</b>
          </span>

          <strong>🟢 LIVE</strong>

        </div>

      </div>

    </div>
  );
}

export default TrackOrder;