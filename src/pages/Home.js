import React from 'react';
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
  useTheme,
} from '@mui/material';
import { useCart } from '../context/CartContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

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
  const theme = useTheme();

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <Box>
      <Box
        sx={{
          bgcolor: theme.palette.mode === 'dark' ? 'rgba(18, 18, 18, 0.8)' : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(8px)',
          borderBottom: theme.palette.mode === 'dark'
            ? '1px solid rgba(255, 255, 255, 0.1)'
            : '1px solid rgba(0, 0, 0, 0.1)',
          py: 8,
          mb: 6,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              color: theme.palette.mode === 'dark' ? '#fff' : '#000',
              mb: 4,
              mt: 4,
            }}
          >
            Welcome to iMarketplace
          </Typography>
          <Typography variant="h5" color="text.secondary" paragraph sx={{ mb: 4 }}>
            Discover the latest trends in Indian fashion and accessories
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/products')}
            sx={{ mt: 2 }}
          >
            Shop Now
          </Button>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ pb: 8 }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 4, fontWeight: 600 }}>
          Featured Products
        </Typography>
        <Grid container spacing={4}>
          {featuredProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease-in-out',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.shadows[8],
                    border: `1px solid ${theme.palette.primary.main}`,
                  },
                }}
                onClick={() => handleProductClick(product.id)}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.title}
                  sx={{
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="h3"
                    sx={{
                      fontWeight: 600,
                      mb: 1,
                    }}
                  >
                    {product.title}
                  </Typography>
                  <Typography color="text.secondary" gutterBottom>
                    {product.category} • {product.subcategory}
                  </Typography>
                  <Typography
                    variant="h6"
                    color="primary"
                    gutterBottom
                    sx={{ fontWeight: 600 }}
                  >
                    ₹{product.price.toLocaleString('en-IN')}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    paragraph
                    sx={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {product.description}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      variant="outlined"
                      startIcon={<ShoppingCartIcon />}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product);
                      }}
                    >
                      Add to Cart
                    </Button>
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