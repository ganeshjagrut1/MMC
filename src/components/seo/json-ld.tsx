import { SITE } from "@/lib/site";

const BASE = "https://maulimedicalcollege.com";

/** Organization + Website structured data for rich Google results. */
export function OrganizationJsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollegeOrUniversity",
        "@id": `${BASE}/#organization`,
        name: SITE.name,
        alternateName: SITE.shortName,
        url: BASE,
        logo: `${BASE}/brand/logo.png`,
        image: `${BASE}/images/about.jpg`,
        email: SITE.email,
        telephone: SITE.phone,
        foundingDate: String(SITE.established),
        address: {
          "@type": "PostalAddress",
          streetAddress: "Anjani Khurd, Tal: Lonar",
          addressLocality: "Buldhana",
          addressRegion: "Maharashtra",
          postalCode: "443302",
          addressCountry: "IN",
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: SITE.phone,
          contactType: "admissions",
          email: SITE.email,
        },
      },
      {
        "@type": "WebSite",
        "@id": `${BASE}/#website`,
        url: BASE,
        name: SITE.name,
        publisher: { "@id": `${BASE}/#organization` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
