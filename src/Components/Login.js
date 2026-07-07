import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { login } from "./../slices/auth";
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
    .min(5, "Minimum 5 characters")
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
    .matches(
      /^[6-9]\d{9}$/,
      "enter valid 10 digit numbers",
    )
    // .required("only digits are required")
    .required("Mobile number is required"),
  email: Yup.string()
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Enter a valid email address")
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
                  const data={
                    firstName:values.firstName,
                  lastName: values.lastName,
                  mobileNumber: values.mobileNumber,
                  email: values.email,
                  password: values.password,
                  username:values.mobileNumber
                  }
                  axios.post("http://localhost:8090/api/auth/signup",data).then((response)=>
                  {
                    console.log("User Successfully Registered");
                    alert("User Successfully Registered");
                  }).catch((error)=>{
                    console.log("User Registration Failed!");
                    alert("User Registration Failed!");
                  })
                }}
              >
                {({ errors, touched }) => (
                  <Form>
                    <Row>
                      <Col>
                        <label htmlFor="firstName">First Name</label>
                      </Col>
                      <Col>
                        <Field name="firstName" />
                        {
                          errors.firstName && touched.firstName ? (
                            <div>{errors.firstName}</div>
                          ) : null}
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <label htmlFor="lastName">Last Name</label>
                      </Col>
                      <Col>
                        <Field name="lastName" />
                        {errors.lastName && touched.lastName ? (
                          <div>{errors.lastName}</div>
                        ) : null}
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <label htmlFor="mobileNumber">Mobile</label>
                      </Col>
                      <Col>
                        <Field name="mobileNumber" />
                        {errors.mobileNumber && touched.mobileNumber ? (
                          <div>{errors.mobileNumber}</div>
                        ) : null}
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <label htmlFor="email">Email</label>
                      </Col>
                      <Col>
                        <Field name="email" type="email" />
                        {errors.email && touched.email ? (
                          <div>{errors.email}</div>
                        ) : null}
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <label htmlFor="password">Password</label>
                      </Col>
                      <Col>
                        <Field name="password" />
                        {errors.password && touched.password ? (
                          <div>{errors.password}</div>
                        ) : null}
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <button type="submit">Submit</button>
                      </Col>
                    </Row>
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
                  username: "",
                  password: "",
                }}
                validationSchema={LoginSchema}
                onSubmit={handleLogin}
              >
                {({ errors, touched }) => (
                  <Form>
                    <Row>
                      <Col md={3}>
                        <label htmlFor="email">Mobile:</label>
                      </Col>
                      <Col md={9}>
                        <Field name="username" type="text" />
                        {errors.username && touched.username ? (
                          <div>{errors.username}</div>
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
