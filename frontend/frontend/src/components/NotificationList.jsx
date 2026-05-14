import { Box, CircularProgress, Typography, Alert } from '@mui/material';
import { useNotificationStore } from '../store/NotificationStore.jsx';
import NotificationItem from './NotificationItem.jsx';

export default function NotificationList({ showRank = false }) {
  const { state } = useNotificationStore();
  const { notifications, loading, error } = state;

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress sx={{ color: 'primary.main' }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error}
      </Alert>
    );
  }

  if (notifications.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" sx={{ color: 'text.secondary' }}>
          No notifications
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', opacity: 0.6, mt: 1 }}>
          You're all caught up.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      {notifications.map((n, i) => (
        <NotificationItem
          key={n.ID}
          notification={n}
          priorityRank={showRank ? i + 1 : undefined}
        />
      ))}
    </Box>
  );
}
