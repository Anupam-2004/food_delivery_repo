import React, { useEffect, useState } from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Address.css";

import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form as BootstrapForm,
} from "react-bootstrap";

const addressSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "restaurent name must be at least minimum 2 characters")
    .max(50, "restaurent name must not exceed 50 characters")
    .matches(/^[A-Za-z_ .]+$/, "name can only contain letters")
    .required(" restaurent name is Required"),
  addressLine1: Yup.string()
    .min(2, "adressLine1  must be at least minimum 2 characters")
    .max(50, "addressLine1 must not exceed 50 characters")
    .matches(/^[A-Za-z1-9_ .]+$/, "Name can only contain letters")
    .required("addressLine1  is Mandatory"),
  addressLine2: Yup.string()
    .min(2, "addressLine2  must be at least minimum 2 characters")
    .max(50, "addressLine2 must not exceed 50 characters")
    .matches(/^[A-Za-z1-9_ .]+$/, "Name can only contain letters")
    .required("addressLine2  is Mandatory"),
  district: Yup.string()
    .min(2, "location  must be at least minimum 2 characters")
    .max(50, "location must not exceed 50 characters")
    .matches(/^[A-Za-z1-9_ .]+$/, "Name can only contain letters")
    .required("location  is Mandatory"),
  city: Yup.string()
    .min(2, "city  must be at least minimum 2 characters")
    .max(50, "city must not exceed 50 characters")
    .matches(/^[A-Za-z1-9_ .]+$/, "Name can only contain letters")
    .required("city  is Mandatory"),
  state: Yup.string()
    .min(2, "state  must be at least minimum 2 characters")
    .max(50, "state must not exceed 50 characters")
    .matches(/^[A-Za-z1-9_ .]+$/, "Name can only contain letters")
    .required("state  is Mandatory"),
  pin: Yup.string()
    .required("PIN code is required")
    .matches(/^[1-9][0-9]{5}$/, "Enter a valid 6-digit PIN code"),

  mobile: Yup.string().matches(
    /^[6-9]\d{9}$/,
    "enter valid 10 digit numbers",
  ),
  email: Yup.string().matches(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    "Enter a valid email address",
  ),
  

  addressType: Yup.string().required("Required"),

});

const emptyAddress = {
  name: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  district: "",
  state: "",
  pin: "",
  mobile: "",
  email: "",
  addressType: "",
};

const Address = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  const [addresses, setAddresses] = useState([]);
  const [show, setShow] = useState(false);
  const [editAddress, setEditAddress] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState("");
  const navigate = useNavigate();

  const [cart, setCart] = useState({ items: [] });

  const getCart = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8090/api/carts/user/${currentUser.id}`,
      );

      setCart(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      getAddresses();
      getCart();
    }
  }, [currentUser]);
  // Get Address
  const getAddresses = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8090/api/addresses/user/${currentUser.id}`,
      );

      setAddresses(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      getAddresses();
    }
  }, [currentUser]);

  // Open Modal
  const handleShow = () => {
    setEditAddress(null);
    setShow(true);
  };

  // Close Modal
  const handleClose = () => {
    setShow(false);
    setEditAddress(null);
  };

  // Edit
  const handleEdit = (item) => {
    setEditAddress(item);
    setShow(true);
  };

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this address?")) {
      return;
    }

    try {
      await axios.delete(`http://localhost:8090/api/addresses/${id}`);

      getAddresses();
    } catch (error) {
      console.log(error);
    }
  };

  // Save Address
  const handleSubmit = async (values) => {
    const data = {
      ...values,
      userId: currentUser.id,
    };

    try {
      if (editAddress) {
        console.log(editAddress)
        await axios.put(
          `http://localhost:8090/api/addresses/${editAddress.id}`,
          data,
        );
      } else {
        await axios.post("http://localhost:8090/api/addresses", data);
      }

      handleClose();
      getAddresses();
    } catch (error) {
      console.log(error);
    }
  };
  const handleOrder = async () => {
    if (!selectedAddress) {
      alert("Please select an address.");
      return;
    }

    if (cart.items.length === 0) {
      alert("Cart is empty.");
      return;
    }

    const order = {
      userId: currentUser.id,
      addressId: selectedAddress,
      active: true,

      items: cart.items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      })),

      paymentStatus: "pending",
      orderStatus: "processing",
    };

    try {
      const response = await axios.post(
        "http://localhost:8090/api/orders",
        order,
      );

      alert("Order Placed Successfully");

      console.log(response.data);

      await axios.delete(`http://localhost:8090/api/carts/user/${currentUser.id}`);

      navigate("/orders");
    } catch (error) {
      console.log(error.response?.data || error);

      alert("Order Failed");
    }
  };
  const initialValues = editAddress
    ? {
        name: editAddress.name,
        addressLine1: editAddress.addressLine1,
        addressLine2: editAddress.addressLine2,
        city: editAddress.city,
        district: editAddress.district,
        state: editAddress.state,
        pin: editAddress.pin,
        mobile: editAddress.mobile,
        email: editAddress.email,
        addressType: editAddress.addressType,
      }
    : emptyAddress;

  return (
    <Container className="mt-4">
      <Row className="mb-3">
        <Col>
          <h2>Delivery Address</h2>
        </Col>

        <Col className="text-end">
          <Button onClick={handleShow}>Add Address</Button>
        </Col>
      </Row>

      <Row>
        {addresses.length === 0 ? (
          <Col>
            <Card>
              <Card.Body className="text-center">
                <h5>No Address Found</h5>

                <Button className="mt-3" onClick={handleShow}>
                  Add Address
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ) : (
          addresses.map((item) => (
            <Col lg={6} md={6} sm={12} key={item.id} className="mb-3">
              <Card
                className={`address-card ${
                  selectedAddress === item.id ? "selected-card" : ""
                }`}
              >
                <Card.Body>
                  <div className="d-flex justify-content-between">
                    <BootstrapForm.Check
                      type="radio"
                      checked={selectedAddress === item.id}
                      onChange={() => setSelectedAddress(item.id)}
                    />

                    <span className="badge bg-primary">{item.addressType}</span>
                  </div>

                  <hr />

                  <h5>{item.name}</h5>

                  <p>
                    {item.addressLine1}
                    <br />
                    {item.addressLine2}
                  </p>

                  <p>
                    {item.city}, {item.district}, {item.state}
                    {" - "}
                    {item.pin}
                  </p>

                  <p>
                    <strong>Mobile :</strong> {item.mobile}
                  </p>

                  <p>
                    <strong>Email :</strong> {item.email}
                  </p>

                  <div className="mt-3">
                    <Button variant="warning" onClick={() => handleEdit(item)}>
                      Edit
                    </Button>

                    <Button
                      variant="danger"
                      className="ms-2"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
      {/* Modal */}

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editAddress ? "Update Address" : "Add Address"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Formik
            initialValues={initialValues}
            validationSchema={addressSchema}
            enableReinitialize
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <Row>
                  <Col md={6} className="mb-3">
                    <label>Name</label>

                    <Field type="text" name="name" className="form-control" />

                    {errors.name && touched.name && (
                      <small className="text-danger">{errors.name}</small>
                    )}
                  </Col>

                  <Col md={6} className="mb-3">
                    <label>Address Type</label>

                    <Field
                      as="select"
                      name="addressType"
                      className="form-control"
                    >
                      <option value="">Select</option>

                      <option value="Home">Home</option>

                      <option value="Work">Work</option>

                      <option value="Other">Other</option>
                    </Field>

                    {errors.addressType && touched.addressType && (
                      <small className="text-danger">
                        {errors.addressType}
                      </small>
                    )}
                  </Col>

                  <Col md={6} className="mb-3">
                    <label>Address Line 1</label>

                    <Field
                      type="text"
                      name="addressLine1"
                      className="form-control"
                    />

                    {errors.addressLine1 && touched.addressLine1 && (
                      <small className="text-danger">
                        {errors.addressLine1}
                      </small>
                    )}
                  </Col>

                  <Col md={6} className="mb-3">
                    <label>Address Line 2</label>

                    <Field
                      type="text"
                      name="addressLine2"
                      className="form-control"
                    />

                    {errors.addressLine2 && touched.addressLine2 && (
                      <small className="text-danger">
                        {errors.addressLine2}
                      </small>
                    )}
                  </Col>

                  <Col md={6} className="mb-3">
                    <label>City</label>

                    <Field type="text" name="city" className="form-control" />

                    {errors.city && touched.city && (
                      <small className="text-danger">{errors.city}</small>
                    )}
                  </Col>

                  <Col md={6} className="mb-3">
                    <label>District</label>

                    <Field
                      type="text"
                      name="district"
                      className="form-control"
                    />

                    {errors.district && touched.district && (
                      <small className="text-danger">{errors.district}</small>
                    )}
                  </Col>

                  <Col md={6} className="mb-3">
                    <label>State</label>

                    <Field type="text" name="state" className="form-control" />

                    {errors.state && touched.state && (
                      <small className="text-danger">{errors.state}</small>
                    )}
                  </Col>

                  <Col md={6} className="mb-3">
                    <label>Pincode</label>

                    <Field type="text" name="pin" className="form-control" />

                    {errors.pin && touched.pin && (
                      <small className="text-danger">{errors.pin}</small>
                    )}
                  </Col>

                  <Col md={6} className="mb-3">
                    <label>Mobile</label>

                    <Field type="text" name="mobile" className="form-control" />

                    {errors.mobile && touched.mobile && (
                      <small className="text-danger">{errors.mobile}</small>
                    )}
                  </Col>

                  <Col md={6} className="mb-3">
                    <label>Email</label>

                    <Field type="email" name="email" className="form-control" />

                    {errors.email && touched.email && (
                      <small className="text-danger">{errors.email}</small>
                    )}
                  </Col>
                </Row>

                <div className="text-end">
                  <Button
                    variant="secondary"
                    onClick={handleClose}
                    className="me-2"
                  >
                    Cancel
                  </Button>

                  <Button variant="primary" type="submit">
                    {editAddress ? "Update Address" : "Save Address"}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
      <Button variant="success" className="mt-3" onClick={handleOrder}>
        Place Order
      </Button>
    </Container>
  );
};

export default Address;
