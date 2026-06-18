import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { getSiteInfo } from "@/lib/content";
import { OrganizationJsonLd } from "@/components/seo/json-ld";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const info = await getSiteInfo();

  return (
    <>
      <OrganizationJsonLd />
      <SiteHeader
        brand={info.shortName}
        phone={info.phone}
        email={info.email}
      />
      <main className="flex-1">{children}</main>
      <SiteFooter info={info} />
    </>
  );
}
