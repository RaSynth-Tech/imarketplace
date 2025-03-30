import React, { useState } from 'react';
import {
  Paper,
  Box,
  Typography,
  Avatar,
  IconButton,
  TextField,
  Button,
  Divider,
  Stack,
  Chip,
  Rating,
} from '@mui/material';
import {
  Edit as EditIcon,
  CloudUpload as CloudUploadIcon,
  Verified as VerifiedIcon,
  LocationOn as LocationOnIcon,
  Storefront as StorefrontIcon,
} from '@mui/icons-material';

const SellerProfileSection = ({ seller, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    profilePhoto: seller?.profilePhoto || '',
    tagline: seller?.tagline || '',
    businessName: seller?.businessDetails?.name || '',
    address: seller?.businessDetails?.address || '',
  });
  const [imagePreview, setImagePreview] = useState(seller?.profilePhoto || null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setProfileData(prev => ({
          ...prev,
          profilePhoto: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (field) => (event) => {
    setProfileData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleSave = () => {
    onUpdateProfile(profileData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setProfileData({
      profilePhoto: seller?.profilePhoto || '',
      tagline: seller?.tagline || '',
      businessName: seller?.businessDetails?.name || '',
      address: seller?.businessDetails?.address || '',
    });
    setImagePreview(seller?.profilePhoto || null);
    setIsEditing(false);
  };

  return (
    <Paper 
      sx={{ 
        p: 3,
        background: 'linear-gradient(to right, #ffffff, #f8f9fa)',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Seller Profile
        </Typography>
        {!isEditing && (
          <IconButton
            size="small"
            onClick={() => setIsEditing(true)}
            sx={{ 
              color: '#000000',
              '& .MuiSvgIcon-root': {
                fontSize: '1.2rem',
              },
            }}
          >
            <EditIcon />
          </IconButton>
        )}
      </Box>

      <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
        <Box sx={{ position: 'relative' }}>
          <Avatar
            src={imagePreview}
            alt={seller?.name}
            sx={{ 
              width: 120, 
              height: 120,
              border: '2px solid',
              borderColor: '#000000',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          />
          {isEditing && (
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                bgcolor: 'rgba(0,0,0,0.5)',
                borderRadius: '50%',
                p: 1,
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: 'rgba(0,0,0,0.7)',
                },
              }}
              onClick={() => document.getElementById('profile-photo-upload').click()}
            >
              <CloudUploadIcon sx={{ color: 'white', fontSize: '1.2rem' }} />
            </Box>
          )}
          <input
            id="profile-photo-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
        </Box>

        <Box sx={{ flex: 1 }}>
          <Stack direction="row" alignItems="center" spacing={1} mb={1}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {seller?.name}
            </Typography>
            {seller?.verified && (
              <VerifiedIcon sx={{ color: '#000000', fontSize: '1.2rem' }} />
            )}
          </Stack>

          {isEditing ? (
            <>
              <TextField
                fullWidth
                label="Tagline"
                value={profileData.tagline}
                onChange={handleChange('tagline')}
                size="small"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Business Name"
                value={profileData.businessName}
                onChange={handleChange('businessName')}
                size="small"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Address"
                value={profileData.address}
                onChange={handleChange('address')}
                size="small"
                multiline
                rows={2}
                sx={{ mb: 2 }}
              />
              <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button variant="contained" onClick={handleSave}>
                  Save Changes
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                {seller?.tagline || 'No tagline added yet'}
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                <StorefrontIcon sx={{ color: 'text.secondary', fontSize: '1.2rem' }} />
                <Typography variant="body2">
                  {seller?.businessDetails?.name || 'Business name not set'}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <LocationOnIcon sx={{ color: 'text.secondary', fontSize: '1.2rem' }} />
                <Typography variant="body2">
                  {seller?.businessDetails?.address || 'Address not set'}
                </Typography>
              </Stack>
            </>
          )}
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Rating value={seller?.rating || 0} precision={0.5} readOnly size="small" />
          <Typography variant="body2" color="text.secondary">
            ({seller?.reviews?.length || 0} reviews)
          </Typography>
        </Box>
        <Chip 
          label={`${seller?.products?.length || 0} Products`}
          size="small"
          sx={{ bgcolor: 'primary.light', color: 'primary.contrastText' }}
        />
        <Chip 
          label={`${seller?.sales || 0} Sales`}
          size="small"
          sx={{ bgcolor: 'success.light', color: 'success.contrastText' }}
        />
      </Box>
    </Paper>
  );
};

export default SellerProfileSection; 