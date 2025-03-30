import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  LinearProgress,
  Stack,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  TrendingUp as TrendingUpIcon,
  ShoppingCart as ShoppingCartIcon,
  AttachMoney as AttachMoneyIcon,
  Inventory as InventoryIcon,
  Star as StarIcon,
  Storefront as StorefrontIcon,
  AccessTime as AccessTimeIcon,
  LocationOn as LocationOnIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { products } from './Products';

function SellerDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [sellerProducts, setSellerProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch seller's products
    const fetchProducts = () => {
      const filteredProducts = products.filter(product => product.seller.id === user.id);
      setSellerProducts(filteredProducts);
      setLoading(false);
    };

    fetchProducts();
  }, [user.id]);

  const handleAddProduct = () => {
    navigate('/seller/add-product');
  };

  const handleEditProduct = (productId) => {
    navigate(`/seller/edit-product/${productId}`);
  };

  const handleDeleteProduct = (productId) => {
    // Implement delete functionality
    console.log('Delete product:', productId);
  };

  const calculateStats = () => {
    const totalProducts = sellerProducts.length;
    const totalRevenue = sellerProducts.reduce((sum, product) => sum + product.price, 0);
    const averageRating = sellerProducts.reduce((sum, product) => sum + product.seller.rating, 0) / totalProducts;
    const totalReviews = totalProducts * 5; // Mock data for reviews

    return {
      totalProducts,
      totalRevenue,
      averageRating,
      totalReviews
    };
  };

  const stats = calculateStats();

  if (loading) {
    return (
      <Box sx={{ width: '100%', mt: 4 }}>
        <LinearProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Business Information */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <StorefrontIcon /> Business Information
              </Typography>
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={() => navigate('/seller/edit-profile')}
              >
                Edit Profile
              </Button>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Business Name
                    </Typography>
                    <Typography variant="h6">
                      {user.businessDetails?.name}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Description
                    </Typography>
                    <Typography>
                      {user.businessDetails?.description}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Specialties
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {user.businessDetails?.specialties?.map((specialty, index) => (
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
                        {user.businessDetails?.address}
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
                        {user.businessDetails?.phone}
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
                        {user.email}
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
                        {user.businessDetails?.businessHours}
                      </Typography>
                    </Box>
                  </Box>
                </Stack>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Statistics Cards */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <TrendingUpIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
            <Typography variant="h4" component="div">
              ₹{stats.totalRevenue.toLocaleString('en-IN')}
            </Typography>
            <Typography color="text.secondary">Total Revenues</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <InventoryIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
            <Typography variant="h4" component="div">
              {stats.totalProducts}
            </Typography>
            <Typography color="text.secondary">Total Products</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <StarIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
            <Typography variant="h4" component="div">
              {stats.averageRating.toFixed(1)}
            </Typography>
            <Typography color="text.secondary">Average Rating</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <StarIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
            <Typography variant="h4" component="div">
              {stats.totalReviews}
            </Typography>
            <Typography color="text.secondary">Total Reviews</Typography>
          </Paper>
        </Grid>

        {/* Products Table */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <InventoryIcon /> My Products
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddProduct}
              >
                Add Product
              </Button>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Stock</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sellerProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <img
                            src={product.image}
                            alt={product.title}
                            style={{ width: 50, height: 50, objectFit: 'cover' }}
                          />
                          <Typography>{product.title}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>₹{product.price.toLocaleString('en-IN')}</TableCell>
                      <TableCell>10</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleEditProduct(product.id)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteProduct(product.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default SellerDashboard; 