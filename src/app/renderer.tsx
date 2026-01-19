import { jsxRenderer, useRequestContext } from "hono/jsx-renderer";
import { docsRoutes } from "@features/docs/route.ts";
import { formRoutes } from "@features/form-example/route.ts";
import { modalRoutes } from "@features/modal-example/route.ts";
import { searchRoutes } from "@features/search/route.ts";

// =============================================================================
// COMPONENTS
// =============================================================================
function TopBar({ currentPath }: { currentPath: string }) {
  return (
    <header class="header">
      <a href="/" class="logo">
        Docs
      </a>
      <nav class="nav">
        <a
          href={docsRoutes.paths.list()}
          class={`nav-link ${currentPath.startsWith("/docs") ? "active" : ""}`}
        >
          Documentation
        </a>
        <a
          href={formRoutes.paths.formIndex()}
          class={`nav-link ${currentPath.startsWith("/form") ? "active" : ""}`}
        >
          Form Example
        </a>
        <a
          href={modalRoutes.paths.modalIndex()}
          class={`nav-link ${currentPath.startsWith("/modal") ? "active" : ""}`}
        >
          Modal Example
        </a>
      </nav>
      <div class="search-container">
        <input
          type="search"
          name="q"
          placeholder="Search docs..."
          class="search-input"
          hx-get={searchRoutes.paths.search()}
          hx-trigger="keyup changed delay:300ms"
          hx-target="#search-results"
        />
        <div id="search-results" class="search-results"></div>
      </div>
    </header>
  );
}

// =============================================================================
// JSX RENDERER MIDDLEWARE
// =============================================================================
export const renderer = jsxRenderer(
  ({ children }) => {
    const c = useRequestContext();
    const currentPath = c.req.path;

    return (
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>Documentation</title>
          <link rel="icon" href="/static/favicon.svg" type="image/svg+xml" />
          <link rel="stylesheet" href="/static/css/styles.css" />
          {/* htmx core */}
          <script src="/static/js/htmx.min.js"></script>
          {/* js custom add ons */}
          <script src="/static/js/app.js" defer></script>
        </head>
        <body>
          <div class="layout">
            <TopBar currentPath={currentPath} />
            <main class="main">
              <div id="error-container"></div>
              <div id="content">{children}</div>
            </main>
          </div>
        </body>
      </html>
    );
  },
  { docType: true }
);
