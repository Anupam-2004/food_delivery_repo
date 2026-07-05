import React from "react";
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
import MultiCarousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import {
  Col,
  Row,
  Container,
  Navbar,
  Nav,
  NavDropdown,
  InputGroup,
  ButtonToolbar,
  Form,
  Button,
  Image,
  Card,
  Carousel,
} from "react-bootstrap";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { FcRating } from "react-icons/fc";
import { MdDeliveryDining } from "react-icons/md";
import { TbBuildingStore } from "react-icons/tb";

import { TfiMedallAlt } from "react-icons/tfi";
import { MdOutlinePayment } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { IoIosCall } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { CiStopwatch } from "react-icons/ci";
import { TypeAnimation } from "react-type-animation";

const foods = [
  {
    image: "/food_icons/biryani.png",
    name: "Biryani",
  },
  {
    image: "/food_icons/cake.png",
    name: "Cake",
  },
  {
    image: "/food_icons/chinese.png",
    name: "Chiness Food",
  },
  {
    image: "/food_icons/dosa.png",
    name: "Dosa",
  },
  {
    image: "/food_icons/ice_cream.png",
    name: "Ice cream",
  },
  {
    image: "/food_icons/momo.png",
    name: "Momos",
  },
  {
    image: "/food_icons/north_indian.png",
    name: "North Indian",
  },
  {
    image: "/food_icons/paratha.png",
    name: "Paratha",
  },
  {
    image: "/food_icons/pasta.png",
    name: "pasta",
  },
  {
    image: "/food_icons/pizza.png",
    name: "Pizza",
  },
  //   ];
  // const meals = [
  {
    image: "/food_images_no_names/burger.png",
    name: "Burger",
  },

  {
    image: "/food_images_no_names/chole_bhature.png",
    name: "Chhole Bhature",
  },
  {
    image: "/food_images_no_names/desserts.png",
    name: "Desserts",
  },
  {
    image: "/food_images_no_names/gulab_jamun.png",
    name: "Sweets",
  },
  {
    image: "/food_images_no_names/idli.png",
    name: "IDLI",
  },
  {
    image: "/food_images_no_names/noodles.png",
    name: "Noodles",
  },
  {
    image: "/food_images_no_names/pastry.png",
    name: "Pastry",
  },
  {
    image: "/food_images_no_names/rolls.png",
    name: "Rolls",
  },
  {
    image: "/food_images_no_names/shawarma.png",
    name: "Shawarma",
  },
  {
    image: "/food_images_no_names/south_indian.png",
    name: "North Indian",
  },
];
const products = [
  {
    image: "/grocery_category_images/baby_care.png",
    name: "Baby Care",
  },
  {
    image: "/grocery_category_images/bath_body_and_hair.png",
    name: "Hair & Care",
  },
  {
    image: "/grocery_category_images/beauty_and_grooming.png",
    name: "Beauty",
  },
  {
    image: "/grocery_category_images/category_1.png",
    name: " Fresh Vegetables",
  },
  {
    image: "/grocery_category_images/category_2.png",
    name: "Fresh Fruits",
  },
  {
    image: "/grocery_category_images/category_3.png",
    name: "Milk",
  },
  {
    image: "/grocery_category_images/category_4.png",
    name: "Rice Atta & Dals",
  },
  {
    image: "/grocery_category_images/category_5.png",
    name: "Masalas & Dry Fruits",
  },

  {
    image: "/grocery_category_images/category_img_1.png",
    name: "Oils & Ghee",
  },
  {
    image: "/grocery_category_images/category_img_2.png",
    name: "Munchies",
  },
  {
    image: "/grocery_category_images/category_img_3.png",
    name: "Chocalate & Ice-Cream",
  },
  {
    image: "/grocery_category_images/category_4.png",
    name: "Cold drink & juiece",
  },
  {
    image: "/grocery_category_images/category_img_5.png",
    name: "Biscuits & Cakes",
  },
  {
    image: "/grocery_category_images/cereals_and_breakfast.png",
    name: "Cereals & Breakfast",
  },
  {
    image: "/grocery_category_images/cleaning_essentials.png",
    name: "Cleaning Essentials",
  },
  {
    image: "/grocery_category_images/home_and_kitchen.png",
    name: "Home & Kitchen",
  },
  {
    image: "/grocery_category_images/instant_and_frozen_food.png",
    name: "Frozen Food",
  },
  {
    image: "/grocery_category_images/meat_and_seafood.png",
    name: "Meet & Seafood",
  },
  {
    image: "/grocery_category_images/office_and_electricals.png",
    name: "Office & Electricals",
  },
  {
    image: "/grocery_category_images/paan_corner.png",
    name: "Paan Corner",
  },
  {
    image: "/grocery_category_images/pet_supplies.png",
    name: "Rolls",
  },
  {
    image: "/grocery_category_images/pharma_and_hygiene.png",
    name: "Pet Supplies",
  },
  {
    image: "/grocery_category_images/sauces_and_spreads.png",
    name: "Sauces & Spread",
  },
  {
    image: "/grocery_category_images/tea_coffee_and_more.png",
    name: "Coffee",
  },
];
const services = [
  {
    image: "/delivery-illustrationr.jpg",
    title: "Fast Delivery",
    desc: "Get your favourite food delivered in 25-30 minutes.",
  },
  {
    image: "/burger.png",
    title: "Fresh & Quality Food",
    desc: "Enjoy fresh, hygienic and high-quality food every time.",
  },
  {
    image: "/location.jpg",
    title: "Live Order Tracking",
    desc: "Track your order in real time.",
  },
  {
    image: "/credit-cart.png",
    title: "Secure Payments",
    desc: "100% secure payments with multiple options – UPI, Cards, Wallets & more.",
  },
  {
    image: "/gift.png",
    title: "Exciting Offers",
    desc: "Get exclusive discounts, coupon codes and cashback on every order..",
  },
  {
    image: "/call.png",
    title: "24/7 Customer Support",
    desc: "Our support team is always here to help you anytime, anywhere.",
  },
];
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};
const Landing = () => {
  return (
    <Container fluid>
      <Row>
        <Col>
          <Carousel>
            <Carousel.Item>
              <img
                className="main_image"
                src="/main_area.png"
                alt="First slide"
              />
              <Carousel.Caption className="heading">
                <h1>
                  Find Restaurents That Deliver To
                  <b>
                    <TypeAnimation
                      sequence={[
                        // Same substring at the start will only be typed out once, initially
                        "Your Doorstep",
                        1000, // wait 1s before replacing "Doorsteps" with "Table"
                        "Your Table",
                        1000,
                      ]}
                      wrapper="span"
                      speed={50}
                      style={{ display: "inline-block" }}
                      repeat={Infinity}
                    />
                  </b>
                </h1>
                <p>
                  Get fresh meals and groceries delivered straight to your door
                  anytime,anywhere.
                </p>
                <InputGroup className="location">
                  <InputGroup.Text>
                    <FaLocationDot />
                    <Form.Control
                      type="text"
                      placeholder="Enter your delivery address"
                      aria-label="Enter your delivery address"
                    />
                    <button className="btn btn-danger">
                      Find Food
                      <IoIosArrowForward />
                    </button>
                  </InputGroup.Text>
                </InputGroup>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>
      <Row>
        <Col className="top-products">
          <h1>Top products</h1>
        </Col>
      </Row>

      <Row className="flex-nowrap overflow-auto">
        <MultiCarousel
          responsive={responsive}
          autoPlay={true}
          autoPlaySpeed={2000}
          swipeable={true}
          draggable={false}
          infinite={true}
        >
          {foods.map((food, index) => {
            return (
              <Col>
                <Card className="border-0">
                  <Card.Img variant="top" src={food.image} />
                  <Card.Body className="food_name text-center">
                    <Card.Text>{food.name}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </MultiCarousel>
      </Row>

      <Row>
        <Col className="learn_more">
          <Image src="/group.png" fluid />
        </Col>
      </Row>
      <Row>
        <Col className="top-products">
          <h1>Shop groceries on InstaMart</h1>
        </Col>
      </Row>
      <Row className="flex-nowrap overflow-auto">
        <MultiCarousel
          responsive={responsive}
          autoPlay={true}
          autoPlaySpeed={2000}
          swipeable={true}
          draggable={false}
          infinite={true}
        >
          {products.map((product, index) => {
            return (
              <Col>
                <Card className="border-0">
                  <Card.Img variant="top" src={product.image} />
                  <Card.Body className="food_name text-center">
                    <Card.Text>{product.name}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </MultiCarousel>
      </Row>
      <Row className="service_card">
        <div className="text-center">
          <h6>OUR SERVICES</h6>
          <h2>Why Choose Us</h2>
          <p>
            We provide the est food experience with fast delivery,fresh meals
            and excellent customer support
          </p>
        </div>
        {services.map((service, index) => {
          return (
            <Col md={3} key={index}>
              <Card className="service_info_card">
                <div className="card_image">
                  <Card.Img className="serve_img" src={service.image} />
                </div>
                <Card.Body className="text-center">
                  <Card.Title>{service.title}</Card.Title>
                  <Card.Text>{service.desc}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>

      <Row className="mt-5">
        <Col className="rating text-center">
          <div className="service_img">
            <img
              src="/trusted service.png"
              alt="Trusted Service"
              className="service_logo"
            />

            <h2 className="choice mt-2 mb-4">
              Trusted By Thousands of Food Lovers
            </h2>

            <div className="rating_card">
              <Card className="info_card">
                <Card.Body>
                  <div className="restro_rate">
                    <FcRating />
                  </div>
                  <h4>4.9 Rating</h4>
                  <p>From 29K+ Customers</p>
                </Card.Body>
              </Card>

              <Card className="info_card">
                <Card.Body>
                  <div className="deliveries_no">
                    <MdDeliveryDining />
                  </div>
                  <h4>10K+ Deliveries</h4>
                  <p>Completed Every Day</p>
                </Card.Body>
              </Card>

              <Card className="info_card">
                <Card.Body>
                  <div className="restro">
                    <TbBuildingStore />
                  </div>
                  <h4>500+ Restaurants</h4>
                  <p>Available Near You</p>
                </Card.Body>
              </Card>

              <Card className="info_card">
                <Card.Body>
                  <div className="deliver">
                    <MdDeliveryDining />
                  </div>
                  <h4>Delivery in 25 min</h4>
                  <p>Super Fast Delivery</p>
                </Card.Body>
              </Card>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="footer">
        <Col className="logo_list" md={3}>
          <img src="logo_2.png" />
          <p>
            Delicious food delivered to your <br></br>doorstep. Fast ,Fresh and
            alwayes <br></br> Reliable
          </p>
          <h6>
            <MdDeliveryDining />
            Food Delivery
          </h6>
          <h6>
            <TfiMedallAlt />
            Best Quality
          </h6>
          <h6>
            <MdOutlinePayment />
            Easy Payment
          </h6>
          <h5>Follow Us</h5>
          <ul className="list-unstyled d-flex justify-content-between">
            <li>
              <img src="/footer_images/download-removebg-preview.png"></img>
            </li>
            <li>
              <img src="/footer_images/facebook-removebg-preview.png"></img>
            </li>
            <li>
              <img src="/footer_images/twitter-removebg-preview.png"></img>
            </li>
            <li>
              <img src="/footer_images/youtube.png"></img>
            </li>
          </ul>
        </Col>

        <Col className="footer_list" md={2}>
          <h5>QUICK LINKS</h5>
          <ul>
            <li>
              <MdKeyboardArrowRight />
              Home
            </li>
            <li>
              <MdKeyboardArrowRight />
              About Us
            </li>
            <li>
              <MdKeyboardArrowRight />
              Restaurents
            </li>
            <li>
              <MdKeyboardArrowRight />
              Menu
            </li>
            <li>
              <MdKeyboardArrowRight />
              Offers
            </li>
            <li>
              <MdKeyboardArrowRight />
              Track Order
            </li>
            <li>
              <MdKeyboardArrowRight />
              Becomea Partner
            </li>
            <li>
              <MdKeyboardArrowRight />
              Contact Us
            </li>
          </ul>
        </Col>
        <Col className="customer_support" md={3}>
          <h5>CUSTOMER SUPPORTS</h5>
          <ul>
            <li>
              <MdKeyboardArrowRight />
              Help Center
            </li>
            <li>
              <MdKeyboardArrowRight />
              FAQs
            </li>
            <li>
              <MdKeyboardArrowRight />
              Track Order
            </li>
            <li>
              <MdKeyboardArrowRight />
              Refund Policy
            </li>
            <li>
              <MdKeyboardArrowRight />
              Cancelation Policy
            </li>
            <li>
              <MdKeyboardArrowRight />
              Terms & Condition
            </li>
            <li>
              <MdKeyboardArrowRight />
              Privacy Policy
            </li>
          </ul>
        </Col>
        <Col className="contact_us" md={2}>
          <h5>CONTACT US</h5>
          <a href="">
            <FaLocationDot />
            84005 Foodi Street,<br></br>Jamshedpur,Jharkhand
          </a>
          <br></br>
          <a href="">
            <IoIosCall />
            +917070166211
          </a>
          <a href="">
            <MdEmail />
            support@foodie.com
          </a>
          <a href="">
            <CiStopwatch />
            Mon-Sun
          </a>
          <p>8:00 AM-11:00 PM</p>
        </Col>
        <Col className="download" md={2}>
          <h5>DOWNLOAD APP</h5>
          <p>Get the Foodie app for a better experience. </p>
          <img src="/footer_images/burger_fries-removebg-preview.png"></img>
        </Col>
      </Row>
    </Container>
  );
};

export default Landing;
