import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/page-hero";
import { Section, Card } from "@/components/ui/primitives";
import { Stagger, StaggerItem } from "@/components/ui/motion";
import { getContent } from "@/lib/content";

export const metadata: Metadata = { title: "Facilities" };

export default async function FacilitiesPage() {
  const content = await getContent("page_facilities");

  return (
    <>
      <PageHero
        breadcrumb="Campus"
        title="Facilities"
        subtitle={content.subtitle}
        image="/images/library.jpg"
      />

      <Section>
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {content.items.map((item) => (
            <StaggerItem key={item.label}>
              <Link href={item.href || "#"}>
                <Card className="flex h-full items-center gap-3 transition-colors hover:border-primary">
                  <span className="grid h-9 w-9 flex-none place-items-center rounded-full bg-primary/10 font-bold text-primary">
                    ✓
                  </span>
                  <span className="font-medium text-secondary">
                    {item.label}
                  </span>
                  <span className="ml-auto text-primary">›</span>
                </Card>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>
    </>
  );
}
