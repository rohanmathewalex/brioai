// src/components/HomePage.tsx
import React from 'react';
import { Box, Typography, Button, Grid, Paper, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <Box sx={{ backgroundColor: 'background.default', color: 'text.primary', padding: '32px 16px' }}>
      {/* Hero Section */}
      <Box sx={{ padding: '64px 16px', maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
        <Typography variant="h2" gutterBottom>
          Revolutionize Your Content with BrioAI
        </Typography>
        <Typography variant="h5" paragraph>
          AI-powered solutions to transform, optimize, and connect with your content like never before.
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            mt: 3,
            backgroundColor: '#000000',
            color: '#ffffff',
            '&:hover': {
              backgroundColor: '#333333',
            },
          }}
          component={Link}
          to="/signup"
        >
          Get Started for Free
        </Button>
      </Box>

      {/* Features Section */}
      <Container sx={{ mt: 5, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Why Choose BrioAI?
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                padding: '24px',
                borderRadius: '16px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease',
                '&:hover': { transform: 'translateY(-5px)' },
              }}
            >
              <Typography variant="h5" gutterBottom>
                Instant Summarization
              </Typography>
              <Typography variant="body1">
                Quickly distill complex content into simple summaries to save time and improve clarity.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                padding: '24px',
                borderRadius: '16px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease',
                '&:hover': { transform: 'translateY(-5px)' },
              }}
            >
              <Typography variant="h5" gutterBottom>
                Powerful Rewriting
              </Typography>
              <Typography variant="body1">
                Rewrite your content with enhanced clarity, style, and engagement for maximum impact.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                padding: '24px',
                borderRadius: '16px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease',
                '&:hover': { transform: 'translateY(-5px)' },
              }}
            >
              <Typography variant="h5" gutterBottom>
                Multilingual Translation
              </Typography>
              <Typography variant="body1">
                Break down language barriers with seamless translation capabilities to reach a global audience.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Pricing Plans Section */}
      <Box sx={{ mt: 8, padding: '0 16px' }}>
        <Typography variant="h4" gutterBottom textAlign="center">
          Pricing Plans
        </Typography>
        <Grid container spacing={4} sx={{ mt: 3 }}>
          {/* Free Tier */}
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                padding: '24px',
                borderRadius: '16px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                backgroundColor: 'background.paper',
                textAlign: 'center',
              }}
            >
              <Typography variant="h5" gutterBottom>
                Free Tier
              </Typography>
              <Typography variant="body1" paragraph>
                Get started with our core features:
              </Typography>
              <ul style={{ textAlign: 'left', margin: '0 0 16px 0', padding: '0 0 0 16px' }}>
                <li>Content Summarization</li>
                <li>Content Rewriting</li>
                <li>Multilingual Translation</li>
              </ul>
              <Button
                variant="contained"
                size="small"
                sx={{
                  backgroundColor: '#000000',
                  color: '#ffffff',
                  '&:hover': {
                    backgroundColor: '#333333',
                  },
                }}
                component={Link}
                to="/signup"
              >
                Get Started
              </Button>
            </Paper>
          </Grid>

          {/* Premium Tier (Coming Soon) */}
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                padding: '24px',
                borderRadius: '16px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                backgroundColor: 'background.paper',
                textAlign: 'center',
              }}
            >
              <Typography variant="h5" gutterBottom>
                Premium Plan (Coming Soon)
              </Typography>
              <Typography variant="body1" paragraph>
                Unlock advanced features:
              </Typography>
              <ul style={{ textAlign: 'left', margin: '0 0 16px 0', padding: '0 0 0 16px' }}>
                <li>Advanced Summarization</li>
                <li>Custom Content Optimization</li>
                <li>Priority Support</li>
              </ul>
              <Button
                variant="contained"
                size="small"
                sx={{
                  backgroundColor: '#000000',
                  color: '#ffffff',
                  '&:hover': {
                    backgroundColor: '#333333',
                  },
                }}
                disabled
              >
                Coming Soon
              </Button>
            </Paper>
          </Grid>

          {/* Enterprise Plan (Coming Soon) */}
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                padding: '24px',
                borderRadius: '16px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                backgroundColor: 'background.paper',
                textAlign: 'center',
              }}
            >
              <Typography variant="h5" gutterBottom>
                Enterprise Plan (Coming Soon)
              </Typography>
              <Typography variant="body1" paragraph>
                Tailored solutions for teams and businesses.
              </Typography>
              <ul style={{ textAlign: 'left', margin: '0 0 16px 0', padding: '0 0 0 16px' }}>
                <li>Custom Integrations</li>
                <li>Team Collaboration</li>
                <li>Dedicated Support</li>
              </ul>
              <Button
                variant="contained"
                size="small"
                sx={{
                  backgroundColor: '#000000',
                  color: '#ffffff',
                  '&:hover': {
                    backgroundColor: '#333333',
                  },
                }}
                disabled
              >
                Coming Soon
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Call to Action Section */}
      <Box sx={{ mt: 8, padding: '32px 16px', backgroundColor: '#f5f5f5', textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Ready to Transform Your Content?
        </Typography>
        <Typography variant="body1" paragraph>
          Join thousands of users enhancing their productivity and content effectiveness with BrioAI.
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            backgroundColor: '#000000',
            color: '#ffffff',
            '&:hover': {
              backgroundColor: '#333333',
            },
          }}
          component={Link}
          to="/signup"
        >
          Sign Up Now
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;
