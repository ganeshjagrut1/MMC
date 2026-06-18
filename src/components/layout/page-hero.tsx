import Image from "next/image";
import { Container } from "@/components/ui/primitives";
import { FadeIn } from "@/components/ui/motion";

/** Compact hero banner used at the top of inner pages. */
export function PageHero({
  title,
  subtitle,
  breadcrumb,
  image,
}: {
  title: string;
  subtitle?: string;
  breadcrumb?: string;
  /** Optional background image path. */
  image?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-secondary text-white">
      {image && (
        <>
          <Image
            src={image}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary-dark/95 via-secondary/85 to-primary-dark/70" />
        </>
      )}
      <Container className="relative py-16 sm:py-20">
        <FadeIn>
          {breadcrumb && (
            <p className="text-sm font-medium uppercase tracking-wider text-accent">
              {breadcrumb}
            </p>
          )}
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 max-w-2xl text-white/80">{subtitle}</p>
          )}
        </FadeIn>
      </Container>
    </section>
  );
}
