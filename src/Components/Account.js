import React from 'react'
import { Col, Container, Row,Button } from 'react-bootstrap'

const Account = () => {
  return (
    <Container>
        <Row >
            <Col className='account_section'>
          
            <span>First Name:</span>
            <span>Smriti</span>
            </Col>
        </Row>
        <Row >
            <Col className='account_section'>
            <span>Last Name:</span>
            <span>Kumari</span>
            </Col>
        </Row>
        <Row >
            <Col className='account_section'>
            <span>Mobile:</span>
            <span>9905615168</span>
            </Col>
        </Row>
        <Button>Button</Button>
    </Container>
  )
}

export default Account
