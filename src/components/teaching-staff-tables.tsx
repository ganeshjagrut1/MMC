import { TEACHING_STAFF, type StaffDept } from "@/lib/faculty-data";
import { FadeIn } from "@/components/ui/motion";

const badge: Record<string, string> = {
  "Professor & HOD": "bg-secondary text-white",
  "Dean & Professor": "bg-secondary text-white",
  Professor: "bg-primary/15 text-primary",
  "Associate Professor": "bg-primary/10 text-primary",
  "Assistant Professor": "bg-accent/15 text-accent-dark",
  "Senior Resident": "bg-success/10 text-success",
  "Junior Resident": "bg-info/10 text-info",
  Tutor: "bg-muted/10 text-muted",
  Statistician: "bg-muted/10 text-muted",
};

/** Renders teaching staff as department-wise HTML tables.
 *  Pass `groups` (e.g. from the DB) or it falls back to the bundled list. */
export function TeachingStaffTables({ groups }: { groups?: StaffDept[] }) {
  const data = groups && groups.length > 0 ? groups : TEACHING_STAFF;
  return (
    <div className="space-y-8">
      {data.map((dept) => (
        <FadeIn key={dept.slug}>
          <div className="overflow-hidden rounded-[var(--radius)] border border-border bg-surface">
            <div className="flex items-center justify-between gap-3 border-b border-border bg-bg px-5 py-3">
              <h3 className="font-bold text-secondary">
                Department of {dept.name}
              </h3>
              <span className="text-xs text-muted">
                {dept.members.length} members
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-border text-xs uppercase tracking-wider text-muted">
                  <tr>
                    <th className="px-5 py-2.5 w-14">S.No</th>
                    <th className="px-5 py-2.5">Name of Faculty</th>
                    <th className="px-5 py-2.5">Designation</th>
                  </tr>
                </thead>
                <tbody>
                  {dept.members.map((m, i) => (
                    <tr
                      key={`${dept.slug}-${i}`}
                      className="border-b border-border last:border-0"
                    >
                      <td className="px-5 py-2.5 text-muted">{i + 1}</td>
                      <td className="px-5 py-2.5 font-medium text-secondary">
                        {m.name}
                      </td>
                      <td className="px-5 py-2.5">
                        <span
                          className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            badge[m.designation] ?? "bg-muted/10 text-muted"
                          }`}
                        >
                          {m.designation}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </FadeIn>
      ))}
    </div>
  );
}
