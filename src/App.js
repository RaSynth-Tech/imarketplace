import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CartProvider } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingHomeButton from './components/common/FloatingHomeButton';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Payment from './components/Payment';
import SellerRegistration from './components/SellerRegistration';
import ProductDetails from './pages/ProductDetails';
import Login from './components/Login';
import Register from './components/Register';
import Box from '@mui/material/Box';
import Profile from './pages/Profile';
import SellerProfile from './pages/SellerProfile';
import Wishlist from './pages/Wishlist';
import AdminDashboard from './pages/AdminDashboard';
import AdminSellerDashboard from './pages/AdminSellerDashboard';
import SellerDashboard from './pages/SellerDashboard';
import About from './pages/About';
import { lightTheme, darkTheme, getSystemTheme } from './theme/theme';

// Initialize Stripe
const stripePromise = loadStripe('your_publishable_key');

// Create a theme context
export const ThemeContext = React.createContext({
  mode: 'system',
  toggleColorMode: () => {},
  setMode: () => {},
});

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
  // Get stored theme preference from localStorage, default to system
  const [mode, setMode] = useState(() => {
    const storedMode = localStorage.getItem('themeMode');
    return storedMode || 'system';
  });
  
  // Determine current theme based on mode
  const [theme, setTheme] = useState(() => {
    const storedMode = localStorage.getItem('themeMode');
    if (storedMode === 'light') return lightTheme;
    if (storedMode === 'dark') return darkTheme;
    return getSystemTheme();
  });
  
  // Effect to update theme when system preference changes
  useEffect(() => {
    if (mode === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      const handleChange = () => {
        setTheme(mediaQuery.matches ? darkTheme : lightTheme);
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [mode]);
  
  // Effect to update localStorage when mode changes
  useEffect(() => {
    localStorage.setItem('themeMode', mode);
    
    if (mode === 'light') setTheme(lightTheme);
    else if (mode === 'dark') setTheme(darkTheme);
    else setTheme(getSystemTheme());
  }, [mode]);

  // Toggle between light and dark mode
  const toggleColorMode = () => {
    setMode(prevMode => {
      if (prevMode === 'light') return 'dark';
      if (prevMode === 'dark') return 'system';
      return 'light';
    });
  };

  const location = useLocation();
  const hideFooterPaths = ['/login', '/register'];
  const shouldShowFooter = !hideFooterPaths.includes(location.pathname);

  return (
    <ThemeContext.Provider value={{ mode, toggleColorMode, setMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <CartProvider>
          <WishlistProvider>
            <Elements stripe={stripePromise}>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                minHeight: '100vh',
                background: theme.palette.background.default,
                transition: 'all 0.3s ease'
              }}>
                <Navbar />
                <Box sx={{ flex: 1, mt: 8 }}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/:id" element={<ProductDetails />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/payment" element={<Payment />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/wishlist/:id" element={<Wishlist />} />
                    <Route
                      path="/seller/register"
                      element={
                        <ProtectedRoute>
                          <SellerRegistration />
                        </ProtectedRoute>
                      }
                    />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/seller/:sellerId" element={<SellerProfile />} />
                    <Route path="/dashboard" element={<SellerDashboard />} />
                    <Route path="/my-products" element={<Products />} />
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/admin/seller/:sellerId/dashboard" element={<AdminSellerDashboard />} />
                  </Routes>
                </Box>
                {shouldShowFooter && <Footer />}
                <FloatingHomeButton />
              </Box>
            </Elements>
          </WishlistProvider>
        </CartProvider>
      </ThemeProvider>
    </ThemeContext.Provider>
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