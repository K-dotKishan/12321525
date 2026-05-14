import { createContext, useContext, useReducer, useCallback } from 'react';
import logger from '../utils/logger.js';

const CTX = 'NotificationStore';

// ─── State shape ────────────────────────────────────────────────────────────
const initialState = {
  notifications: [],       // current page notifications
  readIds: new Set(),      // IDs the user has clicked (read)
  totalCount: 0,
  page: 1,
  limit: 10,
  filterType: 'All',
  loading: false,
  error: null,
};

// ─── Action types ────────────────────────────────────────────────────────────
const A = {
  FETCH_START: 'FETCH_START',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_ERROR: 'FETCH_ERROR',
  MARK_READ: 'MARK_READ',
  MARK_ALL_READ: 'MARK_ALL_READ',
  SET_PAGE: 'SET_PAGE',
  SET_LIMIT: 'SET_LIMIT',
  SET_FILTER: 'SET_FILTER',
};

// ─── Reducer ─────────────────────────────────────────────────────────────────
function reducer(state, action) {
  switch (action.type) {
    case A.FETCH_START:
      return { ...state, loading: true, error: null };

    case A.FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        notifications: action.payload.notifications,
        totalCount: action.payload.totalCount,
      };

    case A.FETCH_ERROR:
      return { ...state, loading: false, error: action.payload };

    case A.MARK_READ: {
      const next = new Set(state.readIds);
      next.add(action.payload);
      return { ...state, readIds: next };
    }

    case A.MARK_ALL_READ: {
      const next = new Set(state.readIds);
      state.notifications.forEach((n) => next.add(n.ID));
      return { ...state, readIds: next };
    }

    case A.SET_PAGE:
      return { ...state, page: action.payload };

    case A.SET_LIMIT:
      return { ...state, limit: action.payload, page: 1 };

    case A.SET_FILTER:
      return { ...state, filterType: action.payload, page: 1 };

    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────
const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchStart = useCallback(() => {
    logger.debug(CTX, 'fetchStart');
    dispatch({ type: A.FETCH_START });
  }, []);

  const fetchSuccess = useCallback((notifications, totalCount) => {
    logger.info(CTX, `fetchSuccess: ${notifications.length} items, total=${totalCount}`);
    dispatch({ type: A.FETCH_SUCCESS, payload: { notifications, totalCount } });
  }, []);

  const fetchError = useCallback((error) => {
    logger.error(CTX, 'fetchError', error);
    dispatch({ type: A.FETCH_ERROR, payload: error });
  }, []);

  const markRead = useCallback((id) => {
    logger.debug(CTX, `markRead: ${id}`);
    dispatch({ type: A.MARK_READ, payload: id });
  }, []);

  const markAllRead = useCallback(() => {
    logger.info(CTX, 'markAllRead');
    dispatch({ type: A.MARK_ALL_READ });
  }, []);

  const setPage = useCallback((page) => {
    dispatch({ type: A.SET_PAGE, payload: page });
  }, []);

  const setLimit = useCallback((limit) => {
    dispatch({ type: A.SET_LIMIT, payload: limit });
  }, []);

  const setFilter = useCallback((filterType) => {
    dispatch({ type: A.SET_FILTER, payload: filterType });
  }, []);

  return (
    <NotificationContext.Provider
      value={{ state, fetchStart, fetchSuccess, fetchError, markRead, markAllRead, setPage, setLimit, setFilter }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotificationStore() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotificationStore must be used inside NotificationProvider');
  return ctx;
}