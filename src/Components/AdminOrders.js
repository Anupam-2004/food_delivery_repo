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
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const AdminOrders = () => {
  // Orders ke liye array
  const [orders, setOrders] = useState([]);

  // Modal ke liye
  const [showModal, setShowModal] = useState(false);

  // Jo order select hua hai
  const [selectedOrder, setSelectedOrder] = useState(null);

  const navigate = useNavigate();

  const { user: currentUser } = useSelector((state) => state.auth);
  console.log("Current User:", currentUser); // Debugging line
  // Orders API
  useEffect(() => {
    axios
      .get("http://localhost:8090/api/orders")
      .then((response) => {
        console.log(response.data);
        setOrders(response.data);
      })
      .catch((error) => {
        console.log("Failed to fetch orders");
        console.log(error);
        alert("Failed to fetch orders");
      });
  }, []);

  // Admin authentication
  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    } else if (currentUser.roles[0] !== "ROLE_ADMIN") {
      navigate("/");
    }
  }, [currentUser, navigate]);

  // Eye button click
  const handleShow = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  // Modal close
  const handleClose = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  return (
    <Container>
      <Row>
        <Col md={1}>
          <Sidebar />
        </Col>

        <Col md={11}>
          <h1>Orders (Admin)</h1>
        </Col>
      </Row>

      <Row>
        <Col>
          <Breadcrumb>
            <Breadcrumb.Item href="/Dashboard">Dashboard</Breadcrumb.Item>

            <Breadcrumb.Item active>Orders (Admin)</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>

      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr className="owner-order-table-header">
                <th>#</th>
                <th>Restaurant Name</th>
                <th>Customer Name</th>
                <th>Items</th>
                <th>Total Price</th>
                <th>View</th>
                <th>Invoice</th>
              </tr>
            </thead>
            <tbody className="owner-order-table-body">
              {orders.map((order, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>

                  <td>
                    {order.items[0]?.restaurentId?.restaurentName ||
                      "Restaurant"}
                  </td>

                  <td>
                    {order.userId?.firstName || ""}{" "}
                    {order.userId?.lastName || ""}
                  </td>

                  <td>
                    <ul>
                      {order.items?.map((item, itemIndex) => (
                        <li key={itemIndex}>
                          {item.productId?.foodName || "Product"}
                          {" - "}₹{item.price}
                          {" × "}
                          {item.quantity}
                        </li>
                      ))}
                    </ul>
                  </td>

                  <td>₹{order.totalAmount || 0}</td>

                  <td>
                    <Button variant="warning" onClick={() => handleShow(order)}>
                      <FaEye />
                    </Button>
                  </td>

                  <td>
                    <Button
                      variant="success"
                      as={Link}
                      to={`/AdminInvoice/${order.id}`}
                    >
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
              <div>  <p>
            <strong>Customer:</strong> {selectedOrder.userId?.firstName}{" "}
            {selectedOrder.userId?.lastName}
          </p>

          <p>
            <strong>Total Price:</strong> ₹{selectedOrder.totalAmount}
          </p>

          <h5>Items</h5>

          <ul>
            {selectedOrder.items?.map((item, index) => (
              <li key={index}>
                {item.productId?.foodName} : ₹{item.price}
              </li>
            ))}
          </ul></div>
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Restaurent details</Accordion.Header>
                  <Accordion.Body>
                    <p>
                      <strong>restaurent Name:</strong>{" "}
                      {selectedOrder.items[0]?.restaurentId?.restaurentName}
                    </p>

                    <p>
                      <strong>Food Type:</strong>{" "}
                      {selectedOrder.items[0]?.restaurentId?.foodType}
                    </p>
                    <p>
                      <strong>Address1:</strong>{" "}
                      {selectedOrder.items[0]?.restaurentId?.addressLine1}
                    </p>
                    <p>
                      <strong>Address2:</strong>{" "}
                      {selectedOrder.items[0]?.restaurentId?.addressLine2}
                    </p>
                    <p>
                      <strong>Location:</strong>{" "}
                      {selectedOrder.items[0]?.restaurentId?.location}
                    </p>

                    <p>
                      <strong>City:</strong>{" "}
                      {selectedOrder.items[0]?.restaurentId?.city}
                    </p>

                    <p>
                      <strong>State:</strong>{" "}
                      {selectedOrder.items[0]?.restaurentId?.state}
                    </p>
                    <p>
                      <strong>Country:</strong>{" "}
                      {selectedOrder.items[0]?.restaurentId?.country}
                    </p>
                    <p>
                      <strong>Pincode:</strong>{" "}
                      {selectedOrder.items[0]?.restaurentId?.pincode}
                    </p>

                    <p>
                      <strong>Mobile Number:</strong>{" "}
                      {selectedOrder.items[0]?.restaurentId?.mobileNumber}
                    </p>
                    <p>
                      <strong>Email:</strong>{" "}
                      {selectedOrder.items[0]?.restaurentId?.email}
                    </p>

                    <p>
                      <strong>Owner Name:</strong>{" "}
                      {selectedOrder.items[0]?.restaurentId?.ownerName}
                    </p>
                    <p>
                      <strong>Website:</strong>{" "}
                      {selectedOrder.items[0]?.restaurentId?.website}
                    </p>
                    <p>
                      <strong>Descrption:</strong>{" "}
                      {selectedOrder.items[0]?.restaurentId?.description}
                    </p>
                    <p>
                      <strong>Image:</strong>{" "}
                      {/* {selectedOrder.items[0]?.restaurentId?.image} */}
                      <img
                        src={`http://localhost:8090/upload/${selectedOrder.items[0]?.restaurentId?.images[0]}`}
                        alt={selectedOrder.items[0]?.restaurentId?.foodName}
                        className="view_image"
                      />
                    </p>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              <Accordion>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>user details</Accordion.Header>
                  <Accordion.Body>
                    <p>
                      <strong>User Name:</strong>{" "}
                      {selectedOrder.userId?.firstName}{" "}
                      {selectedOrder.userId?.lastName}
                    </p>
                    <p>
                      <strong>id:</strong> {selectedOrder.userId?._id}
                    </p>
                    <p>
                      <strong>Phone Number:</strong>{" "}
                      {selectedOrder.userId?.mobileNumber}
                    </p>
                    <p>
                      <strong>Email:</strong> {selectedOrder.userId?.email}
                    </p>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              <Accordion>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>Product details</Accordion.Header>
                  <Accordion.Body>
                    <p>
                      <strong>product Id:</strong>{" "}
                      {selectedOrder.items[0]?.productId?._id}
                    </p>

                    <p>
                      <strong>User Id:</strong>{" "}
                      {selectedOrder.items[0]?.productId?.userId}
                    </p>
                    <p>
                      <strong>RestaurentId:</strong>{" "}
                      {selectedOrder.items[0]?.productId?.restaurentId}
                    </p>
                    <p>
                      <strong>Food Type:</strong>{" "}
                      {selectedOrder.items[0]?.productId?.foodType}
                    </p>
                    <p>
                      <strong>Food Name:</strong>{" "}
                      {selectedOrder.items[0]?.productId?.foodName}
                    </p>

                    <p>
                      <strong>Price</strong>{" "}
                      {selectedOrder.items[0]?.productId?.price}
                    </p>

                    <p>
                      <strong>Description:</strong>{" "}
                      {selectedOrder.items[0]?.productId?.description}
                    </p>
                    <p>
                      <strong>image:</strong>{" "}
                      {/* {selectedOrder.items[0]?.productId?.imaege} */}
                      <img
                        src={`http://localhost:8090/upload/${selectedOrder.items[0]?.productId?.images[0]}`}
                        alt={selectedOrder.items[0]?.productId?.foodName}
                        className="view_image"
                      />
                    </p>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              <Accordion>
                <Accordion.Item eventKey="3">
                  <Accordion.Header>Address details</Accordion.Header>
                  <Accordion.Body>
                    <p>
                      <strong>User Name:</strong>{" "}
                      {selectedOrder.addressId?.name}
                    </p>
                    <p>
                      <strong>id:</strong> {selectedOrder.addressId?._id}
                    </p>
                    <p>
                      <strong>user Id:</strong>{" "}
                      {selectedOrder.addressId?.userId}
                    </p>
                    <p>
                      <strong>Address Line 1:</strong>{" "}
                      {selectedOrder.addressId?.addressLine1}
                    </p>
                    <p>
                      <strong>Address Line 2:</strong>{" "}
                      {selectedOrder.addressId?.addressLine2}
                    </p>
                    <p>
                      <strong>City:</strong> {selectedOrder.addressId?.city}
                    </p>
                    <p>
                      <strong>District:</strong>{" "}
                      {selectedOrder.addressId?.district}
                    </p>
                    <p>
                      <strong>State:</strong> {selectedOrder.addressId?.state}
                    </p>
                    <p>
                      <strong>Pin code:</strong> {selectedOrder.addressId?.pin}
                    </p>
                    <p>
                      <strong>Phone Number:</strong>{" "}
                      {selectedOrder.addressId?.mobileNumber}
                    </p>
                    <p>
                      <strong>Email:</strong> {selectedOrder.addressId?.email}
                    </p>
                    <p>
                      <strong>Address Type:</strong>{" "}
                      {selectedOrder.addressId?.addressType}
                    </p>
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

export default AdminOrders;
