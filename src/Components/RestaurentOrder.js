import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Badge,
  Container,
  Row,
  Col,
  Spinner,
  Modal,
  Form,
} from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";

const RestaurentOrder = () => {
  const { restaurentId } = useParams();

  const [restaurentOrders, setRestaurentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");

  const getRestaurantOrders = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `http://localhost:8090/api/orders/restaurent/${restaurentId}`,
      );

      console.log("RESTAURANT ORDERS:", response.data);

      const ordersData = Array.isArray(response.data)
        ? response.data
        : [response.data];

      const sortedOrders = ordersData.sort((a, b) => {
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      });

      setRestaurentOrders(sortedOrders);
    } catch (error) {
      console.log("Error fetching restaurant orders:", error);

      setRestaurentOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (restaurentId) {
      getRestaurantOrders();
    }
  }, [restaurentId]);

  const handleOpenStatusModal = (order) => {
    setSelectedOrder(order);

    setSelectedStatus(order.orderStatus || "Pending");

    setShowStatusModal(true);
  };

  const handleCloseStatusModal = () => {
    setShowStatusModal(false);
    setSelectedOrder(null);
    setSelectedStatus("");
  };

  const handleChangeStatus = async () => {
    if (!selectedOrder || !selectedStatus) {
      return;
    }

    const orderId = selectedOrder.id || selectedOrder._id;

    try {
      const response = await axios.put(
        `http://localhost:8090/api/orders/${orderId}`,
        {
          orderStatus: selectedStatus,
        },
      );

      console.log("Status updated:", response.data);

      setRestaurentOrders((prevOrders) =>
        prevOrders
          .map((order) =>
            (order.id || order._id) === orderId
              ? {
                  ...order,
                  orderStatus: selectedStatus,
                }
              : order,
          )

          .sort(
            (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
          ),
      );

      alert(`Order status changed to ${selectedStatus}`);

      handleCloseStatusModal();
    } catch (error) {
      console.log("Change status error:", error);

      alert("Failed to change order status");
    }
  };

  const getStatusVariant = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "warning";

      case "accepted":
        return "primary";

      case "preparing":
        return "info";

      case "out for delivery":
        return "dark";

      case "delivered":
        return "success";

      case "cancelled":
      case "canceled":
        return "danger";

      default:
        return "secondary";
    }
  };

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="primary" />

        <p className="mt-3">Loading restaurant orders...</p>
      </Container>
    );
  }

  if (restaurentOrders.length === 0) {
    return (
      <Container className="text-center py-5">
        <h3>No Orders Found</h3>

        <p className="text-muted">There are no orders for this restaurant.</p>
      </Container>
    );
  }

  return (
    <Container className="mt-4 mb-5">
      {/* HEADER */}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">Restaurant Orders</h2>

          <p className="text-muted mb-0">Latest orders are shown first</p>
        </div>

        <Badge bg="dark" className="px-3 py-2">
          {restaurentOrders.length} Orders
        </Badge>
      </div>

      {restaurentOrders.map((order, index) => {
        const orderId = order.id || order._id;

        const status = order.orderStatus?.toLowerCase();

        return (
          <Card className="mb-4 shadow-sm border-0" key={orderId || index}>
            <Card.Body>
            

              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <small className="text-muted">ORDER</small>

                  <h5 className="fw-bold mb-1">#{orderId}</h5>

                  {order.createdAt && (
                    <small className="text-muted">
                      Ordered on:{" "}
                      {new Date(order.createdAt).toLocaleString("en-IN")}
                    </small>
                  )}
                </div>

                <Badge
                  bg={getStatusVariant(order.orderStatus)}
                  className="px-3 py-2"
                >
                  {order.orderStatus || "Pending"}
                </Badge>
              </div>

              <hr />


              {order.userId && (
                <div className="mb-4">
                  <h6 className="fw-bold">Customer Details</h6>

                  <Row>
                    <Col md={4}>
                      <small className="text-muted">Customer Name</small>

                      <p className="mb-0 fw-semibold">
                        {order.userId.firstName || ""}{" "}
                        {order.userId.lastName || ""}
                      </p>
                    </Col>

                    <Col md={4}>
                      <small className="text-muted">Email</small>

                      <p className="mb-0">{order.userId.email || "N/A"}</p>
                    </Col>

                    <Col md={4}>
                      <small className="text-muted">Mobile</small>

                      <p className="mb-0">
                        {order.userId.mobile || order.userId.phone || "N/A"}
                      </p>
                    </Col>
                  </Row>
                </div>
              )}

              {/* =================================
                    DELIVERY ADDRESS
                ================================= */}

              {order.addressId && (
                <div className="mb-4">
                  <h6 className="fw-bold">Delivery Address</h6>

                  <div className="p-3 bg-light rounded">
                    <p className="mb-1">{order.addressId.addressLine1 || ""}</p>

                    {order.addressId.addressLine2 && (
                      <p className="mb-1">{order.addressId.addressLine2}</p>
                    )}

                    <p className="mb-0">
                      {order.addressId.city || ""} {order.addressId.state || ""}
                      {" - "}
                      {order.addressId.pincode || ""}
                    </p>
                  </div>
                </div>
              )}

              {/* =================================
                    ORDERED ITEMS
                ================================= */}

              <h6 className="fw-bold mb-3">Ordered Items</h6>

              {order.items?.map((item, itemIndex) => {
                const product = item.productId;

                const itemTotal =
                  Number(item.price || 0) * Number(item.quantity || 0);

                return (
                  <div
                    key={item._id || itemIndex}
                    className="border rounded p-3 mb-3"
                  >
                    <Row className="align-items-center">
                      {/* IMAGE */}

                      <Col md={2}>
                        <img
                          src={
                            product?.images?.length
                              ? `http://localhost:8090/upload/${product.images[0]}`
                              : "/food-placeholder.png"
                          }
                          alt={product?.foodName || "Food"}
                          style={{
                            width: "90px",
                            height: "90px",
                            objectFit: "cover",
                            borderRadius: "10px",
                          }}
                        />
                      </Col>

                      {/* PRODUCT */}

                      <Col md={5}>
                        <h6 className="fw-bold">
                          {product?.foodName ||
                            product?.productName ||
                            product?.name ||
                            "Food Item"}
                        </h6>

                        <p className="mb-1 text-muted">
                          Quantity: {item.quantity}
                        </p>
                      </Col>

                      {/* UNIT PRICE */}

                      <Col md={2}>
                        <small className="text-muted">Unit Price</small>

                        <p className="fw-semibold mb-0">
                          ₹{Number(item.price || 0).toFixed(2)}
                        </p>
                      </Col>

                      {/* ITEM TOTAL */}

                      <Col md={3} className="text-end">
                        <small className="text-muted">Item Total</small>

                        <h6 className="fw-bold">₹{itemTotal.toFixed(2)}</h6>
                      </Col>
                    </Row>
                  </div>
                );
              })}

              <hr />

              <Row className="mb-4">
                <Col md={4}>
                  <small className="text-muted">Payment Method</small>

                  <p className="fw-semibold mb-0">
                    {order.paymentMethod || "N/A"}
                  </p>
                </Col>

                <Col md={4}>
                  <small className="text-muted">Payment Status</small>

                  <p className="fw-semibold mb-0">
                    {order.paymentStatus || "N/A"}
                  </p>
                </Col>

                <Col md={4}>
                  <small className="text-muted">Order Total</small>

                  <h5 className="fw-bold text-primary">
                    ₹{Number(order.totalAmount || order.price || 0).toFixed(2)}
                  </h5>
                </Col>
              </Row>

            

              {status !== "delivered" &&
                status !== "cancelled" &&
                status !== "canceled" && (
                  <Button
                    variant="primary"
                    onClick={() => handleOpenStatusModal(order)}
                  >
                    Change Order Status
                  </Button>
                )}
            </Card.Body>
          </Card>
        );
      })}

   

      <Modal show={showStatusModal} onHide={handleCloseStatusModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Change Order Status</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {selectedOrder && (
            <>
              <div className="mb-3">
                <small className="text-muted">Order ID</small>

                <h5 className="fw-bold">
                  #{selectedOrder.id || selectedOrder._id}
                </h5>
              </div>

              <div className="mb-3">
                <small className="text-muted">Current Status</small>

                <div className="mt-1">
                  <Badge bg={getStatusVariant(selectedOrder.orderStatus)}>
                    {selectedOrder.orderStatus}
                  </Badge>
                </div>
              </div>

              <Form.Group>
                <Form.Label className="fw-semibold">
                  Select New Status
                </Form.Label>

                <Form.Select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="Pending">Pending</option>

                  <option value="Accepted">Accepted</option>

                  <option value="Preparing">Preparing</option>

                  <option value="Out for Delivery">Out for Delivery</option>

                  <option value="Delivered">Delivered</option>

                  <option value="Cancelled">Cancelled</option>
                </Form.Select>
              </Form.Group>
            </>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseStatusModal}>
            Close
          </Button>

          <Button variant="primary" onClick={handleChangeStatus}>
            Update Status
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default RestaurentOrder;
