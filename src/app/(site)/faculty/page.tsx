import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Section, SectionHeading } from "@/components/ui/primitives";
import { FadeIn } from "@/components/ui/motion";
import { getFaculty } from "@/lib/data";
import { getContent } from "@/lib/content";
import { PdfViewer } from "@/components/pdf-viewer";
import { TeachingStaffTables } from "@/components/teaching-staff-tables";
import { TEACHING_STAFF_COUNT, groupDbFaculty } from "@/lib/faculty-data";

export const metadata: Metadata = {
  title: "Faculty",
  description: "Meet the faculty and staff of Mauli Medical College.",
};

export default async function FacultyPage() {
  const [faculty, content] = await Promise.all([
    getFaculty(),
    getContent("faculty_page"),
  ]);

  // Prefer DB faculty (managed in the admin); fall back to the bundled list.
  const groups = faculty.length > 0 ? groupDbFaculty(faculty) : undefined;
  const count = faculty.length > 0 ? faculty.length : TEACHING_STAFF_COUNT;

  return (
    <>
      <PageHero
        breadcrumb="People"
        title="Faculty & Staff"
        subtitle={content.subtitle}
        image="/images/doctors.jpg"
      />

      <Section>
        <FadeIn>
          <SectionHeading
            eyebrow="Staff List"
            title={content.teaching_title}
            subtitle={`Our teaching faculty across all departments (${count} members).`}
            align="center"
          />
        </FadeIn>
        <div className="mt-12">
          <TeachingStaffTables groups={groups} />
        </div>

        {/* Original scanned list, kept as a download */}
        {content.teaching_pdf && (
          <div className="mt-10">
            <PdfViewer
              url={content.teaching_pdf}
              title="Teaching Staff — Official List (PDF)"
              height="60vh"
            />
          </div>
        )}
      </Section>

      {/* Non-teaching staff */}
      <Section muted>
        <FadeIn>
          <SectionHeading
            eyebrow="Staff List"
            title={content.nonteaching_title}
            align="center"
          />
          <div className="mt-10">
            {content.nonteaching_pdf ? (
              <PdfViewer
                url={content.nonteaching_pdf}
                title={content.nonteaching_title}
                height="60vh"
              />
            ) : (
              <p className="mx-auto max-w-2xl rounded-[var(--radius)] border border-dashed border-border bg-surface p-8 text-center text-muted">
                The non-teaching staff list will be published here shortly. It
                can be uploaded as a PDF or added as a table from the admin
                panel.
              </p>
            )}
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
