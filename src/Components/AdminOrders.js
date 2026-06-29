import React from "react";
import { Col, Container, Row, Breadcrumb } from "react-bootstrap";
import { Link } from "react-router";

const AdminOrders = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h1>AdminOrders</h1>
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
