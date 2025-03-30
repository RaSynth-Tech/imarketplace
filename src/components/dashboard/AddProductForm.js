import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stepper,
  Step,
  StepLabel,
  Box,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Typography,
  IconButton,
  Autocomplete,
  Checkbox,
  ListItemText,
} from '@mui/material';
import {
  Close as CloseIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  CloudUpload as CloudUploadIcon,
} from '@mui/icons-material';

const steps = ['Basic Information', 'Product Details'];

const defaultSpecifications = {
  'Material': 'Cotton',
  'Care Instructions': 'Machine wash cold',
  'Country of Origin': 'India',
  'Brand': 'Your Brand',
  'SKU': 'SKU-001',
  'Weight': '200g',
  'Dimensions': '10 x 10 x 1 cm',
};

const defaultColors = [
  { name: 'Black', color: '#000000' },
  { name: 'White', color: '#FFFFFF' },
  { name: 'Red', color: '#FF0000' },
];

const defaultSizes = ['S', 'M', 'L', 'XL'];

const AddProductForm = ({ open, onClose, onSubmit }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    // Basic Information
    title: '',
    category: '',
    subcategory: '',
    price: '',
    cost: '',
    sale: '',
    stock: '',
    discount: '',
    image: '',
    
    // Product Details
    colors: defaultColors,
    sizes: defaultSizes,
    specifications: defaultSpecifications,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  const handleChange = (field) => (event) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleSpecificationChange = (key) => (event) => {
    setFormData((prev) => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        [key]: event.target.value,
      },
    }));
  };

  const handleColorChange = (event, newValue) => {
    setFormData((prev) => ({
      ...prev,
      colors: newValue,
    }));
  };

  const handleSizeChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      sizes: event.target.value,
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData(prev => ({
          ...prev,
          image: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const renderBasicInformation = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Product Title"
          value={formData.title}
          onChange={handleChange('title')}
          required
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth required>
          <InputLabel>Category</InputLabel>
          <Select
            value={formData.category}
            label="Category"
            onChange={handleChange('category')}
          >
            <MenuItem value="Clothing">Clothing</MenuItem>
            <MenuItem value="Accessories">Accessories</MenuItem>
            <MenuItem value="Footwear">Footwear</MenuItem>
            <MenuItem value="Jewelry">Jewelry</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Subcategory"
          value={formData.subcategory}
          onChange={handleChange('subcategory')}
          required
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Price"
          type="number"
          value={formData.price}
          onChange={handleChange('price')}
          required
          InputProps={{
            startAdornment: '₹',
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Cost"
          type="number"
          value={formData.cost}
          onChange={handleChange('cost')}
          required
          InputProps={{
            startAdornment: '₹',
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Sale Price"
          type="number"
          value={formData.sale}
          onChange={handleChange('sale')}
          InputProps={{
            startAdornment: '₹',
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Discount (%)"
          type="number"
          value={formData.discount}
          onChange={handleChange('discount')}
          InputProps={{
            endAdornment: '%',
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Stock"
          type="number"
          value={formData.stock}
          onChange={handleChange('stock')}
          required
        />
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          gap: 2,
        }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
            Product Image
          </Typography>
          <Box
            sx={{
              width: '100%',
              height: 200,
              border: '2px dashed',
              borderColor: 'primary.main',
              borderRadius: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
              '&:hover': {
                borderColor: 'primary.dark',
                bgcolor: 'action.hover',
              },
            }}
            onClick={() => document.getElementById('image-upload').click()}
          >
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            ) : (
              <>
                <CloudUploadIcon sx={{ fontSize: 48, color: 'primary.main' }} />
                <Typography variant="body2" color="text.secondary">
                  Click to upload or drag and drop
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  PNG, JPG, GIF up to 10MB
                </Typography>
              </>
            )}
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: 0,
                cursor: 'pointer',
              }}
            />
          </Box>
          {imageFile && (
            <Typography variant="caption" color="text.secondary">
              {imageFile.name}
            </Typography>
          )}
        </Box>
      </Grid>
    </Grid>
  );

  const renderProductDetails = () => (
    <Grid container spacing={3}>
      {/* Colors Section */}
      <Grid item xs={12}>
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
          Available Colors
        </Typography>
        <Autocomplete
          multiple
          options={[
            { name: 'Black', color: '#000000' },
            { name: 'White', color: '#FFFFFF' },
            { name: 'Red', color: '#FF0000' },
            { name: 'Navy Blue', color: '#000080' },
            { name: 'Burgundy', color: '#800020' },
            { name: 'Pink', color: '#FFC0CB' },
            { name: 'Gold', color: '#FFD700' },
            { name: 'Purple', color: '#4B0082' },
            { name: 'Green', color: '#008000' },
            { name: 'Orange', color: '#FFA500' },
          ]}
          value={formData.colors}
          onChange={handleColorChange}
          getOptionLabel={(option) => option.name}
          renderOption={(props, option) => (
            <Box component="li" {...props}>
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  borderRadius: '4px',
                  backgroundColor: option.color,
                  border: '1px solid #e0e0e0',
                  mr: 1,
                }}
              />
              {option.name}
            </Box>
          )}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                {...getTagProps({ index })}
                key={option.color}
                label={option.name}
                avatar={
                  <Box
                    sx={{
                      width: 16,
                      height: 16,
                      borderRadius: '2px',
                      backgroundColor: option.color,
                      border: '1px solid #e0e0e0',
                    }}
                  />
                }
              />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              placeholder="Select colors"
              sx={{ '& .MuiOutlinedInput-root': { py: 0.5 } }}
            />
          )}
        />
      </Grid>

      {/* Sizes Section */}
      <Grid item xs={12}>
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
          Available Sizes
        </Typography>
        <FormControl fullWidth>
          <Select
            multiple
            value={formData.sizes}
            onChange={handleSizeChange}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} size="small" />
                ))}
              </Box>
            )}
          >
            {['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL', '5XL'].map((size) => (
              <MenuItem key={size} value={size}>
                <Checkbox checked={formData.sizes.indexOf(size) > -1} />
                <ListItemText primary={size} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {/* Specifications Section */}
      <Grid item xs={12}>
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
          Specifications
        </Typography>
        {Object.entries(formData.specifications).map(([key, value]) => (
          <TextField
            key={key}
            fullWidth
            label={key}
            value={value}
            onChange={handleSpecificationChange(key)}
            sx={{ mb: 2 }}
            size="small"
          />
        ))}
      </Grid>
    </Grid>
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          minHeight: '80vh',
        },
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        pb: 1,
      }}>
        <Typography variant="h6">Add New Product</Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === 0 ? renderBasicInformation() : renderProductDetails()}
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onClose}>Cancel</Button>
        {activeStep > 0 && (
          <Button onClick={handleBack}>Back</Button>
        )}
        {activeStep < steps.length - 1 ? (
          <Button variant="contained" onClick={handleNext}>
            Next
          </Button>
        ) : (
          <Button variant="contained" onClick={handleSubmit}>
            Add Product
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default AddProductForm; 