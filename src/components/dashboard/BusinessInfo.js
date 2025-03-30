import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  Button,
  Grid,
  Stack,
  Chip,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  useTheme,
} from '@mui/material';
import {
  Storefront as StorefrontIcon,
  Edit as EditIcon,
  LocationOn as LocationOnIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  AccessTime as AccessTimeIcon,
  Close as CloseIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
  Description as DescriptionIcon,
  LocalOffer as LocalOfferIcon,
  Payment as PaymentIcon,
  LocalShipping as ShippingIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const BusinessInfo = ({ user, onUpdate }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: user.businessDetails?.name || '',
    description: user.businessDetails?.description || '',
    address: user.businessDetails?.address || '',
    phone: user.businessDetails?.phone || '',
    businessHours: user.businessDetails?.businessHours || '',
    specialties: user.businessDetails?.specialties || [],
    paymentMethods: user.businessDetails?.paymentMethods || [],
    shipping: user.businessDetails?.shipping || '',
  });
  const [newSpecialty, setNewSpecialty] = useState('');

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({
      name: user.businessDetails?.name || '',
      description: user.businessDetails?.description || '',
      address: user.businessDetails?.address || '',
      phone: user.businessDetails?.phone || '',
      businessHours: user.businessDetails?.businessHours || '',
      specialties: user.businessDetails?.specialties || [],
      paymentMethods: user.businessDetails?.paymentMethods || [],
      shipping: user.businessDetails?.shipping || '',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddSpecialty = () => {
    if (newSpecialty.trim()) {
      setFormData({
        ...formData,
        specialties: [...formData.specialties, newSpecialty.trim()],
      });
      setNewSpecialty('');
    }
  };

  const handleRemoveSpecialty = (index) => {
    setFormData({
      ...formData,
      specialties: formData.specialties.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = () => {
    onUpdate?.(formData);
    handleCloseDialog();
  };

  return (
    <>
      <Paper 
        sx={{ 
          p: 3,
          background: isDarkMode 
            ? 'linear-gradient(to right, #1a1a1a, #2d2d2d)'
            : 'linear-gradient(to right, #ffffff, #f8f9fa)',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <StorefrontIcon sx={{ color: '#000', fontSize: 28 }} />
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 600,
                color: isDarkMode ? '#fff' : '#000',
              }}
            >
              {user.businessDetails?.name}
            </Typography>
          </Box>
          <Button
            variant="outlined"
            startIcon={<EditIcon sx={{ color: '#000' }} />}
            onClick={handleOpenDialog}
            sx={{
              borderColor: '#000',
              color: '#000',
              '&:hover': {
                borderColor: '#000',
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            Edit Profile
          </Button>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <DescriptionIcon sx={{ color: '#000', mt: 0.5 }} />
              <Typography variant="body1" color="text.secondary">
                {user.businessDetails?.description}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <LocationIcon sx={{ color: '#000' }} />
                <Typography variant="body1">
                  {user.businessDetails?.address}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <PhoneIcon sx={{ color: '#000' }} />
                <Typography variant="body1">
                  {user.businessDetails?.phone}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <TimeIcon sx={{ color: '#000' }} />
                <Typography variant="body1">
                  {user.businessDetails?.businessHours}
                </Typography>
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={2}>
              <Box>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 1 }}>
                  <LocalOfferIcon sx={{ color: '#000' }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Specialties
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {user.businessDetails?.specialties?.map((specialty, index) => (
                    <Chip
                      key={index}
                      label={specialty}
                      sx={{
                        backgroundColor: '#f5f5f5',
                        color: '#000',
                        border: '1px solid #e0e0e0',
                        '&:hover': {
                          backgroundColor: '#e0e0e0',
                        },
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Edit Business Information
            <IconButton onClick={handleCloseDialog}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Business Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={3}
              required
            />
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              label="Business Hours"
              name="businessHours"
              value={formData.businessHours}
              onChange={handleChange}
              required
            />
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Specialties
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                <TextField
                  size="small"
                  label="Add Specialty"
                  value={newSpecialty}
                  onChange={(e) => setNewSpecialty(e.target.value)}
                  sx={{ flexGrow: 1 }}
                />
                <Button
                  variant="contained"
                  onClick={handleAddSpecialty}
                  disabled={!newSpecialty.trim()}
                >
                  Add
                </Button>
              </Box>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {formData.specialties.map((specialty, index) => (
                  <Chip
                    key={index}
                    label={specialty}
                    onDelete={() => handleRemoveSpecialty(index)}
                    sx={{ m: 0.5 }}
                  />
                ))}
              </Box>
            </Box>
            <TextField
              fullWidth
              label="Payment Methods (comma-separated)"
              name="paymentMethods"
              value={formData.paymentMethods.join(', ')}
              onChange={(e) => {
                setFormData(prev => ({
                  ...prev,
                  paymentMethods: e.target.value.split(',').map(s => s.trim())
                }));
              }}
              required
            />
            <TextField
              fullWidth
              label="Shipping Information"
              name="shipping"
              value={formData.shipping}
              onChange={handleChange}
              required
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" sx={{ bgcolor: '#000', '&:hover': { bgcolor: '#333' } }}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BusinessInfo; 