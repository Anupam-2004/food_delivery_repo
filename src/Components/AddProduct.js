import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useFormik, Form, Formik, Field } from "formik";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "first name must be at least minimum 2 characters")
    .max(50, "first name must not exceed 50 characters")
    .matches(/^[A-Za-z .]+$/, "Name can only contain letters")
    .required("First Name is Mandatory"),
  address: Yup.string()
    .min(2, "adress  must be at least minimum 2 characters")
    .max(50, "adress must not exceed 50 characters")
    .matches(/^[A-Za-z1-9_ .]+$/, "Name can only contain letters")
    .required("adress  is Mandatory"),
  price: Yup.number().required("digit is required"),

  category: Yup.string()
  .min(2, "category name must be at least minimum 2 characters")
    .max(50, "category name must not exceed 50 characters")
    .matches(/^[A-Za-z]+$/, "Name can only contain letters")
    .required("category  is required"),
    option: Yup.string()
  .min(2, "option must be at least minimum 2 characters")
    .max(50, "option must not exceed 50 characters")
    .matches(/^[A-Za-z- ]+$/, "option can only contain letters")
    .required("option is required"),

  restaurent: Yup.string()
   .min(2, "Restaurent name must be at least minimum 2 characters")
    .max(50, "Restaurent name must not exceed 50 characters")
    .matches(/^[A-Za-z1-9_ .]+$/, " Restaurent name can only contain letters")
    .required("Restaurent Name is Mandatory"),
   image: Yup.mixed() 
  .required('File is required') 
  .test( 
    'fileSize', 
    'File is too large. Max size is 2MB', 
    value => value && value.size <= 2 * 1024 * 1024 // 2MB 
  ) 
  .test( 
    'fileType', 
    'Unsupported file format', 
    value => 
      value && 
      ['image/jpeg', 'image/png', 
'application/pdf'].includes(value.type) 
  ),
});

const AddProduct = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h1>Add products</h1>
          <div className="add_restro">
            <Formik
              initialValues={{
                Name: "",

                price: "",

                category: "",
                photo: "",
                restaurent:"",
                option:"",
                image:"",
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
                      <label htmlFor="name">Name</label>
                    </Col>
                    <Col>
                      <Field name="name" />
                      {errors.name && touched.name ? (
                        <div>{errors.name}</div>
                      ) : null}
                    </Col>
                  </Row>
                  <Row>
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
                  </Row>
                  <Row>
                    <Col>
                    <label htmlFor="restaurent">Restaurent</label>
                    </Col>
                    <Col>
                    <Field name="restaurent" as="select">
                        <option value="">Select Restaurent</option>
                        <option value="veg">Zint</option>
                        <option value="nonveg">Bottle</option>
                        <option value="fastfood">Blue Dimond</option>
                        <option value="southindian">XYZ</option>
                        <option value="chinese">ABC</option>
                    </Field>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <label htmlFor="price">price</label>
                    </Col>
                    <Col>
                      <Field name="price" />
                      {errors.price && touched.price ? (
                        <div>{errors.price}</div>
                      ) : null}
                    </Col>
                  </Row>
                    <Row>
                    <Col>
                      <label htmlFor="option">option</label>
                    </Col>
                    <Col>
                      <Field name="option" as="select">
                        <option value="">Select option</option>

                        <option value="Veg-Starter">Veg-Starter</option>
                        <option value="Veg-MainCourse">Veg-Main Course</option>
                        <option value="NonVeg-starter">NonVeg-starter</option>
                        <option value="NonVeg-MainCourse">NonVeg-Main Course</option>
                        <option value="southindian">Desserts</option>
                        <option value="chinese">Beverage</option>
                        <option value="chinese">Sides</option>
                      </Field>
                      {errors.category && touched.category ? (
                        <div>{errors.category}</div>
                      ) : null}
                    </Col>
                  </Row>
 <Row>
                    <Col>
                      <label htmlFor="image">image</label>
                    </Col>
                    <Col>
                      <Field image="image" />
                      {errors.image && touched.image ? (
                        <div>{errors.image}</div>
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
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AddProduct;
