import React, { useState, useEffect } from 'react';
import { Container, Grid, Box, LinearProgress, Typography, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BusinessInfo from '../components/dashboard/BusinessInfo';
import StatCard from '../components/dashboard/StatCard';
import ProductsTable from '../components/dashboard/ProductsTable';
import SellerProfileHeader from '../components/dashboard/SellerProfileHeader';
import { useAuth } from '../context/AuthContext';
import { products } from './Products';
import { sellers } from '../data/sellers';
import {
  TrendingUp as TrendingUpIcon,
  Inventory as InventoryIcon,
  Star as StarIcon,
} from '@mui/icons-material';
import ProductFormDialog from '../components/dashboard/ProductFormDialog';

const SellerDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [sellerProducts, setSellerProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    // Filter products for the current seller and add default stock values
    const fetchProducts = () => {
      setLoading(true);
      try {
        const sellerProducts = products
          .filter(product => product.sellerId === user.id)
          .map(product => ({
            ...product,
            stock: product.stock || 0, // Set default stock to 0 if undefined
          }));
        setSellerProducts(sellerProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [user.id]);

  const handleUpdateBusinessInfo = (updatedInfo) => {
    // In a real app, this would be an API call to update the business information
    console.log('Updating business info:', updatedInfo);
    // You would typically update the user context here
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setOpenDialog(true);
  };

  const handleEditProduct = (productId) => {
    const product = sellerProducts.find(p => p.id === productId);
    setEditingProduct(product);
    setOpenDialog(true);
  };

  const handleDeleteProduct = (productId) => {
    // In a real app, this would be an API call to delete the product
    console.log('Deleting product:', productId);
    setSellerProducts(sellerProducts.filter(product => product.id !== productId));
    setSnackbar({
      open: true,
      message: 'Product deleted successfully',
      severity: 'success'
    });
  };

  const handleSubmitProduct = (formData) => {
    if (editingProduct) {
      // Update existing product
      setSellerProducts(prev => prev.map(product => 
        product.id === editingProduct.id 
          ? { ...product, ...formData }
          : product
      ));
      setSnackbar({
        open: true,
        message: 'Product updated successfully',
        severity: 'success'
      });
    } else {
      // Add new product
      const newProduct = {
        id: Math.max(...sellerProducts.map(p => p.id)) + 1,
        ...formData,
        sellerId: user.id,
      };
      setSellerProducts(prev => [...prev, newProduct]);
      setSnackbar({
        open: true,
        message: 'Product added successfully',
        severity: 'success'
      });
    }
    setOpenDialog(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Calculate statistics
  const calculateStats = () => {
    const totalProducts = sellerProducts.length;
    const totalRevenue = sellerProducts.reduce((sum, product) => sum + (product.price || 0), 0);
    const averageRating = user.rating || 0;
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
    return <LinearProgress />;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <SellerProfileHeader user={user} />
        </Grid>
        <Grid item xs={12}>
          <BusinessInfo user={user} onUpdate={handleUpdateBusinessInfo} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<TrendingUpIcon />}
            title="Total Revenue"
            value={`₹${stats.totalRevenue.toLocaleString('en-IN')}`}
            color="success.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<InventoryIcon />}
            title="Total Products"
            value={stats.totalProducts}
            color="info.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<StarIcon />}
            title="Average Rating"
            value={stats.averageRating.toFixed(1)}
            color="warning.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<StarIcon />}
            title="Total Reviews"
            value={stats.totalReviews}
            color="secondary.main"
          />
        </Grid>
        <Grid item xs={12}>
          <ProductsTable
            products={sellerProducts}
            onAddProduct={handleAddProduct}
            onEditProduct={handleEditProduct}
            onDeleteProduct={handleDeleteProduct}
          />
        </Grid>
      </Grid>

      <ProductFormDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSubmit={handleSubmitProduct}
        product={editingProduct}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default SellerDashboard; 