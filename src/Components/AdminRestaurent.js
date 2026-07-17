import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import axios from "axios";

import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Breadcrumb,
} from "react-bootstrap";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import Sidebar from "./Sidebar";

import { Link } from "react-router";

const AdminRestaurent = () => {
  const [restaurents, setRestaurents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8090/api/restaurents")
      .then((response) => {
        console.log(response.data);
        setRestaurents(response.data);
      })
      .catch((error) => {
        console.log("Failed to fetch restaurants");
        console.log(error);
        alert("Failed to fetch restaurants");
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
  const testButton = () => {
    console.log("Add Restaurent");
  };

  return (
    <Container>
      <Row>
        <Col md={1}>
          <Sidebar />
        </Col>
        <Col className="admin_restaurent" md={11}>
          <h1>Restaurent</h1>
          <Breadcrumb>
            <Breadcrumb.Item href="/Dashboard">Dashboard</Breadcrumb.Item>

            <Breadcrumb.Item active>Admin Restaurents</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>

      <Row>
        <Col>
          <Button
            className="admin_restaurent_btn"
            onClick={testButton}
            variant="success"
          >
            Add
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Food Type</th>
                <th>City</th>
                <th>Location</th>
                <th>Owner</th>
                <th>Mobile</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {restaurents.map((restaurent, index) => (
                <tr key={restaurent.id}>
                  <td>{restaurent.restaurentName}</td>
                  <td>{restaurent.foodType}</td>
                  <td>{restaurent.city}</td>
                  <td>{restaurent.location}</td>
                  <td>{restaurent.ownerName}</td>
                  <td>
                  {restaurent.mobileNumber}
                  </td>
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

export default AdminRestaurent;
