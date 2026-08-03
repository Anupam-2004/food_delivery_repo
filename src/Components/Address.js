import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form as BootstrapForm,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";
import { FiEdit2, FiMail, FiMapPin, FiPhone, FiTrash2 } from "react-icons/fi";

const addressSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters")
    .matches(/^[A-Za-z_ .]+$/, "Name can only contain letters")
    .required("Name is required"),
  addressLine1: Yup.string()
    .min(2, "Address line 1 must be at least 2 characters")
    .max(80, "Address line 1 must not exceed 80 characters")
    .matches(/^[a-zA-Z0-9\s,.-]+$/, "Use letters, numbers, commas, dots and hyphens")
    .required("Address line 1 is required"),
  addressLine2: Yup.string()
    .min(2, "Address line 2 must be at least 2 characters")
    .max(80, "Address line 2 must not exceed 80 characters")
    .matches(/^[a-zA-Z0-9\s,.-]+$/, "Use letters, numbers, commas, dots and hyphens")
    .required("Address line 2 is required"),
  city: Yup.string().required("City is required"),
  district: Yup.string()
    .min(2, "District must be at least 2 characters")
    .max(50, "District must not exceed 50 characters")
    .matches(/^[A-Za-z1-9_ .]+$/, "District can only contain letters")
    .required("District is required"),
  state: Yup.string()
    .min(2, "State must be at least 2 characters")
    .max(50, "State must not exceed 50 characters")
    .matches(/^[A-Za-z1-9_ .]+$/, "State can only contain letters")
    .required("State is required"),
  pin: Yup.string()
    .required("PIN code is required")
    .matches(/^[1-9][0-9]{5}$/, "Enter a valid 6-digit PIN code"),
  mobile: Yup.string()
    .required("Mobile number is required")
    .matches(/^[6-9]\d{9}$/, "Enter valid mobile number"),
  email: Yup.string().required("Email is required").email("Invalid email"),
  addressType: Yup.string().required("Address type is required"),
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
  const [selectedAddress, setSelectedAddress] = useState("");
  const [editingAddress, setEditingAddress] = useState(null);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchAddresses = useCallback(async () => {
    if (!currentUser?.id) return;

    setLoading(true);
    setError("");

    try {
      const response = await axios.get(`http://localhost:8090/api/addresses/user/${currentUser.id}`);
      setAddresses(response.data || []);
    } catch (err) {
      console.error(err);
      setError("Could not load your addresses. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [currentUser?.id]);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  const closeModal = () => {
    setShow(false);
    setEditingAddress(null);
    setError("");
  };

  const openCreateModal = () => {
    setEditingAddress(null);
    setShow(true);
  };

  const openEditModal = (address) => {
    setEditingAddress(address);
    setShow(true);
  };

  const handleSubmit = async (values) => {
    if (!currentUser?.id) {
      setError("Please log in before saving an address.");
      return;
    }

    setSaving(true);
    setError("");

    const 
    payload = {
      ...values,
      userId: currentUser.id,
    };

    try {
      if (editingAddress?.id) {
        const response = await axios.put(`$http://localhost:8090/api/addresses/${editingAddress.id}`, payload);
        const updatedAddress = response.data || { ...payload, id: editingAddress.id };

        setAddresses((items) =>
          items.map((item) => (item.id === editingAddress.id ? updatedAddress : item)),
        );
        setSuccess("Address updated successfully.");
      } else {
        const response = await axios.post("http://localhost:8090/api/addresses", payload);
        const createdAddress = response.data || payload;

        setAddresses((items) => [...items, createdAddress]);
        setSuccess("Address added successfully.");
      }

      closeModal();
      fetchAddresses();
    } catch (err) {
      console.error(err);
      setError(`Failed to ${editingAddress?.id ? "update" : "add"} address.`);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAddress = async (id) => {
    if (!window.confirm("Delete this address?")) return;

    setError("");

    try {
      await axios.delete(`http://localhost:8090/api/addresses/${id}`);
      setAddresses((items) => items.filter((item) => item.id !== id));
      setSelectedAddress((selected) => (selected === id ? "" : selected));
      setSuccess("Address deleted successfully.");
    } catch (err) {
      console.error(err);
      setError("Failed to delete address.");
    }
  };

  const initialValues = editingAddress
    ? {
        name: editingAddress.name || "",
        addressLine1: editingAddress.addressLine1 || "",
        addressLine2: editingAddress.addressLine2 || "",
        city: editingAddress.city || "",
        district: editingAddress.district || "",
        state: editingAddress.state || "",
        pin: editingAddress.pin || "",
        mobile: editingAddress.mobile || "",
        email: editingAddress.email || "",
        addressType: editingAddress.addressType || "",
      }
    : emptyAddress;

  return (
    <div className="address-page">
      <Container>
        <section className="address-hero">
          <div>
            <Badge className="address-hero-badge badge bg-danger">Fast checkout</Badge>
            <h2>Delivery Addresses</h2>
            <p>Keep your home, work and favorite delivery spots ready for the next order.</p>
          </div>

          <Button className="address-primary-btn" onClick={openCreateModal}>
            <Plus size={20} /> Add Address
          </Button>
        </section>

        {error && <div className="address-alert address-alert-error">{error}</div>}
        {success && <div className="address-alert address-alert-success">{success}</div>}

        {loading ? (
          <div className="address-loader">
            <Spinner animation="border" />
            <span>Loading addresses...</span>
          </div>
        ) : addresses.length === 0 ? (
          <div className="address-empty">
            <FiMapPin />
            <h4>No Address Found</h4>
            <p>Add a delivery address to make checkout quicker.</p>
            <Button className="address-primary-btn" onClick={openCreateModal}>
              <Plus size={18} /> Add your first address
            </Button>
          </div>
        ) : (
          <Row className="g-4">
            {addresses.map((address) => (
              <Col lg={6} key={address.id}>
                <Card
                  className={`address-card ${
                    selectedAddress === address.id ? "address-card-selected" : ""
                  }`}
                >
                  <Card.Body>
                    <div className="address-card-top">
                      <BootstrapForm.Check
                        type="radio"
                        name="selectedAddress"
                        aria-label={`Select ${address.name}`}
                        checked={selectedAddress === address.id}
                        onChange={() => setSelectedAddress(address.id)}
                      />
                      <Badge className="address-type  badge bg-danger">{address.addressType}</Badge>
                    </div>

                    <h5>{address.name}</h5>
                    <p className="address-line">
                      {address.addressLine1}
                      <br />
                      {address.addressLine2}
                    </p>
                    <p className="address-location">
                      <FiMapPin /> {address.city}, {address.district}, {address.state} -{" "}
                      {address.pin}
                    </p>

                    <div className="address-contact">
                      <span>
                        <FiPhone /> {address.mobile}
                      </span>
                      <span>
                        <FiMail /> {address.email}
                      </span>
                    </div>

                    <div className="address-actions">
                      <Button variant="light" onClick={() => openEditModal(address)}>
                        <FiEdit2 /> Edit
                      </Button>
                      <Button variant="light" onClick={() => handleDeleteAddress(address.id)}>
                        <FiTrash2 /> Delete
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        <Modal show={show} onHide={closeModal} centered size="lg" className="address-modal">
          <Modal.Header closeButton>
            <Modal.Title>{editingAddress ? "Update Address" : "Add Address"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Formik
              initialValues={initialValues}
              enableReinitialize
              validationSchema={addressSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form className="address-form">
                  <Row className="g-3">
                    <Col md={6}>
                      <label htmlFor="name">Name</label>
                      <Field name="name" type="text" className="form-control" />
                      {errors.name && touched.name && <div className="field-error">{errors.name}</div>}
                    </Col>
                    <Col md={6}>
                      <label htmlFor="addressType">Address Type</label>
                      <Field as="select" name="addressType" className="form-control">
                        <option value="">Select Address Type</option>
                        <option value="Home">Home</option>
                        <option value="Work">Work</option>
                        <option value="Other">Other</option>
                      </Field>
                      {errors.addressType && touched.addressType && (
                        <div className="field-error">{errors.addressType}</div>
                      )}
                    </Col>
                    <Col md={6}>
                      <label htmlFor="addressLine1">Address line 1</label>
                      <Field name="addressLine1" type="text" className="form-control" />
                      {errors.addressLine1 && touched.addressLine1 && (
                        <div className="field-error">{errors.addressLine1}</div>
                      )}
                    </Col>
                    <Col md={6}>
                      <label htmlFor="addressLine2">Address line 2</label>
                      <Field name="addressLine2" type="text" className="form-control" />
                      {errors.addressLine2 && touched.addressLine2 && (
                        <div className="field-error">{errors.addressLine2}</div>
                      )}
                    </Col>
                    <Col md={6}>
                      <label htmlFor="city">City</label>
                      <Field as="select" name="city" className="form-control">
                        <option value="">Select City</option>
                        <option value="Jamshedpur">Jamshedpur</option>
                        <option value="Bokaro">Bokaro</option>
                        <option value="Ranchi">Ranchi</option>
                        <option value="Dhanbad">Dhanbad</option>
                      </Field>
                      {errors.city && touched.city && <div className="field-error">{errors.city}</div>}
                    </Col>
                    <Col md={6}>
                      <label htmlFor="district">District</label>
                      <Field name="district" type="text" className="form-control" />
                      {errors.district && touched.district && (
                        <div className="field-error">{errors.district}</div>
                      )}
                    </Col>
                    <Col md={6}>
                      <label htmlFor="state">State</label>
                      <Field name="state" type="text" className="form-control" />
                      {errors.state && touched.state && <div className="field-error">{errors.state}</div>}
                    </Col>
                    <Col md={6}>
                      <label htmlFor="pin">Pincode</label>
                      <Field name="pin" type="text" maxLength={6} className="form-control" />
                      {errors.pin && touched.pin && <div className="field-error">{errors.pin}</div>}
                    </Col>
                    <Col md={6}>
                      <label htmlFor="mobile">Mobile No.</label>
                      <Field name="mobile" type="text" maxLength={10} className="form-control" />
                      {errors.mobile && touched.mobile && (
                        <div className="field-error">{errors.mobile}</div>
                      )}
                    </Col>
                    <Col md={6}>
                      <label htmlFor="email">Email</label>
                      <Field name="email" type="email" className="form-control" />
                      {errors.email && touched.email && <div className="field-error">{errors.email}</div>}
                    </Col>
                  </Row>

                  <div className="address-form-actions">
                    <Button variant="light" type="button" onClick={closeModal}>
                      Close
                    </Button>
                    <Button className="address-primary-btn" type="submit" disabled={saving || isSubmitting}>
                      {saving ? "Saving..." : editingAddress ? "Update Address" : "Save Address"}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
);
};
export default Address;
