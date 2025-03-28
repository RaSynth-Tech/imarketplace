import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
  useTheme,
} from '@mui/material';
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

function Footer() {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: theme.palette.mode === 'dark' ? 'rgba(18, 18, 18, 0.8)' : 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(8px)',
        borderTop: theme.palette.mode === 'dark' 
          ? '1px solid rgba(255, 255, 255, 0.1)' 
          : '1px solid rgba(0, 0, 0, 0.1)',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              About iMarketplace
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Your one-stop destination for fashion and accessories. We bring together the best sellers and buyers in a seamless shopping experience.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton color="inherit" sx={{ mr: 1 }}>
                <FacebookIcon />
              </IconButton>
              <IconButton color="inherit" sx={{ mr: 1 }}>
                <TwitterIcon />
              </IconButton>
              <IconButton color="inherit" sx={{ mr: 1 }}>
                <InstagramIcon />
              </IconButton>
              <IconButton color="inherit">
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link component={RouterLink} to="/products" color="inherit" underline="hover">
                Products
              </Link>
              <Link component={RouterLink} to="/seller/register" color="inherit" underline="hover">
                Become a Seller
              </Link>
              <Link component={RouterLink} to="/cart" color="inherit" underline="hover">
                Shopping Cart
              </Link>
              <Link component={RouterLink} to="/payment" color="inherit" underline="hover">
                Checkout
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EmailIcon fontSize="small" />
                <Typography variant="body2">
                  support@imarketplace.com
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PhoneIcon fontSize="small" />
                <Typography variant="body2">
                  +91 98765 43210
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationIcon fontSize="small" />
                <Typography variant="body2">
                  Tech Park, Electronic City Phase 1,<br />
                  Bangalore, Karnataka 560100
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ my: 4 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} iMarketplace. All rights reserved.
          </Typography>
          <Box>
            <Link component={RouterLink} to="/privacy" color="inherit" underline="hover" sx={{ mr: 2 }}>
              Privacy Policy
            </Link>
            <Link component={RouterLink} to="/terms" color="inherit" underline="hover">
              Terms of Service
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer; 