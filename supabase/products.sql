-- OSIMIRI product catalogue — run this in the Supabase SQL editor.
-- Reads/writes happen server-side with the service-role key, so RLS stays on
-- with no anon policies (the public anon key can neither read drafts nor write).

create extension if not exists pgcrypto;

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  product_id text unique,
  title text not null,
  subtitle text,
  slug text unique not null,
  collection_name text default '',
  category text default '',
  sub_category text,
  status text not null default 'Draft',
  featured_product boolean not null default false,

  short_description text default '',
  full_description text default '',
  customization_note text default '',
  care_instructions text,
  installation_note text,

  seo_title text,
  seo_description text,
  seo_keywords text[] default '{}',
  focus_keyword text,
  alt_text_main_image text default '',

  primary_material text default '',
  secondary_materials text[] default '{}',
  finish_options text[] default '{}',
  upholstery_options text[] default '{}',
  swatch_reference_codes text[] default '{}',

  dimensions_overall text default '',
  dimensions_seat_height text,
  dimensions_seat_depth text,
  dimensions_customizable boolean not null default false,
  weight text,
  assembly_required boolean,
  lead_time text,
  warranty text,

  price_visible boolean,
  price_note text,
  project_suitability text[] default '{}',
  availability_region text,

  main_image_link text default '',
  gallery_image_links text[] default '{}',
  lifestyle_image_links text[] default '{}',
  detail_closeup_links text[] default '{}',
  swatch_image_links text[] default '{}',
  video_link text,
  video_type text,
  cad_file_link text,
  ar_or_3d_model_link text,

  search_keywords text[] default '{}',
  room_tags text[] default '{}',
  style_tags text[] default '{}',
  color_tags text[] default '{}',
  material_tags text[] default '{}',

  client_approval_status text,
  content_source text,
  notes_for_osimiri_team text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists products_status_idx on products (status);
create index if not exists products_slug_idx on products (slug);

-- keep updated_at fresh on every write
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists products_set_updated_at on products;
create trigger products_set_updated_at
  before update on products
  for each row execute function set_updated_at();

alter table products enable row level security;
-- No policies are defined on purpose: only the service-role key (used by the
-- Next.js server routes) may read/write. The public site reads server-side too.

-- Storage bucket for uploaded product images (public read).
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

-- Seed the existing demo product so the catalogue is populated immediately.
insert into products (
  product_id, title, subtitle, slug, collection_name, category, sub_category,
  status, featured_product, short_description, full_description, customization_note,
  care_instructions, installation_note, seo_title, seo_description, seo_keywords,
  focus_keyword, alt_text_main_image, primary_material, secondary_materials,
  finish_options, upholstery_options, swatch_reference_codes, dimensions_overall,
  dimensions_seat_height, dimensions_seat_depth, dimensions_customizable, weight,
  assembly_required, lead_time, warranty, price_visible, price_note,
  project_suitability, availability_region, main_image_link, gallery_image_links,
  lifestyle_image_links, detail_closeup_links, swatch_image_links, video_link,
  video_type, cad_file_link, ar_or_3d_model_link, search_keywords, room_tags,
  style_tags, color_tags, material_tags, client_approval_status, content_source,
  notes_for_osimiri_team
) values (
  'OSI-SOF-001',
  'Aurelia Three-Seater Sofa',
  'Tailored comfort with sculpted form',
  'aurelia-three-seater-sofa',
  'Sofa', 'Seating', 'Three-Seater Sofa',
  'Active', true,
  'A bespoke sofa with refined lines, deep seating, and a calm architectural profile for premium living spaces.',
  'Aurelia is designed for premium living rooms with a balanced silhouette, generous comfort, and a disciplined material story. The profile is soft without feeling casual, making it suitable for contemporary homes, villas, and hospitality lounges. Its deep seat, tailored upholstery, and crafted base detailing allow the piece to feel both inviting and composed.',
  'Available in custom lengths, upholstery, seat depth, cushion comfort, and base finishes to suit project-specific briefs.',
  'Vacuum upholstery weekly with a soft brush attachment, clean spills immediately with a dry cloth, and avoid direct long-term sunlight exposure.',
  'Requires two-person handling for safe placement. Confirm lift size and access width for high-rise deliveries.',
  'Aurelia Three-Seater Sofa | OSIMIRI',
  'Explore the Aurelia sofa by OSIMIRI with bespoke upholstery, custom dimensions, and a premium luxury-living profile.',
  array['luxury sofa','bespoke sofa','custom furniture','premium seating'],
  'luxury bespoke sofa',
  'Cream luxury three-seater sofa with rounded arms in a modern living room',
  'Hardwood frame',
  array['Boucle fabric','Brushed brass detailing','High-density foam'],
  array['Walnut','Smoked Oak','Matte Black'],
  array['Boucle','Linen Blend','Leather'],
  array['FB-101','FB-214','LTH-09'],
  'W 2200 x D 900 x H 760 mm', '430 mm', '620 mm', true, '68 kg',
  false, '6-8 weeks', '1 year against manufacturing defects', false, 'Price on request',
  array['Residential','Villa','Hospitality'], 'India',
  'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80',
  array[
    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=80'
  ],
  array[
    'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1400&q=80'
  ],
  array[
    'https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=80'
  ],
  array[
    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=700&q=80',
    'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=700&q=80'
  ],
  'https://vimeo.com/123456789', 'Product Walkthrough',
  'https://example.com/files/aurelia-tech.pdf', 'https://example.com/files/aurelia.glb',
  array['designer sofa','modern sofa','luxe couch','bespoke seating'],
  array['Living Room','Lounge','Master Suite'],
  array['Contemporary','Minimal','Soft Luxury'],
  array['Cream','Beige','Walnut'],
  array['Wood','Upholstery','Brass'],
  'Approved', 'Client catalogue 2026',
  'Need final fabric swatch confirmation before publishing and final production video link.'
)
on conflict (slug) do nothing;
