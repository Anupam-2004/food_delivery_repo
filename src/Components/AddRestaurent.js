import React, { useState } from "react";
import { Container, Row, Col, Breadcrumb } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
// import { FaLocationDot } from "react-icons/fa6";

const addresses = {
  Aera: ["Jamshedpur", "Bokaro", "Dhanbad", "Ranchi", "Hazaribagh", "Giridih"],
};
const cities = {
  Jamshedpur: ["Sakschi", "Bistupur", "Kadma", "Adityapur", "Ghamhriya"],
  Bokaro: [
    "Chas",
    "Bokaro Steel City",
    "Bokaro Thermal",
    "Phusro",
    "Chandrapura",
  ],
};
const areas = {
  Sakschi: ["Sakchi Main Road"],
  Bistupur: ["Bistupur Main Road"],
  Kadma: ["Kadma Main Road"],
  Adityapur: ["Adityapur Main Road"],
  Ghamhriya: ["Ghamhriya Main Road"],
};

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
    .min(1, "At least one image is required")
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
  const [subCategories, setSubCategories] = useState(addresses["Jamshedpur"]);

  return (
    <Container>
      <Row>
        <Col md={1}>
          <Sidebar />
        </Col>
        <Col md={11}>
          <h1>Add Restaurent</h1>
          <Breadcrumb>
            <Breadcrumb.Item href={'/dashboard'}>
              Dashboard
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Add Restaurant</Breadcrumb.Item>
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
                files: [],
              }}
              validationSchema={SignupSchema}
              onSubmit={(values) => {
                console.log(values);
                alert("Form submitted successfully!");
              }}
            >
              {({ errors, touched, values, setFieldValue }) => (
                <Form>
                  <Row>
                    <Col md={3}>
                      <label htmlFor="restaurentName">Restaurent Name:</label>
                    </Col>
                    <Col md={9}>
                      <Field name="restaurentName" as="input" type="text" />
                      {errors.restaurentName && touched.restaurentName ? (
                        <div>{errors.restaurentName}</div>
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
                      <label htmlFor="restaurentName">Restaurent Name:</label>
                    </Col>
                     <Col md={9}>
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
                      <Field
                        as="select"
                        name="city"
                        className="form-control"
                        onChange={(e) => {
                          const value = e.target.value;
                          setFieldValue("city", value);
                        }}
                      >
                        <option value="selectcity">Select City</option>
                        <option value="Jamshedpur">Jamshedpur</option>
                        <option value="Bokaro">Bokaro</option>
                        <option value="Ranchi">Ranchi</option>
                        <option value="Dhanbad">Dhanbad</option>
                      </Field>
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
                        className="form-control"
                        onChange={(e) => {
                          const value = e.target.value;
                          setFieldValue("city", value);
                          setFieldValue("city", cities[value][0]);
                          setSubCategories(cities[value]);
                        }}
                      >
                        <option value="selectarea">Select Area</option>

                        <option value="Jamshedpur">Sakchi</option>
                        <option value="bokaro">Bistupur</option>
                        <option value="ranchi">Kadma</option>
                        <option value="dhanbad">Adityapur</option>
                        <option value="dhanbad">Ghamhriya</option>
                      </Field>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={3}>
                      <label htmlFor="city">Area:</label>
                    </Col>
                    <Col md={9}>
                      <Field
                        as="select"
                        name="area"
                        className="form-control"
                        onChange={(e) => {
                          const value = e.target.value;
                          setFieldValue("area", value);
                        }}
                      >
                        <option value="select address">Select Address</option>

                        <option value="jamshedpur">Sakchi Main Road</option>
                        <option value="bokaro">Road2</option>
                        <option value="ranchi">Market</option>
                        <option value="dhanbad">rasd 2</option>
                        <option value="dhanbad">Road 3</option>
                      </Field>
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
                        onChange={(e) => {
                          setFieldValue(
                            "files",
                            Array.from(e.currentTarget.files),
                          );
                        }}
                      />

                      {touched.files && errors.files && (
                        <div className="text-danger">{errors.files}</div>
                      )}
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
