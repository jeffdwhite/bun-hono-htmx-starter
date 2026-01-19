import { z } from "zod";

export const SearchQuerySchema = z.object({
  q: z
    .string()
    .max(200)
    .default("")
    .transform((val) => {
      const trimmed = val.trim();
      // Require at least 2 characters for a meaningful search
      return trimmed.length < 2 ? "" : trimmed;
    }),
});

export type SearchQuery = z.infer<typeof SearchQuerySchema>;
