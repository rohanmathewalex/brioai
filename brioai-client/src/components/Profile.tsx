import React from 'react';
import { Box, Typography, Avatar, Button, Divider, Grid } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const Profile: React.FC = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <Box sx={{ padding: 3, textAlign: 'center' }}>
        <Typography variant="h6" color="error">
          No user data available. Please log in.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: '0 auto',
        padding: 4,
        backgroundColor: 'background.paper',
        boxShadow: 2,
        borderRadius: 2,
      }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={3}>
          <Avatar sx={{ width: 80, height: 80, bgcolor: 'primary.main' }}>
            {user.name.charAt(0).toUpperCase()}
          </Avatar>
        </Grid>
        <Grid item xs={12} md={9}>
          <Typography variant="h4">{user.name}</Typography>
          <Typography variant="body1" color="text.secondary">{user.email}</Typography>
          <Typography variant="body2" color="text.secondary">Role: {user.role}</Typography>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button variant="contained" color="primary" onClick={() => alert('Edit Profile feature coming soon!')} sx={{ textTransform: 'none' }}>
          Edit Profile
        </Button>
        <Button variant="outlined" color="error" onClick={logout} sx={{ textTransform: 'none' }}>
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default Profile;
