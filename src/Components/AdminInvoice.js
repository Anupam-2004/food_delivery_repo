import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Table, Button } from "react-bootstrap";

import {
  FaPrint,
  FaDownload,
  FaArrowLeft,
  FaCheckCircle,
} from "react-icons/fa";

import "./AdminInvoice.css";

import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const AdminInvoice = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getOrder = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8090/api/orders/${orderId}`,
        );
        console.log(response.data);
        setOrder(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      getOrder();
    }
  }, [orderId]);

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <h4>Loading Invoice...</h4>
      </Container>
    );
  }

  if (!order) {
    return (
      <Container className="mt-5 text-center">
        <h4>Order not found</h4>
      </Container>
    );
  }
  const restaurant = order.items?.[0]?.restaurentId;

  const handlePrint = () => {
    window.print();
  };
  const handleBack = () => {
    navigate("/AdminOrders");
  };
  const handleDownloadPDF = () => {
    // Implement PDF download functionality here
    window.alert("PDF download functionality not implemented");
  };

  return (
    <div className="invoice-page">
      <Container fluid="lg">
        <div className="invoice-actions">
          <Button variant="light" className="back-btn" onClick={handleBack}>
            <FaArrowLeft /> Back to Orders
          </Button>

          <div>
            <Button
              variant="outline-dark"
              className="me-2"
              onClick={handlePrint}
            >
              <FaPrint className="me-2" />
              Print Invoice
            </Button>

            <Button variant="dark" onClick={handleDownloadPDF}>
              <FaDownload className="me-2" />
              Download PDF
            </Button>
          </div>
        </div>

        <Card className="invoice-card" id="invoice">
          <div className="invoice-header">
            <Row className="align-items-center">
              <Col md={7}>
                <div className="brand-section">
                  <div className="restaurant-logo">🍴</div>

                  <div>
                      <h2>{restaurant?.restaurentName}</h2>

                    {/* <p>
                      <strong>Address:</strong> {restaurant?.addressLine1},{" "}
                      {restaurant?.addressLine2}, {restaurant?.city},{" "}
                      {restaurant?.state} - {restaurant?.pincode}
                    </p>

                    <p>
                      Phone: {restaurant?.mobileNumber} | {restaurant?.email}
                    </p> */}
                  </div>
                </div>
              </Col>

              <Col md={5} className="text-md-end mt-3 mt-md-0">
                <h1>INVOICE</h1>

                <p className="invoice-number">#{order.id}</p>

                <p className="invoice-date">Date: {order.createdAt}</p>
              </Col>
            </Row>
          </div>

          <div className="invoice-info">
            <Row>
              <Col md={6}>
                <div className="info-box">
                  <h6>BILL TO</h6>

                  <h5>{order.addressId.name}</h5>

                  <p>
                    <strong>Phone:</strong> {order.addressId.mobile}
                  </p>

                  <p>
                    <strong>Email:</strong> {order.addressId.email}
                  </p>

                  <p>
                    <strong>Address:</strong> {order.addressId.addressLine1}
                    {order.addressId.addressLine2}, {order.addressId.city},{" "}
                    {order.addressId.state}
                    {" - "}
                    {order.addressId.pin}
                  </p>
                </div>
              </Col>

              {/* ORDER DETAILS */}

              <Col md={6}>
                <div className="info-box order-info">
                  <h6>ORDER DETAILS</h6>

                  <p>
                    <strong>Order ID:</strong> #{order.id}
                  </p>

                  <p>
                    <strong>Payment:</strong> Not Available
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    <span className="status-paid">
                      <FaCheckCircle /> {order.paymentStatus}
                    </span>
                  </p>
                </div>
              </Col>
            </Row>
          </div>

          <div className="status-row">
            <div>
              <span>Order Status</span>

              <strong className="delivered-status">{order.orderStatus}</strong>
            </div>

            <div>
              <span>Payment Status</span>

              <strong className="paid-status">{order.paymentStatus}</strong>
            </div>
          </div>

          <div className="invoice-items">
            <h5>Order Items</h5>

            <Table responsive className="items-table">
              <thead>
                <tr>
                  <th>#</th>

                  <th>ITEM</th>

                  <th className="text-center">QTY</th>

                  <th className="text-end">PRICE</th>

                  <th className="text-end">TOTAL</th>
                </tr>
              </thead>

              <tbody>
                {order.items?.map((item, index) => {
                  const itemTotal = item.quantity * item.price;

                  return (
                    <tr key={item._id}>
                      <td>{index + 1}</td>

                      <td>
                        <strong>{item.productId?.foodName}</strong>
                      </td>

                      <td className="text-center">{item.quantity}</td>

                      <td className="text-end">₹{item.price}</td>

                      <td className="text-end fw-bold">₹{item.totalAmount}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>

          <Row className="justify-content-end">
            <Col md={5}>
              <div className="price-summary">
                <div className="summary-row">
                  <span>Subtotal</span>

                  {/* <strong>₹{subtotal}</strong> */}
                </div>

                <div className="summary-row">
                  <span>Delivery Fee</span>

                  <strong>₹0</strong>
                </div>

                <div className="summary-row discount">
                  <span>Discount</span>

                  <strong>- ₹0</strong>
                </div>

                <div className="summary-row">
                  <span>Tax / GST</span>

                  <strong>₹0</strong>
                </div>

                <hr />

                <div className="grand-total">
                  <span>Grand Total</span>

                  <strong>₹{order.totalAmount}</strong>
                </div>
              </div>
            </Col>
          </Row>

          <div className="invoice-footer">
            <div>
              <h6>Payment Status</h6>

              <p className="footer-paid">
                <FaCheckCircle /> {order.paymentStatus}
              </p>
            </div>

            <div className="text-md-end">
              <h6>Thank You!</h6>

              <p>Thank you for ordering with us.</p>
            </div>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default AdminInvoice;
