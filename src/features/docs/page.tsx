// =============================================================================
// IMPORTS
// =============================================================================
// 1. External libraries
import { raw } from "hono/html";

// 3. Features
import { DocsList, DocNavigation } from "./components.tsx";
import { docsRoutes } from "./route.ts";
import type { DocWithNavigation, NavItem } from "./service.ts";

// =============================================================================
// DOC PAGES RENDER
// =============================================================================
export function renderDocPage(data: DocWithNavigation, navigation: NavItem[]) {
  const { doc, prev, next } = data;

  return (
    <div class="docs-layout">
      <aside class="docs-sidebar">
        <DocsList items={navigation} currentSlug={doc.slug} />
      </aside>
      <article class="docs-content">
        <div class="doc-body">{raw(doc.content)}</div>
        <DocNavigation prev={prev} next={next} />
      </article>
    </div>
  );
}

export function renderDocsIndex(navigation: NavItem[]) {
  return (
    <div class="docs-layout">
      <aside class="docs-sidebar">
        <DocsList items={navigation} />
      </aside>
      <article class="docs-content">
        <h1>Documentation</h1>
        <p>Select a page from the sidebar to get started.</p>
        <ul class="docs-index-list">
          {navigation.map((item) => (
            <li>
              {item.slug ? (
                <a href={docsRoutes.paths.doc(item.slug)}>{item.label}</a>
              ) : (
                <span>{item.label}</span>
              )}
            </li>
          ))}
        </ul>
      </article>
    </div>
  );
}
