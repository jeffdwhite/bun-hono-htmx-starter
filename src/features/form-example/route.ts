// =============================================================================
// IMPORTS
// =============================================================================
// 1. External libraries
import { Hono } from "hono";

// 3. Features
import { renderFormPage, renderFormSuccess } from "./page.tsx";
import { ContactFormSchema } from "./validation.ts";

// 4. Lib
import { renderResponse } from "@shared/utils.ts";

// =============================================================================
// ROUTE DEFINITIONS
// =============================================================================
export const formRoutes = {
  paths: {
    formIndex: () => "/form",
  },
  routePatterns: {
    formIndex: "/",
  },
};

// =============================================================================
// ROUTE IMPLEMENTATIONS
// =============================================================================
export const formApp = new Hono();

// Display form
formApp.get(formRoutes.routePatterns.formIndex, (c) => {
  return renderResponse(c, renderFormPage());
});

// Handle form submission
formApp.post(formRoutes.routePatterns.formIndex, async (c) => {
  const formData = await c.req.formData();
  const data = {
    name: formData.get("name")?.toString() ?? "",
    email: formData.get("email")?.toString() ?? "",
    message: formData.get("message")?.toString() ?? "",
  };

  const result = ContactFormSchema.safeParse(data);

  if (!result.success) {
    const errors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const field = issue.path[0] as string;
      errors[field] = issue.message;
    }
    return c.html(renderFormPage(errors, data));
  }

  return c.html(renderFormSuccess(result.data));
});
