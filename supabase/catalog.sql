-- OSIMIRI Catalog Manager — run in the Supabase SQL editor AFTER products.sql.
-- Adds categories, activity log, product price + category link, and reseeds the
-- prototype's 12 sample products across 6 categories.

create extension if not exists pgcrypto;

-- ─────────────────────────────────────────────────────────────
-- Categories (self-referencing for subcategories)
-- ─────────────────────────────────────────────────────────────
create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  parent_id uuid references categories(id) on delete cascade,
  position int not null default 0,
  created_at timestamptz not null default now()
);
create index if not exists categories_parent_idx on categories (parent_id);
alter table categories enable row level security;

-- ─────────────────────────────────────────────────────────────
-- Activity log
-- ─────────────────────────────────────────────────────────────
create table if not exists activity_log (
  id uuid primary key default gen_random_uuid(),
  action text not null,           -- created | updated | deleted | published | uploaded
  entity text not null default 'product',
  entity_id text,
  title text not null,
  created_at timestamptz not null default now()
);
create index if not exists activity_log_created_idx on activity_log (created_at desc);
alter table activity_log enable row level security;

-- ─────────────────────────────────────────────────────────────
-- Product additions
-- ─────────────────────────────────────────────────────────────
alter table products add column if not exists price numeric;
alter table products add column if not exists category_id uuid references categories(id) on delete set null;
create index if not exists products_category_idx on products (category_id);

-- ─────────────────────────────────────────────────────────────
-- Seed categories + subcategories
-- ─────────────────────────────────────────────────────────────
insert into categories (name, slug, position) values
  ('Living Room','living-room',1),
  ('Bedroom','bedroom',2),
  ('Dining','dining',3),
  ('Office','office',4),
  ('Outdoor','outdoor',5),
  ('Lighting','lighting',6)
on conflict (slug) do nothing;

insert into categories (name, slug, parent_id, position)
select v.name, v.slug, p.id, v.position
from (values
  ('Sofas','sofas','living-room',1),
  ('Armchairs','armchairs','living-room',2),
  ('Coffee Tables','coffee-tables','living-room',3),
  ('Beds','beds','bedroom',1),
  ('Nightstands','nightstands','bedroom',2),
  ('Dining Tables','dining-tables','dining',1),
  ('Dining Chairs','dining-chairs','dining',2),
  ('Desks','desks','office',1),
  ('Office Chairs','office-chairs','office',2),
  ('Outdoor Seating','outdoor-seating','outdoor',1),
  ('Floor Lamps','floor-lamps','lighting',1),
  ('Pendants','pendants','lighting',2)
) as v(name, slug, parent_slug, position)
join categories p on p.slug = v.parent_slug
on conflict (slug) do nothing;

-- ─────────────────────────────────────────────────────────────
-- Reseed products to match the prototype (12 items).
-- NOTE: this clears existing products first. Remove the delete line
-- if you have already added real products you want to keep.
-- ─────────────────────────────────────────────────────────────
delete from products;

insert into products (
  product_id, title, slug, status, featured_product, price,
  collection_name, category, sub_category, category_id,
  short_description, primary_material, dimensions_overall, price_note,
  main_image_link, gallery_image_links, alt_text_main_image
)
select
  v.sku, v.title, v.slug, v.status, v.featured, v.price::numeric,
  v.parent, v.parent, v.subname, c.id,
  v.descr, v.material, v.dims, 'Price on request',
  v.img,
  array[v.img,
        replace(v.img,'w=1400','w=900'),
        replace(v.img,'w=1400','w=700')],
  v.title
from (values
  ('OSM-LR-1042','Aurelia 3-Seater Sofa','aurelia-3-seater-sofa','Active',true,245000,'Living Room','sofas','Sofas','A sculpted three-seater with deep, tailored comfort.','Hardwood frame, boucle','W 2200 x D 950 x H 780 mm','https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80'),
  ('OSM-LR-1088','Vienna Wingback Armchair','vienna-wingback-armchair','Active',false,89000,'Living Room','armchairs','Armchairs','A high-back wingback with brass-tipped legs.','Oak, wool blend','W 820 x D 880 x H 1080 mm','https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1400&q=80'),
  ('OSM-LR-1120','Noir Marble Coffee Table','noir-marble-coffee-table','Draft',false,64500,'Living Room','coffee-tables','Coffee Tables','Nero marble top on a blackened steel base.','Marble, steel','W 1200 x D 700 x H 380 mm','https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=1400&q=80'),
  ('OSM-BR-2031','Serengeti King Bed','serengeti-king-bed','Active',true,312000,'Bedroom','beds','Beds','Upholstered king bed with a channel-tufted headboard.','Hardwood, linen','W 2000 x L 2200 x H 1200 mm','https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=1400&q=80'),
  ('OSM-BR-2074','Lumiere Bedside Table','lumiere-bedside-table','Active',false,38000,'Bedroom','nightstands','Nightstands','Two-drawer nightstand with a fluted front.','Walnut, brass','W 520 x D 420 x H 560 mm','https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1400&q=80'),
  ('OSM-DN-3010','Cassia Dining Table (8-Seater)','cassia-dining-table-8-seater','Active',true,420000,'Dining','dining-tables','Dining Tables','An eight-seater dining table with a live-edge top.','Solid oak','W 2400 x D 1050 x H 760 mm','https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&w=1400&q=80'),
  ('OSM-DN-3044','Florence Dining Chair','florence-dining-chair','Active',false,22500,'Dining','dining-chairs','Dining Chairs','A curved-back dining chair in bouclé.','Beech, boucle','W 520 x D 560 x H 820 mm','https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1400&q=80'),
  ('OSM-OF-4012','Atlas Executive Desk','atlas-executive-desk','Active',true,168000,'Office','desks','Desks','An executive desk with integrated cable management.','Walnut, steel','W 1800 x D 850 x H 750 mm','https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1400&q=80'),
  ('OSM-OF-4039','Meridian Office Chair','meridian-office-chair','Draft',false,46000,'Office','office-chairs','Office Chairs','An ergonomic leather task chair.','Leather, aluminium','W 680 x D 680 x H 1120 mm','https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&w=1400&q=80'),
  ('OSM-OD-5008','Cove Outdoor Lounge Set','cove-outdoor-lounge-set','Archived',false,275000,'Outdoor','outdoor-seating','Outdoor Seating','A weatherproof lounge set with teak frames.','Teak, rope','Modular','https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=1400&q=80'),
  ('OSM-LT-6003','Onyx Floor Lamp','onyx-floor-lamp','Active',false,54000,'Lighting','floor-lamps','Floor Lamps','An arc floor lamp with an onyx base.','Onyx, brass','H 1800 mm','https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1400&q=80'),
  ('OSM-LT-6021','Halo Pendant Light','halo-pendant-light','Draft',false,31000,'Lighting','pendants','Pendants','A ringed pendant in brushed brass.','Brass','D 600 mm','https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?auto=format&fit=crop&w=1400&q=80')
) as v(sku,title,slug,status,featured,price,parent,subslug,subname,descr,material,dims,img)
join categories c on c.slug = v.subslug;
