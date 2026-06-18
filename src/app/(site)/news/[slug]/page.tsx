import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/ui/primitives";
import { FadeIn } from "@/components/ui/motion";
import { getNewsBySlug } from "@/lib/data";
import { formatDate } from "@/lib/format";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = await getNewsBySlug(slug);
  return {
    title: post ? post.title : "News",
    description: post?.excerpt ?? undefined,
  };
}

export default async function NewsDetailPage({ params }: Params) {
  const { slug } = await params;
  const post = await getNewsBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <PageHero
        breadcrumb={post.category ?? "News"}
        title={post.title}
        subtitle={post.published_at ? formatDate(post.published_at) : undefined}
      />

      <Section>
        <FadeIn>
          <article className="max-w-3xl">
            {post.cover_image_url && (
              <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-[var(--radius-lg)]">
                <Image
                  src={post.cover_image_url}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover"
                />
              </div>
            )}
            {post.excerpt && (
              <p className="text-lg font-medium text-secondary">
                {post.excerpt}
              </p>
            )}
            {post.content && (
              <div className="mt-6 space-y-4 text-muted">
                {post.content.split("\n").map((para, i) =>
                  para.trim() ? <p key={i}>{para}</p> : null,
                )}
              </div>
            )}
            <Link
              href="/news"
              className="mt-8 inline-block text-sm font-medium text-primary hover:underline"
            >
              ← Back to all news
            </Link>
          </article>
        </FadeIn>
      </Section>
    </>
  );
}
