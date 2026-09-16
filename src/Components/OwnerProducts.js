
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
import {
  FaArrowLeft,
  FaEdit,
  FaTrash,
  FaPlus,
} from "react-icons/fa";

import "./OwnerProducts.css";

const API_URL = "http://localhost:8090/api";

const OwnerProducts = () => {
  const navigate = useNavigate();

  const { user: currentUser } = useSelector(
    (state) => state.auth
  );

  const userId = currentUser?._id || currentUser?.id;

  const [restaurent, setRestaurent] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOwnerProducts = () => {
      if (!userId) {
        setError("User ID not found. Please login again.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");

      console.log("Logged in User ID:", userId);

      axios
        .get(`${API_URL}/restaurents/user/${userId}`)
        .then((restaurantResponse) => {
          console.log(
            "Restaurant Response:",
            restaurantResponse.data
          );

          let restaurantData = restaurantResponse.data;

          if (Array.isArray(restaurantData)) {
            restaurantData = restaurantData[0];
          }

          if (restaurantData?.restaurent) {
            restaurantData = restaurantData.restaurent;
          }

          if (restaurantData?.restaurant) {
            restaurantData = restaurantData.restaurant;
          }

          if (!restaurantData) {
            throw new Error(
              "No restaurant found for this owner."
            );
          }

          const restaurantId =
            restaurantData._id ||
            restaurantData.id;

          console.log(
            "Restaurant Object:",
            restaurantData
          );

          console.log(
            "Restaurant ID:",
            restaurantId
          );

          if (!restaurantId) {
            throw new Error(
              "Restaurant ID is missing."
            );
          }

          setRestaurent(restaurantData);

          return axios.get(
            `${API_URL}/products/restaurant/${restaurantId}`
          );
        })
        .then((productResponse) => {
          console.log(
            "Products Response:",
            productResponse.data
          );

          let productData = productResponse.data;

          if (Array.isArray(productData)) {
            setProducts(productData);
          } else if (
            Array.isArray(productData?.products)
          ) {
            setProducts(productData.products);
          } else {
            setProducts([]);
          }

          setLoading(false);
        })
        .catch((err) => {
          console.error(
            "Owner Products Error:",
            err
          );

          console.error(
            "Error Response:",
            err.response?.data
          );

          console.error(
            "Error Status:",
            err.response?.status
          );

          setError(
            err.message ||
              "Failed to fetch products."
          );

          setLoading(false);
        });
    };

    fetchOwnerProducts();
  }, [userId]);

  const handleDelete = (productId) => {
    if (!productId) {
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {
      return;
    }

    axios
      .delete(`${API_URL}/products/${productId}`)
      .then((response) => {
        console.log(
          "Product deleted:",
          response.data
        );

        setProducts((previousProducts) =>
          previousProducts.filter(
            (product) =>
              (product._id || product.id) !==
              productId
          )
        );
      })
      .catch((err) => {
        console.error(
          "Delete Product Error:",
          err
        );

        alert("Failed to delete product.");
      });
  };

  if (loading) {
    return (
      <div className="owner-products-loading">
        <Spinner
          animation="border"
          variant="danger"
        />
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          {error}
        </Alert>

        <Button
          variant="secondary"
          onClick={() =>
            navigate("/OwnerDashboard")
          }
        >
          <FaArrowLeft className="me-2" />
          Back to Dashboard
        </Button>
      </Container>
    );
  }

  return (
    <div className="owner-products-page">
      <Container fluid>
        <Row className="align-items-center mb-4">
          <Col md={6}>
            <Button
              variant="outline-secondary"
              className="owner-back-btn mb-3"
              onClick={() =>
                navigate("/OwnerDashboard")
              }
            >
              <FaArrowLeft className="me-2" />
              Back
            </Button>

            <div className="owner-products-header">
              <h2>My Products</h2>
              <p>
                Manage products of your restaurant
              </p>
            </div>
          </Col>

          <Col
            md={6}
            className="text-md-end mt-3 mt-md-0"
          >
            <Button
              variant="danger"
              className="owner-add-product-btn"
              onClick={() =>
                navigate("/AddProduct")
              }
            >
              <FaPlus className="me-2" />
              Add Product
            </Button>
          </Col>
        </Row>

        <Card className="restaurant-info-card mb-4">
          <Card.Body>
            <Row className="align-items-center">
              <Col md={8}>
                <h4 className="restaurant-info-name">
                  {restaurent?.restaurentName ||
                    "My Restaurant"}
                </h4>

                <p className="restaurant-info-location">
                  {restaurent?.addressLine1 &&
                    `${restaurent.addressLine1}, `}

                  {restaurent?.city || ""}

                  {restaurent?.state &&
                    `, ${restaurent.state}`}
                </p>
              </Col>

              <Col
                md={4}
                className="text-md-end mt-3 mt-md-0"
              >
                <Badge
                  bg={
                    restaurent?.active
                      ? "success"
                      : "secondary"
                  }
                  className="status-badge"
                >
                  {restaurent?.active
                    ? "Active"
                    : "Inactive"}
                </Badge>
              </Col>
            </Row>
          </Card.Body>
        </Card>

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
                  {products.map(
                    (product, index) => {
                      const productId =
                        product._id ||
                        product.id;

                      const imageName =
                        Array.isArray(
                          product.images
                        )
                          ? product.images[0]
                          : null;

                      return (
                        <tr
                          key={
                            productId || index
                          }
                        >
                          <td>{index + 1}</td>

                          <td>
                            {imageName ? (
                              <img
                                src={`${API_URL.replace(
                                  "/api",
                                  ""
                                )}/upload/${imageName}`}
                                alt={
                                  product.foodName ||
                                  "Product"
                                }
                                className="owner-product-image"
                              />
                            ) : (
                              <div className="no-product-image">
                                No Image
                              </div>
                            )}
                          </td>

                          <td>
                            <strong className="owner-product-name">
                              {product.foodName ||
                                product.productName ||
                                "No Name"}
                            </strong>
                          </td>

                          <td>
                            <span className="owner-product-category">
                              {product.category ||
                                "No Category"}
                            </span>
                          </td>

                          <td>
                            <Badge
                              className="food-type-badge"
                              bg={
                                product.foodType ===
                                  "Veg" ||
                                product.foodType ===
                                  "Pure Veg"
                                  ? "success"
                                  : "danger"
                              }
                            >
                              {product.foodType ||
                                "Unknown"}
                            </Badge>
                          </td>

                          <td>
                            <span className="owner-product-price">
                              ₹
                              {product.price ||
                                0}
                            </span>
                          </td>

                          <td>
                            <Badge
                              className="status-badge"
                              bg={
                                product.active
                                  ? "success"
                                  : "secondary"
                              }
                            >
                              {product.active
                                ? "Active"
                                : "Inactive"}
                            </Badge>
                          </td>

                          <td>
                            <Button
                              size="sm"
                              variant="outline-primary"
                              className="product-edit-btn me-2"
                              disabled={!productId}
                              onClick={() =>
                                navigate(
                                  `/EditProduct/${productId}`
                                )
                              }
                            >
                              <FaEdit />
                            </Button>

                            <Button
                              size="sm"
                              variant="outline-danger"
                              className="product-delete-btn"
                              disabled={!productId}
                              onClick={() =>
                                handleDelete(
                                  productId
                                )
                              }
                            >
                              <FaTrash />
                            </Button>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </Table>
            ) : (
              <div className="no-products text-center py-5">
                <h5>No Products Available</h5>

                <p>
                  You haven't added any products
                  to this restaurant yet.
                </p>

                <Button
                  variant="danger"
                  onClick={() =>
                    navigate("/AddProduct")
                  }
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
