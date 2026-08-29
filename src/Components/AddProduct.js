import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Sidebar from "./Sidebar";
import { Container, Row, Col, Breadcrumb } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import axios from "axios";
const SignupSchema = Yup.object({
  foodType: Yup.string().required("Select food type"),
  restaurentId: Yup.string().required("Select Restaurent"),

  category: Yup.string().required("Select category"),

  foodName: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, "Food name can contain only letters and spaces")
    .min(2, "Minimum 2 characters")
    .max(50, "Maximum 50 characters")
    .required("Food name is required"),

  price: Yup.number()
    .typeError("Price must be a number")
    .positive("Price must be greater than 0")
    .required("Price is required"),

  description: Yup.string().min(10).required("Description is required"),

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

export default function AddProduct() {
  let navigate = useNavigate();
  const { user: currentUser } = useSelector((state) => state.auth);
  const [submitError, setSubmitError] = useState("");
  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
    if (!currentUser) {
      navigate("/");
      return;
    }

    if (
      currentUser.roles &&
      !currentUser.roles.includes("ROLE_OWNER") &&
      !currentUser.roles.includes("ROLE_ADMIN")
    ) {
      navigate("/");
      return;
    } else {
      console.log(currentUser);
    }
  }, [currentUser, navigate]);
  // const [subCategories, setSubCategories] = useState(
  //   categories["Select Food Type..."],
  // );
  const [restaurents, setRestaurents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8090/api/restaurents")
      .then((response) => {
        console.log("data comes from backend :", response.data);
        setRestaurents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <Container>
        <Row>
          <Col md={5}>
            <Sidebar />
          </Col>
          <Col md={7}>
            <h1>Add product</h1>
          </Col>
          <Breadcrumb>
            <Breadcrumb.Item href="/Dashboard">
              {" "}
              {/* <Link to={"/Dashboard"}>Dashboard</Link> */}
              Dashboard
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Add Product</Breadcrumb.Item>
          </Breadcrumb>
        </Row>
      </Container>

      <Formik
        initialValues={{
          foodType: "",
          restaurentId: "",
          category: "Main Course",
          foodName: "",
          price: "",
          description: "",
          images: [],
        }}
        validationSchema={SignupSchema}
        onSubmit={async (values, { resetForm }) => {
          setSubmitError("");
          const formData = new FormData();
          formData.append("userId", currentUser.id);
          Object.keys(values).forEach((key) => {
            if (key !== "images") {
              formData.append(key, values[key]);
            }
          });

          values.images.forEach((file) => {
            formData.append("images", file);
          });
          console.log(formData);

          try {
            const res = await axios.post(
              "http://localhost:8090/api/products",
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              },
            );
            console.log(res);
            alert("Food Added successfully!");
            resetForm();
          } catch (err) {
            const message =
              err.response?.data?.message ||
              err.response?.data?.error ||
              "Food add nahi hua. Backend server aur form details check karein.";
            console.error("Food add failed:", err.response?.data || err.message);
            setSubmitError(message);
          }
        }}
      >
        {({ values, setFieldValue }) => (
          <Form
            style={{
              width: "600px",
              margin: "30px auto",
            }}
          >
            <label>Choose Restaurent</label>

            <Field as="select" name="restaurentId" className="form-control">
              <option value="">choose restaurent</option>
              {restaurents
                ? restaurents.map((restaurent, index) => {
                    return (
                      <option value={restaurent._id || restaurent.id} key={restaurent._id || restaurent.id || index}>
                        {restaurent.restaurentName}
                      </option>
                    );
                  })
                : ""}
            </Field>

            <ErrorMessage
              name="restaurentId"
              component="div"
              className="text-danger"
            />

            <label>Food Type</label>

            <Field as="select" name="foodType" className="form-control">
              {/* <option value="foodType">Food Type</option> */}
              <option value="">Select Food Type...</option>
              <option value="Veg">Veg</option>
              <option value="Non-Veg"> Veg & Non-Veg</option>
            </Field>

            <ErrorMessage
              name="foodType"
              component="div"
              className="text-danger"
            />

            <br />

            {/* Category */}

            <label>Category</label>

            <Field as="select" name="category" className="form-control">
              <option value="">Choose Category</option>

              {/* Veg Categories */}
              <option value="Main Course">Main Course</option>
              <option value="Breads">Breads</option>
              <option value="Rice">Rice</option>
              <option value="Starters">Starters</option>
              <option value="Snacks">Snacks</option>
              <option value="Desserts">Desserts</option>
              <option value="Beverages">Beverages</option>

              {/* Non-Veg Categories */}
              <option value="Chicken">Chicken</option>
              <option value="Mutton">Mutton</option>
              <option value="Fish">Fish</option>
              <option value="Egg">Egg</option>
            </Field>

            <ErrorMessage
              name="category"
              component="div"
              className="text-danger"
            />
            <br />

            <label>Food Name</label>

            <Field name="foodName" type="text" className="form-control" />

            <ErrorMessage
              name="foodName"
              component="div"
              className="text-danger"
            />

            <br />

            {/* Price */}

            <label>Price</label>

            <Field name="price" type="number" className="form-control" />

            <ErrorMessage
              name="price"
              component="div"
              className="text-danger"
            />

            <br />

            {/* Description */}

            <label>Description</label>

            <Field as="textarea" name="description" className="form-control" />

            <ErrorMessage
              name="description"
              component="div"
              className="text-danger"
            />

            <br />

            <label>Food Image</label>

            <input
              type="file"
              multiple
              className="form-control"
              accept="image/jpeg, image/jpg, image/png, image/webp"
              onChange={(event) => {
                setFieldValue("images", Array.from(event.currentTarget.files));
              }}
            />

            <ErrorMessage
              name="images"
              component="div"
              className="text-danger"
            />
            {submitError && <div className="text-danger mt-2">{submitError}</div>}
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
            <br />

            <button className="addProduct_btn" type="submit">
              Add Product
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
