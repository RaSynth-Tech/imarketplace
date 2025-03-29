import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  Stack,
  Snackbar,
  Alert,
  IconButton,
  useTheme,
} from '@mui/material';
import { useCart } from '../context/CartContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Avatar from '@mui/material/Avatar';
import VerifiedIcon from '@mui/icons-material/Verified';
import Rating from '@mui/material/Rating';
import { useAuth } from '../context/AuthContext';
import { products } from './Products';

function SellerProducts() {
  const navigate = useNavigate();
  const { sellerId } = useParams();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [page, setPage] = useState(1);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  // Filter products to show only the seller's products
  const sellerProducts = products.filter(product => product.seller.id === parseInt(sellerId));

  const categories = {
    'Dresses': ['Summer Dresses', 'Evening Dresses', 'Casual Dresses', 'Formal Dresses'],
    'Accessories': ['Jewelry', 'Bags', 'Shoes', 'Belts', 'Scarves'],
    'Tops': ['Blouses', 'T-Shirts', 'Sweaters', 'Tank Tops'],
    'Bottoms': ['Jeans', 'Skirts', 'Shorts', 'Pants'],
    'Outerwear': ['Jackets', 'Coats', 'Blazers', 'Cardigans'],
  };

  const filteredProducts = sellerProducts.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const productsPerPage = 12;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (page - 1) * productsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  const handleAddToCart = (product) => {
    addToCart(product);
    setSnackbar({
      open: true,
      message: `${product.title} added to cart`,
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Get seller details from the first product
  const sellerDetails = sellerProducts[0]?.seller;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {sellerDetails?.name}'s Products
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Browse through our collection of products
        </Typography>
      </Box>

      <Box sx={{ mb: 4, display: 'flex', gap: 2 }}>
        <TextField
          fullWidth
          label="Search products"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flex: 1 }}
        />
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            label="Category"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <MenuItem value="">All Categories</MenuItem>
            {Object.keys(categories).map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        {paginatedProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': {
                  boxShadow: 3,
                },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.title}
                sx={{ cursor: 'pointer' }}
                onClick={() => navigate(`/products/${product.id}`)}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="h2">
                  {product.title}
                </Typography>
                <Typography variant="h6" color="primary" gutterBottom>
                  ₹{product.price.toLocaleString('en-IN')}
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                  {product.category} • {product.subcategory}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {product.description}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Rating value={product.seller.rating} readOnly size="small" />
                  <Typography variant="body2" color="text.secondary">
                    ({product.seller.rating})
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  startIcon={<ShoppingCartIcon />}
                  onClick={() => handleAddToCart(product)}
                  fullWidth
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {totalPages > 1 && (
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            size="large"
          />
        </Box>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default SellerProducts; 