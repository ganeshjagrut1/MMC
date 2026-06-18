import Link from "next/link";
import { DepartmentForm } from "../department-form";

export default function NewDepartmentPage() {
  return (
    <div>
      <Link
        href="/admin/departments"
        className="text-sm font-medium text-primary hover:underline"
      >
        ← Back to departments
      </Link>
      <h1 className="mt-3 text-2xl font-bold text-secondary">New Department</h1>
      <div className="mt-6">
        <DepartmentForm />
      </div>
    </div>
  );
}
