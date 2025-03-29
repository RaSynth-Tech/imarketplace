import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Button,
  Grid,
  Stack,
  Chip,
} from '@mui/material';
import {
  Storefront as StorefrontIcon,
  Edit as EditIcon,
  LocationOn as LocationOnIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  AccessTime as AccessTimeIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const BusinessInfo = ({ user }) => {
  const navigate = useNavigate();

  return (
    <Paper 
      sx={{ 
        p: 3,
        background: 'linear-gradient(to right, #ffffff, #f8f9fa)',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography 
          variant="h5" 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1,
            fontWeight: 600,
            color: '#1a1a1a',
          }}
        >
          <StorefrontIcon sx={{ color: 'primary.main' }} /> Business Information
        </Typography>
        <Button
          variant="outlined"
          startIcon={<EditIcon />}
          onClick={() => navigate('/seller/edit-profile')}
          sx={{
            borderColor: 'primary.main',
            color: 'primary.main',
            '&:hover': {
              borderColor: 'primary.dark',
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
            },
          }}
        >
          Edit Profile
        </Button>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                Business Name
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {user.businessDetails?.name}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                Description
              </Typography>
              <Typography sx={{ lineHeight: 1.6 }}>
                {user.businessDetails?.description}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Specialties
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {user.businessDetails?.specialties?.map((specialty, index) => (
                  <Chip
                    key={index}
                    label={specialty}
                    size="small"
                    sx={{ 
                      bgcolor: 'rgba(0, 0, 0, 0.05)',
                      '&:hover': {
                        bgcolor: 'rgba(0, 0, 0, 0.08)',
                      },
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
              <LocationOnIcon color="action" sx={{ mt: 0.5 }} />
              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                  Address
                </Typography>
                <Typography sx={{ lineHeight: 1.6 }}>
                  {user.businessDetails?.address}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PhoneIcon color="action" />
              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                  Phone
                </Typography>
                <Typography>
                  {user.businessDetails?.phone}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <EmailIcon color="action" />
              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                  Email
                </Typography>
                <Typography>
                  {user.email}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AccessTimeIcon color="action" />
              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                  Business Hours
                </Typography>
                <Typography>
                  {user.businessDetails?.businessHours}
                </Typography>
              </Box>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default BusinessInfo; 