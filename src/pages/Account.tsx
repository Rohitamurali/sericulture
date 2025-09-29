import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Button,
  Card,
  TextField,
  Snackbar,
  Alert,
  Stack,
  IconButton
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import Fade from '@mui/material/Fade';

// Styled Paper with floating effect
const FloatingPaper = styled(Card)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  overflow: 'hidden',
  boxShadow: theme.shadows[5],
  backgroundColor: 'rgba(30, 26, 27, 0.95)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)',
    zIndex: -1,
  },
}));

const Account: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSnackbar({
      open: true,
      message: 'Account updated successfully!',
      severity: 'success',
    });
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        backgroundImage: 'url(https://i.pinimg.com/originals/44/a3/90/44a39038a2420091fa89e697f996feae.gif)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="sm">
        <Fade in={mounted} timeout={1000}>
          <FloatingPaper>
            <Typography variant="h4" gutterBottom>
              My Account
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField label="Full Name" fullWidth required />
                <TextField label="Email" type="email" fullWidth required />
                <TextField
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  fullWidth
                  required
                  InputProps={{
                    endAdornment: (
                      <IconButton onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    ),
                  }}
                />
                <TextField
                  label="Confirm Password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  fullWidth
                  required
                  InputProps={{
                    endAdornment: (
                      <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    ),
                  }}
                />
                <Button type="submit" variant="contained" color="primary">
                  Update Account
                </Button>
              </Stack>
            </Box>
          </FloatingPaper>
        </Fade>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default Account;
