import Link from "next/link";
import { FOOTER_LINKS, SITE } from "@/lib/site";
import { Container } from "@/components/ui/primitives";
import { Logo } from "@/components/layout/logo";

type SiteInfo = {
  name: string;
  shortName: string;
  tagline: string;
  established: string;
  email: string;
  phone: string;
  address: string;
};

export function SiteFooter({ info }: { info: SiteInfo }) {
  const year = 2026; // build-time constant; update as needed

  return (
    <footer className="border-t border-border bg-secondary text-white/80">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3">
            <span className="grid place-items-center rounded-full bg-white p-1.5">
              <Logo size={40} />
            </span>
            <span className="text-base font-bold text-white">
              {info.shortName}
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            {info.tagline}. Established {info.established}.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
            Quick Links
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
            Contact
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li>{info.address}</li>
            <li>
              <a href={`mailto:${info.email}`} className="hover:text-white">
                {info.email}
              </a>
            </li>
            <li>
              <a href={`tel:${info.phone}`} className="hover:text-white">
                {info.phone}
              </a>
              {", "}
              <a href={`tel:${SITE.phoneAlt}`} className="hover:text-white">
                {SITE.phoneAlt}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
            Location
          </h3>
          <div className="mt-4 overflow-hidden rounded-[var(--radius)] border border-white/15">
            <iframe
              title="Mauli Medical College location"
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3562.006632154866!2d76.48689407523096!3d20.07446498134678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjDCsDA0JzI4LjEiTiA3NsKwMjknMjIuMSJF!5e1!3m2!1sen!2sin!4v1749978669263!5m2!1sen!2sin"
              className="h-40 w-full"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-2 py-5 text-xs text-white/60 sm:flex-row">
          <p>
            © {year} {info.name}. All rights reserved.
          </p>
          <Link href="/admin" className="hover:text-white">
            Admin Login
          </Link>
        </Container>
      </div>
    </footer>
  );
}
