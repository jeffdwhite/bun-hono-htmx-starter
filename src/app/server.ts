// =============================================================================
// IMPORTS
// =============================================================================
// 1. External libraries
import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { requestId } from "hono/request-id";
import { secureHeaders } from "hono/secure-headers";

// 2. App
import { renderer } from "./renderer.tsx";
import { errorHandler, notFoundHandler } from "./error/handler.tsx";
import { registerRoutes } from "./routes.ts";
import { logger, timing, cookies, requestContext } from "./middleware.ts";

// =============================================================================
// INITIALIZE HONO
// =============================================================================
/**
 * Type declarations for Hono context variables.
 * These are set by middleware and available in all route handlers.
 */
declare module "hono" {
  interface ContextVariableMap {
    visitorId: string;
    request: {
      userAgent: string;
      isHtmx: boolean;
      isBoosted: boolean;
      acceptsJson: boolean;
      timestamp: number;
    };
  }
}

// Create primary app
const app = new Hono();

// =============================================================================
// MIDDLEWARE (order matters)
// =============================================================================
// 1. Timing - must be first to measure total request time
app.use("*", timing());

// 2. Security headers - comprehensive secure headers from Hono
app.use("*", secureHeaders());

// 3. Request ID - generate unique ID for each request
app.use("*", requestId());

// 4. Logger - log requests (uses timing from step 1)
app.use("*", logger());

// 5. Cookies - visitor tracking
app.use("*", cookies());

// 6. Request context - enrich context with request metadata
app.use("*", requestContext());

// 7. Static files - serve before dynamic routes
app.use(
  "/static/*",
  serveStatic({
    root: "./public",
    rewriteRequestPath: (path) => path.replace(/^\/static/, ""),
  })
);

// 8. JSX renderer - wrap responses in layout
app.use("*", renderer);

// =============================================================================
// REGISTER ROUTES AND ERROR
// =============================================================================
// Routes
registerRoutes(app);

// Error handling
app.onError(errorHandler);
app.notFound(notFoundHandler);

// =============================================================================
// HONO
// =============================================================================
export default {
  port: process.env.PORT || 3000,
  fetch: app.fetch,
};
