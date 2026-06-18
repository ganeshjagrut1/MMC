import Link from "next/link";
import { Container } from "@/components/ui/primitives";

type Item = { label: string; href: string };

/** Scrolling "Latest Updates" ticker shown under the hero. */
export function NoticeTicker({ items }: { items: Item[] }) {
  if (items.length === 0) return null;
  // Duplicate the list so the loop is seamless (track scrolls -50%).
  const loop = [...items, ...items];

  return (
    <div className="border-y border-border bg-surface">
      <Container className="flex items-stretch gap-4">
        <span className="flex flex-none items-center bg-accent px-4 py-2.5 text-sm font-semibold text-secondary-dark">
          Latest Updates
        </span>
        <div className="relative flex-1 overflow-hidden py-2.5">
          <div className="ticker-track">
            {loop.map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className="mx-6 inline-flex items-center text-sm text-text hover:text-primary"
              >
                <span className="mr-2 text-accent">●</span>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
