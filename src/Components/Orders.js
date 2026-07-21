import React from "react";
import { Col, Container, Row, Breadcrumb } from "react-bootstrap";
import Sidebar from "./Sidebar";
import { Link } from "react-router";

const Orders = () => {
  return (
    <Container>
      <Row>
        <Col md={1}>
          <Sidebar />
        </Col>
        <Col md={11}>
          <h1>Orders</h1>
        </Col>
        <Breadcrumb>
          <Breadcrumb.Item href="/Dashboard">
            Dashboard
          </Breadcrumb.Item>

          <Breadcrumb.Item active>Orders</Breadcrumb.Item>
        </Breadcrumb>
      </Row>
    </Container>
  );
};

export default Orders;
