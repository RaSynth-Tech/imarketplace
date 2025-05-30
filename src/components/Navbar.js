import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Badge,
  Menu,
  MenuItem,
  Avatar,
  useTheme,
  Container,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  ShoppingCart as ShoppingCartIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  AccountCircle as AccountCircleIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
  Dashboard as DashboardIcon,
  Inventory as InventoryIcon,
  Storefront as StorefrontIcon,
} from '@mui/icons-material';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Logo from './Logo';

function Navbar({ isDarkMode, toggleTheme }) {
  const { cartItems = [], removeFromCart, updateQuantity, getTotal } = useCart();
  const { isAuthenticated, user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [cartAnchorEl, setCartAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCartMenu = (event) => {
    setCartAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCartClose = () => {
    setCartAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
    navigate('/');
  };

  const handleProfile = () => {
    navigate('/profile');
    handleClose();
  };

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: isDarkMode
          ? 'rgba(18, 18, 18, 0.8)'
          : 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(8px)',
        borderBottom: isDarkMode
          ? '1px solid rgba(255, 255, 255, 0.1)'
          : '1px solid rgba(0, 0, 0, 0.1)',
        boxShadow: 'none',
      }}
    >
      <Container maxWidth="lg" style={{maxWidth: '100%'}}>
        <Toolbar disableGutters>
          <Logo />
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end', }}>
            <Button
              color="inherit"
              component={RouterLink}
              to="/products"
              startIcon={<InventoryIcon />}
              sx={{ 
                color: '#000',
                '&:hover': {
                  bgcolor: 'rgba(0, 0, 0, 0.05)',
                },
              }}
            >
              Products
            </Button>
            {user ? (
              <>
                {isAdmin && (
                  <Button
                    color="inherit"
                    component={RouterLink}
                    
                    to="/admin/dashboard"
                    startIcon={<DashboardIcon sx={{ color: '#000' }} />}
                    sx={{ 
                      color: '#000',
                      '&:hover': {
                        bgcolor: 'rgba(0, 0, 0, 0.05)',
                      },
                    }}
                  >
                    Admin Dashboard
                  </Button>
                )}
                {user.role === 'seller' && (
                  <>
                    <Button
                      color="inherit"
                      component={RouterLink}
                      to="/dashboard"
                      startIcon={<DashboardIcon />}
                      sx={{ 
                        color: '#000',
                        '&:hover': {
                          bgcolor: 'rgba(0, 0, 0, 0.05)',
                        },
                      }}
                    >
                      Dashboard
                    </Button>
                    {/* <Button
                      color="inherit"
                      component={RouterLink}
                      to="/my-products"
                      startIcon={<InventoryIcon />}
                      sx={{ 
                        color: '#000',
                        '&:hover': {
                          bgcolor: 'rgba(0, 0, 0, 0.05)',
                        },
                      }}
                    >
                      My Products
                    </Button> */}
                  </>
                )}
                <IconButton
                  color="inherit"
                  onClick={handleMenu}
                  sx={{ ml: 2 }}
                >
                  <Avatar
                    src={user.profilePhoto}
                    sx={{ width: 32, height: 32 }}
                  />
                </IconButton>
                
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleProfile}>
                    <PersonIcon sx={{ mr: 1 }} />
                    Profile
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <LogoutIcon sx={{ mr: 1 }} />
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button
                  color="inherit"
                  onClick={() => navigate('/login')}
                  sx={{ 
                    mr: 2,
                    color: isDarkMode ? '#fff' : '#000',
                    '&:hover': {
                      bgcolor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                    },
                  }}
                >
                  Login
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/register')}
                  sx={{ 
                    mr: 2,
                    borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.3)' : '#000',
                    color: isDarkMode ? '#fff' : '#000',
                    '&:hover': {
                      borderColor: isDarkMode ? '#fff' : '#000',
                      bgcolor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                    },
                  }}
                >
                  Register as Seller
                </Button>
              </>
            )}
          </Box>
          <IconButton
                  color="inherit"
                  onClick={handleCartMenu}
                  sx={{ 
                    color: '#000',
                    '&:hover': {
                      bgcolor: 'rgba(0, 0, 0, 0.05)',
                    },
                  }}
                >
                  <Badge badgeContent={cartItemCount} color="primary">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
                <Menu
                  anchorEl={cartAnchorEl}
                  open={Boolean(cartAnchorEl)}
                  onClose={handleCartClose}
                >
                  {cartItems.length === 0 ? (
                    <MenuItem disabled>Your cart is empty</MenuItem>
                  ) : (
                    <>
                      {cartItems.map((item) => (
                        <MenuItem key={item.id}>
                          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                            <img
                              src={item.image}
                              alt={item.title}
                              style={{ width: 50, height: 50, objectFit: 'cover', marginRight: 16 }}
                            />
                            <Box sx={{ flexGrow: 1 }}>
                              <Typography variant="subtitle2">{item.title}</Typography>
                              <Typography variant="body2" color="text.secondary">
                                ₹{item.price.toLocaleString('en-IN')}
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <IconButton
                                size="small"
                                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              >
                                -
                              </IconButton>
                              <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                              <IconButton
                                size="small"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                +
                              </IconButton>
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => removeFromCart(item.id)}
                              >
                                ×
                              </IconButton>
                            </Box>
                          </Box>
                        </MenuItem>
                      ))}
                      <MenuItem>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                          <Typography variant="subtitle1">Total:</Typography>
                          <Typography variant="subtitle1">
                            ₹{getTotal().toLocaleString('en-IN')}
                          </Typography>
                        </Box>
                      </MenuItem>
                      <MenuItem onClick={() => { navigate('/cart'); handleCartClose(); }}>
                        <Button
                          variant="contained"
                          fullWidth
                          color="primary"
                        >
                          Checkout
                        </Button>
                      </MenuItem>
                    </>
                  )}
                </Menu>
          <IconButton 
            color="inherit" 
            onClick={toggleTheme}
            sx={{ 
              color: isDarkMode ? '#fff' : '#000',
              '&:hover': {
                bgcolor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
              },
            }}
          >
            {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar; 