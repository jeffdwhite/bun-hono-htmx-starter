import { db, type DocRow, type NavRow } from "@server/db/database.ts";

// Get all documentation pages ordered by sort_order
// NOT USED, PLACEHOLDER
export function getAllDocs(): DocRow[] {
  return db.query("SELECT * FROM docs ORDER BY sort_order").all() as DocRow[];
}

// Get a single doc by slug
export function getDocBySlug(slug: string): DocRow | null {
  return db
    .query("SELECT * FROM docs WHERE slug = ?")
    .get(slug) as DocRow | null;
}

// Get all navigation items with their associated doc slugs
export function getNavWithSlugs(): Array<NavRow & { slug: string | null }> {
  return db
    .query(
      `
      select
        nav.*,
        docs.slug
      from
        nav
        left join docs on nav.doc_id = docs.id
      order by
        nav.sort_order
    `
    )
    .all() as Array<NavRow & { slug: string | null }>;
}

// Get previous and next docs for navigation.
export function getAdjacentDocs(currentSortOrder: number): {
  prev: DocRow | null;
  next: DocRow | null;
} {
  const prev = db
    .query(
      "SELECT * FROM docs WHERE sort_order < ? ORDER BY sort_order DESC LIMIT 1"
    )
    .get(currentSortOrder) as DocRow | null;

  const next = db
    .query(
      "SELECT * FROM docs WHERE sort_order > ? ORDER BY sort_order ASC LIMIT 1"
    )
    .get(currentSortOrder) as DocRow | null;

  return { prev, next };
}
