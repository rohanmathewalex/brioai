import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Avatar,
  Card,
  CardContent,
  CardActions,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CreateIcon from '@mui/icons-material/Create';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import ApiIcon from '@mui/icons-material/Api';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import { useAuth } from '../context/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const features = [
    { title: 'Summarize Content', image: '/path/to/image1.jpg', link: '/summarize' },
    { title: 'Rewrite Content', image: '/path/to/image2.jpg', link: '/rewrite' },
    { title: 'Generate Prompts', image: '/path/to/image3.jpg', link: '/generate-prompts' },
    { title: 'Translate Content', image: '/path/to/image4.jpg', link: '/translate' },
  ];

  return (
    <Container maxWidth="xl" sx={{ mt: 4, display: 'flex' }}>
      {/* Sidebar */}
      <Box
        sx={{
          minWidth: '280px',
          maxWidth: '320px',
          backgroundColor: '#f8f9fa',
          padding: 3,
          borderRight: '1px solid #e0e0e0',
          borderRadius: 1,
          height: 'calc(100vh - 32px)',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#444' }}>
          BrioAI
        </Typography>
        <Typography variant="subtitle2" gutterBottom sx={{ color: '#666' }}>
          Free Plan
        </Typography>
        <Divider sx={{ my: 2 }} />
        <List>
          <ListItem disablePadding>
            <ListItemButton component="a" href="/dashboard" sx={{ color: '#444', '&:hover': { backgroundColor: '#e9ecef' } }}>
              <ListItemIcon sx={{ color: '#444' }}><DashboardIcon /></ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="/new" sx={{ color: '#444', '&:hover': { backgroundColor: '#e9ecef' } }}>
              <ListItemIcon sx={{ color: '#444' }}><CreateIcon /></ListItemIcon>
              <ListItemText primary="New" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="/projects" sx={{ color: '#444', '&:hover': { backgroundColor: '#e9ecef' } }}>
              <ListItemIcon sx={{ color: '#444' }}><FolderOpenIcon /></ListItemIcon>
              <ListItemText primary="Projects" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="/api" sx={{ color: '#444', '&:hover': { backgroundColor: '#e9ecef' } }}>
              <ListItemIcon sx={{ color: '#444' }}><ApiIcon /></ListItemIcon>
              <ListItemText primary="API" />
            </ListItemButton>
          </ListItem>
        </List>
        <Button
          variant="contained"
          sx={{
            mt: 'auto',
            backgroundColor: '#343a40',
            color: 'white', // Ensure text is white
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#495057',
            },
          }}
          startIcon={<UpgradeIcon />}
        >
          Upgrade to Pro
        </Button>
      </Box>

      {/* Main Content Area */}
      <Box sx={{ flexGrow: 1, paddingLeft: 4 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Dashboard
        </Typography>

        {/* Statistics Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {['Content Summarization', 'Content Rewriting', 'Dynamic Prompt Generation', 'Multilingual Translation'].map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                sx={{
                  padding: 3,
                  textAlign: 'center',
                  borderRadius: 2,
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  backgroundColor: '#ffffff',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
                  },
                }}
              >
                <Typography variant="h5" sx={{ color: '#343a40' }}>0</Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>{stat}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Quick Actions Section */}
        <Typography variant="h5" sx={{ mb: 2 }}>
          Quick Actions
        </Typography>
        <Grid container spacing={3}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: 2,
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.03)',
                    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
                  },
                }}
              >
                <CardContent>
                  <Avatar
                    src={feature.image}
                    sx={{ width: '100%', height: 140, mb: 2, borderRadius: 1 }}
                    variant="rounded"
                  />
                  <Typography variant="h6" sx={{ color: '#343a40' }}>{feature.title}</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    sx={{
                      color: 'white', // White text color for buttons in quick actions
                      backgroundColor: '#343a40', // Background color for better contrast
                      textTransform: 'none',
                      '&:hover': {
                        backgroundColor: '#495057',
                      },
                    }}
                    href={feature.link}
                  >
                    Explore
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Getting Started Section */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5">Getting Started</Typography>
          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  padding: 3,
                  borderRadius: 2,
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                  },
                }}
              >
                <Typography variant="h6">Create a new project</Typography>
                <Typography variant="body2" sx={{ mb: 2, color: '#666' }}>
                  Organize your work by creating projects. Projects can include any combination of the four features.
                </Typography>
                <Button variant="contained" sx={{ backgroundColor: '#343a40', color: '#FFFFFF' }}>Create New Project</Button>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  padding: 3,
                  borderRadius: 2,
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                  },
                }}
              >
                <Typography variant="h6">Explore our examples</Typography>
                <Typography variant="body2" sx={{ mb: 2, color: '#666' }}>
                  Check out our pre-built examples to get a feel for what's possible with BrioAI.
                </Typography>
                <Button variant="outlined" sx={{ color: '#FFFFFF' }}>View Examples</Button>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Dashboard;
