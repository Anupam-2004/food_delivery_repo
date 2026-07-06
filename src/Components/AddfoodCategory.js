import React from "react";
import { Container, Row, Col, Breadcrumb } from "react-bootstrap";
import { Link } from "react-router";
import Sidebar from "./Sidebar";

const AddfoodCategory = () => {
  return (
    <Container>
      <Row>
        <Col md={5}>
          <Sidebar />
        </Col>
        <Col md={7}>
          <h1>Add Food Category</h1>
        </Col>
        <Col md={11}>
          <h1>Add Food Category</h1>
          <Breadcrumb>
            <Breadcrumb.Item href="/Dashboard">
              Dashboard
            </Breadcrumb.Item>

            <Breadcrumb.Item active>Add Food Category</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
    </Container>
  );
};

export default AddfoodCategory;
