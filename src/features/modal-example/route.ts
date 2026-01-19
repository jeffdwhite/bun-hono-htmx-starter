// =============================================================================
// IMPORTS
// =============================================================================
// 1. External libraries
import { Hono } from "hono";

// 3. Features
import { renderModal } from "./dialog.tsx";
import { renderModalPage } from "./page.tsx";

// 4. Lib
import { renderResponse } from "@shared/utils.ts";

// =============================================================================
// ROUTE DEFINITIONS
// =============================================================================
export const modalRoutes = {
  paths: {
    modalIndex: () => "/modal",
    dialog: () => "/modal/dialog",
  },
  routePatterns: {
    modalIndex: "/",
    dialog: "/dialog",
  },
};

// =============================================================================
// ROUTE IMPLEMENTATIONS
// =============================================================================
export const modalApp = new Hono();

// Display the modal example page
modalApp.get(modalRoutes.routePatterns.modalIndex, (c) => {
  return renderResponse(c, renderModalPage());
});

// Return the modal HTML (called via HTMX)
modalApp.get(modalRoutes.routePatterns.dialog, (c) => {
  return c.html(renderModal());
});
