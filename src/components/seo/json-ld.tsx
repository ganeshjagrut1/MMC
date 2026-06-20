import { SITE } from "@/lib/site";

const BASE = SITE.url;

/** Tiny helper so every JSON-LD block renders the same safe way. */
function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Organization + Website structured data for rich Google results.
 * The WebSite node's SearchAction tells Google the site is searchable, which
 * is what powers a brand "sitelinks search box" under the main result.
 */
export function OrganizationJsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["CollegeOrUniversity", "MedicalOrganization"],
        "@id": `${BASE}/#organization`,
        name: SITE.name,
        alternateName: [SITE.shortName, "Mauli Medical College Buldhana"],
        url: BASE,
        logo: `${BASE}/brand/logo.png`,
        image: `${BASE}/images/about.jpg`,
        email: SITE.email,
        telephone: SITE.phone,
        foundingDate: String(SITE.established),
        sameAs: SITE.sameAs,
        areaServed: "IN",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Anjani Khurd, Tal: Lonar",
          addressLocality: "Buldhana",
          addressRegion: "Maharashtra",
          postalCode: "443302",
          addressCountry: "IN",
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: SITE.phone,
            contactType: "admissions",
            email: SITE.email,
            areaServed: "IN",
            availableLanguage: ["en", "hi", "mr"],
          },
          {
            "@type": "ContactPoint",
            telephone: SITE.phoneAlt,
            contactType: "customer service",
            areaServed: "IN",
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${BASE}/#website`,
        url: BASE,
        name: SITE.name,
        alternateName: SITE.shortName,
        inLanguage: "en-IN",
        publisher: { "@id": `${BASE}/#organization` },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${BASE}/?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return <JsonLd data={graph} />;
}

/**
 * BreadcrumbList JSON-LD — give Google the page hierarchy so it can render a
 * breadcrumb trail (and helps sitelinks). Pass the trail for the current page.
 */
export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${BASE}${item.path}`,
    })),
  };
  return <JsonLd data={data} />;
}
