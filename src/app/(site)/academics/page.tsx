import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/ui/primitives";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/motion";
import { getContent } from "@/lib/content";
import { getDepartments } from "@/lib/data";
import { DepartmentCard } from "@/components/department-card";

export const metadata: Metadata = {
  title: "Academics",
  description:
    "Explore the MBBS curriculum, academic programs and the pre-clinical, para-clinical and clinical departments at Mauli Medical College, Buldhana — structured to NMC standards.",
};

export default async function AcademicsPage() {
  const [content, departments] = await Promise.all([
    getContent("page_academics"),
    getDepartments(),
  ]);

  return (
    <>
      <PageHero
        breadcrumb="Academics"
        title="Academics"
        subtitle={content.subtitle}
        image="/images/students.jpg"
      />

      <Section>
        <FadeIn>
          <div className="max-w-3xl space-y-4 text-muted">
            {content.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </FadeIn>

        {departments.length > 0 && (
          <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {departments.map((d) => (
              <StaggerItem key={d.id}>
                <DepartmentCard department={d} />
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </Section>
    </>
  );
}
