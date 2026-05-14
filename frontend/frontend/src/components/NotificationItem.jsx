import { Box, Chip, Typography, Paper } from '@mui/material';
import { useNotificationStore } from '../store/NotificationStore.jsx';

const TYPE_COLORS = {
  Alert:   'error',
  Info:    'info',
  Success: 'success',
  Warning: 'warning',
};

function timeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function NotificationItem({ notification }) {
  const { state, markRead } = useNotificationStore();
  const isRead = state.readIds.has(notification.ID);

  return (
    <Paper
      onClick={() => markRead(notification.ID)}
      elevation={0}
      sx={{
        p: 2,
        cursor: 'pointer',
        border: '1px solid',
        borderColor: isRead ? 'divider' : 'rgba(212,168,67,0.25)',
        borderRadius: 2,
        background: isRead ? '#0e1320' : 'rgba(212,168,67,0.04)',
        transition: 'all 0.2s',
        '&:hover': {
          borderColor: 'rgba(212,168,67,0.45)',
          background: 'rgba(212,168,67,0.07)',
        },
        display: 'flex',
        gap: 2,
        alignItems: 'flex-start',
      }}
    >
      {/* Unread dot */}
      <Box
        sx={{
          mt: '6px',
          width: 8,
          height: 8,
          borderRadius: '50%',
          flexShrink: 0,
          background: isRead ? 'transparent' : '#d4a843',
          border: isRead ? '1px solid rgba(255,255,255,0.15)' : 'none',
          transition: 'background 0.2s',
        }}
      />

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5, flexWrap: 'wrap' }}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: isRead ? 400 : 600,
              color: isRead ? 'text.secondary' : 'text.primary',
              flex: 1,
            }}
          >
            {notification.title}
          </Typography>
          <Chip
            label={notification.type}
            color={TYPE_COLORS[notification.type] ?? 'default'}
            size="small"
            variant="outlined"
          />
        </Box>

        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.75, lineHeight: 1.5 }}>
          {notification.message}
        </Typography>

        <Typography variant="caption" sx={{ color: 'text.secondary', opacity: 0.6 }}>
          {timeAgo(notification.timestamp)}
        </Typography>
      </Box>
    </Paper>
  );
}
