import { site } from "@/data/site";

export function OrganizationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: site.name,
    description: "RERA-approved apartments, villas, plots and commercial spaces in Visakhapatnam.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://vasishtaconstructions.com",
    telephone: site.phone,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.officeAddress.join(", "),
      addressLocality: site.city,
      addressRegion: "Andhra Pradesh",
      postalCode: "530051",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "17.7289",
      longitude: "83.3039",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "19:00",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
