import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/layout/page-hero";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/motion";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Top Officers of the University",
  description:
    "Top officers of the Maharashtra University of Health Sciences (MUHS), Nashik — the affiliating university.",
};

export default async function OfficersPage() {
  const content = await getContent("page_officers");

  return (
    <>
      <PageHero
        breadcrumb="University"
        title="Top Officers of the University"
        subtitle={content.subtitle}
        image="/images/campus.jpg"
      />

      <Section>
        <FadeIn>
          <SectionHeading
            eyebrow="MUHS, Nashik"
            title="University Leadership"
            align="center"
          />
        </FadeIn>

        <Stagger className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {content.officers.map((officer, i) => (
            <StaggerItem key={`${officer.name}-${i}`}>
              <div className="group relative flex h-full flex-col items-center rounded-[var(--radius-lg)] border border-border bg-surface p-6 text-center shadow-sm transition-shadow hover:shadow-md">
                <Image
                  src="/images/officers/awards-symbol.png"
                  alt=""
                  width={215}
                  height={184}
                  aria-hidden
                  className="pointer-events-none absolute right-4 top-4 h-16 w-auto opacity-10"
                />
                <div className="relative aspect-square w-40 overflow-hidden rounded-full bg-bg ring-4 ring-primary/15">
                  {officer.photo ? (
                    <Image
                      src={officer.photo}
                      alt={officer.name}
                      fill
                      sizes="160px"
                      className="object-cover object-top"
                    />
                  ) : (
                    <div className="grid h-full place-items-center text-5xl font-bold text-primary">
                      {officer.name.charAt(0)}
                    </div>
                  )}
                </div>
                <h3 className="mt-5 text-lg font-bold text-secondary">
                  {officer.name}
                </h3>
                <p className="mt-1 font-semibold text-primary">{officer.role}</p>
                {officer.office && (
                  <p className="mt-0.5 text-sm text-muted">{officer.office}</p>
                )}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>
    </>
  );
}
