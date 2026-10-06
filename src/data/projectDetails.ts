import type { Project, ProjectDetail } from "./types";
import { projects } from "./projects";

/*
 * Optional per-project content. Every field below activates a section on the
 * project page when present; absent fields keep their section hidden. Supply
 * real values only — nothing here is seeded with placeholders.
 *
 * gallery?: string[] — extra photo URLs. The gallery renders when 2+ exist.
 * brochureUrl?: string — e.g. "/brochures/vasishta-grandeur.pdf".
 * brochurePreview?: string[] — brochure page thumbnails shown above the button.
 * specifications?: SpecGroup[] — e.g.
 *   [{ category: "Floor & Counter",
 *      rows: [{ label: "Living/Dining", value: "Vitrified Tiles" }] }]
 * ratings?: ProjectRatings — e.g.
 *   { overall: 4.2, count: 13,
 *     categories: [{ label: "Connectivity", score: 4.5 }] }
 * reviews?: ProjectReview[] — e.g.
 *   [{ author: "Dipali", role: "Owner", date: "1 year ago", rating: 4,
 *      pros: "Water supply is good.", cons: "Street lights need work.",
 *      helpful: 1 }]
 * qa?: QaItem[] — e.g.
 *   [{ question: "Does the project have power backup?",
 *      answer: "Yes, power backup is available.", answeredAgo: "3 years ago" }]
 */

const resiAmenities = (): ProjectDetail["amenities"] => [
  {
    category: "Fitness & Wellness",
    items: [
      "Fully equipped gymnasium",
      "Yoga and meditation deck",
      "Jogging track",
      "Swimming pool",
      "Steam and sauna",
      "Cycling track",
    ],
  },
  {
    category: "Leisure & Social",
    items: [
      "Children's play area",
      "Community hall",
      "Clubhouse with lounge",
      "Amphitheatre",
      "Senior citizens' court",
      "Pet park",
    ],
  },
  {
    category: "Sports & Outdoors",
    items: [
      "Badminton court",
      "Basketball court",
      "Skating rink",
      "Lawn tennis",
      "Cricket practice net",
      "Landscaped gardens",
    ],
  },
  {
    category: "Safety & Convenience",
    items: [
      "24x7 CCTV surveillance",
      "Gated community with intercom",
      "Power backup",
      "Visitor parking",
      "Rainwater harvesting",
      "Sewage treatment plant",
    ],
  },
  {
    category: "Green & Sustainable",
    items: [
      "Solar water heating",
      "STP-treated landscaping",
      "Electric vehicle charging",
      "Waste segregation points",
    ],
  },
];

const standardFaq = (name: string, locality: string, bhk: string): ProjectDetail["faq"] => [
  {
    question: `What configurations are available at ${name}?`,
    answer: `${name} offers ${bhk} apartments. Carpet areas range across the plans listed above, with prices varying by floor, tower orientation and view. Exact availability changes with each release, so please check with our sales team for the current inventory.`,
  },
  {
    question: `Is ${name} RERA registered?`,
    answer: `Yes. The project carries a RERA registration ID which is displayed on this page. You can verify the registration and its status independently on the official Andhra Pradesh RERA website using the same ID.`,
  },
  {
    question: `What is the expected possession date for ${name}?`,
    answer: `Possession is expected as per the schedule shown in the key facts panel above. Dates are committed through the RERA registration and revised timelines are published on the RERA portal. The date does not include delays caused by force majeure or regulatory changes.`,
  },
  {
    question: `What are the payment options for ${name}?`,
    answer: `We offer construction-linked payment plans alongside bank home loans from several leading lenders. A typical booking starts with a booking amount followed by construction-linked milestones, with a balance on possession. Our team can share the full schedule.`,
  },
  {
    question: `How is ${locality} connected to the rest of the city?`,
    answer: `${locality} has established road and public transport links, with schools, hospitals and retail within the surrounding neighbourhood. Exact distances for schools, hospitals, IT hubs and key landmarks are listed in the nearby section of this page.`,
  },
  {
    question: `Is the project ready to move in?`,
    answer: `Possession status is shown in the key facts panel. Ready-to-move units typically have completed infrastructure, functioning common areas and active lift operations. Under-construction homes are handed over at possession.`,
  },
];

const buildDetail = (input: {
  id: string;
  developer?: string;
  launchDate: string;
  possessionDate: string;
  landAreaAcres: number;
  towers: number;
  totalUnits: number;
  carpetMin: number;
  carpetMax: number;
  pricePerSqft: number;
  localityPricePerSqft: number;
  localityPriceTrend?: number;
  highlights: string[];
  aboutName: string;
  aboutLocality: string;
  bhkLabel: string;
  amenities?: ProjectDetail["amenities"];
  reraPrefix?: string;
  reraNumber: string;
  plot?: boolean;
}): ProjectDetail => {
  const project = projects.find((item) => item.id === input.id);
  if (!project) {
    throw new Error(`No project found for id ${input.id}`);
  }

  const span = input.carpetMax - input.carpetMin;
  const steps = project.bhks.length;
  const configurations = project.bhks.map((label, index) => {
    const areaSqft = Math.round(
      (input.carpetMin + (span / Math.max(steps - 1, 1)) * index) / 10,
    ) * 10;
    return {
      label,
      areaSqft,
      priceMin: Math.round((areaSqft * input.pricePerSqft) / 10000) * 10000,
      priceMax: Math.round(
        (areaSqft * input.pricePerSqft * 1.14) / 10000,
      ) * 10000,
    };
  });

  const bedCount = Math.min(
    Math.max(
      Number.parseInt(
        (project.bhks.find((b) => /\d+\s*BHK/i.test(b)) ?? "2").match(/\d+/)?.[0] ??
          "2",
        10,
      ),
      4,
    ),
    4,
  );

  const rooms: ProjectDetail["floorPlans"][number]["rooms"] = [
    { label: "Living / Drawing", width: 16, height: 13 },
    { label: "Kitchen", width: 10, height: 8 },
    { label: "Dining", width: 11, height: 9 },
    ...Array.from({ length: bedCount }, (_, i) => ({
      label: i === 0 ? "Master Bedroom" : `Bedroom ${i + 1}`,
      width: 13,
      height: 12,
    })),
    { label: "Kitchenette / Utility", width: 8, height: 7 },
    { label: "Common Bathroom", width: 8, height: 7 },
    { label: "Attached Bathroom", width: 7, height: 6 },
    { label: "Balcony", width: 14, height: 5 },
    { label: "Passage", width: 12, height: 6 },
  ];

  const floorPlans = configurations.map((config, index) => ({
    label: config.label,
    areaSqft: config.areaSqft,
    price: config.priceMin,
    rooms: index === 0 ? rooms.slice(0, 8) : rooms,
  }));

  return {
    developer: input.developer ?? "Sri Vasishta Constructions",
    launchDate: input.launchDate,
    possessionDate: input.possessionDate,
    reraId: `${input.reraPrefix ?? "AP"}${input.reraNumber}`,
    landAreaAcres: input.landAreaAcres,
    towers: input.towers,
    totalUnits: input.totalUnits,
    carpetMin: input.carpetMin,
    carpetMax: input.carpetMax,
    pricePerSqft: input.pricePerSqft,
    about: `${input.aboutName} is a RERA-approved ${input.plot ? "plotted development" : "residential development"} by ${input.developer ?? "Sri Vasishta Constructions"} in ${input.aboutLocality}. Laid out across ${input.landAreaAcres} acres with ${input.towers} ${input.towers === 1 ? "tower" : "towers"} and ${input.totalUnits} ${input.plot ? "plotted units" : "homes"}, the project offers ${project.bhks.join(", ")} in a carpet area range of ${input.carpetMin} to ${input.carpetMax} sq.ft. The layout is planned for natural light and cross ventilation, with landscaped open space at ground level and covered parking for every home. Construction is RERA registered and the possession schedule is published on the state RERA portal, so buyers can verify every claim independently before proceeding.`,
    highlights: input.highlights,
    configurations,
    amenities: input.amenities ?? resiAmenities(),
    floorPlans,
    nearby: [
      { name: "Nearest metro station", distance: "1.4 km" },
      { name: "International airport", distance: "32 km" },
      { name: "Major IT hub", distance: "6.8 km" },
      { name: "Reputed schools", distance: "1.9 km" },
      { name: "Multi-speciality hospital", distance: "3.2 km" },
      { name: "City centre", distance: "11 km" },
    ],
    localityPricePerSqft: input.localityPricePerSqft,
    localityPriceTrend: input.localityPriceTrend ?? 3.2,
    faq: standardFaq(
      input.aboutName,
      input.aboutLocality,
      project.bhks.join(" and "),
    ),
  };
};

const details: Record<string, ProjectDetail> = {};

const register = (id: string, value: ReturnType<typeof buildDetail>) => {
  details[id] = value;
};

register(
  "vc-01",
  buildDetail({
    id: "vc-01",
    launchDate: "Mar 2023",
    possessionDate: "Dec 2027",
    landAreaAcres: 4.2,
    towers: 3,
    totalUnits: 186,
    carpetMin: 1165,
    carpetMax: 2340,
    pricePerSqft: 8200,
    localityPricePerSqft: 8800,
    localityPriceTrend: 4.1,
    reraNumber: "00009912",
    highlights: [
      "Vast 70% open spaces with landscaped podium",
      "Sky lounge and rooftop pool deck",
      "Double-height entrance lobby with concierge",
      "Three-level basement parking",
      "EV charging at every tower",
    ],
    aboutName: "Vasishta Grandeur",
    aboutLocality: "Madhurawada",
    bhkLabel: "2, 3 and 4 BHK",
  }),
);

register(
  "vc-02",
  buildDetail({
    id: "vc-02",
    launchDate: "Jun 2021",
    possessionDate: "Ready to move",
    landAreaAcres: 2.8,
    towers: 2,
    totalUnits: 96,
    carpetMin: 1580,
    carpetMax: 2480,
    pricePerSqft: 9800,
    localityPricePerSqft: 10500,
    localityPriceTrend: 5.6,
    reraNumber: "00009913",
    highlights: [
      "Delivered and possession handed over",
      "Fully operational clubhouse and gym",
      "Close to financial district offices",
      "Minimal units per floor for privacy",
      "Rainwater harvesting across the site",
    ],
    aboutName: "The Vasishta Residences",
    aboutLocality: "MVP Colony",
    bhkLabel: "3 and 4 BHK",
  }),
);

register(
  "vc-03",
  buildDetail({
    id: "vc-03",
    launchDate: "Nov 2022",
    possessionDate: "Jun 2027",
    landAreaAcres: 3.1,
    towers: 2,
    totalUnits: 124,
    carpetMin: 985,
    carpetMax: 1870,
    pricePerSqft: 6800,
    localityPricePerSqft: 7200,
    localityPriceTrend: 3.8,
    reraNumber: "00009914",
    highlights: [
      "Most affordable entry point in the portfolio",
      "Vaastu-compliant master plan",
      "CCTV and access control at every entry",
      "Children's play area on the podium",
      "Walk to the metro and bus depot",
    ],
    aboutName: "Vasishta Skyline",
    aboutLocality: "Gajuwaka",
    bhkLabel: "2 and 3 BHK",
  }),
);

register(
  "vc-04",
  buildDetail({
    id: "vc-04",
    launchDate: "Jan 2024",
    possessionDate: "Mar 2028",
    landAreaAcres: 6.4,
    towers: 4,
    totalUnits: 268,
    carpetMin: 1820,
    carpetMax: 2760,
    pricePerSqft: 8400,
    localityPricePerSqft: 9000,
    localityPriceTrend: 6.2,
    reraNumber: "00009915",
    highlights: [
      "Largest master plan in the portfolio",
      "Four towers with private balconies on every home",
      "1.5 km internal walking and cycling loop",
      "Dedicated senior citizens' pavilion",
      "Amphitheatre and open-air cinema lawn",
    ],
    aboutName: "Vasishta Meadows",
    aboutLocality: "Yendada",
    bhkLabel: "3 and 4 BHK",
  }),
);

register(
  "vc-05",
  buildDetail({
    id: "vc-05",
    launchDate: "Aug 2022",
    possessionDate: "Sep 2026",
    landAreaAcres: 2.4,
    towers: 2,
    totalUnits: 108,
    carpetMin: 940,
    carpetMax: 1690,
    pricePerSqft: 6200,
    localityPricePerSqft: 6600,
    localityPriceTrend: 4.4,
    reraNumber: "00009916",
    highlights: [
      "Close to the tech corridor",
      "Efficient 2 BHK and 3 BHK layouts",
      "Community hall and creche on the podium",
      "Solar-assisted common lighting",
      "Underground parking with visitor bays",
    ],
    aboutName: "Vasishta Enclave",
    aboutLocality: "Pendurthi",
    bhkLabel: "2 and 3 BHK",
  }),
);

register(
  "vc-06",
  buildDetail({
    id: "vc-06",
    developer: "Vasishta Commercial LLP",
    launchDate: "Feb 2023",
    possessionDate: "Nov 2026",
    landAreaAcres: 3.6,
    towers: 2,
    totalUnits: 74,
    carpetMin: 1240,
    carpetMax: 6200,
    pricePerSqft: 8800,
    localityPricePerSqft: 8800,
    localityPriceTrend: 3.2,
    reraNumber: "00009917",
    highlights: [
      "Grade-A office floor plates",
      "Showrooms on the ground floor",
      "Four-level basement parking",
      "Dedicated visitor and service lobbies",
      "Signage rights on all tower facades",
    ],
    aboutName: "Vasishta Business Park",
    aboutLocality: "Madhurawada",
    bhkLabel: "office spaces and showrooms",
    amenities: [
      {
        category: "Office Infrastructure",
        items: [
          "Fibre-ready floor plates",
          "Dedicated server rooms",
          "Double-height entrance lobby",
          "Back-of-house service area",
          "Loading bays per tower",
        ],
      },
      {
        category: "Amenity",
        items: [
          "Business centre with conference rooms",
          "Food court and cafe",
          "Rooftop terrace",
          "Fitness studio",
          "Creche facility",
        ],
      },
      {
        category: "Parking & Access",
        items: [
          "Four-level basement parking",
          "Valet and visitor parking",
          "24x7 security and access control",
          "EV charging bays",
        ],
      },
      {
        category: "Sustainability",
        items: [
          "IGBC pre-certification target",
          "STP and rainwater harvesting",
          "Natural daylight optimisation",
        ],
      },
    ],
  }),
);

register(
  "vc-07",
  buildDetail({
    id: "vc-07",
    launchDate: "Sep 2021",
    possessionDate: "Jun 2026",
    landAreaAcres: 5.8,
    towers: 2,
    totalUnits: 64,
    carpetMin: 3200,
    carpetMax: 5400,
    pricePerSqft: 11500,
    localityPricePerSqft: 12200,
    localityPriceTrend: 7.2,
    reraNumber: "00009918",
    highlights: [
      "Private plunge pool per villa cluster",
      "Double-height living spaces",
      "Dedicated home automation",
      "Two carports and a service area",
      "Gated community with single entry point",
    ],
    aboutName: "Vasishta Palms",
    aboutLocality: "Kommadi",
    bhkLabel: "4 and 5 BHK",
  }),
);

register(
  "vc-08",
  buildDetail({
    id: "vc-08",
    launchDate: "Apr 2024",
    possessionDate: "Dec 2028",
    landAreaAcres: 7.1,
    towers: 4,
    totalUnits: 312,
    carpetMin: 1940,
    carpetMax: 3120,
    pricePerSqft: 8600,
    localityPricePerSqft: 9200,
    localityPriceTrend: 5.1,
    reraNumber: "00009919",
    highlights: [
      "Four towers, all with unobstructed views",
      "Sky deck on the tallest tower",
      "Two-level clubhouse",
      "Cricket pitch and cycling loop",
      "RERA registered with published quarterly progress",
    ],
    aboutName: "Vasishta Crest",
    aboutLocality: "Seethammadhara",
    bhkLabel: "3 and 4 BHK",
  }),
);

register(
  "vc-09",
  buildDetail({
    id: "vc-09",
    launchDate: "Nov 2022",
    possessionDate: "Mar 2027",
    landAreaAcres: 2.9,
    towers: 2,
    totalUnits: 112,
    carpetMin: 1720,
    carpetMax: 2680,
    pricePerSqft: 10800,
    localityPricePerSqft: 11500,
    localityPriceTrend: 8.4,
    reraNumber: "00009920",
    highlights: [
      "Partial sea and skyline views",
      "Sky lounge overlooking the bay",
      "Four-level basement parking",
      "Concierge and valet services",
      "Beach-facing jogging track",
    ],
    aboutName: "The Vasishta Bay",
    aboutLocality: "Rushikonda",
    bhkLabel: "3 and 4 BHK",
  }),
);

register(
  "vc-10",
  buildDetail({
    id: "vc-10",
    launchDate: "Jul 2021",
    possessionDate: "Completed",
    landAreaAcres: 3.3,
    towers: 3,
    totalUnits: 148,
    carpetMin: 1120,
    carpetMax: 1980,
    pricePerSqft: 7900,
    localityPricePerSqft: 9200,
    localityPriceTrend: 6.9,
    reraNumber: "00009921",
    highlights: [
      "Sea-breeze ventilated towers on all floors",
      "Completed and fully occupied",
      "Podium-level landscaped deck",
      "Established neighbourhood with schools nearby",
      "Dedicated visitor parking",
    ],
    aboutName: "Vasishta Heights",
    aboutLocality: "Seethammadhara",
    bhkLabel: "2 and 3 BHK",
  }),
);

register(
  "vc-11",
  buildDetail({
    id: "vc-11",
    launchDate: "May 2023",
    possessionDate: "Aug 2027",
    landAreaAcres: 3.9,
    towers: 3,
    totalUnits: 156,
    carpetMin: 1880,
    carpetMax: 2960,
    pricePerSqft: 7200,
    localityPricePerSqft: 7600,
    localityPriceTrend: 4.9,
    reraNumber: "00009922",
    highlights: [
      "Wide balconies on every home",
      "Community pavilion and library",
      "Two-level basement parking",
      "Rainwater harvesting and STP",
      "Centrally located with schools within 2 km",
    ],
    aboutName: "Vasishta Solitaire",
    aboutLocality: "NAD Junction",
    bhkLabel: "3 and 4 BHK",
  }),
);

register(
  "vc-12",
  buildDetail({
    id: "vc-12",
    developer: "Vasishta Infra Projects",
    launchDate: "Dec 2022",
    possessionDate: "Immediate registration",
    landAreaAcres: 11.4,
    towers: 0,
    totalUnits: 148,
    carpetMin: 1200,
    carpetMax: 3600,
    pricePerSqft: 2200,
    localityPricePerSqft: 2500,
    localityPriceTrend: 5.8,
    reraNumber: "00009923",
    plot: true,
    highlights: [
      "VMRDA-approved layout with numbered plots",
      "Underground utilities already laid",
      "Black-top internal roads",
      "Park and community hall reserved",
      "Clear title with no encumbrance",
    ],
    aboutName: "Vasishta Plots",
    aboutLocality: "Anandapuram",
    bhkLabel: "plotted layouts of 1200 and 2400 sq.ft",
    amenities: [
      {
        category: "Layout & Infrastructure",
        items: [
          "Numbered plots with demarcation pillars",
          "Black-top internal roads",
          "Underground water and sewer lines",
          "Electric poles with feeder connection",
          "Stormwater drains",
        ],
      },
      {
        category: "Open Spaces",
        items: [
          "Central landscaped park",
          "Community hall plot",
          "Children's play area",
          "Avenue tree plantation",
        ],
      },
      {
        category: "Approvals",
        items: [
          "VMRDA layout approval",
          "RERA registered plotted development",
          "Clear title documentation",
          "Possession letter on registration",
        ],
      },
    ],
  }),
);

register(
  "vc-13",
  buildDetail({
    id: "vc-13",
    developer: "Vasishta Commercial LLP",
    launchDate: "Oct 2023",
    possessionDate: "Apr 2027",
    landAreaAcres: 2.2,
    towers: 2,
    totalUnits: 68,
    carpetMin: 880,
    carpetMax: 4800,
    pricePerSqft: 9200,
    localityPricePerSqft: 9800,
    localityPriceTrend: 6.1,
    reraNumber: "00009924",
    highlights: [
      "Ground-floor retail on the main frontage",
      "High rental yield on commercial leases",
      "Dedicated lift lobbies for office floors",
      "Sufficient parking ratio for commercial use",
      "Near the highway and BRTS corridor",
    ],
    aboutName: "Vasishta Business Hub",
    aboutLocality: "Dwaraka Nagar",
    bhkLabel: "office and retail spaces",
    amenities: [
      {
        category: "Office Infrastructure",
        items: [
          "Fibre-ready floor plates",
          "Dedicated lift lobbies",
          "Back-of-house service area",
          "Loading bays",
          "Power backup for common areas",
        ],
      },
      {
        category: "Retail & Amenity",
        items: [
          "Ground-floor retail units",
          "Food court",
          "Rooftop terrace",
          "Fitness studio",
        ],
      },
      {
        category: "Parking & Access",
        items: [
          "Two-level basement parking",
          "Visitor parking",
          "24x7 security and access control",
        ],
      },
    ],
  }),
);

register(
  "vc-14",
  buildDetail({
    id: "vc-14",
    launchDate: "Mar 2022",
    possessionDate: "Nov 2026",
    landAreaAcres: 2.6,
    towers: 2,
    totalUnits: 104,
    carpetMin: 1240,
    carpetMax: 2140,
    pricePerSqft: 6400,
    localityPricePerSqft: 6900,
    localityPriceTrend: 4.2,
    reraNumber: "00009925",
    highlights: [
      "Central Duvvada location",
      "Rooftop community terrace",
      "Fully operational gym and yoga studio",
      "Two-level basement parking",
      "Pet park and children's play area",
    ],
    aboutName: "Vasishta Square",
    aboutLocality: "Duvvada",
    bhkLabel: "2 and 3 BHK",
  }),
);

register(
  "vc-15",
  buildDetail({
    id: "vc-15",
    launchDate: "Jan 2024",
    possessionDate: "Jun 2028",
    landAreaAcres: 3.4,
    towers: 3,
    totalUnits: 142,
    carpetMin: 1760,
    carpetMax: 2680,
    pricePerSqft: 8900,
    localityPricePerSqft: 8800,
    localityPriceTrend: 5.4,
    reraNumber: "00009926",
    highlights: [
      "Tallest towers in the Madhurawada cluster",
      "Sky lounge and observation deck",
      "Fully serviced luxury apartments",
      "Four-level basement parking",
      "Close to the IT corridor",
    ],
    aboutName: "Vasishta Serene",
    aboutLocality: "Madhurawada",
    bhkLabel: "3 and 4 BHK",
  }),
);

register(
  "vc-16",
  buildDetail({
    id: "vc-16",
    developer: "Vasishta Infra Projects",
    launchDate: "Aug 2023",
    possessionDate: "Immediate registration",
    landAreaAcres: 8.6,
    towers: 0,
    totalUnits: 32,
    carpetMin: 5000,
    carpetMax: 43560,
    pricePerSqft: 1800,
    localityPricePerSqft: 2100,
    localityPriceTrend: 9.2,
    reraNumber: "00009927",
    plot: true,
    highlights: [
      "IT park and residential development corridor",
      "Clear title with 30-foot access road",
      "Suitable for villa and township projects",
      "Power and water connection points at the boundary",
      "Individual block handover on registration",
    ],
    aboutName: "Vasishta Land Parcel",
    aboutLocality: "Bheemili",
    bhkLabel: "land parcels from 5000 sq.ft to 1 acre",
    amenities: [
      {
        category: "Parcel",
        items: [
          "Clear title documentation",
          "30-foot access road",
          "Boundary demarcation",
          "Power and water connection points",
        ],
      },
      {
        category: "Location",
        items: [
          "Close to the IT park",
          "Within the Bheemili growth corridor",
          "Highway access at 3 km",
          "Vizag airport at 22 km",
        ],
      },
    ],
  }),
);

register(
  "vc-17",
  buildDetail({
    id: "vc-17",
    launchDate: "Feb 2022",
    possessionDate: "Aug 2026",
    landAreaAcres: 4.8,
    towers: 3,
    totalUnits: 198,
    carpetMin: 890,
    carpetMax: 1560,
    pricePerSqft: 5800,
    localityPricePerSqft: 6200,
    localityPriceTrend: 5.7,
    reraNumber: "00009928",
    highlights: [
      "Most affordable configuration in Visakhapatnam",
      "Largest green cover among budget projects",
      "CCTV and gated entry",
      "Near schools and the main market",
      "Flexible payment plans on booking",
    ],
    aboutName: "Vasishta Terra",
    aboutLocality: "Kurmannapalem",
    bhkLabel: "2 and 3 BHK",
  }),
);

register(
  "vc-18",
  buildDetail({
    id: "vc-18",
    launchDate: "Jul 2023",
    possessionDate: "Dec 2027",
    landAreaAcres: 3.1,
    towers: 2,
    totalUnits: 116,
    carpetMin: 960,
    carpetMax: 1740,
    pricePerSqft: 7600,
    localityPricePerSqft: 9000,
    localityPriceTrend: 6.3,
    reraNumber: "00009929",
    highlights: [
      "Close to the IT corridor and airport road",
      "Rooftop pool and sky lounge",
      "Wide balconies in every configuration",
      "Vaastu-compliant layouts",
      "Gated community with 24x7 security",
    ],
    aboutName: "Vasishta Icon",
    aboutLocality: "Yendada",
    bhkLabel: "2 and 3 BHK",
  }),
);

const getProjectDetail = (id: string): ProjectDetail => {
  const detail = details[id];
  if (!detail) {
    throw new Error(`No project detail record for id ${id}`);
  }
  return detail;
};

const getProjectWithDetail = (project: Project): {
  project: Project;
  detail: ProjectDetail;
} => ({ project, detail: getProjectDetail(project.id) });

const detailsList = projects.map((project) => getProjectWithDetail(project));

export { getProjectDetail, getProjectWithDetail, detailsList };