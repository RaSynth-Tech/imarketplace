import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
  Box,
} from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';

const ConfirmationDialog = ({
  open,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  severity = 'warning',
}) => {
  const getSeverityColor = () => {
    switch (severity) {
      case 'error':
        return '#d32f2f';
      case 'warning':
        return '#ed6c02';
      case 'info':
        return '#0288d1';
      case 'success':
        return '#2e7d32';
      default:
        return '#ed6c02';
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="confirmation-dialog-title"
      aria-describedby="confirmation-dialog-description"
      PaperProps={{
        sx: {
          borderRadius: 2,
          minWidth: 400,
          maxWidth: 500,
        },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <WarningIcon sx={{ color: getSeverityColor() }} />
          <Typography variant="h6" component="span">
            {title}
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="confirmation-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button
          onClick={onCancel}
          variant="outlined"
          sx={{
            borderColor: 'rgba(0, 0, 0, 0.12)',
            color: 'text.primary',
            '&:hover': {
              borderColor: 'rgba(0, 0, 0, 0.24)',
            },
          }}
        >
          {cancelText}
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          sx={{
            bgcolor: getSeverityColor(),
            '&:hover': {
              bgcolor: getSeverityColor(),
              opacity: 0.9,
            },
          }}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog; 