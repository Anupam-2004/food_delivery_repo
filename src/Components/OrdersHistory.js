import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Spinner,
} from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  FaShoppingBag,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaEye,
  FaRedo,
  FaUtensils,
  FaCreditCard,
  FaReceipt,
  FaPhone,
  FaHome,
} from "react-icons/fa";

import "./OrdersHistory.css";

const OrdersHistory = () => {
  const navigate = useNavigate();

  const { user: currentUser } = useSelector((state) => state.auth);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = currentUser?._id || currentUser?.id;

  useEffect(() => {
    const getOrderHistory = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:8090/api/orders/user/${userId}`,
        );

        console.log("ALL ORDERS:", response.data);

        const allOrders = Array.isArray(response.data)
          ? response.data
          : [response.data];

        /*
          History page:
          Only Delivered and Cancelled orders
        */

        const historyOrders = allOrders.filter((order) => {
          const status = order.orderStatus?.toLowerCase();

          return (
            status === "delivered" ||
            status === "cancelled" ||
            status === "canceled"
          );
        });

        /*
          Latest orders first
        */

        historyOrders.sort(
          (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
        );

        setOrders(historyOrders);
      } catch (error) {
        console.error("Error fetching order history:", error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    getOrderHistory();
  }, [userId]);
  const getStatusVariant = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "success";

      case "cancelled":
      case "canceled":
        return "danger";

      default:
        return "secondary";
    }
  };
  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleViewOrder = (orderId) => {
    navigate(`/track-order/${orderId}`);
  };

  const handleReorder = async (order) => {
    console.log("Reorder:", order);

    /*
      Yahan tum apne cart API ko call kar sakte ho.

      Example:

      await axios.post(
        "http://localhost:8090/api/carts",
        {
          userId: userId,
          items: order.items.map((item) => ({
            productId: item.productId._id,
            restaurentId: item.restaurentId._id,
            quantity: item.quantity,
            price: item.price,
          })),
          active: true,
        }
      );
    */

    alert("Reorder functionality can be connected to Cart.");
  };

  if (loading) {
    return (
      <div className="orders-history-page">
        <Container className="text-center py-5">
          <Spinner animation="border" variant="primary" />

          <p className="mt-3">Loading order history...</p>
        </Container>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="orders-history-page">
        <Container className="text-center py-5">
          <FaShoppingBag size={55} className="text-muted mb-3" />

          <h4>Please login to view your order history</h4>

          <Button
            variant="primary"
            className="mt-3"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </Container>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="orders-history-page">
        <Container className="text-center py-5">
          <div className="history-empty-icon">
            <FaShoppingBag />
          </div>

          <h2>No Order History</h2>

          <p className="text-muted">
            Your delivered and cancelled orders will appear here.
          </p>

          <Button variant="primary" onClick={() => navigate("/")}>
            Order Food
          </Button>
        </Container>
      </div>
    );
  }

  /* --------------------------------
      PAGE
  -------------------------------- */

  return (
    <div className="orders-history-page py-4">
      <Container>
        {/* ================= HEADER ================= */}

        <div className="history-header mb-4">
          <div>
            <h2 className="fw-bold mb-1">
              <FaShoppingBag className="me-2 text-primary" />
              Order History
            </h2>

            <p className="text-muted mb-0">
              View all your delivered and cancelled orders.
            </p>
          </div>

          <Badge bg="secondary" className="history-count">
            {orders.length} Orders
          </Badge>
        </div>

        {/* ================= ORDERS ================= */}

        {orders.map((order) => {
          const orderId = order.id || order._id;

          const status = order.orderStatus?.toLowerCase();

          const restaurant = order.items?.[0]?.restaurentId;

          const orderTotal = Number(order.totalAmount || order.price || 0);

          return (
            <Card
              key={orderId}
              className="history-order-card border-0 shadow-sm mb-4"
            >
              <Card.Body>
                {/* ================= ORDER HEADER ================= */}

                <div className="history-order-header">
                  <div>
                    <small className="text-muted">ORDER ID</small>

                    <h5 className="fw-bold mb-1">#{orderId}</h5>

                    <small className="text-muted">
                      <FaCalendarAlt className="me-1" />

                      {formatDate(order.createdAt)}
                    </small>
                  </div>

                  <Badge
                    bg={getStatusVariant(order.orderStatus)}
                    className="status-badge"
                  >
                    {order.orderStatus || "Unknown"}
                  </Badge>
                </div>

                <hr />

                {/* ================= RESTAURANT ================= */}

                <div className="restaurant-section">
                  <div className="restaurant-icon">
                    <FaUtensils />
                  </div>

                  <div className="restaurant-details">
                    <small className="text-muted">Restaurant</small>

                    <h5 className="mb-0">
                      {restaurant?.restaurentName || "Restaurant"}
                    </h5>

                    {restaurant?.foodType && (
                      <small className="text-muted">
                        {restaurant.foodType}
                      </small>
                    )}
                  </div>
                </div>

                {/* ================= ITEMS ================= */}

                <div className="items-section">
                  <h6 className="fw-bold mb-3">Ordered Items</h6>

                  {order.items?.map((item, index) => {
                    const product = item.productId;

                    const itemRestaurant = item.restaurentId;

                    const itemTotal =
                      Number(item.price || 0) * Number(item.quantity || 0);

                    return (
                      <div className="history-item" key={item._id || index}>
                        {/* IMAGE */}

                        <div className="item-image-wrapper">
                          <img
                            src={
                              product?.images?.length
                                ? `http://localhost:8090/upload/${product.images[0]}`
                                : "/food-placeholder.png"
                            }
                            alt={product?.foodName || "Food Item"}
                            className="history-item-image"
                          />
                        </div>

                        {/* FOOD DETAILS */}

                        <div className="history-item-details">
                          <h6 className="fw-bold mb-1">
                            {product?.foodName ||
                              product?.productName ||
                              product?.name ||
                              "Food Item"}
                          </h6>

                          <p className="text-muted mb-1">
                            Restaurant:{" "}
                            {itemRestaurant?.restaurentName ||
                              restaurant?.restaurentName ||
                              "Restaurant"}
                          </p>

                          {product?.category && (
                            <small className="text-muted">
                              Category: {product.category}
                            </small>
                          )}

                          <div className="item-quantity">
                            <span>Quantity:</span>

                            <Badge bg="light" text="dark">
                              {item.quantity}
                            </Badge>
                          </div>
                        </div>

                        {/* PRICE */}

                        <div className="history-item-price">
                          <small className="text-muted">
                            ₹{Number(item.price || 0).toFixed(2)} ×{" "}
                            {item.quantity}
                          </small>

                          <strong>₹{itemTotal.toFixed(2)}</strong>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <hr />

                {/* ================= ORDER SUMMARY ================= */}

                <div className="order-summary">
                  <div>
                    <small className="text-muted">
                      <FaReceipt className="me-1" />
                      Total Items
                    </small>

                    <strong>
                      {order.items?.reduce(
                        (total, item) => total + Number(item.quantity || 0),
                        0,
                      )}
                    </strong>
                  </div>

                  <div>
                    <small className="text-muted">
                      <FaCreditCard className="me-1" />
                      Payment Status
                    </small>

                    <strong
                      className={
                        order.paymentStatus?.toLowerCase() === "paid"
                          ? "text-success"
                          : "text-warning"
                      }
                    >
                      {order.paymentStatus || "N/A"}
                    </strong>
                  </div>

                  <div>
                    <small className="text-muted">Order Total</small>

                    <strong className="text-primary total-price">
                      ₹{orderTotal.toFixed(2)}
                    </strong>
                  </div>
                </div>

                {/* ================= ADDRESS ================= */}

                {order.addressId && (
                  <div className="delivery-address">
                    <div className="address-icon">
                      <FaMapMarkerAlt />
                    </div>

                    <div>
                      <small className="text-muted">Delivered To</small>

                      <p className="mb-0">
                        {order.addressId.addressLine1 ||
                          order.addressId.address ||
                          ""}

                        {order.addressId.addressLine2 && (
                          <>, {order.addressId.addressLine2}</>
                        )}

                        {order.addressId.city && <>, {order.addressId.city}</>}

                        {order.addressId.pincode && (
                          <>- {order.addressId.pincode}</>
                        )}
                      </p>

                      {order.addressId.mobile && (
                        <small className="text-muted">
                          <FaPhone className="me-1" />

                          {order.addressId.mobile}
                        </small>
                      )}
                    </div>
                  </div>
                )}

                {/* ================= BUTTONS ================= */}

                <div className="history-buttons">
                  <Button
                    variant="outline-primary"
                    onClick={() => handleViewOrder(orderId)}
                  >
                    <FaEye className="me-2" />
                    View Details
                  </Button>

                  {status === "delivered" && (
                    <Button
                      variant="primary"
                      onClick={() => handleReorder(order)}
                    >
                      <FaRedo className="me-2" />
                      Reorder
                    </Button>
                  )}
                </div>
              </Card.Body>
            </Card>
          );
        })}
      </Container>
    </div>
  );
};

export default OrdersHistory;
