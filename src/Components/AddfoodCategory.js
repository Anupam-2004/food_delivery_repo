import React from 'react'
import { Container,Row,Col,Breadcrumb } from "react-bootstrap";
import { Link } from "react-router";
import Sidebar from "./Sidebar";


const AddfoodCategory = () => {
  return (
    <Container>
               
          <Row>
            <Col md={5}>
             <Sidebar />
           </Col>
             <Col md={7}>
              <h1>Add Food Category</h1>
              </Col>
            <Breadcrumb>
             <Breadcrumb.Item > <Link to={'/Dashboard'}>Dashboard</Link></Breadcrumb.Item>
              <Breadcrumb.Item active>Add Food Category</Breadcrumb.Item>
             </Breadcrumb>
           </Row>
             </Container>
  )
}

export default AddfoodCategory
