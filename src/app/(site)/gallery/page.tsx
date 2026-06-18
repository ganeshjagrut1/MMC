import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/ui/primitives";
import { getContent } from "@/lib/content";
import { GalleryGrid } from "@/components/gallery-grid";

export const metadata: Metadata = { title: "Gallery" };

export default async function GalleryPage() {
  const content = await getContent("page_gallery");

  return (
    <>
      <PageHero
        breadcrumb="Media"
        title="Gallery"
        subtitle={content.subtitle}
        image="/images/gallery/college.jpg"
      />

      <Section>
        {content.images.length > 0 ? (
          <GalleryGrid images={content.images} />
        ) : (
          <p className="text-center text-muted">
            Gallery images will appear here once added from the admin panel.
          </p>
        )}
      </Section>
    </>
  );
}
