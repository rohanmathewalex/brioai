// src/theme/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#000000', // Black color for primary elements like buttons
    },
    secondary: {
      main: '#ffffff', // White color for text or accents
    },
    text: {
      primary: '#000000', // Black text for readability
      secondary: '#5f6368', // Light gray for secondary text
    },
    background: {
      default: '#ffffff', // White background for the overall UI
      paper: '#f5f5f5', // Light gray for cards, modals, etc.
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#000000',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#333333',
          },
        },
      },
    },
  },
});

export default theme;
