// =============================================================================
// IMPORTS
// =============================================================================
// 1. External libraries
import { Hono } from "hono";

// 3. Features
import { renderHomePage } from "./page.tsx";

// 4. Lib
import { renderResponse } from "@shared/utils.ts";

// =============================================================================
// ROUTE DEFINITIONS
// =============================================================================
export const homeRoutes = {
  paths: {
    homeIndex: () => "/",
  },
  routePatterns: {
    homeIndex: "/",
  },
};

// =============================================================================
// ROUTE IMPLEMENTATIONS
// =============================================================================
export const homeApp = new Hono();

homeApp.get(homeRoutes.routePatterns.homeIndex, (c) => {
  return renderResponse(c, renderHomePage());
});

// Example: accessing context variables set by middleware
homeApp.get("/debug", (c) => {
  const visitorId = c.get("visitorId");
  const { userAgent, isHtmx, timestamp } = c.get("request");

  return c.json({
    visitorId,
    userAgent,
    isHtmx,
    timestamp: new Date(timestamp).toISOString(),
  });
});
