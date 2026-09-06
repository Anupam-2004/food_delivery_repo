// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Formik, Form, Field } from "formik";
// import * as Yup from "yup";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import "./Address.css";

// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   Button,
//   Modal,
//   Form as BootstrapForm,
// } from "react-bootstrap";

// const addressSchema = Yup.object().shape({
//   name: Yup.string()
//     .min(2, "restaurent name must be at least minimum 2 characters")
//     .max(50, "restaurent name must not exceed 50 characters")
//     .matches(/^[A-Za-z_ .]+$/, "name can only contain letters")
//     .required(" restaurent name is Required"),
//   addressLine1: Yup.string()
//     .min(2, "adressLine1  must be at least minimum 2 characters")
//     .max(50, "addressLine1 must not exceed 50 characters")
//     .matches(/^[A-Za-z1-9_ .]+$/, "Name can only contain letters")
//     .required("addressLine1  is Mandatory"),
//   addressLine2: Yup.string()
//     .min(2, "addressLine2  must be at least minimum 2 characters")
//     .max(50, "addressLine2 must not exceed 50 characters")
//     .matches(/^[A-Za-z1-9_ .]+$/, "Name can only contain letters")
//     .required("addressLine2  is Mandatory"),
//   district: Yup.string()
//     .min(2, "location  must be at least minimum 2 characters")
//     .max(50, "location must not exceed 50 characters")
//     .matches(/^[A-Za-z1-9_ .]+$/, "Name can only contain letters")
//     .required("location  is Mandatory"),
//   city: Yup.string()
//     .min(2, "city  must be at least minimum 2 characters")
//     .max(50, "city must not exceed 50 characters")
//     .matches(/^[A-Za-z1-9_ .]+$/, "Name can only contain letters")
//     .required("city  is Mandatory"),
//   state: Yup.string()
//     .min(2, "state  must be at least minimum 2 characters")
//     .max(50, "state must not exceed 50 characters")
//     .matches(/^[A-Za-z1-9_ .]+$/, "Name can only contain letters")
//     .required("state  is Mandatory"),
//   pin: Yup.string()
//     .required("PIN code is required")
//     .matches(/^[1-9][0-9]{5}$/, "Enter a valid 6-digit PIN code"),

//   mobile: Yup.string().matches(/^[6-9]\d{9}$/, "enter valid 10 digit numbers"),
//   email: Yup.string().matches(
//     /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
//     "Enter a valid email address",
//   ),

//   addressType: Yup.string().required("Required"),
// });

// const emptyAddress = {
//   name: "",
//   addressLine1: "",
//   addressLine2: "",
//   city: "",
//   district: "",
//   state: "",
//   pin: "",
//   mobile: "",
//   email: "",
//   addressType: "",
// };

// const Address = () => {
//   const { user: currentUser } = useSelector((state) => state.auth);

//   const [addresses, setAddresses] = useState([]);
//   const [show, setShow] = useState(false);
//   const [editAddress, setEditAddress] = useState(null);
//   const [selectedAddress, setSelectedAddress] = useState("");
//   const navigate = useNavigate();

//   const [cart, setCart] = useState({ items: [] });

//   const getCart = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:8090/api/carts/user/${currentUser.id}`,
//       );

//       setCart(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const getAddresses = async () => {
//     axios
//       .get(`http://localhost:8090/api/addresses/user/${currentUser.id}`)
//       .then((response) => {
//         setAddresses(response.data);
//         console.log(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   useEffect(() => {
//     if (!currentUser?.id) {
//       return;
//     }
//     getAddresses();
//     getCart();
//   }, [currentUser?.id]);

//   const handleShow = () => {
//     setEditAddress(null);
//     setShow(true);
//   };

//   const handleClose = () => {
//     setShow(false);
//     setEditAddress(null);
//   };

//   const handleEdit = (item) => {
//     setEditAddress(item);
//     setShow(true);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this address?")) {
//       return;
//     }

//     axios
//       .delete(`http://localhost:8090/api/addresses/${id}`)
//       .then((response) => {
//         console.log("Address deleted successfully");

//         getAddresses();
//       })
//       .catch((error) => {
//         console.log("Delete Error:", error);
//       });
//   };

//   const handleSubmit = async (values) => {
//     const data = {
//       ...values,
//       userId: currentUser.id,
//     };

//     if (editAddress) {
//       // Update Address
//       axios
//         .put(`http://localhost:8090/api/addresses/${editAddress.id}`, data)
//         .then((response) => {
//           console.log("Address updated successfully", response.data);

//           handleClose();
//           getAddresses();
//         })
//         .catch((error) => {
//           console.log("Update Error:", error);
//         });
//     } else {
//       // Add New Address
//       axios
//         .post("http://localhost:8090/api/addresses", data)
//         .then((response) => {
//           console.log("Address added successfully", response.data);

//           handleClose();
//           getAddresses();
//         })
//         .catch((error) => {
//           console.log("Add Error:", error);
//         });
//     }
//   };
//   const handleOrder = async () => {
//     if (!selectedAddress) {
//       alert("Please select an address.");
//       return;
//     }

//     if (cart.items.length === 0) {
//       alert("Cart is empty.");
//       return;
//     }

//     const order = {
//       userId: currentUser.id,
//       addressId: selectedAddress,
//       active: true,

//       items: cart.items.map((item) => ({
//         productId: item.productId,
//         restaurentId: item.restaurentId,
//         quantity: item.quantity,
//         price: item.price,
//       })),

//       paymentStatus: "pending",
//       orderStatus: "processing",
//     };
//     axios
//       .post("http://localhost:8090/api/orders", order)
//       .then((response) => {
//         alert("Order Placed Successfully");

//         console.log(response.data);

//         return axios.delete(
//           `http://localhost:8090/api/carts/user/${currentUser.id || currentUser._id}`,
//         );
//       })
//       .then(() => {
//         navigate("/orders");
//       })
//       .catch((error) => {
//         console.log(error.response?.data || error);

//         alert("Order Failed");
//       });
//   };
//   const initialValues = editAddress
//     ? {
//         name: editAddress.name,
//         addressLine1: editAddress.addressLine1,
//         addressLine2: editAddress.addressLine2,
//         city: editAddress.city,
//         district: editAddress.district,
//         state: editAddress.state,
//         pin: editAddress.pin,
//         mobile: editAddress.mobile,
//         email: editAddress.email,
//         addressType: editAddress.addressType,
//       }
//     : emptyAddress;

//   return (
//     <Container className="mt-4">
//       <Row className="mb-3">
//         <Col>
//           <h2>Delivery Address</h2>
//         </Col>

//         <Col className="text-end">
//           <Button onClick={handleShow}>+Add Address</Button>
//         </Col>
//       </Row>

//       <Row>
//         {addresses.length === 0 ? (
//           <Col>
//             <Card>
//               <Card.Body className="text-center">
//                 <h5>No Address Found</h5>

//                 <Button className="mt-3" onClick={handleShow}>
//                   + Add Address
//                 </Button>
//               </Card.Body>
//             </Card>
//           </Col>
//         ) : (
//           addresses.map((item) => (
//             <Col lg={6} md={6} sm={12} key={item.id} className="mb-3">
//               <Card
//                 className={`address-card ${
//                   selectedAddress === item.id ? "selected-card" : ""
//                 }`}
//               >
//                 <Card.Body>
//                   <div className="d-flex justify-content-between">
//                     <BootstrapForm.Check
//                       type="radio"
//                       checked={selectedAddress === item.id}
//                       onChange={() => setSelectedAddress(item.id)}
//                     />

//                     <span className="badge bg-primary">{item.addressType}</span>
//                   </div>

//                   <hr />

//                   <h5>{item.name}</h5>

//                   <p>
//                     {item.addressLine1}
//                     <br />
//                     {item.addressLine2}
//                   </p>

//                   <p>
//                     {item.city}, {item.district}, {item.state}
//                     {" - "}
//                     {item.pin}
//                   </p>

//                   <p>
//                     <strong>Mobile :</strong> {item.mobile}
//                   </p>

//                   <p>
//                     <strong>Email :</strong> {item.email}
//                   </p>

//                   <div className="mt-3">
//                     <Button variant="warning" onClick={() => handleEdit(item)}>
//                       Edit
//                     </Button>

//                     <Button
//                       variant="danger"
//                       className="ms-2"
//                       onClick={() => handleDelete(item.id)}
//                     >
//                       Delete
//                     </Button>
//                   </div>
//                 </Card.Body>
//               </Card>
//             </Col>
//           ))
//         )}
//       </Row>

//       <Modal show={show} onHide={handleClose} size="lg">
//         <Modal.Header closeButton>
//           <Modal.Title>
//             {editAddress ? "Update Address" : "Add Address"}
//           </Modal.Title>
//         </Modal.Header>

//         <Modal.Body>
//           <Formik
//             initialValues={initialValues}
//             validationSchema={addressSchema}
//             enableReinitialize
//             onSubmit={handleSubmit}
//           >
//             {({ errors, touched }) => (
//               <Form>
//                 <Row>
//                   <Col md={6} className="mb-3">
//                     <label>Name</label>

//                     <Field type="text" name="name" className="form-control" />

//                     {errors.name && touched.name && (
//                       <small className="text-danger">{errors.name}</small>
//                     )}
//                   </Col>

//                   <Col md={6} className="mb-3">
//                     <label>Address Type</label>

//                     <Field
//                       as="select"
//                       name="addressType"
//                       className="form-control"
//                     >
//                       <option value="">Select</option>

//                       <option value="Home">Home</option>

//                       <option value="Work">Work</option>

//                       <option value="Other">Other</option>
//                     </Field>

//                     {errors.addressType && touched.addressType && (
//                       <small className="text-danger">
//                         {errors.addressType}
//                       </small>
//                     )}
//                   </Col>

//                   <Col md={6} className="mb-3">
//                     <label>Address Line 1</label>

//                     <Field
//                       type="text"
//                       name="addressLine1"
//                       className="form-control"
//                     />

//                     {errors.addressLine1 && touched.addressLine1 && (
//                       <small className="text-danger">
//                         {errors.addressLine1}
//                       </small>
//                     )}
//                   </Col>

//                   <Col md={6} className="mb-3">
//                     <label>Address Line 2</label>

//                     <Field
//                       type="text"
//                       name="addressLine2"
//                       className="form-control"
//                     />

//                     {errors.addressLine2 && touched.addressLine2 && (
//                       <small className="text-danger">
//                         {errors.addressLine2}
//                       </small>
//                     )}
//                   </Col>

//                   <Col md={6} className="mb-3">
//                     <label>City</label>

//                     <Field type="text" name="city" className="form-control" />

//                     {errors.city && touched.city && (
//                       <small className="text-danger">{errors.city}</small>
//                     )}
//                   </Col>

//                   <Col md={6} className="mb-3">
//                     <label>District</label>

//                     <Field
//                       type="text"
//                       name="district"
//                       className="form-control"
//                     />

//                     {errors.district && touched.district && (
//                       <small className="text-danger">{errors.district}</small>
//                     )}
//                   </Col>

//                   <Col md={6} className="mb-3">
//                     <label>State</label>

//                     <Field type="text" name="state" className="form-control" />

//                     {errors.state && touched.state && (
//                       <small className="text-danger">{errors.state}</small>
//                     )}
//                   </Col>

//                   <Col md={6} className="mb-3">
//                     <label>Pincode</label>

//                     <Field type="text" name="pin" className="form-control" />

//                     {errors.pin && touched.pin && (
//                       <small className="text-danger">{errors.pin}</small>
//                     )}
//                   </Col>

//                   <Col md={6} className="mb-3">
//                     <label>Mobile</label>

//                     <Field type="text" name="mobile" className="form-control" />

//                     {errors.mobile && touched.mobile && (
//                       <small className="text-danger">{errors.mobile}</small>
//                     )}
//                   </Col>

//                   <Col md={6} className="mb-3">
//                     <label>Email</label>

//                     <Field type="email" name="email" className="form-control" />

//                     {errors.email && touched.email && (
//                       <small className="text-danger">{errors.email}</small>
//                     )}
//                   </Col>
//                 </Row>

//                 <div className="text-end">
//                   <Button
//                     variant="secondary"
//                     onClick={handleClose}
//                     className="me-2"
//                   >
//                     Cancel
//                   </Button>

//                   <Button variant="primary" type="submit">
//                     {editAddress ? "Update Address" : "Save Address"}
//                   </Button>
//                 </div>
//               </Form>
//             )}
//           </Formik>
//         </Modal.Body>
//       </Modal>
//       <Button variant="success" className="mt-3" onClick={handleOrder}>
//         Place Order
//       </Button>
//     </Container>
//   );
// };

// export default Address;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Address.css";

import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form as BootstrapForm,
} from "react-bootstrap";

// =========================
// Validation Schema
// =========================
const addressSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters")
    .matches(/^[A-Za-z_ .]+$/, "Name can only contain letters")
    .required("Name is required"),

  addressLine1: Yup.string()
    .min(2, "Address Line 1 must be at least 2 characters")
    .max(100, "Address Line 1 must not exceed 100 characters")
    .required("Address Line 1 is required"),

  addressLine2: Yup.string()
    .min(2, "Address Line 2 must be at least 2 characters")
    .max(100, "Address Line 2 must not exceed 100 characters")
    .required("Address Line 2 is required"),

  district: Yup.string()
    .min(2, "District must be at least 2 characters")
    .max(50, "District must not exceed 50 characters")
    .matches(/^[A-Za-z_ .]+$/, "District can only contain letters")
    .required("District is required"),

  city: Yup.string()
    .min(2, "City must be at least 2 characters")
    .max(50, "City must not exceed 50 characters")
    .matches(/^[A-Za-z_ .]+$/, "City can only contain letters")
    .required("City is required"),

  state: Yup.string()
    .min(2, "State must be at least 2 characters")
    .max(50, "State must not exceed 50 characters")
    .matches(/^[A-Za-z_ .]+$/, "State can only contain letters")
    .required("State is required"),

  pin: Yup.string()
    .required("PIN code is required")
    .matches(/^[1-9][0-9]{5}$/, "Enter a valid 6-digit PIN code"),

  mobile: Yup.string().matches(
    /^[6-9]\d{9}$/,
    "Enter a valid 10 digit mobile number"
  ),

  email: Yup.string().email("Enter a valid email address"),

  addressType: Yup.string().required("Address type is required"),
});

// =========================
// Empty Address
// =========================
const emptyAddress = {
  name: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  district: "",
  state: "",
  pin: "",
  mobile: "",
  email: "",
  addressType: "",
};

const Address = () => {
  // =========================
  // Current User
  // =========================
  const { user: currentUser } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  // =========================
  // States
  // =========================
  const [addresses, setAddresses] = useState([]);
  const [show, setShow] = useState(false);
  const [editAddress, setEditAddress] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [cart, setCart] = useState({ items: [] });

  // =========================
  // User ID
  // =========================
  const userId = currentUser?.id || currentUser?._id;

  // =========================
  // Get Cart
  // =========================
  const getCart = () => {
    if (!userId) {
      console.log("User ID not found");
      return;
    }

    axios
      .get(`http://localhost:8090/api/carts/user/${userId}`)
      .then((response) => {
        console.log("Cart:", response.data);

        setCart(response.data || { items: [] });
      })
      .catch((error) => {
        console.log(
          "Cart Error:",
          error.response?.data || error
        );

        setCart({ items: [] });
      });
  };

  // =========================
  // Get Addresses
  // =========================
  const getAddresses = () => {
    if (!userId) {
      console.log("User ID not found");
      return;
    }

    axios
      .get(`http://localhost:8090/api/addresses/user/${userId}`)
      .then((response) => {
        console.log("Addresses:", response.data);

        setAddresses(response.data || []);
      })
      .catch((error) => {
        console.log(
          "Address Error:",
          error.response?.data || error
        );
      });
  };

  // =========================
  // useEffect
  // =========================
  useEffect(() => {
    if (!userId) {
      return;
    }

    getAddresses();
    getCart();
  }, [userId]);

  // =========================
  // Open Add Modal
  // =========================
  const handleShow = () => {
    setEditAddress(null);
    setShow(true);
  };

  // =========================
  // Close Modal
  // =========================
  const handleClose = () => {
    setShow(false);
    setEditAddress(null);
  };

  // =========================
  // Edit Address
  // =========================
  const handleEdit = (item) => {
    console.log("Edit Address:", item);

    setEditAddress(item);
    setShow(true);
  };

  // =========================
  // Delete Address
  // =========================
  const handleDelete = (id) => {
    if (!window.confirm("Delete this address?")) {
      return;
    }

    axios
      .delete(`http://localhost:8090/api/addresses/${id}`)
      .then((response) => {
        console.log(
          "Address deleted successfully:",
          response.data
        );

        getAddresses();

        if (selectedAddress === id) {
          setSelectedAddress("");
        }
      })
      .catch((error) => {
        console.log(
          "Delete Error:",
          error.response?.data || error
        );
      });
  };

  // =========================
  // Add / Update Address
  // =========================
  const handleSubmit = (values) => {
    if (!userId) {
      alert("User not found. Please login again.");
      return;
    }

    const data = {
      ...values,
      userId: userId,
    };

    console.log("Address Data:", data);

    // =========================
    // UPDATE ADDRESS
    // =========================
    if (editAddress) {
      const addressId =
        editAddress.id || editAddress._id;

      if (!addressId) {
        console.log("Address ID not found");
        return;
      }

      axios
        .put(
          `http://localhost:8090/api/addresses/${addressId}`,
          data
        )
        .then((response) => {
          console.log(
            "Address updated successfully:",
            response.data
          );

          handleClose();
          getAddresses();
        })
        .catch((error) => {
          console.log(
            "Update Error:",
            error.response?.data || error
          );
        });

      return;
    }

    // =========================
    // ADD ADDRESS
    // =========================
    axios
      .post("http://localhost:8090/api/addresses", data)
      .then((response) => {
        console.log(
          "Address added successfully:",
          response.data
        );

        handleClose();
        getAddresses();
      })
      .catch((error) => {
        console.log(
          "Add Error:",
          error.response?.data || error
        );
      });
  };

  // =========================
  // Place Order
  // =========================
  const handleOrder = () => {
    if (!userId) {
      alert("Please login first.");
      return;
    }

    if (!selectedAddress) {
      alert("Please select an address.");
      return;
    }

    if (!cart?.items || cart.items.length === 0) {
      alert("Cart is empty.");
      return;
    }

    const order = {
      userId: userId,

      addressId: selectedAddress,

      active: true,

      items: cart.items.map((item) => ({
        productId:
          item.productId?._id ||
          item.productId?.id ||
          item.productId,

        restaurentId:
          item.restaurentId?._id ||
          item.restaurentId?.id ||
          item.restaurentId,

        quantity: item.quantity,

        price: item.price,
      })),

      paymentStatus: "pending",

      orderStatus: "processing",
    };

    console.log("Order:", order);

    // Create Order
    axios
      .post("http://localhost:8090/api/orders", order)
      .then((response) => {
        alert("Order Placed Successfully");

        console.log("Order Response:", response.data);
        const placedOrderId = response.data?._id || response.data?.id;

        // Delete Cart
        return axios.delete(
          `http://localhost:8090/api/carts/user/${userId}`
        ).then(() => placedOrderId);
      })
      .then((placedOrderId) => {
        console.log("Cart deleted successfully");

        navigate("/Orders", {
          state: {
            placedOrderId,
            orderPlaced: true,
          },
        });
      })
      .catch((error) => {
        console.log(
          "Order Error:",
          error.response?.data || error
        );

        alert("Order Failed");
      });
  };

  // =========================
  // Form Initial Values
  // =========================
  const initialValues = editAddress
    ? {
        name: editAddress.name || "",
        addressLine1: editAddress.addressLine1 || "",
        addressLine2: editAddress.addressLine2 || "",
        city: editAddress.city || "",
        district: editAddress.district || "",
        state: editAddress.state || "",
        pin: editAddress.pin || "",
        mobile: editAddress.mobile || "",
        email: editAddress.email || "",
        addressType: editAddress.addressType || "",
      }
    : emptyAddress;

  // =========================
  // JSX
  // =========================
  return (
    <Container className="mt-4 mb-5">

      {/* Header */}
      <Row className="mb-3">
        <Col>
          <h2>Delivery Address</h2>
        </Col>

        <Col className="text-end">
          <Button onClick={handleShow}>
            + Add Address
          </Button>
        </Col>
      </Row>

      {/* Address List */}
      <Row>
        {addresses.length === 0 ? (
          <Col>
            <Card>
              <Card.Body className="text-center">
                <h5>No Address Found</h5>

                <Button
                  className="mt-3"
                  onClick={handleShow}
                >
                  + Add Address
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ) : (
          addresses.map((item) => {
            const addressId =
              item.id || item._id;

            return (
              <Col
                lg={6}
                md={6}
                sm={12}
                key={addressId}
                className="mb-3"
              >
                <Card
                  className={`address-card ${
                    selectedAddress === addressId
                      ? "selected-card"
                      : ""
                  }`}
                >
                  <Card.Body>

                    {/* Radio + Type */}
                    <div className="d-flex justify-content-between">
                      <BootstrapForm.Check
                        type="radio"
                        name="selectedAddress"
                        checked={
                          selectedAddress === addressId
                        }
                        onChange={() =>
                          setSelectedAddress(addressId)
                        }
                      />

                      <span className="badge bg-primary">
                        {item.addressType}
                      </span>
                    </div>

                    <hr />

                    <h5>{item.name}</h5>

                    <p>
                      {item.addressLine1}
                      <br />
                      {item.addressLine2}
                    </p>

                    <p>
                      {item.city}, {item.district},{" "}
                      {item.state} - {item.pin}
                    </p>

                    <p>
                      <strong>Mobile:</strong>{" "}
                      {item.mobile}
                    </p>

                    <p>
                      <strong>Email:</strong>{" "}
                      {item.email}
                    </p>

                    {/* Edit/Delete */}
                    <div className="mt-3">

                      <Button
                        variant="warning"
                        onClick={() =>
                          handleEdit(item)
                        }
                      >
                        Edit
                      </Button>

                      <Button
                        variant="danger"
                        className="ms-2"
                        onClick={() =>
                          handleDelete(addressId)
                        }
                      >
                        Delete
                      </Button>

                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })
        )}
      </Row>

      {/* Add/Edit Modal */}
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {editAddress
              ? "Update Address"
              : "Add Address"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Formik
            initialValues={initialValues}
            validationSchema={addressSchema}
            enableReinitialize
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form>

                <Row>

                  {/* Name */}
                  <Col md={6} className="mb-3">
                    <label>Name</label>

                    <Field
                      type="text"
                      name="name"
                      className="form-control"
                    />

                    {errors.name &&
                      touched.name && (
                        <small className="text-danger">
                          {errors.name}
                        </small>
                      )}
                  </Col>

                  {/* Address Type */}
                  <Col md={6} className="mb-3">
                    <label>Address Type</label>

                    <Field
                      as="select"
                      name="addressType"
                      className="form-control"
                    >
                      <option value="">
                        Select
                      </option>

                      <option value="Home">
                        Home
                      </option>

                      <option value="Work">
                        Work
                      </option>

                      <option value="Other">
                        Other
                      </option>
                    </Field>

                    {errors.addressType &&
                      touched.addressType && (
                        <small className="text-danger">
                          {errors.addressType}
                        </small>
                      )}
                  </Col>

                  {/* Address Line 1 */}
                  <Col md={6} className="mb-3">
                    <label>Address Line 1</label>

                    <Field
                      type="text"
                      name="addressLine1"
                      className="form-control"
                    />

                    {errors.addressLine1 &&
                      touched.addressLine1 && (
                        <small className="text-danger">
                          {errors.addressLine1}
                        </small>
                      )}
                  </Col>

                  {/* Address Line 2 */}
                  <Col md={6} className="mb-3">
                    <label>Address Line 2</label>

                    <Field
                      type="text"
                      name="addressLine2"
                      className="form-control"
                    />

                    {errors.addressLine2 &&
                      touched.addressLine2 && (
                        <small className="text-danger">
                          {errors.addressLine2}
                        </small>
                      )}
                  </Col>

                  {/* City */}
                  <Col md={6} className="mb-3">
                    <label>City</label>

                    <Field
                      type="text"
                      name="city"
                      className="form-control"
                    />

                    {errors.city &&
                      touched.city && (
                        <small className="text-danger">
                          {errors.city}
                        </small>
                      )}
                  </Col>

                  {/* District */}
                  <Col md={6} className="mb-3">
                    <label>District</label>

                    <Field
                      type="text"
                      name="district"
                      className="form-control"
                    />

                    {errors.district &&
                      touched.district && (
                        <small className="text-danger">
                          {errors.district}
                        </small>
                      )}
                  </Col>

                  {/* State */}
                  <Col md={6} className="mb-3">
                    <label>State</label>

                    <Field
                      type="text"
                      name="state"
                      className="form-control"
                    />

                    {errors.state &&
                      touched.state && (
                        <small className="text-danger">
                          {errors.state}
                        </small>
                      )}
                  </Col>

                  {/* PIN */}
                  <Col md={6} className="mb-3">
                    <label>Pincode</label>

                    <Field
                      type="text"
                      name="pin"
                      className="form-control"
                    />

                    {errors.pin &&
                      touched.pin && (
                        <small className="text-danger">
                          {errors.pin}
                        </small>
                      )}
                  </Col>

                  {/* Mobile */}
                  <Col md={6} className="mb-3">
                    <label>Mobile</label>

                    <Field
                      type="text"
                      name="mobile"
                      className="form-control"
                    />

                    {errors.mobile &&
                      touched.mobile && (
                        <small className="text-danger">
                          {errors.mobile}
                        </small>
                      )}
                  </Col>

                  {/* Email */}
                  <Col md={6} className="mb-3">
                    <label>Email</label>

                    <Field
                      type="email"
                      name="email"
                      className="form-control"
                    />

                    {errors.email &&
                      touched.email && (
                        <small className="text-danger">
                          {errors.email}
                        </small>
                      )}
                  </Col>

                </Row>

                {/* Modal Buttons */}
                <div className="text-end">

                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleClose}
                    className="me-2"
                  >
                    Cancel
                  </Button>

                  <Button
                    variant="primary"
                    type="submit"
                  >
                    {editAddress
                      ? "Update Address"
                      : "Save Address"}
                  </Button>

                </div>

              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>

      {/* Place Order */}
      <div className="text-end">
        <Button
          variant="success"
          className="mt-3"
          onClick={handleOrder}
        >
          Place Order
        </Button>
      </div>

    </Container>
  );
};

export default Address;
