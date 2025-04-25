import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  Chip,
  Rating,
  Divider,
} from '@mui/material';
import { useCart } from '../context/CartContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StorefrontIcon from '@mui/icons-material/Storefront';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import VerifiedIcon from '@mui/icons-material/Verified';
import { ThemeContext } from '../App';

const featuredProducts = [
  {
    id: 1,
    title: 'Designer Saree',
    price: 12999,
    image: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=800&auto=format&fit=crop&q=60',
    description: 'Elegant designer saree with intricate embroidery',
    category: 'Traditional',
    subcategory: 'Sarees',
  },
  {
    id: 2,
    title: 'Gold Necklace Set',
    price: 29999,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=60',
    description: 'Traditional gold necklace set with matching earrings',
    category: 'Accessories',
    subcategory: 'Jewelry',
  },
  {
    id: 3,
    title: 'Leather Crossbody Bag',
    price: 4999,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=60',
    description: 'Classic leather crossbody bag with adjustable strap',
    category: 'Accessories',
    subcategory: 'Bags',
  },
  {
    id: 4,
    title: 'Designer Handbag',
    price: 15999,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=60',
    description: 'Luxury designer handbag with gold hardware',
    category: 'Accessories',
    subcategory: 'Bags',
  },
  {
    id: 5,
    title: 'Diamond Earrings',
    price: 19999,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=60',
    description: 'Classic diamond stud earrings',
    category: 'Accessories',
    subcategory: 'Jewelry',
  },
  {
    id: 6,
    title: 'Designer Kurti Set',
    price: 3999,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop&q=60',
    description: 'Trendy kurti set with matching dupatta',
    category: 'Traditional',
    subcategory: 'Kurtis',
  },
];

function Home() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { mode } = useContext(ThemeContext);
  const isDarkMode = mode === 'dark';

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: isDarkMode ? 'rgba(18, 18, 18, 0.9)' : 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          borderBottom: isDarkMode
            ? '1px solid rgba(255, 255, 255, 0.1)'
            : '1px solid rgba(0, 0, 0, 0.1)',
          py: { xs: 6, md: 10 },
          mb: 6,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background gradient */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: isDarkMode
              ? 'radial-gradient(circle at top right, rgba(40, 40, 40, 0.8) 0%, rgba(18, 18, 18, 0) 50%)'
              : 'radial-gradient(circle at top right, rgba(240, 240, 240, 0.8) 0%, rgba(255, 255, 255, 0) 50%)',
            zIndex: 0,
          }}
        />
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 800,
                  color: isDarkMode ? '#fff' : '#000',
                  mb: 2,
                  mt: 2,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  background: isDarkMode
                    ? 'linear-gradient(90deg, #fff 0%, #aaa 100%)'
                    : 'linear-gradient(90deg, #000 0%, #555 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Welcome to iMarketplace
              </Typography>
              <Typography 
                variant="h5" 
                paragraph 
                sx={{ 
                  mb: 4, 
                  maxWidth: '600px',
                  color: isDarkMode ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
                  fontWeight: 400,
                }}
              >
                Discover the latest trends in Indian fashion and accessories
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/products')}
                  sx={{ 
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 600,
                    transition: 'all 0.3s',
                    background: isDarkMode
                      ? 'linear-gradient(45deg, #333 30%, #444 90%)'
                      : 'linear-gradient(45deg, #000 30%, #444 90%)',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
                    }
                  }}
                >
                  Shop Now
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/about')}
                  sx={{ 
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 600,
                    borderWidth: 2,
                    transition: 'all 0.3s',
                    '&:hover': {
                      borderWidth: 2,
                      transform: 'translateY(-3px)',
                    }
                  }}
                >
                  Learn More
                </Button>
              </Box>
              
              <Box sx={{ display: 'flex', mt: 6, gap: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <VerifiedIcon sx={{ color: isDarkMode ? '#90caf9' : '#1976d2' }} />
                  <Typography variant="body2" fontWeight={500}>Trusted Sellers</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocalShippingIcon sx={{ color: isDarkMode ? '#90caf9' : '#1976d2' }} />
                  <Typography variant="body2" fontWeight={500}>Fast Delivery</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <StorefrontIcon sx={{ color: isDarkMode ? '#90caf9' : '#1976d2' }} />
                  <Typography variant="body2" fontWeight={500}>60,000+ Products</Typography>
                </Box>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
              {/* Hero image or graphic could go here */}
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Featured Products Section */}
      <Container maxWidth="lg" sx={{ pb: 8 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography 
            variant="h4" 
            component="h2" 
            sx={{ 
              fontWeight: 700,
              position: 'relative',
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: -10,
                left: 0,
                width: 60,
                height: 4,
                background: isDarkMode
                  ? 'linear-gradient(90deg, #fff 0%, rgba(255,255,255,0.3) 100%)'
                  : 'linear-gradient(90deg, #000 0%, rgba(0,0,0,0.3) 100%)',
                borderRadius: 2,
              }
            }}
          >
            Featured Products
          </Typography>
          <Button 
            variant="text" 
            onClick={() => navigate('/products')}
            sx={{ 
              fontWeight: 600, 
              transition: 'all 0.2s',
              '&:hover': {
                transform: 'translateX(5px)',
              }
            }}
          >
            View All
          </Button>
        </Box>
        
        <Grid container spacing={3}>
          {featuredProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <Card
                elevation={0}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  borderRadius: 2,
                  overflow: 'hidden',
                  bgcolor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                  border: isDarkMode
                    ? '1px solid rgba(255,255,255,0.1)'
                    : '1px solid rgba(0,0,0,0.08)',
                  position: 'relative',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: isDarkMode
                      ? '0 10px 30px rgba(0,0,0,0.25)'
                      : '0 10px 30px rgba(0,0,0,0.1)',
                    '& .MuiCardMedia-root': {
                      transform: 'scale(1.05)',
                    }
                  },
                }}
                onClick={() => handleProductClick(product.id)}
              >
                <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                  <CardMedia
                    component="img"
                    height="220"
                    image={product.image}
                    alt={product.title}
                    sx={{
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease',
                    }}
                  />
                  {product.price > 10000 && (
                    <Chip
                      label="Premium"
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        bgcolor: isDarkMode ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0.8)',
                        color: '#fff',
                        fontWeight: 600,
                        px: 1,
                        '& .MuiChip-label': {
                          px: 1,
                        }
                      }}
                    />
                  )}
                </Box>
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Box sx={{ mb: 2 }}>
                    <Typography
                      color="textSecondary"
                      variant="caption"
                      sx={{
                        textTransform: 'uppercase',
                        fontWeight: 600,
                        letterSpacing: 0.5,
                        fontSize: '0.7rem',
                      }}
                    >
                      {product.category}
                    </Typography>
                  </Box>
                  
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="h3"
                    sx={{
                      fontWeight: 700,
                      mb: 1,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {product.title}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Rating value={4.5} precision={0.5} size="small" readOnly />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                      (24)
                    </Typography>
                  </Box>
                  
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    paragraph
                    sx={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      mb: 2,
                      height: 40,
                    }}
                  >
                    {product.description}
                  </Typography>
                  
                  <Box sx={{ mt: 'auto' }}>
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography
                        variant="h6"
                        sx={{ 
                          fontWeight: 700,
                          background: isDarkMode
                            ? 'linear-gradient(90deg, #fff 0%, #aaa 100%)'
                            : 'linear-gradient(90deg, #000 0%, #555 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}
                      >
                        ₹{product.price.toLocaleString('en-IN')}
                      </Typography>
                      <Button
                        variant="text"
                        color="primary"
                        size="small"
                        endIcon={<ShoppingCartIcon />}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(product);
                        }}
                        sx={{ 
                          fontWeight: 600,
                          '&:hover': {
                            bgcolor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                          }
                        }}
                      >
                        Add
                      </Button>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      
      {/* Categories Banner */}
      <Box
        sx={{
          py: 8,
          mb: 8,
          bgcolor: isDarkMode ? 'rgba(30,30,30,0.6)' : 'rgba(245,245,245,0.6)',
          backdropFilter: 'blur(10px)',
          borderTop: isDarkMode
            ? '1px solid rgba(255,255,255,0.1)'
            : '1px solid rgba(0,0,0,0.1)',
          borderBottom: isDarkMode
            ? '1px solid rgba(255,255,255,0.1)'
            : '1px solid rgba(0,0,0,0.1)',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h4"
              component="h2"
              sx={{ 
                fontWeight: 700,
                mb: 2,
              }}
            >
              Popular Categories
            </Typography>
            <Typography 
              variant="body1"
              color="textSecondary"
              sx={{ 
                maxWidth: 600,
                mx: 'auto',
              }}
            >
              Explore our collection of curated products across top categories
            </Typography>
          </Box>
          
          <Grid container spacing={3} justifyContent="center">
            {['Traditional', 'Accessories', 'Footwear', 'Beauty'].map((category) => (
              <Grid item key={category} xs={6} sm={3}>
                <Box
                  sx={{
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 2,
                    bgcolor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)',
                    border: isDarkMode
                      ? '1px solid rgba(255,255,255,0.1)'
                      : '1px solid rgba(0,0,0,0.08)',
                    height: 180,
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: isDarkMode
                        ? '0 10px 20px rgba(0,0,0,0.2)'
                        : '0 10px 20px rgba(0,0,0,0.1)',
                    }
                  }}
                  onClick={() => navigate(`/products?category=${category}`)}
                >
                  <Typography
                    variant="h6"
                    sx={{ 
                      fontWeight: 700,
                      textAlign: 'center',
                      mt: 2
                    }}
                  >
                    {category}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="textSecondary"
                    sx={{ 
                      textAlign: 'center',
                      mt: 1
                    }}
                  >
                    {category === 'Traditional' ? '240+ items' : 
                     category === 'Accessories' ? '185+ items' :
                     category === 'Footwear' ? '120+ items' : '95+ items'}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Trending Products Section */}
      <Container maxWidth="lg" sx={{ pb: 10 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography 
            variant="h4" 
            component="h2" 
            sx={{ 
              fontWeight: 700,
              position: 'relative',
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: -10,
                left: 0,
                width: 60,
                height: 4,
                background: isDarkMode
                  ? 'linear-gradient(90deg, #fff 0%, rgba(255,255,255,0.3) 100%)'
                  : 'linear-gradient(90deg, #000 0%, rgba(0,0,0,0.3) 100%)',
                borderRadius: 2,
              }
            }}
          >
            Trending Products
          </Typography>
          <Button 
            variant="text" 
            onClick={() => navigate('/products')}
            sx={{ 
              fontWeight: 600, 
              transition: 'all 0.2s',
              '&:hover': {
                transform: 'translateX(5px)',
              }
            }}
          >
            View All
          </Button>
        </Box>
        
        <Grid container spacing={3}>
          {featuredProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <Card
                elevation={0}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  borderRadius: 2,
                  overflow: 'hidden',
                  bgcolor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                  border: isDarkMode
                    ? '1px solid rgba(255,255,255,0.1)'
                    : '1px solid rgba(0,0,0,0.08)',
                  position: 'relative',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: isDarkMode
                      ? '0 10px 30px rgba(0,0,0,0.25)'
                      : '0 10px 30px rgba(0,0,0,0.1)',
                    '& .MuiCardMedia-root': {
                      transform: 'scale(1.05)',
                    }
                  },
                }}
                onClick={() => handleProductClick(product.id)}
              >
                <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                  <CardMedia
                    component="img"
                    height="220"
                    image={product.image}
                    alt={product.title}
                    sx={{
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease',
                    }}
                  />
                  {product.price > 10000 && (
                    <Chip
                      label="Premium"
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        bgcolor: isDarkMode ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0.8)',
                        color: '#fff',
                        fontWeight: 600,
                        px: 1,
                        '& .MuiChip-label': {
                          px: 1,
                        }
                      }}
                    />
                  )}
                </Box>
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Box sx={{ mb: 2 }}>
                    <Typography
                      color="textSecondary"
                      variant="caption"
                      sx={{
                        textTransform: 'uppercase',
                        fontWeight: 600,
                        letterSpacing: 0.5,
                        fontSize: '0.7rem',
                      }}
                    >
                      {product.category}
                    </Typography>
                  </Box>
                  
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="h3"
                    sx={{
                      fontWeight: 700,
                      mb: 1,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {product.title}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Rating value={4.5} precision={0.5} size="small" readOnly />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                      (24)
                    </Typography>
                  </Box>
                  
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    paragraph
                    sx={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      mb: 2,
                      height: 40,
                    }}
                  >
                    {product.description}
                  </Typography>
                  
                  <Box sx={{ mt: 'auto' }}>
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography
                        variant="h6"
                        sx={{ 
                          fontWeight: 700,
                          background: isDarkMode
                            ? 'linear-gradient(90deg, #fff 0%, #aaa 100%)'
                            : 'linear-gradient(90deg, #000 0%, #555 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}
                      >
                        ₹{product.price.toLocaleString('en-IN')}
                      </Typography>
                      <Button
                        variant="text"
                        color="primary"
                        size="small"
                        endIcon={<ShoppingCartIcon />}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(product);
                        }}
                        sx={{ 
                          fontWeight: 600,
                          '&:hover': {
                            bgcolor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                          }
                        }}
                      >
                        Add
                      </Button>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Home; 