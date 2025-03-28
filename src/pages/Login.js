import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Login from '../components/Login';

function LoginPage() {
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
    <Login 
      email={email}
      setEmail={setEmail}
      error={error}
      onSubmit={handleSubmit}
      onGoogleSuccess={handleGoogleSuccess}
      onGoogleError={handleGoogleError}
    />
  );
}

export default LoginPage; 