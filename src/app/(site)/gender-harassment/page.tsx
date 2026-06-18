import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { FadeIn } from "@/components/ui/motion";
import { PdfViewer } from "@/components/pdf-viewer";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Gender Harassment Committee",
  description:
    "Members of the Gender Harassment Committee (Internal Complaints Committee) with contact details.",
};

export default async function GenderHarassmentPage() {
  const content = await getContent("page_gender_harassment");

  return (
    <>
      <PageHero
        breadcrumb="College"
        title="Gender Harassment Committee"
        subtitle={content.subtitle}
        image="/images/students.jpg"
      />

      <Section>
        {/* Helpline */}
        {content.tollFreeDisplay && (
          <FadeIn>
            <div className="mx-auto mb-16 max-w-3xl rounded-[var(--radius-lg)] border-l-4 border-l-danger bg-surface p-6 shadow-sm sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-wider text-danger">
                Report Harassment
              </p>
              <p className="mt-2 text-muted">
                To report any incident of gender / sexual harassment, call the
                helpline. All complaints are treated as confidential.
              </p>
              <a
                href={`tel:${content.tollFreeTel || content.tollFreeDisplay}`}
                className="mt-4 inline-flex items-center gap-3 text-2xl font-bold text-secondary hover:text-primary sm:text-3xl"
              >
                <span aria-hidden>☎</span>
                {content.tollFreeDisplay}
              </a>
            </div>
          </FadeIn>
        )}

        <FadeIn>
          <SectionHeading
            title="Gender Harassment Committee"
            subtitle="Details of the members of the Gender Harassment Committee (Internal Complaints Committee), with contact details including landline phone, mobile and email."
            align="left"
          />
        </FadeIn>
        {content.pdf_url && (
          <FadeIn delay={0.1}>
            <div className="mt-6">
              <PdfViewer
                url={content.pdf_url}
                title="Gender Harassment Committee"
                height="70vh"
              />
            </div>
          </FadeIn>
        )}
      </Section>
    </>
  );
}
