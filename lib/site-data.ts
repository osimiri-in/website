import { slugify } from "@/lib/utils";

export type Product = {
  name: string;
  slug: string;
  description: string;
  material: string;
  dimensions: string;
  finishes: string[];
  images: string[];
};

export type Collection = {
  name: string;
  slug: string;
  category: string;
  descriptor: string;
  heroImage: string;
  products: Product[];
};

const imageSet = [
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80",
];

function makeProducts(collection: string, tag: string): Product[] {
  return [
    {
      name: `${collection} No. 01`,
      slug: slugify(`${collection} No. 01`),
      description: `A tailored ${collection.toLowerCase()} designed for premium residences and hospitality projects, balancing sculpted form with site-specific customization.`,
      material: tag,
      dimensions: "W 2200 x D 900 x H 760 mm",
      finishes: ["Natural Oak", "Walnut", "Brushed Brass", "Ivory Boucle"],
      images: [imageSet[0], imageSet[1]],
    },
    {
      name: `${collection} Atelier`,
      slug: slugify(`${collection} Atelier`),
      description:
        "Made to order with OSIMIRI's in-house wood, metal, marble, and upholstery capabilities.",
      material: tag,
      dimensions: "W 1800 x D 800 x H 720 mm",
      finishes: ["Smoked Ash", "Travertine", "Matte Black", "Taupe Leather"],
      images: [imageSet[2], imageSet[3]],
    },
    {
      name: `${collection} Signature`,
      slug: slugify(`${collection} Signature`),
      description:
        "A signature silhouette for refined, large-format living spaces and curated project briefs.",
      material: tag,
      dimensions: "W 2400 x D 960 x H 780 mm",
      finishes: ["Teak", "Champagne Metal", "Forest Upholstery", "Stone Top"],
      images: [imageSet[4], imageSet[5]],
    },
  ];
}

export const collections: Collection[] = [
  ["Accent Chairs", "Seating", "Statement seating with sculpted comfort.", imageSet[0], "Solid wood, metal, upholstery"],
  ["Bed", "Beds", "Layered luxury for restful suites.", imageSet[1], "Wood, veneer, upholstery"],
  ["Bedsides", "Storage", "Small-format pieces with premium detailing.", imageSet[2], "Wood, veneer, marble"],
  ["Dinings", "Tables", "Gathering tables with architectural presence.", imageSet[3], "Wood, marble, metal"],
  ["Chairs", "Seating", "Dining and occasional chairs with refined lines.", imageSet[4], "Wood, metal, upholstery"],
  ["Center Table", "Tables", "Hero pieces for elevated living rooms.", imageSet[5], "Stone, metal, veneer"],
  ["Side Table", "Tables", "Versatile side tables for layered layouts.", imageSet[0], "Metal, marble, veneer"],
  ["Console", "Storage", "Entry and passage consoles for grand statements.", imageSet[1], "Wood, metal, stone"],
  ["Sideboard", "Storage", "Project-grade storage with a bespoke finish palette.", imageSet[2], "Wood, veneer, stone"],
  ["Sofa", "Seating", "Deep, tailored sofas built for custom briefs.", imageSet[3], "Hardwood, upholstery, metal"],
  ["Ottomans", "Seating", "Flexible accent pieces for layered seating plans.", imageSet[4], "Upholstery, wood"],
  ["Bar", "Storage", "Entertaining units crafted for showpiece interiors.", imageSet[5], "Wood, glass, metal"],
  ["Mirrors", "Decor", "Framed mirrors that sharpen the room's composition.", imageSet[0], "Metal, wood, mirror"],
  ["Office Desk", "Tables", "Executive desks with project-ready customization.", imageSet[1], "Wood, leather, metal"],
].map(([name, category, descriptor, heroImage, tag]) => ({
  name: name as string,
  slug: slugify(name as string),
  category: category as string,
  descriptor: descriptor as string,
  heroImage: heroImage as string,
  products: makeProducts(name as string, tag as string),
}));

export const heroSlides = [
  {
    label: "Luxury Furniture Partner",
    title: "Bespoke furniture shaped by material, craft, and spatial intent.",
    body: "OSIMIRI works with architects, interior designers, and premium homeowners to build custom pieces entirely in-house.",
    image: imageSet[0],
  },
  {
    label: "Built In-House",
    title: "Wood, metal, marble, and upholstery under one roof.",
    body: "From technical drawings to installation, every stage is calibrated for quality, speed, and finish consistency.",
    image: imageSet[3],
  },
  {
    label: "Project-Scale Execution",
    title: "Designed for villas, residences, hospitality, and signature commercial spaces.",
    body: "Custom briefs, finish approvals, and precise production workflows make OSIMIRI a dependable project partner.",
    image: imageSet[5],
  },
];

export const homeUsps = [
  {
    title: "In-House Manufacturing",
    description:
      "Every major process is coordinated within OSIMIRI's ecosystem for better quality control and delivery confidence.",
    image: imageSet[2],
  },
  {
    title: "Bespoke to Every Brief",
    description:
      "Dimensions, finishes, materials, and details are adapted to the project instead of forcing a catalogue fit.",
    image: imageSet[4],
  },
  {
    title: "Architect-First Approach",
    description:
      "The team collaborates with practices, consultants, and contractors to protect design intent and execution timelines.",
    image: imageSet[1],
  },
  {
    title: "Material Depth",
    description:
      "Marble, metal, wood, and upholstery are all considered as one cohesive design language, not isolated categories.",
    image: imageSet[5],
  },
];

export const processSteps = [
  "Consultation",
  "Material Selection",
  "Design & Drawings",
  "Manufacturing",
  "Installation",
];

export const customProcess = [
  "Discovery Call",
  "Site Visit & Measurements",
  "Material Selection",
  "Design Drawings",
  "Client Approval",
  "Production",
  "Quality Check",
  "Installation & Handover",
];

export const manufacturingCapabilities = [
  {
    title: "Solid Wood Workshop",
    body: "Precision joinery, veneer work, hand-finishing, and bespoke detailing tailored to project requirements.",
    image: imageSet[0],
  },
  {
    title: "Metal Fabrication",
    body: "Architectural metal frames, detailing, and protective finishes aligned with luxury interiors.",
    image: imageSet[1],
  },
  {
    title: "Marble & Stone Atelier",
    body: "Stone tops, inlays, and coordinated edge detailing for premium dining, coffee, and console pieces.",
    image: imageSet[2],
  },
  {
    title: "Upholstery Studio",
    body: "Made-to-order seat depths, cushion comfort, and tailored finishing for sofas, chairs, and beds.",
    image: imageSet[3],
  },
];

export const projects = [
  {
    title: "Azure Courtyard Residence",
    slug: "azure-courtyard-residence",
    location: "Hyderabad",
    year: 2025,
    type: "Residential",
    areaSqft: 6400,
    scope: "Living, dining, bedrooms, entry console, bespoke wardrobes",
    heroImage: imageSet[0],
    galleryImages: [imageSet[0], imageSet[1], imageSet[2], imageSet[3]],
    architect: "Studio Frame & Form",
    featured: true,
  },
  {
    title: "The Palm Villa",
    slug: "the-palm-villa",
    location: "Bengaluru",
    year: 2024,
    type: "Villa",
    areaSqft: 8200,
    scope: "Custom seating, beds, wardrobes, bar, outdoor transition furniture",
    heroImage: imageSet[4],
    galleryImages: [imageSet[4], imageSet[5], imageSet[1]],
    architect: "Atelier One",
    featured: true,
  },
  {
    title: "Noor Hospitality Suites",
    slug: "noor-hospitality-suites",
    location: "Goa",
    year: 2025,
    type: "Hospitality",
    areaSqft: 12000,
    scope: "Guestroom furniture package, lounge seating, reception millwork",
    heroImage: imageSet[3],
    galleryImages: [imageSet[3], imageSet[2], imageSet[5]],
    architect: "Linespace Studio",
    featured: true,
  },
  {
    title: "Terra Heights Apartment",
    slug: "terra-heights-apartment",
    location: "Mumbai",
    year: 2023,
    type: "Apartment",
    areaSqft: 3100,
    scope: "Living room, dining, bedsides, office desk, customized storage",
    heroImage: imageSet[2],
    galleryImages: [imageSet[2], imageSet[0], imageSet[5]],
    architect: "Urban Grain",
    featured: false,
  },
  {
    title: "Arbor Club Lounge",
    slug: "arbor-club-lounge",
    location: "Pune",
    year: 2024,
    type: "Commercial",
    areaSqft: 5800,
    scope: "Bar counters, loose furniture, banquettes, custom joinery",
    heroImage: imageSet[1],
    galleryImages: [imageSet[1], imageSet[3], imageSet[4]],
    architect: "North Axis",
    featured: false,
  },
];

export const blogs = [
  {
    title: "How To Specify Bespoke Luxury Furniture For Large Homes",
    slug: "how-to-specify-bespoke-luxury-furniture",
    excerpt:
      "A practical framework for architects and designers balancing design intent, execution, and long-term durability.",
    coverImage: imageSet[0],
    author: "OSIMIRI Studio",
    publishedAt: "2026-05-28",
    body:
      "Luxury furniture specification begins long before finishes are selected. The best outcomes come from understanding circulation, use, maintenance expectations, and the desired emotional tone of a space.\\n\\nFor project teams, the real advantage of bespoke furniture is control. Dimensions, proportions, joinery details, upholstery comfort, and material pairings can all be shaped to suit the architecture rather than adapted to a fixed product.\\n\\nThat control only matters when manufacturing depth can support it. OSIMIRI aligns design development with material knowledge, mockups, finish approvals, and in-house execution so the final piece feels intentional from sketch to installation.",
  },
  {
    title: "What Architects Need From A Furniture Manufacturing Partner",
    slug: "what-architects-need-from-a-furniture-manufacturing-partner",
    excerpt:
      "Beyond craftsmanship, the right partner must support drawings, approvals, revisions, and site coordination.",
    coverImage: imageSet[3],
    author: "OSIMIRI Studio",
    publishedAt: "2026-04-18",
    body:
      "A reliable manufacturing partner understands that furniture is part of project delivery, not an isolated purchase. Timelines, finish consistency, site conditions, and drawing revisions all affect the final outcome.\\n\\nArchitects need clear communication, structured sampling, technical confidence, and the ability to adapt details without compromising quality.\\n\\nThis is why OSIMIRI positions itself as an execution partner. The process is built around coordination, material fluency, and disciplined production planning.",
  },
  {
    title: "Why In-House Manufacturing Matters In Luxury Projects",
    slug: "why-in-house-manufacturing-matters-in-luxury-projects",
    excerpt:
      "Quality, speed, and accountability improve when wood, metal, marble, and upholstery are coordinated together.",
    coverImage: imageSet[5],
    author: "OSIMIRI Studio",
    publishedAt: "2026-03-12",
    body:
      "Luxury projects depend on precision. When multiple vendors own different material packages, alignment becomes slower and risk increases.\\n\\nIn-house manufacturing creates a tighter feedback loop between design intent, shop-floor feasibility, and quality control. It also improves the reliability of revisions and site-specific customization.\\n\\nAt OSIMIRI, this depth is what allows the team to craft cohesive furniture systems rather than disconnected individual pieces.",
  },
];

export const testimonials = [
  {
    quote:
      "OSIMIRI translated our drawings into impeccably detailed pieces that felt completely native to the architecture.",
    name: "Ritika Sharma",
    city: "Hyderabad",
    projectType: "Villa",
  },
  {
    quote:
      "The finish development and execution quality gave us the confidence to scale across multiple rooms without compromise.",
    name: "Aman Mehra",
    city: "Mumbai",
    projectType: "Residential",
  },
  {
    quote:
      "A true manufacturing partner. They understand designer priorities, timelines, and the realities of site coordination.",
    name: "Studio North Axis",
    city: "Pune",
    projectType: "Commercial",
  },
  {
    quote:
      "The customization was thoughtful, not superficial. Every proportion felt carefully resolved for the space.",
    name: "Neha Reddy",
    city: "Bengaluru",
    projectType: "Apartment",
  },
];

export const architectBenefits = [
  "Project-scale execution with coordinated package planning",
  "Dedicated account management and faster design communication",
  "Custom specifications, dimensions, and finish mockups accepted",
];

export const companyValues = ["Craftsmanship", "Integrity", "Customization", "Longevity"];

export const timeline = [
  { year: "2018", event: "OSIMIRI begins with a focus on premium custom furniture." },
  { year: "2020", event: "Expanded in-house capability across wood, metal, and upholstery." },
  { year: "2023", event: "Scaled execution for large residential and hospitality projects." },
  { year: "2025", event: "Strengthened architect-first workflows and end-to-end project support." },
];

export const showroomImages = [
  imageSet[0],
  imageSet[1],
  imageSet[2],
  imageSet[3],
  imageSet[4],
  imageSet[5],
];

export function getCollectionBySlug(slug: string) {
  return collections.find((collection) => collection.slug === slug);
}

export function getProductBySlug(collectionSlug: string, productSlug: string) {
  const collection = getCollectionBySlug(collectionSlug);
  const product = collection?.products.find((item) => item.slug === productSlug);
  return { collection, product };
}

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getBlogBySlug(slug: string) {
  return blogs.find((blog) => blog.slug === slug);
}
