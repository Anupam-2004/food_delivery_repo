import React from "react";
import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Breadcrumb,
  Table,
  Modal,
  Button,
} from "react-bootstrap";
import axios from "axios";

import Sidebar from "./Sidebar";
import { Link } from "react-router";
import { FaFilePdf } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const AdminOrders = () => {
  const [orders, setOrders] = useState(false);

  const handleClose = () => setOrders(false);
  const handleShow = () => setOrders(true);
 useEffect(() => {
    axios
      .get("http://localhost:8090/api/restaurents")
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
  let navigate = useNavigate();
  const { user: currentUser } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    } else if (currentUser.roles[0] !== "ROLE_ADMIN") {
      navigate("/");
    } else {
      console.log(currentUser);
    }
  }, [currentUser, navigate]);
  return (
    <Container>
      <Row>
        <Col md={1}>
          <Sidebar />
        </Col>
        <Col md={11}>
          <h1>Orders(Admin)</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Col md={11}>
            <Breadcrumb>
              <Breadcrumb.Item href="/Dashboard">Dashboard</Breadcrumb.Item>

              <Breadcrumb.Item active>Orders(Admin)</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Col>
      </Row>

      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr className="owner-order-table-header">
                <th>#</th>
                <th>Restaurent Name</th>
                <th>Customer Name</th>
                <th>Items</th>

                <th>Total Price</th>
                <th>Icon</th>
                <th>Invoice</th>
              </tr>
            </thead>
            <tbody className="owner-order-table-body">
              {orders.map((order, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{order.restaurentName}</td>
                  <td>{order.CustomerName}</td>

                  {/* <td>{order.totalPrice}</td> */}
                  <td>
                    <ul key={index}>
                      {order.items.map((item, index) => {
                        return (
                          <li>
                            {item.itemName},₹ {item.price}
                          </li>
                        );
                      })}
                    </ul>
                  </td>
                  <td>{order.totalPrice}</td>
                  <td>
                    <Button variant="primary" onClick={handleShow}>
                      <FaEye />
                    </Button>

                    <Modal show={orders} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        Woohoo, you are reading this text in a modal!
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                          Save Changes
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </td>
                  <td>
                    <FaFilePdf />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminOrders;
