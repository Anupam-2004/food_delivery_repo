import { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
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
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./Orders_history.css";

const AdminOrderHistory = () => {
   const navigate = useNavigate();
  
  const [orders, setOrders] = useState([]);

  const { user: currentUser } = useSelector((state) => state.auth);

  const userId = currentUser?._id || currentUser?.id;

  useEffect(() => {
    // if (!AdminId) return;

    axios
      .get(`http://localhost:8090/api/orders`)
      .then((response) => {
        console.log("Orders:", response.data);

        setOrders(Array.isArray(response.data) ? response.data : []);
      })
      .catch((error) => {
        console.log("Error fetching orders:", error);
      });
       if (!currentUser) {
      navigate("/");
      return;
    }

    if (
      currentUser.roles &&
      !currentUser.roles.includes("ROLE_ADMIN")
    ) {
      navigate("/");
      return;
    }

  }, []);

  return (
    <div className="orders-history-page">
      <Container>
        <div className="history-top">
          <div className="history-title">
            <div className="title-icon">
              <FaShoppingBag />
            </div>

            <div>
              <h1>Order History</h1>

              <p>View all your delivered and cancelled orders</p>
            </div>
          </div>

          <div className="total-orders">
            <div className="total-orders-icon">
              <FaReceipt />
            </div>

            <div>
              <span>Total Orders</span>

              <strong>{orders.length} Orders</strong>
            </div>
          </div>
        </div>

        <div className="filter-buttons">
          <button className="filter-btn active">
            <FaShoppingBag />
            All History ({orders.length})
          </button>

          <button className="filter-btn delivered-filter">
            <FaCheck />
            Delivered
          </button>

          <button>
            <FaTimes />
            Cancelled
          </button>
        </div>

        {orders.map((order) => {
          const restaurant = order.items?.[0]?.restaurentId;

          return (
            <div className="history-card" key={order.id}>
              <div className="order-card-header">
                <div className="order-info">
                  <span className="label">ORDER ID</span>

                  <h3>#{order.id}</h3>

                  <small>
                    <FaCalendarAlt />
                  </small>
                </div>

                <div className="restaurant-info">
                  <div className="restaurant-logo">
                    <FaUtensils />
                  </div>

                  <div>
                    <span className="label">Restaurant</span>

                    <h3>{restaurant.restaurentName}</h3>

                    <small>{restaurant.foodType}</small>
                  </div>
                </div>

                <div className="order-total">
                  <span className="label">Total Amount</span>

                  <h2>₹{Number(order.totalAmount).toFixed(2)}</h2>
                </div>
              </div>

              <div className="order-card-body">
                <div className="order-items">
                  {order.items?.map((item, index) => {
                    const product = item.productId;

                    return (
                      <div className="order-item" key={item._id || index}>
                        <div className="food-image">
                          <img
                            src={
                              product?.images?.length
                                ? `http://localhost:8090/upload/${product.images[0]}`
                                : "/food-placeholder.png"
                            }
                            alt={product?.foodName || "Food"}
                          />
                        </div>

                        <div className="food-info">
                          <h4>{product?.foodName || "Food Item"}</h4>

                          <span>Food Type: {product?.foodType || "N/A"}</span>

                          <br />

                          <span>Quantity: {item.quantity}</span>
                        </div>

                        <strong>₹{Number(item.price || 0).toFixed(2)}</strong>
                      </div>
                    );
                  })}
                </div>

                <div className="order-details">
                  <div className="detail-box">
                    <div className="detail-icon">
                      <FaMapMarkerAlt />
                    </div>

                    <div>
                      <h5>Delivery Address</h5>

                      <p>
                        {order.addressId?.addressLine1 || ""}

                        {order.addressId?.addressLine2 && (
                          <>, {order.addressId.addressLine2}</>
                        )}

                        {order.addressId?.city && <>, {order.addressId.city}</>}

                        {order.addressId?.state && (
                          <>, {order.addressId.state}</>
                        )}

                        {order.addressId?.pin && <>- {order.addressId.pin}</>}
                      </p>

                      {order.addressId?.mobile && (
                        <small>
                          <FaPhone />

                          {order.addressId.mobile}
                        </small>
                      )}
                    </div>
                  </div>

                  {/* <div className="detail-box payment-box">
                    <div className="detail-icon">
                      <FaCreditCard />
                    </div>

                    <div>
                      <h5>Payment Status</h5>

                      <p>{order.paymentStatus || "N/A"}</p>
                    </div>
                  </div>*/}
                </div>
              </div> 

              <div className="order-card-footer">
                <div className="item-count">
                  <span>Total Items:</span>

                  <strong>
                    {order.items?.reduce(
                      (total, item) => total + Number(item.quantity || 0),
                      0,
                    )}
                  </strong>
                </div>

                <div className="action-buttons">
                  <Button className="view-button">
                    <FaEye />
                    View Details
                  </Button>

                  <Button className="reorder-button">
                    <FaRedo />
                    Reorder
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </Container>
    </div>
  );
};

export default AdminOrderHistory;
