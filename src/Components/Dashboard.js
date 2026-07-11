import React, { useEffect } from 'react'

import Sidebar from "./Sidebar";
import Box from "@mui/material/Box";
import { ChartsContainer } from "@mui/x-charts/ChartsContainer";
import { ChartsReferenceLine } from "@mui/x-charts/ChartsReferenceLine";
import { LinePlot } from "@mui/x-charts/LineChart";
import { ChartsXAxis } from "@mui/x-charts/ChartsXAxis";
import { ChartsYAxis } from "@mui/x-charts/ChartsYAxis";


import {
  Col,
  Container,
  Row,
  Card,
  
  Breadcrumb,
} from "react-bootstrap";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import { Link } from "react-router";
import { Doughnut } from "react-chartjs-2";

import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
// import { Navigate } from "react-router";


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export const options1 = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => faker.number.int({ min: 1, max: 100 })),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: labels.map(() =>
        faker.number.float({
          min: 1,
          max: 100,
          fractionDigits: 2,
        }),
      ),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
);

export const data1 = {
  // labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

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

const labels1 = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
];

export const data2 = {
  labels1,
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
  const expand = "none";
  const margin = { right: 24 };
  const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
  const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
  const xLabels = [
    "Page A",
    "Page B",
    "Page C",
    "Page D",
    "Page E",
    "Page F",
    "Page G",
  ];
  return (
    <Container>
      
      <Row>
        <Col md={1}>
          <Sidebar/>
        </Col>
        <Col className="dashboard" md={11}>
          <Row>
            <Col>
              <h2>Dashboard</h2>
               <Breadcrumb>
            <Breadcrumb.Item href="/Dashboard">
              Dashboard
            </Breadcrumb.Item>

            <Breadcrumb.Item active>Dashboard</Breadcrumb.Item>
          </Breadcrumb>
          <h4 className='welcome-anupam'>Welcome <b>{currentUser.firstName}</b></h4>
            </Col>
          </Row>
          <Row>
            <Col className="dashboard_cards">
              <Link to={"/Restaurent"}>
                <Card className="dashboard_card">
                  <h4>20</h4>
                  <h5>Restaurents</h5>
                </Card>
              </Link>
            </Col>
            <Col>
              <Link to={"/Order"}>
                <Card className="dashboard_card">
                  <h4>500</h4>
                  <h5>Orders</h5>
                </Card>
              </Link>
            </Col>
            <Col>
              {" "}
              <Link to={"/Dashboard"}>
                <Card className="dashboard_card">
                  <h4>60</h4>
                  <h5>Performance</h5>
                </Card>
              </Link>
            </Col>
            <Col>
              <Link to={"/Foods"}>
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
      <Row className="mt-4">
        <Col md={6}>
          <Box sx={{ width: "100%", height: 300 }}>
            <ChartsContainer
              series={[
                { data: pData, label: "pv", type: "line" },
                { data: uData, label: "uv", type: "line" },
              ]}
              xAxis={[{ scaleType: "point", data: xLabels, height: 28 }]}
              yAxis={[{ width: 50 }]}
              margin={margin}
            >
              <LinePlot />
              <ChartsReferenceLine
                x="Page C"
                label="Max PV PAGE"
                lineStyle={{ stroke: "red" }}
              />
              <ChartsReferenceLine
                y={9800}
                label="Max"
                lineStyle={{ stroke: "red" }}
              />
              <ChartsXAxis />
              <ChartsYAxis />
            </ChartsContainer>
          </Box>
        </Col>

        <Col>
          <Bar options={options} data={data} />
        </Col>
      </Row>
      <Row className="mt-4" md={6}>
        <Col md={2}>
          <Doughnut data={data1} />
        </Col>
        <Col md={2}>
          <Doughnut data={data1} />
        </Col>
        <Col md={2}>
          <Doughnut data={data1} />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
