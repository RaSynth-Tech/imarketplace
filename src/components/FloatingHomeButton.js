import React from 'react';
import { IconButton, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

function FloatingHomeButton() {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <IconButton
      onClick={() => navigate('/')}
      sx={{
        position: 'fixed',
        top: 88,
        right: 32,
        bgcolor: theme.palette.mode === 'dark' 
          ? 'rgba(255, 255, 255, 0.1)' 
          : 'rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(8px)',
        border: theme.palette.mode === 'dark'
          ? '1px solid rgba(255, 255, 255, 0.2)'
          : '1px solid rgba(0, 0, 0, 0.1)',
        '&:hover': {
          bgcolor: theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, 0.2)'
            : 'rgba(0, 0, 0, 0.2)',
          transform: 'translateY(-2px)',
        },
        transition: 'all 0.3s ease-in-out',
        zIndex: 1000,
      }}
    >
      <HomeIcon />
    </IconButton>
  );
}

export default FloatingHomeButton; 