import React from "react";
import { useEffect, useState } from "react";

import {
  Container,
  Row,
  Col,
  Breadcrumb,
  Button,
  Table,
} from "react-bootstrap";
import { Link } from "react-router";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router";
import axios from "axios";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8090/api/products")
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch((error) => {
        console.log("Failed to fetch products");
        console.log(error);
        alert("Failed to fetch products");
      });
  }, []);

  let navigate = useNavigate();
  const { user: currentUser } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    } else if (currentUser.roles[0] !== "ROLE_ADMIN") {
      navigate("/");
    } else {
      console.log(currentUser);
    }
  }, [currentUser, navigate]);
  return (
    <Container>
      <Row>
        <Col md={5}>
          <div>Admin Products</div>
          <Sidebar />
        </Col>
        <Col md={7}>
          <h1>Admin Products</h1>
        </Col>
        <Breadcrumb>
          <Breadcrumb.Item href="/Dashboard">Dashboard</Breadcrumb.Item>

          <Breadcrumb.Item active>Products</Breadcrumb.Item>
        </Breadcrumb>
      </Row>
      <Row>
        <Col>
          <Table bordered hover>
            <thead>
              <tr>
                <th>Image</th>
                <th>Food Type</th>
                <th>Category</th>
                <th>Price</th>
                <th>Restaurent Name</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Description</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td>
                    {" "}
                    <img
                      className="thumb"
                      src={`http://localhost:8090/upload/${product.images[0]}`}
                      alt="xyz"
                    />
                  </td>

                  <td>{product.foodType}</td>
                  <td>{product.category}</td>
                  <td>{product.price}</td>
                  <td>{product.restaurentId.restaurentName}</td>
                  <td>{product.stock}</td>
                  <td>{product.status}</td>
                  <td>{product.description}</td>


                  <td>
                    <Button variant="warning" size="sm" className="me-2">
                      <AiFillEdit />
                    </Button>
                  </td>

                  <td>
                    <Button variant="danger" size="sm">
                      <MdDelete />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminProducts;
