import { useState } from "react";
import { Col, Container, Row, Offcanvas, Button } from "react-bootstrap";
import { useFormik } from "formik";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Enter a valid email address",
    )
    .required("Email required"),
  password: Yup.string()
    .required("Password is required")
    .min(5, "Minimum 5 characters")
    .matches(/[a-z]/, "Must contain a lowercase letter")
    .matches(/[A-Z]/, "Must contain an uppercase letter")
    .matches(/[0-9]/, "Must contain a number"),
});
const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "first name must be at least minimum 2 characters")
    .max(50, "first name must not exceed 50 characters")
    .matches(/^[A-Za-z .]+$/, "Name can only contain letters")
    .required("First Name is Mandatory"),

  lastName: Yup.string()
    .min(2, "lastname must be atleast minimum 2 characters!")
    .max(50, "lastname must not exceed 50 characters")
    .matches(/^[A-Za-z .]+$/, "Name can only contain letters")
    .required("lastname is Required"),

  mobileNumber: Yup.string()
    .matches(/^[6-9]\d{9}$/, "enter valid 10 digit numbers")
    // .required("only digits are required")
    .required("Mobile number is required"),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Enter a valid email address",
    )
    .required("Email required"),
  password: Yup.string()
    .required("Password is required")
    .min(5, "Minimum 5 characters")
    .matches(/[a-z]/, "Must contain a lowercase letter")
    .matches(/[A-Z]/, "Must contain an uppercase letter")
    .matches(/[0-9]/, "Must contain a number"),
});

const Login = () => {
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container fluid>
      {show ? (
        <Row>
          <Col>
            <div className="register_restro">
              <Formik
                initialValues={{
                  firstName: "",
                  lastName: "",
                  mobileNumber: "",
                  email: "",
                  password: "",
                }}
                validationSchema={SignupSchema}
                onSubmit={(values) => {
                  const data = {
                    username: values.mobileNumber,
                    firstName: values.firstName,
                    lastName: values.lastName,
                    mobileNumber: values.mobileNumber,
                    email: values.email,
                    password: values.password,
                  };

                  console.log(data);
                  axios
                    .post("http://localhost:8090/api/auth/signup", data)
                    .then((response) => {
                      console.log("user sucessfully Registered");
                    })
                    .catch((error) => {
                      console.log("user reistered failed");
                    });
                }}
              >
                {({ errors, touched }) => (
                  <Form>
                   
                        <label htmlFor="firstName">First Name:</label>
                     
                        <Field name="firstName" />
                        {errors.firstName && touched.firstName ? (
                          <div>{errors.firstName}</div>
                        ) : null}
                    
                        <label htmlFor="lastName">Last Name:</label>
                    
                        <Field name="lastName" />
                        {errors.lastName && touched.lastName ? (
                          <div>{errors.lastName}</div>
                        ) : null}
                    
                    
                        <label htmlFor="mobileNumber">Mobile:</label>
                    
                        <Field name="mobileNumber" />
                        {errors.mobileNumber && touched.mobileNumber ? (
                          <div>{errors.mobileNumber}</div>
                        ) : null}
                      
                        <label htmlFor="email">Email:</label>
                     
                        <Field name="email" type="email" />
                        {errors.email && touched.email ? (
                          <div>{errors.email}</div>
                        ) : null}
                    

                   
                        <label htmlFor="password">Password:</label>
                     
                        <Field name="password" />
                        {errors.password && touched.password ? (
                          <div>{errors.password}</div>
                        ) : null}
                     

                    
                        <button type="submit">Register</button>
                    
                  </Form>
                )}
              </Formik>
              <button className="login_btn" onClick={handleClose}>
                If already registered then click here
              </button>
            </div>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col>
            <h2>Login</h2>

            <div className="add_restro">
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                validationSchema={LoginSchema}
                onSubmit={(values) => {
                  console.log(values);
                }}
              >
                {({ errors, touched }) => (
                  <Form>
                    <Row>
                      <Col md={3}>
                        <label htmlFor="email">Email:</label>
                      </Col>
                      <Col md={9}>
                        <Field name="email" type="email" />
                        {errors.email && touched.email ? (
                          <div>{errors.email}</div>
                        ) : null}
                      </Col>
                    </Row>

                    <Row>
                      <Col md={3}>
                        <label htmlFor="password">Password:</label>
                      </Col>
                      <Col md={9}>
                        <Field name="password" />
                        {errors.password && touched.password ? (
                          <div>{errors.password}</div>
                        ) : null}
                      </Col>
                    </Row>

                    <Row>
                      <Col md={12}>
                        <button type="submit">Log In</button>
                      </Col>
                    </Row>
                  </Form>
                )}
              </Formik>
              <button className="register_btn" onClick={handleShow}>
                If you are not registerd then click here
              </button>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Login;
