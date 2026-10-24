const priceRangeLabel = (min: number, max: number): string => {
  const toCr = (value: number) => {
    const crores = value / 10000000;
    if (crores >= 1) {
      return `₹${crores.toFixed(2).replace(/\.00$/, "").replace(/\.0$/, "")} Cr`;
    }
    const lakhs = value / 100000;
    return `₹${lakhs.toFixed(0)} L`;
  };

  return `${toCr(min)} - ${toCr(max)}`;
};

const priceFromLabel = (min: number): string => {
  const crores = min / 10000000;
  if (crores >= 1) {
    return `₹${crores.toFixed(2).replace(/\.00$/, "").replace(/\.0$/, "")} Cr`;
  }
  return `₹${(min / 100000).toFixed(0)} L`;
};

const formatNumber = (value: number): string =>
  new Intl.NumberFormat("en-IN").format(value);

const pricePerSqftLabel = (value: number): string =>
  `₹${formatNumber(value)}`;

const formatArea = (value: number): string => `${formatNumber(value)} sq.ft`;

const formatDimension = (feet: number): string => {
  const wholeFeet = Math.floor(feet);
  const inches = Math.round((feet - wholeFeet) * 12);
  if (inches === 12) {
    return `${wholeFeet + 1}' 0"`;
  }
  return `${wholeFeet}' ${inches}"`;
};

const slugify = (value: string): string =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const projectHref = (name: string): string => `/projects/${slugify(name)}`;

const emiFor = (
  principal: number,
  annualRatePercent: number,
  tenureYears: number,
): { emi: number; totalPayable: number; totalInterest: number } => {
  const months = Math.max(1, Math.round(tenureYears * 12));
  const monthlyRate = annualRatePercent / 1200;
  if (monthlyRate <= 0) {
    const emi = principal / months;
    return { emi, totalPayable: principal, totalInterest: 0 };
  }
  const factor = (1 + monthlyRate) ** months;
  const emi = (principal * monthlyRate * factor) / (factor - 1);
  const totalPayable = emi * months;
  return { emi, totalPayable, totalInterest: totalPayable - principal };
};

const formatPrice = (value: number): string => priceFromLabel(value);

export {
  priceRangeLabel,
  priceFromLabel,
  formatPrice,
  formatNumber,
  pricePerSqftLabel,
  formatArea,
  formatDimension,
  slugify,
  projectHref,
  emiFor,
};