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
        gap: 1.5,
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-1px)',
          opacity: 0.9,
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
          bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)',
          },
        }}
      >
        <ShoppingBagIcon
          sx={{
            fontSize: 24,
            color: theme.palette.mode === 'dark' ? '#fff' : '#000',
          }}
        />
      </Box>
      <Typography
        variant="h6"
        component="div"
        sx={{
          fontWeight: 700,
          color: theme.palette.mode === 'dark' ? '#fff' : '#000',
          letterSpacing: '0.5px',
          fontSize: '1.25rem',
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(45deg, #fff 30%, #ccc 90%)'
            : 'linear-gradient(45deg, #000 30%, #333 90%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        iMarketplace
      </Typography>
    </Box>
  );
}

export default Logo; 