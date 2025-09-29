import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Header = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    const check = () => setIsAuthenticated(localStorage.getItem('isAuthenticated') === 'true');
    check();
    window.addEventListener('storage', check);
    return () => window.removeEventListener('storage', check);
  }, []);

  // Also refresh auth status whenever the route changes (covers same-tab login)
  useEffect(() => {
    setIsAuthenticated(localStorage.getItem('isAuthenticated') === 'true');
  }, [location.pathname, location.search]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    setIsAuthenticated(false);
    navigate('/');
  };

  const go = (path: string, requireAuth: boolean) => {
    if (requireAuth && !isAuthenticated) {
      navigate(`/login?redirect=${encodeURIComponent(path)}`);
      return;
    }
    navigate(path);
  };

  return (
    <AppBar position="static" color="primary" sx={{ mb: 2 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Sericulture
        </Typography>

        <Button color="inherit" onClick={() => go('/', false)}>Home</Button>
        <Button color="inherit" onClick={() => go('/services', true)}>Design Services</Button>
        <Button color="inherit" onClick={() => go('/documents', true)}>Documents</Button>
        <Button color="inherit" onClick={() => go('/dashboard', true)}>Dashboard </Button>
        <Button color="inherit" onClick={() => go('/contact', true)}>Contact</Button>
        {isAuthenticated ? (
          <>
            <Button color="inherit" onClick={() => go('/account', true)}>Account</Button>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <>
            <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
            <Button color="inherit" onClick={() => navigate('/signup')}>Sign Up</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
