import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/page-hero";
import { Section, Card, SectionHeading } from "@/components/ui/primitives";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/motion";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Hospital",
  description:
    "The attached multi-speciality teaching hospital of Mauli Medical College provides patient care and clinical training across all major departments in Buldhana, Maharashtra.",
};

const CLINICAL_DEPARTMENTS = [
  { label: "General Medicine", slug: "general-medicine" },
  { label: "Respiratory Medicine", slug: "respiratory" },
  { label: "Psychiatry", slug: "psychiatry" },
  { label: "Pediatrics", slug: "pediatrics" },
  { label: "General Surgery", slug: "general-surgery" },
  { label: "Orthopedics", slug: "orthopedics" },
  { label: "Ophthalmology", slug: "ophthalmology" },
  { label: "Obstetrics & Gynaecology", slug: "obgyn" },
  { label: "Anesthesia", slug: "anesthesia" },
  { label: "Radiodiagnosis", slug: "radiodiagnosis" },
];

export default async function HospitalPage() {
  const content = await getContent("page_hospital");

  return (
    <>
      <PageHero
        breadcrumb="Hospital"
        title="Hospital & Research Center"
        subtitle={content.subtitle}
        image="/images/hospital.jpg"
      />

      <Section>
        <FadeIn>
          <div className="max-w-3xl space-y-4 text-muted">
            {content.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </FadeIn>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {content.highlights.map((h) => (
            <Card key={h.label} className="text-center">
              <div className="text-3xl font-bold text-primary">{h.value}</div>
              <div className="mt-1 text-sm text-muted">{h.label}</div>
            </Card>
          ))}
        </div>
      </Section>

      {content.services.length > 0 && (
        <Section muted>
          <FadeIn>
            <SectionHeading
              eyebrow="Hospital"
              title="Services & Sections"
              align="center"
            />
          </FadeIn>
          <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {content.services.map((s) => (
              <StaggerItem key={s.label}>
                <Link href={s.href || "#"}>
                  <Card className="flex h-full items-center gap-3 transition-colors hover:border-primary">
                    <span className="grid h-10 w-10 flex-none place-items-center rounded-full bg-primary/10 font-bold text-primary">
                      +
                    </span>
                    <span className="font-medium text-secondary">
                      {s.label}
                    </span>
                    <span className="ml-auto text-primary">›</span>
                  </Card>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </Section>
      )}

      <Section>
        <FadeIn>
          <SectionHeading
            eyebrow="Clinical Departments"
            title="Specialities at Our Hospital"
            align="center"
          />
        </FadeIn>
        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CLINICAL_DEPARTMENTS.map((d) => (
            <StaggerItem key={d.slug}>
              <Link href={`/departments/${d.slug}`}>
                <Card className="flex h-full items-center gap-3 transition-colors hover:border-primary">
                  <span className="grid h-10 w-10 flex-none place-items-center rounded-full bg-secondary/10 font-bold text-secondary">
                    ⚕
                  </span>
                  <span className="font-medium text-secondary">{d.label}</span>
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
