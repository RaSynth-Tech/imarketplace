import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  Tabs,
  Tab,
  Divider,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Menu,
  MenuItem,
  Tooltip,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Badge,
  useTheme,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Favorite as FavoriteIcon,
  ShoppingCart as CartIcon,
  Share as ShareIcon,
  DeleteForever as DeleteForeverIcon,
} from '@mui/icons-material';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import FloatingHomeButton from '../components/common/FloatingHomeButton';

function Wishlist() {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const { 
    wishlists, 
    createWishlist, 
    deleteWishlist, 
    renameWishlist, 
    removeFromWishlist,
    getWishlist,
    getWishlistsInfo,
    getDefaultWishlist
  } = useWishlist();
  const { addToCart } = useCart();
  
  const [currentWishlistId, setCurrentWishlistId] = useState(id || 'default');
  const [newWishlistName, setNewWishlistName] = useState('');
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [editingWishlistId, setEditingWishlistId] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [selectedWishlistId, setSelectedWishlistId] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  
  // Get current wishlist
  const currentWishlist = getWishlist(currentWishlistId) || getDefaultWishlist();
  
  // Set the current wishlist based on URL parameter
  useEffect(() => {
    if (id) {
      setCurrentWishlistId(id);
    }
  }, [id]);
  
  const handleTabChange = (event, newValue) => {
    setCurrentWishlistId(newValue);
    navigate(`/wishlist/${newValue}`);
  };
  
  const handleCreateWishlist = () => {
    if (newWishlistName.trim()) {
      const newId = createWishlist(newWishlistName.trim());
      setNewWishlistName('');
      setCreateDialogOpen(false);
      setCurrentWishlistId(newId);
      navigate(`/wishlist/${newId}`);
      setSnackbar({
        open: true,
        message: `Wishlist "${newWishlistName.trim()}" created successfully!`,
        severity: 'success'
      });
    }
  };
  
  const handleRenameWishlist = () => {
    if (newWishlistName.trim() && editingWishlistId) {
      renameWishlist(editingWishlistId, newWishlistName.trim());
      setRenameDialogOpen(false);
      setNewWishlistName('');
      setEditingWishlistId(null);
      setSnackbar({
        open: true,
        message: 'Wishlist renamed successfully!',
        severity: 'success'
      });
    }
  };
  
  const openRenameDialog = (wishlistId, currentName) => {
    setEditingWishlistId(wishlistId);
    setNewWishlistName(currentName);
    setRenameDialogOpen(true);
    handleMenuClose();
  };
  
  const handleMenuClick = (event, wishlistId) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedWishlistId(wishlistId);
  };
  
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setSelectedWishlistId(null);
  };
  
  const handleDeleteWishlist = (wishlistId) => {
    if (wishlistId === 'default') {
      setSnackbar({
        open: true,
        message: 'Cannot delete the default wishlist',
        severity: 'error'
      });
      return;
    }
    
    deleteWishlist(wishlistId);
    
    if (currentWishlistId === wishlistId) {
      setCurrentWishlistId('default');
      navigate('/wishlist');
    }
    
    handleMenuClose();
    setSnackbar({
      open: true,
      message: 'Wishlist deleted successfully',
      severity: 'success'
    });
  };
  
  const handleRemoveFromWishlist = (productId) => {
    removeFromWishlist(currentWishlistId, productId);
    setSnackbar({
      open: true,
      message: 'Item removed from wishlist',
      severity: 'success'
    });
  };
  
  const handleAddToCart = (product) => {
    addToCart(product);
    setSnackbar({
      open: true,
      message: `${product.title} added to cart`,
      severity: 'success'
    });
  };
  
  const handleProductClick = (product) => {
    navigate(`/products/${product.id}`, { state: { product } });
  };
  
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <FloatingHomeButton />
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          My Wishlists
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={() => setCreateDialogOpen(true)}
        >
          New Wishlist
        </Button>
      </Box>
      
      <Paper sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tabs
            value={currentWishlistId}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ 
              flex: 1,
              '& .MuiTab-root': {
                textTransform: 'none',
                minWidth: 120,
                py: 2,
              }
            }}
          >
            {wishlists.map((list) => (
              <Tab 
                key={list.id} 
                value={list.id} 
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Badge badgeContent={list.items.length} color="primary" sx={{ mr: 1 }}>
                      <FavoriteIcon fontSize="small" />
                    </Badge>
                    {list.name}
                  </Box>
                } 
              />
            ))}
          </Tabs>
          
          {/* Three dots menu for current wishlist */}
          {currentWishlist && (
            <Box sx={{ px: 2 }}>
              <IconButton onClick={(e) => handleMenuClick(e, currentWishlistId)}>
                <MoreVertIcon />
              </IconButton>
            </Box>
          )}
        </Box>
        
        <Divider />
        
        <Box sx={{ p: 2 }}>
          {currentWishlist?.items.length === 0 ? (
            <Box sx={{ py: 4, textAlign: 'center' }}>
              <FavoriteIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
                This wishlist is empty
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Add items to your wishlist by clicking the heart icon on products
              </Typography>
              <Button 
                variant="contained" 
                onClick={() => navigate('/products')}
              >
                Browse Products
              </Button>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {currentWishlist?.items.map((product) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                  <Card 
                    elevation={0}
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 2,
                      overflow: 'hidden',
                      transition: 'all 0.3s ease-in-out',
                      bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: theme.palette.mode === 'dark' 
                          ? '0 8px 24px rgba(0,0,0,0.3)' 
                          : '0 8px 24px rgba(0,0,0,0.1)',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        position: 'relative',
                        paddingTop: '100%',
                        cursor: 'pointer',
                      }}
                      onClick={() => handleProductClick(product)}
                    >
                      <CardMedia
                        component="img"
                        image={product.image}
                        alt={product.title}
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          display: 'flex',
                          gap: 1,
                        }}
                      >
                        <IconButton
                          size="small"
                          sx={{
                            bgcolor: 'background.paper',
                            '&:hover': {
                              bgcolor: 'background.default',
                            },
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveFromWishlist(product.id);
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                    
                    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      <Typography
                        variant="subtitle1"
                        component="h3"
                        gutterBottom
                        sx={{
                          fontWeight: 600,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        {product.title}
                      </Typography>
                      
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          mb: 2,
                        }}
                      >
                        ₹{product.price.toLocaleString('en-IN')}
                      </Typography>
                      
                      <Box sx={{ mt: 'auto' }}>
                        <Button
                          variant="contained"
                          fullWidth
                          startIcon={<CartIcon />}
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
          )}
        </Box>
      </Paper>
      
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
            Create
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Rename Wishlist Dialog */}
      <Dialog open={renameDialogOpen} onClose={() => setRenameDialogOpen(false)}>
        <DialogTitle>Rename Wishlist</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="New Name"
            fullWidth
            variant="outlined"
            value={newWishlistName}
            onChange={(e) => setNewWishlistName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRenameDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleRenameWishlist}
            variant="contained"
            disabled={!newWishlistName.trim()}
          >
            Rename
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Wishlist Actions Menu */}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem 
          onClick={() => {
            const selectedWishlist = getWishlist(selectedWishlistId);
            if (selectedWishlist) {
              openRenameDialog(selectedWishlistId, selectedWishlist.name);
            }
          }}
        >
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Rename Wishlist</ListItemText>
        </MenuItem>
        
        <MenuItem 
          onClick={() => handleDeleteWishlist(selectedWishlistId)}
          disabled={selectedWishlistId === 'default'}
        >
          <ListItemIcon>
            <DeleteForeverIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>Delete Wishlist</ListItemText>
        </MenuItem>
      </Menu>
      
      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Wishlist; 