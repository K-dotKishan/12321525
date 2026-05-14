import logger from '../utils/logger.js';

const CTX = 'notificationService';

const BASE_URL = 'http://4.224.186.213/evaluation-service/notifications';

// The assignment states users are pre-authorised.
// Set VITE_AUTH_TOKEN in a .env file at frontend/frontend/.env
// e.g.  VITE_AUTH_TOKEN=Bearer eyJ...
const AUTH_TOKEN = import.meta.env.VITE_AUTH_TOKEN ?? '';

export const NOTIFICATION_TYPES = ['All', 'Event', 'Result', 'Placement'];

// Priority weights for Stage 6 Priority Inbox
export const TYPE_WEIGHT = { Placement: 3, Result: 2, Event: 1 };

/**
 * Fetch paginated + filtered notifications from the real API.
 * Falls back to mock data when the API is unreachable or returns an error.
 *
 * @returns {{ notifications: object[], totalCount: number }}
 */
export async function fetchNotifications({ page = 1, limit = 10, filterType = 'All' } = {}) {
  logger.info(CTX, `fetchNotifications page=${page} limit=${limit} filter=${filterType}`);

  const params = new URLSearchParams({ page, limit });
  if (filterType !== 'All') params.set('notification_type', filterType);

  const url = `${BASE_URL}?${params.toString()}`;
  logger.debug(CTX, 'GET', url);

  const headers = { 'Content-Type': 'application/json' };
  if (AUTH_TOKEN) headers['Authorization'] = AUTH_TOKEN;

  try {
    const res = await fetch(url, { headers });

    if (!res.ok) {
      const body = await res.text();
      logger.warn(CTX, `API error ${res.status}: ${body}`);
      throw new Error(`API returned ${res.status}`);
    }

    const data = await res.json();
    logger.info(CTX, 'API response received', data);

    // API shape: { notifications: [...] }
    // Each item: { ID, Type, Message, Timestamp }
    const notifications = (data.notifications ?? []).map(normalise);
    // API doesn't return totalCount — estimate from current page
    const totalCount = data.total ?? data.totalCount ?? estimateTotal(notifications.length, page, limit);

    return { notifications, totalCount };
  } catch (err) {
    logger.warn(CTX, 'Falling back to mock data:', err.message);
    return fetchMock({ page, limit, filterType });
  }
}

/**
 * Normalise API item to a consistent internal shape.
 * API uses capital keys: ID, Type, Message, Timestamp
 */
function normalise(item) {
  return {
    ID:        item.ID        ?? item.id,
    Type:      item.Type      ?? item.type      ?? 'Event',
    Message:   item.Message   ?? item.message   ?? '',
    Timestamp: item.Timestamp ?? item.timestamp ?? new Date().toISOString(),
  };
}

function estimateTotal(count, page, limit) {
  // If we got a full page, assume there's at least one more page
  if (count === limit) return page * limit + 1;
  return (page - 1) * limit + count;
}

// ─── Mock fallback (used when API is unreachable) ────────────────────────────
const MOCK_TYPES = ['Event', 'Result', 'Placement'];
const MOCK_MESSAGES = {
  Event:     ['tech-fest', 'farewell', 'orientation', 'workshop', 'seminar'],
  Result:    ['mid-sem', 'project-review', 'external', 'internal', 'viva'],
  Placement: ['Google hiring', 'Amazon hiring', 'Microsoft hiring', 'CSX Corporation hiring', 'Advanced Micro Devices Inc. hiring'],
};

const MOCK_DATA = Array.from({ length: 60 }, (_, i) => {
  const type = MOCK_TYPES[i % 3];
  return {
    ID:        `mock-${i + 1}`,
    Type:      type,
    Message:   MOCK_MESSAGES[type][i % 5],
    Timestamp: new Date(Date.now() - i * 3_600_000 * 1.5).toISOString(),
  };
});

async function fetchMock({ page, limit, filterType }) {
  await new Promise((r) => setTimeout(r, 300));
  const filtered = filterType === 'All' ? MOCK_DATA : MOCK_DATA.filter((n) => n.Type === filterType);
  const start = (page - 1) * limit;
  return {
    notifications: filtered.slice(start, start + limit),
    totalCount: filtered.length,
  };
}
