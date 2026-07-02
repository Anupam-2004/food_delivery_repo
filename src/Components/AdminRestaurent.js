import React, { useState } from "react";

import { Container, Row, Col, Table, Button,Breadcrumb } from "react-bootstrap";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import Sidebar from "./Sidebar";
const AdminRestaurent = () => {
  const testButton = () => {
    console.log("Add Restaurent");
  };

  return (
    <Container>

      <Row>
        <Col md={1}>
          <Sidebar/>
        </Col>
        <Col className="admin_restaurent" md={11}>
        
          <h1>Restaurent</h1>
           <Breadcrumb>
            <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>

            <Breadcrumb.Item active>Admin Restaurents</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
     
      <Row>
        <Col>
          <Button
            className="admin_restaurent_btn"
            onClick={testButton}
            variant="success"
          >
            Add
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Address</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Zing</td>
                <td>Golmuri</td>
                <td>
                  <Button>
                    <AiFillEdit />
                  </Button>
                </td>
                <td>
                  <Button>
                    <MdDelete />
                  </Button>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Blue Diamond</td>
                <td>Sakchi</td>
                <td>
                  <Button>
                    <AiFillEdit />
                  </Button>
                </td>
                <td>
                  <Button>
                    <MdDelete />
                  </Button>
                </td>
              </tr>
              <tr>
                <td>3</td>
                <td>Zodica</td>
                <td>Adityapur</td>
                <td>
                  <Button>
                    <AiFillEdit />
                  </Button>
                </td>
                <td>
                  <Button>
                    <MdDelete />
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminRestaurent;
