// import React, { useEffect, useState } from "react";
// import { Container, Row, Col, Card, Button } from "react-bootstrap";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import { ImCross } from "react-icons/im";
// import "./AddCart.css";

// const AddCart = () => {
//   const [products, setProducts] = useState([]);
//   const getProductDetails = () => {
//     axios
//       .get("http://localhost:8090/api/products")
//       .then((response) => {
//         setProducts(response.data);
//         console.log();
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };
//   const deleteCartItem = (productId) => {
//       const userId = currentUser?.id || currentUser?._id;

//   if (!userId) {
//     console.log("User ID not found");
//     return;
//   }
//     axios
//       .delete(
//         `http://localhost:8090/api/carts/user/${currentUser.id || currentUser._id}/item/${productId}`,
//       )
//       .then((response) => {
//         console.log("cart updated sucessfully");
//         // window.location.reload();
//           getCart();
//       })
//       .catch((error) => {
//         console.log("Delete failed:", error);
//       console.log("Backend Error:", error.response?.data);
//       });
//     // console.log("Decrease:", productId);
//   };

//   const updateQuantity = (productId, newQuantity) => {
//      if (newQuantity < 1) {
//     return;
//   }

//   const userId = currentUser?.id || currentUser?._id;

//   if (!userId) {
//     console.log("User ID not found");
//     return;
//   }

//   console.log("Updating quantity...");
//   console.log("User ID:", userId);
//   console.log("Product ID:", productId);
//   console.log("New Quantity:", newQuantity);

//     axios
//       .put(
//         `http://localhost:8090/api/carts/user/${currentUser.id || currentUser._id}/item/${productId}`,
//         { quantity: newQuantity },
//       )
//       .then((response) => {
//         console.log("cart updated sucessfully");
//         // window.location.reload();
//          getCart();
//       })
//       .catch((error) => {
//         console.log(error);
//         console.log("Backend Error:", error.response?.data);
//       });
//     console.log("Decrease:", productId);
//   };

//   const { user: currentUser } = useSelector((state) => state.auth);

//   const [cart, setCart] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const getCart = async () => {
//     try {
//       const userId = currentUser.id || currentUser._id;

//       const response = await axios.get(
//         `http://localhost:8090/api/carts/user/${userId}`,
//       );

//       setCart(response.data);
//     } catch (error) {
//       console.log(error.response?.data || error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (currentUser) {
//       getCart();
//       getProductDetails();
//     }
//   }, [currentUser]);

//   if (loading) {
//     return <h3 className="text-center mt-5">Loading...</h3>;
//   }

//   if (!cart || cart.items.length === 0) {
//     return <h3 className="text-center mt-5">Cart is Empty</h3>;
//   }

//   const total = cart.items.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0,
//   );

//   return (
//     <Container className="my-5">
//       <h2 className="bold mb-4 text-center">🛒 My Cart</h2>

//       {cart.items.map((item) => (
//         <Card
//           className="cart-card border-0 shadow-lg mb-4"
//           key={item.productId}
//         >
//           <Card.Body>
//             <Row className="align-items-center">
//               <Col md={3} className="text-center">
//                 <img
//                   src={
//                     item.productDetails?.images?.length
//                       ? `http://localhost:8090/upload/${item.productDetails.images[0]}`
//                       : "/no-image.png"
//                   }
//                   alt={item.productDetails?.foodName}
//                   className="cart-img"
//                 />
//               </Col>

//               <Col md={3}>
//                 <h4 className="bold mb-2">{item.productDetails.foodName}</h4>

//                 <p className="text-muted mb-0">
//                   {item.productDetails.description}
//                 </p>
//               </Col>

//               <Col md={2} className="text-center">
//                 <small className="text-muted d-block">Price</small>
//                 <h5 className="fw-bold text-success">₹ {item.price}</h5>
//               </Col>

//               <Col md={1} className="text-center">
//                 <small className="text-muted d-block">Qty</small>

//                 <div className="qty-box">
//                   <button
//                     className="qty-btn"
//                     // onClick={() => updateQuantity(item.productId)}
//                     onClick={() =>
//                       updateQuantity(item.productId, item.quantity - 1)
//                     }
//                     disabled={item.quantity <= 1}
//                   >
//                     −
//                   </button>
//                   <span className="qty-number">{item.quantity}</span>
//                   <button
//                     className="qty-btn"
//                     onClick={() =>
//                       updateQuantity(item.productId, item.quantity + 1)
//                     }
//                   >
//                     +
//                   </button>
//                 </div>
//               </Col>

//               <Col md={2} className="text-center">
//                 <small className="text-muted d-block">Total</small>

//                 <h5 className="fw-bold text-danger">
//                   ₹ {item.price * item.quantity}
//                 </h5>
//               </Col>
//               <Col md={1} className="remove-btn ">
//                 <Button
//                   variant="danger "
//                   onClick={() => {
//                     deleteCartItem(item.productId);
//                   }}
//                 >
//                   <ImCross />
//                 </Button>
//               </Col>
//             </Row>
//           </Card.Body>
//         </Card>
//       ))}

//       <Card className="cart-summary border-0 shadow-lg">
//         <Card.Body>
//           <div className="d-flex justify-content-between mb-3">
//             <h5>Total Items</h5>
//             <h5>{cart.itemCount}</h5>
//           </div>

//           <div className="d-flex justify-content-between mb-4">
//             <h3 className="fw-bold">Grand Total</h3>

//             <h3 className="fw-bold text-success">₹ {total}</h3>
//           </div>

//           <Button
//             variant="success"
//             size="lg"
//             className="w-100 fw-bold"
//             href="/Address"
//           >
//             Proceed To Checkout
//           </Button>
//         </Card.Body>
//       </Card>
//     </Container>
//   );
// };

// export default AddCart;
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "axios";
import { ImCross } from "react-icons/im";
import "./AddCart.css";

const AddCart = () => {
  // Current user sabse pehle lo
  const { user: currentUser } = useSelector((state) => state.auth);

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatingProductId, setUpdatingProductId] = useState(null);

  const getItemProductId = (item) =>
    item.productId?._id || item.productId?.id || item.productId;

  // =========================
  // GET PRODUCTS
  // =========================
  const getProductDetails = () => {
    axios
      .get("http://localhost:8090/api/products")
      .then((response) => {
        setProducts(response.data);
        console.log("Products:", response.data);
      })
      .catch((error) => {
        console.log("Products Error:", error);
      });
  };

  // =========================
  // GET CART
  // =========================
  const getCart = () => {
    const userId = currentUser?.id || currentUser?._id;

    if (!userId) {
      console.log("User ID not found");
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:8090/api/carts/user/${userId}`)
      .then((response) => {
        console.log("Cart:", response.data);
        setCart(response.data);
      })
      .catch((error) => {
        console.log("Get Cart Error:", error.response?.data || error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // =========================
  // UPDATE QUANTITY
  // =========================
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      return;
    }

    const userId = currentUser?.id || currentUser?._id;

    if (!userId) {
      console.log("User ID not found");
      return;
    }

    console.log("========== UPDATE QUANTITY ==========");
    console.log("User ID:", userId);
    console.log("Product ID:", productId);
    console.log("New Quantity:", newQuantity);

    axios
      .put(
        `http://localhost:8090/api/carts/user/${userId}/item/${productId}`,
        {
          quantity: newQuantity,
        }
      )
      .then((response) => {
        console.log("Cart updated successfully:", response.data);

        // Page reload nahi karna
        getCart();
      })
      .catch((error) => {
        console.log("Quantity update failed:", error);
        console.log("Backend Error:", error.response?.data);
      })
      .finally(() => {
        setUpdatingProductId(null);
      });
  };

  // =========================
  // DELETE CART ITEM
  // =========================
  const deleteCartItem = (productId) => {
    const userId = currentUser?.id || currentUser?._id;

    if (!userId) {
      console.log("User ID not found");
      return;
    }

    axios
      .delete(
        `http://localhost:8090/api/carts/user/${userId}/item/${productId}`
      )
      .then((response) => {
        console.log("Cart item deleted:", response.data);

        // Page reload nahi karna
        getCart();
      })
      .catch((error) => {
        console.log("Delete failed:", error);
        console.log("Backend Error:", error.response?.data);
      });
  };

  // =========================
  // LOAD CART
  // =========================
  useEffect(() => {
    if (currentUser) {
      getCart();
      getProductDetails();
    }
  }, [currentUser]);

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <h3 className="text-center mt-5">
        Loading...
      </h3>
    );
  }

  // =========================
  // EMPTY CART
  // =========================
  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <h3 className="text-center mt-5">
        Cart is Empty
      </h3>
    );
  }

  // =========================
  // TOTAL
  // =========================
  const total = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // =========================
  // UI
  // =========================
  return (
    <Container className="my-5">

      <h2 className="bold mb-4 text-center">
        🛒 My Cart
      </h2>

      {cart.items.map((item) => (
        <Card
          className="cart-card border-0 shadow-lg mb-4"
          key={getItemProductId(item)}
        >
          <Card.Body>

            <Row className="align-items-center">

              {/* IMAGE */}
              <Col md={3} className="text-center">
                <img
                  src={
                    item.productDetails?.images?.length
                      ? `http://localhost:8090/upload/${item.productDetails.images[0]}`
                      : "/no-image.png"
                  }
                  alt={item.productDetails?.foodName || "Food"}
                  className="cart-img"
                />
              </Col>

              {/* FOOD DETAILS */}
              <Col md={3}>

                <h4 className="bold mb-2">
                  {item.productDetails?.foodName}
                </h4>

                <p className="text-muted mb-0">
                  {item.productDetails?.description}
                </p>

              </Col>

              {/* PRICE */}
              <Col md={2} className="text-center">

                <small className="text-muted d-block">
                  Price
                </small>

                <h5 className="fw-bold text-success">
                  ₹ {item.price}
                </h5>

              </Col>

              {/* QUANTITY */}
              <Col md={1} className="text-center">

                <small className="text-muted d-block">
                  Qty
                </small>

                <div className="qty-box">

                  {/* MINUS */}
                  <button
                    type="button"
                    className="qty-btn"
                    onClick={() =>
                      updateQuantity(
                        getItemProductId(item),
                        item.quantity - 1
                      )
                    }
                    disabled={
                      item.quantity <= 1 ||
                      updatingProductId === getItemProductId(item)
                    }
                  >
                    −
                  </button>

                  {/* QUANTITY */}
                  <span className="qty-number">
                    {item.quantity}
                  </span>

                  {/* PLUS */}
                  <button
                    type="button"
                    className="qty-btn"
                    onClick={() =>
                      updateQuantity(
                        getItemProductId(item),
                        item.quantity + 1
                      )
                    }
                    disabled={updatingProductId === getItemProductId(item)}
                  >
                    +
                  </button>

                </div>

              </Col>

              {/* TOTAL */}
              <Col md={2} className="text-center">

                <small className="text-muted d-block">
                  Total
                </small>

                <h5 className="fw-bold text-danger">
                  ₹ {item.price * item.quantity}
                </h5>

              </Col>

              {/* DELETE */}
              <Col md={1} className="remove-btn">

                <Button
                  variant="danger"
                  type="button"
                  onClick={() =>
                    deleteCartItem(getItemProductId(item))
                  }
                >
                  <ImCross />
                </Button>

              </Col>

            </Row>

          </Card.Body>
        </Card>
      ))}

      {/* CART SUMMARY */}
      <Card className="cart-summary border-0 shadow-lg">

        <Card.Body>

          <div className="d-flex justify-content-between mb-3">

            <h5>
              Total Items
            </h5>

            <h5>
              {cart.itemCount}
            </h5>

          </div>

          <div className="d-flex justify-content-between mb-4">

            <h3 className="fw-bold">
              Grand Total
            </h3>

            <h3 className="fw-bold text-success">
              ₹ {total}
            </h3>

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
