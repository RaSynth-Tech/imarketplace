import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Paper,
  Grid,
  Avatar,
  Rating,
  Button,
  Stack,
  IconButton,
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import { useAuth } from '../context/AuthContext';
import { products } from './Products';

function AdminDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const theme = useTheme();
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Get unique sellers from products
  const sellers = Array.from(
    new Map(products.map(product => [product.seller.id, product.seller])).values()
  );

  const handleViewSeller = (seller) => {
    setSelectedSeller(seller);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedSeller(null);
  };

  const handleViewSellerDashboard = (sellerId) => {
    navigate(`/admin/seller/${sellerId}/dashboard`);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Admin Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Manage sellers and monitor platform activity
        </Typography>
      </Box>

      {/* Sellers Table */}
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Seller</TableCell>
              <TableCell>Business</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Products</TableCell>
              <TableCell>Total Sales</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sellers.map((seller) => (
              <TableRow key={seller.id}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar src={seller.profilePhoto} />
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {seller.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {seller.email}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {seller.businessDetails?.name || 'N/A'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {seller.businessDetails?.address || 'N/A'}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Rating value={seller.rating} readOnly size="small" />
                    <Typography variant="body2">
                      ({seller.rating})
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  {seller.businessDetails?.totalProducts || 0}
                </TableCell>
                <TableCell>
                  ₹{seller.businessDetails?.totalSales?.toLocaleString('en-IN') || 0}
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleViewSeller(seller)}
                    >
                      View Details
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleViewSellerDashboard(seller.id)}
                    >
                      Dashboard
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Seller Details Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        {selectedSeller && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar
                  src={selectedSeller.profilePhoto}
                  sx={{ width: 64, height: 64 }}
                />
                <Box>
                  <Typography variant="h6">
                    {selectedSeller.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedSeller.email}
                  </Typography>
                </Box>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={3} sx={{ mt: 1 }}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    Business Information
                  </Typography>
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Business Name
                      </Typography>
                      <Typography>
                        {selectedSeller.businessDetails?.name || 'N/A'}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Description
                      </Typography>
                      <Typography>
                        {selectedSeller.businessDetails?.description || 'N/A'}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Address
                      </Typography>
                      <Typography>
                        {selectedSeller.businessDetails?.address || 'N/A'}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Phone
                      </Typography>
                      <Typography>
                        {selectedSeller.businessDetails?.phone || 'N/A'}
                      </Typography>
                    </Box>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    Performance Metrics
                  </Typography>
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Rating
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Rating value={selectedSeller.rating} readOnly size="small" />
                        <Typography>
                          ({selectedSeller.rating})
                        </Typography>
                      </Box>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Total Products
                      </Typography>
                      <Typography>
                        {selectedSeller.businessDetails?.totalProducts || 0}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Total Sales
                      </Typography>
                      <Typography>
                        ₹{selectedSeller.businessDetails?.totalSales?.toLocaleString('en-IN') || 0}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Established
                      </Typography>
                      <Typography>
                        {selectedSeller.businessDetails?.established || 'N/A'}
                      </Typography>
                    </Box>
                  </Stack>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Close</Button>
              <Button
                variant="contained"
                onClick={() => {
                  handleCloseDialog();
                  handleViewSellerDashboard(selectedSeller.id);
                }}
              >
                View Dashboard
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
}

export default AdminDashboard; 