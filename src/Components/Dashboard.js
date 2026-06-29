import React from "react";
import {
  Col,
  Container,
  Row,
  Card,
  ListGroup,
  Navbar,
  Nav,
  Offcanvas,
  NavDropdown,
  Button,
  Form,
} from "react-bootstrap";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Link } from "react-router";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Sales Chart",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "2025",
      data: [100, 200, 250, 27, 56, 78, 188],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "2026",
      data: [50, 400, 200, 127, 56, 178, 88],
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const Dashboard = () => {
  const expand = "none";
  return (
    <Container>
      <Row>
        <Col md={1}>
          <Navbar expand={expand} className="bg-body-tertiary mb-3">
            <Container fluid>
              {/* <Navbar.Brand href="#">Navbar Offcanvas</Navbar.Brand> */}
              <Navbar.Toggle
                aria-controls={`offcanvasNavbar-expand-${expand}`}
              />
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="start"
              >
                {/* <Offcanvas.Header closeButton>
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
              
                  </Offcanvas.Title>
                </Offcanvas.Header> */}
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Nav.Link as={Link} to={"/Foods"}> Products</Nav.Link>
                    <Nav.Link as={Link} to={"/Restaurent"}> Restaurents</Nav.Link>

                    <Nav.Link as={Link} to={"/AddProducts"}>Add Products</Nav.Link>
                    <Nav.Link as={Link} to={"/AddRestaurent"}>Add Restaurents</Nav.Link>
                    <Nav.Link as={Link} to={"/Order"}>Orders</Nav.Link>

                    <Nav.Link as={Link} to={"/AddOrders"}>Add Orders</Nav.Link>

                    <NavDropdown
                      title="Dropdown"
                      id={`offcanvasNavbarDropdown-expand-${expand}`}
                    >
                      <NavDropdown.Item href="#action3">
                        Action
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action4">
                        Another action
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="#action5">
                        Something else here
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                  <Form className="d-flex">
                    <Form.Control
                      type="search"
                      placeholder="Search"
                      className="me-2"
                      aria-label="Search"
                    />
                    <Button variant="outline-success">Search</Button>
                  </Form>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        </Col>
        <Col className="dashboard" md={11}>
          <Row>
            <Col>
              <h2>Dashboard</h2>
            </Col>
          </Row>
          <Row>
            <Col className="dashboard_cards">
            <Link to={'/Restaurent'}>
              <Card className="dashboard_card">
                <h4>20</h4>
                <h5>Restaurents</h5>
              </Card>
            </Link>
            </Col>
            <Col>
              <Link to={'/Order'}>
              <Card className="dashboard_card">
                <h4>500</h4>
                <h5>Orders</h5>
              </Card>
              </Link>
            </Col>
            <Col>
              {" "}
             <Link to={'/Dashboard'}>

              <Card className="dashboard_card" >
                <h4>60</h4>
                <h5>Performance</h5>
            
              </Card>
              </Link>
            </Col>
            <Col>
             <Link to={'/Foods'}>
              <Card className="dashboard_card">
                <h4>100</h4>
                <h5>Products</h5>
              </Card>
             </Link>
            </Col>
          </Row>
          <Row>
            <Col>
              <Bar options={options} data={data} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
