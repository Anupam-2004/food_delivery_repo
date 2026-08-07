import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "axios";
import { ImCross } from "react-icons/im";
import "./AddCart.css";

const AddCart = () => {
  const [products, setProducts] = useState([]);
  const getProductDetails = () => {
    axios
      .get("http://localhost:8090/api/products")
      .then((response) => {
        setProducts(response.data);
        console.log();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deleteCartItem = (productId) => {
    axios
      .delete(
        `http://localhost:8090/api/carts/user/${currentUser.id}/item/${productId}`,
      )
      .then((response) => {
        console.log("cart updated sucessfully");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
    // console.log("Decrease:", productId);
  };

  const updateQuantity = (productId, newQuantity) => {
    axios
      .put(
        `http://localhost:8090/api/carts/user/${currentUser.id}/item/${productId}`,
        { quantity: newQuantity },
      )
      .then((response) => {
        console.log("cart updated sucessfully");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        console.log("Backend Error:", error.response?.data);
      });
    console.log("Decrease:", productId);
  };

  const { user: currentUser } = useSelector((state) => state.auth);

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const getCart = async () => {
    try {
      const userId = currentUser.id;

      const response = await axios.get(
        `http://localhost:8090/api/carts/user/${userId}`,
      );

      setCart(response.data);
    } catch (error) {
      console.log(error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      getCart();
      getProductDetails();
    }
  }, []);

  if (loading) {
    return <h3 className="text-center mt-5">Loading...</h3>;
  }

  if (!cart || cart.items.length === 0) {
    return <h3 className="text-center mt-5">Cart is Empty</h3>;
  }

  const total = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <Container className="my-5">
      <h2 className="bold mb-4 text-center">🛒 My Cart</h2>

      {cart.items.map((item) => (
        <Card
          className="cart-card border-0 shadow-lg mb-4"
          key={item.productId}
        >
          <Card.Body>
            <Row className="align-items-center">
              <Col md={3} className="text-center">
                <img
                  src={
                    item.productDetails?.images?.length
                      ? `http://localhost:8090/upload/${item.productDetails.images[0]}`
                      : "/no-image.png"
                  }
                  alt={item.productDetails?.foodName}
                  className="cart-img"
                />
              </Col>

              <Col md={3}>
                <h4 className="bold mb-2">{item.productDetails.foodName}</h4>

                <p className="text-muted mb-0">
                  {item.productDetails.description}
                </p>
              </Col>

              <Col md={2} className="text-center">
                <small className="text-muted d-block">Price</small>
                <h5 className="fw-bold text-success">₹ {item.price}</h5>
              </Col>

              <Col md={1} className="text-center">
                <small className="text-muted d-block">Qty</small>

                <div className="qty-box">
                  <button
                    className="qty-btn"
                    // onClick={() => updateQuantity(item.productId)}
                    onClick={() =>
                      updateQuantity(item.productId, item.quantity - 1)
                    }
                    disabled={item.quantity <= 1}
                  >
                    −
                  </button>
                  <span className="qty-number">{item.quantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() =>
                      updateQuantity(item.productId, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
              </Col>

              <Col md={2} className="text-center">
                <small className="text-muted d-block">Total</small>

                <h5 className="fw-bold text-danger">
                  ₹ {item.price * item.quantity}
                </h5>
              </Col>
              <Col md={1} className="remove-btn ">
                <Button
                  variant="danger "
                  onClick={() => {
                    deleteCartItem(item.productId);
                  }}
                >
                  <ImCross />
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}

      <Card className="cart-summary border-0 shadow-lg">
        <Card.Body>
          <div className="d-flex justify-content-between mb-3">
            <h5>Total Items</h5>
            <h5>{cart.itemCount}</h5>
          </div>

          <div className="d-flex justify-content-between mb-4">
            <h3 className="fw-bold">Grand Total</h3>

            <h3 className="fw-bold text-success">₹ {total}</h3>
          </div>

          <Button
            variant="success"
            size="lg"
            className="w-100 fw-bold"
            href="/Address"
          >
            Proceed To Checkout
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddCart;
