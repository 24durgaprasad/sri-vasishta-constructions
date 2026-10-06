import { projects } from "@/data/projects";
import type { Project, SearchIntent } from "@/data/types";

export { projects };

export type PropertyCategory =
  | "flats"
  | "houses"
  | "villas"
  | "plots"
  | "commercial";

export type CategoryMeta = {
  id: PropertyCategory;
  label: string;
  href: string;
  description: string;
};

export const propertyCategories: CategoryMeta[] = [
  {
    id: "flats",
    label: "Flats",
    href: "/properties/flats",
    description: "Apartments in gated communities",
  },
  {
    id: "houses",
    label: "Houses",
    href: "/properties/houses",
    description: "Independent houses and row houses",
  },
  {
    id: "villas",
    label: "Villas",
    href: "/properties/villas",
    description: "Villas with private land",
  },
  {
    id: "plots",
    label: "Plots",
    href: "/properties/plots",
    description: "Approved layouts and land parcels",
  },
  {
    id: "commercial",
    label: "Commercial",
    href: "/properties/commercial",
    description: "Offices, shops and showrooms",
  },
];

export const categoryMeta = (id: PropertyCategory): CategoryMeta =>
  propertyCategories.find((item) => item.id === id) ?? propertyCategories[0];

const tokens = (value: string): string[] =>
  value
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);

export const categoryOf = (project: Project): PropertyCategory => {
  const text = `${project.name} ${project.badge ?? ""} ${project.bhks.join(
    " ",
  )}`.toLowerCase();

  if (/\b(offices?|showrooms?|retail|commercial)\b/.test(text)) {
    return "commercial";
  }
  if (/sq\.?\s*ft|\bacres?\b|\bplots?\b|land parcel/.test(text)) {
    return "plots";
  }
  if (/\bvillas?\b/.test(text)) return "villas";
  if (/\bhouses?\b|row house/.test(text)) return "houses";
  return "flats";
};

export const isCommercial = (project: Project): boolean =>
  categoryOf(project) === "commercial";

export const projectsInCategory = (category: PropertyCategory): Project[] =>
  projects.filter((project) => categoryOf(project) === category);

export const localitiesWithProjects = (): string[] =>
  Array.from(new Set(projects.map((project) => project.locality))).sort();

/** Counts parsed from labels like "3 BHK". Non-BHK labels (areas) are ignored. */
const bhkCounts = (project: Project): number[] =>
  project.bhks
    .filter((label) => /bhk/i.test(label))
    .map((label) => Number(label.match(/(\d+)/)?.[1]))
    .filter((value) => Number.isFinite(value) && value > 0);

const matchesBhkChip = (project: Project, chip: string): boolean => {
  const match = chip.match(/^(\d+)\s*BHK(\+)?$/i);
  if (!match) return false;
  const wanted = Number(match[1]);
  const counts = bhkCounts(project);
  return match[2] ? counts.some((count) => count >= wanted) : counts.includes(wanted);
};

const scopeForIntent = (intent: SearchIntent): Project[] => {
  if (intent === "rent") return [];
  if (intent === "commercial") return projectsInCategory("commercial");
  if (intent === "plots") return projectsInCategory("plots");
  return projects.filter((project) => !isCommercial(project));
};

export type SearchCriteria = {
  query?: string;
  intent?: SearchIntent;
  chips?: string[];
};

export const searchProjects = ({
  query,
  intent = "buy",
  chips = [],
}: SearchCriteria): Project[] => {
  const queryWords = tokens(query ?? "");
  const chipWords = chips.map((chip) => ({ chip, words: tokens(chip) }));

  const matchesWords = (words: string[], haystack: string[]): boolean =>
    words.every((word) => haystack.some((token) => token.includes(word)));

  return scopeForIntent(intent).filter((project) => {
    const text = [
      ...tokens(
        [
          project.name,
          project.locality,
          project.city,
          project.badge ?? "",
          project.bhks.join(" "),
          categoryOf(project),
        ].join(" "),
      ),
      ...tokens(categoryOf(project)),
    ];

    if (!matchesWords(queryWords, text)) return false;

    return chipWords.every(({ chip, words }) => {
      if (/^\d+\s*bhk\+?$/i.test(chip.trim()) && matchesBhkChip(project, chip)) {
        return true;
      }
      return matchesWords(words, text);
    });
  });
};

export const intentLabel: Record<SearchIntent, string> = {
  buy: "Buy",
  rent: "Rent",
  commercial: "Commercial",
  plots: "Plots",
};

export const isSearchIntent = (value: unknown): value is SearchIntent =>
  value === "buy" || value === "rent" || value === "commercial" || value === "plots";
