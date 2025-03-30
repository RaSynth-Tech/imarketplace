import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  IconButton,
  Typography,
} from '@mui/material';
import { Close as CloseIcon, CloudUpload as CloudUploadIcon } from '@mui/icons-material';

const categories = {
  'Dresses': ['Summer Dresses', 'Evening Dresses', 'Casual Dresses', 'Formal Dresses'],
  'Accessories': ['Jewelry', 'Bags', 'Shoes', 'Belts', 'Scarves'],
  'Tops': ['Blouses', 'T-Shirts', 'Sweaters', 'Tank Tops'],
  'Bottoms': ['Jeans', 'Skirts', 'Shorts', 'Pants'],
  'Outerwear': ['Jackets', 'Coats', 'Blazers', 'Cardigans'],
};

const ProductFormDialog = ({ open, onClose, onSubmit, product }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    subcategory: '',
    image: null,
    imagePreview: '',
  });

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title,
        description: product.description,
        price: product.price,
        stock: product.stock,
        category: product.category,
        subcategory: product.subcategory,
        image: null,
        imagePreview: product.image,
      });
    } else {
      setFormData({
        title: '',
        description: '',
        price: '',
        stock: '',
        category: '',
        subcategory: '',
        image: null,
        imagePreview: '',
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file)
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {product ? 'Edit Product' : 'Add New Product'}
        <IconButton onClick={onClose} size="small">
          <CloseIcon sx={{ color: '#000' }} />
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Box sx={{ flex: 1 }}>
                <TextField
                  fullWidth
                  label="Product Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <TextField
                  fullWidth
                  label="Price (₹)"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </Box>
            </Box>

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

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Box sx={{ flex: 1 }}>
                <FormControl fullWidth required>
                  <InputLabel>Category</InputLabel>
                  <Select
                    name="category"
                    value={formData.category}
                    label="Category"
                    onChange={handleChange}
                  >
                    {Object.keys(categories).map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ flex: 1 }}>
                <FormControl fullWidth required>
                  <InputLabel>Subcategory</InputLabel>
                  <Select
                    name="subcategory"
                    value={formData.subcategory}
                    label="Subcategory"
                    onChange={handleChange}
                    disabled={!formData.category}
                  >
                    {formData.category &&
                      categories[formData.category].map((subcategory) => (
                        <MenuItem key={subcategory} value={subcategory}>
                          {subcategory}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Box sx={{ flex: 1 }}>
                <TextField
                  fullWidth
                  label="Stock"
                  name="stock"
                  type="number"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Box
                  sx={{
                    border: '2px dashed #e0e0e0',
                    borderRadius: 1,
                    p: 2,
                    textAlign: 'center',
                    cursor: 'pointer',
                    '&:hover': {
                      borderColor: '#000',
                    },
                  }}
                  onClick={() => document.getElementById('image-upload').click()}
                >
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                  />
                  {formData.imagePreview ? (
                    <Box sx={{ position: 'relative' }}>
                      <img
                        src={formData.imagePreview}
                        alt="Preview"
                        style={{
                          maxWidth: '100%',
                          maxHeight: '200px',
                          objectFit: 'contain',
                        }}
                      />
                      <IconButton
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          bgcolor: 'rgba(255,255,255,0.8)',
                          '&:hover': {
                            bgcolor: 'rgba(255,255,255,0.9)',
                          },
                        }}
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            image: null,
                            imagePreview: ''
                          }));
                        }}
                      >
                        <CloseIcon sx={{ color: '#000' }} />
                      </IconButton>
                    </Box>
                  ) : (
                    <>
                      <CloudUploadIcon sx={{ fontSize: 48, color: '#000', mb: 1 }} />
                      <Typography variant="body1" sx={{ color: '#000' }}>
                        Click to upload product image
                      </Typography>
                    </>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            type="submit"
            variant="contained"
            sx={{ bgcolor: '#000', '&:hover': { bgcolor: '#333' } }}
          >
            {product ? 'Update Product' : 'Add Product'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ProductFormDialog; 