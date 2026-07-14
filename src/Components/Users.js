import React from "react";
import Sidebar from "./Sidebar";
import { Container, Row, Col, Breadcrumb, Table } from "react-bootstrap";
import { Link } from "react-router";
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
            <Breadcrumb.Item>
              <Link to={"/Dashboard"}>Dashboard</Link>
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
                        {user.status ? <FaCheckCircle /> : <RxCrossCircled />}
                      </td>
                    </tr>
                  ))
                : "Data Not Available"
              }
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Users;
