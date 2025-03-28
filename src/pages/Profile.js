import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Button,
  TextField,
  Divider,
  useTheme,
  IconButton,
} from '@mui/material';
import {
  Edit as EditIcon,
  PhotoCamera as PhotoCameraIcon,
  Store as StoreIcon,
  AttachMoney as MoneyIcon,
  Inventory as InventoryIcon,
  Star as StarIcon,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

function Profile() {
  const { user } = useAuth();
  const theme = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.businessDetails?.phone || '',
    address: user?.businessDetails?.address || '',
    description: user?.businessDetails?.description || '',
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // In a real app, make an API call to update the profile
    setIsEditing(false);
  };

  const handleCancel = () => {
    setProfileData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.businessDetails?.phone || '',
      address: user?.businessDetails?.address || '',
      description: user?.businessDetails?.description || '',
    });
    setIsEditing(false);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 12, mb: 8 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Box sx={{ position: 'relative', display: 'inline-block' }}>
                <Avatar
                  src={user?.profilePhoto}
                  sx={{
                    width: 150,
                    height: 150,
                    mx: 'auto',
                    mb: 2,
                  }}
                />
                {isEditing && (
                  <IconButton
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      bgcolor: 'background.paper',
                      '&:hover': {
                        bgcolor: 'background.paper',
                      },
                    }}
                  >
                    <PhotoCameraIcon />
                  </IconButton>
                )}
              </Box>
              <Typography variant="h5" gutterBottom>
                {user?.name}
              </Typography>
              <Typography color="text.secondary" gutterBottom>
                {user?.email}
              </Typography>
              {user?.role === 'seller' && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" color="primary">
                    Seller Account
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5">Profile Information</Typography>
                {!isEditing ? (
                  <Button
                    startIcon={<EditIcon />}
                    onClick={handleEdit}
                  >
                    Edit Profile
                  </Button>
                ) : (
                  <Box>
                    <Button
                      variant="outlined"
                      onClick={handleCancel}
                      sx={{ mr: 1 }}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handleSave}
                    >
                      Save Changes
                    </Button>
                  </Box>
                )}
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Name"
                    value={profileData.name}
                    disabled={!isEditing}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    value={profileData.email}
                    disabled
                  />
                </Grid>
                {user?.role === 'seller' && (
                  <>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Phone"
                        value={profileData.phone}
                        disabled={!isEditing}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Business Address"
                        value={profileData.address}
                        disabled={!isEditing}
                        onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Business Description"
                        multiline
                        rows={4}
                        value={profileData.description}
                        disabled={!isEditing}
                        onChange={(e) => setProfileData({ ...profileData, description: e.target.value })}
                      />
                    </Grid>
                  </>
                )}
              </Grid>
            </CardContent>
          </Card>
          {user?.role === 'seller' && (
            <Card sx={{ mt: 3 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Business Insights
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Box sx={{ textAlign: 'center' }}>
                      <StoreIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                      <Typography variant="h6">
                        {user?.businessDetails?.totalProducts || 0}
                      </Typography>
                      <Typography color="text.secondary">
                        Total Products
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Box sx={{ textAlign: 'center' }}>
                      <MoneyIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                      <Typography variant="h6">
                        ₹{(user?.businessDetails?.totalSales || 0).toLocaleString('en-IN')}
                      </Typography>
                      <Typography color="text.secondary">
                        Total Sales
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Box sx={{ textAlign: 'center' }}>
                      <StarIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                      <Typography variant="h6">
                        {user?.businessDetails?.rating || 0}
                      </Typography>
                      <Typography color="text.secondary">
                        Rating
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Box sx={{ textAlign: 'center' }}>
                      <InventoryIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                      <Typography variant="h6">
                        {user?.businessDetails?.established || 'N/A'}
                      </Typography>
                      <Typography color="text.secondary">
                        Established
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default Profile; 