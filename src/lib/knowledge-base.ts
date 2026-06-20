import { SITE, NAV_LINKS } from "@/lib/site";
import { DEFAULT_DEPARTMENTS } from "@/lib/departments-data";
import { DEPARTMENT_CONTENT } from "@/lib/department-content";
import { INFO_CONTENT } from "@/lib/info-content";
import { getPublishedNews } from "@/lib/data";

/** One searchable page/section of the site. */
export type SearchDoc = {
  title: string;
  url: string;
  text: string;
  /** Title-match weight multiplier (navigation/landing pages rank higher). */
  weight: number;
};

export type SearchResult = {
  title: string;
  url: string;
  snippet: string;
};

/** "central-library" -> "Central Library" */
function humanize(slug: string): string {
  return slug
    .split(/[-_]/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/**
 * Builds an index of THIS site's own content only — no external sources.
 * Used by the free on-site "Ask AI" search. Small enough to keep in memory.
 */
export async function buildSearchIndex(): Promise<SearchDoc[]> {
  const docs: SearchDoc[] = [];

  // Site overview / home — so "admission", "about", "location" land somewhere.
  docs.push({
    title: SITE.name,
    url: "/",
    weight: 2,
    text: `${SITE.tagline}. Established ${SITE.established}. Located at ${SITE.address}. Phone ${SITE.phone}, ${SITE.phoneAlt}. Email ${SITE.email}. NEET-based MBBS admission, teaching hospital and research center.`,
  });

  // Every nav page (navigational queries: "contact", "gallery", "faculty"…).
  for (const link of NAV_LINKS.flatMap((l) => [l, ...(l.children ?? [])])) {
    docs.push({
      title: link.label,
      url: link.href,
      weight: 2,
      text: `${link.label} — ${SITE.shortName}.`,
    });
  }

  // Departments (rich content).
  for (const d of DEFAULT_DEPARTMENTS) {
    const long = DEPARTMENT_CONTENT[d.slug]?.join(" ") ?? d.short_description;
    docs.push({
      title: `${d.name} Department`,
      url: `/departments/${d.slug}`,
      weight: 1,
      text: `${d.short_description} ${long}`,
    });
  }

  // Facilities / information pages.
  for (const [slug, c] of Object.entries(INFO_CONTENT)) {
    const highlights = c.highlights?.join("; ") ?? "";
    docs.push({
      title: humanize(slug),
      url: `/p/${slug}`,
      weight: 1,
      text: `${c.intro.join(" ")} ${highlights}`,
    });
  }

  // Published news / notices (best-effort — skipped if the DB isn't configured).
  try {
    const news = await getPublishedNews(20);
    for (const n of news) {
      docs.push({
        title: n.title,
        url: `/news/${n.slug}`,
        weight: 1,
        text: `${n.title} ${n.excerpt ?? ""}`,
      });
    }
  } catch {
    // ignore
  }

  return docs;
}

const STOP = new Set([
  "the", "a", "an", "of", "to", "is", "in", "on", "for", "and", "or", "do",
  "does", "how", "what", "where", "when", "i", "we", "you", "me", "my", "our",
  "can", "are", "at", "it", "this", "that", "with", "about",
]);

function tokenize(s: string): string[] {
  return s
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length > 1 && !STOP.has(t));
}

/** Pull a ~180-char snippet centred on the first matched term. */
function makeSnippet(text: string, terms: string[]): string {
  const lower = text.toLowerCase();
  let pos = -1;
  for (const t of terms) {
    const i = lower.indexOf(t);
    if (i !== -1 && (pos === -1 || i < pos)) pos = i;
  }
  if (pos === -1) return text.slice(0, 180).trim();
  const start = Math.max(0, pos - 60);
  const snippet = text.slice(start, start + 180).trim();
  return (start > 0 ? "…" : "") + snippet + (start + 180 < text.length ? "…" : "");
}

/**
 * Free keyword search over the site's own index. Ranks by query-term frequency
 * (title matches weighted heavily), returns the top matches with snippets.
 */
export function searchSite(
  query: string,
  index: SearchDoc[],
  limit = 6,
): SearchResult[] {
  const terms = tokenize(query);
  if (terms.length === 0) return [];

  const scored = index.map((doc) => {
    const title = doc.title.toLowerCase();
    const text = doc.text.toLowerCase();
    let score = 0;
    for (const t of terms) {
      if (title.includes(t)) score += 6 * doc.weight;
      // count occurrences in body text
      let from = 0;
      let n = 0;
      for (;;) {
        const i = text.indexOf(t, from);
        if (i === -1) break;
        n++;
        from = i + t.length;
      }
      score += n;
    }
    // Whole-phrase boost.
    if (text.includes(query.toLowerCase().trim())) score += 4;
    return { doc, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => ({
      title: s.doc.title,
      url: s.doc.url,
      snippet: makeSnippet(s.doc.text, terms),
    }));
}
