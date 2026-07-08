
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Sidebar from "./Sidebar";
import { Container, Row, Col, Breadcrumb } from "react-bootstrap";
import { Link } from "react-router";
const categories = {
  Veg: [
    "Main Course",
    "Breads",
    "Rice",
    "Starters",
    "Snacks",
    "Desserts",
    "Beverages",
  ],
  "Non-Veg": ["Chicken", "Mutton", "Fish", "Egg", "Rice", "Breads", "Starters"],
};

//  ff
const SignupSchema = Yup.object({
  foodType: Yup.string().required("Select food type"),
  restaurentId: Yup.string().required("Select Restaurent"),

  category: Yup.string().required("Select category"),

  foodName: Yup.string()
    .matches(
      /^[a-zA-Z\s]+$/,
      "Food name can contain only letters and spaces"
    )
    .min(2, "Minimum 2 characters")
    .max(50, "Maximum 50 characters")
    .required("Food name is required"),

  price: Yup.number()
    .typeError("Price must be a number")
    .positive("Price must be greater than 0")
    .required("Price is required"),

  description: Yup.string().min(10).required("Description is required"),

  files: Yup.array()
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
  const [subCategories, setSubCategories] = useState(categories["Veg"]);

  return (
    <div>
      <Container>
        <Row>
          <Col md={5}>
            <Sidebar />
          </Col>
          <Col md={7}>
            <h1>Add products</h1>
          </Col>
          <Breadcrumb>
            <Breadcrumb.Item>
              {" "}
              <Link to={"/Dashboard"}>Dashboard</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Add Products</Breadcrumb.Item>
          </Breadcrumb>
        </Row>
      </Container>

      <Formik
        initialValues={{
          foodType: "Veg",
          restaurentId:"",
          category: "Main Course",
          foodName: "",
          price: "",
          description: "",
          files: [],
        }}
        validationSchema={SignupSchema}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          alert("Food Added Successfully");
          resetForm();
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

            <Field
              as="select"
              name="restaurentId"
              className="form-control"
              onChange={(e) => {
                const value = e.target.value;
                setFieldValue("restaurentId", value);
                setFieldValue("restaurentId", categories[value][0]);
                setSubCategories(categories[value]);
              }}
            >
              <option value="restaurentId">Zing</option>
              <option value="restaurentId">Blue Diamond</option>
            </Field>

            <ErrorMessage
              name="restaurentId"
              component="div"
              className="text-danger"
            />

            <label>Food Type</label>

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

            <ErrorMessage
              name="foodType"
              component="div"
              className="text-danger"
            />

            <br />

            {/* Category */}

            <label>Category</label>

            <Field as="select" name="category" className="form-control">
              {subCategories.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </Field>

            <ErrorMessage
              name="category"
              component="div"
              className="text-danger"
            />

            <br />

            {/* Food Name */}

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

            {/* Image */}

            <label>Food Image</label>

            <input
              type="file"
              multiple
              className="form-control"
              accept="image/jpeg, image/jpg, image/png, image/webp"
              onChange={(event) => {
                setFieldValue("files", Array.from(event.currentTarget.files));
              }}
            />

            <ErrorMessage
              name="files"
              component="div"
              className="text-danger"
            />
            <Row>
              {values.files.map((file, index) => (
                <Col md={3} key={index}>
                  <img
                    key={index}
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    width="120"
                    height="120"
                    style={{ objectFit: "cover", borderRadius: "5px" }}
                  />
                </Col>
              ))}
            </Row>
            <br />

            <button className="addProduct_btn "type="submit">
              Add Product
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
