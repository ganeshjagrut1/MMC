import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { FadeIn } from "@/components/ui/motion";
import { PdfViewer } from "@/components/pdf-viewer";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Anti-Ragging Committee",
  description:
    "Members of the Anti-Ragging Committee with contact details, and the toll-free number to report ragging.",
};

export default async function AntiRaggingPage() {
  const content = await getContent("page_anti_ragging");

  return (
    <>
      <PageHero
        breadcrumb="College"
        title="Anti-Ragging Committee"
        subtitle={content.subtitle}
        image="/images/students.jpg"
      />

      <Section>
        {/* Toll-free helpline */}
        {content.tollFreeDisplay && (
          <FadeIn>
            <div className="mx-auto max-w-3xl rounded-[var(--radius-lg)] border-l-4 border-l-danger bg-surface p-6 shadow-sm sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-wider text-danger">
                Report Ragging
              </p>
              <p className="mt-2 text-muted">
                To report any incident of ragging, call the toll-free helpline.
                All complaints are treated as confidential.
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

        {/* Committee members document */}
        {content.pdf_url && (
          <div className="mt-16">
            <FadeIn>
              <SectionHeading
                title="Anti-Ragging Committee"
                subtitle="Details of the members of the Anti-Ragging Committee, with contact details including landline phone, mobile and email."
                align="left"
              />
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="mt-6">
                <PdfViewer
                  url={content.pdf_url}
                  title="Anti-Ragging Committee"
                  height="70vh"
                />
              </div>
            </FadeIn>
          </div>
        )}
      </Section>
    </>
  );
}
