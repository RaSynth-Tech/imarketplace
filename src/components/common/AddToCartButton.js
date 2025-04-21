import React, { useState } from 'react';
import { Button, Box, IconButton, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const AddToCartButton = ({ product, onAddToCart, onDecrementQuantity, onUpdateQuantity }) => {
  const [quantity, setQuantity] = useState(0);

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
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      {quantity > 0 ? (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton 
            size="small" 
            onClick={handleDecrement}
            sx={{ 
              backgroundColor: '#f5f5f5',
              '&:hover': { backgroundColor: '#e0e0e0' }
            }}
          >
            <RemoveIcon fontSize="small" />
          </IconButton>
          <Typography variant="body1" sx={{ minWidth: '24px', textAlign: 'center' }}>
            {quantity}
          </Typography>
          <IconButton 
            size="small" 
            onClick={handleIncrement}
            sx={{ 
              backgroundColor: '#f5f5f5',
              '&:hover': { backgroundColor: '#e0e0e0' }
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
            borderColor: '#000',
            color: '#000',
            '&:hover': {
              backgroundColor: '#f5f5f5',
              borderColor: '#000',
            },
          }}
        >
          Add to Cart
        </Button>
      )}
    </Box>
  );
};

export default AddToCartButton; 