export const site = {
  name: "Sri Vasishta Constructions",
  tagline: "Build Your Dreams",
  phone: "+91 88869 66669",
  phones: ["+91 88869 66669", "+91 99851 63163"],
  phoneHref: "tel:+918886966669",
  whatsapp: "https://wa.me/918886966669",
  email: "thevasishtaconstructions@gmail.com",
  address: "Visakhapatnam, Andhra Pradesh",
  city: "Visakhapatnam",
  officeAddress: [
    "5-139/9/4, 3 rd floor, Swarnamanjari Villa,",
    "Teachers Layout, Road No :1, SUJATHANAGAR,",
    "Pendurthi, Visakhapatnam-530051",
  ],
  rera: "AP00005123",
} as const;

export const footerColumns = [
  {
    id: "properties",
    title: "Properties",
    links: [
      { label: "Flats", href: "/properties/flats" },
      { label: "Houses", href: "/properties/houses" },
      { label: "Plots", href: "/properties/plots" },
      { label: "Villas", href: "/properties/villas" },
      { label: "Commercial", href: "/properties/commercial" },
    ],
  },
  {
    id: "services",
    title: "Services",
    links: [
      { label: "EMI Calculator", href: "/tools/emi-calculator" },
      { label: "Eligibility Calculator", href: "/tools/eligibility" },
      { label: "Affordability Calculator", href: "/tools/affordability" },
      { label: "Price Calculator", href: "/tools/price" },
      { label: "Interior Design", href: "/partners/interiors" },
    ],
  },
  {
    id: "company",
    title: "Company",
    links: [
      { label: "About Vasishta", href: "/about" },
      { label: "Our Projects", href: "/projects" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy Policy", href: "/legal/privacy" },
      { label: "Terms of Use", href: "/legal/terms" },
    ],
  },
];