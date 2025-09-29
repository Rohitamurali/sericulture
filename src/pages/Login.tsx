import { Box, Typography, TextField, Button, Card } from '@mui/material';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/dashboard';

  const handleLogin = () => {
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userEmail', 'user@example.com');
    localStorage.setItem('userName', 'Sericulture User');
    navigate(redirect);
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        backgroundImage: `url('https://i.pinimg.com/1200x/dc/e2/82/dce2824326a864f5200a53e9a4d5c3d3.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2
      }}
    >
      <Card sx={{ p: 4, width: '100%', maxWidth: 420, backdropFilter: 'blur(6px)', backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ color: 'white', textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>Login</Typography>
        <TextField fullWidth label="Email" margin="normal" variant="filled" InputProps={{ style: { color: 'white' } }} InputLabelProps={{ style: { color: 'rgba(255,255,255,0.8)' }}} sx={{
          bgcolor: 'rgba(255,255,255,0.08)',
          borderRadius: 1
        }} />
        <TextField fullWidth label="Password" type="password" margin="normal" variant="filled" InputProps={{ style: { color: 'white' } }} InputLabelProps={{ style: { color: 'rgba(255,255,255,0.8)' }}} sx={{
          bgcolor: 'rgba(255,255,255,0.08)',
          borderRadius: 1
        }} />
        <Button fullWidth variant="contained" sx={{ mt: 2, py: 1.25, fontWeight: 'bold', background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)' }} onClick={handleLogin}>
          Login
        </Button>
        <Typography sx={{ mt: 2, color: 'white' }}>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </Typography>
      </Card>
    </Box>
  );
};

export default Login;
