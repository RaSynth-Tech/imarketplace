import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
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
  Stack,
  useTheme,
  Tabs,
  Tab,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from '../context/CartContext';
import Avatar from '@mui/material/Avatar';
import VerifiedIcon from '@mui/icons-material/Verified';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SecurityIcon from '@mui/icons-material/Security';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import {
  ShoppingCart as CartIcon,
  Favorite as FavoriteIcon,
  Share as ShareIcon,
} from '@mui/icons-material';
import ImageCarousel from '../components/common/ImageCarousel';
import { products } from './Products';
import { sellers } from '../data/sellers';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();
  const theme = useTheme();
  const [quantity, setQuantity] = useState(1);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const [tabValue, setTabValue] = useState(0);

  // Get product from navigation state or find it in products array
  const product = location.state?.product || products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <Container>
        <Typography variant="h5" sx={{ mt: 4, textAlign: 'center' }}>
          Product not found
        </Typography>
      </Container>
    );
  }

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

  const handleSellerClick = () => {
    navigate(`/seller/${product.seller.id}`);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Product Images */}
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 2, 
              borderRadius: 2,
              bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
            }}
          >
            <ImageCarousel 
              images={product.images || [product.image]} 
              autoSlide={true}
              showThumbnails={true}
            />
          </Paper>
        </Grid>

        {/* Product Info */}
        <Grid item xs={12} md={6}>
          <Stack spacing={3}>
            <Box>
              <Typography variant="h4" component="h1" gutterBottom>
                {product.title}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, color: '#000' }}>
                  ₹{product.price.toLocaleString('en-IN')}
                </Typography>
                {product.originalPrice && (
                  <>
                    <Typography variant="h6" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </Typography>
                    <Chip 
                      label={`${product.discount}% OFF`}
                      color="error"
                      size="small"
                    />
                  </>
                )}
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Rating value={product.seller?.rating || 0} readOnly precision={0.1} />
                <Typography variant="body2" color="text.secondary">
                  ({product.seller?.rating || 0} rating)
                </Typography>
              </Box>
            </Box>

            {/* Seller Information */}
            <Paper 
              elevation={0}
              sx={{ 
                p: 2, 
                borderRadius: 2,
                bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)',
                },
              }}
              onClick={handleSellerClick}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar
                  src={product.seller?.profilePhoto}
                  sx={{ width: 64, height: 64 }}
                />
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {product.seller?.name || 'Unknown Seller'}
                    </Typography>
                    {product.seller?.verified && (
                      <VerifiedIcon sx={{ color: '#000' }} />
                    )}
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <Rating value={product.seller?.rating || 0} readOnly size="small" precision={0.1} />
                    <Typography variant="body2" color="text.secondary">
                      ({product.seller?.rating || 0})
                    </Typography>
                  </Box>
                  {product.seller?.businessDetails && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LocationOnIcon color="action" fontSize="small" />
                      <Typography variant="body2" color="text.secondary">
                        {product.seller.businessDetails.address}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Box>
            </Paper>

            {/* Features */}
            <Paper sx={{ p: 2 }}>
              <List>
                {[
                  'Free shipping on orders above ₹4999',
                  '7 days easy returns',
                  'Secure payment options',
                  '24/7 customer support',
                  'Genuine product guarantee',
                ].map((feature, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CheckCircleIcon color="success" />
                    </ListItemIcon>
                    <ListItemText primary={feature} />
                  </ListItem>
                ))}
              </List>
            </Paper>

            {/* Add to Cart Button */}
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
                startIcon={<CartIcon />}
                onClick={handleAddToCart}
                sx={{ mt: 2 }}
              >
                Add to Cart
              </Button>
            </Box>
          </Stack>
        </Grid>
      </Grid>

      {/* Tabs Section */}
      <Box sx={{ mt: 4 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Description" />
          <Tab label="Specifications" />
          <Tab label="Reviews" />
        </Tabs>

        <Box sx={{ mt: 2 }}>
          {tabValue === 0 && (
            <Typography variant="body1" color="text.secondary">
              {product.description}
            </Typography>
          )}

          {tabValue === 1 && (
            <Grid container spacing={2}>
              {Object.entries(product.specifications || {}).map(([key, value]) => (
                <Grid item xs={6} key={key}>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      {key.charAt(0).toUpperCase() + key.slice(1)}:
                    </Typography>
                    <Typography variant="body2">{value}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}

          {tabValue === 2 && (
            <Stack spacing={3}>
              {product.reviews?.map((review) => (
                <Paper key={review.id} sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {review.author}
                      </Typography>
                      {review.verified && (
                        <VerifiedIcon sx={{ fontSize: 16, color: '#000' }} />
                      )}
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(review.date).toLocaleDateString()}
                    </Typography>
                  </Box>
                  <Rating value={review.rating} readOnly size="small" />
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {review.comment}
                  </Typography>
                </Paper>
              ))}
            </Stack>
          )}
        </Box>
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
    </Container>
  );
}

export default ProductDetails; 