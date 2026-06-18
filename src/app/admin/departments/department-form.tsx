"use client";

import type { Department } from "@/lib/supabase/types";
import { createDepartment, updateDepartment } from "./actions";
import { Field, Input, Textarea, SubmitButton } from "@/components/admin/form";
import { FileUpload } from "@/components/admin/file-upload";

export function DepartmentForm({ department }: { department?: Department }) {
  const action = department
    ? updateDepartment.bind(null, department.id)
    : createDepartment;

  return (
    <form action={action} className="max-w-2xl space-y-5">
      <Field label="Name" htmlFor="name" required>
        <Input id="name" name="name" defaultValue={department?.name} required />
      </Field>

      <Field
        label="Slug"
        htmlFor="slug"
        hint="URL path, e.g. 'general-surgery'. Leave blank to auto-generate from the name."
      >
        <Input id="slug" name="slug" defaultValue={department?.slug} />
      </Field>

      <Field label="Short description" htmlFor="short_description">
        <Input
          id="short_description"
          name="short_description"
          defaultValue={department?.short_description ?? ""}
        />
      </Field>

      <Field label="Image" hint="Upload a department image or paste a URL.">
        <FileUpload
          name="image_url"
          accept="image"
          defaultValue={department?.image_url ?? ""}
        />
      </Field>

      <Field label="Full description" htmlFor="description">
        <Textarea
          id="description"
          name="description"
          rows={6}
          defaultValue={department?.description ?? ""}
        />
      </Field>

      <Field label="Sort order" htmlFor="sort_order" hint="Lower numbers appear first.">
        <Input
          id="sort_order"
          name="sort_order"
          type="number"
          defaultValue={department?.sort_order ?? 0}
          className="max-w-32"
        />
      </Field>

      <SubmitButton label={department ? "Update department" : "Create department"} />
    </form>
  );
}
