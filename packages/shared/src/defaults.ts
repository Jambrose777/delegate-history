export const DEFAULT_BACKEND_HOST = '127.0.0.1';
export const DEFAULT_BACKEND_PORT = 3001;
export const DEFAULT_BACKEND_ORIGIN = `http://${DEFAULT_BACKEND_HOST}:${DEFAULT_BACKEND_PORT}`;
// The packaged desktop app's main process reuses this fixed default when
// picking a free port for its bundled `next start` child process (falling
// back to another available port if it's already taken), the same way the
// backend already does with `DEFAULT_BACKEND_PORT`.
export const DEFAULT_FRONTEND_PORT = 3000;
export const DEFAULT_FRONTEND_ORIGIN = `http://localhost:${DEFAULT_FRONTEND_PORT}`;
export const DEFAULT_APPLICATION_DATA_DIRECTORY = '.data';
export const DEFAULT_DATABASE_FILENAME = 'delegate-history.sqlite';

// How long a "saved" save-status toast remains visible before it auto-dismisses.
export const SAVED_TOAST_DURATION_MS = 3000;

// Timing for the shared loading component. A pending request only shows the
// spinner after it has been pending this long, avoiding a flash of loading
// state for fast requests.
export const LOADING_INDICATOR_DELAY_MS = 200;

// Once shown, the loading indicator stays visible for at least this long
// before loaded content can replace it, avoiding a flicker when a request
// settles just after the indicator appears.
export const LOADING_INDICATOR_MIN_DURATION_MS = 300;

// How long a completed mutation's outcome (keyed by a client-generated
// idempotency key) is retained so a retried request replays the original
// outcome instead of repeating the mutation.
export const MUTATION_IDEMPOTENCY_RETENTION_MS = 86_400_000; // 24 hours
