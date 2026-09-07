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
  FaDrumstickBite,
} from "react-icons/fa";

import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineWatchLater } from "react-icons/md";
import { GiChickenLeg } from "react-icons/gi";

import { useParams } from "react-router-dom";
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

  const [foodType, setFoodType] = useState("All");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:8090/api/restaurents/${restaurentId}`)
      .then((response) => {
        setRestaurent(response.data);

        console.log("Restaurant Data:", response.data);
      })
      .catch((error) => {
        console.log("Restaurant Fetch Error:", error);
      })
      .finally(() => {
        setLoading(false);
      });

    axios
      .get(`http://localhost:8090/api/products/restaurant/${restaurentId}`)
      .then((response) => {
        setFoods(response.data);

        console.log("Foods:", response.data);
      })
      .catch((error) => {
        console.log("Food Fetch Error:", error);
      });
  }, [restaurentId]);

  const filteredFoods = foods.filter((food) => {
    if (foodType === "All") {
      return true;
    }

    return food.foodType === foodType;
  });

  const AddToCart = async (food) => {
    try {
      
      if (!currentUser) {
        alert("Please login first!");
        return;
      }

      const userId = currentUser.id || currentUser._id;

      
      const foodRestaurentId = food.restaurentId?._id || food.restaurentId;

      if (!foodRestaurentId) {
        alert("Restaurant ID not found!");
        console.log("Food Data:", food);
        return;
      }

      const data = {
        userId: userId,
        active: true,

        items: [
          {
            productId: food._id || food.id,
            quantity: 1,
            price: food.price,
            restaurentId: foodRestaurentId,
          },
        ],
      };

      console.log("Cart Data:", data);

      const response = await axios.post(
        "http://localhost:8090/api/carts",
        data,
      );

      console.log("Cart Response:", response.data);

      alert("Item added to cart successfully!");
    } catch (error) {
      console.log("Add To Cart Error:", error);

      console.log("Backend Error:", error.response?.data);

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
                restaurent.images?.[0]
                  ? `http://localhost:8090/upload/${restaurent.images[0]}`
                  : "/placeholder.jpg"
              }
              alt={restaurent?.restaurentName}
              className="restaurant_banner_img"
            />

            <div className="restaurant_overlay">
              <Row className="align-items-center w-100 px-5">
                <Col lg={8}>
                  <div className="d-flex align-items-center">
                    <img
                      src={
                        restaurent.images?.[0]
                          ? `http://localhost:8090/upload/${restaurent.images[0]}`
                          : "/placeholder.jpg"
                      }
                      alt="Restaurant Logo"
                      className="restaurant_logo"
                    />

                    <div className="ms-4">
                      <h2 className="text-white">
                        {restaurent.restaurentName}

                        <Button
                          variant="success"
                          size="sm"
                          className="ms-3 rounded-pill"
                        >
                          {restaurent.foodType || "Restaurant"}
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
                        {restaurent.address || restaurent.location}
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

      <Row>
        <Col>
          <div className="category-section">
            <Button
              className={`category-btn ${
                foodType === "All" ? "active-category" : ""
              }`}
              onClick={() => setFoodType("All")}
            >
              All
            </Button>

            <Button
              className={`category-btn ${
                foodType === "Veg" ? "active-category" : ""
              }`}
              onClick={() => setFoodType("Veg")}
            >
              <FaLeaf /> Veg
            </Button>

            <Button
              className={`category-btn ${
                foodType === "Non-Veg" ? "active-category" : ""
              }`}
              onClick={() => setFoodType("Non-Veg")}
            >
              <FaDrumstickBite /> Non-Veg
            </Button>
          </div>
        </Col>
      </Row>

      <Row className="mt-5">
        {filteredFoods.length > 0 ? (
          filteredFoods.map((food) => (
            <Col
              lg={3}
              md={6}
              sm={12}
              className="mb-4"
              key={food._id || food.id}
            >
              <Card className="food-card">
                <div className="food-image-box">
                  <Card.Img
                    src={
                      food.images?.[0]
                        ? `http://localhost:8090/upload/${food.images[0]}`
                        : "/placeholder-food.jpg"
                    }
                    alt={food.foodName}
                  />

                  <div className="heart-icon">
                    <FaHeart />
                  </div>

                  <div className="rating-badge">
                    <FaStar /> {food.rating || 4.8}
                  </div>
                </div>

                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                    <Card.Title>{food.foodName}</Card.Title>

                    <h5>₹{food.price}</h5>
                  </div>

                  {/* FOOD TYPE */}

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

                  {/* CATEGORY */}

                  <small>{food.category}</small>

                  {/* DESCRIPTION */}

                  <p className="mt-2">{food.description}</p>

                  {/* DELIVERY + CART */}

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
