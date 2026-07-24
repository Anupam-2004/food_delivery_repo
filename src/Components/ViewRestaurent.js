import React from "react";
import {
  Container,
  Row,
  Col,
  Carousel,
  Nav,
  Navbar,
  Card,
  Button,
  Table,
  Form,
} from "react-bootstrap";

import {
  FaGlobe,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaRegHeart,
} from "react-icons/fa";
import Sidebar from "./Sidebar";
import "./ViewRestaurent.css";
import { MdTipsAndUpdates } from "react-icons/md";
import { MdQuestionAnswer } from "react-icons/md";
import { SiTicktick } from "react-icons/si";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useParams } from "react-router";
import { useEffect } from "react";
import axios from "axios";

const images = [
  {
    image: "/REStaurent/unique-experiance.jpg",
  },
  {
    image: "/REStaurent/cream-of-mushroom-soup.jpg",
  },
  {
    image: "/REStaurent/image.jpg",
  },
  {
    image: "/REStaurent/inner-view copy.jpg",
  },
  {
    image: "/REStaurent/inside-restaurant-view.jpg",
  },
  {
    image: "/REStaurent/interior-dim-lit-but.jpg",
  },
  {
    image: "/REStaurent/menu-card-costly (1).jpg",
  },
  {
    image: "/REStaurent/menu-card-costly.jpg",
  },
  {
    image: "/REStaurent/the-freshness-of-food.jpg",
  },
  {
    image: "/REStaurent/view-from-table-nice.jpg",
  },
  {
    image: "/REStaurent/where-friends-can-have.jpg",
  },
  {
    image: "/REStaurent/you-will-love-it.jpg",
  },
];

const ViewRestaurent = () => {
  const [rating, setRating] = useState(3.5);
  const [restaurent, setRestaurent] = useState();

  const { restaurentId } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:8090/api/restaurents/${restaurentId}`)
      .then((response) => {
        console.log("data comes from backend :", response.data);
        setRestaurent(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <Container>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Col xs="auto" md={3}>
            <Form.Control
              type="text"
              placeholder="Tripadvisor"
              className=" mr-sm-2"
            />
          </Col>
          <Col xs="auto" md={4}>
            <Form.Control
              type="text"
              placeholder="search"
              className=" mr-sm-3"
            />
          </Col>
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="ms-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="">Plan with AI</Nav.Link>
              <Nav.Link href="">Discover</Nav.Link>
              <Nav.Link href="">Review</Nav.Link>
              <Nav.Link href="">Link</Nav.Link>
              <Nav.Link href="">INR</Nav.Link>
              <Col md={2}>
                <Button className="custom-btn" type="submit">
                  Submit
                </Button>
              </Col>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Row>
        <Col>
          <Navbar expand="lg" className="bg-body-light" data-bs-theme="light">
            <Container>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link>
                    <b>Jamshedpur</b>
                  </Nav.Link>
                  <Nav.Link>
                    <b>Thing To Do</b>
                  </Nav.Link>
                  <Nav.Link>
                    <b>Hotels</b>
                  </Nav.Link>
                  <Nav.Link>
                    <b>Restaurents</b>
                  </Nav.Link>
                  <Nav.Link>
                    <b>Forums</b>
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <hr />
        </Col>
      </Row>
      <Row>
        <Col>
          <Sidebar />
        </Col>
      </Row>

      {restaurent ? (
        <>
          <Row>
            <Col>
              <div className="restro_name">
                <h1>{restaurent.restaurentName}</h1>
                <p>
                  <SiTicktick />
                  Claimed
                </p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="restro_info">
                <span>3.5</span>
                <Rating
                  style={{ maxWidth: 150 }}
                  value={rating}
                  onChange={setRating}
                />

                <p>
                  <a href="">(2 review)</a>
                </p>
                <p>
                  <a href="">#86 of 217 Restaurents in Jamshedpur</a>
                </p>
                <p>
                  <a href="">Indian,</a>
                </p>
                <p>
                  <a href="">
                    <MdOutlineCurrencyRupee />
                    <MdOutlineCurrencyRupee />
                    <MdOutlineCurrencyRupee />
                    <MdOutlineCurrencyRupee />
                  </a>
                </p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <Carousel>
                {restaurent.images.map((image, index) => (
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={`http://localhost:8090/upload/${image}`}
                      alt=""
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            </Col>
          </Row>
          <Row>
            <Col>
              <Navbar expand="lg" className="bg-body-tertiary">
                {/* <Container> */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                    <Nav.Link>
                      <b>Overview</b>
                    </Nav.Link>
                    <Nav.Link>
                      <b>Hours</b>
                    </Nav.Link>
                    <Nav.Link>
                      <b>Location</b>
                    </Nav.Link>
                    <Nav.Link>
                      <b>Review</b>
                    </Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
            </Col>
          </Row>
          <Row className="location_review">
            <Col md={8}>
              <div className="hours">
                <span>Open until 10:30 PM</span>
                <a href="/">See all hours</a>
              </div>

              <div className="address">
                <FaMapMarkerAlt />
                <a href="">
                  {restaurent.addressLine1}
                  {restaurent.addressLine2}
                  {restaurent.location}
                  {restaurent.state}

                  {restaurent.country}
                </a>
              </div>

              <div className="links">
                <a href="/">
                  <FaGlobe />
                  website: {restaurent.website}
                </a>

                <a href="">
                  <FaPhoneAlt /> +91 84068 00083
                </a>
                <a href="">
                  <FaEnvelope /> Email
                </a>
                <a href="/">Improve this listing</a>
              </div>
            </Col>
            <Col md={4}>
              <Card className="save text-center">
                <Card.Body>
                  <Card.Title>
                    <h2>Save this Restaurent</h2>
                  </Card.Title>

                  <Button>
                    <FaRegHeart />
                    Save
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col className="about" md={8}>
              <h2>About</h2>
              <p>{restaurent.description}</p>
              <div className="feature">
                <h4>Feature</h4>
                <p>Lunch, Dinner</p>
                <p>Indian</p>
              </div>
            </Col>
            <Col md={4}>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th colSpan={6}>
                      <div className="hour">
                        <h3>Hours</h3>
                      </div>
                      <div className="time">
                        {" "}
                        <a href="">Open untill 9:30 PM</a>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Sunday</th>
                    <td colSpan={4}>6:00 AM - 10:30 PM</td>
                  </tr>
                  <tr>
                    <th>Monday</th>
                    <td colSpan={4}>
                      12:00 PM - 3:30 PM
                      <tr> 6:00 PM - 10:15 PM</tr>
                    </td>
                  </tr>
                  <tr>
                    <th>Tuesday</th>
                    <td colSpan={4}>9:00 AM - 10:30 PM</td>
                  </tr>
                  <tr>
                    <th>Wednesday</th>
                    <td colSpan={4}>12:00 PM - 10:30 PM</td>
                  </tr>
                  <tr>
                    <th>Thrusday</th>
                    <td colSpan={4}>12:00 PM - 10:30 PM</td>
                  </tr>
                  <tr>
                    <th>Friday</th>
                    <td colSpan={4}>12:00 PM - 10:30 PM</td>
                  </tr>
                  <tr>
                    <th>Saturday</th>
                    <td colSpan={4}>12:00 PM - 10:30 PM</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
          {/* <Row>
        <Col>
          <h2>Location</h2>
          <img src="blob:https://www.tripadvisor.in/943af27b-9917-446d-bebf-0179ad8d8cdc" />
        </Col>
      </Row> */}
          <Row className="feedback">
            <Col md={8}>
              <div className="tips">
                <h4>
                  <MdTipsAndUpdates />
                  Tips
                </h4>
                <p>
                  No tips for this property yet. To add a tip, write a review.
                </p>
                <a href="">Write a review</a>
              </div>
            </Col>
            <Col md={4}>
              <div className="question">
                <h4>
                  <MdQuestionAnswer />
                  Q&A
                </h4>
                <p>No questions for this property yet.</p>
                <a href="">Ask a question</a>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d29429.486829249196!2d86.1437952!3d22.777036799999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1782059183021!5m2!1sen!2sin"
                width="100%"
                height="350"
                style={{ border: 2 }}
                title="Restaurant Location"
              />
            </Col>

            <Col md={6} className="d-flex align-items-center">
              <a
                href="https://maps.google.com"
                className="text-decoration-none"
              >
                Golmuri Main Road Near R.D. Tata Technical Institute, Jamshedpur
                831009, India
              </a>
            </Col>
          </Row>
        </>
      ) : (
        "Restaurent Not Found"
      )}
    </Container>
  );
};

export default ViewRestaurent;
