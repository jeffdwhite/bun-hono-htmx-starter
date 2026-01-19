import { Database } from "bun:sqlite";

const DB_PATH = process.env.DB_PATH || "./data/docs.db";

// Create database connection
export const db = new Database(DB_PATH, { create: true });

// Enable WAL mode for better concurrency
db.run("PRAGMA journal_mode = WAL");

// Type definitions for database rows
export interface DocRow {
  id: number;
  slug: string;
  title: string;
  content: string;
  description: string | null;
  parent_id: number | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface NavRow {
  id: number;
  doc_id: number | null;
  label: string;
  parent_id: number | null;
  sort_order: number;
  icon: string | null;
}

export interface SearchResult {
  id: number;
  slug: string;
  title: string;
  description: string | null;
  rank: number;
}

// Graceful shutdown - checkpoint WAL and close connection
process.on("SIGINT", () => {
  db.close();
  process.exit(0);
});

process.on("SIGTERM", () => {
  db.close();
  process.exit(0);
});
