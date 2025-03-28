import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  TextField,
  Rating,
  Divider,
  Paper,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from '../context/CartContext';

// Sample reviews data
const reviews = [
  {
    id: 1,
    author: 'Sarah Johnson',
    rating: 5,
    date: '2024-02-15',
    comment: 'Absolutely love this product! The quality is amazing and it looks exactly like the pictures.',
  },
  {
    id: 2,
    author: 'Michael Chen',
    rating: 4,
    date: '2024-02-10',
    comment: 'Great product overall, but shipping took a bit longer than expected.',
  },
  {
    id: 3,
    author: 'Emma Wilson',
    rating: 5,
    date: '2024-02-05',
    comment: 'Perfect addition to my collection. Will definitely buy again!',
  },
];

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  // In a real app, you would fetch the product data from an API
  // For now, we'll use sample data
  const product = {
    id: parseInt(id),
    title: 'Floral Summer Dress',
    price: 89.99,
    description: 'A beautiful floral summer dress made from lightweight, breathable fabric. Perfect for warm weather occasions.',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Dresses',
    subcategory: 'Summer',
    specifications: {
      material: '100% Cotton',
      care: 'Machine washable',
      fit: 'Regular fit',
      length: 'Knee length',
    },
    reviews: reviews,
  };

  const averageRating = product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length;

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    setSnackbar({
      open: true,
      message: `${product.title} added to cart`,
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container>
      <Box sx={{ py: 4 }}>
        <IconButton onClick={() => navigate(-1)} sx={{ mb: 2 }}>
          <ArrowBackIcon />
        </IconButton>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <img
              src={product.image}
              alt={product.title}
              style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              {product.title}
            </Typography>
            <Typography variant="h5" color="primary" gutterBottom>
              ${product.price.toFixed(2)}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating value={averageRating} precision={0.5} readOnly />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                ({product.reviews.length} reviews)
              </Typography>
            </Box>
            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Specifications
              </Typography>
              <Grid container spacing={2}>
                {Object.entries(product.specifications).map(([key, value]) => (
                  <Grid item xs={6} key={key}>
                    <Typography variant="body2" color="text.secondary">
                      {key.charAt(0).toUpperCase() + key.slice(1)}:
                    </Typography>
                    <Typography variant="body2">{value}</Typography>
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <TextField
                type="number"
                label="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                InputProps={{ inputProps: { min: 1 } }}
                sx={{ width: 100 }}
              />
              <Button
                variant="contained"
                size="large"
                startIcon={<ShoppingCartIcon />}
                onClick={handleAddToCart}
                fullWidth
              >
                Add to Cart
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" gutterBottom>
            Customer Reviews
          </Typography>
          <Divider sx={{ mb: 3 }} />
          {product.reviews.map((review) => (
            <Paper key={review.id} sx={{ p: 2, mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="subtitle1">{review.author}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {new Date(review.date).toLocaleDateString()}
                </Typography>
              </Box>
              <Rating value={review.rating} readOnly size="small" />
              <Typography variant="body1" sx={{ mt: 1 }}>
                {review.comment}
              </Typography>
            </Paper>
          ))}
        </Box>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity="success">
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
}

export default ProductDetails; 