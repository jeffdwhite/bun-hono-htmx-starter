import { docsRoutes } from "@features/docs/route.ts";
import { formRoutes } from "@features/form-example/route.ts";

// =============================================================================
// COMPONENTS
// =============================================================================
function Hero() {
  return (
    <section class="hero">
      <h1>Documentation Template</h1>
      <p>
        A starter template for building documentation sites with Bun, Hono, and
        HTMX.
      </p>
      <div class="hero-actions">
        <a
          href={docsRoutes.paths.doc("getting-started")}
          class="btn btn-primary btn-lg"
        >
          Get Started
        </a>
        <a href={docsRoutes.paths.list()} class="btn btn-secondary btn-lg">
          Browse Docs
        </a>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section class="features">
      <h2>Features</h2>
      <div class="feature-grid">
        <div class="card">
          <div class="card-body">
            <h3>Bun Runtime</h3>
            <p>
              Fast JavaScript runtime with native TypeScript support and
              built-in SQLite.
            </p>
          </div>
        </div>
        <div class="card">
          <div class="card-body">
            <h3>Hono Framework</h3>
            <p>
              Lightweight, ultrafast web framework with JSX templating support.
            </p>
          </div>
        </div>
        <div class="card">
          <div class="card-body">
            <h3>HTMX</h3>
            <p>
              Add interactivity with HTML attributes. No JavaScript framework
              needed.
            </p>
          </div>
        </div>
        <div class="card">
          <div class="card-body">
            <h3>SQLite + FTS5</h3>
            <p>Built-in full-text search for fast documentation lookup.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function QuickLinks() {
  return (
    <section class="quick-links">
      <h2>Quick Links</h2>
      <ul class="link-list">
        <li>
          <a href={docsRoutes.paths.doc("architecture")}>
            Architecture Overview
          </a>
        </li>
        <li>
          <a href={docsRoutes.paths.doc("routing")}>Routing Guide</a>
        </li>
        <li>
          <a href={docsRoutes.paths.doc("htmx-integration")}>
            HTMX Integration
          </a>
        </li>
        <li>
          <a href={formRoutes.paths.formIndex()}>Form Example</a>
        </li>
      </ul>
    </section>
  );
}

// =============================================================================
// HOME RENDER
// =============================================================================
export function renderHomePage() {
  return (
    <div class="home">
      <Hero />
      <Features />

      <QuickLinks />

      <section class="dev-links">
        <a href="/debug" class="dev-link">
          Debug
        </a>
      </section>
    </div>
  );
}
