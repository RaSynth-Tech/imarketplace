import React from 'react';
import {
  Box,
  Typography,
  Rating,
  Divider,
  Paper,
  Avatar,
} from '@mui/material';

function ProductReviews({ reviews }) {
  const averageRating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Customer Reviews
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Rating value={averageRating} precision={0.5} readOnly />
          <Typography variant="body2" sx={{ ml: 1 }}>
            ({reviews.length} reviews)
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          Based on {reviews.length} customer reviews
        </Typography>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {reviews.map((review) => (
        <Paper key={review.id} sx={{ p: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Avatar sx={{ mr: 2 }}>
              {review.author.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="subtitle1">{review.author}</Typography>
              <Typography variant="body2" color="text.secondary">
                {new Date(review.date).toLocaleDateString()}
              </Typography>
            </Box>
          </Box>
          <Rating value={review.rating} readOnly size="small" sx={{ mb: 1 }} />
          <Typography variant="body1">{review.comment}</Typography>
        </Paper>
      ))}
    </Box>
  );
}

export default ProductReviews; 