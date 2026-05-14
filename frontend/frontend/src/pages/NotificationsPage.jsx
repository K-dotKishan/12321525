import {
  Box,
  Button,
  Container,
  Divider,
  MenuItem,
  Select,
  TablePagination,
  Typography,
} from '@mui/material';
import { useNotificationStore } from '../store/NotificationStore.jsx';
import { useNotifications } from '../hooks/useNotifications.js';
import FilterBar from '../components/FilterBar.jsx';
import NotificationList from '../components/NotificationList.jsx';

export default function NotificationsPage() {
  useNotifications();

  const { state, markAllRead, setPage, setLimit } = useNotificationStore();
  const { notifications, totalCount, page, limit, readIds } = state;

  const unreadCount = notifications.filter((n) => !readIds.has(n.ID)).length;

  return (
    <Box sx={{ minHeight: '100vh', py: { xs: 3, md: 6 } }}>
      <Container maxWidth="md">
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 4, flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="overline" sx={{ color: 'primary.main' }}>
              Notification Center
            </Typography>
            <Typography variant="h4" sx={{ mt: 0.5 }}>
              All Notifications
            </Typography>
            {unreadCount > 0 && (
              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                {unreadCount} unread on this page
              </Typography>
            )}
          </Box>

          <Button
            variant="outlined"
            size="small"
            onClick={markAllRead}
            disabled={unreadCount === 0}
            sx={{
              borderColor: 'primary.main',
              color: 'primary.main',
              '&:hover': { borderColor: 'primary.light', color: 'primary.light' },
              '&:disabled': { opacity: 0.35 },
            }}
          >
            Mark all as read
          </Button>
        </Box>

        {/* Filter bar */}
        <FilterBar />

        <Divider sx={{ my: 3 }} />

        {/* Notification list */}
        <NotificationList />

        {/* Pagination */}
        {totalCount > 0 && (
          <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>Per page</Typography>
              <Select
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
                size="small"
                sx={{ fontSize: '0.8rem', minWidth: 70 }}
              >
                {[5, 10, 20].map((n) => (
                  <MenuItem key={n} value={n}>{n}</MenuItem>
                ))}
              </Select>
            </Box>

            <TablePagination
              component="div"
              count={totalCount}
              page={page - 1}
              rowsPerPage={limit}
              rowsPerPageOptions={[]}
              onPageChange={(_, newPage) => setPage(newPage + 1)}
              sx={{
                color: 'text.secondary',
                '.MuiTablePagination-toolbar': { pl: 0 },
                '.MuiTablePagination-displayedRows': { fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem' },
              }}
            />
          </Box>
        )}
      </Container>
    </Box>
  );
}
