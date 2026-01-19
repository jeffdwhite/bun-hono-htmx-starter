// =============================================================================
// IMPORTS
// =============================================================================
// 2. App
import { NotFoundError } from "@app/error/types.ts";

// 3. Features
import * as repository from "./repository.ts";

// 4. Lib
import type { DocRow } from "@server/db/database.ts";

// =============================================================================
// INTERFACES
// =============================================================================
export interface DocWithNavigation {
  doc: DocRow;
  prev: DocRow | null;
  next: DocRow | null;
}

export interface NavItem {
  id: number;
  label: string;
  slug: string | null;
  icon: string | null;
  children?: NavItem[];
}

// =============================================================================
// SERVICES
// =============================================================================
// Get all docs for listing
export function listDocs(): DocRow[] {
  return repository.getAllDocs();
}

// Get a doc by slug with navigation info
export function getDoc(slug: string): DocWithNavigation {
  const doc = repository.getDocBySlug(slug);

  if (!doc) {
    throw new NotFoundError(`Documentation page not found: ${slug}`);
  }

  const { prev, next } = repository.getAdjacentDocs(doc.sort_order);

  return { doc, prev, next };
}

// Build navigation tree from flat nav items
export function getNavigation(): NavItem[] {
  const items = repository.getNavWithSlugs();

  // Build tree structure
  const itemMap = new Map<number, NavItem>();
  const roots: NavItem[] = [];

  // First pass: create all items
  for (const item of items) {
    itemMap.set(item.id, {
      id: item.id,
      label: item.label,
      slug: item.slug,
      icon: item.icon,
      children: [],
    });
  }

  // Second pass: build tree
  for (const item of items) {
    const navItem = itemMap.get(item.id);
    if (!navItem) continue;

    if (item.parent_id === null) {
      roots.push(navItem);
    } else {
      const parent = itemMap.get(item.parent_id);
      if (parent) {
        parent.children = parent.children || [];
        parent.children.push(navItem);
      }
    }
  }

  return roots;
}
