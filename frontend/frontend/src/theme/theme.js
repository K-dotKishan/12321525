import { createTheme, alpha } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#d4a843', light: '#f0c96a', dark: '#a07830', contrastText: '#080b14' },
    secondary: { main: '#34d399', light: '#6ee7b7', dark: '#059669', contrastText: '#080b14' },
    background: { default: '#080b14', paper: '#0e1320' },
    text: { primary: '#e8e6e0', secondary: '#8a8580' },
    divider: 'rgba(212,168,67,0.12)',
    error: { main: '#f87171' },
    warning: { main: '#fbbf24' },
    info: { main: '#60a5fa' },
    success: { main: '#34d399' },
  },
  typography: {
    fontFamily: "'Outfit', sans-serif",
    h1: { fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 },
    h2: { fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 },
    h3: { fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 },
    h4: { fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 },
    h5: { fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 },
    h6: { fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 },
    overline: { fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.12em' },
    caption: { fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem' },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { background: '#080b14' },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 500,
          letterSpacing: '0.02em',
          borderRadius: 8,
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #d4a843 0%, #f0c96a 100%)',
          color: '#080b14',
          boxShadow: '0 4px 24px rgba(212,168,67,0.3)',
          '&:hover': {
            background: 'linear-gradient(135deg, #f0c96a 0%, #d4a843 100%)',
            boxShadow: '0 6px 32px rgba(212,168,67,0.45)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.65rem',
          fontWeight: 500,
          letterSpacing: '0.08em',
          height: 22,
          borderRadius: 4,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          background: '#0e1320',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: { fontFamily: "'Outfit', sans-serif" },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: { fontFamily: "'Outfit', sans-serif" },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: { fontFamily: "'Outfit', sans-serif" },
      },
    },
  },
});

export default theme;