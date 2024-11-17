// src/components/Layout.tsx
import React, { ReactNode } from 'react';
import { Box, Container, CssBaseline, Typography } from '@mui/material';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'background.default',
        color: 'text.primary',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CssBaseline />
      <Container
        maxWidth="lg"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '16px',
        }}
      >
        {children}
      </Container>
      <Box component="footer" sx={{ padding: '16px', textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} BrioAI. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Layout;
