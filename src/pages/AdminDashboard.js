import React, { useState, useEffect } from 'react';
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
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  ShoppingBag as ShoppingBagIcon,
  AttachMoney as MoneyIcon,
  MoreVert as MoreVertIcon,
  Verified as VerifiedIcon,
  Warning as WarningIcon,
  Block as BlockIcon,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { products } from './Products';
import { sellers } from '../data/sellers';
import { users } from '../data/users';

function AdminDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const theme = useTheme();
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalSellers: 0,
    totalProducts: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    // Calculate statistics
    const totalUsers = users.length;
    const totalSellers = sellers.length;
    const totalProducts = products.length;
    const totalRevenue = products.reduce((sum, product) => sum + (product.price || 0), 0);

    setStats({
      totalUsers,
      totalSellers,
      totalProducts,
      totalRevenue,
    });
  }, []);

  // Get unique sellers from products with null checks
  const uniqueSellers = products
    .filter(product => product && product.sellerId)
    .reduce((acc, product) => {
      if (!acc.includes(product.sellerId)) {
        acc.push(product.sellerId);
      }
      return acc;
    }, []);

  // Get recent users with null checks
  const recentUsers = users
    .filter(user => user && user.id) // Filter out any undefined or null users
    .slice(-5)
    .map(user => ({
      ...user,
      id: user.id || 'N/A',
      name: user.name || 'Unknown User',
      email: user.email || 'No email',
      role: user.role || 'user',
      profilePhoto: user.profilePhoto || '',
    }));

  // Get recent sellers with null checks
  const recentSellers = sellers
    .filter(seller => seller && seller.id) // Filter out any undefined or null sellers
    .slice(-5)
    .map(seller => ({
      ...seller,
      id: seller.id || 'N/A',
      name: seller.name || 'Unknown Seller',
      businessDetails: seller.businessDetails || {
        name: 'Unknown Business',
        address: 'Not Available',
      },
      profilePhoto: seller.profilePhoto || '',
    }));

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

  const handleUserAction = (userId, action) => {
    // Implement user action logic
    console.log(`Performing ${action} on user ${userId}`);
  };

  const handleSellerAction = (sellerId, action) => {
    // Implement seller action logic
    console.log(`Performing ${action} on seller ${sellerId}`);
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

      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PeopleIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Total Users
                  </Typography>
                  <Typography variant="h4">{stats.totalUsers}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <VerifiedIcon sx={{ fontSize: 40, color: 'success.main', mr: 2 }} />
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Total Sellers
                  </Typography>
                  <Typography variant="h4">{stats.totalSellers}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ShoppingBagIcon sx={{ fontSize: 40, color: 'warning.main', mr: 2 }} />
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Total Products
                  </Typography>
                  <Typography variant="h4">{stats.totalProducts}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <MoneyIcon sx={{ fontSize: 40, color: 'info.main', mr: 2 }} />
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Total Revenue
                  </Typography>
                  <Typography variant="h4">₹{stats.totalRevenue.toLocaleString()}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Users */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Recent Users</Typography>
              <Button size="small">View All</Button>
            </Box>
            <List>
              {recentUsers.map((user, index) => (
                <React.Fragment key={user.id}>
                  <ListItem
                    secondaryAction={
                      <IconButton edge="end" size="small">
                        <MoreVertIcon />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar src={user.profilePhoto} alt={user.name}>
                        {user.name.charAt(0)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={user.name}
                      secondary={
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Typography variant="body2" color="text.secondary">
                            {user.email}
                          </Typography>
                          <Chip
                            label={user.role}
                            size="small"
                            color={user.role === 'admin' ? 'error' : user.role === 'seller' ? 'warning' : 'default'}
                          />
                        </Stack>
                      }
                    />
                  </ListItem>
                  {index < recentUsers.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Recent Sellers */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Recent Sellers</Typography>
              <Button size="small">View All</Button>
            </Box>
            <List>
              {recentSellers.map((seller, index) => (
                <React.Fragment key={seller.id}>
                  <ListItem
                    secondaryAction={
                      <IconButton edge="end" size="small">
                        <MoreVertIcon />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar src={seller.profilePhoto} alt={seller.name}>
                        {seller.name.charAt(0)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={seller.name}
                      secondary={
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Typography variant="body2" color="text.secondary">
                            {seller.businessDetails.name}
                          </Typography>
                          <Chip
                            label={seller.verified ? 'Verified' : 'Pending'}
                            size="small"
                            color={seller.verified ? 'success' : 'warning'}
                          />
                        </Stack>
                      }
                    />
                  </ListItem>
                  {index < recentSellers.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Sellers Table */}
        <Grid item xs={12}>
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
                      {uniqueSellers.filter(id => id === seller.id).length}
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
        </Grid>
      </Grid>

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
                        {uniqueSellers.filter(id => id === selectedSeller.id).length}
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