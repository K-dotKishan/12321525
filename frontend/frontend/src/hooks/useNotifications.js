import { useEffect } from 'react';
import { useNotificationStore } from '../store/NotificationStore.jsx';
import { fetchNotifications } from '../services/notificationService.js';

/**
 * Fetches notifications whenever page, limit, or filterType changes.
 * Dispatches into NotificationStore.
 */
export function useNotifications() {
  const { state, fetchStart, fetchSuccess, fetchError } = useNotificationStore();
  const { page, limit, filterType } = state;

  useEffect(() => {
    let cancelled = false;

    async function load() {
      fetchStart();
      try {
        const { notifications, totalCount } = await fetchNotifications({ page, limit, filterType });
        if (!cancelled) fetchSuccess(notifications, totalCount);
      } catch (err) {
        if (!cancelled) fetchError(err?.message ?? 'Failed to load notifications');
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [page, limit, filterType]); // eslint-disable-line react-hooks/exhaustive-deps
}
