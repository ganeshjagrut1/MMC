import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/ui/primitives";
import { Stagger, StaggerItem } from "@/components/ui/motion";
import { getDepartments } from "@/lib/data";
import { DepartmentCard } from "@/components/department-card";

export const metadata: Metadata = {
  title: "Departments",
  description: "Explore the academic departments at Mauli Medical College.",
};

export default async function DepartmentsPage() {
  const departments = await getDepartments();

  return (
    <>
      <PageHero
        breadcrumb="Academics"
        title="Departments"
        subtitle="Our pre-clinical, para-clinical and clinical departments deliver a complete MBBS education."
        image="/images/lab.jpg"
      />

      <Section>
        {departments.length > 0 ? (
          <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {departments.map((d) => (
              <StaggerItem key={d.id}>
                <DepartmentCard department={d} />
              </StaggerItem>
            ))}
          </Stagger>
        ) : (
          <p className="text-center text-muted">
            No departments yet. Connect Supabase and run the seed SQL to
            populate this page.
          </p>
        )}
      </Section>
    </>
  );
}
