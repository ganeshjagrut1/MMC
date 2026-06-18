import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/page-hero";
import { Container, Card } from "@/components/ui/primitives";
import { FadeIn } from "@/components/ui/motion";
import { getContent } from "@/lib/content";
import { INFO_CONTENT, groupForSlug } from "@/lib/info-content";

type Params = { params: Promise<{ slug: string }> };

async function getItems() {
  const { items } = await getContent("info_pages");
  return items;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const item = (await getItems()).find((p) => p.slug === slug);
  return {
    title: item ? item.title : "Page",
    description: INFO_CONTENT[slug]?.intro[0]?.slice(0, 160),
  };
}

export default async function InfoPage({ params }: Params) {
  const { slug } = await params;
  const items = await getItems();
  const item = items.find((p) => p.slug === slug);
  if (!item) notFound();

  const rich = INFO_CONTENT[slug];
  const paragraphs =
    rich?.intro ??
    item.body
      .split("\n")
      .map((p) => p.trim())
      .filter(Boolean);
  const highlights = rich?.highlights ?? [];

  // Related pages in the same section (Hospital / Facilities / College)
  const group = groupForSlug(slug);
  const related =
    group?.slugs
      .map((s) => items.find((i) => i.slug === s))
      .filter((i): i is (typeof items)[number] => Boolean(i)) ?? [];

  return (
    <>
      <PageHero
        breadcrumb={group?.label ?? "Mauli Medical College"}
        title={item.title}
        image={item.image || "/brand/campus.jpg"}
      />

      <Container className="py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Main content */}
          <FadeIn className="lg:col-span-2">
            <article className="space-y-4 text-muted">
              {paragraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </article>

            {highlights.length > 0 && (
              <Card className="mt-8">
                <h2 className="text-lg font-bold text-secondary">
                  Key Features
                </h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3 text-muted">
                      <span className="mt-1.5 h-2 w-2 flex-none rounded-full bg-primary" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            )}
          </FadeIn>

          {/* Related-pages sidebar */}
          {related.length > 0 && (
            <aside className="lg:col-span-1">
              <div className="sticky top-40 rounded-[var(--radius)] border border-border bg-surface p-5">
                <h2 className="border-b border-border pb-3 text-lg font-bold text-secondary">
                  {group?.label}
                </h2>
                <ul className="mt-3 space-y-1">
                  {related.map((r) => {
                    const active = r.slug === slug;
                    return (
                      <li key={r.slug}>
                        <Link
                          href={`/p/${r.slug}`}
                          className={`flex items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                            active
                              ? "bg-primary text-white"
                              : "text-text hover:bg-bg hover:text-primary"
                          }`}
                        >
                          {r.title}
                          <span aria-hidden>›</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </aside>
          )}
        </div>
      </Container>
    </>
  );
}
