import React from "react";
import { Col, Container, Row, Breadcrumb,Card } from "react-bootstrap";
import Sidebar from "./Sidebar";
import { Link } from "react-router";

const Orders = () => {
  // const handleClick = () => {
  //   // Navigate to the RestaurentOrder page
  //   window.location.href = "/RestaurentOrder";
  // }
  // const [placeorder, setPlaceorder] = React.useState(false);

 
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
      <Row>
        <Col>
        <h2>Order placed successfully</h2>
        <Card>
<Col>

</Col>
<Col>

</Col>
        </Card>

        </Col>
      </Row>
    </Container>
  );
};

export default Orders;
