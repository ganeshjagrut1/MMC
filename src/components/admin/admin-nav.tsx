"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "@/app/admin/actions";
import { Logo } from "@/components/layout/logo";

const LINKS = [
  { label: "Dashboard", href: "/admin" },
  { label: "Page Content", href: "/admin/content" },
  { label: "Departments", href: "/admin/departments" },
  { label: "Faculty", href: "/admin/faculty" },
  { label: "News", href: "/admin/news" },
  { label: "Messages", href: "/admin/messages" },
];

export function AdminNav({ email }: { email: string }) {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <aside className="flex w-full flex-col border-b border-border bg-surface md:h-screen md:w-64 md:border-b-0 md:border-r">
      <div className="flex items-center gap-2.5 border-b border-border px-5 py-4">
        <Logo size={36} />
        <span className="font-bold text-secondary">Admin</span>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`block rounded-md px-3 py-2 text-sm font-medium ${
              isActive(l.href)
                ? "bg-primary text-white"
                : "text-text hover:bg-bg"
            }`}
          >
            {l.label}
          </Link>
        ))}
      </nav>

      <div className="border-t border-border p-3">
        <Link
          href="/"
          className="block rounded-md px-3 py-2 text-sm text-muted hover:bg-bg"
        >
          ← View site
        </Link>
        <p className="truncate px-3 pt-3 text-xs text-muted">{email}</p>
        <form action={signOut}>
          <button
            type="submit"
            className="mt-1 w-full rounded-md px-3 py-2 text-left text-sm font-medium text-danger hover:bg-danger/10"
          >
            Sign out
          </button>
        </form>
      </div>
    </aside>
  );
}
