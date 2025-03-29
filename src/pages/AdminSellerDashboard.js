import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Paper,
  Grid,
  Avatar,
  Rating,
  Button,
  Stack,
  Divider,
  Card,
  CardContent,
  LinearProgress,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { products } from './Products';

function AdminSellerDashboard() {
  const { sellerId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Get seller details from products
  const sellerProducts = products.filter(product => product.seller.id === parseInt(sellerId));
  const seller = sellerProducts[0]?.seller;

  if (!seller) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5" color="error">
          Seller not found
        </Typography>
      </Container>
    );
  }

  // Calculate seller statistics
  const totalProducts = sellerProducts.length;
  const totalSales = sellerProducts.reduce((sum, product) => sum + (product.sales || 0), 0);
  const averageRating = seller.rating || 0;
  const totalReviews = sellerProducts.reduce((sum, product) => sum + (product.reviews?.length || 0), 0);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Button
          variant="outlined"
          onClick={() => navigate('/admin/dashboard')}
          sx={{ mb: 2 }}
        >
          ← Back to Admin Dashboard
        </Button>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Avatar
            src={seller.profilePhoto}
            sx={{ width: 100, height: 100 }}
          />
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              {seller.name}
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              {seller.email}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Rating value={averageRating} readOnly />
              <Typography variant="body2">
                ({totalReviews} reviews)
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total Products
              </Typography>
              <Typography variant="h4" color="primary">
                {totalProducts}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={(totalProducts / 100) * 100}
                sx={{ mt: 2 }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total Sales
              </Typography>
              <Typography variant="h4" color="primary">
                ₹{totalSales.toLocaleString('en-IN')}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={(totalSales / 1000000) * 100}
                sx={{ mt: 2 }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Average Rating
              </Typography>
              <Typography variant="h4" color="primary">
                {averageRating.toFixed(1)}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={(averageRating / 5) * 100}
                sx={{ mt: 2 }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Business Information */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Business Information
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Stack spacing={2}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Business Name
                </Typography>
                <Typography>
                  {seller.businessDetails?.name || 'N/A'}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Description
                </Typography>
                <Typography>
                  {seller.businessDetails?.description || 'N/A'}
                </Typography>
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={2}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Address
                </Typography>
                <Typography>
                  {seller.businessDetails?.address || 'N/A'}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Phone
                </Typography>
                <Typography>
                  {seller.businessDetails?.phone || 'N/A'}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Established
                </Typography>
                <Typography>
                  {seller.businessDetails?.established || 'N/A'}
                </Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      {/* Products List */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Products
        </Typography>
        <Stack spacing={2}>
          {sellerProducts.map((product) => (
            <Box
              key={product.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                p: 2,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
              }}
            >
              <Avatar
                src={product.image}
                variant="rounded"
                sx={{ width: 60, height: 60 }}
              />
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
                  <Typography variant="body2" color="primary">
                    ₹{product.price.toLocaleString('en-IN')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.sales || 0} sales
                  </Typography>
                  <Rating value={product.rating} readOnly size="small" />
                </Box>
              </Box>
            </Box>
          ))}
        </Stack>
      </Paper>
    </Container>
  );
}

export default AdminSellerDashboard; 