import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/ui/primitives";
import { Stagger, StaggerItem } from "@/components/ui/motion";
import { getPublishedNews } from "@/lib/data";
import { NewsCard } from "@/components/news-card";

export const metadata: Metadata = {
  title: "News & Notices",
  description: "Latest news, notices and announcements from Mauli Medical College.",
};

export default async function NewsPage() {
  const news = await getPublishedNews();

  return (
    <>
      <PageHero
        breadcrumb="Updates"
        title="News & Notices"
        subtitle="Announcements, events and updates from the college."
        image="/images/research.jpg"
      />

      <Section>
        {news.length > 0 ? (
          <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {news.map((n) => (
              <StaggerItem key={n.id}>
                <NewsCard post={n} />
              </StaggerItem>
            ))}
          </Stagger>
        ) : (
          <p className="text-center text-muted">
            No published news yet. Add posts from the admin panel.
          </p>
        )}
      </Section>
    </>
  );
}
