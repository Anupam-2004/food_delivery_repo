import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import {
  FaSearch,
  FaPizzaSlice,
  FaHamburger,
  FaIceCream,
  FaCoffee,
  FaDrumstickBite,
  FaLeaf,
  FaFish,
  FaBreadSlice,
  FaUtensils,
  FaArrowRight,
} from "react-icons/fa";

import "./Categories.css";
import axios from "axios";
import { useParams } from "react-router";

function Categories() {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8090/api/products/category/${category}`)
      .then((response) => {
        setCategory(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [category]);

  // const categories = [
  //   {
  //     name: "Pizza",
  //     icon: <FaPizzaSlice />,
  //     count: "120+ Items"
  //   },
  //   {
  //     name: "Burger",
  //     icon: <FaHamburger />,
  //     count: "85+ Items"
  //   },
  //   {
  //     name: "Chicken",
  //     icon: <FaDrumstickBite />,
  //     count: "95+ Items"
  //   },
  //   {
  //     name: "Biryani",
  //     icon: <FaUtensils />,
  //     count: "70+ Items"
  //   },
  //   {
  //     name: "Desserts",
  //     icon: <FaIceCream />,
  //     count: "65+ Items"
  //   },
  //   {
  //     name: "Beverages",
  //     icon: <FaCoffee />,
  //     count: "90+ Items"
  //   },
  //   {
  //     name: "Veg Food",
  //     icon: <FaLeaf />,
  //     count: "110+ Items"
  //   },
  //   {
  //     name: "Sea Food",
  //     icon: <FaFish />,
  //     count: "50+ Items"
  //   },
  //   {
  //     name: "Breads",
  //     icon: <FaBreadSlice />,
  //     count: "45+ Items"
  //   }
  // ];

  return (
    <div className="category-page">
      <Container>
        <div className="category-hero">
          <div className="hero-content">
            <p className="small-title">EXPLORE FOOD</p>

            <h1>
              What are you
              <br />
              <span>craving today?</span>
            </h1>

            <p>
              Explore delicious food from your favorite restaurants and discover
              something new.
            </p>

            <div className="hero-search">
              <FaSearch />

              <input type="text" placeholder="Search food category..." />

              <Button>Search</Button>
            </div>
          </div>

          <div className="hero-food">🍕</div>
        </div>

      

        <div className="section-heading">
          <div>
            <h2>Popular Categories</h2>

            <p>Explore our most popular food categories</p>
          </div>

          <Button className="view-btn">
            View All
            <FaArrowRight />
          </Button>
        </div>

        <Row>
          {category.slice(0, 6).map((item, index) => (
            <Col lg={2} md={4} sm={6} xs={6} key={index}>
              <Card className="category-card">
                <div className="category-icon">{item.icon}</div>

                <h5>{item.name}</h5>

                <p>{item.count}</p>
              </Card>
            </Col>
          ))}
        </Row>

        

        <div className="all-category-heading">
          <h2>All Categories</h2>

          <p>Find exactly what you are looking for</p>
        </div>

        <div className="filter-buttons">
          <Button className="selected-filter">All</Button>

          <Button>Veg</Button>

          <Button>Non-Veg</Button>

          <Button>Fast Food</Button>

          <Button>Desserts</Button>

          <Button>Beverages</Button>
        </div>

        <Row className="all-category-list">
          {category.map((item, index) => (
            <Col lg={4} md={6} sm={12} key={index}>
              <Card className="category-list-card">
                <div className="list-icon">{item.icon}</div>

                <div className="list-content">
                  <h5>{item.name}</h5>

                  <p>
                    Delicious {item.name.toLowerCase()}
                    dishes from nearby restaurants
                  </p>

                  <span>{item.count}</span>
                </div>

                <div className="list-arrow">
                  <FaArrowRight />
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

    

      <footer>
        <div className="footer-logo">🍴 Foodie</div>

        <p>Delicious food delivered to your doorstep.</p>

        <div className="footer-links">
          <span>Home</span>
          <span>Restaurants</span>
          <span>Categories</span>
          <span>About</span>
          <span>Contact</span>
        </div>

        <hr />

        <small>© 2026 Foodie. All rights reserved.</small>
      </footer>
    </div>
  );
}

export default Categories;
