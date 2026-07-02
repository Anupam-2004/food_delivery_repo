import React from "react";
import { Col, Container, Row, Breadcrumb } from "react-bootstrap";
import { Link } from "react-router";
import Sidebar from "./Sidebar";

const AdminOrders = () => {
  return (
    <Container>
      <Row>
        <Col md={1}>
          <Sidebar />
        </Col>
        <Col md={11}>
          <h1>AdminOrders</h1>
          <Breadcrumb>
            <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>

            <Breadcrumb.Item active>AdminOrders</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <Row>
        <Col>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to={"/Dashboard"}>Dashboard</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Order</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminOrders;
