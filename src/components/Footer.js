import React, { useContext } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
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
import { ThemeContext } from '../App';

function Footer() {
  const { mode } = useContext(ThemeContext);
  const isDarkMode = mode === 'dark';

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: isDarkMode ? 'rgba(18, 18, 18, 0.95)' : 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderTop: isDarkMode 
          ? '1px solid rgba(255, 255, 255, 0.1)' 
          : '1px solid rgba(0, 0, 0, 0.1)',
        py: 8,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          <Grid item xs={12} md={4}>
            <Typography 
              variant="h6" 
              gutterBottom 
              sx={{ 
                fontWeight: 600,
                mb: 3,
                background: isDarkMode
                  ? 'linear-gradient(45deg, #fff 30%, #ccc 90%)'
                  : 'linear-gradient(45deg, #000 30%, #333 90%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              About iMarketplace
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary" 
              paragraph
              sx={{ 
                lineHeight: 1.8,
                mb: 3,
              }}
            >
              Your one-stop destination for fashion and accessories. We bring together the best sellers and buyers in a seamless shopping experience.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              {[
                { icon: <FacebookIcon />, label: 'Facebook' },
                { icon: <TwitterIcon />, label: 'Twitter' },
                { icon: <InstagramIcon />, label: 'Instagram' },
                { icon: <LinkedInIcon />, label: 'LinkedIn' },
              ].map((social, index) => (
                <IconButton
                  key={index}
                  sx={{
                    color: isDarkMode ? '#fff' : '#000',
                    bgcolor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      bgcolor: isDarkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)',
                    },
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography 
              variant="h6" 
              gutterBottom 
              sx={{ 
                fontWeight: 600,
                mb: 3,
                background: isDarkMode
                  ? 'linear-gradient(45deg, #fff 30%, #ccc 90%)'
                  : 'linear-gradient(45deg, #000 30%, #333 90%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {[
                { to: '/products', label: 'Products' },
                { to: '/seller/register', label: 'Become a Seller' },
                { to: '/cart', label: 'Shopping Cart' },
                { to: '/payment', label: 'Checkout' },
              ].map((link, index) => (
                <Link
                  key={index}
                  component={RouterLink}
                  to={link.to}
                  sx={{
                    color: isDarkMode ? '#fff' : '#000',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      color: isDarkMode ? '#ccc' : '#666',
                      transform: 'translateX(4px)',
                    },
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography 
              variant="h6" 
              gutterBottom 
              sx={{ 
                fontWeight: 600,
                mb: 3,
                background: isDarkMode
                  ? 'linear-gradient(45deg, #fff 30%, #ccc 90%)'
                  : 'linear-gradient(45deg, #000 30%, #333 90%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {[
                { icon: <EmailIcon />, text: 'support@imarketplace.com' },
                { icon: <PhoneIcon />, text: '+91 98765 43210' },
                { icon: <LocationIcon />, text: '123 Market Street, City, Country' },
              ].map((contact, index) => (
                <Box 
                  key={index}
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 2,
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateX(4px)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 40,
                      height: 40,
                      borderRadius: '12px',
                      bgcolor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                    }}
                  >
                    {contact.icon}
                  </Box>
                  <Typography 
                    variant="body2"
                    sx={{
                      color: isDarkMode ? '#fff' : '#000',
                    }}
                  >
                    {contact.text}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ my: 6, opacity: 0.1 }} />
        <Typography 
          variant="body2" 
          color="text.secondary" 
          align="center"
          sx={{ 
            opacity: 0.7,
          }}
        >
          © {new Date().getFullYear()} iMarketplace. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer; 