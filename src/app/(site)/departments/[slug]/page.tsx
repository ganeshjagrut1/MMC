import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/primitives";
import { FadeIn } from "@/components/ui/motion";
import { getDepartmentBySlug, getDepartments, getFaculty } from "@/lib/data";
import { DEPARTMENT_CONTENT } from "@/lib/department-content";
import { staffForDepartment } from "@/lib/faculty-data";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const dept = await getDepartmentBySlug(slug);
  return {
    title: dept ? dept.name : "Department",
    description: dept?.short_description ?? undefined,
  };
}

export default async function DepartmentDetailPage({ params }: Params) {
  const { slug } = await params;
  const [dept, all, allFaculty] = await Promise.all([
    getDepartmentBySlug(slug),
    getDepartments(),
    getFaculty(),
  ]);
  if (!dept) notFound();

  // Priority: admin-edited DB description > scraped long content > short text.
  const dbParas = dept.description?.trim()
    ? dept.description.split("\n").map((p) => p.trim()).filter(Boolean)
    : null;
  const paragraphs =
    dbParas ??
    DEPARTMENT_CONTENT[dept.slug] ??
    (dept.short_description ? [dept.short_description] : []);

  // Prefer DB faculty for this department (matched by name); else bundled list.
  const dbStaff = allFaculty
    .filter((f) => f.department === dept.name)
    .map((f) => ({ name: f.name, designation: f.designation || "" }));
  const staff = dbStaff.length > 0 ? dbStaff : staffForDepartment(dept.slug);

  return (
    <>
      <PageHero
        breadcrumb="Department"
        title={dept.name}
        subtitle={dept.short_description ?? undefined}
        image={dept.image_url ?? "/images/lab.jpg"}
      />

      <Container className="py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Main content */}
          <FadeIn className="lg:col-span-2">
            <article className="space-y-4 text-muted">
              {paragraphs.length > 0 ? (
                paragraphs.map((para, i) => <p key={i}>{para}</p>)
              ) : (
                <p>
                  Detailed information for the {dept.name} department will be
                  added soon.
                </p>
              )}
            </article>

            {staff.length > 0 && (
              <div className="mt-10 overflow-hidden rounded-[var(--radius)] border border-border bg-surface">
                <div className="flex items-center justify-between gap-3 border-b border-border bg-bg px-5 py-3">
                  <h2 className="font-bold text-secondary">
                    Faculty &amp; Staff
                  </h2>
                  <span className="text-xs text-muted">
                    {staff.length} members
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="border-b border-border text-xs uppercase tracking-wider text-muted">
                      <tr>
                        <th className="px-5 py-2.5 w-14">S.No</th>
                        <th className="px-5 py-2.5">Name</th>
                        <th className="px-5 py-2.5">Designation</th>
                      </tr>
                    </thead>
                    <tbody>
                      {staff.map((m, i) => (
                        <tr
                          key={i}
                          className="border-b border-border last:border-0"
                        >
                          <td className="px-5 py-2.5 text-muted">{i + 1}</td>
                          <td className="px-5 py-2.5 font-medium text-secondary">
                            {m.name}
                          </td>
                          <td className="px-5 py-2.5 text-muted">
                            {m.designation}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <Link
              href="/departments"
              className="mt-8 inline-block text-sm font-medium text-primary hover:underline"
            >
              ← Back to all departments
            </Link>
          </FadeIn>

          {/* Departments sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-40 rounded-[var(--radius)] border border-border bg-surface p-5">
              <h2 className="border-b border-border pb-3 text-lg font-bold text-secondary">
                Departments
              </h2>
              <ul className="mt-3 space-y-1">
                {all.map((d) => {
                  const active = d.slug === dept.slug;
                  return (
                    <li key={d.id}>
                      <Link
                        href={`/departments/${d.slug}`}
                        className={`flex items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                          active
                            ? "bg-primary text-white"
                            : "text-text hover:bg-bg hover:text-primary"
                        }`}
                      >
                        {d.name}
                        <span aria-hidden>›</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}
