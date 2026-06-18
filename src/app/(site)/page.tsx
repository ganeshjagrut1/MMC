import Image from "next/image";
import { getContent } from "@/lib/content";
import { getDepartments, getPublishedNews } from "@/lib/data";
import {
  Container,
  Section,
  SectionHeading,
  ButtonLink,
  Card,
} from "@/components/ui/primitives";
import { FadeIn, Stagger, StaggerItem, HoverLift } from "@/components/ui/motion";
import { NoticeTicker } from "@/components/layout/notice-ticker";
import { NewsCard } from "@/components/news-card";
import { DepartmentCard } from "@/components/department-card";
import { Counter } from "@/components/ui/counter";

export default async function HomePage() {
  const [hero, about, vm, services, stats, leaders, departments, news] =
    await Promise.all([
      getContent("home_hero"),
      getContent("home_about"),
      getContent("vision_mission"),
      getContent("services"),
      getContent("home_stats"),
      getContent("leaders"),
      getDepartments(),
      getPublishedNews(6),
    ]);

  const tickerItems = news.map((n) => ({
    label: n.title,
    href: `/news/${n.slug}`,
  }));

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-secondary text-white">
        <Image
          src="/brand/campus.jpg"
          alt="Mauli Medical College campus"
          fill
          priority
          sizes="100vw"
          className="hero-zoom object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary-dark/95 via-secondary/85 to-primary-dark/70" />
        <Container className="relative grid gap-8 py-24 sm:py-32 lg:grid-cols-2 lg:items-center">
          <FadeIn>
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">
              {hero.eyebrow}
            </p>
            <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              {hero.title}
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/80">
              {hero.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={hero.primaryCtaHref} variant="accent">
                {hero.primaryCtaLabel}
              </ButtonLink>
              <ButtonLink
                href={hero.secondaryCtaHref}
                variant="outline"
                className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                {hero.secondaryCtaLabel}
              </ButtonLink>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="grid grid-cols-2 gap-4">
              {stats.items.map((s) => (
                <div
                  key={s.label}
                  className="rounded-[var(--radius)] border border-white/15 bg-white/5 p-6 backdrop-blur"
                >
                  <Counter
                    value={s.value}
                    className="text-3xl font-bold text-accent"
                  />
                  <div className="mt-1 text-sm text-white/70">{s.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Notices ticker */}
      <NoticeTicker items={tickerItems} />

      {/* Welcome / About */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <FadeIn>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              {about.eyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-secondary sm:text-4xl">
              {about.heading}
            </h2>
            <div className="mt-5 space-y-4 text-muted">
              {about.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <ButtonLink href={about.ctaHref} variant="primary" className="mt-8">
              {about.ctaLabel}
            </ButtonLink>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] shadow-lg">
              <Image
                src="/images/about.jpg"
                alt="Mauli Medical College campus"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Vision & Mission */}
      <Section muted>
        <FadeIn>
          <SectionHeading
            eyebrow="Who We Are"
            title="Our Vision & Mission"
            align="center"
          />
        </FadeIn>
        <div className="mt-12 grid gap-6 lg:grid-cols-5 lg:items-stretch">
          <FadeIn className="lg:col-span-2">
            <div className="relative h-56 overflow-hidden rounded-[var(--radius-lg)] shadow-lg lg:h-full">
              <Image
                src="/images/doctors.jpg"
                alt="Shaping students into doctors who care for patients"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </FadeIn>
          <div className="grid gap-6 lg:col-span-3">
            <FadeIn>
              <Card className="h-full border-t-4 border-t-primary">
                <h3 className="text-xl font-bold text-secondary">Vision</h3>
                <p className="mt-3 text-muted">{vm.vision}</p>
              </Card>
            </FadeIn>
            <FadeIn delay={0.1}>
              <Card className="h-full border-t-4 border-t-accent">
                <h3 className="text-xl font-bold text-secondary">Mission</h3>
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
        </div>
      </Section>

      {/* Our Services */}
      <Section>
        <FadeIn>
          <SectionHeading
            eyebrow={services.eyebrow}
            title={services.title}
            align="center"
          />
        </FadeIn>
        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.items.map((s) => (
            <StaggerItem key={s.name}>
              <HoverLift>
                <div className="group h-full overflow-hidden rounded-[var(--radius)] border border-border bg-surface transition-colors hover:border-primary">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={s.image}
                      alt={s.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4 text-center font-semibold text-secondary">
                    {s.name}
                  </div>
                </div>
              </HoverLift>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Stats band */}
      <section className="bg-primary text-white">
        <Container className="grid grid-cols-2 gap-6 py-14 lg:grid-cols-4">
          {stats.items.map((s) => (
            <div key={s.label} className="text-center">
              <Counter
                value={s.value}
                className="block text-4xl font-bold text-accent"
              />
              <div className="mt-1 text-sm text-white/80">{s.label}</div>
            </div>
          ))}
        </Container>
      </section>

      {/* Our Leaders */}
      <Section muted>
        <FadeIn>
          <SectionHeading
            eyebrow={leaders.eyebrow}
            title={leaders.title}
            align="center"
          />
        </FadeIn>
        <Stagger className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-3">
          {leaders.items.map((l) => (
            <StaggerItem key={l.name}>
              <Card className="h-full text-center">
                <div className="mx-auto grid h-24 w-24 place-items-center overflow-hidden rounded-full bg-primary/10 text-3xl font-bold text-primary">
                  {l.photo_url ? (
                    <Image
                      src={l.photo_url}
                      alt={l.name}
                      width={96}
                      height={96}
                      className="h-24 w-24 object-cover"
                    />
                  ) : (
                    l.name.charAt(0)
                  )}
                </div>
                <h3 className="mt-4 font-semibold text-secondary">{l.name}</h3>
                <p className="text-sm text-primary">{l.role}</p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Departments */}
      <Section>
        <FadeIn>
          <SectionHeading
            eyebrow="Academics"
            title="Our Departments"
            subtitle="Comprehensive pre-clinical, para-clinical and clinical departments."
          />
        </FadeIn>
        {departments.length > 0 ? (
          <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {departments.slice(0, 6).map((d) => (
              <StaggerItem key={d.id}>
                <DepartmentCard department={d} />
              </StaggerItem>
            ))}
          </Stagger>
        ) : (
          <p className="mt-10 text-center text-muted">
            Departments will appear here once Supabase is connected and seeded.
          </p>
        )}
        <div className="mt-10 text-center">
          <ButtonLink href="/departments" variant="primary">
            View All Departments
          </ButtonLink>
        </div>
      </Section>

      {/* Latest news */}
      {news.length > 0 && (
        <Section muted>
          <FadeIn>
            <SectionHeading
              eyebrow="Updates"
              title="Latest News & Notices"
              align="center"
            />
          </FadeIn>
          <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
            {news.slice(0, 3).map((n) => (
              <StaggerItem key={n.id}>
                <NewsCard post={n} />
              </StaggerItem>
            ))}
          </Stagger>
        </Section>
      )}

      {/* Contact CTA */}
      <section className="bg-secondary text-white">
        <Container className="flex flex-col items-center gap-6 py-16 text-center">
          <h2 className="text-3xl font-bold">Get in touch with us</h2>
          <p className="max-w-xl text-white/80">
            Have a question about admissions, departments or our hospital? Our
            team is here to help.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <ButtonLink href="/contact" variant="accent">
              Contact Us
            </ButtonLink>
            <ButtonLink
              href="/departments"
              variant="outline"
              className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              View Departments
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
