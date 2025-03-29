import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Box, LinearProgress } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { products } from './Products';
import BusinessInfo from '../components/dashboard/BusinessInfo';
import StatCard from '../components/dashboard/StatCard';
import ProductsTable from '../components/dashboard/ProductsTable';

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
          <BusinessInfo user={user} />
        </Grid>

        {/* Statistics Cards */}
        <Grid item xs={12} md={3}>
          <StatCard
            icon={TrendingUpIcon}
            title="Total Revenue"
            value={`₹${stats.totalRevenue.toLocaleString('en-IN')}`}
            color="primary.main"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            icon={InventoryIcon}
            title="Total Products"
            value={stats.totalProducts}
            color="success.main"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            icon={StarIcon}
            title="Average Rating"
            value={stats.averageRating.toFixed(1)}
            color="warning.main"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            icon={StarIcon}
            title="Total Reviews"
            value={stats.totalReviews}
            color="info.main"
          />
        </Grid>

        {/* Products Table */}
        <Grid item xs={12}>
          <ProductsTable
            products={sellerProducts}
            onAddProduct={handleAddProduct}
            onEditProduct={handleEditProduct}
            onDeleteProduct={handleDeleteProduct}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default SellerDashboard; 