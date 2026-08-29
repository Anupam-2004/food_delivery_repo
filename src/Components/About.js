
import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
} from "react-bootstrap";
import "./About.css";

import {
  FaUtensils,
  FaMotorcycle,
  FaClock,
  FaHeart,
  FaShieldAlt,
  FaStar,
  FaMapMarkerAlt,
} from "react-icons/fa";

import "./About.css";

const About = () => {
  return (
    <div className="about-page">

      {/* ================= HERO SECTION ================= */}
      <section className="about-hero">
        <Container>
          <Row className="align-items-center">

            <Col md={6} className="hero-content">
              <span className="about-badge">
                🍴 Welcome to Foodie
              </span>

              <h1>
                Delicious Food,
                <br />
                <span>Delivered To You</span>
              </h1>

              <p>
                We connect you with your favorite restaurants and delicious
                meals. Order your favorite food from nearby restaurants and
                enjoy fast, fresh and reliable delivery right at your doorstep.
              </p>

              <Button className="explore-btn">
                <FaUtensils className="me-2" />
                Explore Food
              </Button>
            </Col>

            <Col md={6} className="hero-image">
              <div className="food-circle">
                <div className="food-emoji">🍕</div>
                <div className="food-emoji food-2">🍔</div>
                <div className="food-emoji food-3">🍜</div>
                <div className="food-emoji food-4">🍟</div>
              </div>
            </Col>

          </Row>
        </Container>
      </section>


      {/* ================= ABOUT US ================= */}
      <section className="about-introduction">
        <Container>

          <Row className="align-items-center">

            <Col md={6}>
              <div className="about-image-box">
                <div className="main-food-image">
                  🍱
                </div>

                <div className="experience-card">
                  <FaStar />
                  <strong>4.8/5</strong>
                  <small>Customer Rating</small>
                </div>
              </div>
            </Col>

            <Col md={6}>
              <span className="section-label">
                ABOUT OUR COMPANY
              </span>

              <h2>
                Making Food Delivery
                <span> Simple & Delicious</span>
              </h2>

              <p>
                Our food delivery platform is designed to make ordering food
                simple, convenient and enjoyable. Whether you are craving
                Indian cuisine, Chinese food, pizza, burgers or desserts,
                we help you discover great food from restaurants around you.
              </p>

              <p>
                From browsing restaurants to placing your order and tracking
                your delivery, everything is designed to provide a smooth
                experience for our customers.
              </p>

              <div className="about-points">

                <div>
                  <FaHeart />
                  <span>Quality Food</span>
                </div>

                <div>
                  <FaMotorcycle />
                  <span>Fast Delivery</span>
                </div>

                <div>
                  <FaShieldAlt />
                  <span>Secure Ordering</span>
                </div>

              </div>

            </Col>

          </Row>

        </Container>
      </section>


      {/* ================= FEATURES ================= */}
      <section className="features-section">

        <Container>

          <div className="text-center section-heading">

            <span className="section-label">
              WHY CHOOSE US
            </span>

            <h2>
              Everything You Need,
              <span> In One Place</span>
            </h2>

            <p>
              We make your food ordering experience faster, easier and better.
            </p>

          </div>

          <Row className="g-4">

            <Col lg={4} md={6}>
              <Card className="feature-card">

                <div className="feature-icon">
                  <FaUtensils />
                </div>

                <Card.Body>
                  <Card.Title>
                    Wide Variety of Food
                  </Card.Title>

                  <Card.Text>
                    Discover delicious food from different cuisines and
                    restaurants available near you.
                  </Card.Text>
                </Card.Body>

              </Card>
            </Col>


            <Col lg={4} md={6}>
              <Card className="feature-card">

                <div className="feature-icon">
                  <FaMotorcycle />
                </div>

                <Card.Body>
                  <Card.Title>
                    Fast Delivery
                  </Card.Title>

                  <Card.Text>
                    Get your favorite meals delivered quickly and safely
                    to your doorstep.
                  </Card.Text>
                </Card.Body>

              </Card>
            </Col>


            <Col lg={4} md={6}>
              <Card className="feature-card">

                <div className="feature-icon">
                  <FaClock />
                </div>

                <Card.Body>
                  <Card.Title>
                    Easy Ordering
                  </Card.Title>

                  <Card.Text>
                    Browse menus, add your favorite dishes to cart and place
                    your order in just a few clicks.
                  </Card.Text>
                </Card.Body>

              </Card>
            </Col>

          </Row>

        </Container>

      </section>


      {/* ================= STATS ================= */}
      <section className="stats-section">

        <Container>

          <Row className="text-center">

            <Col md={3} sm={6}>
              <div className="stat-box">
                <h2>500+</h2>
                <p>Restaurants</p>
              </div>
            </Col>

            <Col md={3} sm={6}>
              <div className="stat-box">
                <h2>10K+</h2>
                <p>Happy Customers</p>
              </div>
            </Col>

            <Col md={3} sm={6}>
              <div className="stat-box">
                <h2>50K+</h2>
                <p>Orders Delivered</p>
              </div>
            </Col>

            <Col md={3} sm={6}>
              <div className="stat-box">
                <h2>4.8</h2>
                <p>Average Rating</p>
              </div>
            </Col>

          </Row>

        </Container>

      </section>


      {/* ================= HOW IT WORKS ================= */}
      <section className="how-section">

        <Container>

          <div className="text-center section-heading">

            <span className="section-label">
              HOW IT WORKS
            </span>

            <h2>
              Order Food in
              <span> 3 Simple Steps</span>
            </h2>

          </div>

          <Row className="g-4">

            <Col md={4}>
              <div className="step-card">

                <div className="step-number">
                  01
                </div>

                <FaMapMarkerAlt className="step-icon" />

                <h4>Choose Restaurant</h4>

                <p>
                  Select your favorite restaurant and explore its menu.
                </p>

              </div>
            </Col>


            <Col md={4}>
              <div className="step-card">

                <div className="step-number">
                  02
                </div>

                <FaUtensils className="step-icon" />

                <h4>Select Your Food</h4>

                <p>
                  Add your favorite dishes to your cart and customize your
                  order.
                </p>

              </div>
            </Col>


            <Col md={4}>
              <div className="step-card">

                <div className="step-number">
                  03
                </div>

                <FaMotorcycle className="step-icon" />

                <h4>Get Your Order</h4>

                <p>
                  Place your order and track it until it reaches your doorstep.
                </p>

              </div>
            </Col>

          </Row>

        </Container>

      </section>


      {/* ================= CTA ================= */}
      <section className="about-cta">

        <Container>

          <Row className="justify-content-center text-center">

            <Col md={8}>

              <h2>
                Hungry? Let's Get You Some Food!
              </h2>

              <p>
                Discover amazing restaurants and order your favorite meals
                today.
              </p>

              <Button className="cta-btn">
                Order Now
              </Button>

            </Col>

          </Row>

        </Container>

      </section>

    </div>
  );
};

export default About;
