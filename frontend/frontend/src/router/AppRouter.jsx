import { useState } from 'react';
import { Box, Tab, Tabs, AppBar, Toolbar, Typography } from '@mui/material';
import NotificationsPage from '../pages/NotificationsPage.jsx';
import PriorityInboxPage from '../pages/PriorityInboxPage.jsx';
import { PriorityProvider } from '../store/PriorityStore.jsx';

export default function AppRouter() {
  const [tab, setTab] = useState(0);

  return (
    <Box sx={{ minHeight: '100vh', background: 'background.default' }}>
      {/* Top nav */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: '#0e1320',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Toolbar sx={{ gap: 2 }}>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "'Cormorant Garamond', serif",
              color: 'primary.main',
              fontWeight: 600,
              letterSpacing: '0.04em',
              mr: 2,
            }}
          >
            AffordMed
          </Typography>

          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            textColor="inherit"
            TabIndicatorProps={{ style: { background: '#d4a843' } }}
            sx={{ flexGrow: 1 }}
          >
            <Tab
              label="All Notifications"
              sx={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '0.85rem',
                textTransform: 'none',
                color: tab === 0 ? 'primary.main' : 'text.secondary',
              }}
            />
            <Tab
              label="Priority Inbox"
              sx={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '0.85rem',
                textTransform: 'none',
                color: tab === 1 ? 'secondary.main' : 'text.secondary',
              }}
            />
          </Tabs>
        </Toolbar>
      </AppBar>

      {/* Pages */}
      {tab === 0 && <NotificationsPage />}
      {tab === 1 && (
        <PriorityProvider>
          <PriorityInboxPage />
        </PriorityProvider>
      )}
    </Box>
  );
}
