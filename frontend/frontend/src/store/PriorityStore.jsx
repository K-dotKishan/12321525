import { createContext, useContext, useReducer, useCallback } from 'react';
import logger from '../utils/logger.js';

const CTX = 'PriorityStore';

const initialState = {
  notifications: [],   // top-n priority sorted list
  readIds: new Set(),
  topN: 10,            // user-configurable: 10, 15, 20
  loading: false,
  error: null,
};

const A = {
  FETCH_START:   'FETCH_START',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_ERROR:   'FETCH_ERROR',
  MARK_READ:     'MARK_READ',
  MARK_ALL_READ: 'MARK_ALL_READ',
  SET_TOP_N:     'SET_TOP_N',
};

function reducer(state, action) {
  switch (action.type) {
    case A.FETCH_START:
      return { ...state, loading: true, error: null };
    case A.FETCH_SUCCESS:
      return { ...state, loading: false, notifications: action.payload };
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
    case A.SET_TOP_N:
      return { ...state, topN: action.payload };
    default:
      return state;
  }
}

const PriorityContext = createContext(null);

export function PriorityProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchStart   = useCallback(() => { logger.debug(CTX, 'fetchStart'); dispatch({ type: A.FETCH_START }); }, []);
  const fetchSuccess = useCallback((notifications) => { logger.info(CTX, `fetchSuccess: ${notifications.length}`); dispatch({ type: A.FETCH_SUCCESS, payload: notifications }); }, []);
  const fetchError   = useCallback((error) => { logger.error(CTX, error); dispatch({ type: A.FETCH_ERROR, payload: error }); }, []);
  const markRead     = useCallback((id) => dispatch({ type: A.MARK_READ, payload: id }), []);
  const markAllRead  = useCallback(() => dispatch({ type: A.MARK_ALL_READ }), []);
  const setTopN      = useCallback((n) => dispatch({ type: A.SET_TOP_N, payload: n }), []);

  return (
    <PriorityContext.Provider value={{ state, fetchStart, fetchSuccess, fetchError, markRead, markAllRead, setTopN }}>
      {children}
    </PriorityContext.Provider>
  );
}

export function usePriorityStore() {
  const ctx = useContext(PriorityContext);
  if (!ctx) throw new Error('usePriorityStore must be used inside PriorityProvider');
  return ctx;
}
