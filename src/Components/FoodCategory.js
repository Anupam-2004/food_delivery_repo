import React from "react";
import { useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { RiArrowDropDownLine } from "react-icons/ri";
import Sidebar from "./Sidebar";
import { FaShoppingCart } from "react-icons/fa";

const breads = [
  {
    image: "/breads/butter_naan.jpg",
    name: "Butter Naan",
    rating: 4.5,
    time: "10-15 mins",
    price: "₹50",
  },
  {
    image: "/breads/garlic_naan.jpg",
    name: "Garlic Naan",
    rating: 4.6,
    time: "10-15 mins",
    price: "₹70",
  },
  {
    image: "/breads/naan.jpg",
    name: "Plain Naan",
    rating: 4.3,
    time: "10-15 mins",
    price: "₹40",
  },
  {
    image: "/breads/tanddori_1.jpg",
    name: "Tandoori Roti",
    rating: 4.4,
    time: "8-12 mins",
    price: "₹25",
  },
  // {
  //   image: "/breads/butter_naan.jpg",
  //   name: "Butter Roti",
  //   rating: 4.5,
  //   time: "8-12 mins",
  //   price: "₹35",
  // },
  {
    image: "/breads/lachha_2.jpg",
    name: "Lachha Paratha",
    rating: 4.7,
    time: "12-18 mins",
    price: "₹60",
  },
  {
    image: "/breads/aalu paratha.jpg",
    name: "Aloo Paratha",
    rating: 4.8,
    time: "15-20 mins",
    price: "₹90",
  },
  {
    image: "/breads/garlic_naan_2.jpg",
    name: "Paneer Paratha",
    rating: 4.7,
    time: "15-20 mins",
    price: "₹120",
  },
  {
    image: "/breads/missi_1.jpg",
    name: "Missi Roti",
    rating: 4.4,
    time: "10-15 mins",
    price: "₹40",
  },
  {
    image: "/breads/kulcha_5.jpg",
    name: "Kulcha",
    rating: 4.6,
    time: "12-18 mins",
    price: "₹80",
  },
  {
    image: "/breads/kulcha_1.jpg",
    name: "Amritsari Kulcha",
    rating: 4.8,
    time: "15-20 mins",
    price: "₹140",
  },
  {
    image: "/breads/roomali_1.jpg",
    name: "Roomali Roti",
    rating: 4.5,
    time: "8-12 mins",
    price: "₹35",
  },
];
const vegs = [
  {
    image: "/paneer/panner_butter (1).jpg",
    name: "Paneer Butter Masala",
    rating: 4.8,
    time: "20-25 mins",
    price: "₹230",
  },
  {
    image: "/paneer/panner_butter (2).jpg",
    name: "Paneer Butter Masala",
    rating: 4.5,
    time: "20-25 mins",
    price: "₹210",
  },
  {
    image: "/paneer/palak+paneer (1).jpg",
    name: "Palak paneer",
    rating: 4.3,
    time: "20-25 mins",
    price: "₹250",
  },
  {
    image: "/paneer/sahi_1 (1).jpg",
    name: "Shahi Paneer",
    rating: 4.7,
    time: "20-25 mins",
    price: "₹240",
  },
  {
    image: "/paneer/matar_paneer.jpg",
    name: "Matar Paneer",
    rating: 4.7,
    time: "20-25 mins",
    price: "₹240",
  },
  {
    image: "/paneer/kahadi_paneer (2).jpg",
    name: "Shahi Paneer",
    rating: 4.7,
    time: "20-25 mins",
    price: "₹240",
  },
  {
    image: "/paneer/sahi_1 (3).jpg",

    name: "Kadai Paneer",
    rating: 4.7,
    time: "20-25 mins",
    price: "₹230",
  },
  {
    image: "/paneer/palak+paneer (2).jpg",
    name: "palak Paneer",
    rating: 4.7,
    time: "20-25 mins",
    price: "₹230",
  },

  {
    image: "/paneer/daal makhni.jpg",
    name: "Dal Makhani",
    rating: 4.5,
    time: "15-20 mins",
    price: "₹200",
  },
  {
    image: "/paneer/daal makhni_2.jpg",
    name: "Dal Makhani",
    rating: 4.8,
    time: "25-30 mins",
    price: "₹250",
  },
  {
    image: "/paneer/tadka (1).jpg",
    name: "Dal Tadka",
    rating: 4.5,
    time: "15-20 mins",
    price: "₹180",
  },
  {
    image: "/paneer/tadka (2).jpg",
    name: "Dal Tadka",
    rating: 4.5,
    time: "15-20 mins",
    price: "₹180",
  },
  {
    image: "/paneer/chhola.jpg",
    name: "Chole Masala",
    rating: 4.6,
    time: "15-20 mins",
    price: "₹190",
  },

  {
    image: "/paneer/malai_kofta.jpg",
    name: "Malai Kofta",
    rating: 4.8,
    time: "20-25 mins",
    price: "₹250",
  },
  {
    image: "/paneer/mix_veg.jpg",
    name: "Mix Veg",
    rating: 4.4,
    time: "15-20 mins",
    price: "₹180",
  },
  {
    image: "/paneer/aalo gobhi.jpg",
    name: "Aloo Gobi",
    rating: 4.4,
    time: "15-20 mins",
    price: "₹170",
  },
];
const nonVeges = [
  {
    image: "/non veg/butter chicken (1).jpg",
    name: "Butter Chicken",
    rating: 4.9,
    time: "25-30 mins",
    price: "₹320",
  },

  {
    image: "/non veg/butter chicken (3).jpg",
    name: "Butter Chicken",
    rating: 4.9,
    time: "25-30 mins",
    price: "₹320",
  },
  {
    image: "/non veg/kadhai cheaken (1).jpg",
    name: "Kadai Chicken",
    rating: 4.8,
    time: "25-30 mins",
    price: "₹340",
  },
  {
    image: "/non veg/kadhai cheaken (2).jpg",
    name: "Kadai Chicken",
    rating: 4.8,
    time: "25-30 mins",
    price: "₹340",
  },
  {
    image: "/non veg/checken curry (1).jpg",
    name: "Chicken Curry",
    rating: 4.2,
    time: "25-30 mins",
    price: "₹300",
  },
  {
    image: "/non veg/checken curry (2).jpg",
    name: "Chicken Curry",
    rating: 4.7,
    time: "25-30 mins",
    price: "₹300",
  },
  {
    image: "/non veg/chicken tikka.jpg",
    name: "Chicken Tikka Masala",
    rating: 4.6,
    time: "25-30 mins",
    price: "₹350",
  },
  {
    image: "/non veg/chkn tikka.jpg",
    name: "Chicken Tikka Masala",
    rating: 4.5,
    time: "25-30 mins",
    price: "₹350",
  },
  {
    image: "/non veg/mutton curry (1).jpg",
    name: "Mutton curry",
    rating: 4.9,
    time: "30-35 mins",
    price: "₹420",
  },
  {
    image: "/non veg/mutton.jpg",
    name: "Mutton",
    rating: 4.8,
    time: "30-35 mins",
    price: "₹400",
  },

  {
    image: "/non veg/fish_curry (1).jpg",
    name: "Fish Curry",
    rating: 4.7,
    time: "25-30 mins",
    price: "₹360",
  },
  {
    image: "/non veg/fish.jpg",
    name: "Fish",
    rating: 4.5,
    time: "25-30 mins",
    price: "₹300",
  },
];
const starters = [
  {
    image: "/starters/paneer tikka.jpg",
    name: "Paneer Tikka",
    rating: 4.8,
    time: "15-20 mins",
    price: "₹220",
  },
  {
    image: "/starters/hara bhra kabab.jpg",
    name: "Hara Bhara Kebab",
    rating: 4.6,
    time: "15-20 mins",
    price: "₹180",
  },
  {
    image: "/starters/veg seekh kabab.jpg",
    name: "Veg Seekh Kebab",
    rating: 4.7,
    time: "15-20 mins",
    price: "₹200",
  },
  {
    image: "/starters/fish_tika.jpg",
    name: "Fish Tikka",
    rating: 4.9,
    time: "20-25 mins",
    price: "₹280",
  },
  {
    image: "/starters/masroom tikka.jpg",
    name: "Mashroom tikka",
    rating: 4.9,
    time: "20-25 mins",
    price: "₹320",
  },

  {
    image: "/starters/chicken 65.jpg",
    name: "Chicken 65",
    rating: 4.7,
    time: "15-20 mins",
    price: "₹260",
  },
  {
    image: "/starters/paneer tikka.jpg",
    name: "Paneer tikka",
    rating: 4.8,
    time: "15-20 mins",
    price: "₹270",
  },
  {
    image: "/starters/chicken lolipop.jpg",
    name: "Chicken Lollipop",
    rating: 4.8,
    time: "15-20 mins",
    price: "₹290",
  },
  {
    image: "/starters/veg spring roll.jpg",
    name: "Veg spring roll",
    rating: 4.9,
    time: "20-25 mins",
    price: "₹280",
  },
  {
    image: "/starters/veg seekh kabab.jpg",
    name: "Veg seekh kabab",
    rating: 4.9,
    time: "20-25 mins",
    price: "₹320",
  },
  {
    image: "/starters/chicken tikka.jpg",
    name: "Chicken Tikka",
    rating: 4.9,
    time: "20-25 mins",
    price: "₹280",
  },
  {
    image: "/starters/cripsy corn.jpg",
    name: "Cripsy corn",
    rating: 4.9,
    time: "20-25 mins",
    price: "₹320",
  },
];
const riceAndBiryani = [
  {
    image: "/rice-biryani/jeera_rice.jpg",
    name: "Jeera Rice",
    rating: 4.5,
    time: "15-20 mins",
    price: "₹140",
  },
  {
    image: "/rice-biryani/veg_pulao.jpg",
    name: "Veg Pulao",
    rating: 4.6,
    time: "20-25 mins",
    price: "₹180",
  },
  {
    image: "/rice-biryani/peas_pulao.jpg",
    name: "Peas Pulao",
    rating: 4.5,
    time: "20-25 mins",
    price: "₹170",
  },
  {
    image: "/rice-biryani/veg_biryani.jpg",
    name: "Veg Biryani",
    rating: 4.7,
    time: "25-30 mins",
    price: "₹220",
  },
  {
    image: "/rice-biryani/hyderabadi_chicken_biryani.jpg",
    name: "Hyderabadi Chicken Biryani",
    rating: 4.9,
    time: "30-35 mins",
    price: "₹320",
  },
  {
    image: "/rice-biryani/mutton_biryani.jpg",
    name: "Mutton Biryani",
    rating: 4.9,
    time: "35-40 mins",
    price: "₹380",
  },
  {
    image: "/rice-biryani/kashmiri_pulao.jpg",
    name: "Kashmiri Pulao",
    rating: 4.6,
    time: "20-25 mins",
    price: "₹210",
  },
];
const biryaniCategorys = [
  {
    image: "/biryani/jeera rice.jpg",
    name: "Jeera Rice",
    rating: 4.5,
    time: "15-20 mins",
    price: "₹140",
  },
  {
    image: "/biryani/veg biryani_2.jpg",
    name: "Veg Biryani",
    rating: 4.6,
    time: "20-25 mins",
    price: "₹200",
  },
  {
    image: "/biryani/veg_biryani.jpg",
    name: "Peas Pulao",
    rating: 4.5,
    time: "20-25 mins",
    price: "₹170",
  },
  {
    image: "/biryani/paneer biryani.jpg",
    name: "Paneer Biryani",
    rating: 4.7,
    time: "25-30 mins",
    price: "₹250",
  },
  {
    image: "/biryani/hydrabadi biryani.jpg",
    name: "Hyderabadi Chicken Biryani",
    rating: 4.9,
    time: "30-35 mins",
    price: "₹320",
  },
  {
    image: "/biryani/mutton biryani_3.jpg",
    name: "Mutton Biryani",
    rating: 4.9,
    time: "35-40 mins",
    price: "₹380",
  },
  {
    image: "/biryani/egg biryani.jpg",
    name: "egg Biryani",
    rating: 4.9,
    time: "35-40 mins",
    price: "₹380",
  },
  {
    image: "/biryani/mix_veg biryani.jpg",
    name: "Kashmiri Pulao",
    rating: 4.6,
    time: "20-25 mins",
    price: "₹210",
  },
];
const sides = [
  {
    image: "/sides/salad.jpg",
    name: "Green Salad",
    rating: 4.4,
    time: "5 mins",
    price: "₹80",
  },
  {
    image: "/sides/raita.jpg",
    name: "Raita",
    rating: 4.5,
    time: "5 mins",
    price: "₹70",
  },
  {
    image: "/sides/boondi_raita.jpg",
    name: "Boondi Raita",
    rating: 4.6,
    time: "5 mins",
    price: "₹90",
  },
  {
    image: "/sides/mint.jpg",
    name: "Mint Chutney",
    rating: 4.3,
    time: "2 mins",
    price: "₹40",
  },
  {
    image: "/sides/papad.jpg",
    name: "Papad",
    rating: 4.4,
    time: "2 mins",
    price: "₹30",
  },
];
const desserts = [
  {
    image: "/sides/gulab jamun.jpg",
    name: "Gulab Jamun",
    rating: 4.8,
    time: "5 mins",
    price: "₹90",
  },
  {
    image: "sides/ras malai_2.jpg",
    name: "Rasmalai",
    rating: 4.9,
    time: "5 mins",
    price: "₹120",
  },
  {
    image: "/sides/gajar halwa.jpg",
    name: "Gajar Ka Halwa",
    rating: 4.8,
    time: "5 mins",
    price: "₹110",
  },
  {
    image: "/sides/kheer.jpg",
    name: "Kheer",
    rating: 4.7,
    time: "5 mins",
    price: "₹90",
  },
  {
    image: "/sides/kulfi.jpg",
    name: "Kulfi",
    rating: 4.8,
    time: "5 mins",
    price: "₹80",
  },
  {
    image: "/sides/jalebi.jpg",
    name: "Jalebi",
    rating: 4.9,
    time: "5 mins",
    price: "₹70",
  },
];

const beverages = [
  {
    image: "/sides/sweet_lassi.jpg",
    name: "Sweet Lassi",
    rating: 4.8,
    time: "5 mins",
    price: "₹90",
  },
  {
    image: "/sides/salted_lassi.jpg",
    name: "Salted Lassi",
    rating: 4.6,
    time: "5 mins",
    price: "₹80",
  },

  {
    image: "/sides/choclate coofeee.jpg",
    name: "coffee Tea",
    rating: 4.8,
    time: "5 mins",
    price: "₹40",
  },
  {
    image: "/sides/cold_coffe.jpg",
    name: "Cold Coffee",
    rating: 4.9,
    time: "5 mins",
    price: "₹120",
  },
];
const FoodCategory = () => {
  const [show,setShow]=useState(false);
  const handleClose=()=>setShow(true);
  const handleShow=()=>setShow(false);
  return (
    <Container>
      <Row>
        <Col>
          <h1>North Indian</h1>
          <p>Indulge with the best of North Indian cuisines.</p>
          <div className="d-flex flex-wrap gap-2 mb-2">
            <Button variant="light">
              Filter
              <RiArrowDropDownLine />
            </Button>
            <Button variant="light">
              Sort by
              <RiArrowDropDownLine />
            </Button>
            <Button variant="light">
              Veg/Non Veg
              <RiArrowDropDownLine />
            </Button>
            <Button variant="light">
              Ratings
              <RiArrowDropDownLine />
            </Button>
            <Button variant="light">
              Delivery Time
              <RiArrowDropDownLine />
            </Button>
            <Button variant="light">
              Cost for you
              <RiArrowDropDownLine />
            </Button>
          </div>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col className="food_category_heading">
          <h2>Restaurants to explore</h2>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          <hr />
          <h2>Breads</h2>
          <hr />
        </Col>
      </Row>
      <Row>
        {breads.map((bread, index) => {
          return (
            <Col md={3} key={index}>
              <Card className="food_info">
                <Card.Img
                  src={bread.image}
                  style={{
                    height: "220px",
                    objectFit: "cover",
                  }}
                />
                <Card.Body>
                  <Card.Text className="foods_text">
                    {bread.name}
                    {bread.price}
                  </Card.Text>
                  <div className="d-flex justify-content-between">
                    <span> {bread.rating}</span>
                    <span>{bread.time}</span>
                  </div>
                  <div className="food_buy_cart">
                    <span>
                      {" "}
                      <Button onClick={handleShow} className="buy_btn">Buy</Button>
                    </span>
                    <span>
                      {" "}
                      <Button onClick={handleShow} className="buy_btn">
                        <FaShoppingCart />
                      </Button>
                    </span>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
      <hr />
      <Row>
        <Col>
          <hr />
          <h2>Veg Main Course</h2>
          <hr />
        </Col>
      </Row>
      <Row>
        {vegs.map((veg, index) => {
          return (
            <Col md={3} key={index}>
              <Card className="food_info">
                <Card.Img
                  src={veg.image}
                  style={{
                    height: "220px",
                    objectFit: "cover",
                  }}
                />
                <Card.Body>
                  <Card.Text className="foods_text">
                    {veg.name}
                    {veg.price}
                  </Card.Text>
                  <div className="d-flex justify-content-between">
                    <span> {veg.rating}</span>
                    <span>{veg.time}</span>
                  </div>
                  <div className="food_buy_cart">
                    <span>
                      {" "}
                      <Button onClick={handleShow} className="buy_btn">Buy</Button>
                    </span>
                    <span>
                      {" "}
                      <Button onClick={handleShow} className="buy_btn">
                        <FaShoppingCart />
                      </Button>
                    </span>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
      <Row>
        <Col>
          <hr />
          <h2>Non-Veg Main Course</h2>
          <hr />
        </Col>
      </Row>
      <Row>
        {nonVeges.map((nonVeg, index) => {
          return (
            <Col md={3} key={index}>
              <Card className="food_info ">
                <Card.Img
                  src={nonVeg.image}
                  style={{
                    height: "220px",
                    objectFit: "cover",
                  }}
                />
                <Card.Body>
                  <Card.Text className="foods_text">
                    {nonVeg.name}
                    {nonVeg.price}
                  </Card.Text>
                  <div className="d-flex justify-content-between">
                    <span> {nonVeg.rating}</span>
                    <span>{nonVeg.time}</span>
                  </div>
                  <div className="food_buy_cart">
                    <span>
                      {" "}
                      <Button onClick={handleShow} className="buy_btn">Buy</Button>
                    </span>
                    <span>
                      {" "}
                      <Button onClick={handleShow} className="buy_btn">
                        <FaShoppingCart />
                      </Button>
                    </span>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
      <Row>
        <Col>
          <hr />
          <h2>Staters</h2>
          <hr />
        </Col>
      </Row>
      <Row>
        {starters.map((starter, index) => {
          return (
            <Col md={3} key={index}>
              <Card className="food_info ">
                <Card.Img
                  src={starter.image}
                  style={{
                    height: "220px",
                    objectFit: "cover",
                  }}
                />
                <Card.Body>
                  <Card.Text className="foods_text">
                    {starter.name}
                    {starter.price}
                  </Card.Text>
                  <div className="d-flex justify-content-between">
                    <span> {starter.rating}</span>
                    <span>{starter.time}</span>
                  </div>
                  <div className="food_buy_cart">
                    <span>
                      {" "}
                      <Button onClick={handleShow}className="buy_btn">Buy</Button>
                    </span>
                    <span>
                      {" "}
                      <Button onClick={handleShow} className="buy_btn">
                        <FaShoppingCart />
                      </Button>
                    </span>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
      <Row>
        <Col>
          <hr />
          <h2>Biryani</h2>
          <hr />
        </Col>
      </Row>
      <Row>
        {biryaniCategorys.map((biryaniCategory, index) => {
          return (
            <Col md={3} key={index}>
              <Card className="food_info ">
                <Card.Img
                  src={biryaniCategory.image}
                  style={{
                    height: "220px",
                    objectFit: "cover",
                  }}
                />
                <Card.Body>
                  <Card.Text className="foods_text">
                    {biryaniCategory.name}
                    {biryaniCategory.price}
                  </Card.Text>
                  <div className="d-flex justify-content-between">
                    <span> {biryaniCategory.rating}</span>
                    <span>{biryaniCategory.time}</span>
                  </div>
                  <div className="food_buy_cart">
                    <span>
                      {" "}
                      <Button onClick={handleShow} className="buy_btn">Buy</Button>
                    </span>
                    <span>
                      {" "}
                      <Button onClick={handleShow} className="buy_btn">
                        <FaShoppingCart />
                      </Button>
                    </span>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
      <Row>
        <Col>
          <hr />
          <h2>Sides</h2>
          <hr />
        </Col>
      </Row>
      <Row>
        {sides.map((side, index) => {
          return (
            <Col md={3} key={index}>
              <Card className="food_info">
                <Card.Img
                  src={side.image}
                  style={{
                    height: "220px",
                    objectFit: "cover",
                  }}
                />
                <Card.Body>
                  <Card.Text className="foods_text">
                    {side.name}
                    {side.price}
                  </Card.Text>
                  <div className="d-flex justify-content-between">
                    <span> {side.rating}</span>
                    <span>{side.time}</span>
                  </div>
                  <div className="food_buy_cart">
                    <span>
                      {" "}
                      <Button onClick={handleShow} className="buy_btn">Buy</Button>
                    </span>
                    <span>
                      {" "}
                      <Button className="buy_btn">
                        <FaShoppingCart />
                      </Button>
                    </span>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
      <Row>
        <Col>
          <hr />
          <h2>Desserts</h2>
          <hr />
        </Col>
      </Row>
      <Row>
        {desserts.map((dessert, index) => {
          return (
            <Col md={3} key={index}>
              <Card className="food_info">
                <Card.Img
                className="food_img"
                  src={dessert.image}
                  style={{
                    height: "220px",
                    objectFit: "cover",
                  }}
                />
                <Card.Body>
                  <Card.Text className="foods_text">
                    {dessert.name}
                    {dessert.price}
                  </Card.Text>
                  <div className="d-flex justify-content-between">
                    <span> {dessert.rating}</span>
                    <span>{dessert.time}</span>
                  </div>
                  <div className="food_buy_cart">
                    <span>
                      {" "}
                      <Button onClick={handleShow} className="buy_btn">Buy</Button>
                    </span>
                    <span>
                      {" "}
                      <Button onClick={handleShow} className="buy_btn">
                        <FaShoppingCart />
                      </Button>
                    </span>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
      <Row>
        <Col>
          <hr />
          <h2>Beverages</h2>
          <hr />
        </Col>
      </Row>
      <Row>
        {beverages.map((drink, index) => {
          return (
            <Col md={3} className="mb-4" key={index}>
              <Card className="food_info">
                <Card.Img
                  src={drink.image}
                  style={{
                    height: "220px",
                    objectFit: "cover",
                  }}
                />

                <Card.Body>
                  <Card.Text className="foods_text">
                    {drink.name}
                    {drink.price}
                  </Card.Text>
                  <div className="d-flex justify-content-between">
                    <span>{drink.rating}</span>
                    <span>{drink.time}</span>
                  </div>
                  <div className="food_buy_cart">
                    <span>
                      {" "}
                      <Button onClick={handleShow}className="buy_btn">Buy</Button>
                    </span>
                    <span>
                      {" "}
                      <Button onClick={handleShow} className="buy_btn">
                        <FaShoppingCart />
                      </Button>
                    </span>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default FoodCategory;
