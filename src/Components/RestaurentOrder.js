import React, { useState, useEffect } from "react";
import { Card, Button, Badge } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";

const RestaurentOrder = () => {
  // const { orderId } = useParams();
  const { restaurentId } = useParams();

  const [restaurentOrders, setRestaurentOrders] = useState();
  useEffect(() => {
    axios
      .get(`http://localhost:8090/api/orders/restaurent/${restaurentId}`)
      .then((response) => {
        console.log(response.data);
        setRestaurentOrders(response.data);
      })
      .catch((error) => {
        console.log(error);
        console.error("Error fetching restaurant orders:", error);
      });
  }, [restaurentId]);
  const handleAcceptOrder = async (orderId) => {
    try {
      const response = await axios.put(
        `http://localhost:8090/api/orders/${orderId}`,
        {
          orderStatus: "Accepted",
        },
      );

      console.log("Order accepted:", response.data);
      alert("order accepted");
    } catch (error) {
      console.log("Accept order error:", error);
      alert("error");
    }
  };
  const handleCancelOrder = async (orderId) => {
    try {
      const response = await axios.put(
        `http://localhost:8090/api/orders/${orderId}`,
        {
          orderStatus: "Cancelled",
        },
      );

      console.log("Order cancelled:", response.data);
      alert("cancel");
    } catch (error) {
      console.log("Cancel order error:", error);
      alert("cancel error");
    }
  };
  

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Restaurant Orders</h2>

      {restaurentOrders
        ? restaurentOrders.map((order, index) => {
            return (
              <Card className="mb-4 shadow-sm" key={ index}>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                      <h5>Order #{index + 1}</h5>
                    </div>
                    <h3 className="text-center fw-bold mb-4">Ordered Items</h3>
                    <Badge bg="warning" text="dark">
                      {order.orderStatus}
                    </Badge>
                  </div>

                  <hr />

                  <div className="d-flex justify-content-between">
                    <strong>Product:</strong>

                    <strong> {order.items[0].productId?.foodName}</strong>
                  </div>

                  <div className="d-flex justify-content-between">
                    <strong>Quantity:</strong>

                    <strong>{order.items[0].quantity}</strong>
                  </div>

                  <p className="mb-0">
                    <strong>Price:</strong> ₹{order.items[0].price}
                  </p>

                  <div className="mt-3">
                    <div className="d-flex justify-content-between">
                      <strong>Order Total</strong>

                      <strong>₹{order.totalAmount}</strong>
                    </div>

                    <div className="d-flex justify-content-between mt-2">
                      <span>Payment Method</span>
                      <span>{order.paymentMethod}</span>
                    </div>

                    <div className="d-flex justify-content-between">
                      <span>Payment Status</span>
                      <span>{order.paymentStatus}</span>
                    </div>
                  </div>

                  <Button
                    variant="success"
                    className="me-2"
                    onClick={() => handleAcceptOrder(order.id)}
                  >
                    Accept Order
                  </Button>

                  <Button
                    variant="danger"
                    onClick={() => handleCancelOrder(order.id)}
                  >
                    Cancel Order
                  </Button>
                </Card.Body>
              </Card>
            );
          })
        : ""}
    </div>
  );
};

export default RestaurentOrder;
