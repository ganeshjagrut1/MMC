import Link from "next/link";
import { getDepartments } from "@/lib/data";
import { deleteDepartment } from "./actions";
import { DeleteButton } from "@/components/admin/delete-button";

export default async function AdminDepartmentsPage() {
  const departments = await getDepartments();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-secondary">Departments</h1>
        <Link
          href="/admin/departments/new"
          className="rounded-[var(--radius)] bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark"
        >
          + Add department
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-[var(--radius)] border border-border bg-surface">
        {departments.length === 0 ? (
          <p className="p-6 text-sm text-muted">
            No departments yet. Click “Add department” to create one.
          </p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-bg text-xs uppercase tracking-wider text-muted">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Slug</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((d) => (
                <tr key={d.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 font-medium text-secondary">
                    {d.name}
                  </td>
                  <td className="px-4 py-3 text-muted">{d.slug}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-4">
                      <Link
                        href={`/admin/departments/${d.id}`}
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        Edit
                      </Link>
                      <form action={deleteDepartment}>
                        <input type="hidden" name="id" value={d.id} />
                        <DeleteButton />
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
