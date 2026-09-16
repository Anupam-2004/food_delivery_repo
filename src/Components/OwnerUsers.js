
import React, { useEffect, useState } from "react";
import { Container, Button, Table, Spinner, Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import "./OwnerUsers.css";

const OwnerUsers = () => {
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.auth.user);

  const userId = currentUser?._id || currentUser?.id;

  const [restaurant, setRestaurant] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId) {
      setError("User not found");
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:8090/api/restaurents/user/${userId}`)
      .then((response) => {
        console.log("Restaurant:", response.data);

        const restaurantData = Array.isArray(response.data)
          ? response.data[0]
          : response.data;

        if (!restaurantData) {
          throw new Error("Restaurant not found");
        }

        setRestaurant(restaurantData);

        const restaurantId = restaurantData.id || restaurantData._id;

        return axios.get(
          `http://localhost:8090/api/orders/restaurent/${restaurantId}`
        );
      })
      .then((response) => {
        console.log("Orders:", response.data);

        const orders = Array.isArray(response.data)
          ? response.data
          : response.data.orders || [];

        const userList = [];

        orders.forEach((order) => {
          const user = order.userId;

          if (!user || typeof user !== "object") {
            return;
          }

          const userId = user._id || user.id;

          const exists = userList.find(
            (item) => (item._id || item.id) === userId
          );

          if (!exists) {
            userList.push(user);
          }
        });

        setUsers(userList);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(
          error.response?.data?.message || "Failed to fetch users"
        );
        setLoading(false);
      });
  }, [userId]);

  if (loading) {
    return (
      <div className="owner-users-loading">
        <Spinner animation="border" />
        <p>Loading users...</p>
      </div>
    );
  }

  return (
    <div className="owner-users-page">
      <Container fluid>
        <Button
          variant="outline-secondary"
          className="mb-4"
          onClick={() => navigate("/OwnerDashboard")}
        >
          <FaArrowLeft className="me-2" />
          Back
        </Button>

        {error && <Alert variant="danger">{error}</Alert>}

        <div className="restaurant-info-card">
          <h3>{restaurant?.restaurentName}</h3>
          <p>Restaurant Customers</p>
        </div>

        <div className="owner-users-table-card">
          <div className="table-header">
            <h4>Users ({users.length})</h4>
          </div>

          {users.length === 0 ? (
            <div className="no-users">
              <h5>No Users Found</h5>
              <p>No customer has ordered from this restaurant.</p>
            </div>
          ) : (
            <Table responsive bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id || user.id}>
                    <td>{index + 1}</td>

                    <td>
                      {user.name ||
                        user.fullName ||
                        user.username ||
                        "Customer"}
                    </td>

                    <td>{user.email || "No Email"}</td>

                    <td>
                      {user.mobile ||
                        user.mobileNumber ||
                        user.phone ||
                        "No Mobile"}
                    </td>

                    <td>
                      <span className="active-status">Active</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      </Container>
    </div>
  );
};

export default OwnerUsers;

