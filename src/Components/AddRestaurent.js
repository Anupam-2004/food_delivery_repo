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
const categories = {};

const SignupSchema = Yup.object().shape({
  restaurentName: Yup.string()
    .min(2, "restaurent name must be at least minimum 2 characters")
    .max(50, "restaurent name must not exceed 50 characters")
    .matches(/^[A-Za-z_ .]+$/, "name can only contain letters")
    .required(" restaurent name is Required"),
  foodType: Yup.string().required("Select food type"),
  addressLine1: Yup.string()
    .min(2, "adressLine1  must be at least minimum 2 characters")
    .max(50, "addressLine1 must not exceed 50 characters")
    .matches(/^[A-Za-z1-9_ .]+$/, "Name can only contain letters")
    .required("addressLine1  is Mandatory"),
  addressLine2: Yup.string()
    .min(2, "addressLine2  must be at least minimum 2 characters")
    .max(50, "addressLine2 must not exceed 50 characters")
    .matches(/^[A-Za-z1-9_ .]+$/, "Name can only contain letters")
    .required("addressLine2  is Mandatory"),
  location: Yup.string()
    .min(2, "location  must be at least minimum 2 characters")
    .max(50, "location must not exceed 50 characters")
    .matches(/^[A-Za-z1-9_ .]+$/, "Name can only contain letters")
    .required("location  is Mandatory"),
  city: Yup.string()
    .min(2, "city  must be at least minimum 2 characters")
    .max(50, "city must not exceed 50 characters")
    .matches(/^[A-Za-z1-9_ .]+$/, "Name can only contain letters")
    .required("city  is Mandatory"),
  state: Yup.string()
    .min(2, "state  must be at least minimum 2 characters")
    .max(50, "state must not exceed 50 characters")
    .matches(/^[A-Za-z1-9_ .]+$/, "Name can only contain letters")
    .required("state  is Mandatory"),
  country: Yup.string()
    .min(2, "country  must be at least minimum 2 characters")
    .max(50, "country must not exceed 50 characters")
    .matches(/^[A-Za-z1-9_ .]+$/, "Name can only contain letters")
    .required("country  is Mandatory"),
  pincode: Yup.string()
    .required("PIN code is required")
    .matches(/^[1-9][0-9]{5}$/, "Enter a valid 6-digit PIN code"),

  mobileNumber: Yup.string().matches(
    /^[6-9]\d{9}$/,
    "enter valid 10 digit numbers",
  ),
  email: Yup.string().matches(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    "Enter a valid email address",
  ),
  ownerName: Yup.string()
    .min(2, "  ownerName must be at least minimum 2 characters")
    .max(50, " ownerName must not exceed 50 characters")
    .matches(/^[A-Za-z_ .]+$/, "name can only contain letters")
    .required(" ownerName is Required"),

  website: Yup.string().url("Enter a valid URL").required("Required"),

  // category: Yup.string().required("Select category"),
  // foodName: Yup.string()

  //   .matches(/^[a-zA-Z\s]+$/, "Food name can contain only letters and spaces")
  //   .min(2, "Minimum 2 characters")
  //   .max(50, "Maximum 50 characters")
  //   .required("Food name is required"),
  description: Yup.string()
    .min(20, "description must be atleast 20 characters")
    .max(2000, "description must not exceed 2000 characters")
    .matches(/^[A-Za-z_ .]+$/, "name can only contain letters")
    .required(" description is Required"),
  // categories: Yup.string(),
  images: Yup.array()
    .min(1, "Please select at least one image")
    .max(5, "Maximum 5 images are allowed")
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
    )
    .test(
      "fileSize",
      "Each image must be less than 2 MB",
      (files) => !files || files.every((file) => file.size <= 2 * 1024 * 1024),
    ),
});
const AddRestaurent = () => {
  const [subCategories, setSubCategories] = useState(addresses["Jamshedpur"]);
  //  const [subCategories, setSubCategories] = useState(categories["Veg"]);

  return (
    <Container>
      <Row>
        <Col md={1}>
          <Sidebar />
        </Col>
        <Col md={11}>
          <h1>Add Restaurent</h1>
          <Breadcrumb>
            <Breadcrumb.Item href={"/dashboard"}>Dashboard</Breadcrumb.Item>
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
                foodType: "",
                addressLine1: "",
                addressLine2: "",
                location: "",
                city: "",
                state: "",
                country: "",
                pincode: "",
                mobileNumber: "",
                email: "",
                ownerName: "",
                website: "",

                // categories: "",

                description: "",
                images: [],
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
                      <label>Food Type</label>
                    </Col>
                    <Col md={9}>
                      <Field
                        as="select"
                        name="foodType"
                        className="form-control"
                        onChange={(e) => {
                          const value = e.target.value;
                          setFieldValue("foodType", value);
                          setFieldValue("category", categories[value][0]);
                          setSubCategories(categories[value]);
                        }}
                      >
                        <option value="Veg">Veg</option>
                        <option value="Non-Veg">Non-Veg</option>
                      </Field>

                      {/* <ErrorMessage
                        name="foodType"
                        component="div"
                        className="text-danger"
                      /> */}
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
                      <label htmlFor="location">location :</label>
                    </Col>
                    <Col md={9}>
                      <Field
                        as="select"
                        name="location"
                        className="form-control"
                        onChange={(e) => {
                          const value = e.target.value;
                          setFieldValue("location", value);
                        }}
                      >
                        <option value="selectcity">Select Location</option>
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
                        <option value="selectarea">Select City</option>

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
                      <label htmlFor="state">State:</label>
                    </Col>
                    <Col md={9}>
                      <Field
                        as="select"
                        name="state"
                        className="form-control"
                        onChange={(e) => {
                          const value = e.target.value;
                          setFieldValue("state", value);
                        }}
                      >
                        <option value="selectstate">Select State</option>
                        <option value="jharkhand">Jharkhand</option>
                        <option value="Bihar">Bihar</option>

                        <option value="Odisha">Odisha</option>
                        <option value="UP">UP</option>
                      </Field>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={3}>
                      <label htmlFor="country">Country :</label>
                    </Col>
                    <Col md={9}>
                      <Field
                        as="select"
                        name="country"
                        className="form-control"
                        onChange={(e) => {
                          const value = e.target.value;
                          setFieldValue("country", value);
                        }}
                      >
                        <option value="selectcountry">Select Country</option>
                        <option value="India">India</option>
                        <option value="Nepal">Nepal</option>
                      </Field>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={3}>
                      <label htmlFor="pincode">Pincode:</label>
                    </Col>
                    <Col md={9}>
                      <Field name="pincode" as="input" type="text" />
                      {errors.pincode && touched.pincode ? (
                        <div>{errors.pincode}</div>
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
                      <label>Images</label>
                    </Col>
                    <Col md={9}>
                      <input
                        type="file"
                        multiple
                        className="form-control"
                        accept="image/jpeg, image/jpg, image/png, image/webp"
                        onChange={(event) => {
                          setFieldValue(
                            "files",
                            Array.from(event.currentTarget.files),
                          );
                        }}
                      />

                      <ErrorMessage
                        name="files"
                        component="div"
                        className="text-danger"
                      />
                    </Col>
                  </Row>

                  <Row>
                    {values.images.map((image, index) => (
                      <Col md={3} key={index}>
                        <img
                          key={index}
                          src={URL.createObjectURL(image)}
                          alt="preview"
                          width="120"
                          height="120"
                          style={{ objectFit: "cover", borderRadius: "5px" }}
                        />
                      </Col>
                    ))}
                  </Row>
                  <Row>
                    <Col>
                      <button className="addRestaurent_btn" type="submit">Submit</button>
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
