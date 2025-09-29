import { Box, Typography, Container, Paper, Accordion, AccordionSummary, AccordionDetails, Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DownloadIcon from '@mui/icons-material/Download';
import DescriptionIcon from '@mui/icons-material/Description';
import Footer from '../components/Footer';

const getCurrentDate = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months start at 0
  const dd = String(today.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

const Documents = () => {
  const currentDate = getCurrentDate();

  const documents = [
    {
      title: 'Temperature & Humidity Logs',
      description: 'Recorded sensor data of temperature and humidity for silkworm farm monitoring. Updated in real-time from IoT devices.',
      type: 'CSV',
      size: '3.5 MB',
      date: currentDate
    },
    {
      title: 'Device Control Manual',
      description: 'Step-by-step guide to control IoT devices like fans, heaters, and humidifiers via the dashboard.',
      type: 'PDF',
      size: '2.8 MB',
      date: currentDate
    },
    {
      title: 'Dashboard Usage Guide',
      description: 'Instructions on how to visualize farm data, track silkworm growth stages, and receive alerts on the dashboard.',
      type: 'PDF',
      size: '2.2 MB',
      date: currentDate
    },
    {
      title: 'Data Saving & Backup Process',
      description: 'Explains how sensor data is stored on the cloud, including backup schedules and retrieval process.',
      type: 'DOCX',
      size: '1.9 MB',
      date: currentDate
    },
    {
      title: 'IoT Device Firmware Reference',
      description: 'Technical documentation for the ESP32 firmware used to read sensors and send data to the cloud.',
      type: 'PDF',
      size: '3.0 MB',
      date: currentDate
    }
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: 'url("https://i.pinimg.com/originals/44/a3/90/44a39038a2420091fa89e697f996feae.gif") no-repeat center center fixed',
        backgroundSize: 'cover',
        color: '#fff',
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          py: 8,
          backdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(0,0,0,0.7)',
          borderRadius: 3,
        }}
      >
        <Typography variant="h2" fontWeight="bold" align="center" gutterBottom>
          Project Documentation
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" paragraph>
          Your complete guide to the Sericulture IoT Monitoring System.
        </Typography>

        {/* Accordions for guides */}
        <Box sx={{ mt: 6 }}>
          {documents.map((doc, index) => (
            <Accordion key={index} sx={{ bgcolor: 'rgba(255,255,255,0.05)', color: '#fff', mb: 1 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#fff' }} />}>
                <Typography variant="h6">{doc.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography paragraph>{doc.description}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>

        {/* Downloadable Documents */}
        <Box sx={{ mt: 8 }}>
          <Typography variant="h4" gutterBottom fontWeight="bold" align="center">
            Downloadable Resources
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 4, justifyContent: 'center' }}>
            {documents.map((doc, index) => (
              <Paper
                key={index}
                elevation={3}
                sx={{
                  p: 3,
                  width: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(33.333% - 16px)' },
                  borderRadius: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 },
                  backgroundColor: '#111827',
                  color: '#fff'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <DescriptionIcon sx={{ fontSize: 40, color: '#4f46e5', mr: 2 }} />
                  <Box>
                    <Typography variant="h6" fontWeight="bold">{doc.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {doc.type} • {doc.size} • {doc.date}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body2" paragraph sx={{ color: '#ccc' }}>{doc.description}</Typography>
                <Button
                  variant="contained"
                  startIcon={<DownloadIcon />}
                  sx={{ bgcolor: '#4f46e5', '&:hover': { bgcolor: '#3730a3' } }}
                >
                  Download
                </Button>
              </Paper>
            ))}
          </Box>
        </Box>

        {/* Support Section */}
        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Typography variant="h4" gutterBottom fontWeight="bold">Need More Help?</Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            Contact our support team for help with your Sericulture IoT system.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button
              component={Link}
              to="/contact"
              variant="contained"
              size="large"
              sx={{ px: 4, py: 1.5, bgcolor: '#4f46e5', '&:hover': { bgcolor: '#3730a3' } }}
            >
              Contact Support
            </Button>
          </Stack>
        </Box>
      </Container>
      
    </Box>
  );
};

export default Documents;
