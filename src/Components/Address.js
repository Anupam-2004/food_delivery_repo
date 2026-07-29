import React, { useState, useEffect } from "react";
import { Col, Container, Row, Modal, Button } from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Address = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  let navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "restaurent name must be at least minimum 2 characters")
      .max(50, "restaurent name must not exceed 50 characters")
      .matches(/^[A-Za-z_ .]+$/, "name can only contain letters")
      .required(" restaurent name is Required"),
    addressLine1: Yup.string()
      .min(2, "adressLine1  must be at least minimum 2 characters")
      .max(50, "addressLine1 must not exceed 50 characters")
      .matches(/^[a-zA-Z0-9\s,.-]+$/, "Name can only contain letters")
      .required("addressLine1  is Mandatory"),
    addressLine2: Yup.string()
      .min(2, "addressLine2  must be at least minimum 2 characters")
      .max(50, "addressLine2 must not exceed 50 characters")
      .matches(/^[a-zA-Z0-9\s,.-]+$/, "Name can only contain letters")
      .required("addressLine2  is Mandatory"),
    city: Yup.string()
      .min(2, "city  must be at least minimum 2 characters")
      .max(50, "city must not exceed 50 characters")
      .matches(/^[A-Za-z1-9_ .]+$/, "Name can only contain letters")
      .required("city  is Mandatory"),

    district: Yup.string()
      .min(2, "district  must be at least minimum 2 characters")
      .max(50, "district must not exceed 50 characters")
      .matches(/^[A-Za-z1-9_ .]+$/, "Name can only contain letters")
      .required("district  is Mandatory"),

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

    addressType: Yup.string().required("Address Type is required"),
  });
  useEffect(() => {
    fetchAddresses()
    if (!currentUser) {
      navigate("/");
    } else if (currentUser.roles[0] !== "ROLE_ADMIN") {
      navigate("/");
    } else {
      console.log(currentUser);
    }
  }, [currentUser, navigate]);

  const fetchAddresses = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8090/api/addresses/user/${currentUser.id}`,
      );

      setAddresses(res.data);
      console.log('backend response :',res)
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Container>
      <Row>
        <Col>
          <Button variant="primary" onClick={handleShow}>
            <Plus />
            Add New Address
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add Address</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Formik
                initialValues={{
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
                }}
                validationSchema={SignupSchema}
                onSubmit={async (values, { resetForm }) => {
                  console.log('form submitted')
                  try {
                    const data = {
                      userId: currentUser.id,
                      ...values,
                    };

                    const res = await axios.post(
                      "http://localhost:8090/api/addresses",
                      data,
                    );

                    console.log(res.data);

                    alert("Address added successfully!");
                    await fetchAddresses();
                    resetForm();
                    handleClose();
                  } catch (err) {
                    console.error(err);
                    alert("Failed to add address");
                  }
                }}
              >
                {({ errors, touched, values, setFieldValue }) => (
                  <Form>
                    <Row>
                      <Col md={3}>
                        <label htmlFor="name">Name:</label>
                      </Col>
                      <Col md={9}>
                        <Field name="name" as="input" type="text" />
                        {errors.name && touched.name ? (
                          <div>{errors.name}</div>
                        ) : null}
                      </Col>
                    </Row>
                    <Row>
                      <Col md={3}>
                        <label htmlFor="addressLine1">Address line 1:</label>
                      </Col>
                      <Col md={9}>
                        <Field name="addressLine1" as="input" type="text" />
                        {errors.addressLine1 && touched.addressLine1 ? (
                          <div>{errors.addressLine1}</div>
                        ) : null}
                      </Col>
                    </Row>
                    <Row>
                      <Col md={3}>
                        <label htmlFor="addressLine2">Address line 2:</label>
                      </Col>
                      <Col md={9}>
                        <Field name="addressLine2" as="input" type="text" />
                        {errors.addressLine2 && touched.addressLine2 ? (
                          <div>{errors.addressLine2}</div>
                        ) : null}
                      </Col>
                    </Row>
                    <Row>
                      <Col md={3}>
                        <label htmlFor="city">City:</label>
                      </Col>
                      <Col md={9}>
                        <Field
                          as="select"
                          name="city"
                          onChange={(e) => {
                            const value = e.target.value;

                            setFieldValue("city", value);
                          }}
                        >
                          <option value="">Select City</option>
                          <option value="Jamshedpur">Jamshedpur</option>
                          <option value="Bokaro">Bokaro</option>
                          <option value="Ranchi">Ranchi</option>
                          <option value="Dhanbad">Dhanbad</option>
                        </Field>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={3}>
                        <label htmlFor="location">District :</label>
                      </Col>
                      <Col md={9}>
                        <Field name="district" as="input" type="text" />
                        {errors.district && touched.district ? (
                          <div>{errors.district}</div>
                        ) : null}
                      </Col>
                    </Row>

                    <Row>
                      <Col md={3}>
                        <label htmlFor="state">State:</label>
                      </Col>
                      <Col md={9}>
                        <Field name="state" as="input" type="text" />
                        {errors.state && touched.state ? (
                          <div>{errors.state}</div>
                        ) : null}
                      </Col>
                    </Row>
                    <Row>
                      <Col md={3}>
                        <label htmlFor="pin">Pincode:</label>
                      </Col>
                      <Col md={9}>
                        <Field name="pin" type="text" maxLength={6} />
                        {errors.pin && touched.pin ? (
                          <div>{errors.pin}</div>
                        ) : null}
                      </Col>
                    </Row>
                    <Row>
                      <Col md={3}>
                        <label htmlFor="mobile">Mobile No. :</label>
                      </Col>
                      <Col md={9}>
                        <Field name="mobile" type="text" maxLength={10} />
                        {errors.mobile && touched.mobile ? (
                          <div>{errors.mobile}</div>
                        ) : null}
                      </Col>
                    </Row>
                    <Row>
                      <Col md={3}>
                        <label htmlFor="email">Email :</label>
                      </Col>
                      <Col md={9}>
                        <Field name="email" as="input" type="email" />
                        {errors.email && touched.email ? (
                          <div>{errors.email}</div>
                        ) : null}
                      </Col>
                    </Row>
                    <Row>
                      <Col md={3}>
                        <label htmlFor="addressType">Address Type :</label>
                      </Col>
                      <Col md={9}>
                        <Field
                          as="select"
                          name="addressType"
                          onChange={(e) => {
                            const value = e.target.value;

                            setFieldValue("addressType", value);
                          }}
                        >
                          <option value="">Select Address Type</option>
                          <option value="Home">Home</option>
                          <option value="Work">Work</option>
                          <option value="Other">Other</option>
                        </Field>
                      </Col>
                    </Row>
                  </Form>
                )}
              </Formik>
            </Modal.Body>
            <div className="text-end mt-3">
              <Button
                variant="secondary"
                onClick={handleClose}
                className="me-2"
              >
                Close
              </Button>

              <Button type="submit" variant="primary">
                Save Address
              </Button>
            </div>
          </Modal>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <h5>Saved Addresses</h5>

          {addresses.length === 0 && <p>No address available.</p>}

          {addresses.map((address) => (
            <div key={address.id} className="border rounded p-3 mb-3">
              <input
                type="radio"
                name="selectedAddress"
                value={address.id}
                checked={selectedAddress === address.id}
                onChange={() => setSelectedAddress(address.id)}
              />

              <strong className="ms-2">{address.name}</strong>

              <p className="mb-1">{address.addressLine1}</p>

              <p className="mb-1">{address.addressLine2}</p>

              <p className="mb-1">
                {address.city}, {address.district}
              </p>

              <p className="mb-1">
                {address.state} - {address.pin}
              </p>

              <p>{address.mobile}</p>
            </div>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default Address;
