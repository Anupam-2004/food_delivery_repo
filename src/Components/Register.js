import React from "react";
import { Container, Row, Col, Button, Offcanvas } from "react-bootstrap";
import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const Register = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Container>
      <Row>
        <Col>
          <Button variant="primary" onClick={handleShow} className="me-2">
            Test
          </Button>
          <Offcanvas show={show} onHide={handleClose} placement="end">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Sign In</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <div className="add_restro"></div>
            </Offcanvas.Body>
          </Offcanvas>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
