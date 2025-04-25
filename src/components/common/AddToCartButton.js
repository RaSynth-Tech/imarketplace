import React, { useState, useContext } from 'react';
import { Button, Box, IconButton, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { ThemeContext } from '../../App';

const AddToCartButton = ({ product, onAddToCart, onDecrementQuantity, onUpdateQuantity, sx = {} }) => {
  const [quantity, setQuantity] = useState(0);
  const { mode } = useContext(ThemeContext);
  const isDarkMode = mode === 'dark';

  const handleAddToCart = (e) => {
    e.stopPropagation();
    setQuantity(1);
    onAddToCart(product, 1);
  };

  const handleIncrement = (e) => {
    e.stopPropagation();
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onUpdateQuantity(product.id, newQuantity);
  };

  const handleDecrement = (e) => {
    e.stopPropagation();
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onDecrementQuantity(product.id);
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ...sx }}>
      {quantity > 0 ? (
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1,
            p: 0.5,
            borderRadius: 2,
            bgcolor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
            border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}`,
          }}
        >
          <IconButton 
            size="small" 
            onClick={handleDecrement}
            sx={{ 
              width: 28,
              height: 28,
              backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
              color: isDarkMode ? '#fff' : '#000',
              transition: 'all 0.2s ease',
              '&:hover': { 
                backgroundColor: isDarkMode ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)',
                transform: 'scale(1.05)'
              }
            }}
          >
            <RemoveIcon fontSize="small" />
          </IconButton>
          <Typography 
            variant="body1" 
            sx={{ 
              minWidth: '24px', 
              textAlign: 'center',
              fontWeight: 600,
              color: isDarkMode ? '#fff' : '#000',
            }}
          >
            {quantity}
          </Typography>
          <IconButton 
            size="small" 
            onClick={handleIncrement}
            sx={{ 
              width: 28,
              height: 28,
              backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
              color: isDarkMode ? '#fff' : '#000',
              transition: 'all 0.2s ease',
              '&:hover': { 
                backgroundColor: isDarkMode ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)',
                transform: 'scale(1.05)'
              }
            }}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </Box>
      ) : (
        <Button
          variant="outlined"
          onClick={handleAddToCart}
          endIcon={<ShoppingCartIcon />}
          sx={{
            py: 1,
            px: 2,
            borderRadius: 2,
            textTransform: 'none',
            fontSize: '0.875rem',
            fontWeight: 600,
            backgroundColor: isDarkMode 
              ? 'rgba(255,255,255,0.05)' 
              : 'rgba(0,0,0,0.02)',
            borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
            color: isDarkMode ? '#fff' : '#000',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: isDarkMode 
                ? 'rgba(255,255,255,0.1)' 
                : 'rgba(0,0,0,0.05)',
              borderColor: isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
              transform: 'translateY(-2px)',
              boxShadow: isDarkMode 
                ? '0 4px 12px rgba(0,0,0,0.2)' 
                : '0 4px 12px rgba(0,0,0,0.1)',
            },
            ...sx
          }}
        >
          Add to Cart
        </Button>
      )}
    </Box>
  );
};

export default AddToCartButton; 