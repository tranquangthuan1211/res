import { createTheme } from '@mui/material/styles';

export const muiTheme = createTheme({
  palette: {
    primary: {
      main: 'hsl(24, 100%, 50%)',
      light: 'hsl(24, 100%, 60%)',
      dark: 'hsl(14, 100%, 57%)',
      contrastText: '#ffffff',
    },
    secondary: {
      main: 'hsl(43, 100%, 65%)',
      contrastText: 'hsl(20, 14.3%, 4.1%)',
    },
    success: {
      main: 'hsl(142, 76%, 36%)',
      contrastText: '#ffffff',
    },
    error: {
      main: 'hsl(0, 84.2%, 60.2%)',
      contrastText: '#ffffff',
    },
    background: {
      default: 'hsl(0, 0%, 100%)',
      paper: 'hsl(0, 0%, 100%)',
    },
    text: {
      primary: 'hsl(20, 14.3%, 4.1%)',
      secondary: 'hsl(25, 5.3%, 44.7%)',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 16px hsl(24 100% 50% / 0.15)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, hsl(24, 100%, 50%), hsl(14, 100%, 57%))',
          '&:hover': {
            background: 'linear-gradient(135deg, hsl(24, 100%, 45%), hsl(14, 100%, 52%))',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px hsl(24 100% 50% / 0.1)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0 4px 16px hsl(24 100% 50% / 0.15)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});
