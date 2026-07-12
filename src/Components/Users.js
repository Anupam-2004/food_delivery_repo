import React from "react";
import Sidebar from "./Sidebar";
import { Container, Row, Col, Breadcrumb, Table } from "react-bootstrap";
import { Link } from "react-router";
import  { useState } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import  { useEffect } from 'react'
const Usersdetails = [
  {
    FirstName: "Anupam",
    LastName: "Kumari",
    Mobile: "1234567890",
    Email: "anupam.kumari@example.com",
  },
  {
    FirstName: "Smriti",
    LastName: "Kumari",
    Mobile: "1234567890",
    Email: "smriti.kumari@example.com",
  },
  {
    FirstName: "Anisha",
    LastName: "Kumari",
    Mobile: "1234567890",
    Email: "anisha.kumari@example.com",
  },
  {
    FirstName: "Anushka",
    LastName: "Kumari",
    Mobile: "1234567890",
    Email: "anushka.kumari@example.com",
  },
];
const Users = () => {
  let navigate = useNavigate();
     const { user: currentUser } = useSelector((state) => state.auth);
      useEffect(() => {
  
        if (!currentUser) {
          navigate('/');
        }
        else if(currentUser.roles[0]!=="ROLE_ADMIN"){
          navigate('/'); 
        }
        else{
          console.log(currentUser);
        }
      }, [currentUser, navigate]);
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
              {Usersdetails.map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.FirstName}</td>
                  <td>{user.LastName}</td>
                  <td>{user.Mobile}</td>
                  <td>{user.Email}</td>
                  <td>Active</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Users;
