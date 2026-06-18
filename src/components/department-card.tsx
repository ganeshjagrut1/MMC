import Link from "next/link";
import Image from "next/image";
import type { Department } from "@/lib/supabase/types";
import { HoverLift } from "@/components/ui/motion";

const FALLBACK = "/images/medical.jpg";

/** Department card with image, used on home, departments and academics pages. */
export function DepartmentCard({ department }: { department: Department }) {
  return (
    <HoverLift>
      <Link href={`/departments/${department.slug}`} className="block h-full">
        <article className="flex h-full flex-col overflow-hidden rounded-[var(--radius)] border border-border bg-surface transition-colors hover:border-primary">
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={department.image_url || FALLBACK}
              alt={department.name}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <h3 className="font-semibold text-secondary">{department.name}</h3>
            {department.short_description && (
              <p className="mt-2 text-sm text-muted">
                {department.short_description}
              </p>
            )}
            <span className="mt-3 inline-block text-sm font-medium text-primary">
              Learn more →
            </span>
          </div>
        </article>
      </Link>
    </HoverLift>
  );
}
