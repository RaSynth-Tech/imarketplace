import React from 'react';
import { Box, Typography, Avatar, Paper, useTheme } from '@mui/material';
import { Storefront as StorefrontIcon } from '@mui/icons-material';

const SellerProfileHeader = ({ user }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  return (
    <Paper
      sx={{
        p: 3,
        mb: 3,
        background: isDarkMode
          ? 'linear-gradient(to right, #1a1a1a, #2d2d2d)'
          : 'linear-gradient(to right, #ffffff, #f8f9fa)',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        display: 'flex',
        alignItems: 'center',
        gap: 3,
      }}
    >
      <Avatar
        src={user.profilePhoto}
        alt={user.name}
        sx={{
          width: 100,
          height: 100,
          border: `4px solid ${theme.palette.primary.main}`,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      />
      <Box sx={{ flex: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <StorefrontIcon sx={{ color: 'primary.main' }} />
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 600,
              color: isDarkMode ? '#fff' : '#1a1a1a',
            }}
          >
            {user.name}
          </Typography>
        </Box>
        <Typography
          variant="subtitle1"
          sx={{
            color: isDarkMode ? 'rgba(255,255,255,0.8)' : 'text.secondary',
            mb: 1,
          }}
        >
          {user.businessDetails?.name}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: isDarkMode ? 'rgba(255,255,255,0.7)' : 'text.secondary',
            maxWidth: '600px',
          }}
        >
          {user.businessDetails?.description}
        </Typography>
      </Box>
    </Paper>
  );
};

export default SellerProfileHeader; 