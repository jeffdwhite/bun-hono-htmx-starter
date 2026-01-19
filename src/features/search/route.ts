// =============================================================================
// IMPORTS
// =============================================================================
// 1. External libraries
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

// 3. Features
import { renderSearchResults } from "./page.tsx";
import { search } from "./service.ts";
import { SearchQuerySchema } from "./validation.ts";

// =============================================================================
// ROUTE DEFINITIONS
// =============================================================================
export const searchRoutes = {
  paths: {
    search: () => "/search",
  },
  routePatterns: {
    search: "/",
  },
};

// =============================================================================
// ROUTE IMPLEMENTATIONS
// =============================================================================
export const searchApp = new Hono();

// Search endpoint
searchApp.get(
  searchRoutes.routePatterns.search,
  zValidator("query", SearchQuerySchema),
  (c) => {
    const { q } = c.req.valid("query");
    const results = search(q);
    return c.html(renderSearchResults({ results, query: q }));
  }
);
