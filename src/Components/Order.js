import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Sidebar from './Sidebar';

const Order = () => {
  return (
   <Container>
   <Row>
           <Col md={1}>
             <Sidebar/>
           </Col>
           <Col md={11}>
             <h1>Orders</h1>
           </Col>
         </Row>
   </Container>
  )
}

export default Order
