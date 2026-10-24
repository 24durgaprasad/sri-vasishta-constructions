import { projects } from "@/data/projects";
import { getProjectDetail } from "@/data/projectDetails";
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

/** Filler words that must never filter results out of a free-text query. */
const STOPWORDS = new Set([
  "in",
  "at",
  "for",
  "near",
  "with",
  "and",
  "or",
  "the",
  "a",
  "an",
  "of",
  "to",
  "on",
  "by",
  "from",
  "any",
  "all",
  "my",
  "our",
]);

const significant = (words: string[]): string[] =>
  words.filter((word) => !STOPWORDS.has(word));

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

export const projectsInCategory = (category: PropertyCategory, list: Project[] = projects): Project[] =>
  list.filter((project) => categoryOf(project) === category);

export const localitiesWithProjects = (list: Project[] = projects): string[] =>
  Array.from(new Set(list.map((project) => project.locality))).sort();

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

const READY_POSSESSION = new Set(["ready to move", "completed", "ready"]);

export const isReadyToMove = (project: Project): boolean => {
  if (/ready/.test((project.badge ?? "").toLowerCase())) return true;
  try {
    const possession = getProjectDetail(project.id).possessionDate?.toLowerCase().trim() ?? "";
    return READY_POSSESSION.has(possession);
  } catch {
    return false;
  }
};

const projectText = (project: Project): string =>
  [
    project.name,
    project.locality,
    project.city,
    project.badge ?? "",
    project.bhks.join(" "),
    categoryOf(project),
  ].join(" ").toLowerCase();

/**
 * Every home-search chip must resolve against real data — never silently
 * match nothing. Chips with no backing field are no-ops, not zero-result traps.
 */
const matchesChip = (project: Project, chip: string): boolean => {
  const label = chip.trim().toLowerCase();
  if (!label) return true;
  if (/^\d+\s*bhk\+?$/.test(label)) return matchesBhkChip(project, chip);
  if (label === "ready to move") return isReadyToMove(project);
  if (label === "under construction") return !isReadyToMove(project);
  if (label === "office space") return project.bhks.some((bhk) => /office/i.test(bhk));
  if (label === "showroom") return project.bhks.some((bhk) => /showroom/i.test(bhk));
  if (label === "retail shop") return project.bhks.some((bhk) => /retail|shop/i.test(bhk));
  if (label === "residential plot" || label === "corner plot") {
    return categoryOf(project) === "plots";
  }
  if (label === "commercial plot") return categoryOf(project) === "plots";
  if (label === "east facing") return /east|facing/.test(projectText(project));
  if (label === "approved layout") return /approv|r approved/.test(projectText(project)) || categoryOf(project) === "plots";
  if (label === "furnished" || label === "semi furnished" || label === "shared") return true;

  const words = significant(tokens(chip));
  if (words.length === 0) return true;
  const haystack = tokens(projectText(project));
  return words.every((word) => haystack.some((token) => token.includes(word)));
};

/** Free-text match shared by home search and the projects-page search bar. */
export const matchesQuery = (project: Project, query: string): boolean => {
  const words = significant(tokens(query));
  if (words.length === 0) return true;
  const haystack = tokens(projectText(project));
  return words.every((word) => haystack.some((token) => token.includes(word)));
};

const scopeForIntent = (intent: SearchIntent, list: Project[] = projects): Project[] => {
  if (intent === "rent") return [];
  if (intent === "commercial") return projectsInCategory("commercial", list);
  if (intent === "plots") return projectsInCategory("plots", list);
  return list.filter((project) => !isCommercial(project));
};

export type SearchCriteria = {
  query?: string;
  intent?: SearchIntent;
  chips?: string[];
};

export const searchProjects = (
  { query, intent = "buy", chips = [] }: SearchCriteria,
  list: Project[] = projects,
): Project[] => {
  const queryWords = significant(tokens(query ?? ""));

  const matchesWords = (words: string[], haystack: string[]): boolean =>
    words.every((word) => haystack.some((token) => token.includes(word)));

  return scopeForIntent(intent, list).filter((project) => {
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

    return chips.every((chip) => matchesChip(project, chip));
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
