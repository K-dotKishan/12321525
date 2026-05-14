import { Box, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { NOTIFICATION_TYPES } from '../services/notificationService.js';
import { useNotificationStore } from '../store/NotificationStore.jsx';

const TYPE_COLORS = {
  All:     '#d4a843',
  Alert:   '#f87171',
  Info:    '#60a5fa',
  Success: '#34d399',
  Warning: '#fbbf24',
};

export default function FilterBar() {
  const { state, setFilter } = useNotificationStore();
  const { filterType } = state;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
      <Typography variant="overline" sx={{ color: 'text.secondary', lineHeight: 1 }}>
        Filter
      </Typography>
      <ToggleButtonGroup
        value={filterType}
        exclusive
        onChange={(_, val) => val && setFilter(val)}
        size="small"
        sx={{ flexWrap: 'wrap', gap: 0.5 }}
      >
        {NOTIFICATION_TYPES.map((type) => (
          <ToggleButton
            key={type}
            value={type}
            sx={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.65rem',
              letterSpacing: '0.08em',
              px: 1.5,
              py: 0.5,
              borderRadius: '4px !important',
              border: '1px solid',
              borderColor: filterType === type ? TYPE_COLORS[type] : 'rgba(255,255,255,0.08)',
              color: filterType === type ? TYPE_COLORS[type] : 'text.secondary',
              '&.Mui-selected': {
                background: `${TYPE_COLORS[type]}18`,
                color: TYPE_COLORS[type],
              },
              '&:hover': {
                background: `${TYPE_COLORS[type]}10`,
              },
            }}
          >
            {type}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
}
