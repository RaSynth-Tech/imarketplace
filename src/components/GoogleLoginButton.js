import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { Box, Divider } from '@mui/material';

const GoogleLoginButton = ({ onSuccess, onError }) => {
  return (
    <Box sx={{ mt: 3 }}>
      <Divider sx={{ mb: 2 }}>OR</Divider>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <GoogleLogin
          onSuccess={onSuccess}
          onError={onError}
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
  );
};

export default GoogleLoginButton; 