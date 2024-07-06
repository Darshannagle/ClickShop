import React, { useState, useEffect } from 'react';

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ reviewerName: '', rating: '', comment: '' });

  useEffect(() => {
    // Fetch existing reviews when the component mounts
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch('/api/reviews');
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewReview({
      ...newReview,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReview),
      });
      // After successfully adding the review, fetch updated reviews
      fetchReviews();
      // Clear the form
      setNewReview({ reviewerName: '', rating: '', comment: '' });
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  return (
    <div>
      <h2>Reviews</h2>
      <ul>
        {reviews.map((review, index) => (
          <li key={index}>
            <strong>{review.reviewerName}</strong> - {review.rating}/5
            <p>{review.comment}</p>
          </li>
        ))}
      </ul>
      <h3>Add a Review</h3>
      <form onSubmit={handleSubmitReview}>
        <label>
          Reviewer Name:
          <input
            type="text"
            name="reviewerName"
            value={newReview.reviewerName}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Rating:
          <input
            type="number"
            name="rating"
            min="1"
            max="5"
            value={newReview.rating}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Comment:
          <textarea
            name="comment"
            value={newReview.comment}
            onChange={handleInputChange}
            required
          ></textarea>
        </label>
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default ReviewPage;
