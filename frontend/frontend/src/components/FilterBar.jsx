import { Box, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { NOTIFICATION_TYPES } from '../services/notificationService.js';
import { useNotificationStore } from '../store/NotificationStore.jsx';

const TYPE_ACCENT = {
  All:       '#d4a843',
  Event:     '#60a5fa',
  Result:    '#fbbf24',
  Placement: '#34d399',
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
        {NOTIFICATION_TYPES.map((type) => {
          const accent = TYPE_ACCENT[type];
          const active = filterType === type;
          return (
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
                borderColor: active ? accent : 'rgba(255,255,255,0.08)',
                color: active ? accent : 'text.secondary',
                '&.Mui-selected': { background: `${accent}18`, color: accent },
                '&:hover': { background: `${accent}10` },
              }}
            >
              {type}
            </ToggleButton>
          );
        })}
      </ToggleButtonGroup>
    </Box>
  );
}
