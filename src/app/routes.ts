// =============================================================================
// IMPORTS
// =============================================================================
// 1. External libraries
import type { Hono } from "hono";

// 3. Features
import { homeApp, homeRoutes } from "@features/home/route.ts";
import { docsApp, docsRoutes } from "@features/docs/route.ts";
import { formApp, formRoutes } from "@features/form-example/route.ts";
import { modalApp, modalRoutes } from "@features/modal-example/route.ts";
import { searchApp, searchRoutes } from "@features/search/route.ts";

// =============================================================================
// EXPORT ROUTES
// =============================================================================
export const routes = {
  home: homeRoutes,
  docs: docsRoutes,
  form: formRoutes,
  modal: modalRoutes,
  search: searchRoutes,
};

export function registerRoutes(app: Hono) {
  app.route("/", homeApp);
  app.route("/docs", docsApp);
  app.route("/form", formApp);
  app.route("/modal", modalApp);
  app.route("/search", searchApp);
}
