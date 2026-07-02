import React from "react";
import { Container, Row, Col,Breadcrumb } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Sidebar from "./Sidebar";
const SignupSchema = Yup.object().shape({
  restaurentName: Yup.string()
    .min(2, "restaurent name must be at least minimum 2 characters")
    .max(50, "restaurent name must not exceed 50 characters")
    .matches(/^[A-Za-z_ .]+$/, "name can only contain letters")
    .required(" restaurent name is Required"),
  address: Yup.string()
    .min(2, "adress  must be at least minimum 2 characters")
    .max(50, "adress must not exceed 50 characters")
    .matches(/^[A-Za-z1-9_ .]+$/, "Name can only contain letters")
    .required("adress  is Mandatory"),
  mobileNumber: Yup.string().matches(
    /^[6-9]\d{9}$/,
    "enter valid 10 digit numbers",
  ),
  email: Yup.string().matches(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    "Enter a valid email address",
  ),
  website: Yup.string().url("Enter a valid URL").required("Required"),
  ownerName: Yup.string()
    .min(2, "  ownerName must be at least minimum 2 characters")
    .max(50, " ownerName must not exceed 50 characters")
    .matches(/^[A-Za-z_ .]+$/, "name can only contain letters")
    .required(" ownerName is Required"),
  description: Yup.string()
    .min(20, "description must be atleast 20 characters")
    .max(2000, "description must not exceed 2000 characters")
    .matches(/^[A-Za-z_ .]+$/, "name can only contain letters")
    .required(" description is Required"),
  category: Yup.string(),
});
const AddRestaurent = () => {
  return (
    <Container>
      <Row>
        <Col md={1}>
          <Sidebar />
        </Col>
        <Col md={11}>
          <h1>Add Restaurent</h1>
           <Breadcrumb>
            <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>

            <Breadcrumb.Item active>Add Restaurent</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="add_restro">
            <Formik
              initialValues={{
                restaurentName: "",
                address: "",
                website: "",
                mobileNumber: "",
                ownerName: "",
                email: "",
                description: "",
                category: "",
              }}
              validationSchema={SignupSchema}
              onSubmit={(values) => {
                console.log(values);
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <Row>
                    <Col>
                      <label htmlFor="restaurentName">Restaurent Name</label>
                    </Col>
                    <Col>
                      <Field name="restaurentName" />
                      {errors.restaurentName && touched.restaurentName ? (
                        <div>{errors.restaurentName}</div>
                      ) : null}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <label htmlFor="address">Address</label>
                    </Col>
                    <Col>
                      <Field name="address" as="textarea" />
                      {errors.address && touched.address ? (
                        <div>{errors.address}</div>
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
                      <label htmlFor="ownerName">Owner Name</label>
                    </Col>
                    <Col>
                      <Field name="ownerName" />
                      {errors.ownerName && touched.ownerName ? (
                        <div>{errors.ownerName}</div>
                      ) : null}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <label htmlFor="website">Website</label>
                    </Col>
                    <Col>
                      <Field name="website" />
                      {errors.website && touched.website ? (
                        <div>{errors.website}</div>
                      ) : null}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <label htmlFor="description">Description</label>
                    </Col>
                    <Col>
                      <Field name="description" as="textarea" />
                      {errors.description && touched.description ? (
                        <div>{errors.description}</div>
                      ) : null}
                    </Col>
                  </Row>
                  {/* <Row>
                    <Col>
                      <label htmlFor="category">Category</label>
                    </Col>
                    <Col>
                      <Field name="category" as="select">
                        <option value="">Select Category</option>
                        <option value="veg">Veg</option>
                        <option value="nonveg">Non-Veg</option>
                        <option value="fastfood">Fast Food</option>
                        <option value="southindian">South Indian</option>
                        <option value="chinese">Chinese</option>
                      </Field>
                      {errors.category && touched.category ? (
                        <div>{errors.category}</div>
                      ) : null}
                    </Col>
                  </Row> */}
                  <Row>
                    <Col>
                      <button type="submit">Submit</button>
                    </Col>
                  </Row>
                </Form>
              )}
            </Formik>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AddRestaurent;
