-- Documentation pages
create table if not exists docs (
  id integer primary key autoincrement,
  slug text unique not null,
  title text not null,
  content text not null,
  description text,
  parent_id integer references docs (id),
  sort_order integer default 0,
  created_at text default current_timestamp,
  updated_at text default current_timestamp
);

-- Navigation structure
create table if not exists nav (
  id integer primary key autoincrement,
  doc_id integer references docs (id),
  label text not null,
  parent_id integer references nav (id),
  sort_order integer default 0,
  icon text
);

-- Full-text search index
create virtual table if not exists docs_fts using fts5 (
  title,
  content,
  description,
  content = docs,
  content_rowid = id
);

-- Triggers to keep FTS index in sync
create trigger if not exists docs_ai
after insert on docs
begin
insert into
  docs_fts (rowid, title, content, description)
values
  (new.id, new.title, new.content, new.description);

end;

create trigger if not exists docs_ad
after delete on docs
begin
insert into
  docs_fts (docs_fts, rowid, title, content, description)
values
  (
    'delete',
    old.id,
    old.title,
    old.content,
    old.description
  );

end;

create trigger if not exists docs_au
after
update on docs
begin
insert into
  docs_fts (docs_fts, rowid, title, content, description)
values
  (
    'delete',
    old.id,
    old.title,
    old.content,
    old.description
  );

insert into
  docs_fts (rowid, title, content, description)
values
  (new.id, new.title, new.content, new.description);

end;
