import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Avatar,
  Pagination,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Divider,
  Rating,
  Tooltip,
  Popover,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Autocomplete,
  Checkbox,
  ListItemText,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Inventory as InventoryIcon,
  ExpandMore as ExpandMoreIcon,
  Visibility as VisibilityIcon,
  TrendingUp as TrendingUpIcon,
  Star as StarIcon,
  Save as SaveIcon,
  ColorLens as ColorLensIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { sellers } from '../../data/sellers';

const ProductsTable = ({ products, onAddProduct, onEditProduct, onDeleteProduct }) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [expandedProduct, setExpandedProduct] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productColors, setProductColors] = useState({});
  const [productSpecs, setProductSpecs] = useState({});
  const [colorPickerAnchor, setColorPickerAnchor] = useState(null);
  const [selectedColorIndex, setSelectedColorIndex] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [showColorDialog, setShowColorDialog] = useState(false);
  const [newColor, setNewColor] = useState('#000000');
  const [editingColors, setEditingColors] = useState(null);
  const [editingSpecs, setEditingSpecs] = useState(null);
  const [productSizes, setProductSizes] = useState({});

  // Professional color palette
  const professionalColors = [
    '#1a237e', // Deep Blue
    '#2e7d32', // Forest Green
    '#c2185b', // Deep Pink
    '#455a64', // Slate Gray
    '#795548', // Brown
    '#1976d2', // Royal Blue
    '#388e3c', // Emerald
    '#7b1fa2', // Purple
    '#d84315', // Deep Orange
    '#263238', // Dark Blue Gray
  ];

  // Popular fashion colors for dresses
  const popularFashionColors = [
    '#000000', // Black
    '#FFFFFF', // White
    '#FF0000', // Red
    '#000080', // Navy Blue
    '#800020', // Burgundy
    '#FFC0CB', // Pink
    '#FFD700', // Gold
    '#4B0082', // Purple
    '#008000', // Green
    '#FFA500', // Orange
    '#A52A2A', // Brown
    '#808080', // Gray
    '#FF69B4', // Hot Pink
    '#4169E1', // Royal Blue
    '#8B4513', // Saddle Brown
  ];

  // Predefined color options with names
  const colorOptions = [
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
    { name: 'Brown', color: '#A52A2A' },
    { name: 'Gray', color: '#808080' },
    { name: 'Hot Pink', color: '#FF69B4' },
    { name: 'Royal Blue', color: '#4169E1' },
    { name: 'Saddle Brown', color: '#8B4513' },
  ];

  // Predefined sizes
  const sizeOptions = [
    'XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL', '5XL',
    '32', '34', '36', '38', '40', '42', '44', '46', '48',
    '2-3Y', '3-4Y', '4-5Y', '5-6Y', '6-7Y', '7-8Y', '8-9Y', '9-10Y', '10-12Y'
  ];

  const handleRowClick = (product) => {
    // Ensure we have a valid product object
    if (!product) return;

    // Find the seller data for this product with proper fallback
    const seller = sellers?.find(s => s?.id === product.sellerId) || {
      id: product.sellerId || 'unknown',
      name: 'Unknown Seller',
      profilePhoto: '',
      rating: 0,
      verified: false,
      businessDetails: {
        name: 'Unknown Business',
        address: 'Not Available',
        phone: 'Not Available',
        email: 'Not Available',
      }
    };
    
    // Create a complete product object with seller data
    const completeProduct = {
      ...product,
      seller: seller,
      // Ensure all required fields have fallback values
      image: product.image || '',
      title: product.title || 'Untitled Product',
      category: product.category || 'Uncategorized',
      subcategory: product.subcategory || 'No Subcategory',
      price: product.price || 0,
      cost: product.cost || 0,
      sale: product.sale || 0,
      stock: product.stock || 0,
      colors: product.colors || [],
      specifications: product.specifications || {},
      discount: product.discount || 0,
    };

    // Navigate with the complete product data
    navigate(`/products/${product.id}`, { state: { product: completeProduct } });
  };

  const handleEditClick = (e, productId) => {
    e.stopPropagation();
    const product = products.find(p => p.id === productId);
    setEditingProduct(product);
    setExpandedProduct(productId);
    onEditProduct(productId);
  };

  const handleDeleteClick = (e, productId) => {
    e.stopPropagation();
    onDeleteProduct(productId);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleColorPickerClick = (event, productId, colorIndex) => {
    event.stopPropagation();
    setColorPickerAnchor(event.currentTarget);
    setSelectedColorIndex(colorIndex);
    setSelectedProductId(productId);
  };

  const handleColorPickerClose = () => {
    setColorPickerAnchor(null);
    setSelectedColorIndex(null);
    setSelectedProductId(null);
  };

  const handleColorChange = (color) => {
    if (selectedProductId && selectedColorIndex !== null) {
      setProductColors(prev => ({
        ...prev,
        [selectedProductId]: prev[selectedProductId]?.map((c, i) => 
          i === selectedColorIndex ? color : c
        ) || []
      }));
    }
    handleColorPickerClose();
  };

  const handleAddNewColor = () => {
    if (selectedProductId) {
      setProductColors(prev => ({
        ...prev,
        [selectedProductId]: [...(prev[selectedProductId] || []), newColor]
      }));
    }
    setShowColorDialog(false);
  };

  const handleRemoveColor = (productId, index) => {
    setProductColors(prev => ({
      ...prev,
      [productId]: prev[productId]?.filter((_, i) => i !== index) || []
    }));
  };

  const handleSpecChange = (productId, key, value) => {
    setProductSpecs(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [key]: value
      }
    }));
  };

  const handleSaveChanges = (productId) => {
    // Here you would typically make an API call to save the changes
    setEditingProduct(null);
    setExpandedProduct(null);
  };

  const getStockStatus = (stock) => {
    if (stock > 20) return { text: 'In Stock', color: '#4caf50' };
    if (stock > 10) return { text: 'Low Stock', color: '#ff9800' };
    return { text: 'Out of Stock', color: '#f44336' };
  };

  // Calculate pagination
  const totalPages = Math.ceil(products.length / rowsPerPage);
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedProducts = products.slice(startIndex, endIndex);

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
          <InventoryIcon sx={{ 
            color: '#000000',
            opacity: 0.8,
            transition: 'all 0.3s ease',
            '&:hover': {
              opacity: 1,
              transform: 'scale(1.1)',
            },
          }} /> My Products
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon sx={{ opacity: 0.8, color: '#000000' }} />}
          onClick={onAddProduct}
          sx={{
            bgcolor: 'primary.main',
            '&:hover': {
              bgcolor: 'primary.dark',
            },
          }}
        >
          Add Product
        </Button>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Product</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Category</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Cost</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Sale</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Stock</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedProducts.map((product) => {
              const stockStatus = getStockStatus(product.stock);
              const isEditing = editingProduct === product.id;
              const colors = productColors[product.id] || product.colors || [];
              const specs = productSpecs[product.id] || product.specifications || {};

              return (
                <React.Fragment key={product.id}>
                  <TableRow
                    hover
                    sx={{
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                      },
                    }}
                    onClick={() => handleRowClick(product)}
                  >
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar
                          src={product.image}
                          alt={product.title}
                          sx={{ 
                            width: 50, 
                            height: 50,
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              transform: 'scale(1.05)',
                            },
                          }}
                          variant="rounded"
                        />
                        <Box>
                          <Typography sx={{ fontWeight: 500 }}>{product.title}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {product.subcategory}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={product.category} 
                        size="small" 
                        sx={{ 
                          bgcolor: 'primary.light',
                          color: 'primary.contrastText',
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ fontWeight: 600, color: '#666' }}>
                        ₹{(product.cost || product.price || 0).toLocaleString('en-IN')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography sx={{ fontWeight: 600, color: '#000' }}>
                          ₹{(product.sale || product.price || 0).toLocaleString('en-IN')}
                        </Typography>
                        {product.discount && (
                          <Chip
                            label={`${product.discount}% OFF`}
                            size="small"
                            sx={{
                              ml: 1,
                              bgcolor: '#000000',
                              color: '#ffffff',
                              '&:hover': {
                                bgcolor: '#000000',
                              },
                            }}
                          />
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Chip
                          label={`${stockStatus.text} (${product.stock})`}
                          size="small"
                          sx={{
                            bgcolor: `${stockStatus.color}15`,
                            color: stockStatus.color,
                            fontWeight: 500,
                            '&:hover': {
                              bgcolor: `${stockStatus.color}25`,
                            },
                          }}
                        />
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton 
                          onClick={(e) => handleEditClick(e, product.id)}
                          sx={{
                            color: '#000000',
                            opacity: 0.8,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              opacity: 1,
                              bgcolor: 'rgba(0, 0, 0, 0.04)',
                              transform: 'scale(1.1)',
                            },
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton 
                          onClick={(e) => handleDeleteClick(e, product.id)}
                          sx={{
                            color: '#000000',
                            opacity: 0.8,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              opacity: 1,
                              bgcolor: 'rgba(0, 0, 0, 0.04)',
                              transform: 'scale(1.1)',
                            },
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedProduct(expandedProduct === product.id ? null : product.id);
                          }}
                          sx={{
                            color: '#000000',
                            opacity: 0.8,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              opacity: 1,
                              bgcolor: 'rgba(0, 0, 0, 0.04)',
                              transform: 'scale(1.1)',
                            },
                          }}
                        >
                          <ExpandMoreIcon 
                            sx={{ 
                              transform: expandedProduct === product.id ? 'rotate(180deg)' : 'none',
                              transition: 'transform 0.3s ease',
                            }} 
                          />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={6} sx={{ py: 0, px: 0 }}>
                      <Accordion 
                        expanded={expandedProduct === product.id}
                        sx={{ 
                          boxShadow: 'none',
                          '&:before': { display: 'none' },
                          backgroundColor: 'rgba(0, 0, 0, 0.02)',
                          borderRadius: '8px',
                          overflow: 'hidden',
                          // border: '1px solid',
                          borderColor: 'divider',
                          width: '100%',
                          '&.Mui-expanded': {
                            margin: 0,
                            backgroundColor: 'white',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                          },
                        }}
                      >
                        <AccordionSummary sx={{ display: 'none' }} />
                        <AccordionDetails sx={{ p: 3 }}>
                          <Grid container spacing={3}>
                            {/* Product Information */}
                            <Grid item xs={12}>
                              <Box sx={{ 
                                display: 'flex', 
                                gap: 3,
                                p: 2,
                                bgcolor: 'white',
                                borderRadius: 1,
                                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                                border: '1px solid',
                                borderColor: 'divider',
                                mb: 2,
                              }}>
                                <Box sx={{ flex: 1 }}>
                                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                                    Product Details
                                  </Typography>
                                  <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                      <Box>
                                        <Typography variant="body2" color="text.secondary">
                                          Title
                                        </Typography>
                                        <Typography variant="body1">
                                          {product.title}
                                        </Typography>
                                      </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                      <Box>
                                        <Typography variant="body2" color="text.secondary">
                                          Category
                                        </Typography>
                                        <Typography variant="body1">
                                          {product.category} • {product.subcategory}
                                        </Typography>
                                      </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                      <Box>
                                        <Typography variant="body2" color="text.secondary">
                                          Price
                                        </Typography>
                                        <Typography variant="body1">
                                          ₹{(product.price || 0).toLocaleString('en-IN')}
                                        </Typography>
                                      </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                      <Box>
                                        <Typography variant="body2" color="text.secondary">
                                          Cost
                                        </Typography>
                                        <Typography variant="body1">
                                          ₹{(product.cost || 0).toLocaleString('en-IN')}
                                        </Typography>
                                      </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                      <Box>
                                        <Typography variant="body2" color="text.secondary">
                                          Sale Price
                                        </Typography>
                                        <Typography variant="body1">
                                          ₹{(product.sale || 0).toLocaleString('en-IN')}
                                        </Typography>
                                      </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                      <Box>
                                        <Typography variant="body2" color="text.secondary">
                                          Stock
                                        </Typography>
                                        <Typography variant="body1">
                                          {product.stock} units
                                        </Typography>
                                      </Box>
                                    </Grid>
                                  </Grid>
                                </Box>
                                <Box sx={{ 
                                  width: 200,
                                  height: 200,
                                  borderRadius: 1,
                                  overflow: 'hidden',
                                  border: '1px solid',
                                  borderColor: 'divider',
                                }}>
                                  <img 
                                    src={product.image} 
                                    alt={product.title}
                                    style={{
                                      width: '100%',
                                      height: '100%',
                                      objectFit: 'cover',
                                    }}
                                  />
                                </Box>
                              </Box>
                            </Grid>

                            {/* Product Metrics */}
                            <Grid item xs={12}>
                              <Box sx={{ 
                                display: 'flex', 
                                gap: 2, 
                                p: 2,
                                bgcolor: 'white',
                                borderRadius: 1,
                                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                                border: '1px solid',
                                borderColor: 'divider',
                                mb: 2,
                              }}>
                                <Box sx={{ 
                                  display: 'flex', 
                                  alignItems: 'center', 
                                  gap: 1.5,
                                  flex: 1,
                                  minWidth: 0,
                                }}>
                                  <VisibilityIcon sx={{ color: '#1a237e', fontSize: 24 }} />
                                  <Box sx={{ minWidth: 0 }}>
                                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                                      Clicks
                                    </Typography>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                                      1,234
                                    </Typography>
                                  </Box>
                                </Box>
                                <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                                <Box sx={{ 
                                  display: 'flex', 
                                  alignItems: 'center', 
                                  gap: 1.5,
                                  flex: 1,
                                  minWidth: 0,
                                }}>
                                  <TrendingUpIcon sx={{ color: '#2e7d32', fontSize: 24 }} />
                                  <Box sx={{ minWidth: 0 }}>
                                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                                      Conversion Rate
                                    </Typography>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                                      3.2%
                                    </Typography>
                                  </Box>
                                </Box>
                                <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                                <Box sx={{ 
                                  display: 'flex', 
                                  alignItems: 'center', 
                                  gap: 1.5,
                                  flex: 1,
                                  minWidth: 0,
                                }}>
                                  <StarIcon sx={{ color: '#f57c00', fontSize: 24 }} />
                                  <Box sx={{ minWidth: 0 }}>
                                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                                      Rating
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                      <Rating 
                                        value={4.5} 
                                        precision={0.5} 
                                        readOnly 
                                        size="small"
                                        sx={{ 
                                          fontSize: '1rem',
                                          '& .MuiRating-icon': {
                                            fontSize: '1rem',
                                          }
                                        }} 
                                      />
                                      <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                                        4.5
                                      </Typography>
                                    </Box>
                                  </Box>
                                </Box>
                              </Box>
                            </Grid>

                            {/* Colors Section */}
                            <Grid item xs={12} md={6}>
                              <Box sx={{ 
                                p: 2,
                                bgcolor: 'white',
                                borderRadius: 1,
                                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                                border: '1px solid',
                                borderColor: 'divider',
                              }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                    Available Colors
                                  </Typography>
                                  {!isEditing && (
                                    <IconButton
                                      size="small"
                                      onClick={() => setEditingColors(product.id)}
                                      sx={{ color: '#000000' }}
                                    >
                                      <EditIcon />
                                    </IconButton>
                                  )}
                                </Box>
                                {editingColors === product.id ? (
                                  <>
                                    <Autocomplete
                                      multiple
                                      options={colorOptions}
                                      value={colors.map(color => colorOptions.find(opt => opt.color === color) || { name: color, color })}
                                      onChange={(event, newValue) => {
                                        setProductColors(prev => ({
                                          ...prev,
                                          [product.id]: newValue.map(option => option.color)
                                        }));
                                      }}
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
                                    <Box sx={{ mt: 2, display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                                      <Button
                                        size="small"
                                        onClick={() => setEditingColors(null)}
                                      >
                                        Cancel
                                      </Button>
                                      <Button
                                        size="small"
                                        variant="contained"
                                        onClick={() => setEditingColors(null)}
                                      >
                                        Save
                                      </Button>
                                    </Box>
                                  </>
                                ) : (
                                  <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', p: 1 }}>
                                    {colors.map((color, index) => (
                                      <Chip
                                        key={index}
                                        label={colorOptions.find(opt => opt.color === color)?.name || color}
                                        avatar={
                                          <Box
                                            sx={{
                                              width: 16,
                                              height: 16,
                                              borderRadius: '2px',
                                              backgroundColor: color,
                                              border: '1px solid #e0e0e0',
                                            }}
                                          />
                                        }
                                        size="small"
                                        sx={{
                                          bgcolor: 'transparent',
                                          border: '1px solid #e0e0e0',
                                          px: 2,
                                          py: 1,
                                          '&:hover': {
                                            bgcolor: 'transparent',
                                          },
                                        }}
                                      />
                                    ))}
                                  </Box>
                                )}
                              </Box>

                              {/* Available Sizes */}
                              <Box sx={{ 
                                p: 2,
                                bgcolor: 'white',
                                borderRadius: 1,
                                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                                border: '1px solid',
                                borderColor: 'divider',
                                mt: 2,
                              }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                    Available Sizes
                                  </Typography>
                                  {!isEditing && (
                                    <IconButton
                                      size="small"
                                      onClick={() => setEditingColors(product.id)}
                                      sx={{ color: '#000000' }}
                                    >
                                      <EditIcon />
                                    </IconButton>
                                  )}
                                </Box>
                                {editingColors === product.id ? (
                                  <>
                                    <FormControl fullWidth size="small">
                                      <Select
                                        multiple
                                        value={productSizes[product.id] || []}
                                        onChange={(e) => {
                                          setProductSizes(prev => ({
                                            ...prev,
                                            [product.id]: e.target.value
                                          }));
                                        }}
                                        renderValue={(selected) => (
                                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => (
                                              <Chip key={value} label={value} size="small" />
                                            ))}
                                          </Box>
                                        )}
                                      >
                                        {sizeOptions.map((size) => (
                                          <MenuItem key={size} value={size}>
                                            <Checkbox checked={productSizes[product.id]?.indexOf(size) > -1} />
                                            <ListItemText primary={size} />
                                          </MenuItem>
                                        ))}
                                      </Select>
                                    </FormControl>
                                    <Box sx={{ mt: 2, display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                                      <Button
                                        size="small"
                                        onClick={() => setEditingColors(null)}
                                      >
                                        Cancel
                                      </Button>
                                      <Button
                                        size="small"
                                        variant="contained"
                                        onClick={() => setEditingColors(null)}
                                      >
                                        Save
                                      </Button>
                                    </Box>
                                  </>
                                ) : (
                                  <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', p: 1 }}>
                                    {(productSizes[product.id] || []).map((size) => (
                                      <Chip
                                        key={size}
                                        label={size}
                                        size="small"
                                        sx={{
                                          bgcolor: 'transparent',
                                          border: '1px solid #e0e0e0',
                                          px: 2,
                                          py: 1,
                                          '&:hover': {
                                            bgcolor: 'transparent',
                                          },
                                        }}
                                      />
                                    ))}
                                  </Box>
                                )}
                              </Box>
                            </Grid>

                            {/* Specifications Section */}
                            <Grid item xs={12} md={6}>
                              <Box sx={{ 
                                p: 2,
                                bgcolor: 'white',
                                borderRadius: 1,
                                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                                border: '1px solid',
                                borderColor: 'divider',
                              }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                    Specifications
                                  </Typography>
                                  {!isEditing && (
                                    <IconButton
                                      size="small"
                                      onClick={() => setEditingSpecs(product.id)}
                                      sx={{ color: '#000000' }}
                                    >
                                      <EditIcon />
                                    </IconButton>
                                  )}
                                </Box>
                                {editingSpecs === product.id ? (
                                  <>
                                    {Object.entries(specs).map(([key, value]) => (
                                      <TextField
                                        key={key}
                                        fullWidth
                                        label={key}
                                        value={value}
                                        onChange={(e) => handleSpecChange(product.id, key, e.target.value)}
                                        sx={{ mb: 1 }}
                                        size="small"
                                      />
                                    ))}
                                    <Box sx={{ mt: 2, display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                                      <Button
                                        size="small"
                                        onClick={() => setEditingSpecs(null)}
                                      >
                                        Cancel
                                      </Button>
                                      <Button
                                        size="small"
                                        variant="contained"
                                        onClick={() => setEditingSpecs(null)}
                                      >
                                        Save
                                      </Button>
                                    </Box>
                                  </>
                                ) : (
                                  <Box sx={{ p: 1 }}>
                                    {Object.entries(specs).map(([key, value]) => (
                                      <Box key={key} sx={{ mb: 1.5 }}>
                                        <Typography variant="body2" component="span" sx={{ fontWeight: 500 }}>
                                          {key}:
                                        </Typography>
                                        <Typography variant="body2" component="span" sx={{ ml: 1 }}>
                                          {value}
                                        </Typography>
                                      </Box>
                                    ))}
                                  </Box>
                                )}
                              </Box>
                            </Grid>
                          </Grid>
                        </AccordionDetails>
                      </Accordion>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mt: 3,
        px: 2,
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Showing {startIndex + 1} to {Math.min(endIndex, products.length)} of {products.length} entries
          </Typography>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Rows per page</InputLabel>
            <Select
              value={rowsPerPage}
              label="Rows per page"
              onChange={handleRowsPerPageChange}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={25}>25</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Stack spacing={2}>
          <Pagination 
            count={totalPages} 
            page={page} 
            onChange={handlePageChange}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
          />
        </Stack>
      </Box>

      {/* Color Picker Popover */}
      <Popover
        open={Boolean(colorPickerAnchor)}
        anchorEl={colorPickerAnchor}
        onClose={handleColorPickerClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Box sx={{ p: 2, width: 200 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>Select Color</Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {popularFashionColors.map((color, index) => (
              <Box
                key={index}
                onClick={() => handleColorChange(color)}
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  backgroundColor: color,
                  border: '1px solid #e0e0e0',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.1)',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                  },
                }}
              />
            ))}
          </Box>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              type="color"
              value={newColor}
              onChange={(e) => setNewColor(e.target.value)}
              sx={{ mb: 1 }}
            />
            <Button
              fullWidth
              variant="contained"
              onClick={() => handleColorChange(newColor)}
            >
              Use Custom Color
            </Button>
          </Box>
        </Box>
      </Popover>

      {/* Add Color Dialog */}
      <Dialog open={showColorDialog} onClose={() => setShowColorDialog(false)}>
        <DialogTitle>Add New Color</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              type="color"
              value={newColor}
              onChange={(e) => setNewColor(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Typography variant="body2" color="text.secondary">
              Or select from popular colors:
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
              {popularFashionColors.map((color, index) => (
                <Box
                  key={index}
                  onClick={() => setNewColor(color)}
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    backgroundColor: color,
                    border: '1px solid #e0e0e0',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.1)',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    },
                  }}
                />
              ))}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowColorDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddNewColor}>
            Add Color
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default ProductsTable; 