import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/data";
import { DepartmentForm } from "../department-form";

type Params = { params: Promise<{ id: string }> };

export default async function EditDepartmentPage({ params }: Params) {
  const { id } = await params;
  if (!isSupabaseConfigured()) notFound();

  const supabase = await createClient();
  const { data: department } = await supabase
    .from("departments")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!department) notFound();

  return (
    <div>
      <Link
        href="/admin/departments"
        className="text-sm font-medium text-primary hover:underline"
      >
        ← Back to departments
      </Link>
      <h1 className="mt-3 text-2xl font-bold text-secondary">
        Edit Department
      </h1>
      <div className="mt-6">
        <DepartmentForm department={department} />
      </div>
    </div>
  );
}
