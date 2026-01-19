// =============================================================================
// IMPORTS
// =============================================================================
// 1. External libraries
import type { ErrorHandler, NotFoundHandler } from "hono/types";
import type { ContentfulStatusCode } from "hono/utils/http-status";

// 2. App
import { AppError, NotFoundError } from "./types.ts";
import { ErrorPage, ErrorBanner } from "./page.tsx";

// =============================================================================
// HANDLERS
// =============================================================================
// Generic error handler
export const errorHandler: ErrorHandler = (err, c) => {
  const isHtmx = c.req.header("HX-Request");
  const isDev = process.env.NODE_ENV === "development";

  console.error(`[Error] ${err.message}`, err.stack);

  // Determine status code
  const status = err instanceof AppError ? err.status : 500;

  // For HTMX requests, target the error container
  if (isHtmx) {
    c.header("HX-Retarget", "#error-container");
    c.header("HX-Reswap", "innerHTML");
    return c.html(<ErrorBanner error={err} />, status as ContentfulStatusCode);
  }

  // For full page requests, render error page with layout
  c.status(status as ContentfulStatusCode);
  return c.render(<ErrorPage error={err} showDetails={isDev} />);
};

// Delegate to errorHandler - keeps error rendering logic in one place
export const notFoundHandler: NotFoundHandler = (c) => {
  const err = new NotFoundError(`Page not found: ${c.req.path}`);
  return errorHandler(err, c);
};
