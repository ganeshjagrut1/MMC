"use client";

import type { News } from "@/lib/supabase/types";
import { createNews, updateNews } from "./actions";
import {
  Field,
  Input,
  Textarea,
  Checkbox,
  SubmitButton,
} from "@/components/admin/form";
import { FileUpload } from "@/components/admin/file-upload";

export function NewsForm({ post }: { post?: News }) {
  const action = post
    ? updateNews.bind(null, post.id, post.published_at)
    : createNews;

  return (
    <form action={action} className="max-w-2xl space-y-5">
      <Field label="Title" htmlFor="title" required>
        <Input id="title" name="title" defaultValue={post?.title} required />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Slug"
          htmlFor="slug"
          hint="Leave blank to auto-generate."
        >
          <Input id="slug" name="slug" defaultValue={post?.slug} />
        </Field>
        <Field label="Category" htmlFor="category">
          <Input
            id="category"
            name="category"
            placeholder="e.g. Admissions"
            defaultValue={post?.category ?? ""}
          />
        </Field>
      </div>

      <Field label="Excerpt" htmlFor="excerpt" hint="Short summary shown in listings.">
        <Textarea
          id="excerpt"
          name="excerpt"
          rows={2}
          defaultValue={post?.excerpt ?? ""}
        />
      </Field>

      <Field label="Content" htmlFor="content" hint="Full article. Separate paragraphs with blank lines.">
        <Textarea
          id="content"
          name="content"
          rows={10}
          defaultValue={post?.content ?? ""}
        />
      </Field>

      <Field label="Cover image" hint="Upload a cover image or paste a URL.">
        <FileUpload
          name="cover_image_url"
          accept="image"
          defaultValue={post?.cover_image_url ?? ""}
        />
      </Field>

      <Checkbox
        name="published"
        label="Published (visible on the public site)"
        defaultChecked={post?.published ?? false}
      />

      <SubmitButton label={post ? "Update post" : "Create post"} />
    </form>
  );
}
