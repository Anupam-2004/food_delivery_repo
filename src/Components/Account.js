import React, { useState } from "react";
import {
  Col,
  Container,
  Row,
  Button,
  Modal,
  Form,
  Offcanvas,
  Nav,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
// import { FaUser } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
const Account = () => {
  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },

    validationSchema: Yup.object({
      oldPassword: Yup.string().required("Old Password is required"),

      newPassword: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("New Password is required"),

      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
        .required("Confirm Password is required"),
    }),

    onSubmit: (values) => {
      console.log(values);
      handleClose();
    },
  });
  const [show, setShow] = useState(false);
  const { user: currentUser } = useSelector((state) => state.auth);
  console.log(currentUser);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [showButton, setShowButton] = useState(false);
  const handleButtonShow = () => setShowButton(true);
  const handleButtonClose = () => setShowButton(false);
 

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6} className="account_card">
          <h3 className="text-center mb-4">My Account</h3>
          <div>
            <Button variant="info" onClick={handleButtonShow}>
              <FaBars />
            </Button>

            <Offcanvas show={showButton} onHide={handleButtonClose}>
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>Account</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav defaultActiveKey="/home" className="flex-column">
                  {/* <Nav.Link as={Link} to={"/OrdersHistory"}>Orders history</Nav.Link> */}
                  {currentUser.roles[0] === "ROLE_ADMIN" ? (
                    <Nav.Link as={Link} to={"/AdminOrderHistory"}>
                    Admin Order History
                    </Nav.Link>
                  ) : (
                    "  "
                  )}
                  {currentUser.roles[0] === "ROLE_OWNER" ? (
                    <Nav.Link as={Link} to={"/RestaurentOrderHistory"}>
                      Restaurant Order History
                    </Nav.Link>
                  ) : (
                    "  "
                  )}
                  {currentUser.roles[0] === "ROLE_USER" ? (
                    <Nav.Link as={Link} to={"/UserOrdersHistory"}>
                      User Order History
                    </Nav.Link>
                  ) : (
                    "  "
                  )}
                </Nav>
              </Offcanvas.Body>
            </Offcanvas>
          </div>

          <div className="account_section">
            <span className="label">First Name:</span>
            <span className="value">{currentUser.firstName}</span>
          </div>

          <div className="account_section">
            <span className="label">Last Name:</span>
            <span className="value">{currentUser.LastName}</span>
          </div>

          <div className="account_section">
            <span className="label">Mobile:</span>
            <span className="value">{currentUser.mobileNumber}</span>
          </div>

          <div className="text-center mt-4">
            <Button variant="danger" onClick={handleShow}>
              Edit Profile
            </Button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Change Password</Modal.Title>
              </Modal.Header>
              <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Old Password</Form.Label>

                  <Form.Control
                    type="password"
                    name="oldPassword"
                    placeholder="Enter Old Password"
                    value={formik.values.oldPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      formik.touched.oldPassword && !!formik.errors.oldPassword
                    }
                  />

                  <Form.Control.Feedback type="invalid">
                    {formik.errors.oldPassword}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>New Password</Form.Label>

                  <Form.Control
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                    value={formik.values.newPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      formik.touched.newPassword && !!formik.errors.newPassword
                    }
                  />

                  <Form.Control.Feedback type="invalid">
                    {formik.errors.newPassword}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>

                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={
                      formik.touched.confirmPassword &&
                      !!formik.errors.confirmPassword
                    }
                  />

                  <Form.Control.Feedback type="invalid">
                    {formik.errors.confirmPassword}
                  </Form.Control.Feedback>
                </Form.Group>
              </Form>
              <div className="change_password_btn text-center">
                <Button variant="danger" type="submit" onClick={handleClose}>
                  Submit
                </Button>
              </div>
            </Modal>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Account;
