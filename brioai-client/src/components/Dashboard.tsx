import React from 'react';
import { Box, Typography, Container, Grid, Paper } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome, {user ? user.name : 'User'}!
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s ease',
            '&:hover': { transform: 'translateY(-5px)' },
          }}>
            <Typography variant="h5">Feature 1</Typography>
            <Typography variant="body1">Description of the feature...</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s ease',
            '&:hover': { transform: 'translateY(-5px)' },
          }}>
            <Typography variant="h5">Feature 2</Typography>
            <Typography variant="body1">Description of the feature...</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s ease',
            '&:hover': { transform: 'translateY(-5px)' },
          }}>
            <Typography variant="h5">Feature 3</Typography>
            <Typography variant="body1">Description of the feature...</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
