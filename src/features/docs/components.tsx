import { docsRoutes } from "./route.ts";
import type { DocWithNavigation, NavItem } from "./service.ts";

// =============================================================================
// INTERFACES
// =============================================================================

interface DocsListProps {
  items: NavItem[];
  currentSlug?: string;
}

interface NavItemProps {
  item: NavItem;
  currentSlug?: string;
}

interface DocNavigationProps {
  prev: DocWithNavigation["prev"];
  next: DocWithNavigation["next"];
}

// =============================================================================
// HELPER COMPONENTS
// =============================================================================
// Props pattern used below as an alternative
function NavItemComponent({ item, currentSlug }: NavItemProps) {
  const isActive = item.slug === currentSlug;
  const hasChildren = item.children && item.children.length > 0;

  return (
    <li class={`nav-item ${isActive ? "active" : ""}`}>
      {item.slug ? (
        <a
          href={docsRoutes.paths.doc(item.slug)}
          class={`nav-link ${isActive ? "active" : ""}`}
          hx-get={docsRoutes.paths.doc(item.slug)}
          hx-target="#content"
          hx-push-url="true"
        >
          {item.icon && <span class="nav-icon">{item.icon}</span>}
          {item.label}
        </a>
      ) : (
        <span class="nav-label">
          {item.icon && <span class="nav-icon">{item.icon}</span>}
          {item.label}
        </span>
      )}
      {hasChildren && item.children && (
        <ul class="nav-children">
          {item.children.map((child) => (
            <NavItemComponent item={child} currentSlug={currentSlug} />
          ))}
        </ul>
      )}
    </li>
  );
}

// =============================================================================
// PRIMARY COMPONENTS
// =============================================================================
// Props pattern used below as an alternative
export function DocsList({ items, currentSlug }: DocsListProps) {
  return (
    <nav class="docs-nav">
      <ul class="nav-list">
        {items.map((item) => (
          <NavItemComponent item={item} currentSlug={currentSlug} />
        ))}
      </ul>
    </nav>
  );
}

// Props pattern used below as an alternative
export function DocNavigation({ prev, next }: DocNavigationProps) {
  if (!prev && !next) return null;

  return (
    <nav class="doc-navigation">
      {prev ? (
        <a
          href={docsRoutes.paths.doc(prev.slug)}
          class="doc-nav-link prev"
          hx-get={docsRoutes.paths.doc(prev.slug)}
          hx-target="#content"
          hx-push-url="true"
        >
          <span class="doc-nav-direction">Previous</span>
          <span class="doc-nav-title">{prev.title}</span>
        </a>
      ) : (
        <div />
      )}
      {next ? (
        <a
          href={docsRoutes.paths.doc(next.slug)}
          class="doc-nav-link next"
          hx-get={docsRoutes.paths.doc(next.slug)}
          hx-target="#content"
          hx-push-url="true"
        >
          <span class="doc-nav-direction">Next</span>
          <span class="doc-nav-title">{next.title}</span>
        </a>
      ) : (
        <div />
      )}
    </nav>
  );
}
