import React from "react";
import { Container, Row, Col, Breadcrumb } from "react-bootstrap";
import { Link } from "react-router";
import Sidebar from "./Sidebar";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import  { useEffect } from 'react'
const AddfoodCategory = () => {
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
          <Sidebar />
        </Col>
        <Col md={7}>
          <h1>Add Food Category</h1>
        </Col>
        <Col md={11}>
          <h1>Add Food Category</h1>
          <Breadcrumb>
            <Breadcrumb.Item href="/Dashboard">
              Dashboard
            </Breadcrumb.Item>

            <Breadcrumb.Item active>Add Food Category</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
    </Container>
  );
};

export default AddfoodCategory;
