import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { TrendingUp as TrendingUpIcon, Inventory as InventoryIcon, Star as StarIcon } from '@mui/icons-material';

const StatCard = ({ icon: Icon, title, value, color = 'primary.main' }) => {
  return (
    <Paper 
      sx={{ 
        p: 3, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        },
      }}
    >
      <Box 
        sx={{ 
          width: 56, 
          height: 56, 
          borderRadius: '50%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          bgcolor: `${color}15`,
          mb: 2,
        }}
      >
        <Icon sx={{ fontSize: 32, color }} />
      </Box>
      <Typography 
        variant="h4" 
        component="div" 
        sx={{ 
          fontWeight: 600,
          mb: 1,
          color: '#1a1a1a',
        }}
      >
        {value}
      </Typography>
      <Typography 
        color="text.secondary" 
        sx={{ 
          textAlign: 'center',
          fontWeight: 500,
        }}
      >
        {title}
      </Typography>
    </Paper>
  );
};

export default StatCard; 