
import { Box, Button, Typography, Container, Card, CardContent, Chip, Stack, Fade, Zoom, Slide } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { 
  Dashboard as DashboardIcon, 
  CloudQueue as CloudIcon, 
  Devices as DevicesIcon,
  Analytics as AnalyticsIcon,
  BugReport as SilkwormIcon,
  Login as LoginIcon
} from '@mui/icons-material';
import { styled, keyframes } from '@mui/material/styles';
import { useState, useEffect } from 'react';

// 3D Animation Keyframes
const float = keyframes`
  0%, 100% { transform: translateY(0px) rotateY(0deg); }
  50% { transform: translateY(-20px) rotateY(5deg); }
`;

const rotate3D = keyframes`
  0% { transform: rotateY(0deg) rotateX(0deg); }
  25% { transform: rotateY(90deg) rotateX(5deg); }
  50% { transform: rotateY(180deg) rotateX(0deg); }
  75% { transform: rotateY(270deg) rotateX(-5deg); }
  100% { transform: rotateY(360deg) rotateX(0deg); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

// 3D Styled Components
const FloatingCard = styled(Card)(() => ({
  background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
  borderRadius: '20px',
  boxShadow: `
    20px 20px 60px #bebebe,
    -20px -20px 60px #ffffff,
    inset 0 0 0 1px rgba(255, 255, 255, 0.2)
  `,
  transform: 'perspective(1000px) rotateX(5deg) rotateY(-5deg)',
  transition: 'all 0.3s ease',
  animation: `${float} 6s ease-in-out infinite`,
  '&:hover': {
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1.05)',
    boxShadow: `
      30px 30px 80px #bebebe,
      -30px -30px 80px #ffffff,
      inset 0 0 0 1px rgba(255, 255, 255, 0.3)
    `,
  },
}));

const RotatingIcon = styled(Box)(() => ({
  animation: `${rotate3D} 8s linear infinite`,
  transformStyle: 'preserve-3d',
}));

const PulsingButton = styled(Button)(() => ({
  animation: `${pulse} 2s ease-in-out infinite`,
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  borderRadius: '25px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    background: 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.2)',
  },
}));

const Home = () => {
  const navigate = useNavigate();
  const isAuthed = typeof window !== 'undefined' && localStorage.getItem('isAuthenticated') === 'true';
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const features = [
    {
      icon: <DashboardIcon sx={{ fontSize: 40, color: '#FF6B8B' }} />,
      title: 'Real-time Monitoring',
      description: 'Live temperature and humidity tracking'
    },
    {
      icon: <AnalyticsIcon sx={{ fontSize: 40, color: '#4ECDC4' }} />,
      title: 'Stage-Based Range',
      description: 'shows the ideal temperature and humidity for each silkworm growth stage '
    },
    {
      icon: <DevicesIcon sx={{ fontSize: 40, color: '#45B7D1' }} />,
      title: 'Device Control',
      description: 'Remote fan and light control'
    },
    {
      icon: <CloudIcon sx={{ fontSize: 40, color: '#4ECDC4' }} />,
      title: 'Cloud Integration',
      description: 'Secure MQTT data transmission'
    },
  ];

  return (
    <Box
  sx={{
    minHeight: '100vh',
    position: 'relative',
    overflow: 'hidden',
    backgroundImage: `url('https://i.pinimg.com/1200x/dc/e2/82/dce2824326a864f5200a53e9a4d5c3d3.jpg')`, // <-- paste your image link here
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }}
>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Hero Section */}
        <Fade in={mounted} timeout={1000}>
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Slide direction="down" in={mounted} timeout={800}>
              <Typography 
                variant="h1" 
                sx={{ 
                  fontWeight: 'bold', 
                  color: 'white',
                  textShadow: '0 4px 20px rgba(0,0,0,0.3)',
                  mb: 2,
                  fontSize: { xs: '3rem', md: '4rem' }
                }}
              >
                SERICULTURE
              </Typography>
            </Slide>
            
            <Slide direction="up" in={mounted} timeout={1000}>
              <Typography 
                variant="h4" 
                sx={{ 
                  color: '#FFD700',
                  mb: 4,
                  textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                  fontSize: { xs: '1.5rem', md: '2rem' }
                }}
              >
                Smart Silkworm Monitoring
              </Typography>
            </Slide>

            <Slide direction="up" in={mounted} timeout={1200}>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: 'rgba(255,255,255,0.9)',
                  mb: 6,
                  maxWidth: '600px',
                  mx: 'auto',
                  textShadow: '0 1px 5px rgba(0,0,0,0.3)'
                }}
              >
                Track temperature, humidity, and cocoon health in real time.
              </Typography>
            </Slide>

            {/* 3D Main Card */}
<Zoom in={mounted} timeout={1500}>
  <FloatingCard 
    sx={{ 
      maxWidth: 400, 
      mx: 'auto', 
      mb: 6,
      backgroundImage: `url('https://in.pinterest.com/pin/29062360067171709/')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      color: 'white', 
    }}
  >
    <CardContent sx={{ p: 4, textAlign: 'center', backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: 2 }}>
      <RotatingIcon sx={{ mb: 3 }}>
        <SilkwormIcon sx={{ fontSize: 80, color: '#FFD700' }} />
      </RotatingIcon>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
        Sericulture
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Monitoring 

      </Typography>
      <Chip 
        label="Live Data" 
        color="success" 
        sx={{ 
          fontSize: '1rem', 
          py: 2, 
          px: 1,
          animation: `${pulse} 2s ease-in-out infinite`
        }} 
      />
    </CardContent>
  </FloatingCard>
</Zoom>


            {/* Action Buttons */}
            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              spacing={3} 
              justifyContent="center"
              sx={{ mb: 8 }}
            >
              <Fade in={mounted} timeout={1800}>
                <PulsingButton
                  variant="contained"
                  size="large"
                  startIcon={<DashboardIcon />}
                  onClick={() => {
                    if (isAuthed) {
                      navigate('/dashboard');
                    } else {
                      navigate('/login?redirect=%2Fdashboard');
                    }
                  }}
                  sx={{ 
                    px: 4, 
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 'bold'
                  }}
                >
                  Go to Dashboard
                </PulsingButton>
              </Fade>
              
              <Fade in={mounted} timeout={2000}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<LoginIcon />}
                    onClick={() => navigate('/login')}
                    sx={{ 
                      px: 4, 
                      py: 1.5,
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      borderColor: 'white',
                      color: 'white',
                      '&:hover': {
                        borderColor: '#FFD700',
                        color: '#FFD700',
                        bgcolor: 'rgba(255, 255, 255, 0.1)'
                      }
                    }}
                  >
                    Sign In
                  </Button>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate('/signup')}
                    sx={{
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      fontWeight: 'bold'
                    }}
                  >
                    Sign Up
                  </Button>
                </Stack>
              </Fade>
            </Stack>
          </Box>
        </Fade>

        {/* Features Section */}
        <Fade in={mounted} timeout={2200}>
          <Box sx={{ py: 8 }}>
            <Typography 
              variant="h3" 
              align="center" 
              sx={{ 
                color: 'white', 
                mb: 6,
                textShadow: '0 2px 10px rgba(0,0,0,0.3)'
              }}
            >
               Sericulture Features
            </Typography>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }}>
              {features.map((feature, index) => (
                <Box key={index} sx={{ width: { xs: '100%', sm: 'calc(50% - 16px)', md: 'calc(25% - 24px)' } }}>
                  <Fade in={mounted} timeout={2400 + index * 200}>
                    <FloatingCard 
                      sx={{ 
                        height: '100%',
                        cursor: 'pointer',
                        '&:hover': {
                          transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1.08)',
                        }
                      }}
                      onClick={() => {
                        if (isAuthed) {
                          navigate('/dashboard');
                        } else {
                          navigate('/login?redirect=%2Fdashboard');
                        }
                      }}
                    >
                      <CardContent sx={{ textAlign: 'center', p: 3 }}>
                        <Box sx={{ mb: 2 }}>
                          {feature.icon}
                        </Box>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, color: '#333' }}>
                          {feature.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#666' }}>
                          {feature.description}
                        </Typography>
                      </CardContent>
                    </FloatingCard>
                  </Fade>
                </Box>
              ))}
            </Box>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default Home;
