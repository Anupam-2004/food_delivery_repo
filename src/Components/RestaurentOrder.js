
import React from "react";
import { Card, Button, Badge } from "react-bootstrap";

const Orders = [
  {
    userId: 1,
    addressId: 15,
    orders: [
      {
        restaurantId: 5,
        items: [
          {
            productId: 101,
            quantity: 2,
            price: 250,
          },
          {
            productId: 102,
            quantity: 1,
            price: 80,
          },
        ],
        totalAmount: 580,
        orderStatus: "PLACED",
      },
      {
        restaurantId: 8,
        items: [
          {
            productId: 201,
            quantity: 1,
            price: 280,
          },
        ],
        totalAmount: 280,
        orderStatus: "PLACED",
      },
    ],
    grandTotal: 860,
    paymentMethod: "COD",
    paymentStatus: "PENDING",
  },

  {
    userId: 2,
    addressId: 22,
    orders: [
      {
        restaurantId: 3,
        items: [
          {
            productId: 301,
            quantity: 1,
            price: 350,
          },
          {
            productId: 302,
            quantity: 2,
            price: 60,
          },
        ],
        totalAmount: 470,
        orderStatus: "CONFIRMED",
      },
      {
        restaurantId: 7,
        items: [
          {
            productId: 401,
            quantity: 1,
            price: 220,
          },
        ],
        totalAmount: 220,
        orderStatus: "CONFIRMED",
      },
    ],
    grandTotal: 690,
    paymentMethod: "ONLINE",
    paymentStatus: "PAID",
  },

  {
    userId: 3,
    addressId: 31,
    orders: [
      {
        restaurantId: 4,
        items: [
          {
            productId: 501,
            quantity: 2,
            price: 180,
          },
        ],
        totalAmount: 360,
        orderStatus: "PREPARING",
      },
      {
        restaurantId: 9,
        items: [
          {
            productId: 601,
            quantity: 1,
            price: 300,
          },
          {
            productId: 602,
            quantity: 1,
            price: 120,
          },
        ],
        totalAmount: 420,
        orderStatus: "PREPARING",
      },
    ],
    grandTotal: 780,
    paymentMethod: "ONLINE",
    paymentStatus: "PAID",
  },{
    userId: 1,
    addressId: 15,
    orders: [
      {
        restaurantId: 5,
        items: [
          {
            productId: 101,
            quantity: 2,
            price: 250,
          },
          {
            productId: 102,
            quantity: 1,
            price: 80,
          },
        ],
        totalAmount: 580,
        orderStatus: "PLACED",
      },
      {
        restaurantId: 8,
        items: [
          {
            productId: 201,
            quantity: 1,
            price: 280,
          },
        ],
        totalAmount: 280,
        orderStatus: "PLACED",
      },
    ],
    grandTotal: 860,
    paymentMethod: "COD",
    paymentStatus: "PENDING",
  },

  {
    userId: 2,
    addressId: 22,
    orders: [
      {
        restaurantId: 3,
        items: [
          {
            productId: 301,
            quantity: 1,
            price: 350,
          },
          {
            productId: 302,
            quantity: 2,
            price: 60,
          },
        ],
        totalAmount: 470,
        orderStatus: "CONFIRMED",
      },
      {
        restaurantId: 7,
        items: [
          {
            productId: 401,
            quantity: 1,
            price: 220,
          },
        ],
        totalAmount: 220,
        orderStatus: "CONFIRMED",
      },
    ],
    grandTotal: 690,
    paymentMethod: "ONLINE",
    paymentStatus: "PAID",
  },

  {
    userId: 3,
    addressId: 31,
    orders: [
      {
        restaurantId: 4,
        items: [
          {
            productId: 501,
            quantity: 2,
            price: 180,
          },
        ],
        totalAmount: 360,
        orderStatus: "PREPARING",
      },
      {
        restaurantId: 9,
        items: [
          {
            productId: 601,
            quantity: 1,
            price: 300,
          },
          {
            productId: 602,
            quantity: 1,
            price: 120,
          },
        ],
        totalAmount: 420,
        orderStatus: "PREPARING",
      },
    ],
    grandTotal: 780,
    paymentMethod: "ONLINE",
    paymentStatus: "PAID",
  },
];

const RestaurentOrder = () => {
  // Logged-in restaurant ID
  const restaurantId = 5;

  return (
    <div className="container mt-4">

      <h2 className="mb-4">Restaurant Orders</h2>

      {Orders.map((order, index) => {

        // Find this restaurant's order
        const restaurantOrder = order.orders.find(
          (item) => item.restaurantId === restaurantId
        );

        // If this order does not belong to this restaurant
        if (!restaurantOrder) {
          return null;
        }

        return (
          <Card className="mb-4 shadow-sm" key={index}>

            <Card.Body>

              {/* Order Header */}
              <div className="d-flex justify-content-between align-items-center mb-3">

                <div>
                  <h5>Order #{index + 1}</h5>

                  <p className="mb-1">
                    <strong>User ID:</strong> {order.userId}
                  </p>

                  <p className="mb-0">
                    <strong>Address ID:</strong> {order.addressId}
                  </p>
                </div>

                <Badge bg="warning" text="dark">
                  {restaurantOrder.orderStatus}
                </Badge>

              </div>

              <hr />

              {/* Food Items */}
              <h6>Ordered Items</h6>

              {restaurantOrder.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="d-flex justify-content-between border-bottom py-2"
                >
                  <div>
                    <strong>
                      Product ID: {item.productId}
                    </strong>

                    <div className="text-muted">
                      Quantity: {item.quantity}
                    </div>
                  </div>

                  <div>
                    ₹{item.price}
                  </div>
                </div>
              ))}

              {/* Order Information */}
              <div className="mt-3">

                <div className="d-flex justify-content-between">
                  <strong>Order Total</strong>
                  <strong>
                    ₹{restaurantOrder.totalAmount}
                  </strong>
                </div>

                <div className="d-flex justify-content-between mt-2">
                  <span>Payment Method</span>
                  <span>
                    {order.paymentMethod}
                  </span>
                </div>

                <div className="d-flex justify-content-between">
                  <span>Payment Status</span>
                  <span>
                    {order.paymentStatus}
                  </span>
                </div>

              </div>

              {/* Buttons */}
              <div className="mt-3">

                <Button
                  variant="success"
                  className="me-2"
                >
                  Accept Order
                </Button>

                <Button
                  variant="danger"
                >
                  Cancel Order
                </Button>

              </div>

            </Card.Body>

          </Card>
        );
      })}

    </div>
  );
};

export default RestaurentOrder;
