import React from 'react';
import { Paper, Typography, Box, useTheme } from '@mui/material';

const StatCard = ({ icon, title, value, color = 'primary.main' }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const getGradientColors = () => {
    switch (color) {
      case 'primary.main':
        return isDarkMode 
          ? 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)'
          : 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)';
      case 'success.main':
        return isDarkMode
          ? 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%)'
          : 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)';
      case 'warning.main':
        return isDarkMode
          ? 'linear-gradient(135deg, #e65100 0%, #f57c00 100%)'
          : 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)';
      case 'info.main':
        return isDarkMode
          ? 'linear-gradient(135deg, #01579b 0%, #0288d1 100%)'
          : 'linear-gradient(135deg, #e1f5fe 0%, #b3e5fc 100%)';
      default:
        return isDarkMode
          ? 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)'
          : 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)';
    }
  };

  return (
    <Paper 
      sx={{ 
        p: 3, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        background: getGradientColors(),
        boxShadow: isDarkMode 
          ? '0 2px 4px rgba(0,0,0,0.2)'
          : '0 2px 4px rgba(0,0,0,0.05)',
        transition: 'all 0.3s ease-in-out',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: isDarkMode
            ? '0 4px 8px rgba(0,0,0,0.3)'
            : '0 4px 8px rgba(0,0,0,0.1)',
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: isDarkMode
            ? 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)'
            : 'linear-gradient(45deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 100%)',
          opacity: 0.5,
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
          bgcolor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.8)',
          mb: 2,
          position: 'relative',
          zIndex: 1,
          boxShadow: isDarkMode
            ? '0 2px 4px rgba(0,0,0,0.2)'
            : '0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        {React.cloneElement(icon, {
          sx: { 
            fontSize: 32, 
            color: isDarkMode ? '#fff' : color,
            filter: isDarkMode ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' : 'none',
          }
        })}
      </Box>
      <Typography 
        variant="h4" 
        component="div" 
        sx={{ 
          fontWeight: 600,
          mb: 1,
          color: isDarkMode ? '#fff' : '#1a1a1a',
          position: 'relative',
          zIndex: 1,
          textShadow: isDarkMode ? '0 2px 4px rgba(0,0,0,0.2)' : 'none',
        }}
      >
        {value}
      </Typography>
      <Typography 
        sx={{ 
          textAlign: 'center',
          fontWeight: 500,
          color: isDarkMode ? 'rgba(255,255,255,0.8)' : 'text.secondary',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {title}
      </Typography>
    </Paper>
  );
};

export default StatCard; 