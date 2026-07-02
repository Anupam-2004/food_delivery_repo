import React from "react";
import { Col, Container, Row, Breadcrumb } from "react-bootstrap";
import Sidebar from "./Sidebar";

const AddOrders = () => {
  return (
    <Container>
      <Row>
        <Col md={1}>
          <Sidebar />
        </Col>
        <Col md={11}>
          <h1>AddOrders</h1>
          <Breadcrumb>
            <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
            
            <Breadcrumb.Item active></Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
    </Container>
  );
};

export default AddOrders;
