import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CartProvider } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingHomeButton from './components/FloatingHomeButton';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Payment from './components/Payment';
import SellerRegistration from './components/SellerRegistration';
import ProductDetails from './pages/ProductDetails';
import LoginPage from './pages/Login';
import Register from './components/Register';
import SellerDashboard from './pages/SellerDashboard';
import Box from '@mui/material/Box';
import Profile from './pages/Profile';

// Initialize Stripe
const stripePromise = loadStripe('your_publishable_key');

// Protected Route component
function ProtectedRoute({ children, requireSeller = false }) {
  const { isAuthenticated, isSeller, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requireSeller && !isSeller) {
    return <Navigate to="/" />;
  }

  return children;
}

function AppContent() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();
  const hideFooterPaths = ['/login', '/register'];
  const shouldShowFooter = !hideFooterPaths.includes(location.pathname);

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
      background: {
        default: isDarkMode ? '#121212' : '#f5f5f5',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 8,
            '&.MuiButton-contained': {
              backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : '#000',
              color: isDarkMode ? '#fff' : '#fff',
              '&:hover': {
                backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : '#333',
              },
            },
            '&.MuiButton-outlined': {
              borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.3)' : '#000',
              color: isDarkMode ? '#fff' : '#000',
              '&:hover': {
                borderColor: isDarkMode ? '#fff' : '#000',
                backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
              },
            },
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CartProvider>
        <Elements stripe={stripePromise}>
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar isDarkMode={isDarkMode} toggleTheme={() => setIsDarkMode(!isDarkMode)} />
            <Box sx={{ flex: 1, mt: 8 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/seller/register"
                  element={
                    <ProtectedRoute>
                      <SellerRegistration />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/seller/dashboard"
                  element={
                    <ProtectedRoute requireSeller>
                      <SellerDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </Box>
            {shouldShowFooter && <Footer />}
            <FloatingHomeButton />
          </Box>
        </Elements>
      </CartProvider>
    </ThemeProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App; 