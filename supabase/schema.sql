-- =============================================================
--  Medical College Site — database schema
--  Run this in: Supabase Dashboard -> SQL Editor -> New query
--  Safe to re-run (uses IF NOT EXISTS / drop-and-recreate policies).
-- =============================================================

-- ---------- Tables ----------

create table if not exists public.departments (
  id                uuid primary key default gen_random_uuid(),
  slug              text not null unique,
  name              text not null,
  short_description text,
  description       text,
  icon              text,
  image_url         text,
  sort_order        int  not null default 0,
  created_at        timestamptz not null default now()
);
-- For databases created before image_url existed:
alter table public.departments add column if not exists image_url text;

create table if not exists public.faculty (
  id             uuid primary key default gen_random_uuid(),
  name           text not null,
  designation    text,
  department     text,
  qualifications text,
  bio            text,
  photo_url      text,
  email          text,
  sort_order     int  not null default 0,
  created_at     timestamptz not null default now()
);

create table if not exists public.news (
  id              uuid primary key default gen_random_uuid(),
  slug            text not null unique,
  title           text not null,
  excerpt         text,
  content         text,
  cover_image_url text,
  category        text,
  published       boolean not null default false,
  published_at    timestamptz,
  created_at      timestamptz not null default now()
);

create table if not exists public.notices (
  id         uuid primary key default gen_random_uuid(),
  title      text not null,
  body       text,
  link       text,
  pinned     boolean not null default false,
  created_at timestamptz not null default now()
);

-- Editable content blocks for otherwise-static pages (home, about, etc.)
-- Each row is one block keyed by name; `data` is arbitrary JSON merged
-- over the code-defined defaults so pages always render.
create table if not exists public.site_content (
  key        text primary key,
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null,
  phone      text,
  subject    text,
  message    text not null,
  handled    boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists news_published_idx
  on public.news (published, published_at desc);

-- ---------- Row Level Security ----------
-- Public visitors can READ published content.
-- Only authenticated users (your admin accounts) can WRITE.

alter table public.departments      enable row level security;
alter table public.faculty          enable row level security;
alter table public.news             enable row level security;
alter table public.notices          enable row level security;
alter table public.site_content     enable row level security;
alter table public.contact_messages enable row level security;

-- Site content: public read, admin write
drop policy if exists "site_content read"  on public.site_content;
drop policy if exists "site_content write" on public.site_content;
create policy "site_content read"  on public.site_content for select using (true);
create policy "site_content write" on public.site_content for all
  to authenticated using (true) with check (true);

-- Departments: public read, admin write
drop policy if exists "departments read"  on public.departments;
drop policy if exists "departments write" on public.departments;
create policy "departments read"  on public.departments for select using (true);
create policy "departments write" on public.departments for all
  to authenticated using (true) with check (true);

-- Faculty: public read, admin write
drop policy if exists "faculty read"  on public.faculty;
drop policy if exists "faculty write" on public.faculty;
create policy "faculty read"  on public.faculty for select using (true);
create policy "faculty write" on public.faculty for all
  to authenticated using (true) with check (true);

-- News: public reads ONLY published; admins read/write everything
drop policy if exists "news read published" on public.news;
drop policy if exists "news read all admin" on public.news;
drop policy if exists "news write"          on public.news;
create policy "news read published" on public.news for select
  using (published = true);
create policy "news read all admin" on public.news for select
  to authenticated using (true);
create policy "news write" on public.news for all
  to authenticated using (true) with check (true);

-- Notices: public read, admin write
drop policy if exists "notices read"  on public.notices;
drop policy if exists "notices write" on public.notices;
create policy "notices read"  on public.notices for select using (true);
create policy "notices write" on public.notices for all
  to authenticated using (true) with check (true);

-- Contact messages: anyone may submit (insert); only admins may read/manage.
drop policy if exists "contact insert" on public.contact_messages;
drop policy if exists "contact read"   on public.contact_messages;
drop policy if exists "contact update" on public.contact_messages;
create policy "contact insert" on public.contact_messages for insert
  with check (true);
create policy "contact read" on public.contact_messages for select
  to authenticated using (true);
create policy "contact update" on public.contact_messages for update
  to authenticated using (true) with check (true);

-- ---------- Seed data (optional starter content) ----------

insert into public.departments (slug, name, short_description, image_url, sort_order) values
  ('anatomy',            'Anatomy',                  'Anatomy is the science that studies the structure of the human body and how its parts relate to one another.',                 '/images/research.jpg',         1),
  ('physiology',         'Physiology',               'Physiology is the scientific study of the functions and mechanisms that operate within a living system.',                      '/images/lab.jpg',              2),
  ('biochemistry',       'Bio Chemistry',            'Biochemistry is the application of chemistry to the study of biological processes at the cellular and molecular level.',         '/images/dept/microscope.jpg',  3),
  ('pathology',          'Pathology',                'Pathology is the study of the causes and effects of disease or injury, and of disease in general.',                            '/images/dept/microscope.jpg',  4),
  ('microbiology',       'MicroBiology',             'Microbiology is the study of microscopic organisms such as viruses, bacteria, algae, fungi and protozoa.',                     '/images/dept/microscope.jpg',  5),
  ('pharmacology',       'Pharmacology',             'Pharmacology is the branch of medicine and pharmaceutical sciences concerned with drug action and medication.',                 '/images/dept/pharmacy.jpg',    6),
  ('forensic-medicine',  'Forensic Medicine',        'Forensic medicine covers the medical specialties dealing with the examination and diagnosis of individuals for legal purposes.', '/images/medical.jpg',          7),
  ('general-medicine',   'General Medicine',         'Internal (general) medicine deals with the prevention, diagnosis and treatment of internal diseases in adults.',               '/images/medical.jpg',          8),
  ('pediatrics',         'Pediatrics',               'Pediatrics is the branch of medicine involving the medical care of infants, children, adolescents and young adults.',          '/images/dept/pediatrics.jpg',  9),
  ('psychiatry',         'Psychiatry',               'Psychiatry is the medical specialty devoted to the diagnosis, prevention and treatment of mental disorders.',                  '/images/doctors.jpg',         10),
  ('dermatology',        'Skin (DVL)',               'As the body''s largest organ, the skin protects against germs, regulates body temperature and enables touch sensation.',        '/images/medical.jpg',         11),
  ('respiratory',        'Respiratory Medicine',     'Respiratory medicine deals with the diagnosis and treatment of diseases of the lungs and respiratory tract.',                  '/images/dept/heart.jpg',      12),
  ('general-surgery',    'General Surgery',          'General surgery focuses on the alimentary canal and abdominal contents including the oesophagus, stomach and intestines.',      '/images/dept/surgery.jpg',    13),
  ('orthopedics',        'Orthopedics',              'Orthopedic surgery is the branch of surgery concerned with conditions involving the musculoskeletal system.',                  '/images/dept/radiology.jpg',  14),
  ('radiodiagnosis',     'Radio Diagnosis',          'Radiodiagnosis uses radiation, ultrasound and magnetic resonance for the diagnosis of disease.',                              '/images/dept/radiology.jpg',  15),
  ('ent',                'Otorhinolaryngology',      'Otorhinolaryngology (ENT) is the surgical subspecialty managing conditions of the ear, nose and throat.',                     '/images/medical.jpg',         16),
  ('ophthalmology',      'Ophthalmology',            'Ophthalmology is the surgical subspecialty dealing with the diagnosis and treatment of eye disorders.',                       '/images/dept/eye.jpg',        17),
  ('obgyn',              'Gynecology & Obstetrics',  'Obstetrics and gynaecology encompasses the two subspecialties of obstetrics and gynaecology.',                                '/images/dept/surgery.jpg',    18),
  ('anesthesia',         'Anesthesia',               'Anesthesia is the medical treatment that prevents patients from feeling pain during surgery and diagnostic procedures.',        '/images/dept/heart.jpg',      19),
  ('dentistry',          'Dentistry',                'Dentistry is the branch of medicine concerned with the study, diagnosis, prevention and management of oral conditions.',        '/images/dept/dental.jpg',     20),
  ('community-medicine', 'PSM (Community Medicine)', 'Preventive and Social Medicine focuses on promoting health and preventing disease at the community level.',                     '/images/doctors.jpg',         21)
on conflict (slug) do update set
  name              = excluded.name,
  short_description = excluded.short_description,
  image_url         = excluded.image_url,
  sort_order        = excluded.sort_order;

insert into public.news (slug, title, excerpt, content, category, cover_image_url, published, published_at) values
  ('admissions-open-2026',
   'MBBS Admissions Open for 2026 Intake',
   'Applications are now being accepted for the upcoming academic year.',
   'The college is pleased to announce that admissions for the 2026 MBBS batch are now open. Eligible candidates may apply through the official portal before the last date.',
   'Admissions', '/images/news1.jpg', true, now()),
  ('research-grant-awarded',
   'Faculty Awarded National Research Grant',
   'Our pathology department secured a prestigious research grant.',
   'A team from the Department of Pathology has been awarded a national grant to study early disease markers, reinforcing the college''s commitment to research.',
   'Research', '/images/news2.jpg', true, now() - interval '3 days')
on conflict (slug) do nothing;
