import { useEffect } from 'react';
import { usePriorityStore } from '../store/PriorityStore.jsx';
import { fetchNotifications, TYPE_WEIGHT } from '../services/notificationService.js';
import logger from '../utils/logger.js';

const CTX = 'usePriorityInbox';

/**
 * Priority score = typeWeight * 1000 + recencyScore
 * recencyScore = 1000 - minutesSincePosted (capped at 0)
 * This ensures Placement > Result > Event, with recency as tiebreaker.
 */
function priorityScore(notification) {
  const weight = TYPE_WEIGHT[notification.Type] ?? 0;
  const ageMs  = Date.now() - new Date(notification.Timestamp).getTime();
  const ageMins = Math.floor(ageMs / 60000);
  const recency = Math.max(0, 1000 - ageMins);
  return weight * 1000 + recency;
}

/**
 * Fetches a large batch from the API (up to 100) and picks the top-n
 * by priority score. Re-runs whenever topN changes.
 */
export function usePriorityInbox() {
  const { state, fetchStart, fetchSuccess, fetchError } = usePriorityStore();
  const { topN } = state;

  useEffect(() => {
    let cancelled = false;

    async function load() {
      fetchStart();
      try {
        // Fetch a large batch so we can rank locally
        const { notifications } = await fetchNotifications({ page: 1, limit: 100, filterType: 'All' });
        logger.info(CTX, `Fetched ${notifications.length} for priority ranking`);

        const ranked = [...notifications]
          .sort((a, b) => priorityScore(b) - priorityScore(a))
          .slice(0, topN);

        if (!cancelled) fetchSuccess(ranked);
      } catch (err) {
        if (!cancelled) fetchError(err?.message ?? 'Failed to load priority inbox');
      }
    }

    load();
    return () => { cancelled = true; };
  }, [topN]); // eslint-disable-line react-hooks/exhaustive-deps
}
