import React, { useState } from 'react';
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
  CardMedia,
  LinearProgress,
  Chip,
  IconButton,
  useTheme,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { products } from './Products';
import { sellers } from '../data/sellers';
import { Link } from 'react-router-dom';
import VerifiedIcon from '@mui/icons-material/Verified';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StorefrontIcon from '@mui/icons-material/Storefront';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import StarIcon from '@mui/icons-material/Star';
import PeopleIcon from '@mui/icons-material/People';
import InventoryIcon from '@mui/icons-material/Inventory';

function SellerProfile() {
  const { sellerId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editedSeller, setEditedSeller] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Find the seller with null check
  const seller = sellers.find(s => s?.id === parseInt(sellerId)) || {
    id: parseInt(sellerId),
    name: 'Unknown Seller',
    profilePhoto: '',
    rating: 0,
    verified: false,
    businessDetails: {
      name: 'Unknown Business',
      address: 'Not Available',
      phone: 'Not Available',
      email: 'Not Available',
    }
  };

  // Filter products with null check
  const sellerProducts = products.filter(product => 
    product?.sellerId === parseInt(sellerId)
  );

  // Calculate seller statistics
  const totalProducts = sellerProducts.length;
  const totalSales = sellerProducts.reduce((sum, product) => sum + (product.sales || 0), 0);
  const averageRating = seller.rating || 0;
  const totalReviews = sellerProducts.reduce((sum, product) => sum + (product.reviews?.length || 0), 0);

  // Get top selling products
  const topProducts = [...sellerProducts]
    .sort((a, b) => (b.sales || 0) - (a.sales || 0))
    .slice(0, 3);

  // Get recent products
  const recentProducts = [...sellerProducts]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  const handleEditClick = () => {
    setEditedSeller({
      ...seller,
      businessDetails: { ...seller.businessDetails }
    });
    setShowEditDialog(true);
  };

  const handleSaveEdit = () => {
    // Here you would typically make an API call to save the changes
    setShowEditDialog(false);
    setSnackbar({
      open: true,
      message: 'Seller information updated successfully',
      severity: 'success'
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Banner Section */}
      <Box
        sx={{
          position: 'relative',
          height: 400,
          background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
          mb: 4,
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box sx={{ textAlign: 'center', color: 'white', maxWidth: 800, px: 4 }}>
            <Avatar
              src={seller.profilePhoto}
              sx={{
                width: 120,
                height: 120,
                margin: '0 auto',
                border: '4px solid white',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              }}
            />
            <Box sx={{ mt: 3 }}>
              <Typography variant="h3" component="h1" gutterBottom>
                {seller.name}
              </Typography>
              <Typography variant="h6" sx={{ mb: 2 }}>
                {seller.businessDetails?.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                <Rating value={averageRating} readOnly sx={{ color: 'white' }} />
                <Typography variant="h6">
                  ({totalReviews} reviews)
                </Typography>
                {seller.verified && (
                  <Chip
                    icon={<VerifiedIcon />}
                    label="Verified Seller"
                    sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
                  />
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <InventoryIcon sx={{ fontSize: 40, color: theme.palette.primary.main, mb: 1 }} />
              <Typography variant="h4" color="primary" gutterBottom>
                {totalProducts}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Total Products
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <StarIcon sx={{ fontSize: 40, color: theme.palette.warning.main, mb: 1 }} />
              <Typography variant="h4" color="warning.main" gutterBottom>
                {averageRating.toFixed(1)}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Average Rating
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <PeopleIcon sx={{ fontSize: 40, color: theme.palette.info.main, mb: 1 }} />
              <Typography variant="h4" color="info.main" gutterBottom>
                {totalReviews}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Total Reviews
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Business Information */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <StorefrontIcon /> Business Information
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Stack spacing={2}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Business Name
                </Typography>
                <Typography variant="h6">
                  {seller.businessDetails?.name}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Description
                </Typography>
                <Typography>
                  {seller.businessDetails?.description}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Specialties
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {seller.businessDetails?.specialties?.map((specialty, index) => (
                    <Chip
                      key={index}
                      label={specialty}
                      size="small"
                      sx={{ bgcolor: 'rgba(0, 0, 0, 0.05)' }}
                    />
                  ))}
                </Box>
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOnIcon color="action" />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Address
                  </Typography>
                  <Typography>
                    {seller.businessDetails?.address}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PhoneIcon color="action" />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Phone
                  </Typography>
                  <Typography>
                    {seller.businessDetails?.phone}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EmailIcon color="action" />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Email
                  </Typography>
                  <Typography>
                    {seller.email}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AccessTimeIcon color="action" />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Business Hours
                  </Typography>
                  <Typography>
                    {seller.businessDetails?.businessHours}
                  </Typography>
                </Box>
              </Box>

            </Stack>
          </Grid>
        </Grid>
      </Paper>

      {/* Top Selling Products */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TrendingUpIcon /> Top Selling Products
          </Typography>
          <Button
            variant="contained"
            component={Link}
            to={`/seller/${sellerId}/products`}
          >
            View All Products
          </Button>
        </Box>
        <Grid container spacing={2}>
          {topProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.name}
                />
                <CardContent>
                  <Typography variant="h6" noWrap>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.category} • {product.subcategory}
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                    ₹{product.price.toLocaleString('en-IN')}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Recent Products */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <InventoryIcon /> Recent Products
        </Typography>
        <Grid container spacing={2}>
          {recentProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.name}
                />
                <CardContent>
                  <Typography variant="h6" noWrap>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.category} • {product.subcategory}
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                    ₹{product.price.toLocaleString('en-IN')}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Reviews Section */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <StarIcon /> Recent Reviews
        </Typography>
        <Grid container spacing={2}>
          {sellerProducts
            .flatMap(product => [
              {
                rating: 5,
                comment: "Excellent quality and fast delivery! The product exceeded my expectations. Will definitely buy again.",
                userName: "Priya Sharma",
                date: "2024-02-15",
                productName: "Floral Summer Dress"
              },
              {
                rating: 4,
                comment: "Very good product, but delivery was slightly delayed. Overall satisfied with the purchase.",
                userName: "Rahul Verma",
                date: "2024-02-14",
                productName: "Gold Necklace Set"
              },
              {
                rating: 5,
                comment: "Amazing quality and beautiful design. The seller was very helpful with my queries.",
                userName: "Anjali Patel",
                date: "2024-02-13",
                productName: "Leather Crossbody Bag"
              },
              {
                rating: 5,
                comment: "Perfect fit and great material. The packaging was also very nice. Highly recommended!",
                userName: "Neha Gupta",
                date: "2024-02-12",
                productName: "Floral Summer Dress"
              },
              {
                rating: 4,
                comment: "Good product quality, but a bit expensive. Would recommend for special occasions.",
                userName: "Arun Kumar",
                date: "2024-02-11",
                productName: "Gold Necklace Set"
              },
              {
                rating: 5,
                comment: "Absolutely love this product! The seller's attention to detail is impressive.",
                userName: "Meera Singh",
                date: "2024-02-10",
                productName: "Leather Crossbody Bag"
              }
            ])
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 6)
            .map((review, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Box
                  sx={{
                    p: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    height: '100%',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Rating value={review.rating} readOnly size="small" />
                    <Typography variant="body2" color="text.secondary">
                      {new Date(review.date).toLocaleDateString()}
                    </Typography>
                  </Box>
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    {review.productName}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {review.comment}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    - {review.userName}
                  </Typography>
                </Box>
              </Grid>
            ))}
        </Grid>
      </Paper>

      {/* All Products Section */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <InventoryIcon /> All Products
        </Typography>
        <Grid container spacing={2}>
          {sellerProducts.slice(0, 6).map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.name}
                />
                <CardContent>
                  <Typography variant="h6" noWrap>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.category} • {product.subcategory}
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                    ₹{product.price.toLocaleString('en-IN')}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
        {user?.id === parseInt(sellerId) ? (
          <>
            <Button
              variant="contained"
              onClick={() => navigate('/dashboard')}
            >
              Go to Dashboard
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/my-products')}
            >
              Manage Products
            </Button>
          </>
        ) : (
          <Button
            variant="contained"
            onClick={() => navigate(`/seller/${sellerId}/products`)}
          >
            View All Products
          </Button>
        )}
      </Box>
    </Container>
  );
}

export default SellerProfile; 