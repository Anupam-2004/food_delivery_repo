import React from 'react'
import{Container,Row,Col,Card,Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

const restaurents=[
  {
    image:"/REStaurent/Blue_diamond.jpg",
    name:"Blue Diamond",
    location:"Sakchi",
  },
   {
    image:"/REStaurent/cinnamon-restaurant.jpg",
    name:"Cinnamon",
    location:"Inner Circle Road Bistupur",
  },
   
   {
    image:"/REStaurent/inner-view.jpg",
    name:"Zodiac",
    location:"Sakchi",
  },
   {
    image:"/REStaurent/johar-super-multi-cuisine.jpg",
    name:"Johar",
    location:"Mango Dimna Chawk",
  },
   {
    image:"/REStaurent/the-oak.jpg",
    name:"The Oak",
    location:"Bistupur",
  },
   {
    image:"/REStaurent/the-oriental-flavors.jpg",
    name:"Oriental Flavours",
    location:"Adityapur",
  },
   {
    image:"/REStaurent/an-unique-experiance.jpg",
    name:"Zing",
    location:"Golmuri",
  }
]

const Restaurent = () => {
  return (
   <Container>
     <Row>
      <Col md={1}>
      <Sidebar/>
      </Col>
      <Col md={11}></Col>
    </Row>

    <Row>
    
     {
      restaurents.map((restaurent,index)=>{
         <Col md={3}  key={index}></Col>
        return(
           <Col md={3} key={index}>
           <Card  as={Link} to={"/ViewRestaurent"} >
      <Card.Img variant="top" src={restaurent.image} />
      <Card.Body>
        {/* <Card.Title>Card Title</Card.Title> */}
        <Card.Text>
         {restaurent.name}
         {restaurent.location}

        </Card.Text>
        <Button variant="primary">View</Button>
      </Card.Body>
    </Card>
     </Col>
    
        )
        
      })
     }
    
    </Row>
   
   </Container>
  )
}

export default Restaurent
