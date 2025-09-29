import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box 
      sx={{ 
        p: 2, 
        mt: 'auto', 
        backgroundColor: '#1f2937', // Dark gray background
        textAlign: 'center',
        color: '#fff' // White text for contrast
      }}
    >
      <Typography variant="body2" color="inherit">
        © {new Date().getFullYear()} Sericulture Insights. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
