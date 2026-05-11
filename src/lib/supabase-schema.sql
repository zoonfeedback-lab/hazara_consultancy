create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text,
  subject text,
  service_of_interest text,
  message text not null,
  status text not null default 'new' check (status in ('new', 'in_progress', 'resolved')),
  notes text
);

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  title text not null,
  slug text not null unique,
  excerpt text,
  body text,
  category text,
  featured_image_url text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  featured boolean not null default false
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  name text not null,
  slug text not null unique,
  tagline text,
  description text,
  who_its_for text,
  benefits text[],
  status text not null default 'active' check (status in ('active', 'inactive')),
  featured boolean not null default false,
  sort_order integer not null default 0
);

create table if not exists public.programs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  name text not null,
  slug text not null unique,
  type text check (type in ('bootcamp', 'workshop', 'crash_course', 'mentorship')),
  duration text,
  schedule text,
  description text,
  curriculum text[],
  status text not null default 'upcoming' check (status in ('active', 'upcoming', 'completed')),
  featured boolean not null default false,
  sort_order integer not null default 0
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  name text not null,
  slug text not null unique,
  type text check (type in ('seminar', 'conference', 'workshop', 'community')),
  date date,
  location text,
  description text,
  image_url text,
  is_past boolean not null default false,
  status text not null default 'upcoming' check (status in ('upcoming', 'active', 'completed')),
  featured boolean not null default false
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  student_name text not null,
  program text,
  quote text not null,
  featured boolean not null default false,
  sort_order integer not null default 0
);

create table if not exists public.announcements (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  text text not null,
  link text,
  active boolean not null default true,
  expires_at timestamptz
);

create table if not exists public.settings (
  id integer primary key default 1 check (id = 1),
  consultancy_name text,
  tagline text,
  contact_email text,
  phone text,
  whatsapp_number text,
  whatsapp_url text,
  address text,
  facebook_url text,
  instagram_url text,
  youtube_url text,
  linkedin_url text,
  updated_at timestamptz not null default now()
);

create table if not exists public.media (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  filename text not null,
  storage_path text not null,
  public_url text not null,
  mime_type text,
  size_bytes bigint,
  alt_text text
);

create index if not exists inquiries_created_at_idx on public.inquiries (created_at desc);
create index if not exists inquiries_status_idx on public.inquiries (status);
create index if not exists blog_posts_status_idx on public.blog_posts (status);
create index if not exists blog_posts_published_at_idx on public.blog_posts (published_at desc);
create index if not exists blog_posts_featured_idx on public.blog_posts (featured);
create index if not exists services_status_idx on public.services (status);
create index if not exists services_sort_order_idx on public.services (sort_order asc);
create index if not exists programs_status_idx on public.programs (status);
create index if not exists programs_sort_order_idx on public.programs (sort_order asc);
create index if not exists events_date_idx on public.events (date);
create index if not exists events_is_past_idx on public.events (is_past);
create index if not exists testimonials_featured_idx on public.testimonials (featured);
create index if not exists testimonials_sort_order_idx on public.testimonials (sort_order asc);
create index if not exists announcements_active_idx on public.announcements (active);
create index if not exists announcements_expires_at_idx on public.announcements (expires_at);
create index if not exists media_storage_path_idx on public.media (storage_path);

drop trigger if exists set_blog_posts_updated_at on public.blog_posts;
create trigger set_blog_posts_updated_at
before update on public.blog_posts
for each row
execute function public.set_updated_at();

drop trigger if exists set_services_updated_at on public.services;
create trigger set_services_updated_at
before update on public.services
for each row
execute function public.set_updated_at();

drop trigger if exists set_programs_updated_at on public.programs;
create trigger set_programs_updated_at
before update on public.programs
for each row
execute function public.set_updated_at();

drop trigger if exists set_events_updated_at on public.events;
create trigger set_events_updated_at
before update on public.events
for each row
execute function public.set_updated_at();

drop trigger if exists set_settings_updated_at on public.settings;
create trigger set_settings_updated_at
before update on public.settings
for each row
execute function public.set_updated_at();

alter table public.inquiries enable row level security;
alter table public.blog_posts enable row level security;
alter table public.services enable row level security;
alter table public.programs enable row level security;
alter table public.events enable row level security;
alter table public.testimonials enable row level security;
alter table public.announcements enable row level security;
alter table public.settings enable row level security;
alter table public.media enable row level security;

drop policy if exists "public can submit inquiries" on public.inquiries;
create policy "public can submit inquiries"
on public.inquiries
for insert
to anon, authenticated
with check (true);

drop policy if exists "authenticated can read inquiries" on public.inquiries;
create policy "authenticated can read inquiries"
on public.inquiries
for select
to authenticated
using (true);

drop policy if exists "authenticated can update inquiries" on public.inquiries;
create policy "authenticated can update inquiries"
on public.inquiries
for update
to authenticated
using (true)
with check (true);

drop policy if exists "authenticated can delete inquiries" on public.inquiries;
create policy "authenticated can delete inquiries"
on public.inquiries
for delete
to authenticated
using (true);

drop policy if exists "public can read published blog posts" on public.blog_posts;
create policy "public can read published blog posts"
on public.blog_posts
for select
to anon
using (status = 'published');

drop policy if exists "authenticated can manage blog posts" on public.blog_posts;
create policy "authenticated can manage blog posts"
on public.blog_posts
for all
to authenticated
using (true)
with check (true);

drop policy if exists "public can read active services" on public.services;
create policy "public can read active services"
on public.services
for select
to anon
using (status = 'active');

drop policy if exists "authenticated can manage services" on public.services;
create policy "authenticated can manage services"
on public.services
for all
to authenticated
using (true)
with check (true);

drop policy if exists "public can read visible programs" on public.programs;
create policy "public can read visible programs"
on public.programs
for select
to anon
using (status in ('active', 'upcoming'));

drop policy if exists "authenticated can manage programs" on public.programs;
create policy "authenticated can manage programs"
on public.programs
for all
to authenticated
using (true)
with check (true);

drop policy if exists "public can read visible events" on public.events;
create policy "public can read visible events"
on public.events
for select
to anon
using (status in ('upcoming', 'active', 'completed'));

drop policy if exists "authenticated can manage events" on public.events;
create policy "authenticated can manage events"
on public.events
for all
to authenticated
using (true)
with check (true);

drop policy if exists "public can read featured testimonials" on public.testimonials;
create policy "public can read featured testimonials"
on public.testimonials
for select
to anon
using (true);

drop policy if exists "authenticated can manage testimonials" on public.testimonials;
create policy "authenticated can manage testimonials"
on public.testimonials
for all
to authenticated
using (true)
with check (true);

drop policy if exists "public can read active announcements" on public.announcements;
create policy "public can read active announcements"
on public.announcements
for select
to anon
using (active = true);

drop policy if exists "authenticated can manage announcements" on public.announcements;
create policy "authenticated can manage announcements"
on public.announcements
for all
to authenticated
using (true)
with check (true);

drop policy if exists "public can read settings" on public.settings;
create policy "public can read settings"
on public.settings
for select
to anon
using (id = 1);

drop policy if exists "authenticated can manage settings" on public.settings;
create policy "authenticated can manage settings"
on public.settings
for all
to authenticated
using (true)
with check (true);

drop policy if exists "public can read media" on public.media;
create policy "public can read media"
on public.media
for select
to anon
using (true);

drop policy if exists "authenticated can manage media" on public.media;
create policy "authenticated can manage media"
on public.media
for all
to authenticated
using (true)
with check (true);

-- Optional seed data
insert into public.settings (
  id,
  consultancy_name,
  tagline,
  contact_email,
  phone,
  whatsapp_number,
  whatsapp_url,
  address,
  facebook_url,
  instagram_url,
  youtube_url,
  linkedin_url
)
values (
  1,
  'Hazara Global Consultancy',
  'Premium mentorship and public-trust consultancy from Abbottabad.',
  'info@hazaraglobalconsultancy.pk',
  '+92 333 870 2211',
  '+92 333 870 2211',
  'https://wa.me/923338702211',
  'Main Mansehra Road, Abbottabad, Khyber Pakhtunkhwa, Pakistan',
  'https://facebook.com/hazaraglobalconsultancy',
  'https://instagram.com/hazaraglobalconsultancy',
  'https://youtube.com/@hazaraglobalconsultancy',
  'https://linkedin.com/company/hazaraglobalconsultancy'
)
on conflict (id) do update
set
  consultancy_name = excluded.consultancy_name,
  tagline = excluded.tagline,
  contact_email = excluded.contact_email,
  phone = excluded.phone,
  whatsapp_number = excluded.whatsapp_number,
  whatsapp_url = excluded.whatsapp_url,
  address = excluded.address,
  facebook_url = excluded.facebook_url,
  instagram_url = excluded.instagram_url,
  youtube_url = excluded.youtube_url,
  linkedin_url = excluded.linkedin_url;

insert into public.announcements (text, link, active, expires_at)
values
  (
    'CSS flagship mentorship registrations are now open for the next Abbottabad cohort.',
    '/programs',
    true,
    now() + interval '30 days'
  ),
  (
    'Admissions guidance desk is taking new scholarship planning inquiries this month.',
    '/contact',
    true,
    now() + interval '21 days'
  ),
  (
    'Women in public leadership seminar schedule will be announced soon.',
    '/events',
    true,
    now() + interval '14 days'
  )
on conflict do nothing;
