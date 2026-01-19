import { docsRoutes } from "@features/docs/route.ts";
import type { SearchResult } from "@server/db/database.ts";

interface SearchResultsProps {
  results: SearchResult[];
  query: string;
}

// =============================================================================
// SEARCH RESULTS RENDER
// =============================================================================
// Props pattern used below as an alternative
export function renderSearchResults({ results, query }: SearchResultsProps) {
  if (!query.trim()) {
    return <div class="search-empty"></div>;
  }

  if (results.length === 0) {
    return (
      <div class="search-no-results">
        <p>No results found for "{query}"</p>
      </div>
    );
  }

  return (
    <ul class="search-results-list">
      {results.map((result) => (
        <li class="search-result-item">
          <a
            href={docsRoutes.paths.doc(result.slug)}
            class="search-result-link"
            hx-get={docsRoutes.paths.doc(result.slug)}
            hx-target="#content"
            hx-push-url="true"
          >
            <span class="search-result-title">{result.title}</span>
            {result.description && (
              <span class="search-result-description">
                {result.description}
              </span>
            )}
          </a>
        </li>
      ))}
    </ul>
  );
}
