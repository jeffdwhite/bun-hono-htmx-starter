import { db, type SearchResult } from "@server/db/database.ts";

// Sanitize a single term for safe FTS5 usage
function sanitizeFts5Term(term: string): string {
  // Remove all FTS5 special characters: quotes, wildcards, parentheses, column prefix, modifiers
  return term.replace(/['"*()^:+-]/g, "");
}

// Check if a term is an FTS5 boolean operator
function isFts5Operator(term: string): boolean {
  const operators = ["and", "or", "not", "near"];
  return operators.includes(term.toLowerCase());
}

// Search docs using FTS5
export function searchDocs(query: string, limit: number = 10): SearchResult[] {
  if (!query.trim()) return [];

  // Split into terms, sanitize each, and filter out FTS5 operators and empty terms
  const terms = query
    .split(/\s+/)
    .map(sanitizeFts5Term)
    .filter((term) => term.length > 0 && !isFts5Operator(term));

  if (terms.length === 0) return [];

  // Quote each term and add prefix matching for safe FTS5 query
  const searchQuery = terms.map((term) => `"${term}"*`).join(" ");

  return db
    .query(
      `
      select
        docs.id,
        docs.slug,
        docs.title,
        docs.description,
        rank
      from
        docs_fts
        join docs on docs_fts.rowid = docs.id
      where
        docs_fts match ?
      order by
        rank
      limit
        ?
    `
    )
    .all(searchQuery, limit) as SearchResult[];
}
