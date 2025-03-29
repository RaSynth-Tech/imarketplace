import React from 'react';
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
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Inventory as InventoryIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const ProductsTable = ({ products, onAddProduct, onEditProduct, onDeleteProduct }) => {
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
          <InventoryIcon sx={{ color: 'primary.main' }} /> My Products
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
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
              <TableCell sx={{ fontWeight: 600 }}>Price</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Stock</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow 
                key={product.id}
                sx={{
                  '&:hover': {
                    bgcolor: 'rgba(0, 0, 0, 0.02)',
                  },
                }}
              >
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      component="img"
                      src={product.image}
                      alt={product.title}
                      sx={{
                        width: 50,
                        height: 50,
                        objectFit: 'cover',
                        borderRadius: 1,
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      }}
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
                      bgcolor: 'rgba(0, 0, 0, 0.05)',
                      fontWeight: 500,
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Typography sx={{ fontWeight: 600 }}>
                    ₹{product.price.toLocaleString('en-IN')}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip 
                    label="10" 
                    size="small" 
                    color="success"
                    sx={{ fontWeight: 500 }}
                  />
                </TableCell>
                <TableCell>
                  <IconButton 
                    onClick={() => onEditProduct(product.id)}
                    sx={{
                      color: 'primary.main',
                      '&:hover': {
                        bgcolor: 'rgba(0, 0, 0, 0.04)',
                      },
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    onClick={() => onDeleteProduct(product.id)}
                    sx={{
                      color: 'error.main',
                      '&:hover': {
                        bgcolor: 'rgba(0, 0, 0, 0.04)',
                      },
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ProductsTable; 