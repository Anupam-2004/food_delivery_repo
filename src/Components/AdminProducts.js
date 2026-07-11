import React from "react";
import  { useEffect } from 'react'

import { Container, Row, Col, Breadcrumb } from "react-bootstrap";
import { Link } from "react-router";
import Sidebar from "./Sidebar";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const AdminProducts = () => {
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
        <Col md={5}>
          <div>Admin Products</div>
          <Sidebar />
        </Col>
        <Col md={7}>
          <h1>Admin Products</h1>
        </Col>
        <Breadcrumb>
          <Breadcrumb.Item href="/Dashboard">
            Dashboard
          </Breadcrumb.Item>

          <Breadcrumb.Item active>Admin Product</Breadcrumb.Item>
        </Breadcrumb>
      </Row>
    </Container>
  );
};

export default AdminProducts;
