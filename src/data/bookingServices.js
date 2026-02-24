export const serviceCategories = [
  { id: "all", label: "All Services" },
  { id: "braiding", label: "Braiding" },
  { id: "color", label: "Color" },
  { id: "treatment", label: "Treatment" },
  { id: "wig", label: "Wig" },
];

export const bookingServices = [
  {
    id: "wig-installation",
    name: "Wig Installation",
    category: "wig",
    description: "Professional wig installation with natural look",
    price: 150,
    durationMinutes: 30,
    discountPercent: null,
  },
  {
    id: "hair-coloring",
    name: "Hair Coloring",
    category: "color",
    description: "Full hair coloring with premium products",
    price: 80,
    durationMinutes: 90,
    discountPercent: 10,
  },
  {
    id: "cornrows",
    name: "Cornrows",
    category: "braiding",
    description: "Traditional cornrow braiding",
    price: 60,
    durationMinutes: 150,
    discountPercent: null,
  },
  {
    id: "hair-treatment",
    name: "Hair Treatment",
    category: "treatment",
    description: "Deep conditioning hair treatment",
    price: 50,
    durationMinutes: 90,
    discountPercent: 5,
  },
  {
    id: "claudia-premium",
    name: "Claudia Premium Service",
    category: "treatment",
    description: "Personal service by Claudia with VIP treatment",
    price: 100,
    durationMinutes: 30,
    discountPercent: null,
  },
  {
    id: "wig-styling",
    name: "Wig Styling",
    category: "wig",
    description: "Custom wig styling and finishing",
    price: 45,
    durationMinutes: 45,
    discountPercent: null,
  },
  {
    id: "braid-updo",
    name: "Braid Updo",
    category: "braiding",
    description: "Elegant braided updo for special occasions",
    price: 120,
    durationMinutes: 120,
    discountPercent: null,
  },
  {
    id: "color-touch-up",
    name: "Color Touch-Up",
    category: "color",
    description: "Root touch-up and gloss",
    price: 55,
    durationMinutes: 60,
    discountPercent: null,
  },
];

export const stylists = [
  { id: "team", name: "Team Member", addOnPrice: 0 },
  { id: "claudia", name: "Claudia", addOnPrice: 100 },
];

export const paymentMethods = [
  { id: "salon", name: "Pay in Salon" },
  { id: "card", name: "Card (online)" },
];

export const closedDays = ["Sunday", "Monday", "Tuesday"];
export const openHours = "Wednesday–Saturday: 10 am–8 pm";
