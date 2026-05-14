import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  MenuItem,
  Select,
  Typography,
  Alert,
  Paper,
} from '@mui/material';
import { usePriorityStore } from '../store/PriorityStore.jsx';
import { usePriorityInbox } from '../hooks/usePriorityInbox.js';
import NotificationItem from '../components/NotificationItem.jsx';

const TOP_N_OPTIONS = [5, 10, 15, 20];

// Weight label for display
const WEIGHT_LABEL = { Placement: '3', Result: '2', Event: '1' };
const WEIGHT_COLOR = { Placement: '#34d399', Result: '#fbbf24', Event: '#60a5fa' };

export default function PriorityInboxPage() {
  usePriorityInbox();

  const { state, markAllRead, setTopN } = usePriorityStore();
  const { notifications, loading, error, topN, readIds } = state;

  const unreadCount = notifications.filter((n) => !readIds.has(n.ID)).length;

  return (
    <Box sx={{ minHeight: '100vh', py: { xs: 3, md: 6 } }}>
      <Container maxWidth="md">
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 4, flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="overline" sx={{ color: 'secondary.main' }}>
              Priority Inbox
            </Typography>
            <Typography variant="h4" sx={{ mt: 0.5 }}>
              Top Notifications
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
              Ranked by type weight × recency
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center', flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Show top
              </Typography>
              <Select
                value={topN}
                onChange={(e) => setTopN(Number(e.target.value))}
                size="small"
                sx={{ fontSize: '0.8rem', minWidth: 70 }}
              >
                {TOP_N_OPTIONS.map((n) => (
                  <MenuItem key={n} value={n}>{n}</MenuItem>
                ))}
              </Select>
            </Box>

            <Button
              variant="outlined"
              size="small"
              onClick={markAllRead}
              disabled={unreadCount === 0}
              sx={{
                borderColor: 'secondary.main',
                color: 'secondary.main',
                '&:hover': { borderColor: 'secondary.light', color: 'secondary.light' },
                '&:disabled': { opacity: 0.35 },
              }}
            >
              Mark all read
            </Button>
          </Box>
        </Box>

        {/* Priority legend */}
        <Paper elevation={0} sx={{ p: 2, mb: 3, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
          <Typography variant="overline" sx={{ color: 'text.secondary', display: 'block', mb: 1 }}>
            Priority weights
          </Typography>
          <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
            {['Placement', 'Result', 'Event'].map((type) => (
              <Box key={type} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                <Box sx={{ width: 10, height: 10, borderRadius: '50%', background: WEIGHT_COLOR[type] }} />
                <Typography variant="caption" sx={{ color: WEIGHT_COLOR[type], fontFamily: "'JetBrains Mono', monospace" }}>
                  {type} = {WEIGHT_LABEL[type]}
                </Typography>
              </Box>
            ))}
            <Typography variant="caption" sx={{ color: 'text.secondary', opacity: 0.6 }}>
              + recency bonus
            </Typography>
          </Box>
        </Paper>

        <Divider sx={{ mb: 3 }} />

        {/* List */}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress sx={{ color: 'secondary.main' }} />
          </Box>
        )}

        {error && <Alert severity="error">{error}</Alert>}

        {!loading && !error && notifications.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" sx={{ color: 'text.secondary' }}>No notifications</Typography>
          </Box>
        )}

        {!loading && !error && notifications.length > 0 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {notifications.map((n, i) => (
              <NotificationItem key={n.ID} notification={n} priorityRank={i + 1} />
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
}
