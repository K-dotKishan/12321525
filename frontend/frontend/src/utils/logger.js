// Simple logger utility — wraps console with level prefixes
const isDev = import.meta.env.DEV;

const logger = {
  debug: (ctx, ...args) => {
    if (isDev) console.debug(`[DEBUG][${ctx}]`, ...args);
  },
  info: (ctx, ...args) => {
    if (isDev) console.info(`[INFO][${ctx}]`, ...args);
  },
  warn: (ctx, ...args) => {
    console.warn(`[WARN][${ctx}]`, ...args);
  },
  error: (ctx, ...args) => {
    console.error(`[ERROR][${ctx}]`, ...args);
  },
};

export default logger;
