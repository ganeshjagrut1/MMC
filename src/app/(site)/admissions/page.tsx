import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import {
  Section,
  Card,
  ButtonLink,
  SectionHeading,
} from "@/components/ui/primitives";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/motion";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Admissions",
  description: "MBBS admission process and eligibility at Mauli Medical College.",
};

export default async function AdmissionsPage() {
  const content = await getContent("admissions");

  return (
    <>
      <PageHero
        breadcrumb="Admissions"
        title="MBBS Admissions"
        subtitle={content.subtitle}
        image="/images/students.jpg"
      />

      <Section>
        <FadeIn>
          <SectionHeading
            eyebrow="Process"
            title="Admission in 4 Steps"
            align="center"
          />
        </FadeIn>
        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {content.steps.map((s, i) => (
            <StaggerItem key={s.title}>
              <Card className="h-full">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-primary font-bold text-white">
                  {i + 1}
                </div>
                <h3 className="mt-4 font-semibold text-secondary">{s.title}</h3>
                <p className="mt-2 text-sm text-muted">{s.body}</p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section muted>
        <div className="grid gap-10 lg:grid-cols-2">
          <FadeIn>
            <SectionHeading
              eyebrow="Eligibility"
              title="Who Can Apply"
              align="left"
            />
            <ul className="mt-6 space-y-3">
              {content.eligibility.map((e) => (
                <li key={e} className="flex gap-3 text-muted">
                  <span className="mt-1 h-2 w-2 flex-none rounded-full bg-primary" />
                  <span>{e}</span>
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn delay={0.15}>
            <Card className="bg-secondary text-white">
              <h3 className="text-xl font-bold">Have questions?</h3>
              <p className="mt-2 text-white/80">
                Our admissions team is happy to guide you through eligibility,
                fees and the documentation process.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href="/contact" variant="accent">
                  Contact Admissions
                </ButtonLink>
              </div>
            </Card>
          </FadeIn>
        </div>
      </Section>

      {content.documents.some((d) => d.pdf_url) && (
        <Section>
          <FadeIn>
            <SectionHeading
              eyebrow="Downloads"
              title="Admission Documents"
              align="center"
            />
          </FadeIn>
          <div className="mx-auto mt-10 max-w-2xl divide-y divide-border overflow-hidden rounded-[var(--radius)] border border-border bg-surface">
            {content.documents
              .filter((d) => d.pdf_url)
              .map((d, i) => (
                <a
                  key={i}
                  href={d.pdf_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-5 py-4 transition-colors hover:bg-bg"
                >
                  <span className="font-medium text-secondary">{d.label}</span>
                  <span className="font-semibold text-primary">⬇ Download</span>
                </a>
              ))}
          </div>
        </Section>
      )}
    </>
  );
}
