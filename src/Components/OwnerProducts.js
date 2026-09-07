import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Spinner,
  Alert,
  Table,
} from "react-bootstrap";
import { useSelector } from "react-redux";

import axios from "axios";
import { useNavigate } from "react-router-dom";

import { FaArrowLeft, FaEdit, FaTrash, FaPlus } from "react-icons/fa";

import "./OwnerProducts.css";

const OwnerProducts = () => {
  const navigate = useNavigate();
 
const {user:currentUser} = useSelector((state) => state.auth);
  const userId = currentUser?._id;
  const [restaurent, setRestaurent] = useState(null);
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8090/api/restaurents/user/${userId}`)
      .then((response) => {
        console.log("Restaurant Response:", response.data);
        setRestaurent(response.data);

        if (!response.data) {
          setError("No restaurant found for this owner");
          setLoading(false);
          return;
        }
        console.log("User id:", userId);

        setRestaurent(response.data);
      })
      .catch((error) => {
        console.log("Failed to fetch restaurant");
        console.log(error);

        setError("Failed to fetch restaurant");
        setLoading(false);
      });
  }, [userId]);

 

  useEffect(() => {
    if (!userId) {
      return;
    }

    axios
      .get(`http://localhost:8090/api/products/restaurant/${userId}`)
      .then((response) => {
        console.log("Products Response:", response.data);

        const productData = Array.isArray(response.data)
          ? response.data
          : response.data?.products || [];

        setProducts(productData);

        setLoading(false);
      })
      .catch((error) => {
        console.log("Failed to fetch products");
        console.log(error);

        setError("Failed to fetch products");

        setLoading(false);
      });
  }, [userId]);

 

  if (loading) {
    return (
      <div className="owner-products-loading">
        {" "}
        <Spinner animation="border" variant="danger" />
        <p>Loading products...</p>
      </div>
    );
  }

  /* =========================================
ERROR
========================================= */

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>

        <Button variant="secondary" onClick={() => navigate("/OwnerDashboard")}>
          <FaArrowLeft className="me-2" />
          Back to Dashboard
        </Button>
      </Container>
    );
  }

  return (
    <div className="owner-products-page">
      <Container fluid>
        {/* ================= HEADER ================= */}

        <Row className="align-items-center mb-4">
          <Col md={6}>
            <Button
              variant="outline-secondary"
              className="owner-back-btn mb-3"
              onClick={() => navigate("/OwnerDashboard")}
            >
              <FaArrowLeft className="me-2" />
              Back
            </Button>

            <div className="owner-products-header">
              <h2>My Products</h2>

              <p>Manage products of your restaurant</p>
            </div>
          </Col>

          <Col md={6} className="text-md-end mt-3 mt-md-0">
            <Button
              variant="danger"
              className="owner-add-product-btn"
              onClick={() => navigate("/AddProduct")}
            >
              <FaPlus className="me-2" />
              Add Product
            </Button>
          </Col>
        </Row>

        {/* ================= RESTAURANT INFO ================= */}

        <Card className="restaurant-info-card mb-4">
          <Card.Body>
            <Row className="align-items-center">
              <Col md={8}>
                <h4 className="restaurant-info-name">
                  {restaurent?.restaurentName || "My Restaurant"}
                </h4>

                <p className="restaurant-info-location">
                  {restaurent?.addressLine1 && `${restaurent.addressLine1}, `}

                  {restaurent?.city || ""}

                  {restaurent?.state && `, ${restaurent.state}`}
                </p>
              </Col>

              <Col md={4} className="text-md-end mt-3 mt-md-0">
                <Badge
                  bg={restaurent?.active ? "success" : "secondary"}
                  className="status-badge"
                >
                  {restaurent?.active ? "Active" : "Inactive"}
                </Badge>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* ================= PRODUCTS TABLE ================= */}

        <Card className="products-table-card">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="products-table-title">
                Products ({products.length})
              </h4>
            </div>

            {products.length > 0 ? (
              <Table
                responsive
                hover
                className="owner-products-table align-middle"
              >
                <thead>
                  <tr>
                    <th>#</th>

                    <th>Image</th>

                    <th>Food Name</th>

                    <th>Category</th>

                    <th>Food Type</th>

                    <th>Price</th>

                    <th>Status</th>

                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((product, index) => (
                    <tr key={product._id || product.id || index}>
                      {/* NUMBER */}

                      <td>{index + 1}</td>

                      {/* IMAGE */}

                      <td>
                        {product.images?.[0] ? (
                          <img
                            className="owner-product-image"
                            src={`http://localhost:8090/upload/${product.images[0]}`}
                            alt={
                              product.foodName ||
                              product.productName ||
                              "Product"
                            }
                          />
                        ) : (
                          <div className="no-product-image">No Image</div>
                        )}
                      </td>

                      {/* FOOD NAME */}

                      <td>
                        <strong className="owner-product-name">
                          {product.foodName || product.productName || "No Name"}
                        </strong>
                      </td>

                      {/* CATEGORY */}

                      <td>
                        <span className="owner-product-category">
                          {product.category || "No Category"}
                        </span>
                      </td>

                      {/* FOOD TYPE */}

                      <td>
                        <Badge
                          className="food-type-badge"
                          bg={product.foodType === "Veg" ? "success" : "danger"}
                        >
                          {product.foodType || "Unknown"}
                        </Badge>
                      </td>

                      {/* PRICE */}

                      <td>
                        <span className="owner-product-price">
                          ₹{product.price || 0}
                        </span>
                      </td>

                      {/* STATUS */}

                      <td>
                        <Badge
                          className="status-badge"
                          bg={product.active ? "success" : "secondary"}
                        >
                          {product.active ? "Active" : "Inactive"}
                        </Badge>
                      </td>

                      {/* ACTION */}

                      <td>
                        <Button
                          size="sm"
                          variant="outline-primary"
                          className="product-edit-btn me-2"
                          onClick={() =>
                            navigate(
                              `/EditProduct/${product._id || product.id}`,
                            )
                          }
                        >
                          <FaEdit />
                        </Button>

                        <Button
                          size="sm"
                          variant="outline-danger"
                          className="product-delete-btn"
                        >
                          <FaTrash />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <div className="no-products">
                <h5>No Products Available</h5>

                <p>You haven't added any products to this restaurant yet.</p>

                <Button
                  variant="danger"
                  onClick={() => navigate("/AddProduct")}
                >
                  <FaPlus className="me-2" />
                  Add Your First Product
                </Button>
              </div>
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default OwnerProducts;
