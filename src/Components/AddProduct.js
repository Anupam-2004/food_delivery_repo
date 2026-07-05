// import React from "react";
// import { Container, Row, Col, Breadcrumb } from "react-bootstrap";
// import { useFormik, Form, Formik, Field } from "formik";
// import * as Yup from "yup";
// import Sidebar from "./Sidebar";

// const SignupSchema = Yup.object().shape({
//   name: Yup.string()
//     .min(2, "first name must be at least minimum 2 characters")
//     .max(50, "first name must not exceed 50 characters")
//     .matches(/^[A-Za-z .]+$/, "Name can only contain letters")
//     .required("First Name is Mandatory"),
//   address: Yup.string()
//     .min(2, "adress  must be at least minimum 2 characters")
//     .max(50, "adress must not exceed 50 characters")
//     .matches(/^[A-Za-z1-9_ .]+$/, "Name can only contain letters")
//     .required("adress  is Mandatory"),
//   price: Yup.number().required("digit is required"),

//   category: Yup.string()
//     .min(2, "category name must be at least minimum 2 characters")
//     .max(50, "category name must not exceed 50 characters")
//     .matches(/^[A-Za-z]+$/, "Name can only contain letters")
//     .required("category  is required"),
//   subcategory: Yup.string()
//     .min(2, "sub category name must be at least minimum 2 characters")
//     .max(50, "sub category name must not exceed 50 characters")
//     .matches(/^[A-Za-z]+$/, "Name can only contain letters")
//     .required("category  is required"),
//   option: Yup.string()
//     .min(2, "option must be at least minimum 2 characters")
//     .max(50, "option must not exceed 50 characters")
//     .matches(/^[A-Za-z- ]+$/, "option can only contain letters")
//     .required("option is required"),

//   restaurent: Yup.string()
//     .min(2, "Restaurent name must be at least minimum 2 characters")
//     .max(50, "Restaurent name must not exceed 50 characters")
//     .matches(/^[A-Za-z1-9_ .]+$/, " Restaurent name can only contain letters")
//     .required("Restaurent Name is Mandatory"),
//   files: Yup.array()
//     .required("At least one image is required")
//     .test(
//       "fileSize",
//       "Each image must be less than 2 MB",
//       (files) => !files || files.every((file) => file.size <= 2 * 1024 * 1024),
//     )
//     .test(
//       "fileType",
//       "Only JPG, JPEG, PNG and WEBP images are allowed",
//       (files) =>
//         !files ||
//         files.every((file) =>
//           ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
//             file.type,
//           ),
//         ),
//     ),
// });

// const AddProduct = () => {
//   return (
//     <Container>
//       <Row>
//         <Row>
//           <Col md={1}>
//             <Sidebar />
//           </Col>
//           <Col md={11}>
//             <h1>Add products</h1>
//           </Col>
//           <Breadcrumb>
//             <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>

//             <Breadcrumb.Item active>Add Products</Breadcrumb.Item>
//           </Breadcrumb>
//         </Row>
//         <Col>
//           <div className="add_restro">
//             <Formik
//               initialValues={{
//                 Name: "",

//                 price: "",

//                 category: "",
//                 subcategory: "",
//                 image: "",
//                 restaurent: "",
//                 option: "",
//               }}
//               validationSchema={SignupSchema}
//               onSubmit={(values) => {
//                 console.log(values);
//               }}
//             >
//               {({ errors, touched }) => (
//                 <Form>
//                   <Row>
//                     <Col md={3}>
//                       <label htmlFor="name">Name:</label>
//                     </Col>
//                     <Col md={9}>
//                       <Field name="name" as="input" type="text" />
//                       {errors.name && touched.name ? (
//                         <div>{errors.name}</div>
//                       ) : null}
//                     </Col>
//                   </Row>
//                   <Row>
//                     <Col md={3}>
//                       <label htmlFor="category">Category:</label>
//                     </Col>
//                     <Col md={9}>
//                       <Field name="category" as="select">
//                         <option value="">Select Category</option>
//                         <option value="veg">Veg</option>
//                         <option value="nonveg">Non-Veg</option>
//                         <option value="fastfood">Fast Food</option>
//                         <option value="southindian">South Indian</option>
//                         <option value="chinese">Chinese</option>
//                       </Field>
//                       {errors.category && touched.category ? (
//                         <div>{errors.category}</div>
//                       ) : null}
//                     </Col>
//                   </Row>
//                   <Row>
//                     <Col md={3}>
//                       <label htmlFor="subcategory">Subcategory:</label>
//                     </Col>
//                     <Col md={9}>
//                       <Field name="subcategory" as="select">
//                         <option value="">Select Subcategory</option>
//                         <option value="veg">Veg</option>
//                         <option value="nonveg">Non-Veg</option>
//                         <option value="fastfood">Fast Food</option>
//                         <option value="southindian">South Indian</option>
//                         <option value="chinese">Chinese</option>
//                       </Field>
//                       {errors.subcategory && touched.subcategory ? (
//                         <div>{errors.subcategory}</div>
//                       ) : null}
//                     </Col>
//                   </Row>
//                   <Row>
//                     <Col md={3}>
//                       <label htmlFor="restaurent">Restaurent:</label>
//                     </Col>
//                     <Col md={9}>
//                       <Field name="restaurent" as="select">
//                         <option value="">Select Restaurent</option>
//                         <option value="veg">Zint</option>
//                         <option value="nonveg">Bottle</option>
//                         <option value="fastfood">Blue Dimond</option>
//                         <option value="southindian">XYZ</option>
//                         <option value="chinese">ABC</option>
//                       </Field>
//                     </Col>
//                   </Row>

//                   <Row>
//                     <Col md={3}>
//                       <label htmlFor="price">price:</label>
//                     </Col>
//                     <Col md={9}>
//                       <Field name="price" />
//                       {errors.price && touched.price ? (
//                         <div>{errors.price}</div>
//                       ) : null}
//                     </Col>
//                   </Row>
//                   <Row>
//                     <Col md={3}>
//                       <label htmlFor="option">option:</label>
//                     </Col>
//                     <Col md={9}>
//                       <Field name="option" as="select">
//                         <option value="">Select option</option>

//                         <option value="Veg-Starter">Veg-Starter</option>
//                         <option value="Veg-MainCourse">Veg-Main Course</option>
//                         <option value="NonVeg-starter">NonVeg-starter</option>
//                         <option value="NonVeg-MainCourse">
//                           NonVeg-Main Course
//                         </option>
//                         <option value="southindian">Desserts</option>
//                         <option value="chinese">Beverage</option>
//                         <option value="chinese">Sides</option>
//                       </Field>
//                       {errors.category && touched.category ? (
//                         <div>{errors.category}</div>
//                       ) : null}
//                     </Col>
//                   </Row>
//                   <Row>
//                     <Col md={3}>
//                       <label htmlFor="image">Image :</label>
//                     </Col>
//                     <Col md={9}>
//                       <input
//                         type="file"
//                         multiple
//                         name="files"
//                         onChange={(e) =>
//                           errors("files", Array.from(e.currentTarget.files))
//                         }
//                       />

//                       {/* {errors.touched.files && errors.errors.files && (
//                                            <p>{errors.errors.files}</p>
//                                          )} */}
//                     </Col>
//                   </Row>
//                   <Row>
//                     <Col>
//                       <button type="submit">Submit</button>
//                     </Col>
//                   </Row>
//                 </Form>
//               )}
//             </Formik>
//           </div>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default AddProduct;
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Sidebar from "./Sidebar";
import { Container,Row,Col,Breadcrumb } from "react-bootstrap";
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
  "Non-Veg": [
    "Chicken",
    "Mutton",
    "Fish",
    "Egg",
    "Rice",
    "Breads",
    "Starters",
  ],
};

const SignupSchema = Yup.object({
  foodType: Yup.string().required("Select food type"),

  category: Yup.string().required("Select category"),

  foodName: Yup.string()
    .min(2)
    .max(50)
    .required("Food name is required"),

  price: Yup.number()
    .typeError("Price must be a number")
    .positive("Price must be greater than 0")
    .required("Price is required"),

  description: Yup.string()
    .min(10)
    .required("Description is required"),

  files: Yup.array()
    .min(1, "Please upload an image")
    .required("Image is required"),
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
          <Breadcrumb.Item > <Link to={'/Dashboard'}>Dashboard</Link></Breadcrumb.Item>
           <Breadcrumb.Item active>Add Products</Breadcrumb.Item>
          </Breadcrumb>
        </Row>
          </Container>
          
    
    <Formik
      initialValues={{
        foodType: "Veg",
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
        

          {/* Food Type */}

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

          <Field
            name="foodName"
            type="text"
            className="form-control"
          />

          <ErrorMessage
            name="foodName"
            component="div"
            className="text-danger"
          />

          <br />

          {/* Price */}

          <label>Price</label>

          <Field
            name="price"
            type="number"
            className="form-control"
          />

          <ErrorMessage
            name="price"
            component="div"
            className="text-danger"
          />

          <br />

          {/* Description */}

          <label>Description</label>

          <Field
            as="textarea"
            name="description"
            className="form-control"
          />

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
            onChange={(event) => {
              setFieldValue(
                "files",
                Array.from(event.currentTarget.files)
              );
            }}
          />

          <ErrorMessage
            name="files"
            component="div"
            className="text-danger"
          />

          <br />

          <button
            type="submit"
            className="btn btn-success"
          >
            Add Product
          </button>

        </Form>
      )}
    </Formik>
    </div>
  );
}