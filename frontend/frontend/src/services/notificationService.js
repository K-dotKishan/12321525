// Mock notification service — no backend needed
import logger from '../utils/logger.js';

const CTX = 'notificationService';

const TYPES = ['Alert', 'Info', 'Success', 'Warning'];

const MOCK_NOTIFICATIONS = Array.from({ length: 47 }, (_, i) => ({
  ID: `notif-${i + 1}`,
  type: TYPES[i % TYPES.length],
  title: [
    'New appointment scheduled',
    'Lab results available',
    'Prescription refill reminder',
    'Payment received',
    'Doctor message',
    'Upcoming checkup',
    'Insurance update',
    'Test report ready',
  ][i % 8],
  message: [
    'Your appointment has been confirmed for tomorrow at 10:00 AM.',
    'Your recent lab results are now available. Please review them.',
    'Your prescription is due for a refill. Contact your pharmacy.',
    'A payment of $120 has been processed successfully.',
    'Dr. Smith has sent you a message regarding your treatment plan.',
    'Reminder: Annual checkup scheduled for next Monday.',
    'Your insurance details have been updated in our system.',
    'Your test report has been uploaded and is ready to view.',
  ][i % 8],
  timestamp: new Date(Date.now() - i * 3_600_000 * 2).toISOString(),
  read: false,
}));

/**
 * Fetch paginated + filtered notifications from mock data.
 * Returns { notifications, totalCount }
 */
export async function fetchNotifications({ page = 1, limit = 10, filterType = 'All' } = {}) {
  logger.info(CTX, `fetchNotifications page=${page} limit=${limit} filter=${filterType}`);

  // Simulate network delay
  await new Promise((r) => setTimeout(r, 400));

  const filtered =
    filterType === 'All'
      ? MOCK_NOTIFICATIONS
      : MOCK_NOTIFICATIONS.filter((n) => n.type === filterType);

  const start = (page - 1) * limit;
  const notifications = filtered.slice(start, start + limit);

  return { notifications, totalCount: filtered.length };
}

export const NOTIFICATION_TYPES = ['All', ...TYPES];
