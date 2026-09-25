import React, { useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import "./RatingForm.css";

const RatingForm = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const ratingData = {
      rating,
      review,
    };

    console.log(ratingData);
  };

  return (
    <Container className="rating-container">
      <Card className="rating-card">
        <Card.Body>
          <h3 className="text-center mb-4">Rate Your Experience</h3>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Restaurant / Food</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter restaurant or food name"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Your Rating</Form.Label>

              <div className="stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={star <= rating ? "star active" : "star"}
                    onClick={() => setRating(star)}
                  >
                    ★
                  </span>
                ))}
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Your Review</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Write your review..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />
            </Form.Group>

            <Button
              type="submit"
              className="w-100"
              disabled={rating === 0}
            >
              Submit Rating
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RatingForm;