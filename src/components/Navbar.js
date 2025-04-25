import React, { useState, useContext } from 'react';
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
  Divider,
  Tooltip,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
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
  Favorite as FavoriteIcon,
  Menu as MenuIcon,
  More as MoreIcon,
} from '@mui/icons-material';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import Logo from './Logo';
import { ThemeContext } from '../App';

function Navbar() {
  const { mode, toggleColorMode, setMode } = useContext(ThemeContext);
  const { cartItems = [], removeFromCart, updateQuantity, getTotal } = useCart();
  const { isAuthenticated, user, logout, isAdmin } = useAuth();
  const { wishlists } = useWishlist();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [cartAnchorEl, setCartAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [themeMenuAnchorEl, setThemeMenuAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isThemeMenuOpen = Boolean(themeMenuAnchorEl);

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

  // Calculate total wishlist items count
  const wishlistItemCount = wishlists.reduce((total, list) => total + list.items.length, 0);

  const handleThemeMenuOpen = (event) => {
    setThemeMenuAnchorEl(event.currentTarget);
  };

  const handleThemeMenuClose = () => {
    setThemeMenuAnchorEl(null);
  };

  const handleThemeChange = (newMode) => {
    setMode(newMode);
    handleThemeMenuClose();
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleClose}
    >
      {isAuthenticated ? (
        <>
          <MenuItem component={RouterLink} to="/profile" onClick={handleClose}>
            <PersonIcon sx={{ mr: 1.5, color: 'text.secondary' }} />
            Profile
          </MenuItem>
          {isAdmin && (
            <MenuItem component={RouterLink} to="/admin/dashboard" onClick={handleClose}>
              <DashboardIcon sx={{ mr: 1.5, color: 'text.secondary' }} />
              Admin Dashboard
            </MenuItem>
          )}
          {user.role === 'seller' && (
            <MenuItem component={RouterLink} to="/dashboard" onClick={handleClose}>
              <DashboardIcon sx={{ mr: 1.5, color: 'text.secondary' }} />
              Seller Dashboard
            </MenuItem>
          )}
          <MenuItem onClick={handleLogout}>
            <LogoutIcon sx={{ mr: 1.5, color: 'text.secondary' }} />
            Logout
          </MenuItem>
        </>
      ) : (
        <>
          <MenuItem component={RouterLink} to="/login" onClick={handleClose}>
            Login
          </MenuItem>
          <MenuItem component={RouterLink} to="/register" onClick={handleClose}>
            Register
          </MenuItem>
        </>
      )}
    </Menu>
  );

  const themeMenu = (
    <Menu
      anchorEl={themeMenuAnchorEl}
      open={isThemeMenuOpen}
      onClose={handleThemeMenuClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      PaperProps={{
        elevation: 3,
        sx: {
          borderRadius: 2,
          minWidth: 180,
          overflow: 'visible',
          mt: 1.5,
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      }}
    >
      <MenuItem 
        onClick={() => handleThemeChange('light')}
        selected={mode === 'light'}
        sx={{ 
          py: 1.5,
          borderRadius: 1,
          mx: 1,
          mb: 0.5,
          display: 'flex',
          alignItems: 'center',
          gap: 1.5
        }}
      >
        <LightModeIcon color={mode === 'light' ? 'primary' : 'inherit'} />
        <Typography variant="body2">Light</Typography>
      </MenuItem>
      
      <MenuItem 
        onClick={() => handleThemeChange('dark')}
        selected={mode === 'dark'}
        sx={{ 
          py: 1.5,
          borderRadius: 1,
          mx: 1,
          mb: 0.5,
          display: 'flex',
          alignItems: 'center',
          gap: 1.5
        }}
      >
        <DarkModeIcon color={mode === 'dark' ? 'primary' : 'inherit'} />
        <Typography variant="body2">Dark</Typography>
      </MenuItem>
      
      <MenuItem 
        onClick={() => handleThemeChange('system')}
        selected={mode === 'system'}
        sx={{ 
          py: 1.5,
          borderRadius: 1,
          mx: 1,
          display: 'flex',
          alignItems: 'center',
          gap: 1.5
        }}
      >
        <LightModeIcon color={mode === 'system' ? 'primary' : 'inherit'} />
        <Typography variant="body2">System</Typography>
      </MenuItem>
    </Menu>
  );

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle}>
      <Box
        sx={{
          height: 150,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          padding: 2,
        }}
      >
        {isAuthenticated ? (
          <>
            <Avatar
              sx={{ width: 60, height: 60, mb: 1 }}
              src={user?.profilePhoto}
            />
            <Typography variant="subtitle1">{user?.name}</Typography>
            <Typography variant="body2" color="text.secondary">{user?.email}</Typography>
          </>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%' }}>
            <Button
              variant="contained"
              fullWidth
              component={RouterLink}
              to="/login"
              onClick={handleDrawerToggle}
            >
              Login
            </Button>
            <Button
              variant="outlined"
              fullWidth
              component={RouterLink}
              to="/register"
              onClick={handleDrawerToggle}
            >
              Register
            </Button>
          </Box>
        )}
      </Box>
      <Divider />
      <List>
        <ListItem button component={RouterLink} to="/" onClick={handleDrawerToggle}>
          <ListItemIcon>
            <InventoryIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={RouterLink} to="/products" onClick={handleDrawerToggle}>
          <ListItemIcon>
            <InventoryIcon />
          </ListItemIcon>
          <ListItemText primary="Products" />
        </ListItem>
        <ListItem button component={RouterLink} to="/wishlist" onClick={handleDrawerToggle}>
          <ListItemIcon>
            <FavoriteIcon />
          </ListItemIcon>
          <ListItemText primary="Wishlist" />
        </ListItem>
        <ListItem button component={RouterLink} to="/cart" onClick={handleDrawerToggle}>
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Cart" />
        </ListItem>
      </List>
      <Divider />
      {isAuthenticated && (
        <List>
          <ListItem button component={RouterLink} to="/profile" onClick={handleDrawerToggle}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
          {isAdmin && (
            <ListItem button component={RouterLink} to="/admin/dashboard" onClick={handleDrawerToggle}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Admin Dashboard" />
            </ListItem>
          )}
          {user.role === 'seller' && (
            <ListItem button component={RouterLink} to="/dashboard" onClick={handleDrawerToggle}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Seller Dashboard" />
            </ListItem>
          )}
        </List>
      )}
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: mode === 'dark'
            ? 'rgba(18, 18, 18, 0.95)'
            : 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderBottom: mode === 'dark'
            ? '1px solid rgba(255, 255, 255, 0.1)'
            : '1px solid rgba(0, 0, 0, 0.1)',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ py: 1 }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Logo />
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
              <Tooltip title="Theme settings">
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="theme settings"
                  aria-haspopup="true"
                  onClick={handleThemeMenuOpen}
                  color="inherit"
                  sx={{
                    ml: 1,
                    backgroundColor: isThemeMenuOpen ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.25)'
                    },
                    transition: 'all 0.2s'
                  }}
                >
                  {mode === 'light' && <LightModeIcon />}
                  {mode === 'dark' && <DarkModeIcon />}
                  {mode === 'system' && <LightModeIcon />}
                </IconButton>
              </Tooltip>
              
              <Tooltip title="My Wishlists">
                <IconButton
                  size="large"
                  aria-label="show wishlist items"
                  color="inherit"
                  component={RouterLink}
                  to="/wishlist"
                >
                  <Badge badgeContent={wishlistItemCount} color="error">
                    <FavoriteIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
              
              <Tooltip title="Shopping Cart">
                <IconButton
                  size="large"
                  aria-label="show cart items"
                  color="inherit"
                  component={RouterLink}
                  to="/cart"
                >
                  <Badge badgeContent={cartItemCount} color="primary">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
              
              <Tooltip title={isAuthenticated ? 'Account' : 'Login'}>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  {isAuthenticated && user?.profilePhoto ? (
                    <Avatar 
                      src={user.profilePhoto} 
                      sx={{ width: 32, height: 32 }}
                    />
                  ) : (
                    <AccountCircleIcon />
                  )}
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
      >
        {drawer}
      </Drawer>
      
      {renderMenu}
      {themeMenu}
    </Box>
  );
}

export default Navbar; 