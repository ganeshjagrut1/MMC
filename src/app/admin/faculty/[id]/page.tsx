import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/data";
import { FacultyForm } from "../faculty-form";

type Params = { params: Promise<{ id: string }> };

export default async function EditFacultyPage({ params }: Params) {
  const { id } = await params;
  if (!isSupabaseConfigured()) notFound();

  const supabase = await createClient();
  const { data: member } = await supabase
    .from("faculty")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!member) notFound();

  return (
    <div>
      <Link
        href="/admin/faculty"
        className="text-sm font-medium text-primary hover:underline"
      >
        ← Back to faculty
      </Link>
      <h1 className="mt-3 text-2xl font-bold text-secondary">Edit Faculty</h1>
      <div className="mt-6">
        <FacultyForm member={member} />
      </div>
    </div>
  );
}
