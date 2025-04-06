import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Fab } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

function FloatingHomeButton() {
  const navigate = useNavigate();

  return (
    <Fab
      color="primary"
      aria-label="home"
      sx={{
        position: 'fixed',
        top: 80,
        right: 24,
        width: 50,
        height: 50,
        backgroundColor: '#000',
        '&:hover': {
          backgroundColor: '#333',
          transform: 'scale(1.1)',
        },
        transition: 'all 0.3s ease-in-out',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        zIndex: 1000,
      }}
      onClick={() => navigate('/')}
    >
      <HomeIcon sx={{ fontSize: 30 }} />
    </Fab>
  );
}

export default FloatingHomeButton; 