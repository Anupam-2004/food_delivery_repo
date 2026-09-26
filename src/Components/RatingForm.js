import React, { useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./RatingForm.css";

const RatingForm = ({ productId: productIdProp = "" }) => {
  const { productId: productIdParam } = useParams();
  const { user: currentUser } = useSelector((state) => state.auth);

  const [productId, setProductId] = useState(productIdProp || productIdParam || "");
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = currentUser?.id || currentUser?._id;

    if (!userId) {
      setStatus({ type: "danger", message: "Please login before submitting a review." });
      return;
    }

    if (!productId.trim()) {
      setStatus({ type: "danger", message: "Product ID is required." });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      await axios.post(
        "http://localhost:8090/api/reviews",
        {
          productId: productId.trim(),
          userId,
          rating,
          title: title.trim(),
          comment: comment.trim(),
        },
      );

      setStatus({ type: "success", message: "Your review was submitted successfully." });
      setRating(0);
      setTitle("");
      setComment("");
    } catch (error) {
      setStatus({
        type: "danger",
        message:
          error.response?.data?.message || "Unable to submit your review.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="rating-container">
      <Card className="rating-card">
        <Card.Body>
          <h3 className="text-center mb-4">Rate Your Experience</h3>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Product ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the product ID"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                disabled={Boolean(productIdProp || productIdParam)}
                required
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
              <Form.Label>Review Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Summarize your experience"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Your Review</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Write your review..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </Form.Group>

            {status.message && (
              <div className={`alert alert-${status.type}`} role="alert">
                {status.message}
              </div>
            )}

            <Button
              type="submit"
              className="w-100"
              disabled={rating === 0 || isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Rating"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RatingForm;