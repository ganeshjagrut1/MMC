/**
 * Embeds a PDF with a clean toolbar (open in new tab + download).
 * Used for documents like the teaching-staff list, results, notices, etc.
 */
export function PdfViewer({
  url,
  title,
  height = "80vh",
}: {
  url: string;
  title: string;
  height?: string;
}) {
  return (
    <div className="overflow-hidden rounded-[var(--radius)] border border-border bg-surface shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-bg px-4 py-3">
        <span className="font-semibold text-secondary">{title}</span>
        <div className="flex gap-2 text-sm">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-border px-3 py-1.5 font-medium text-primary hover:border-primary"
          >
            Open in new tab ↗
          </a>
          <a
            href={url}
            download
            className="rounded-md bg-primary px-3 py-1.5 font-medium text-white hover:bg-primary-dark"
          >
            Download
          </a>
        </div>
      </div>
      <iframe
        src={`${url}#view=FitH`}
        title={title}
        className="w-full"
        style={{ height }}
      />
      <p className="border-t border-border px-4 py-2 text-center text-xs text-muted">
        Can&apos;t see the document?{" "}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-primary hover:underline"
        >
          Open it here
        </a>
        .
      </p>
    </div>
  );
}
