import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import axios from "axios";

const Restaurents = () => {
  const [restaurents, setRestaurents] = useState([]);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8090/api/restaurents")
      .then((response) => {
        console.log("data comes from backend :", response.data);
        setRestaurents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Container>
      <Row>
        <Col md={1}>
          <Sidebar />
        </Col>
        <Col md={11}></Col>
      </Row>

      <Row>
        {restaurents.map((restaurent, index) => (
          <Col md={4} key={index}>
            <Card
              as={Link}
              to={`/ViewRestaurent/${restaurent.id}`}

              className="restaurents_info"
            >
              
                <Card.Img
                  variant="top"
                  key={index}
                  src={`http://localhost:8090/upload/${restaurent.images[0]}`}
                  alt=""
                />
            
              <Card.Body>
                <Card.Text className="restaurents_text">
                  {restaurent.restaurentName}
                </Card.Text>
                <Card.Text>{restaurent.addressLine1}</Card.Text>
                <Card.Text>{restaurent.location}</Card.Text>
                <Button className="restaurent_btn">View</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Restaurents;
