"use client";

import type { Faculty } from "@/lib/supabase/types";
import { createFaculty, updateFaculty } from "./actions";
import { Field, Input, Textarea, SubmitButton } from "@/components/admin/form";
import { FileUpload } from "@/components/admin/file-upload";

export function FacultyForm({ member }: { member?: Faculty }) {
  const action = member ? updateFaculty.bind(null, member.id) : createFaculty;

  return (
    <form action={action} className="max-w-2xl space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="name" required>
          <Input id="name" name="name" defaultValue={member?.name} required />
        </Field>
        <Field label="Designation" htmlFor="designation">
          <Input
            id="designation"
            name="designation"
            placeholder="e.g. Professor & HOD"
            defaultValue={member?.designation ?? ""}
          />
        </Field>
        <Field label="Department" htmlFor="department">
          <Input
            id="department"
            name="department"
            defaultValue={member?.department ?? ""}
          />
        </Field>
        <Field label="Email" htmlFor="email">
          <Input
            id="email"
            name="email"
            type="email"
            defaultValue={member?.email ?? ""}
          />
        </Field>
      </div>

      <Field label="Qualifications" htmlFor="qualifications">
        <Input
          id="qualifications"
          name="qualifications"
          placeholder="e.g. MBBS, MD"
          defaultValue={member?.qualifications ?? ""}
        />
      </Field>

      <Field label="Photo" hint="Upload a profile photo or paste a URL.">
        <FileUpload
          name="photo_url"
          accept="image"
          defaultValue={member?.photo_url ?? ""}
        />
      </Field>

      <Field label="Bio" htmlFor="bio">
        <Textarea id="bio" name="bio" rows={5} defaultValue={member?.bio ?? ""} />
      </Field>

      <Field label="Sort order" htmlFor="sort_order" hint="Lower numbers appear first.">
        <Input
          id="sort_order"
          name="sort_order"
          type="number"
          defaultValue={member?.sort_order ?? 0}
          className="max-w-32"
        />
      </Field>

      <SubmitButton label={member ? "Update faculty" : "Create faculty"} />
    </form>
  );
}
