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

import Sidebar from "./Sidebar";
import { Link } from "react-router";
import { FaFilePdf } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

const Orders = [
  {
    restaurentName: "KFC",
    CustomerName: "Anupam",
    items: [
      {
        itemName: "Burger",
        quantity: 2,
        price: 10.99,
      },
      {
        itemName: "Biryani",
        quantity: 1,
        price: 200,
      },
      {
        itemName: "French Fries",
        quantity: 2,
        price: 100,
      },
    ],
    totalPrice: 321.99,
  },
  {
    restaurentName: "KFC",
    CustomerName: "Anupam",
    items: [
      {
        itemName: "Burger",
        quantity: 2,
        price: 10.99,
      },
      {
        itemName: "Biryani",
        quantity: 1,
        price: 200,
      },
      {
        itemName: "French Fries",
        quantity: 2,
        price: 100,
      },
    ],
    totalPrice: 321.99,
  },
  {
    restaurentName: "KFC",
    CustomerName: "Anupam",
    items: [
      {
        itemName: "Burger",
        quantity: 2,
        price: 10.99,
      },
      {
        itemName: "Biryani",
        quantity: 1,
        price: 200,
      },
      {
        itemName: "French Fries",
        quantity: 2,
        price: 100,
      },
    ],
    totalPrice: 321.99,
  },
];

const OwnerOrders = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Container>
      <Row>
        <Col md={1}>
          <Sidebar />
        </Col>
        <Col md={11}>
          <h1>Orders(Owner)</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Breadcrumb>
            <Breadcrumb.Item href="/Dashboard">
              Dashboard
            </Breadcrumb.Item>

            <Breadcrumb.Item active>Orders(Owner)</Breadcrumb.Item>
          </Breadcrumb>
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
              {Orders.map((order, index) => (
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

                    <Modal show={show} onHide={handleClose}>
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

export default OwnerOrders;
