export type DemoProduct = {
  productId: string;
  title: string;
  subtitle?: string;
  slug: string;
  collectionName: string;
  category: string;
  subCategory?: string;
  status: string;
  featuredProduct: boolean;
  shortDescription: string;
  fullDescription: string;
  customizationNote: string;
  careInstructions?: string;
  installationNote?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  focusKeyword?: string;
  altTextMainImage: string;
  primaryMaterial: string;
  secondaryMaterials?: string[];
  finishOptions?: string[];
  upholsteryOptions?: string[];
  swatchReferenceCodes?: string[];
  dimensionsOverall: string;
  dimensionsSeatHeight?: string;
  dimensionsSeatDepth?: string;
  dimensionsCustomizable: boolean;
  weight?: string;
  assemblyRequired?: boolean;
  leadTime?: string;
  warranty?: string;
  priceVisible?: boolean;
  priceNote?: string;
  projectSuitability?: string[];
  availabilityRegion?: string;
  mainImageLink: string;
  galleryImageLinks: string[];
  lifestyleImageLinks?: string[];
  detailCloseupLinks?: string[];
  swatchImageLinks?: string[];
  videoLink?: string;
  videoType?: string;
  cadFileLink?: string;
  arOr3dModelLink?: string;
  searchKeywords?: string[];
  roomTags?: string[];
  styleTags?: string[];
  colorTags?: string[];
  materialTags?: string[];
  clientApprovalStatus?: string;
  contentSource?: string;
  lastUpdated?: string;
  notesForOsimiriTeam?: string;
};

export const demoProducts: DemoProduct[] = [
  {
    productId: "OSI-SOF-001",
    title: "Aurelia Three-Seater Sofa",
    subtitle: "Tailored comfort with sculpted form",
    slug: "aurelia-three-seater-sofa",
    collectionName: "Sofa",
    category: "Seating",
    subCategory: "Three-Seater Sofa",
    status: "Active",
    featuredProduct: true,
    shortDescription:
      "A bespoke sofa with refined lines, deep seating, and a calm architectural profile for premium living spaces.",
    fullDescription:
      "Aurelia is designed for premium living rooms with a balanced silhouette, generous comfort, and a disciplined material story. The profile is soft without feeling casual, making it suitable for contemporary homes, villas, and hospitality lounges. Its deep seat, tailored upholstery, and crafted base detailing allow the piece to feel both inviting and composed. This sample page demonstrates how a real OSIMIRI product can look once the client fills the content sheet with final text, images, and technical information.",
    customizationNote:
      "Available in custom lengths, upholstery, seat depth, cushion comfort, and base finishes to suit project-specific briefs.",
    careInstructions:
      "Vacuum upholstery weekly with a soft brush attachment, clean spills immediately with a dry cloth, and avoid direct long-term sunlight exposure.",
    installationNote:
      "Requires two-person handling for safe placement. Confirm lift size and access width for high-rise deliveries.",
    seoTitle: "Aurelia Three-Seater Sofa | OSIMIRI",
    seoDescription:
      "Explore the Aurelia sofa by OSIMIRI with bespoke upholstery, custom dimensions, and a premium luxury-living profile.",
    seoKeywords: [
      "luxury sofa",
      "bespoke sofa",
      "custom furniture",
      "premium seating",
    ],
    focusKeyword: "luxury bespoke sofa",
    altTextMainImage:
      "Cream luxury three-seater sofa with rounded arms in a modern living room",
    primaryMaterial: "Hardwood frame",
    secondaryMaterials: [
      "Boucle fabric",
      "Brushed brass detailing",
      "High-density foam",
    ],
    finishOptions: ["Walnut", "Smoked Oak", "Matte Black"],
    upholsteryOptions: ["Boucle", "Linen Blend", "Leather"],
    swatchReferenceCodes: ["FB-101", "FB-214", "LTH-09"],
    dimensionsOverall: "W 2200 x D 900 x H 760 mm",
    dimensionsSeatHeight: "430 mm",
    dimensionsSeatDepth: "620 mm",
    dimensionsCustomizable: true,
    weight: "68 kg",
    assemblyRequired: false,
    leadTime: "6-8 weeks",
    warranty: "1 year against manufacturing defects",
    priceVisible: false,
    priceNote: "Price on request",
    projectSuitability: ["Residential", "Villa", "Hospitality"],
    availabilityRegion: "India",
    mainImageLink:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80",
    galleryImageLinks: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=80",
    ],
    lifestyleImageLinks: [
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1400&q=80",
    ],
    detailCloseupLinks: [
      "https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=80",
    ],
    swatchImageLinks: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=700&q=80",
    ],
    videoLink: "https://vimeo.com/123456789",
    videoType: "Product Walkthrough",
    cadFileLink: "https://example.com/files/aurelia-tech.pdf",
    arOr3dModelLink: "https://example.com/files/aurelia.glb",
    searchKeywords: [
      "designer sofa",
      "modern sofa",
      "luxe couch",
      "bespoke seating",
    ],
    roomTags: ["Living Room", "Lounge", "Master Suite"],
    styleTags: ["Contemporary", "Minimal", "Soft Luxury"],
    colorTags: ["Cream", "Beige", "Walnut"],
    materialTags: ["Wood", "Upholstery", "Brass"],
    clientApprovalStatus: "Approved",
    contentSource: "Client catalogue 2026",
    lastUpdated: "2026-06-09",
    notesForOsimiriTeam:
      "Need final fabric swatch confirmation before publishing and final production video link.",
  },
];

export function getDemoProductBySlug(slug: string) {
  return demoProducts.find((product) => product.slug === slug);
}
