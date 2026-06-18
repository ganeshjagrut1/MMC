import Link from "next/link";
import { FacultyForm } from "../faculty-form";

export default function NewFacultyPage() {
  return (
    <div>
      <Link
        href="/admin/faculty"
        className="text-sm font-medium text-primary hover:underline"
      >
        ← Back to faculty
      </Link>
      <h1 className="mt-3 text-2xl font-bold text-secondary">New Faculty</h1>
      <div className="mt-6">
        <FacultyForm />
      </div>
    </div>
  );
}
