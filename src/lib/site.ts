/** Site-wide constants and navigation. Edit nav links in one place here. */

export const SITE = {
  name: "Mauli Medical College, Hospital & Research Center",
  shortName: "Mauli Medical College",
  tagline: "Quality Education, Healthcare & Research in Medical Sciences",
  established: 2021,
  email: "collegemaulimedical@gmail.com",
  phone: "+91 8237117733",
  phoneAlt: "+91 9860161212",
  address:
    "Anjani Khurd, Tal: Lonar, Dist: Buldhana, Maharashtra 443302",
  /**
   * Canonical origin — the single source of truth for every SEO surface
   * (metadata, canonical tags, sitemap, robots, JSON-LD, llms.txt). This is the
   * LIVE domain; do not change it without updating Google Search Console too.
   */
  url: "https://www.maulimedicalcollege.in",
  /** Public social/profile URLs — used as schema.org `sameAs` for entity SEO. */
  sameAs: [
    "https://www.facebook.com/maulimedicalcollege",
    "https://www.instagram.com/maulimedicalcollege",
  ],
};

export type NavLink = {
  label: string;
  href: string;
  /** Optional dropdown sub-items (one level). */
  children?: NavLink[];
};

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Academics", href: "/academics" },
  { label: "Facilities", href: "/facilities" },
  { label: "Faculty", href: "/faculty" },
  { label: "Hospital", href: "/hospital" },
  {
    label: "College",
    href: "/college",
    children: [
      { label: "College Overview", href: "/college" },
      { label: "Top Officers of the University", href: "/officers" },
      { label: "Anti-Ragging", href: "/anti-ragging" },
      { label: "Gender Harassment", href: "/gender-harassment" },
    ],
  },
  { label: "Clinical Material", href: "/clinical-material" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

/** Condensed set for the footer's "Quick Links" column. */
export const FOOTER_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Facilities", href: "/facilities" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];
