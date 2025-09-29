import React from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Paper, 
  TextField, 
  Button, 
  Card, 
  CardContent 
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import SendIcon from '@mui/icons-material/Send';

const Contact = () => {
  return (
    <Box
      sx={{
        width: '100vw',
        minHeight: '100vh',
        backgroundImage: 'url(https://i.pinimg.com/originals/44/a3/90/44a39038a2420091fa89e697f996feae.gif)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        pt: 8,
        pb: 8
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h2" component="h1" align="center" gutterBottom fontWeight="bold" color="white">
          Get In Touch
        </Typography>
        <Typography variant="h5" align="center" color="white" paragraph>
         Please fill out the form below or contact us using the details provided.
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 6, mt: 6 }}>
          {/* Contact Form */}
          <Box sx={{ width: { xs: '100%', md: 'calc(58.333% - 24px)' } }}>
            <Paper elevation={3} sx={{ p: 4, width: '100%', borderRadius: 3, backgroundColor: 'rgba(28, 27, 27, 0.95)' }}>
              <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
                Send us a Message
              </Typography>
              <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                  <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 8px)' } }}>
                    <TextField fullWidth required label="Your Name" variant="outlined" />
                  </Box>
                  <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 8px)' } }}>
                    <TextField fullWidth required label="Your Email" type="email" variant="outlined" />
                  </Box>
                  <Box sx={{ width: '100%' }}>
                    <TextField fullWidth required label="Subject" variant="outlined" />
                  </Box>
                  <Box sx={{ width: '100%' }}>
                    <TextField fullWidth required label="Message" multiline rows={6} variant="outlined" />
                  </Box>
                  <Box sx={{ width: '100%' }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      startIcon={<SendIcon />}
                      sx={{ 
                        mt: 2,
                        bgcolor: '#4f46e5',
                        '&:hover': { bgcolor: '#3730a3' }
                      }}
                    >
                      Send Message
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Box>

          {/* Contact Info */}
          <Box sx={{ width: { xs: '100%', md: 'calc(41.667% - 24px)' } }}>
            <Paper elevation={3} sx={{ p: 4, backgroundColor: 'rgba(0,0,0,0.7)', color: 'white', height: '100%', borderRadius: 3 }}>
              <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
                Contact Information
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, mt: 4 }}>
                <LocationOnIcon sx={{ mr: 2, fontSize: '2rem' }} />
                <Box>
                  <Typography variant="h6" fontWeight="bold">Address</Typography>
                  <Typography variant="body1">
                    123 Sericulture Lane<br />
                    Silk Valley, banglore
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <EmailIcon sx={{ mr: 2, fontSize: '2rem' }} />
                <Box>
                  <Typography variant="h6" fontWeight="bold">Email</Typography>
                  <Typography variant="body1">seri@sericulture.tech</Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <PhoneIcon sx={{ mr: 2, fontSize: '2rem' }} />
                <Box>
                  <Typography variant="h6" fontWeight="bold">Phone</Typography>
                  <Typography variant="body1">98789 98789</Typography>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Box>

        {/* Additional Cards & FAQ remain unchanged, just make text white for visibility */}
      </Container>
    </Box>
  );
};

export default Contact;
