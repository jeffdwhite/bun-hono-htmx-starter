import * as repository from "./repository.ts";
import type { SearchResult } from "@server/db/database.ts";

// Search documentation
// could we call the repo directly? sure, but for an example we keep the pattern of service -> repo
export function search(query: string): SearchResult[] {
  return repository.searchDocs(query);
}
