import React, { useEffect, useState } from "react";
import { Container, Row, Col, Breadcrumb } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const locationData = {
  Jharkhand: {
    Jamshedpur: ["Sakchi", "Bistupur", "Mango", "Sonari", "Kadma", "Adityapur"],
    Bokaro: [
      "City Centre",
      "Sector 4",
      "Sector 9",
      "Chas",
      "Co-operative Colony",
    ],
    Ranchi: [
      "Harmu",
      "Lalpur",
      "Morabadi",
      "Kanke Road",
      "Doranda",
      "Main Road",
    ],
    Dhanbad: ["Bank More", "Saraidhela", "Hirapur", "Bartand", "Sarai Dhela"],
  },

  Bihar: {
    Patna: [
      "Boring Road",
      "Kankarbagh",
      "Fraser Road",
      "Rajendra Nagar",
      "Patliputra Colony",
      "Bailey Road",
    ],
    Gaya: ["Bodh Gaya", "Civil Lines", "Gaya Junction", "Swarajpuri Road"],
    Muzaffarpur: ["Mithanpura", "Ramna", "Brahmpura", "Kalyani"],
  },

  Odisha: {
    Bhubaneswar: [
      "Patia",
      "Saheed Nagar",
      "Kharavel Nagar",
      "Jaydev Vihar",
      "Nayapalli",
    ],
    Cuttack: ["Badambadi", "CDA", "College Square", "Link Road"],
  },

  "Uttar Pradesh": {
    Lucknow: [
      "Gomti Nagar",
      "Hazratganj",
      "Aliganj",
      "Indira Nagar",
      "Alambagh",
    ],
    Varanasi: ["Lanka", "Sigra", "Bhelupur", "Assi", "Cantt"],
  },
};

const SignupSchema = Yup.object().shape({
  restaurentName: Yup.string()
    .min(2, "Restaurant name must be at least 2 characters")
    .max(50, "Restaurant name must not exceed 50 characters")
    .required("Restaurant name is required"),

  foodType: Yup.string().required("Select food type"),

  addressLine1: Yup.string()
    .min(2, "Address line 1 must be at least 2 characters")
    .max(100, "Address line 1 must not exceed 100 characters")
    .required("Address line 1 is required"),

  addressLine2: Yup.string()
    .max(100, "Address line 2 must not exceed 100 characters")
    .required("Address line 2 is required"),

  location: Yup.string().required("Location is required"),

  city: Yup.string().required("City is required"),

  state: Yup.string().required("State is required"),

  country: Yup.string().required("Country is required"),

  pincode: Yup.string()
    .required("PIN code is required")
    .matches(/^[1-9][0-9]{5}$/, "Enter a valid 6-digit PIN code"),

  mobileNumber: Yup.string()
    .required("Mobile number is required")
    .matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),

  email: Yup.string()
    .email("Enter a valid email address")
    .required("Email is required"),

  ownerName: Yup.string()
    .min(2, "Owner name must be at least 2 characters")
    .max(50, "Owner name must not exceed 50 characters")
    .required("Owner name is required"),

  website: Yup.string()
    .url("Enter a valid URL")
    .required("Website is required"),

  description: Yup.string()
    .min(20, "Description must be at least 20 characters")
    .max(2000, "Description must not exceed 2000 characters")
    .required("Description is required"),

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
  const navigate = useNavigate();

  const { user: currentUser } = useSelector((state) => state.auth);

  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
      return;
    }

    if (currentUser?.roles?.[0] !== "ROLE_ADMIN") {
      navigate("/");
      return;
    }

    console.log("Current Admin:", currentUser);
  }, [currentUser, navigate]);

  return (
    <Container>
      <Row>
        <Col md={5}></Col>

        <Col md={7}>
          <h1>Add Restaurant</h1>

          <Breadcrumb>
            <Breadcrumb.Item href="/dashboard">Dashboard</Breadcrumb.Item>

            <Breadcrumb.Item active>Add Restaurant</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>

      <Row>
        <Col>
          <div className="add_restaurant">
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
                description: "",
                images: [],
              }}
              validationSchema={SignupSchema}
              onSubmit={(values, { resetForm }) => {
                const nameSplit = values.ownerName.trim().split(/\s+/);

                const ownerData = {
                  firstName: nameSplit[0],
                  lastName: nameSplit.slice(1).join(" ") || "",
                  mobileNumber: values.mobileNumber,
                  email: values.email,
                  password: String(values.mobileNumber),
                  username: values.mobileNumber,
                  roles: ["owner"],
                };

                console.log("Owner Data:", ownerData);

                axios
                  .post("http://localhost:8090/api/auth/signup", ownerData)
                  .then((response) => {
                    console.log("Owner created successfully:", response.data);

                    const ownerId =
                      response.data?._id ||
                      response.data?.id ||
                      response.data?.user?._id ||
                      response.data?.user?.id;

                    console.log("New Owner ID:", ownerId);

                    if (!ownerId) {
                      throw new Error("Owner ID not received from signup API");
                    }

                    const formData = new FormData();

                    formData.append("userId", ownerId);

                    Object.keys(values).forEach((key) => {
                      if (key !== "images") {
                        formData.append(key, values[key]);
                      }
                    });

                    values.images.forEach((file) => {
                      formData.append("images", file);
                    });

                    console.log("Restaurant FormData created");

                    return axios.post(
                      "http://localhost:8090/api/restaurents",
                      formData,
                      {
                        headers: {
                          "Content-Type": "multipart/form-data",
                        },
                      },
                    );
                  })
                  .then((response) => {
                    console.log(
                      "Restaurant created successfully:",
                      response.data,
                    );

                    alert("Owner and Restaurant registered successfully!");

                    resetForm();

                    setSubCategories([]);
                  })
                  .catch((error) => {
                    console.error(
                      "Registration failed:",
                      error.response?.data || error.message,
                    );

                    alert(
                      error.response?.data?.message ||
                        "Owner/Restaurant registration failed!",
                    );
                  });
              }}
            >
              {({ values, setFieldValue }) => (
                <Form>
                  <Row className="mb-3">
                    <Col md={3}>
                      <label htmlFor="restaurentName">Restaurant Name:</label>
                    </Col>

                    <Col md={9}>
                      <Field
                        name="restaurentName"
                        type="text"
                        className="form-control"
                      />

                      <ErrorMessage
                        name="restaurentName"
                        component="div"
                        className="text-danger"
                      />
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col md={3}>
                      <label htmlFor="foodType">Food Type:</label>
                    </Col>

                    <Col md={9}>
                      <Field
                        as="select"
                        name="foodType"
                        className="form-control"
                      >
                        <option value="">Select Food Type</option>

                        <option value="Veg">Pure Veg</option>

                        <option value="Non-Veg">Veg & Non-Veg</option>
                      </Field>

                      <ErrorMessage
                        name="foodType"
                        component="div"
                        className="text-danger"
                      />
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col md={3}>
                      <label htmlFor="addressLine1">Address Line 1:</label>
                    </Col>

                    <Col md={9}>
                      <Field
                        name="addressLine1"
                        type="text"
                        className="form-control"
                      />

                      <ErrorMessage
                        name="addressLine1"
                        component="div"
                        className="text-danger"
                      />
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col md={3}>
                      <label htmlFor="addressLine2">Address Line 2:</label>
                    </Col>

                    <Col md={9}>
                      <Field
                        name="addressLine2"
                        type="text"
                        className="form-control"
                      />

                      <ErrorMessage
                        name="addressLine2"
                        component="div"
                        className="text-danger"
                      />
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col md={3}>
                      <label htmlFor="state">State:</label>
                    </Col>

                    <Col md={9}>
                      <Field
                        as="select"
                        name="state"
                        className="form-control"
                        onChange={(e) => {
                          setFieldValue("state", e.target.value);

                          setFieldValue("city", "");
                          setFieldValue("location", "");
                        }}
                      >
                        <option value="">Select State</option>

                        {Object.keys(locationData).map((state) => (
                          <option key={state} value={state}>
                            {state}
                          </option>
                        ))}
                      </Field>

                      <ErrorMessage
                        name="state"
                        component="div"
                        className="text-danger"
                      />
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col md={3}>
                      <label htmlFor="city">City:</label>
                    </Col>

                    <Col md={9}>
                      <Field
                        as="select"
                        name="city"
                        className="form-control"
                        disabled={!values.state}
                        onChange={(e) => {
                          setFieldValue("city", e.target.value);

                          setFieldValue("location", "");
                        }}
                      >
                        <option value="">Select City</option>

                        {values.state &&
                          Object.keys(locationData[values.state] || {}).map(
                            (city) => (
                              <option key={city} value={city}>
                                {city}
                              </option>
                            ),
                          )}
                      </Field>

                      <ErrorMessage
                        name="city"
                        component="div"
                        className="text-danger"
                      />
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col md={3}>
                      <label htmlFor="location">Location:</label>
                    </Col>

                    <Col md={9}>
                      <Field
                        as="select"
                        name="location"
                        className="form-control"
                        disabled={!values.city}
                      >
                        <option value="">Select Location</option>

                        {values.state &&
                          values.city &&
                          (locationData[values.state]?.[values.city] || []).map(
                            (item) => (
                              <option key={item} value={item}>
                                {item}
                              </option>
                            ),
                          )}
                      </Field>

                      <ErrorMessage
                        name="location"
                        component="div"
                        className="text-danger"
                      />
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col md={3}>
                      <label htmlFor="country">Country:</label>
                    </Col>

                    <Col md={9}>
                      <Field
                        as="select"
                        name="country"
                        className="form-control"
                      >
                        <option value="">Select Country</option>

                        <option value="India">India</option>

                        <option value="Nepal">Nepal</option>
                      </Field>

                      <ErrorMessage
                        name="country"
                        component="div"
                        className="text-danger"
                      />
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col md={3}>
                      <label htmlFor="pincode">Pincode:</label>
                    </Col>

                    <Col md={9}>
                      <Field
                        name="pincode"
                        type="text"
                        className="form-control"
                      />

                      <ErrorMessage
                        name="pincode"
                        component="div"
                        className="text-danger"
                      />
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col md={3}>
                      <label htmlFor="mobileNumber">Mobile:</label>
                    </Col>

                    <Col md={9}>
                      <Field
                        name="mobileNumber"
                        type="text"
                        className="form-control"
                      />

                      <ErrorMessage
                        name="mobileNumber"
                        component="div"
                        className="text-danger"
                      />
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col md={3}>
                      <label htmlFor="email">Email:</label>
                    </Col>

                    <Col md={9}>
                      <Field
                        name="email"
                        type="email"
                        className="form-control"
                      />

                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-danger"
                      />
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col md={3}>
                      <label htmlFor="ownerName">Owner Name:</label>
                    </Col>

                    <Col md={9}>
                      <Field
                        name="ownerName"
                        type="text"
                        className="form-control"
                      />

                      <ErrorMessage
                        name="ownerName"
                        component="div"
                        className="text-danger"
                      />
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col md={3}>
                      <label htmlFor="website">Website:</label>
                    </Col>

                    <Col md={9}>
                      <Field
                        name="website"
                        type="text"
                        className="form-control"
                        placeholder="https://example.com"
                      />

                      <ErrorMessage
                        name="website"
                        component="div"
                        className="text-danger"
                      />
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col md={3}>
                      <label htmlFor="description">Description:</label>
                    </Col>

                    <Col md={9}>
                      <Field
                        name="description"
                        as="textarea"
                        rows="5"
                        className="form-control"
                      />

                      <ErrorMessage
                        name="description"
                        component="div"
                        className="text-danger"
                      />
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col md={3}>
                      <label htmlFor="images">Images:</label>
                    </Col>

                    <Col md={9}>
                      <input
                        type="file"
                        multiple
                        className="form-control"
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        onChange={(event) => {
                          const files = Array.from(
                            event.currentTarget.files || [],
                          );

                          setFieldValue("images", files);
                        }}
                      />

                      <ErrorMessage
                        name="images"
                        component="div"
                        className="text-danger"
                      />
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    {values.images.map((image, index) => (
                      <Col md={3} key={index} className="mb-3">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`preview-${index}`}
                          width="120"
                          height="120"
                          style={{
                            objectFit: "cover",
                            borderRadius: "5px",
                          }}
                        />
                      </Col>
                    ))}
                  </Row>

                  <Row>
                    <Col>
                      <button className="addRestaurent_btn" type="submit">
                        Submit
                      </button>
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
