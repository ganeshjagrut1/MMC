import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Section, Card } from "@/components/ui/primitives";
import { FadeIn } from "@/components/ui/motion";
import { ContactForm } from "./contact-form";
import { getSiteInfo } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Mauli Medical College.",
};

export default async function ContactPage() {
  const info = await getSiteInfo();

  return (
    <>
      <PageHero
        breadcrumb="Get in touch"
        title="Contact Us"
        subtitle="We'd love to hear from you. Send us a message and we'll respond as soon as we can."
        image="/images/hospital.jpg"
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-5">
          <FadeIn className="lg:col-span-2">
            <h2 className="text-xl font-bold text-secondary">Reach us</h2>
            <div className="mt-6 space-y-4 text-sm text-muted">
              <div>
                <p className="font-semibold text-text">Address</p>
                <p>{info.address}</p>
              </div>
              <div>
                <p className="font-semibold text-text">Email</p>
                <a href={`mailto:${info.email}`} className="hover:text-primary">
                  {info.email}
                </a>
              </div>
              <div>
                <p className="font-semibold text-text">Phone</p>
                <a href={`tel:${info.phone}`} className="hover:text-primary">
                  {info.phone}
                </a>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15} className="lg:col-span-3">
            <Card>
              <ContactForm />
            </Card>
          </FadeIn>
        </div>
      </Section>
    </>
  );
}
