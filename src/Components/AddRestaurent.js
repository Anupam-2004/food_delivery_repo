import React from "react";
import { Container, Row, Col, Breadcrumb } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Sidebar from "./Sidebar";
import { Link } from "react-router";
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
  files: Yup.array()
    .required("At least one image is required")
    .test(
      "fileSize",
      "Each image must be less than 2 MB",
      (files) => !files || files.every((file) => file.size <= 2 * 1024 * 1024),
    )
    .test(
      "fileType",
      "Only JPG, JPEG, PNG and WEBP images are allowed",
      (files) =>
        !files ||
        files.every((file) =>
          ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
            file.type,
          ),
        ),
    ),
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
            <Breadcrumb.Item href="#"><Link to={'/Dashboard'}>Dashboard</Link></Breadcrumb.Item>

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
                    <Col md={3}>
                      <label htmlFor="restaurentName">Restaurent Name:</label>
                    </Col>
                    <Col md={9} >
                      <Field name="restaurentName" as="input" type="text" />
                      {errors.restaurentName && touched.restaurentName ? (
                        <div>{errors.restaurentName}</div>
                      ) : null}
                    </Col>
                  </Row>
                  <Row>
                    <Col md={3}>
                      <label htmlFor="address">Address :</label>
                    </Col>
                    <Col md={9}>
                      <Field name="address" as="textarea" />
                      {errors.address && touched.address ? (
                        <div>{errors.address}</div>
                      ) : null}
                    </Col>
                  </Row>
                  <Row>
                    <Col md={3}>
                      <label htmlFor="mobileNumber">Mobile :</label>
                    </Col>
                    <Col md={9}>
                      <Field name="mobileNumber" as="input" type="number" />
                      {errors.mobileNumber && touched.mobileNumber ? (
                        <div>{errors.mobileNumber}</div>
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
                      <label htmlFor="ownerName">Owner Name :</label>
                    </Col>
                    <Col md={9}>
                      <Field name="ownerName" as="input" type="text" />
                      {errors.ownerName && touched.ownerName ? (
                        <div>{errors.ownerName}</div>
                      ) : null}
                    </Col>
                  </Row>
                  <Row>
                    <Col md={3}>
                      <label htmlFor="website">Website :</label>
                    </Col>
                    <Col md={9}>
                      <Field name="website" as="input" type="text" />
                      {errors.website && touched.website ? (
                        <div>{errors.website}</div>
                      ) : null}
                    </Col>
                  </Row>
                  <Row>
                    <Col md={3}>
                      <label htmlFor="description">Description :</label>
                    </Col>
                    <Col md={9}>
                      <Field name="description" as="textarea" />
                      {errors.description && touched.description ? (
                        <div>{errors.description}</div>
                      ) : null}
                    </Col>
                  </Row>
                  <Row>
                    <Col md={3}>
                      <label htmlFor="image">Image :</label>
                    </Col>
                    <Col md={9}>
                      <input
                        type="file"
                        multiple
                        name="files"
                        onChange={(e) =>
                          errors("files", Array.from(e.currentTarget.files))
                        }
                      />

                      {/* {errors.touched.files && errors.errors.files && (
                        <p>{errors.errors.files}</p>
                      )} */}
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
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AddRestaurent;
