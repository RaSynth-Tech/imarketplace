import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Paper,
  Divider,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { useAuth } from '../context/AuthContext';

function Login() {
  const navigate = useNavigate();
  const { login, googleLogin } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  // Reset form when component mounts
  useEffect(() => {
    setEmail('');
    setError('');
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors
    
    const trimmedEmail = email.trim().toLowerCase();
    
    if (trimmedEmail !== 'abc@gmail.com' && trimmedEmail !== 'cde@gmail.com') {
      setError('Please use abc@gmail.com for customer access or cde@gmail.com for seller access');
      return;
    }
    
    try {
      login(trimmedEmail);
      navigate('/');
    } catch (err) {
      setError('Failed to login. Please check your credentials.');
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      // Decode the JWT token to get user info
      const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${credentialResponse.credential}`);
      const data = await response.json();
      
      // Create a user object from Google data
      const googleUser = {
        name: data.name,
        email: data.email,
        picture: data.picture,
      };

      // Login with Google user data
      googleLogin(googleUser);
      navigate('/');
    } catch (err) {
      setError('Failed to login with Google. Please try again.');
    }
  };

  const handleGoogleError = () => {
    setError('Google login failed. Please try again.');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 12, mb: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Login
        </Typography>
        <Typography variant="body1" color="text.secondary" align="center" paragraph>
          For demo purposes, use:
          <br />
          abc@gmail.com for customer access
          <br />
          cde@gmail.com for seller access
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 3 }}
          >
            Login
          </Button>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Divider sx={{ mb: 2 }}>OR</Divider>
          <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              useOneTap
              theme="filled_blue"
              size="large"
              width="100%"
              text="continue_with"
              shape="rectangular"
              logo_alignment="left"
            />
          </GoogleOAuthProvider>
        </Box>
      </Paper>
    </Container>
  );
}

export default Login; 