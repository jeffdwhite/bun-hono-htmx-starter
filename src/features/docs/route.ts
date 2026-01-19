// =============================================================================
// IMPORTS
// =============================================================================
// 1. External libraries
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

// 3. Features
import { renderDocsIndex, renderDocPage } from "./page.tsx";
import { getDoc, getNavigation } from "./service.ts";
import { DocSlugSchema } from "./validation.ts";

// 4. Lib
import { renderResponse } from "@shared/utils.ts";

// =============================================================================
// ROUTE DEFINITIONS
// =============================================================================
export const docsRoutes = {
  paths: {
    list: () => "/docs",
    doc: (slug: string) => `/docs/${slug}`,
  },
  routePatterns: {
    list: "/",
    doc: "/:slug",
  },
};

// =============================================================================
// ROUTE IMPLEMENTATIONS
// =============================================================================
export const docsApp = new Hono();

// Docs index
docsApp.get(docsRoutes.routePatterns.list, (c) => {
  const navigation = getNavigation();
  return renderResponse(c, renderDocsIndex(navigation));
});

// Doc detail (must be last due to :slug pattern)
docsApp.get(
  docsRoutes.routePatterns.doc,
  zValidator("param", DocSlugSchema),
  (c) => {
    const { slug } = c.req.valid("param");
    const data = getDoc(slug);
    const navigation = getNavigation();
    return renderResponse(c, renderDocPage(data, navigation));
  }
);
