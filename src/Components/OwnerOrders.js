
import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Breadcrumb,
  Table,
  Modal,
  Button,
  Accordion,
} from "react-bootstrap";
import axios from "axios";
import Sidebar from "./Sidebar";
import { FaFilePdf, FaEye } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const OwnerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const [restaurantId, setRestaurantId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const navigate = useNavigate();

  const { user: currentUser } = useSelector((state) => state.auth);

  const userId = currentUser?._id || currentUser?.id;

  useEffect(() => {
    if (!userId) {
      return;
    }

    axios
      .get(`http://localhost:8090/api/restaurents/user/${userId}`)
      .then((response) => {
        const restaurantData = response.data[0];

        setRestaurant(restaurantData);
        setRestaurantId(restaurantData.id);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);

  useEffect(() => {
    if (!restaurantId) {
      return;
    }

    axios
      .get(
        `http://localhost:8090/api/orders/restaurent/${restaurantId}`
      )
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [restaurantId]);

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    } else if (currentUser.roles?.[0] !== "ROLE_OWNER") {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const handleShow = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  return (
    <Container fluid>
      <Row>
        <Col md={1}>
          <Sidebar />
        </Col>

        <Col md={11}>
          <h1>Orders (Owner)</h1>

          <Breadcrumb>
            <Breadcrumb.Item href="/Dashboard">
              Dashboard
            </Breadcrumb.Item>

            <Breadcrumb.Item active>
              Orders (Owner)
            </Breadcrumb.Item>
          </Breadcrumb>

          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Restaurant Name</th>
                <th>Customer Name</th>
                <th>Items</th>
                <th>Total Price</th>
                <th>View</th>
                <th>Invoice</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id || order.id || index}>
                  <td>{index + 1}</td>

                  <td>
                    {restaurant?.restaurentName || "Restaurant"}
                  </td>

                  <td>
                    {order.userId?.firstName || ""}{" "}
                    {order.userId?.lastName || ""}
                  </td>

                  <td>
                    <ul>
                      {order.items?.map((item, itemIndex) => (
                        <li key={itemIndex}>
                          {item.productId?.foodName || "Product"} - ₹
                          {item.price} × {item.quantity}
                        </li>
                      ))}
                    </ul>
                  </td>

                  <td>₹{order.totalAmount || 0}</td>

                  <td>
                    <Button
                      variant="warning"
                      onClick={() => handleShow(order)}
                    >
                      <FaEye />
                    </Button>
                  </td>

                  <td>
                    <Button variant="danger">
                      <FaFilePdf />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton className="bg-danger text-white">
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {selectedOrder && (
            <div>
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    Restaurant Details
                  </Accordion.Header>

                  <Accordion.Body>
                    <p>
                      <strong>Restaurant Name:</strong>{" "}
                      {restaurant?.restaurentName}
                    </p>

                    <p>
                      <strong>Food Type:</strong>{" "}
                      {restaurant?.foodType}
                    </p>

                    <p>
                      <strong>Address 1:</strong>{" "}
                      {restaurant?.addressLine1}
                    </p>

                    <p>
                      <strong>Address 2:</strong>{" "}
                      {restaurant?.addressLine2}
                    </p>

                    <p>
                      <strong>Location:</strong>{" "}
                      {restaurant?.location}
                    </p>

                    <p>
                      <strong>City:</strong> {restaurant?.city}
                    </p>

                    <p>
                      <strong>State:</strong> {restaurant?.state}
                    </p>

                    <p>
                      <strong>Country:</strong>{" "}
                      {restaurant?.country}
                    </p>

                    <p>
                      <strong>Pincode:</strong>{" "}
                      {restaurant?.pincode}
                    </p>

                    <p>
                      <strong>Mobile Number:</strong>{" "}
                      {restaurant?.mobileNumber}
                    </p>

                    <p>
                      <strong>Email:</strong> {restaurant?.email}
                    </p>

                    <p>
                      <strong>Owner Name:</strong>{" "}
                      {restaurant?.ownerName}
                    </p>

                    <p>
                      <strong>Website:</strong>{" "}
                      {restaurant?.website}
                    </p>

                    <p>
                      <strong>Description:</strong>{" "}
                      {restaurant?.description}
                    </p>
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                  <Accordion.Header>
                    Customer Details
                  </Accordion.Header>

                  <Accordion.Body>
                    <p>
                      <strong>Name:</strong>{" "}
                      {selectedOrder.userId?.firstName || ""}{" "}
                      {selectedOrder.userId?.lastName || ""}
                    </p>

                    <p>
                      <strong>Email:</strong>{" "}
                      {selectedOrder.userId?.email || "No Email"}
                    </p>

                    <p>
                      <strong>Mobile:</strong>{" "}
                      {selectedOrder.userId?.mobile ||
                        selectedOrder.userId?.mobileNumber ||
                        "No Mobile"}
                    </p>
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2">
                  <Accordion.Header>
                    Order Details
                  </Accordion.Header>

                  <Accordion.Body>
                    <p>
                      <strong>Order ID:</strong>{" "}
                      {selectedOrder._id || selectedOrder.id}
                    </p>

                    <p>
                      <strong>Payment Status:</strong>{" "}
                      {selectedOrder.paymentStatus}
                    </p>

                    <p>
                      <strong>Order Status:</strong>{" "}
                      {selectedOrder.orderStatus}
                    </p>

                    <p>
                      <strong>Total Price:</strong> ₹
                      {selectedOrder.totalAmount || 0}
                    </p>

                    <h5>Items</h5>

                    <ul>
                      {selectedOrder.items?.map((item, index) => (
                        <li key={index}>
                          {item.productId?.foodName || "Product"} - ₹
                          {item.price} × {item.quantity}
                        </li>
                      ))}
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default OwnerOrders;

