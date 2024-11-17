import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container, Link } from '@mui/material';
import { loginUser } from '../services/authService';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await loginUser({ email, password });
      setSuccess('Login successful!');
      setError('');
      console.log('Token:', response.token); // Handle token (e.g., save to localStorage)
    } catch (err) {
      setError((err as Error).message);
      setSuccess('');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h5" gutterBottom>Login</Typography>
        {error && <Typography color="error">{error}</Typography>}
        {success && <Typography color="primary">{success}</Typography>}
        <TextField label="Email" variant="outlined" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} required />
        <TextField label="Password" type="password" variant="outlined" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} required />
        <Button
          type="submit"
          variant="contained"
          sx={{ backgroundColor: '#000', color: '#fff', '&:hover': { backgroundColor: '#333' } }}
          fullWidth
        >
          Login
        </Button>
        <Typography variant="body2" align="center">
          Don't have an account? <Link href="/signup" sx={{ color: '#000', textDecoration: 'underline' }}>Sign Up</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default LoginForm;
