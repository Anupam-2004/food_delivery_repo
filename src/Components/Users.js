import React from "react";
import Sidebar from "./Sidebar";
import {
  Container,
  Row,
  Col,
  Breadcrumb,
  Table,
  Button,
} from "react-bootstrap";
// import { Link } from "react-router";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect } from "react";

import axios from "axios";
import { RxCrossCircled } from "react-icons/rx";
import { FaCheckCircle } from "react-icons/fa";

const Users = () => {
  let navigate = useNavigate();
  const [users, setUsers] = useState();
  const { user: currentUser } = useSelector((state) => state.auth);
  const handleChange = async(id) => {
    const confirmChange = window.confirm(
      "Are you sure you want to change the status?",
    );

    if (!confirmChange) return;
    console.log(id);
    try {
      await axios.post(`http://localhost:8090/api/auth/changeStatus/${id}`);

      alert("status change successfully");
          window.location.reload();

    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    } else if (currentUser.roles[0] !== "ROLE_ADMIN") {
      navigate("/");
    } else {
      console.log(currentUser);
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    axios
      .get("http://localhost:8090/api/auth/alluser")
      .then((response) => {
        console.log(response.data);
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <Container>
      <Row>
        <Col md={1}>
          <Sidebar />
        </Col>
        <Col md={11}>
          <h1>Users</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Breadcrumb>
            <Breadcrumb.Item href={"/Dashboard"}>
              Dashboard
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Users</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr className="owner-order-table-header">
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody className="owner-order-table-body">
              {users
                ? users.map((user, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.mobileNumber}</td>
                      <td>{user.email}</td>
                      <td>
                        <Button onClick={() => handleChange(user._id)}>
                          {user.status ? <FaCheckCircle /> : <RxCrossCircled />}
                        </Button>
                      </td>
                    </tr>
                  ))
                : "Data Not Available"}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Users;
