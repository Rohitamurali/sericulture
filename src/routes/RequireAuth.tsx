import { Navigate, useLocation } from 'react-router-dom';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = typeof window !== 'undefined' && localStorage.getItem('isAuthenticated') === 'true';
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }
  return children;
};

export default RequireAuth;



