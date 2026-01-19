import { join } from "node:path";
import { db } from "./database.ts";

// schema.sql is in the same directory as this file
const SCHEMA_PATH = join(import.meta.dir, "schema.sql");
// content/ is at project root (scripts run from there)
const CONTENT_DIR = "./content";

// Document metadata - add new pages here
const docsMeta: Array<{
  slug: string;
  title: string;
  description: string;
  sort_order: number;
}> = [
  {
    slug: "getting-started",
    title: "Getting Started",
    description: "Learn how to set up and run the project",
    sort_order: 1,
  },
  {
    slug: "architecture",
    title: "Architecture",
    description: "Overview of the project structure and patterns",
    sort_order: 2,
  },
  {
    slug: "routing",
    title: "Routing",
    description: "How routes are defined and organized",
    sort_order: 3,
  },
  {
    slug: "htmx-integration",
    title: "HTMX Integration",
    description: "Using HTMX for interactive features",
    sort_order: 4,
  },
  {
    slug: "database",
    title: "Database",
    description: "Working with SQLite and the data layer",
    sort_order: 5,
  },
  {
    slug: "error-handling",
    title: "Error Handling",
    description: "How errors are handled and displayed",
    sort_order: 6,
  },
];

// Helper function
async function loadContent(slug: string): Promise<string> {
  const filePath = join(CONTENT_DIR, `${slug}.html`);
  const file = Bun.file(filePath);

  if (!(await file.exists())) {
    throw new Error(`Content file not found: ${filePath}`);
  }

  return await file.text();
}

// Main function
async function seed() {
  // Initialize the database schema
  const schema = await Bun.file(SCHEMA_PATH).text();
  db.run(schema);

  // Clear existing data
  db.run("DELETE FROM nav");
  db.run("DELETE FROM docs");

  // Insert docs
  const insertDoc = db.prepare(`
    INSERT INTO docs (slug, title, content, description, sort_order)
    VALUES ($slug, $title, $content, $description, $sort_order)
  `);

  for (const meta of docsMeta) {
    const content = await loadContent(meta.slug);
    insertDoc.run({
      $slug: meta.slug,
      $title: meta.title,
      $content: content,
      $description: meta.description,
      $sort_order: meta.sort_order,
    });
  }

  // Create navigation entries
  const insertNav = db.prepare(`
    INSERT INTO nav (doc_id, label, sort_order, icon)
    VALUES ($doc_id, $label, $sort_order, $icon)
  `);

  const docsWithIds = db
    .query("SELECT id, slug, title, sort_order FROM docs ORDER BY sort_order")
    .all() as Array<{
    id: number;
    slug: string;
    title: string;
    sort_order: number;
  }>;

  for (const doc of docsWithIds) {
    insertNav.run({
      $doc_id: doc.id,
      $label: doc.title,
      $sort_order: doc.sort_order,
      $icon: null,
    });
  }

  console.log(
    `✓ Database initialized at ${process.env.DB_PATH || "./data/docs.db"}`
  );
  console.log(`✓ Loaded content from ${CONTENT_DIR}/`);
  console.log(`✓ Inserted ${docsMeta.length} documentation pages`);
  console.log(`✓ Created ${docsWithIds.length} navigation entries`);
}

seed().catch(console.error);
