import type { AppError } from "./types.ts";

interface ErrorPageProps {
  error: Error | AppError;
  showDetails?: boolean;
}

// =============================================================================
// COMPONENTS
// =============================================================================
function ErrorIcon() {
  return (
    <div class="error-icon error-icon-error">
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
    </div>
  );
}

function NotFoundIcon() {
  return (
    <div class="error-icon error-icon-not-found">
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </div>
  );
}

// =============================================================================
// ERROR RENDER
// =============================================================================
export function ErrorPage({ error, showDetails = false }: ErrorPageProps) {
  const statusCode = "status" in error ? error.status : 500;
  const isNotFound = statusCode === 404;
  const code = "code" in error ? error.code : "INTERNAL_ERROR";

  return (
    <div class="error-page">
      <div class="error-content">
        {isNotFound ? <NotFoundIcon /> : <ErrorIcon />}
        <h1 class="error-status">{statusCode}</h1>
        <p class="error-message">{error.message}</p>
        {showDetails && <p class="error-code">Error code: {code}</p>}
        <a href="/" class="btn btn-primary">
          Go Home
        </a>
      </div>
    </div>
  );
}

export function ErrorBanner({ error }: { error: Error | AppError }) {
  return (
    <div class="error-banner">
      <span class="error-banner-message">{error.message}</span>
      <button
        type="button"
        class="error-banner-close"
        onclick="this.parentElement.remove()"
      >
        ×
      </button>
    </div>
  );
}
