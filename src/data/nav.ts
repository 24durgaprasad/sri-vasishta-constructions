import type { NavGroup } from "./types";

const propertyItems = [
  {
    label: "Flats",
    href: "/properties/flats",
    description: "Apartments in gated communities",
    icon: "building",
  },
  {
    label: "Houses",
    href: "/properties/houses",
    description: "Independent villas and row houses",
    icon: "home",
  },
  {
    label: "Plots",
    href: "/properties/plots",
    description: "Layouts and corner plots",
    icon: "map",
  },
  {
    label: "Villas",
    href: "/properties/villas",
    description: "Private villas with open land",
    icon: "villa",
  },
  {
    label: "Commercial Properties",
    href: "/properties/commercial",
    description: "Offices, shops and showrooms",
    icon: "store",
  },
] as const;

export const navGroups: NavGroup[] = [
  {
    id: "buyers",
    label: "For Buyers",
    href: "/buy",
    items: propertyItems.map((item) => ({ ...item })),
  },
  {
    id: "tenants",
    label: "For Tenants",
    href: "/rent",
    items: propertyItems.map((item) => ({ ...item })),
  },
  {
    id: "services",
    label: "Services",
    items: [
      {
        label: "EMI Calculator",
        href: "/tools/emi-calculator",
        description: "Monthly instalment on your loan",
        icon: "calculator",
      },
      {
        label: "Eligibility Calculator",
        href: "/tools/eligibility",
        description: "Check how much you can borrow",
        icon: "badge-check",
      },
      {
        label: "Affordability Calculator",
        href: "/tools/affordability",
        description: "Budget based on your income",
        icon: "wallet",
      },
      {
        label: "Price Calculator",
        href: "/tools/price",
        description: "Value a property instantly",
        icon: "tag",
      },
    ],
  },
  {
    id: "partners",
    label: "Partners",
    items: [
      {
        label: "Banks",
        href: "/partners/banks",
        description: "Home loan tie-ups",
        icon: "landmark",
      },
      {
        label: "Interior Designers",
        href: "/partners/interiors",
        description: "Turn-key interior execution",
        icon: "sofa",
      },
    ],
  },
];

const iconPaths: Record<string, string> = {
  building:
    "M3 21h18M5 21V7l7-4v18M19 21V11l-7-4M9 9h.01M9 13h.01M9 17h.01M15 13h.01M15 17h.01",
  home: "M3 10.5 12 3l9 7.5M5 9.5V21h14V9.5M9.5 21v-6h5v6",
  map: "M9 3 3 5v16l6-2 6 2 6-2V3l-6 2-6-2Zm0 0v16m6-14v16",
  villa:
    "M2 21h20M4 21V10l8-6 8 6v11M9 21v-5h6v5M8 12h.01M16 12h.01",
  store: "M3 9h18l-1.5 12H4.5L3 9Zm4 0V6a5 5 0 0 1 10 0v3M9.5 21v-6h5v6",
  calculator:
    "M6 3h12v18H6zM9 7h6M9 11h.01M12 11h.01M15 11h.01M9 15h.01M12 15h.01M15 15h.01M9 18h6",
  "badge-check": "M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Zm-3 9 2.5 2.5L16 10",
  wallet:
    "M3 7a2 2 0 0 1 2-2h12v4M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3M3 7h16a2 2 0 0 1 2 2v1M21 13h-4a2 2 0 0 0 0 4h4",
  tag: "M20.6 13.4 12 22l-9-9V4h9l8.6 8.6a1.4 1.4 0 0 1 0 2ZM7.5 8h.01",
  landmark: "M3 21h18M5 21V10m14 11V10M3 10l9-6 9 6M9 21v-5h6v5M8 13h.01M16 13h.01M12 13h.01",
  sofa: "M4 12a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5h3v3H3v-3h3v-5Zm3 0V8a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4",
};

export const navIconPath = (icon?: string): string =>
  (icon && iconPaths[icon]) ?? iconPaths.home;