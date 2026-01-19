# Bun + Hono + HTMX Starter

A starter template for building documentation web apps with Bun, Hono, HTMX, and SQLite.

## Features

- **Bun** - Fast JavaScript runtime with native TypeScript and SQLite support
- **Hono** - Lightweight web framework with JSX templating
- **HTMX** - Add interactivity with HTML attributes
- **SQLite + FTS5** - Built-in full-text search
- **Pure CSS** - No build step, modern CSS features

## GenAI Disclosure

This repo is the result of many months of effort (and several structural iterations) that included significant use of Claude Code. I have reviewed all of the code in this repo and am comfortable with it - which included perfecting changes and adding fixes I made to code written by Claude Code.

## Usage Disclosure

Please note this repo is intended as a starter kit / design example / how one might create a bun + hono + htmx application. It does not include robust security, testing, auth, etc. to use as a production system out of the box. The goal was to limit the number of dependencies. Besides Hono and HTMX, the only other dependency is Zod (for form input validation). Other dependencies that I might have included are Tailwind CSS, Drizzle ORM, Remark, . . .

## Quick Start

```bash
# Install dependencies
bun install

# Initialize database with sample data
bun run db:init

# Start development server
bun run dev
```

Open <http://localhost:3000>

## Project Structure

```text
content/                    # HTML documentation files
src/
├── app/                    # Application core
│   ├── server.ts           # Hono server setup
│   ├── routes.ts           # Route registration
│   ├── renderer.tsx        # JSX layout
│   ├── middleware.ts       # Custom middleware
│   └── error/              # Error handling
├── features/               # Feature modules
│   ├── home/               # Home page
│   ├── docs/               # Documentation pages
│   ├── form-example/       # Form handling example
│   ├── modal-example/      # Modal/dialog pattern
│   └── search/             # Full-text search
└── lib/
    ├── server/db/          # SQLite database
    └── shared/             # Utilities & components
```

## Key Patterns

### Route Definition

Routes are defined centrally with type-safe path generation:

```typescript
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
```

### HTMX Partial Rendering

Use `renderResponse()` to automatically return partials for HTMX requests:

```typescript
import { renderResponse } from "@shared/utils.ts";

app.get("/page", (c) => {
  return renderResponse(c, <PageContent />);
});
```

### Error Handling

Throw typed errors that get handled appropriately:

```typescript
import { NotFoundError } from "@app/error/types.ts";

if (!doc) {
  throw new NotFoundError("Document not found");
}
```

### Middleware

Custom middleware lives in `src/app/middleware/`. The template includes examples:

```typescript
import type { MiddlewareHandler } from "hono";

// Basic middleware pattern
export const logger = (): MiddlewareHandler => {
  return async (c, next) => {
    const start = performance.now();

    await next();  // Call next middleware/route

    const duration = (performance.now() - start).toFixed(0);
    console.log(`${c.req.method} ${c.req.path} ${c.res.status} ${duration}ms`);
  };
};

// Middleware factory with options
export const conditionally = (
  condition: () => boolean,
  middleware: MiddlewareHandler
): MiddlewareHandler => {
  return async (c, next) => {
    if (condition()) {
      await middleware(c, next);
    } else {
      await next();
    }
  };
};
```

Register middleware in `server.ts` (order matters):

```typescript
app.use("*", timing());         // First: measure total time
app.use("*", securityHeaders());
app.use("*", logger());
app.use("/static/*", serveStatic({ root: "./public" }));
app.use("*", renderer);         // Last before routes
```

## Scripts

| Command | Description |
| ------- | ----------- |
| `bun run dev` | Start dev server with hot reload |
| `bun run start` | Start production server |
| `bun run db:init` | Initialize database and seed data |

## Adding Content

Documentation content lives in `content/` as HTML files:

1. Create a new HTML file in `content/` (e.g., `content/my-page.html`)
2. Add metadata to `docsMeta` array in `src/lib/server/db/seed.ts`
3. Run `bun run db:init` to reload the database

## Customization

### Styling

Edit `public/css/styles.css`. The template uses CSS custom properties for theming:

```css
:root {
  --color-primary: #2563eb;
  --color-text: #1f2937;
  /* ... */
}
```

### Adding Features

1. Create a new directory in `src/features/`
2. Add route.ts, service.ts, repository.ts as needed
3. Register routes in `src/app/routes.ts`

## License

MIT
