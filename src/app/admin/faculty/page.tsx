import Link from "next/link";
import { getFaculty } from "@/lib/data";
import { deleteFaculty } from "./actions";
import { DeleteButton } from "@/components/admin/delete-button";

export default async function AdminFacultyPage() {
  const faculty = await getFaculty();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-secondary">Faculty</h1>
        <Link
          href="/admin/faculty/new"
          className="rounded-[var(--radius)] bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark"
        >
          + Add faculty
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-[var(--radius)] border border-border bg-surface">
        {faculty.length === 0 ? (
          <p className="p-6 text-sm text-muted">No faculty added yet.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-bg text-xs uppercase tracking-wider text-muted">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Designation</th>
                <th className="px-4 py-3">Department</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {faculty.map((f) => (
                <tr key={f.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 font-medium text-secondary">
                    {f.name}
                  </td>
                  <td className="px-4 py-3 text-muted">{f.designation}</td>
                  <td className="px-4 py-3 text-muted">{f.department}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-4">
                      <Link
                        href={`/admin/faculty/${f.id}`}
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        Edit
                      </Link>
                      <form action={deleteFaculty}>
                        <input type="hidden" name="id" value={f.id} />
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
