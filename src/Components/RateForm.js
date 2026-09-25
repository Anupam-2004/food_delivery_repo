
import React, { useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import "./Rate.css";

const RateForm = () => {
  const [ratingData, setRatingData] = useState({
    userId: "USER_ID",
    restaurantId: "RESTAURANT_ID",
    rating: 5,
    review: "Food was delicious!",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setRatingData({
      ...ratingData,
      [name]: value,
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    console.log("Updated Rating Data:", ratingData);
    setIsEditing(false);
  };

  return (
    <Container className="rating-container">
      <Card className="rating-card">
        <Card.Body>

          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="mb-0">Rating Data</h3>

            {!isEditing && (
              <Button variant="warning" onClick={handleEdit}>
                Edit
              </Button>
            )}
          </div>

          <Form>

            {/* User ID */}
            <Form.Group className="mb-3">
              <Form.Label>User ID</Form.Label>

              <Form.Control
                type="text"
                name="userId"
                value={ratingData.userId}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Form.Group>

            {/* Restaurant ID */}
            <Form.Group className="mb-3">
              <Form.Label>Restaurant ID</Form.Label>

              <Form.Control
                type="text"
                name="restaurantId"
                value={ratingData.restaurantId}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Form.Group>

            {/* Rating */}
            <Form.Group className="mb-3">
              <Form.Label>Rating</Form.Label>

              <Form.Select
                name="rating"
                value={ratingData.rating}
                onChange={handleChange}
                disabled={!isEditing}
              >
                <option value="1">1 ⭐</option>
                <option value="2">2 ⭐⭐</option>
                <option value="3">3 ⭐⭐⭐</option>
                <option value="4">4 ⭐⭐⭐⭐</option>
                <option value="5">5 ⭐⭐⭐⭐⭐</option>
              </Form.Select>
            </Form.Group>

            {/* Review */}
            <Form.Group className="mb-3">
              <Form.Label>Review</Form.Label>

              <Form.Control
                as="textarea"
                rows={4}
                name="review"
                value={ratingData.review}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Form.Group>

            {/* Save / Cancel */}
            {isEditing && (
              <div className="d-flex gap-2">

                <Button
                  variant="success"
                  onClick={handleSave}
                >
                  Save Changes
                </Button>

                <Button
                  variant="secondary"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>

              </div>
            )}

          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RateForm;

