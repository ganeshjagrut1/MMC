import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/** Centered, max-width content container with horizontal padding. */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

/** Vertical page section with consistent spacing. */
export function Section({
  children,
  className = "",
  muted = false,
}: {
  children: ReactNode;
  className?: string;
  muted?: boolean;
}) {
  return (
    <section
      className={`py-16 sm:py-20 ${muted ? "bg-surface" : ""} ${className}`}
    >
      <Container>{children}</Container>
    </section>
  );
}

/** Eyebrow + title + optional subtitle, centered or left-aligned. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={`max-w-2xl ${alignment}`}>
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-2 text-3xl font-bold tracking-tight text-secondary sm:text-4xl">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-base text-muted">{subtitle}</p>}
    </div>
  );
}

type ButtonVariant = "primary" | "secondary" | "outline" | "accent";

const buttonStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-dark shadow-sm",
  secondary:
    "bg-secondary text-white hover:bg-secondary-dark shadow-sm",
  accent:
    "bg-accent text-secondary-dark hover:bg-accent-dark shadow-sm font-semibold",
  outline:
    "border border-border bg-surface text-text hover:border-primary hover:text-primary",
};

const baseButton =
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius)] px-5 py-2.5 text-sm font-medium transition-colors";

/** Link styled as a button. */
export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<typeof Link> & { variant?: ButtonVariant }) {
  return (
    <Link className={`${baseButton} ${buttonStyles[variant]} ${className}`} {...props} />
  );
}

/** Native button styled consistently. */
export function Button({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<"button"> & { variant?: ButtonVariant }) {
  return (
    <button
      className={`${baseButton} ${buttonStyles[variant]} disabled:opacity-60 ${className}`}
      {...props}
    />
  );
}

/** Surface card with border + rounded corners. */
export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[var(--radius)] border border-border bg-surface p-6 ${className}`}
    >
      {children}
    </div>
  );
}
