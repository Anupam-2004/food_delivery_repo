import React from "react";
import { Container, Row, Col, Breadcrumb } from "react-bootstrap";
import { Link } from "react-router";
import Sidebar from "./Sidebar";

const AdminProducts = () => {
  return (
    <Container>
      <Row>
        <Col md={5}>
          <div>Admin Products</div>
          <Sidebar />
        </Col>
        <Col md={7}>
          <h1>Admin Products</h1>
        </Col>
        <Breadcrumb>
          <Breadcrumb.Item href="/Dashboard">
            Dashboard
          </Breadcrumb.Item>

          <Breadcrumb.Item active>Admin Product</Breadcrumb.Item>
        </Breadcrumb>
      </Row>
    </Container>
  );
};

export default AdminProducts;
