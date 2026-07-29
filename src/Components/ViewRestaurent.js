import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import {
  FaRegStar,
  FaRegHeart,
  FaHeart,
  FaStar,
  FaClock,
  FaShoppingCart,
  FaLeaf,
  FaCarAlt,
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineWatchLater } from "react-icons/md";
import { GiChickenLeg } from "react-icons/gi";
import { Link, useParams } from "react-router";
import { useSelector } from "react-redux";
import axios from "axios";

import "./ViewRestaurent.css";
import "@smastrom/react-rating/style.css";

const ViewRestaurent = () => {
  const { restaurentId } = useParams();
  const { user: currentUser } = useSelector((state) => state.auth);

  const [restaurent, setRestaurent] = useState({
    images: [],
  });

  const [foods, setFoods] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:8090/api/restaurents/${restaurentId}`)
      .then((response) => {
        setRestaurent({
          ...response.data,
          images: response.data.images || [],
        });
      })
      .catch((error) => {
        console.log(error);
      })
    .finally(() => {
      setLoading(false);
    });

    axios
      .get(`http://localhost:8090/api/products/restaurant/${restaurentId}`)
      .then((response) => {
        setFoods(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [restaurentId]);

  const AddToCart = async (food) => {
    try {
      const data = {
        userId: currentUser._id || currentUser.id,
        items: [
          {
            productId: food.id,
            quantity: 1,
            price: food.price,
          },
        ],
        active: true,
      };
      console.log("Food:", food);
      console.log("Request Data:", data);

      const response = await axios.post(
        "http://localhost:8090/api/carts",
        data,
      );

      console.log(response.data);

      alert("Item added to cart successfully!");

      setCart(response.data.items);
    } catch (error) {
      console.log(error.response?.data);
      alert(error.response?.data?.message || "Failed to add item.");
    }
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <h4>Loading Restaurant...</h4>
      </Container>
    );
  }

  return (
    <Container fluid>
      <Row>
        <Col>
          <div className="restaurant_banner">
            <img
              src={
                // restaurent?.images?.length?
                   `http://localhost:8090/upload/${restaurent.images[0]}`
              //     : "/REStaurent/an-unique-experiance.jpg"
              }
              alt={restaurent?.restaurantName}
              className="restaurant_banner_img"
            />

            <div className="restaurant_overlay">
              <Row className="align-items-center w-100 px-5">
                <Col>
                  <div className="d-flex align-items-center">
                    <img
                      src={
                        // restaurent.images.length > 0 ?
                           `http://localhost:8090/upload/${restaurent.images[0]}`
                          // : "/an-unique-experiance.jpg"
                      }
                      alt="Logo"
                      className="restaurant_logo"
                    />

                    <div className="ms-4">
                      <h2 className="text-white">
                        {restaurent.restaurantName}

                        <Button
                          variant="success"
                          size="sm"
                          className="ms-3 rounded-pill"
                        >
                          {restaurent.foodType}
                        </Button>
                      </h2>

                      <p className="text-white mb-2">
                        <FaRegStar className="text-warning me-1" />
                        {restaurent.rating || 4.8}
                        &nbsp; | &nbsp; (Reviews {restaurent.totalReviews || 0})
                        &nbsp; | &nbsp;
                        {restaurent.deliveryTime || "25-30 mins"}
                      </p>

                      <p className="text-white mb-0">
                        <FaLocationDot className="me-1" />
                        {restaurent.address}
                        &nbsp; | &nbsp;
                        <MdOutlineWatchLater className="me-1" />
                        {restaurent.openTime || "Open"}
                        &nbsp; | &nbsp;
                        <FaCarAlt className="me-1" />
                        {restaurent.deliveryCharge
                          ? `Delivery ₹${restaurent.deliveryCharge}`
                          : "Free Delivery"}
                      </p>
                    </div>
                  </div>
                </Col>

                <Col lg={4} className="text-end">
                  <Button variant="danger" className="me-2">
                    Order Now
                  </Button>

                  <Button variant="outline-light">
                    <FaRegHeart className="me-2" />
                    Save
                  </Button>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>

      <Row className="mt-5">
        {foods.length > 0 ? (
          foods.map((food) => (
            <Col
              lg={3}
              md={6}
              sm={12}
              className="mb-4"
              key={food.id || food._id}
            >
              <Card className="food-card">
                <div className="food-image-box">
                  <Card.Img
                    src={
                      // food.images && food.images.length ?
                         `http://localhost:8090/upload/${food.images[0]}`
                        // : "/REStaurent/an-unique-experiance.jpg"
                    }
                  />

                  <div className="heart-icon">
                    <FaHeart />
                  </div>

                  <div className="rating-badge">
                    <FaStar /> {food.rating || 4.8}
                  </div>
                </div>

                <Card.Body>
                  <div className="d-flex justify-content-between">
                    <Card.Title>{food.foodName}</Card.Title>

                    <h5>₹{food.price}</h5>
                  </div>

                  <div className="mb-2">
                    {food.foodType === "Veg" ? (
                      <span className="veg-badge">
                        <FaLeaf /> Veg
                      </span>
                    ) : (
                      <span className="nonveg-badge">
                        <GiChickenLeg /> Non-Veg
                      </span>
                    )}
                  </div>

                  <small>{food.category}</small>

                  <p className="mt-2">{food.description}</p>

                  <div className="d-flex justify-content-between align-items-center">
                    <span>
                      <FaClock /> {food.deliveryTime || "25-30 mins"}
                    </span>

                    <Button
                      className="cart-btn"
                      onClick={() => AddToCart(food)}
                    >
                      <FaShoppingCart /> Add
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <h4 className="text-center mt-5">No Food Available</h4>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default ViewRestaurent;
