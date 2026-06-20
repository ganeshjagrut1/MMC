import {
  buildSearchIndex,
  searchSite,
  type SearchDoc,
} from "@/lib/knowledge-base";

// Reads news from the DB to build the index, so don't prerender.
export const dynamic = "force-dynamic";

// Cache the index in memory for an hour — it's identical across requests.
let indexCache: { docs: SearchDoc[]; at: number } | null = null;
const TTL_MS = 60 * 60 * 1000;

async function getIndex(): Promise<SearchDoc[]> {
  const now = Date.now();
  if (indexCache && now - indexCache.at < TTL_MS) return indexCache.docs;
  const docs = await buildSearchIndex();
  indexCache = { docs, at: now };
  return docs;
}

/**
 * Free on-site search — matches the visitor's question against THIS site's
 * own content only (no external sources, no paid AI API) and returns the most
 * relevant pages with snippets.
 */
export async function POST(request: Request) {
  let query = "";
  try {
    const data = (await request.json()) as { query?: unknown };
    if (typeof data.query === "string") query = data.query.trim();
  } catch {
    return Response.json({ results: [] }, { status: 400 });
  }

  if (!query) return Response.json({ results: [] });
  if (query.length > 200) query = query.slice(0, 200);

  const index = await getIndex();
  const results = searchSite(query, index);
  return Response.json(
    { results },
    { headers: { "Cache-Control": "no-store" } },
  );
}
