export const categories = [
  { slug: "wig-coloring", name: "Wig Coloring", image: "/salon-portrait.png" },
  { slug: "cornrows", name: "Cornrows", image: "/salon-portrait.png" },
  { slug: "hair-services", name: "Hair Services", image: "/salon-portrait.png" },
  { slug: "wig-services", name: "Wig Services", image: "/salon-portrait.png" },
  { slug: "beauty-services", name: "Beauty Services", image: "/salon-portrait.png" },
  { slug: "hair-treatment", name: "Hair Treatment", image: "/salon-portrait.png" },
];

export function getCategoryBySlug(slug) {
  return categories.find((c) => c.slug === slug) || null;
}
