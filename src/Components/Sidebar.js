import {
  Navbar,
  Container,
  Offcanvas,
  Nav,
  Form,
  Button,
  NavDropdown,
  Col,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Sidebar() {
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
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Nav.Link as={Link} to={"/Foods"}>
                      {" "}
                      Products
                    </Nav.Link>
                    {/* <Nav.Link as={Link} to={"/Restaurent"}>
                      {" "}
                      Restaurents
                    </Nav.Link> */}
                    <Nav.Link as={Link} to={"/AdminRestaurent"}>
                      {" "}
                       Restaurents
                    </Nav.Link>

                    <Nav.Link as={Link} to={"/AddProducts"}>
                      Add Products
                    </Nav.Link>
                    {/* <Nav.Link as={Link} to={"/AddRestaurent"}>
                      Add Restaurents
                    </Nav.Link> */}
                    <Nav.Link as={Link} to={"/Order"}>
                      Orders
                    </Nav.Link>

                    <Nav.Link as={Link} to={"/AddOrders"}>
                      Add Orders
                    </Nav.Link>

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
      </Row>
    </Container>
  );
}
