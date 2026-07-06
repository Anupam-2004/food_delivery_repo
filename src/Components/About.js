import React from 'react'
import { Col, Container, Row,Breadcrumb,Card } from 'react-bootstrap'
import Sidebar from './Sidebar'

const About = () => {
  return (
   <Container>
    <Row>
         {/* <Col md={1}>
                   <Sidebar />
                 </Col> */}
                 <Col md={5}>
                   <h3>About Us</h3>
       
                   {/* <Breadcrumb>
                     <Breadcrumb.Item href="/Dashboard">Dashboard</Breadcrumb.Item>
       
                     <Breadcrumb.Item active>About</Breadcrumb.Item>
                   </Breadcrumb> */}

                 </Col>
                 <Col md={7}> 
                 
                 </Col>

    </Row>
    <Row>
        <Col>
        <Card>
           {/* <Card.Img variant="top" src="> */}
        </Card>
        </Col>
         <Col>
        <Card></Card>
        </Col>
         <Col>
        <Card></Card>
        </Col>
    </Row>

   </Container>
  )
}

export default About
