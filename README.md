# Mauli Medical College — Website

A dynamic website for **Mauli Medical College, Hospital & Research Center**, built with
**Next.js 16 (App Router) + Supabase + Tailwind v4 + SCSS + Motion**.

Every page's content is editable from a protected **admin panel** — no code changes
needed to update text, departments, faculty, news or to read contact messages.

---

## Tech stack

| Concern        | Choice                                              |
| -------------- | --------------------------------------------------- |
| Framework      | Next.js 16 (App Router, Server Components, Actions)  |
| Database/Auth  | Supabase (Postgres + Row Level Security + Auth)      |
| Styling        | Tailwind CSS v4 (`@theme`) + SCSS theme tokens       |
| Animations     | Motion (`motion/react`)                              |
| Language       | TypeScript                                           |

---

## One-time theme / colour setup

All brand colours live in **one file**: [`src/styles/theme.scss`](src/styles/theme.scss).
They are emitted as CSS variables and bridged into Tailwind in
[`src/app/globals.css`](src/app/globals.css), so utilities like `bg-primary`,
`text-accent`, `bg-surface` all trace back to that single source. Change a colour
there and it updates across the whole site.

---

## Getting started

### 1. Use the right Node version

```bash
nvm use            # reads .nvmrc (Node 20)
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Supabase

`.env.local` already contains the project URL. Add your **publishable / anon key**:

```env
NEXT_PUBLIC_SUPABASE_URL=https://jwwzphaoqdzccujavces.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_xxxxxxxxxxxxxxxxxxxxx
```

> Find it in **Supabase Dashboard → Project Settings → API Keys → Publishable key**.
> The publishable key is safe in the browser; RLS protects your data.
> Never put the **secret** key in this file.

### 4. Create the database schema

Open **Supabase Dashboard → SQL Editor → New query**, paste the contents of
[`supabase/schema.sql`](supabase/schema.sql), and run it. This creates all tables,
Row-Level-Security policies, and seeds the 21 departments + sample news.

### 5. Create an admin user

In **Supabase Dashboard → Authentication → Users → Add user**, create a user with an
email + password (and tick "Auto confirm"). That account can sign in at `/admin`.

### 6. Run the dev server

```bash
npm run dev
```

- Public site: <http://localhost:3000>
- Admin panel: <http://localhost:3000/admin>

---

## Admin panel

Sign in at `/admin`. From there you can edit:

| Section          | What it controls                                              |
| ---------------- | ------------------------------------------------------------ |
| **Page Content** | Home hero/stats/highlights, About, Admissions, site info — all text on the "static" pages, via friendly forms. |
| **Departments**  | The 21 department pages (add / edit / delete / reorder).      |
| **Faculty**      | Faculty profiles.                                            |
| **News**         | News & notices, with draft/published status.                |
| **Messages**     | Contact-form submissions (mark handled / delete).           |

Changes are reflected on the public site immediately (pages are revalidated on save).

---

## Project structure

```
src/
  app/
    (site)/            Public pages (home, about, departments, faculty, news, admissions, contact)
    admin/             Protected admin panel (login + dashboard + CRUD + content editor)
  components/
    layout/            Header, footer, page hero
    ui/                Motion primitives + styled primitives (Button, Card, Section…)
    admin/             Admin nav, form helpers, content editor
  lib/
    supabase/          Browser + server clients, proxy/session helper, DB types
    content-schema.ts  Editable content blocks (defaults + form schema)
    content.ts         Server accessors for content
    data.ts            Data-access helpers (departments, faculty, news)
    site.ts            Navigation + static site constants
  styles/
    theme.scss         ⭐ single source of truth for brand colours
  proxy.ts             Auth session refresh + /admin route protection
supabase/
  schema.sql           Database schema, RLS policies, seed data
```

---

## Useful commands

```bash
npm run dev      # start dev server
npm run build    # production build
npm run start    # run the production build
npm run lint     # lint
```
