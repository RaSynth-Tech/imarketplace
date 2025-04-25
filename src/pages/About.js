import React, { useContext } from 'react';
import {
  Container,
  Typography,
  Grid,
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
} from '@mui/material';
import {
  Security as SecurityIcon,
  LocalShipping as ShippingIcon,
  VerifiedUser as VerifiedIcon,
  SupportAgent as SupportIcon,
  Payment as PaymentIcon,
  TrendingUp as TrendingIcon,
  Storefront as StorefrontIcon,
  Group as GroupIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../App';

function About() {
  const navigate = useNavigate();
  const { mode } = useContext(ThemeContext);
  const isDarkMode = mode === 'dark';

  const features = [
    {
      icon: <SecurityIcon />,
      title: 'Secure Transactions',
      description: 'End-to-end encrypted payment processing and secure checkout experience',
    },
    {
      icon: <VerifiedIcon />,
      title: 'Verified Sellers',
      description: 'Rigorous seller verification process ensuring quality and reliability',
    },
    {
      icon: <ShippingIcon />,
      title: 'Fast Delivery',
      description: 'Efficient logistics network ensuring timely delivery across India',
    },
    {
      icon: <SupportIcon />,
      title: '24/7 Support',
      description: 'Round-the-clock customer support for all your queries and concerns',
    },
  ];

  const benefits = [
    {
      icon: <PaymentIcon />,
      title: 'Multiple Payment Options',
      description: 'Support for all major payment methods including UPI, cards, and net banking',
    },
    {
      icon: <TrendingIcon />,
      title: 'Trending Products',
      description: 'Curated selection of trending and popular products across categories',
    },
    {
      icon: <StorefrontIcon />,
      title: 'Diverse Categories',
      description: 'Wide range of products from fashion to electronics and more',
    },
    {
      icon: <GroupIcon />,
      title: 'Community Driven',
      description: 'Active community of buyers and sellers sharing experiences and reviews',
    },
  ];

  return (
    <Box sx={{ py: 8 }}>
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
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 800,
                  mb: 2,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  background: isDarkMode
                    ? 'linear-gradient(90deg, #fff 0%, #aaa 100%)'
                    : 'linear-gradient(90deg, #000 0%, #555 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                About iMarketplace
              </Typography>
              <Typography
                variant="h5"
                paragraph
                sx={{
                  mb: 4,
                  color: isDarkMode ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
                  fontWeight: 400,
                }}
              >
                Your trusted destination for authentic Indian products and seamless shopping experience
              </Typography>
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
                  },
                }}
              >
                Start Shopping
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{
            fontWeight: 700,
            mb: 6,
            textAlign: 'center',
          }}
        >
          Why Choose iMarketplace?
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item key={index} xs={12} sm={6} md={3}>
              <Card
                elevation={0}
                sx={{
                  height: '100%',
                  bgcolor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                  border: isDarkMode
                    ? '1px solid rgba(255,255,255,0.1)'
                    : '1px solid rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: isDarkMode
                      ? '0 10px 30px rgba(0,0,0,0.25)'
                      : '0 10px 30px rgba(0,0,0,0.1)',
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mb: 2,
                      color: isDarkMode ? '#fff' : '#000',
                    }}
                  >
                    {feature.icon}
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{ ml: 2, fontWeight: 600 }}
                    >
                      {feature.title}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ lineHeight: 1.6 }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Benefits Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{
            fontWeight: 700,
            mb: 6,
            textAlign: 'center',
          }}
        >
          Benefits for Buyers
        </Typography>
        <Grid container spacing={4}>
          {benefits.map((benefit, index) => (
            <Grid item key={index} xs={12} sm={6} md={3}>
              <Card
                elevation={0}
                sx={{
                  height: '100%',
                  bgcolor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                  border: isDarkMode
                    ? '1px solid rgba(255,255,255,0.1)'
                    : '1px solid rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: isDarkMode
                      ? '0 10px 30px rgba(0,0,0,0.25)'
                      : '0 10px 30px rgba(0,0,0,0.1)',
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mb: 2,
                      color: isDarkMode ? '#fff' : '#000',
                    }}
                  >
                    {benefit.icon}
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{ ml: 2, fontWeight: 600 }}
                    >
                      {benefit.title}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ lineHeight: 1.6 }}
                  >
                    {benefit.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Container maxWidth="md" sx={{ textAlign: 'center', mb: 8 }}>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{
            fontWeight: 700,
            mb: 3,
          }}
        >
          Join Our Growing Community
        </Typography>
        <Typography
          variant="body1"
          paragraph
          sx={{
            mb: 4,
            color: isDarkMode ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
          }}
        >
          Experience the best of Indian e-commerce with iMarketplace. Shop with confidence,
          discover unique products, and be part of a vibrant community of buyers and sellers.
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/register')}
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
            },
          }}
        >
          Create Account
        </Button>
      </Container>
    </Box>
  );
}

export default About; 