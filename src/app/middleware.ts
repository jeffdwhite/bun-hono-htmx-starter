import type { MiddlewareHandler } from "hono";
import { getCookie, setCookie } from "hono/cookie";

/**
 * Request logging middleware.
 * Logs method, path, status, and response time for each request.
 *
 * Example output:
 *   GET /docs/getting-started 200 12ms
 */
export const logger = (): MiddlewareHandler => {
  return async (c, next) => {
    const path = c.req.path;

    // Skip logging for static files
    if (path.startsWith("/static")) {
      return next();
    }

    const start = performance.now();
    const method = c.req.method;

    await next();

    const duration = (performance.now() - start).toFixed(0);
    const status = c.res.status;

    console.log(`${method} ${path} ${status} ${duration}ms`);
  };
};

/**
 * Request timing middleware.
 * Adds Server-Timing header for performance monitoring.
 *
 * The timing can be viewed in browser DevTools Network tab.
 */
export const timing = (): MiddlewareHandler => {
  return async (c, next) => {
    // Skip timing for static files
    if (c.req.path.startsWith("/static")) {
      return next();
    }

    const start = performance.now();

    await next();

    const duration = (performance.now() - start).toFixed(2);
    c.header("Server-Timing", `total;dur=${duration}`);
  };
};

/**
 * Example: Cookie middleware.
 * Demonstrates reading cookies and setting new ones.
 *
 * Usage:
 *   app.use("*", cookies());
 *
 * Then in routes:
 *   const visitorId = c.get("visitorId");
 */
export const cookies = (): MiddlewareHandler => {
  return async (c, next) => {

    // Read existing cookie or generate new visitor ID
    let visitorId = getCookie(c, "visitor_id");

    if (!visitorId) {
      visitorId = crypto.randomUUID();
      // Set cookie for 1 year
      setCookie(c, "visitor_id", visitorId, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Lax",
        maxAge: 60 * 60 * 24 * 365,
      });
    }

    // Store in context for use in handlers
    c.set("visitorId", visitorId);

    await next();
  };
};

/**
 * Example: Request context middleware.
 * Demonstrates enriching context with computed values.
 *
 * Use c.set() to store values, c.get() to retrieve them.
 * Values are typed via Hono's Variables generic.
 *
 * Usage:
 *   app.use("*", requestContext());
 *
 * Then in routes:
 *   const { userAgent, isHtmx } = c.get("request");
 */
export const requestContext = (): MiddlewareHandler => {
  return async (c, next) => {
    const request = {
      userAgent: c.req.header("User-Agent") ?? "unknown",
      isHtmx: c.req.header("HX-Request") === "true",
      isBoosted: c.req.header("HX-Boosted") === "true",
      acceptsJson:
        c.req.header("Accept")?.includes("application/json") ?? false,
      timestamp: Date.now(),
    };

    // Store computed context
    c.set("request", request);

    await next();
  };
};
