
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
  FaUser,
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

  // Get restaurants from backend
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

  // Add / Remove favorite
  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((item) => item !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  // Search restaurants
  const filteredRestaurents = restaurents.filter((restaurent) => {
    const name = restaurent.restaurentName || "";
    const foodType = restaurent.foodType || "";
    const location = restaurent.location || "";

    const text = `${name} ${foodType} ${location}`.toLowerCase();

    return text.includes(search.toLowerCase());
  });

  // Loading
  if (loading) {
    return (
      <div className="restaurant-loading">
        <Spinner animation="border" />
        <p>Loading Restaurants...</p>
      </div>
    );
  }

  return (
    <div className="restaurant-page">
      {/* Header */}
      <div className="restaurant-header">
        {/* Location */}
        <div className="location-box">
          <FaMapMarkerAlt className="location-icon" />

          <div>
            <small>Deliver to</small>
            <h6>Jamshedpur</h6>
          </div>
        </div>

        {/* Search */}
        <div className="restaurant-search">
          <FaSearch className="search-icon" />

          <Form.Control
            type="text"
            placeholder="Search restaurants, cuisines or dishes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Header Buttons */}
        <div className="header-actions">
          <div className="favorite-header">
            <FaHeart />
            Favorites
          </div>

          {/* <Button variant="outline-dark" className="filter-button">
            Filters
          </Button> */}
        </div>
      </div>

      <Container fluid className="restaurant-container">
        {/* Categories */}
        <div className="category-section">
          <Button className="category-btn active-category">All</Button>

          <Button className="category-btn">
            <FaLeaf /> Veg
          </Button>

          <Button className="category-btn">
            <FaDrumstickBite /> Non-Veg
          </Button>

          <Button className="category-btn">🍛 Indian</Button>

          <Button className="category-btn">🍜 Chinese</Button>

          <Button className="category-btn">🍕 Pizza</Button>

          <Button className="category-btn">🍔 Burger</Button>

          <Button className="category-btn">🍗 Biryani</Button>
        </div>

        {/* Sort */}
  
        {/* Restaurant Cards */}
        <Row className="restaurant-row">
          {filteredRestaurents.length > 0 ? (
            filteredRestaurents.map((restaurent) => {
              const id = restaurent._id || restaurent.id;
              const image = restaurent.images?.[0];
              const favorite = favorites.includes(id);

              return (
                <Col md={3} key={id} className="mb-4">
                  <Card className="restaurant-card">
                    {/* Image */}
                    <div className="restaurant-image-container">
                      {image ? (
                        <img
                          src={`http://localhost:8090/upload/${image}`}
                          alt={restaurent.restaurentName}
                          className="restaurant-image"
                        />
                      ) : (
                        <div className="no-image">No Image Available</div>
                      )}

                      {/* Favorite */}
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

                      {/* Offer */}
                      <div className="offer-badge">
                        <FaFire />
                        {restaurent.offer || "20% OFF up to ₹100"}
                      </div>
                    </div>

                    {/* Body */}
                    <Card.Body className="restaurant-body">
                      {/* Name + Rating */}
                      <div className="restaurant-title-section">
                        <Card.Title className="restaurant-name">
                          {restaurent.restaurentName}
                        </Card.Title>

                        <div className="rating-box">
                          <FaStar />
                          {restaurent.rating || "4.2"}
                        </div>
                      </div>

                      {/* Location */}
                      <div className="restaurant-location">
                        <FaMapMarkerAlt />

                        <span>
                          {restaurent.addressLine1 || "Location not available"}

                          {restaurent.location && `, ${restaurent.location}`}
                        </span>
                      </div>

                      {/* Food Type */}
                      <p className="restaurant-cuisine">
                        {restaurent.foodType || "Veg"}
                      </p>

                      {/* Details */}
                      <div className="restaurant-details">
                        <div className="detail-item">
                          <FaClock />
                          {restaurent.deliveryTime || "25-30 min"}
                        </div>

                        <div className="detail-item">
                          <FaMotorcycle />

                          {restaurent.deliveryCharge === 0
                            ? "Free Delivery"
                            : restaurent.deliveryCharge
                              ? `₹${restaurent.deliveryCharge}`
                              : "Free Delivery"}
                        </div>

                        {/* <div className="detail-item">
                          <FaUser />
                          {restaurent.priceForTwo || "₹200 for two"}
                        </div>*/}
                      </div> 

                      {/* View Menu */}
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
                <h4>No Restaurants Found</h4>

                <p>Try searching for another restaurant.</p>
              </div>
            </Col>
          )}
        </Row>

        {/* Features */}
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
      </Container>
    </div>
  );
};

export default Restaurents;
