import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/layout/page-hero";
import { Section, Card, SectionHeading } from "@/components/ui/primitives";
import { FadeIn } from "@/components/ui/motion";
import { getContent, getSiteInfo } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const info = await getSiteInfo();
  return {
    title: "About Us",
    description: `About ${info.name}.`,
  };
}

export default async function AboutPage() {
  const [info, intro, vm, leadership] = await Promise.all([
    getSiteInfo(),
    getContent("about_intro"),
    getContent("vision_mission"),
    getContent("leadership_messages"),
  ]);

  return (
    <>
      <PageHero
        breadcrumb="About"
        title={`About ${info.shortName}`}
        subtitle={info.tagline}
        image="/images/about.jpg"
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <FadeIn>
            <h2 className="text-2xl font-bold text-secondary">
              {intro.heading}
            </h2>
            <div className="mt-4 space-y-4 text-muted">
              {intro.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] shadow-lg">
              <Image
                src="/images/about.jpg"
                alt={info.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </FadeIn>
        </div>
      </Section>

      <Section muted>
        <div className="grid gap-6 lg:grid-cols-2">
          <FadeIn>
            <Card className="h-full border-t-4 border-t-primary">
              <h3 className="text-xl font-bold text-secondary">Our Vision</h3>
              <p className="mt-3 text-muted">{vm.vision}</p>
            </Card>
          </FadeIn>
          <FadeIn delay={0.1}>
            <Card className="h-full border-t-4 border-t-accent">
              <h3 className="text-xl font-bold text-secondary">Our Mission</h3>
              <ul className="mt-3 space-y-3">
                {vm.mission.map((m, i) => (
                  <li key={i} className="flex gap-3 text-muted">
                    <span className="mt-1.5 h-2 w-2 flex-none rounded-full bg-accent" />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </FadeIn>
        </div>
      </Section>

      {/* Leadership messages */}
      <Section>
        <FadeIn>
          <SectionHeading
            eyebrow="Our Leaders"
            title="Messages from Leadership"
            align="center"
          />
        </FadeIn>
        <div className="mt-12 space-y-10">
          {leadership.items.map((m, idx) => (
            <FadeIn key={m.name}>
              <Card className="overflow-hidden">
                <div className="grid gap-8 md:grid-cols-3">
                  <div
                    className={`md:col-span-1 ${idx % 2 === 1 ? "md:order-2" : ""}`}
                  >
                    <div className="relative mx-auto aspect-[3/4] w-full max-w-[15rem] overflow-hidden rounded-[var(--radius)] bg-bg">
                      {m.photo_url ? (
                        <Image
                          src={m.photo_url}
                          alt={m.name}
                          fill
                          sizes="(max-width: 768px) 60vw, 240px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="grid h-full place-items-center text-5xl font-bold text-primary">
                          {m.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="mt-4 text-center">
                      <p className="font-semibold text-secondary">{m.name}</p>
                      <p className="text-sm text-primary">{m.role}</p>
                      {m.phone && (
                        <a
                          href={`tel:${m.phone}`}
                          className="mt-1 block text-sm text-muted hover:text-primary"
                        >
                          {m.phone}
                        </a>
                      )}
                      {m.email && (
                        <a
                          href={`mailto:${m.email}`}
                          className="block text-sm text-muted hover:text-primary"
                        >
                          {m.email}
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <h3 className="text-xl font-bold text-secondary">
                      {m.title}
                    </h3>
                    <div className="mt-3 space-y-3 text-muted">
                      {m.message
                        .split("\n")
                        .map((p) => p.trim())
                        .filter(Boolean)
                        .map((para, i) => (
                          <p key={i}>{para}</p>
                        ))}
                    </div>
                  </div>
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Section>
    </>
  );
}
