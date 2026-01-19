import type { Context } from "hono";
import type { HtmlEscapedString } from "hono/utils/html";

/**
 * Render response based on request type.
 * Returns partial HTML for HTMX requests, full page for regular requests.
 */
export function renderResponse(
  c: Context,
  content: HtmlEscapedString | Promise<HtmlEscapedString>
) {
  return c.req.header("HX-Request") ? c.html(content) : c.render(content);
}

// THE BELOW ARE NOT USED IN THIS EXAMPLE - KEPT BECAUSE USEFUL
// used for htmx redirect inside a POST or PUT, where it comes at the end

// Creates boilerplate once for full page render redirects
export function htmxFullRedirect(c: Context, path: string) {
  c.header("HX-Redirect", path);
  return c.body(null, 200);
}

// Creates boilerplate once for partial page render redirects
export function htmxPartialRedirect(c: Context, path: string, target: string) {
  c.header("HX-Location", JSON.stringify({ path, target }));
  return c.body(null, 200);
}
