import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/ui/primitives";
import { FadeIn } from "@/components/ui/motion";
import { getContent } from "@/lib/content";
import { PdfViewer } from "@/components/pdf-viewer";

export const metadata: Metadata = { title: "Clinical Material" };

export default async function ClinicalMaterialPage() {
  const content = await getContent("page_clinical");
  const withPdf = content.documents.filter((d) => d.pdf_url);

  return (
    <>
      <PageHero
        breadcrumb="Hospital"
        title="Clinical Material"
        subtitle={content.subtitle}
        image="/images/medical.jpg"
      />

      <Section>
        {/* Summary table */}
        <FadeIn>
          <div className="mx-auto max-w-3xl overflow-hidden rounded-[var(--radius)] border border-border bg-surface">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border bg-bg text-xs uppercase tracking-wider text-muted">
                <tr>
                  <th className="px-5 py-3">Month Name</th>
                  <th className="px-5 py-3 text-right">Download PDF</th>
                </tr>
              </thead>
              <tbody>
                {content.documents.map((doc, i) => (
                  <tr key={i} className="border-b border-border last:border-0">
                    <td className="px-5 py-4 font-medium text-secondary">
                      {doc.month}
                    </td>
                    <td className="px-5 py-4 text-right">
                      {doc.pdf_url ? (
                        <a
                          href={doc.pdf_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 font-semibold text-danger hover:underline"
                        >
                          ⬇ {doc.label || "Download"}
                        </a>
                      ) : (
                        <span className="text-muted">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>

        {/* Embedded PDF previews */}
        {withPdf.length > 0 && (
          <div className="mt-12 space-y-10">
            {withPdf.map((doc, i) => (
              <FadeIn key={i}>
                <PdfViewer
                  url={doc.pdf_url}
                  title={doc.label || doc.month}
                  height="70vh"
                />
              </FadeIn>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
