import React from "react";
import { Col, Container, Row, Button } from "react-bootstrap";

const OrdersHistory = () => {
  return (
    <Container>
      <Row>
        <Col>
        <Button variant="outline-primary">Primary</Button>
      <Button variant="outline-secondary">Secondary</Button>
      <Button variant="outline-success">Success</Button>
      <Button variant="outline-warning">Warning</Button>
      <Button variant="outline-danger">Danger</Button>
      <Button variant="outline-info">Info</Button>
      <Button variant="outline-light">Light</Button>
      <Button variant="outline-dark">Dark</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default OrdersHistory;
