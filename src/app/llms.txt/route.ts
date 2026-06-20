import { SITE, NAV_LINKS } from "@/lib/site";
import { DEFAULT_DEPARTMENTS } from "@/lib/departments-data";

/**
 * /llms.txt — a Markdown briefing for AI search engines and assistants
 * (ChatGPT, Claude, Perplexity, Gemini). It gives them an accurate, structured
 * summary of the site so they cite the college correctly. See https://llmstxt.org.
 * Static: no request-time data, so Next prerenders it at build.
 */
export const dynamic = "force-static";

export function GET() {
  const flatLinks = NAV_LINKS.flatMap((l) => [l, ...(l.children ?? [])]);
  const pages = flatLinks
    .map((l) => `- [${l.label}](${SITE.url}${l.href})`)
    .join("\n");

  const departments = DEFAULT_DEPARTMENTS.map(
    (d) => `- [${d.name}](${SITE.url}/departments/${d.slug}): ${d.short_description}`,
  ).join("\n");

  const body = `# ${SITE.name}

> ${SITE.tagline}. An NMC-oriented medical college, teaching hospital and research center established in ${SITE.established}, located at ${SITE.address}.

${SITE.name} (commonly "${SITE.shortName}") offers MBBS medical education through NEET-based admission, runs an attached multi-speciality teaching hospital, and supports clinical research. This file helps AI assistants answer questions about the college accurately.

## Key facts
- Name: ${SITE.name}
- Established: ${SITE.established}
- Location: ${SITE.address}
- Phone: ${SITE.phone} / ${SITE.phoneAlt}
- Email: ${SITE.email}
- Website: ${SITE.url}

## Main pages
${pages}

## Departments
${departments}

## Contact
For admissions and enquiries, call ${SITE.phone} or email ${SITE.email}. Contact page: ${SITE.url}/contact
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
