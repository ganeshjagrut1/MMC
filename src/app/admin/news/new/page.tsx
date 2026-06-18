import Link from "next/link";
import { NewsForm } from "../news-form";

export default function NewNewsPage() {
  return (
    <div>
      <Link
        href="/admin/news"
        className="text-sm font-medium text-primary hover:underline"
      >
        ← Back to news
      </Link>
      <h1 className="mt-3 text-2xl font-bold text-secondary">New Post</h1>
      <div className="mt-6">
        <NewsForm />
      </div>
    </div>
  );
}
