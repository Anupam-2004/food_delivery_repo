import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";

const Foods = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/products"
      );

      console.log(response.data);

      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  }, []);

  

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Container className="mt-4">
      <Row>
        {products.map((product) => (
          <Col md={4} className="mb-4" key={product.id}>
            <Card>
              {/* Product Image */}
              {product.images?.length > 0 && (
                <Card.Img
                  variant="top"
                  src={`http://localhost:8080/uploads/${product.images[0]}`}
                  height="220"
                  style={{ objectFit: "cover" }}
                />
              )}

              <Card.Body>
                <Card.Title>{product.foodName}</Card.Title>

                <Card.Text>
                  <strong>Category:</strong> {product.category}
                </Card.Text>

                <Card.Text>
                  <strong>Price:</strong> ₹{product.price}
                </Card.Text>

                <Card.Text>
                  <strong>Food Type:</strong> {product.foodType}
                </Card.Text>

                <Card.Text>{product.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Foods;