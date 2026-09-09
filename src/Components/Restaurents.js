import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Spinner,
} from "react-bootstrap";

import { Link } from "react-router-dom";
import axios from "axios";

import {
  FaSearch,
  FaHeart,
  FaRegHeart,
  FaMapMarkerAlt,
  FaClock,
  FaMotorcycle,
  FaStar,
  FaLeaf,
  FaDrumstickBite,
  FaFire,
} from "react-icons/fa";

import "./Restaurents.css";

const Restaurents = () => {
  const [restaurents, setRestaurents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [foodType, setFoodType] = useState("All");
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    getRestaurants();
  }, []);

  const getRestaurants = async () => {
    try {
      const response = await axios.get("http://localhost:8090/api/restaurents");

      setRestaurents(response.data || []);
    } catch (error) {
      console.log(error);
      setError("Failed to load restaurants");
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (id) => {
    setFavorites((previousFavorites) => {
      if (previousFavorites.includes(id)) {
        return previousFavorites.filter((favoriteId) => favoriteId !== id);
      }

      return [...previousFavorites, id];
    });
  };

  const filteredRestaurents = restaurents.filter((restaurent) => {
    const name = restaurent.restaurentName || "";
    const restaurantFoodType = restaurent.foodType || "";
    const location = restaurent.location || "";

    const text = `${name} ${restaurantFoodType} ${location}`.toLowerCase();

    const matchesSearch = text.includes(search.toLowerCase());

    const matchesFoodType =
      restaurent.foodType === foodType || foodType === "All";

    const id = restaurent._id || restaurent.id;

    const matchesFavorite = !showFavorites || favorites.includes(id);

    return matchesSearch && matchesFoodType && matchesFavorite;
  });

  if (loading) {
    return (
      <div className="restaurant-loading">
        {" "}
        <Spinner animation="border" /> <p>Loading Restaurants...</p>{" "}
      </div>
    );
  }

  return (
    <div className="restaurant-page">
      {" "}
      <div className="restaurant-header">
        {" "}
        <div className="location-box">
          {" "}
          <FaMapMarkerAlt className="location-icon" />
          <div>
            <small>Deliver to</small>
            <h6>Jamshedpur</h6>
          </div>
        </div>
        <div className="restaurant-search">
          <FaSearch className="search-icon" />

          <Form.Control
            type="text"
            placeholder="Search restaurants, cuisines or dishes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="header-actions">
          <div
            className={`favorite-header ${
              showFavorites ? "active-favorite-header" : ""
            }`}
            onClick={() => setShowFavorites(!showFavorites)}
            style={{ cursor: "pointer" }}
          >
            {showFavorites ? <FaHeart /> : <FaRegHeart />}

            <span>Favorites ({favorites.length})</span>
          </div>
        </div>
      </div>
      <Container fluid className="restaurant-container">
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

        {showFavorites && (
          <div className="favorites-title">
            <h3>
              <FaHeart /> My Favorite Restaurants
            </h3>
          </div>
        )}

        {error && (
          <div className="no-restaurants">
            <h4>{error}</h4>
          </div>
        )}

        <Row className="restaurant-row">
          {filteredRestaurents.length > 0 ? (
            filteredRestaurents.map((restaurent) => {
              const id = restaurent._id || restaurent.id;
              const image = restaurent.images?.[0];
              const favorite = favorites.includes(id);

              return (
                <Col md={3} key={id} className="mb-4">
                  <Card className="restaurant-card">
                    <div className="restaurant-image-container">
                      {image ? (
                        <img
                          src={`http://localhost:8090/upload/${image}`}
                          alt={restaurent.restaurentName}
                          className="restaurant-image"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <div className="no-image">No Image Available</div>
                      )}

                      <button
                        className="favorite-btn"
                        onClick={() => toggleFavorite(id)}
                      >
                        {favorite ? (
                          <FaHeart className="favorite-active" />
                        ) : (
                          <FaRegHeart />
                        )}
                      </button>

                      <div className="offer-badge">
                        <FaFire />
                        {restaurent.offer || "20% OFF up to ₹100"}
                      </div>
                    </div>

                    <Card.Body
                      className="restaurant-body"
                      style={{ padding: "10px" }}
                    >
                      <div className="restaurant-title-section">
                        <Card.Title className="restaurant-name">
                          {restaurent.restaurentName}
                        </Card.Title>

                        <div className="rating-box">
                          <FaStar />
                          {restaurent.rating || "4.2"}
                        </div>
                      </div>

                      <div className="restaurant-location">
                        <FaMapMarkerAlt />

                        <span>
                          {restaurent.addressLine1 || "Location not available"}

                          {restaurent.location && `, ${restaurent.location}`}
                        </span>
                      </div>

                      <div className="restaurant-details">
                        <span className="restaurant-cuisine">
                          {restaurent.foodType || "Veg"}
                        </span>

                        <span className="delivery-time">
                          <FaClock />
                          {restaurent.deliveryTime || "25-30 min"}
                        </span>
                      </div>

                      <div className="detail-item">
                        <FaMotorcycle />

                        {restaurent.deliveryCharge === 0
                          ? "Free Delivery"
                          : restaurent.deliveryCharge
                            ? `₹${restaurent.deliveryCharge}`
                            : "Free Delivery"}
                      </div>

                      <Button
                        as={Link}
                        to={`/ViewRestaurent/${id}`}
                        className="view-menu-btn"
                      >
                        View Menu
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })
          ) : (
            <Col>
              <div className="no-restaurants">
                {showFavorites ? (
                  <>
                    <FaRegHeart size={40} />
                    <h4>No Favorite Restaurants</h4>
                    <p>
                      Click the heart icon on a restaurant to add it to your
                      favorites.
                    </p>
                  </>
                ) : (
                  <>
                    <h4>No Restaurants Found</h4>
                    <p>Try searching for another restaurant.</p>
                  </>
                )}
              </div>
            </Col>
          )}
        </Row>

        {!showFavorites && (
          <div className="restaurant-features">
            <div>
              🚚
              <h6>Fast Delivery</h6>
              <p>Quick delivery at your doorstep</p>
            </div>

            <div>
              🏷️
              <h6>Best Offers</h6>
              <p>Enjoy exciting offers and discounts</p>
            </div>

            <div>
              ⭐<h6>Top Rated</h6>
              <p>Best restaurants recommended for you</p>
            </div>

            <div>
              🛡️
              <h6>Safe & Hygienic</h6>
              <p>100% safe food packaging</p>
            </div>

            <div>
              💳
              <h6>Easy Payments</h6>
              <p>Multiple payment options available</p>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Restaurents;
