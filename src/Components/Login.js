import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { login, register } from "./../slices/auth";
import { clearMessage } from "./../slices/message";
import { Col, Container, Row, Offcanvas, Button } from "react-bootstrap";
import { useFormik } from "formik";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    // .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Enter a valid email address")
    .required("Mobile required"),
  password: Yup.string()
    .required("Password is required")
    .min(5, "Minimum 5 characters"),
  // .matches(/[a-z]/, "Must contain a lowercase letter")
  // .matches(/[A-Z]/, "Must contain an uppercase letter")
  // .matches(/[0-9]/, "Must contain a number"),
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
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        dispatch(clearMessage());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);
  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const handleLogin = (formValue) => {
    const { username, password } = formValue;
    setLoading(true);
    console.log(formValue);
    dispatch(login({ username, password }))
      .unwrap()
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        setLoading(false);
      });
  };


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
                  console.log(values);
                  const data = {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    mobileNumber: values.mobileNumber,
                    email: values.email,
                    password: values.password,
                    username: values.mobileNumber,
                  };
                  axios
                    .post("http://localhost:8090/api/auth/signup", data)
                    .then((response) => {
                      console.log("User Successfully Registered");
                      alert("User Successfully Registered");
                      setShow=(false);
                    })
                    .catch((error) => {
                      console.log("User Registration Failed!");
                      alert("User Registration Failed!");
                      // handleClose();
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
                    <label htmlFor="mobileNumber">Email:</label>
                    <Field name="email" type="email" />
                    {errors.email && touched.email ? (
                      <div>{errors.email}</div>
                    ) : null}
                    <label htmlFor="password">Password:</label>
                    <Field name="password" />
                    {errors.password && touched.password ? (
                      <div>{errors.password}</div>
                    ) : null}{" "}
                    <Row>
                      <Col>
                        <button
                          className="register_btn"
                          type="submit"
                          onClick={() => setShow(true)}
                        >
                          Register
                        </button>
                      </Col>
                    </Row>
                  </Form>
                )}
              </Formik>
              <Row>
                <Col className="already-registered-btn">
                  <button onClick={handleClose}>
                    Already have an account? Login
                  </button>
                </Col>
              </Row>
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
                  username: "",
                  password: "",
                }}
                validationSchema={LoginSchema}
                onSubmit={handleLogin}
              >
                {({ errors, touched }) => (
                  <Form>
                    <label htmlFor="email">Mobile:</label>
                    <Field name="username" type="text" />
                    {errors.username && touched.username ? (
                      <div>{errors.username}</div>
                    ) : null}
                    <label htmlFor="password">Password:</label>
                    <Field name="password" />
                    {errors.password && touched.password ? (
                      <div>{errors.password}</div>
                    ) : null}{" "}
                    <Row>
                      <Col>
                        <button type="submit">Log In</button>
                      </Col>
                    </Row>{" "}
                  </Form>
                )}
              </Formik>
              <Row>
                <Col className="not-registered-btn">
                  <button onClick={handleShow}>
                    Don't have an account? Register
                  </button>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Login;
