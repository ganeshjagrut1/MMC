import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/page-hero";
import { Section, Card } from "@/components/ui/primitives";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/motion";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "College",
  description:
    "About Mauli Medical College, Hospital & Research Center — college overview, university officers, and anti-ragging and anti-harassment information for students and parents.",
};

type LinkItem = { label: string; href: string };

function LinkColumn({ title, items }: { title: string; items: LinkItem[] }) {
  return (
    <Card className="h-full">
      <h3 className="border-b border-border pb-3 text-lg font-bold text-secondary">
        {title}
      </h3>
      <ul className="mt-4 space-y-1">
        {items.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className="flex items-start gap-3 rounded-md px-2 py-2 text-text transition-colors hover:bg-bg hover:text-primary"
            >
              <span className="mt-1.5 h-2 w-2 flex-none rounded-full bg-primary" />
              <span className="font-medium">{item.label}</span>
              <span className="ml-auto text-primary opacity-0 transition-opacity group-hover:opacity-100">
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export default async function CollegePage() {
  const content = await getContent("page_college");

  return (
    <>
      <PageHero
        breadcrumb="College"
        title="The College"
        subtitle={content.subtitle}
        image="/brand/campus.jpg"
      />

      <Section>
        <FadeIn>
          <div className="max-w-3xl space-y-4 text-muted">
            {content.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </FadeIn>

        <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
          <StaggerItem>
            <LinkColumn title="College" items={content.college} />
          </StaggerItem>
          <StaggerItem>
            <LinkColumn
              title="Non-Clinical Department"
              items={content.nonclinical}
            />
          </StaggerItem>
          <StaggerItem>
            <LinkColumn
              title="Student Section"
              items={content.student_section}
            />
          </StaggerItem>
        </Stagger>
      </Section>
    </>
  );
}
