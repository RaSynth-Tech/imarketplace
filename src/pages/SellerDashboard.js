import React, { useState } from 'react';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Alert,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  TrendingUp as TrendingUpIcon,
  ShoppingCart as ShoppingCartIcon,
  AttachMoney as AttachMoneyIcon,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

// Sample data for the dashboard
const sampleProducts = [
  {
    id: 1,
    title: 'Floral Summer Dress',
    price: 89.99,
    stock: 15,
    category: 'Dresses',
    subcategory: 'Summer',
    status: 'active',
  },
  {
    id: 2,
    title: 'Gold Necklace Set',
    price: 49.99,
    stock: 8,
    category: 'Accessories',
    subcategory: 'Jewelry',
    status: 'active',
  },
];

const sampleAnalytics = {
  totalSales: 12500,
  totalOrders: 150,
  averageOrderValue: 83.33,
  topProducts: [
    { title: 'Floral Summer Dress', sales: 45 },
    { title: 'Gold Necklace Set', sales: 32 },
    { title: 'Leather Crossbody Bag', sales: 28 },
  ],
};

function SellerDashboard() {
  const { user } = useAuth();
  const [products, setProducts] = useState(sampleProducts);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    stock: '',
    category: '',
    subcategory: '',
  });

  const handleOpenDialog = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        title: product.title,
        price: product.price,
        stock: product.stock,
        category: product.category,
        subcategory: product.subcategory,
      });
    } else {
      setEditingProduct(null);
      setFormData({
        title: '',
        price: '',
        stock: '',
        category: '',
        subcategory: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingProduct(null);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (editingProduct) {
      // Update existing product
      setProducts(
        products.map((p) =>
          p.id === editingProduct.id
            ? { ...p, ...formData, price: parseFloat(formData.price), stock: parseInt(formData.stock) }
            : p
        )
      );
    } else {
      // Add new product
      setProducts([
        ...products,
        {
          id: products.length + 1,
          ...formData,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock),
          status: 'active',
        },
      ]);
    }
    handleCloseDialog();
  };

  const handleDelete = (productId) => {
    setProducts(products.filter((p) => p.id !== productId));
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Seller Dashboard
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Welcome back, {user?.name}
      </Typography>

      {/* Analytics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
            <TrendingUpIcon color="primary" sx={{ mr: 2 }} />
            <Box>
              <Typography variant="h6">Total Sales</Typography>
              <Typography variant="h4">${sampleAnalytics.totalSales}</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
            <ShoppingCartIcon color="primary" sx={{ mr: 2 }} />
            <Box>
              <Typography variant="h6">Total Orders</Typography>
              <Typography variant="h4">{sampleAnalytics.totalOrders}</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
            <AttachMoneyIcon color="primary" sx={{ mr: 2 }} />
            <Box>
              <Typography variant="h6">Average Order Value</Typography>
              <Typography variant="h4">${sampleAnalytics.averageOrderValue}</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Products Table */}
      <Paper sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6">Products</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            Add Product
          </Button>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.title}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>{product.status}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleOpenDialog(product)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(product.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Add/Edit Product Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {editingProduct ? 'Edit Product' : 'Add New Product'}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Stock"
            name="stock"
            type="number"
            value={formData.stock}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Subcategory"
            name="subcategory"
            value={formData.subcategory}
            onChange={handleChange}
            margin="normal"
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingProduct ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default SellerDashboard; 