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
  Breadcrumbs,
  Link,
  Tooltip,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  ShoppingCart as CartIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Share as ShareIcon,
  LocationOn as LocationOnIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocalShipping as LocalShippingIcon,
  Security as SecurityIcon,
  SupportAgent as SupportAgentIcon,
  CheckCircle as CheckCircleIcon,
  Star as StarIcon,
  TrendingUp as TrendingUpIcon,
  VerifiedUser as VerifiedUserIcon,
  NavigateNext as NavigateNextIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { useCart } from '../context/CartContext';
import Avatar from '@mui/material/Avatar';
import VerifiedIcon from '@mui/icons-material/Verified';
import ImageCarousel from '../components/common/ImageCarousel';
import { products } from './Products';
import { sellers } from '../data/sellers';
import { useWishlist } from '../context/WishlistContext';
import CheckIcon from '@mui/icons-material/Check';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();
  const theme = useTheme();
  const [quantity, setQuantity] = useState(1);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [tabValue, setTabValue] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(0);
  const [wishlistMenuAnchor, setWishlistMenuAnchor] = useState(null);
  const [newWishlistName, setNewWishlistName] = useState('');
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  
  // Use wishlist context
  const { 
    wishlists, 
    addToWishlist, 
    removeFromWishlist, 
    isInAnyWishlist, 
    isInWishlist,
    createWishlist,
    getWishlistsInfo 
  } = useWishlist();

  // Get product from navigation state or find it in products array
  const product = location.state?.product || products.find(p => p.id === parseInt(id));

  // Check if product is in any wishlist
  const inWishlist = product ? isInAnyWishlist(product.id) : false;

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
      severity: 'success'
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleSellerClick = (e) => {
    e.stopPropagation();
    if (product.seller?.id) {
      navigate(`/seller/${product.seller.id}`);
    }
  };

  const handleWishlistClick = (event) => {
    setWishlistMenuAnchor(event.currentTarget);
  };

  const handleWishlistMenuClose = () => {
    setWishlistMenuAnchor(null);
  };

  const handleToggleWishlist = (wishlistId) => {
    if (isInWishlist(wishlistId, product.id)) {
      removeFromWishlist(wishlistId, product.id);
      setSnackbar({
        open: true,
        message: `Removed from wishlist`,
        severity: 'success'
      });
    } else {
      addToWishlist(wishlistId, product);
      setSnackbar({
        open: true,
        message: `Added to wishlist`,
        severity: 'success'
      });
    }
    handleWishlistMenuClose();
  };

  const handleCreateWishlist = () => {
    if (newWishlistName.trim()) {
      const newWishlistId = createWishlist(newWishlistName.trim());
      addToWishlist(newWishlistId, product);
      setNewWishlistName('');
      setCreateDialogOpen(false);
      handleWishlistMenuClose();
      setSnackbar({
        open: true,
        message: `Added to new wishlist "${newWishlistName.trim()}"`,
        severity: 'success'
      });
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (reviewText && reviewRating > 0) {
      const newReview = {
        id: Date.now(),
        userName: 'Current User',
        userPhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        rating: reviewRating,
        comment: reviewText,
        date: new Date().toISOString(),
      };
      
      if (!product.reviews) {
        product.reviews = [];
      }
      product.reviews.unshift(newReview);
      setReviewText('');
      setReviewRating(0);
      setSnackbar({
        open: true,
        message: 'Review submitted successfully',
        severity: 'success'
      });
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: product.description,
        url: window.location.href,
      })
      .then(() => {
        setSnackbar({
          open: true,
          message: 'Product shared successfully!',
          severity: 'success'
        });
      })
      .catch((error) => {
        console.error('Error sharing:', error);
        setSnackbar({
          open: true,
          message: 'Could not share the product',
          severity: 'error'
        });
      });
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(window.location.href);
      setSnackbar({
        open: true,
        message: 'Product link copied to clipboard!',
        severity: 'success'
      });
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs 
        separator={<NavigateNextIcon fontSize="small" />} 
        sx={{ mb: 3 }}
      >
        <Link 
          color="inherit" 
          href="/" 
          sx={{ 
            textDecoration: 'none',
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          Home
        </Link>
        <Link 
          color="inherit" 
          href="/products" 
          sx={{ 
            textDecoration: 'none',
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          Products
        </Link>
        <Typography color="text.primary">{product.title}</Typography>
      </Breadcrumbs>

      <Grid container spacing={4}>
        {/* Left Column - Product Images */}
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 2, 
              borderRadius: 2,
              bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
              overflow: 'hidden',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              minHeight: '550px', // Set a minimum height to ensure the carousel takes enough space
            }}
          >
            <Box sx={{ 
              flex: 1, 
              minHeight: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
              <ImageCarousel 
                images={product.images || [product.image]} 
                autoSlide={true}
                showThumbnails={true}
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  '& .carousel-container': {
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    height: '100%',
                  },
                  '& .carousel-slide': {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    minHeight: '400px',
                  },
                  '& .carousel-image': {
                    flex: 1,
                    borderRadius: 2,
                    objectFit: 'contain',
                    maxHeight: '450px',
                    width: '100%',
                    display: 'block',
                    margin: '0 auto',
                  },
                  '& .carousel-thumbnails': {
                    mt: 2,
                    display: 'flex',
                    gap: 1,
                    justifyContent: 'center',
                    overflowX: 'auto',
                    padding: 1,
                    '& img': {
                      width: '70px',
                      height: '70px',
                      objectFit: 'cover',
                      borderRadius: 1,
                      cursor: 'pointer',
                      border: '2px solid transparent',
                      '&.active': {
                        borderColor: theme.palette.primary.main,
                      },
                      '&:hover': {
                        opacity: 0.8,
                      },
                    },
                  },
                  '& .carousel-controls': {
                    position: 'absolute',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    pointerEvents: 'none',
                    '& button': {
                      pointerEvents: 'auto',
                      bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
                      color: theme.palette.mode === 'dark' ? '#fff' : '#000',
                      '&:hover': {
                        bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)',
                      },
                    },
                  },
                }}
              />
            </Box>
          </Paper>
        </Grid>

        {/* Right Column - Product Info */}
        <Grid item xs={12} md={6}>
          <Stack spacing={3}>
            {/* Product Header */}
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Typography 
                  variant="h4" 
                  component="h1" 
                  sx={{
                    fontWeight: 700,
                    color: theme.palette.mode === 'dark' ? '#fff' : '#000',
                  }}
                >
                  {product.title}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Tooltip title={inWishlist ? "Manage Wishlists" : "Add to Wishlist"}>
                    <IconButton onClick={handleWishlistClick}>
                      {inWishlist ? 
                        <FavoriteIcon color="error" /> : 
                        <FavoriteBorderIcon />
                      }
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Share this product">
                    <IconButton onClick={handleShare}>
                      <ShareIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>

              {/* Price and Rating */}
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2, mb: 1 }}>
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      fontWeight: 700,
                      color: theme.palette.mode === 'dark' ? '#fff' : '#000',
                    }}
                  >
                    ₹{product.price.toLocaleString('en-IN')}
                  </Typography>
                  {product.originalPrice && (
                    <>
                      <Typography 
                        variant="h6" 
                        color="text.secondary" 
                        sx={{ textDecoration: 'line-through' }}
                      >
                        ₹{product.originalPrice.toLocaleString('en-IN')}
                      </Typography>
                      <Chip 
                        label={`${product.discount}% OFF`}
                        color="error"
                        size="small"
                        sx={{ fontWeight: 600 }}
                      />
                    </>
                  )}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Rating value={product.rating || 0} readOnly precision={0.1} />
                  <Typography variant="body2" color="text.secondary">
                    ({product.reviews?.length || 0} reviews)
                  </Typography>
                </Box>
              </Box>

              {/* Quick Overview */}
              <Paper 
                elevation={0}
                sx={{ 
                  p: 2, 
                  mb: 3,
                  borderRadius: 2,
                  bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                }}
              >
                <Typography 
                  variant="body1" 
                  sx={{ 
                    mb: 2,
                    color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)',
                  }}
                >
                  {product.description}
                </Typography>
                {product.highlights && (
                  <List dense>
                    {product.highlights.map((highlight, index) => (
                      <ListItem key={index} sx={{ py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <CheckCircleIcon color="success" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={highlight} />
                      </ListItem>
                    ))}
                  </List>
                )}
              </Paper>

              {/* Seller Information */}
              <Paper 
                elevation={0}
                sx={{ 
                  p: 2, 
                  mb: 3,
                  borderRadius: 2,
                  bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)',
                    transform: 'translateY(-2px)',
                  },
                }}
                onClick={handleSellerClick}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar
                    src={product.seller?.profilePhoto}
                    sx={{ 
                      width: 64, 
                      height: 64,
                      border: '2px solid',
                      borderColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                    }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {product.seller?.name || 'Unknown Seller'}
                      </Typography>
                      {product.seller?.verified && (
                        <Tooltip title="Verified Seller">
                          <VerifiedIcon sx={{ color: theme.palette.primary.main }} />
                        </Tooltip>
                      )}
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Rating value={product.seller?.rating || 0} readOnly size="small" precision={0.1} />
                        <Typography variant="body2" color="text.secondary">
                          ({product.seller?.totalReviews || 0})
                        </Typography>
                      </Box>
                      <Divider orientation="vertical" flexItem />
                      <Typography variant="body2" color="text.secondary">
                        {product.seller?.totalSales || 0} sales
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Paper>

              {/* Purchase Options */}
              <Paper 
                elevation={0}
                sx={{ 
                  p: 2,
                  borderRadius: 2,
                  bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <TextField
                    type="number"
                    label="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    InputProps={{ 
                      inputProps: { min: 1 },
                      sx: { borderRadius: 2 },
                    }}
                    sx={{ width: 100 }}
                  />
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<CartIcon />}
                    onClick={handleAddToCart}
                    sx={{ 
                      flex: 1,
                      height: 56,
                      borderRadius: 2,
                      textTransform: 'none',
                      fontSize: '1rem',
                    }}
                  >
                    Add to Cart
                  </Button>
                </Box>
              </Paper>

              {/* Features and Benefits */}
              <Paper 
                elevation={0}
                sx={{ 
                  p: 2,
                  borderRadius: 2,
                  bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                }}
              >
                <Grid container spacing={2}>
                  {[
                    { icon: <LocalShippingIcon />, text: 'Free shipping on orders above ₹4999' },
                    { icon: <SecurityIcon />, text: '7 days easy returns' },
                    { icon: <VerifiedUserIcon />, text: 'Genuine product guarantee' },
                    { icon: <SupportAgentIcon />, text: '24/7 customer support' },
                  ].map((feature, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {feature.icon}
                        <Typography variant="body2">{feature.text}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Box>
          </Stack>
        </Grid>
      </Grid>

      {/* Detailed Information Tabs */}
      <Box sx={{ mt: 6 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            '& .MuiTab-root': {
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 500,
              minWidth: 120,
            },
          }}
        >
          <Tab label="Description" />
          <Tab label="Specifications" />
          <Tab label="Reviews" />
        </Tabs>

        <Box sx={{ py: 4 }}>
          {tabValue === 0 && (
            <Typography 
              variant="body1" 
              color="text.secondary"
              sx={{ 
                maxWidth: 800,
                lineHeight: 1.8,
              }}
            >
              {product.description}
            </Typography>
          )}

          {tabValue === 1 && (
            <Grid container spacing={2} sx={{ maxWidth: 800 }}>
              {Object.entries(product.specifications || {}).map(([key, value], index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Paper
                    elevation={0}
                    sx={{ 
                      p: 2,
                      borderRadius: 2,
                      bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                    }}
                  >
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </Typography>
                    <Typography variant="body1">
                      {value}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          )}

          {tabValue === 2 && (
            <Box sx={{ maxWidth: 800 }}>
              {/* Add Review Form */}
              <Paper
                elevation={0}
                sx={{ 
                  p: 3,
                  mb: 4,
                  borderRadius: 2,
                  bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Write a Review
                </Typography>
                <Box component="form" onSubmit={handleReviewSubmit}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Your Rating
                    </Typography>
                    <Rating
                      value={reviewRating}
                      onChange={(event, newValue) => setReviewRating(newValue)}
                      precision={0.5}
                    />
                  </Box>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Your Review"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={!reviewText || reviewRating === 0}
                  >
                    Submit Review
                  </Button>
                </Box>
              </Paper>

              {/* Reviews List */}
              {product.reviews?.map((review, index) => (
                <Paper
                  key={index}
                  elevation={0}
                  sx={{ 
                    p: 2,
                    mb: 2,
                    borderRadius: 2,
                    bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                    <Avatar src={review.userPhoto} />
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                        {review.userName}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Rating value={review.rating} readOnly size="small" />
                        <Typography variant="body2" color="text.secondary">
                          {new Date(review.date).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Typography variant="body1">{review.comment}</Typography>
                </Paper>
              ))}
            </Box>
          )}
        </Box>
      </Box>

      {/* Wishlist Menu */}
      <Menu
        anchorEl={wishlistMenuAnchor}
        open={Boolean(wishlistMenuAnchor)}
        onClose={handleWishlistMenuClose}
        PaperProps={{
          elevation: 1,
          sx: {
            maxHeight: 300,
            width: 250,
          },
        }}
      >
        <Typography variant="subtitle1" sx={{ px: 2, py: 1, fontWeight: 600 }}>
          Add to Wishlist
        </Typography>
        <Divider />
        {wishlists.map((list) => (
          <MenuItem 
            key={list.id} 
            onClick={() => handleToggleWishlist(list.id)}
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              py: 1,
            }}
          >
            <ListItemIcon>
              {isInWishlist(list.id, product.id) ? (
                <FavoriteIcon fontSize="small" color="error" />
              ) : (
                <FavoriteBorderIcon fontSize="small" />
              )}
            </ListItemIcon>
            <ListItemText primary={list.name} />
            {isInWishlist(list.id, product.id) && (
              <CheckIcon fontSize="small" color="success" sx={{ ml: 1 }} />
            )}
          </MenuItem>
        ))}
        <Divider />
        <MenuItem onClick={() => {
          handleWishlistMenuClose();
          setCreateDialogOpen(true);
        }}>
          <ListItemIcon>
            <AddIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Create New Wishlist" />
        </MenuItem>
        <MenuItem onClick={() => navigate('/wishlist')}>
          <ListItemIcon>
            <FavoriteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="View All Wishlists" />
        </MenuItem>
      </Menu>

      {/* Create Wishlist Dialog */}
      <Dialog open={createDialogOpen} onClose={() => setCreateDialogOpen(false)}>
        <DialogTitle>Create New Wishlist</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Wishlist Name"
            fullWidth
            variant="outlined"
            value={newWishlistName}
            onChange={(e) => setNewWishlistName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleCreateWishlist}
            variant="contained"
            disabled={!newWishlistName.trim()}
          >
            Create & Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity || 'success'}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default ProductDetails; 