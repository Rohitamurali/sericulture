import { Box, Typography, Container, Card, CardContent, Stack, Button, Chip } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { Sensors, Cloud, Dashboard, Analytics, Security, Speed } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Animations
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const FloatingCard = styled(Card)(() => ({
  borderRadius: '20px',
  boxShadow: '10px 10px 30px rgba(0,0,0,0.1)',
  animation: `${float} 6s ease-in-out infinite`,
  '&:hover': { transform: 'scale(1.05)', boxShadow: '0px 10px 40px rgba(0,0,0,0.2)' }
}));

const PulsingButton = styled(Button)(() => ({
  animation: `${pulse} 2s ease-in-out infinite`,
  borderRadius: '25px',
  background: 'linear-gradient(45deg,rgb(40, 31, 209), #3b82f6)',
  color: '#fff',
  fontWeight: 'bold',
  '&:hover': { background: 'linear-gradient(45deg, #3b82f6, #4f46e5)' }
}));

const DesignServices = () => {
  const services = [
    { icon: <Sensors sx={{ fontSize: 50, color: '#FF6B6B' }} />, title: 'IoT Sensors', description: 'Monitor temperature, humidity, and light for silkworms.', features: ['ESP32', 'Environment Sensors', 'Wireless Setup', 'Data Logging'] },
    { icon: <Cloud sx={{ fontSize: 50, color: '#4ECDC4' }} />, title: 'Cloud Integration', description: 'Securely send sensor data to the cloud.', features: ['MQTT & REST APIs', 'Cloud Dashboard', 'Remote Monitoring', 'Alerts'] },
    { icon: <Dashboard sx={{ fontSize: 50, color: '#45B7D1' }} />, title: 'Dashboard', description: 'Visualize farm conditions and silkworm growth.', features: ['Growth Tracking', 'Charts & Graphs', 'Mobile-Friendly', 'Custom Widgets'] },
    { icon: <Analytics sx={{ fontSize: 50, color: '#96CEB4' }} />, title: 'Data Analytics', description: 'Analyze trends and predict growth stages.', features: ['Trend Analysis', 'Predictive Alerts', 'Reports', 'ML Insights'] },
    { icon: <Security sx={{ fontSize: 50, color: '#F7DC6F' }} />, title: 'Secure Network', description: 'Protect IoT devices and data with enterprise-grade security.', features: ['Encryption', 'Access Control', 'Secure Cloud', 'Data Privacy'] },
    { icon: <Speed sx={{ fontSize: 50, color: '#BB8FCE' }} />, title: 'Automation', description: 'Automate fans, heaters, and alerts for optimal growth.', features: ['Auto-Control', 'Threshold Alerts', 'Remote Overrides', 'Monitoring'] }
  ];

  const locations = [
    {
      region: 'India',
      areas: [
        'Karnataka',
        'Tamil Nadu',
        'Andhra Pradesh',
        'Telangana',
        'West Bengal',
        'Assam',
        'Jharkhand',
        'Chhattisgarh',
        'Meghalaya',
        'Manipur',
        'Jammu & Kashmir',
      ],
    },
    {
      region: 'China',
      areas: [
        'Zhejiang',
        'Jiangsu',
        'Sichuan',
        'Guangdong',
        'Guangxi',
        'Hubei',
      ],
    },
    {
      region: 'Japan',
      areas: ['Nagano', 'Gunma', 'Yamanashi'],
    },
    {
      region: 'Thailand',
      areas: ['Chiang Mai', 'Khon Kaen', 'Lamphun'],
    },
    {
      region: 'Vietnam',
      areas: ['Lam Dong', 'Dak Lak'],
    },
    {
      region: 'Bangladesh',
      areas: ['Rajshahi', 'Rangpur'],
    },
    {
      region: 'South Korea',
      areas: ['Gyeongsangbuk-do'],
    },
    {
      region: 'Nepal',
      areas: ['Ilam', 'Dhankuta'],
    },
    {
      region: 'Uzbekistan',
      areas: ['Fergana'],
    },
    {
      region: 'Turkey',
      areas: ['Bursa'],
    },
    {
      region: 'Iran',
      areas: ['Gilan', 'Mazandaran'],
    },
    {
      region: 'Brazil',
      areas: ['Paraná', 'São Paulo'],
    },
    {
      region: 'Italy',
      areas: ['Lombardy'],
    },
    {
      region: 'France',
      areas: ['Ardèche'],
    },
  ];

  // Configure Leaflet default marker icons for Vite
  const iconRetinaUrl = new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).toString();
  const iconUrl = new URL('leaflet/dist/images/marker-icon.png', import.meta.url).toString();
  const shadowUrl = new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).toString();
  L.Icon.Default.mergeOptions({ iconRetinaUrl, iconUrl, shadowUrl });

  const regionToLatLng: Record<string, { lat: number; lng: number }> = {
    'India': { lat: 22.9734, lng: 78.6569 },
    'China': { lat: 35.8617, lng: 104.1954 },
    'Japan': { lat: 36.2048, lng: 138.2529 },
    'Thailand': { lat: 15.8700, lng: 100.9925 },
    'Vietnam': { lat: 14.0583, lng: 108.2772 },
    'Bangladesh': { lat: 23.6850, lng: 90.3563 },
    'South Korea': { lat: 36.5, lng: 127.8 },
    'Nepal': { lat: 28.3949, lng: 84.1240 },
    'Uzbekistan': { lat: 41.3775, lng: 64.5853 },
    'Turkey': { lat: 38.9637, lng: 35.2433 },
    'Iran': { lat: 32.4279, lng: 53.6880 },
    'Brazil': { lat: -14.2350, lng: -51.9253 },
    'Italy': { lat: 41.8719, lng: 12.5674 },
    'France': { lat: 46.2276, lng: 2.2137 },
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh', 
        background: 'url("https://i.pinimg.com/originals/44/a3/90/44a39038a2420091fa89e697f996feae.gif") no-repeat center center fixed', 
        backgroundSize: 'cover', 
        color: '#fff'
      }}
    >
      <Container maxWidth="lg" sx={{ py: 8, backdropFilter: 'blur(8px)', backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: 3 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h2" fontWeight="bold" gutterBottom>
            IoT Solutions for Silkworm Farming
          </Typography>
          <Typography variant="h5" color="text.secondary">
            End-to-end monitoring, automation, and analytics to optimize sericulture production.
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center' }}>
          {services.map((service, idx) => (
            <Box key={idx} sx={{ width: { xs: '100%', sm: 'calc(50% - 16px)', md: 'calc(33.333% - 24px)' } }}>
              <FloatingCard>
                <CardContent sx={{ textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ mb: 2 }}>{service.icon}</Box>
                  <Typography variant="h5" fontWeight="bold" gutterBottom>{service.title}</Typography>
                  <Typography variant="body1" color="text.secondary" paragraph sx={{ flexGrow: 1 }}>{service.description}</Typography>
                  <Box sx={{ mb: 2 }}>
                    {service.features.map((f, i) => <Chip key={i} label={f} size="small" sx={{ m: 0.5, bgcolor: '#1f2937', color: '#fff', fontWeight: 'bold' }} />)}
                  </Box>
                  <PulsingButton sx={{ mt: 'auto', px: 4, py: 1.5 }}>Learn More</PulsingButton>
                </CardContent>
              </FloatingCard>
            </Box>
          ))}
        </Box>

        <Box sx={{ mt: 8 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="center">
            Silkworm Growing Locations
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph textAlign="center">
            Key regions where sericulture is actively practiced.
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}>
            {locations.map((loc, i) => (
              <Card key={i} sx={{ minWidth: 260, maxWidth: 320, bgcolor: 'rgba(31,41,55,0.6)', borderRadius: 3 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                    {loc.region}
                  </Typography>
                  <Box>
                    {loc.areas.map((area, idx) => (
                      <Chip key={idx} label={area} size="small" sx={{ m: 0.5, bgcolor: '#1f2937', color: '#fff', fontWeight: 'bold' }} />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>

        <Box sx={{ mt: 8 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="center">
            Interactive Map
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph textAlign="center">
            Explore global sericulture regions. Zoom and pan to view locations.
          </Typography>
          <Box sx={{ position: 'relative', width: '100%', borderRadius: 3, overflow: 'hidden', boxShadow: '0 10px 40px rgba(0,0,0,0.3)', maxWidth: 1000, height: { xs: 360, md: 560 }, mx: 'auto' }}>
            <MapContainer center={[22, 80]} zoom={4} style={{ height: '100%', width: '100%' }} scrollWheelZoom={true}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {locations.map((loc, i) => {
                const coords = regionToLatLng[loc.region];
                if (!coords) return null;
                return (
                  <Marker key={i} position={[coords.lat, coords.lng]}>
                    <Popup>
                      <Typography variant="subtitle1" fontWeight="bold">{loc.region}</Typography>
                      <Box sx={{ mt: 1 }}>
                        {loc.areas.slice(0, 6).map((area, idx) => (
                          <Chip key={idx} label={area} size="small" sx={{ m: 0.25 }} />
                        ))}
                      </Box>
                    </Popup>
                  </Marker>
                );
              })}
            </MapContainer>
          </Box>
        </Box>

        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Start Your Smart Silkworm Farm Today
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            Contact us to set up sensors, dashboards, and automation for optimized silkworm growth and productivity.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button 
              component={Link} 
              to="/contact" 
              variant="contained" 
              size="large" 
              sx={{ px: 6, py: 2, fontWeight: 'bold', background: 'linear-gradient(45deg, #4f46e5, #3b82f6)', color: '#fff',
                '&:hover': { background: 'linear-gradient(45deg, #3b82f6, #4f46e5)' }
              }}
            >
              Contact Us
            </Button>
            <Button 
              component={Link} 
              to="/dashboard" 
              variant="outlined" 
              size="large" 
              sx={{ px: 6, py: 2, fontWeight: 'bold', borderColor: '#4f46e5', color: '#4f46e5',
                '&:hover': { borderColor: '#3730a3', color: '#3730a3', bgcolor: 'rgba(79,70,229,0.1)' }
              }}
            >
              View Dashboard Demo
            </Button>
          </Stack>
        </Box>
      </Container>
      {/* Footer removed here to prevent duplication */}
    </Box>
  );
};

export default DesignServices;
