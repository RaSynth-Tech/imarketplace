import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useNavigate } from 'react-router-dom';

function Logo() {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      onClick={() => navigate('/')}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        cursor: 'pointer',
        '&:hover': {
          opacity: 0.8,
        },
      }}
    >
      <ShoppingBagIcon
        sx={{
          fontSize: 32,
          color: theme.palette.mode === 'dark' ? '#fff' : '#000',
        }}
      />
      <Typography
        variant="h6"
        component="div"
        sx={{
          fontWeight: 700,
          color: theme.palette.mode === 'dark' ? '#fff' : '#000',
          letterSpacing: '0.5px',
        }}
      >
        iMarketplace
      </Typography>
    </Box>
  );
}

export default Logo; 