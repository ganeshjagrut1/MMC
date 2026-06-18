import { SITE } from "@/lib/site";

/**
 * PURE content schema + defaults (no server imports) so it can be shared by
 * both server pages and the client-side admin editor.
 * Server accessors live in content.ts.
 */

export type FieldType =
  | "text"
  | "textarea"
  | "lines"
  | "objects"
  | "image"
  | "file";

export type SubField = {
  name: string;
  label: string;
  type: "text" | "textarea" | "image" | "file";
};

export type Field = {
  name: string;
  label: string;
  type: FieldType;
  help?: string;
  /** for type "objects": the shape of each repeating row */
  fields?: readonly SubField[];
};

export type ContentBlock = {
  key: string;
  title: string;
  description: string;
  fields: readonly Field[];
  default: Record<string, unknown>;
};

export const CONTENT_BLOCKS = {
  site_info: {
    key: "site_info",
    title: "Site Information",
    description: "College name, tagline and contact details (used site-wide).",
    fields: [
      { name: "name", label: "Full name", type: "text" },
      { name: "shortName", label: "Short name", type: "text" },
      { name: "tagline", label: "Tagline", type: "text" },
      { name: "established", label: "Established (year)", type: "text" },
      { name: "email", label: "Email", type: "text" },
      { name: "phone", label: "Phone", type: "text" },
      { name: "address", label: "Address", type: "textarea" },
    ],
    default: {
      name: SITE.name,
      shortName: SITE.shortName,
      tagline: SITE.tagline,
      established: String(SITE.established),
      email: SITE.email,
      phone: SITE.phone,
      address: SITE.address,
    },
  },

  home_hero: {
    key: "home_hero",
    title: "Home — Hero",
    description: "The large banner at the top of the home page.",
    fields: [
      { name: "eyebrow", label: "Small label", type: "text" },
      { name: "title", label: "Heading", type: "text" },
      { name: "subtitle", label: "Subtext", type: "textarea" },
      { name: "primaryCtaLabel", label: "Primary button text", type: "text" },
      { name: "primaryCtaHref", label: "Primary button link", type: "text" },
      { name: "secondaryCtaLabel", label: "Secondary button text", type: "text" },
      { name: "secondaryCtaHref", label: "Secondary button link", type: "text" },
    ],
    default: {
      eyebrow: `Established ${SITE.established}`,
      title: SITE.name,
      subtitle: `${SITE.tagline}. Located at ${SITE.address}.`,
      primaryCtaLabel: "Explore Departments",
      primaryCtaHref: "/departments",
      secondaryCtaLabel: "Contact Us",
      secondaryCtaHref: "/contact",
    },
  },

  home_stats: {
    key: "home_stats",
    title: "Home — Statistics",
    description: "The highlight numbers shown in the hero.",
    fields: [
      {
        name: "items",
        label: "Stats",
        type: "objects",
        fields: [
          { name: "value", label: "Value", type: "text" },
          { name: "label", label: "Label", type: "text" },
        ],
      },
    ],
    default: {
      items: [
        { value: "100+", label: "Doctors" },
        { value: "21+", label: "Departments" },
        { value: "10+", label: "Research Labs" },
        { value: "25+", label: "Awards" },
      ],
    },
  },

  home_about: {
    key: "home_about",
    title: "Home — Welcome / About",
    description: "The 'Welcome' introduction section on the home page.",
    fields: [
      { name: "eyebrow", label: "Small label", type: "text" },
      { name: "heading", label: "Heading", type: "text" },
      { name: "body", label: "Paragraphs (one per line)", type: "lines" },
      { name: "ctaLabel", label: "Button text", type: "text" },
      { name: "ctaHref", label: "Button link", type: "text" },
    ],
    default: {
      eyebrow: "About",
      heading: "Welcome To Mauli Medical College, Hospital & Research Center",
      body: [
        "Mauli Medical College, Hospital & Research Center, located in Anjani Khurd, Taluka Lonar, Dist: Buldhana, Maharashtra, is a premier institution committed to delivering quality education, healthcare services, and research in the field of medical sciences.",
        "Established with the vision to provide world-class medical training, our college aims to shape future doctors, healthcare professionals, and researchers through a comprehensive and holistic learning approach.",
      ],
      ctaLabel: "Learn More About",
      ctaHref: "/about",
    },
  },

  vision_mission: {
    key: "vision_mission",
    title: "Vision & Mission",
    description: "Shown on the home and About pages.",
    fields: [
      { name: "vision", label: "Vision statement", type: "textarea" },
      { name: "mission", label: "Mission points (one per line)", type: "lines" },
    ],
    default: {
      vision:
        "To be a leading institution in medical education, healthcare, and research, fostering a dynamic environment where future doctors, healthcare professionals, and researchers are empowered with the knowledge, skills, and values needed to improve global healthcare standards and contribute to the well-being of society.",
      mission: [
        "To provide academic excellence in the field of medical sciences through an interdisciplinary and multidisciplinary approach, integrating the latest advancements in medical technology and ethical practices.",
        "To foster a research-driven environment that promotes innovation, critical thinking, and entrepreneurship in the healthcare sector, nurturing a culture of inquiry and discovery among students, faculty, and professionals.",
        "To offer comprehensive healthcare services, focusing on both primary and specialized care, with particular attention to underserved and marginalized communities, while actively promoting disease prevention and health education.",
        "To cultivate holistic competency in medical professionals, with a strong global vision, local relevance, societal responsibility, and a sense of patriotic dedication to improving public health.",
      ],
    },
  },

  services: {
    key: "services",
    title: "Home — Our Services",
    description: "The 'We Provide Best Service' grid on the home page.",
    fields: [
      { name: "eyebrow", label: "Small label", type: "text" },
      { name: "title", label: "Heading", type: "text" },
      {
        name: "items",
        label: "Services",
        type: "objects",
        fields: [
          { name: "name", label: "Service name", type: "text" },
          { name: "image", label: "Image", type: "image" },
        ],
      },
    ],
    default: {
      eyebrow: "Our Service",
      title: "We Provide Best Service",
      items: [
        { name: "Ophthalmology", image: "/images/dept/eye.jpg" },
        { name: "Physiotherapy", image: "/images/dept/physio.jpg" },
        { name: "Pediatrics", image: "/images/dept/pediatrics.jpg" },
        { name: "Anesthesiology", image: "/images/dept/heart.jpg" },
        { name: "Psychiatry", image: "/images/doctors.jpg" },
        { name: "Obstetrics and Gynecology", image: "/images/dept/surgery.jpg" },
        { name: "Emergency Medicine", image: "/images/dept/emergency.jpg" },
        { name: "General Medicine", image: "/images/medical.jpg" },
      ],
    },
  },

  leaders: {
    key: "leaders",
    title: "Home — Our Leaders",
    description: "The 'Meet Our Leaders' section on the home page.",
    fields: [
      { name: "eyebrow", label: "Small label", type: "text" },
      { name: "title", label: "Heading", type: "text" },
      {
        name: "items",
        label: "Leaders",
        type: "objects",
        fields: [
          { name: "name", label: "Name", type: "text" },
          { name: "role", label: "Role", type: "text" },
          { name: "photo_url", label: "Photo", type: "image" },
        ],
      },
    ],
    default: {
      eyebrow: "Our Leaders",
      title: "Meet Our Leaders",
      items: [
        {
          name: "Umesh R. Lahoti",
          role: "Chairman",
          photo_url: "/images/team/chairman.jpeg",
        },
        {
          name: "Somesh U. Lahoti",
          role: "Secretary",
          photo_url: "/images/team/secretary.jpeg",
        },
        {
          name: "Dr. Pramod Jadhao",
          role: "Dean / Principal",
          photo_url: "/images/team/principal.jpeg",
        },
      ],
    },
  },

  home_cta: {
    key: "home_cta",
    title: "Home — Call to action",
    description: "The closing banner on the home page.",
    fields: [
      { name: "title", label: "Heading", type: "text" },
      { name: "body", label: "Text", type: "textarea" },
    ],
    default: {
      title: "Ready to begin your medical journey?",
      body: "Admissions for the upcoming MBBS batch are open. Reach out to our admissions team to learn more.",
    },
  },

  about_intro: {
    key: "about_intro",
    title: "About — Introduction",
    description: "The main introductory text on the About page.",
    fields: [
      { name: "heading", label: "Heading", type: "text" },
      { name: "paragraphs", label: "Paragraphs (one per line)", type: "lines" },
    ],
    default: {
      heading: "Welcome To Mauli Medical College, Hospital & Research Center",
      paragraphs: [
        "Mauli Medical College, Hospital & Research Center, located in Anjani Khurd, Taluka Lonar, Dist: Buldhana, Maharashtra, is a premier institution committed to delivering quality education, healthcare services, and research in the field of medical sciences.",
        "Established with the vision to provide world-class medical training, our college aims to shape future doctors, healthcare professionals, and researchers through a comprehensive and holistic learning approach.",
      ],
    },
  },

  leadership_messages: {
    key: "leadership_messages",
    title: "About — Leadership Messages",
    description:
      "Chairman / Secretary / Principal messages shown on the About page.",
    fields: [
      {
        name: "items",
        label: "Messages",
        type: "objects",
        fields: [
          { name: "title", label: "Section title", type: "text" },
          { name: "name", label: "Name", type: "text" },
          { name: "role", label: "Role", type: "text" },
          { name: "phone", label: "Phone", type: "text" },
          { name: "email", label: "Email", type: "text" },
          { name: "photo_url", label: "Photo", type: "image" },
          { name: "message", label: "Message (blank line between paragraphs)", type: "textarea" },
        ],
      },
    ],
    default: {
      items: [
        {
          title: "Chairman's Message",
          name: "Mr. Umesh R. Lahoti",
          role: "Chairman",
          phone: "+91 8237117733",
          email: "collegemaulimedical@gmail.com",
          photo_url: "/images/team/chairman.jpeg",
          message:
            "It gives me immense pleasure to welcome you to Mauli Medical College, Anjani Khurd, Tal: Lonar, Dist: Buldhana, Maharashtra 443302.\n\nAt Mauli Medical College, we are committed to shaping the future of healthcare by offering world-class medical education and fostering an environment of innovation, compassion, and excellence. Our vision is to empower students with the skills and knowledge they need to become competent, ethical, and compassionate doctors who will serve society with dedication.\n\nWe believe in nurturing not just the academic potential of our students, but also their personal growth, so they can meet the evolving challenges of the medical field with confidence. We continue to invest in state-of-the-art infrastructure, cutting-edge technology, and top-tier faculty to ensure that our students receive the best possible training.\n\nI am confident that our students will make a significant impact in the medical world, and we look forward to working together to make a positive contribution to healthcare globally.\n\nFor any queries or further assistance, please do not hesitate to contact me.",
        },
        {
          title: "Secretary's Message",
          name: "Mr. Somesh U. Lahoti",
          role: "Secretary",
          phone: "+91 8237117733",
          email: "collegemaulimedical@gmail.com",
          photo_url: "/images/team/secretary.jpeg",
          message:
            "Welcome to Mauli Medical College, Anjani Khurd, Tal: Lonar, Dist: Buldhana, Maharashtra 443302.\n\nIt is with great pride that I extend a warm welcome to all prospective students, faculty, and staff of Mauli Medical College. As an institution, we are deeply committed to providing an excellent educational experience that fosters intellectual growth, compassion, and professionalism. Our aim is not only to educate but to inspire future medical professionals who will contribute positively to society.\n\nThrough state-of-the-art facilities, a dedicated faculty, and a strong emphasis on practical learning, we endeavor to create a nurturing environment where students can excel both academically and in their personal development.\n\nWe look forward to your association with us, and together, we will work towards building a healthier future for all.\n\nFor any inquiries or further information, please feel free to reach out to me.",
        },
        {
          title: "Principal's Message",
          name: "Dr. Pramod Jadhao",
          role: "Dean / Principal",
          phone: "+91 8237117733",
          email: "collegemaulimedical@gmail.com",
          photo_url: "/images/team/principal.jpeg",
          message:
            "Welcome to Mauli Medical College, Anjani Khurd, Tal: Lonar, Dist: Buldhana, Maharashtra 443302.\n\nAt Mauli Medical College, we are committed to providing quality medical education and healthcare services to the community. Our dedicated faculty and staff strive to create an environment of excellence in both academics and patient care.\n\nWe focus on holistic development, instilling the core values of compassion, professionalism, and ethical medical practices in our students. We believe in fostering a culture of continuous learning and advancement in the field of medical science.\n\nShould you have any questions or need further information, please feel free to contact me.",
        },
      ],
    },
  },

  admissions: {
    key: "admissions",
    title: "Admissions page",
    description: "Intro, steps and eligibility for the Admissions page.",
    fields: [
      { name: "subtitle", label: "Page subtitle", type: "textarea" },
      {
        name: "steps",
        label: "Admission steps",
        type: "objects",
        fields: [
          { name: "title", label: "Title", type: "text" },
          { name: "body", label: "Text", type: "textarea" },
        ],
      },
      {
        name: "eligibility",
        label: "Eligibility points (one per line)",
        type: "lines",
      },
      {
        name: "documents",
        label: "Admission documents (PDF downloads)",
        type: "objects",
        fields: [
          { name: "label", label: "Document name", type: "text" },
          { name: "pdf_url", label: "PDF", type: "file" },
        ],
      },
    ],
    default: {
      subtitle:
        "Join a community committed to excellence in medical education. Here is how to apply.",
      steps: [
        { title: "NEET Qualification", body: "Qualify the NEET-UG examination with the required percentile." },
        { title: "Counselling", body: "Participate in the state / central counselling and choose Mauli Medical College." },
        { title: "Document Verification", body: "Submit and verify your academic and eligibility documents." },
        { title: "Admission Confirmation", body: "Pay fees and confirm your seat to join the MBBS programme." },
      ],
      eligibility: [
        "Passed 10+2 with Physics, Chemistry and Biology / Biotechnology.",
        "Minimum qualifying marks as per regulatory norms (relaxation for reserved categories).",
        "Valid NEET-UG score for the admission year.",
        "Completed 17 years of age on or before 31st December of the admission year.",
      ],
      documents: [
        { label: "Admission Permission", pdf_url: "" },
        { label: "Institutional Admission Committee", pdf_url: "" },
        { label: "Admission Documents Required", pdf_url: "" },
        { label: "Admission Student List", pdf_url: "" },
      ],
    },
  },

  faculty_page: {
    key: "faculty_page",
    title: "Faculty page",
    description:
      "Teaching & non-teaching staff. Paste a PDF link for each list (update it any time to publish a new list).",
    fields: [
      { name: "subtitle", label: "Page subtitle", type: "textarea" },
      { name: "teaching_title", label: "Teaching staff heading", type: "text" },
      {
        name: "teaching_pdf",
        label: "Teaching staff PDF",
        type: "file",
        help: "Upload or link the teaching-staff PDF (leave blank to hide).",
      },
      {
        name: "nonteaching_title",
        label: "Non-teaching staff heading",
        type: "text",
      },
      {
        name: "nonteaching_pdf",
        label: "Non-teaching staff PDF",
        type: "file",
        help: "Upload or link the non-teaching-staff PDF (leave blank to hide).",
      },
    ],
    default: {
      subtitle:
        "Our experienced teaching and non-teaching staff guide students across all departments.",
      teaching_title: "Teaching Staff",
      teaching_pdf: "/docs/teaching-staff.pdf",
      nonteaching_title: "Non-Teaching Staff",
      nonteaching_pdf: "",
    },
  },

  page_academics: {
    key: "page_academics",
    title: "Academics page",
    description: "Intro text for the Academics page (departments list shown below it).",
    fields: [
      { name: "subtitle", label: "Page subtitle", type: "textarea" },
      { name: "body", label: "Paragraphs (one per line)", type: "lines" },
    ],
    default: {
      subtitle:
        "Our MBBS programme combines strong academic foundations with extensive clinical training.",
      body: [
        "The college offers a comprehensive medical curriculum across pre-clinical, para-clinical and clinical departments, aligned with national medical education standards.",
        "Students learn through structured lectures, practical laboratories, and supervised clinical postings in the attached teaching hospital.",
      ],
    },
  },

  page_facilities: {
    key: "page_facilities",
    title: "Facilities page",
    description: "Intro and the list of campus facilities.",
    fields: [
      { name: "subtitle", label: "Page subtitle", type: "textarea" },
      {
        name: "items",
        label: "Facilities",
        type: "objects",
        fields: [
          { name: "label", label: "Label", type: "text" },
          { name: "href", label: "Link", type: "text" },
        ],
      },
    ],
    default: {
      subtitle:
        "Modern infrastructure supporting teaching, training, research and student life.",
      items: [
        { label: "Central Library", href: "/p/central-library" },
        { label: "Cafeteria", href: "/p/cafeteria" },
        { label: "CCTV Surveillance", href: "/p/cctv" },
        { label: "WiFi Campus", href: "/p/wifi" },
        { label: "Laboratory", href: "/p/laboratory" },
        { label: "Bus / Transport", href: "/p/bus" },
        { label: "Boys Hostel", href: "/p/boys-hostel" },
        { label: "Girls Hostel", href: "/p/girls-hostel" },
        { label: "Sport & Recreation", href: "/p/sport-recreation" },
        { label: "Mess / Canteen", href: "/p/mess-canteen" },
      ],
    },
  },

  page_hospital: {
    key: "page_hospital",
    title: "Hospital page",
    description: "About the attached teaching hospital.",
    fields: [
      { name: "subtitle", label: "Page subtitle", type: "textarea" },
      { name: "body", label: "Paragraphs (one per line)", type: "lines" },
      {
        name: "highlights",
        label: "Highlights",
        type: "objects",
        fields: [
          { name: "value", label: "Value", type: "text" },
          { name: "label", label: "Label", type: "text" },
        ],
      },
      {
        name: "services",
        label: "Hospital services / sections",
        type: "objects",
        fields: [
          { name: "label", label: "Label", type: "text" },
          { name: "href", label: "Link", type: "text" },
        ],
      },
    ],
    default: {
      subtitle:
        "A full-service teaching hospital providing care to the community and clinical training to students.",
      body: [
        "The attached hospital offers primary and specialised care across all major departments, with round-the-clock emergency services.",
        "It serves as the primary clinical training ground for our students, with patient exposure across out-patient and in-patient settings.",
      ],
      highlights: [
        { value: "24x7", label: "Emergency Care" },
        { value: "All", label: "Major Specialities" },
        { value: "OPD", label: "& IPD Services" },
      ],
      services: [
        { label: "Bed Distribution", href: "/p/bed-distribution" },
        { label: "Casualty", href: "/p/casualty" },
        { label: "Front Office", href: "/p/front-office" },
        { label: "Pharmacy", href: "/p/pharmacy" },
        { label: "O.P.D.", href: "/p/opd" },
        { label: "I.P.D.", href: "/p/ipd" },
        { label: "Operation Theatre", href: "/p/operation-theatre" },
        { label: "Intensive Care Unit", href: "/p/icu" },
        { label: "Blood Bank", href: "/p/blood-bank" },
        { label: "Labour Room", href: "/p/labour-room" },
        { label: "Hospital Equipment List", href: "/p/hospital-equipment-list" },
      ],
    },
  },

  page_college: {
    key: "page_college",
    title: "College page",
    description: "About the college plus the College / Non-Clinical / Student lists.",
    fields: [
      { name: "subtitle", label: "Page subtitle", type: "textarea" },
      { name: "body", label: "Paragraphs (one per line)", type: "lines" },
      {
        name: "college",
        label: "College links",
        type: "objects",
        fields: [
          { name: "label", label: "Label", type: "text" },
          { name: "href", label: "Link", type: "text" },
        ],
      },
      {
        name: "nonclinical",
        label: "Non-Clinical Department links",
        type: "objects",
        fields: [
          { name: "label", label: "Label", type: "text" },
          { name: "href", label: "Link", type: "text" },
        ],
      },
      {
        name: "student_section",
        label: "Student Section links",
        type: "objects",
        fields: [
          { name: "label", label: "Label", type: "text" },
          { name: "href", label: "Link", type: "text" },
        ],
      },
    ],
    default: {
      subtitle:
        "A dedicated medical college shaping competent and compassionate doctors.",
      body: [
        "Mauli Medical College provides a nurturing academic environment supported by experienced faculty and modern facilities.",
        "With a focus on holistic development, the college balances rigorous academics with research, ethics and community service.",
      ],
      college: [
        { label: "College Equipment List", href: "/p/college-equipment-list" },
        { label: "Central Library", href: "/p/central-library" },
        { label: "Sport & Recreation", href: "/p/sport-recreation" },
        { label: "Mess / Canteen", href: "/p/mess-canteen" },
        { label: "Boys Hostel", href: "/p/boys-hostel" },
        { label: "Girls Hostel", href: "/p/girls-hostel" },
      ],
      nonclinical: [
        { label: "Department of Anatomy", href: "/departments/anatomy" },
        { label: "Department of Physiology", href: "/departments/physiology" },
        { label: "Department of Pathology", href: "/departments/pathology" },
        { label: "Department of Biochemistry", href: "/departments/biochemistry" },
        { label: "Department of Pharmacology", href: "/departments/pharmacology" },
        { label: "Department of Microbiology", href: "/departments/microbiology" },
      ],
      student_section: [
        { label: "Teaching Schedule", href: "/p/teaching-schedule" },
        { label: "Residential", href: "/p/residential" },
        { label: "Admission Process", href: "/admissions" },
      ],
    },
  },

  page_clinical: {
    key: "page_clinical",
    title: "Clinical Material page",
    description: "Monthly clinical material documents available to download.",
    fields: [
      { name: "subtitle", label: "Page subtitle", type: "textarea" },
      {
        name: "documents",
        label: "Documents",
        type: "objects",
        fields: [
          { name: "month", label: "Month / Name", type: "text" },
          { name: "label", label: "Download label", type: "text" },
          { name: "pdf_url", label: "PDF", type: "file" },
        ],
      },
    ],
    default: {
      subtitle:
        "Monthly clinical material reports from the attached teaching hospital.",
      documents: [
        {
          month: "Clinical material June 2024",
          label: "Clinical Data Oct 2025",
          pdf_url: "/docs/clinical-material-oct-2025.pdf",
        },
      ],
    },
  },

  page_gallery: {
    key: "page_gallery",
    title: "Gallery page",
    description:
      "Photo gallery. Each image has a category — the filter tabs are built from the categories you use.",
    fields: [
      { name: "subtitle", label: "Page subtitle", type: "textarea" },
      {
        name: "images",
        label: "Images",
        type: "objects",
        fields: [
          { name: "url", label: "Image", type: "image" },
          { name: "category", label: "Category", type: "text" },
        ],
      },
    ],
    default: {
      subtitle: "Glimpses of our campus, facilities and events.",
      images: [
        { url: "/images/gallery/college.jpg", category: "College Building" },
        { url: "/images/gallery/campus2.jpg", category: "College Building" },
        { url: "/images/gallery/g1.jpeg", category: "College Building" },
        { url: "/images/gallery/g2.jpeg", category: "College Building" },
        { url: "/images/gallery/g3.jpeg", category: "College Building" },
        { url: "/images/gallery/g4.jpeg", category: "College Building" },
        { url: "/images/gallery/img1.jpg", category: "College Building" },
        { url: "/images/gallery/img2.jpg", category: "College Building" },
        { url: "/images/gallery/img3.jpg", category: "College Building" },
        { url: "/images/gallery/hostel-front.jpg", category: "Hostel" },
        { url: "/images/gallery/hostel-back.jpg", category: "Hostel" },
        { url: "/images/hospital.jpg", category: "Hospital" },
      ],
    },
  },

  info_pages: {
    key: "info_pages",
    title: "Sub-pages (Library, Hostels, etc.)",
    description:
      "Standalone pages linked from menus. Each opens at /p/<slug>. Edit slug, title, image and body.",
    fields: [
      {
        name: "items",
        label: "Pages",
        type: "objects",
        fields: [
          { name: "slug", label: "Slug (URL: /p/slug)", type: "text" },
          { name: "title", label: "Title", type: "text" },
          { name: "image", label: "Banner image", type: "image" },
          { name: "body", label: "Body (blank line between paragraphs)", type: "textarea" },
        ],
      },
    ],
    default: {
      items: [
        {
          slug: "college-equipment-list",
          title: "College Equipment List",
          image: "/images/lab.jpg",
          body: "The college is equipped with modern teaching and laboratory equipment across all departments to support a hands-on, practical learning experience.\n\nA detailed equipment list is maintained by each department and updated regularly.",
        },
        {
          slug: "central-library",
          title: "Central Library",
          image: "/images/library.jpg",
          body: "Our central library houses an extensive collection of medical textbooks, reference materials, journals and digital resources.\n\nWith spacious reading areas, e-library access and a quiet study environment, it supports both academic learning and research.",
        },
        {
          slug: "sport-recreation",
          title: "Sport & Recreation",
          image: "/images/students.jpg",
          body: "We encourage a healthy balance between academics and well-being through a range of sports and recreational facilities.\n\nStudents can take part in indoor and outdoor games, fitness activities and annual sports events.",
        },
        {
          slug: "mess-canteen",
          title: "Mess / Canteen",
          image: "/images/classroom.jpg",
          body: "The campus mess and canteen provide hygienic, nutritious and affordable meals to students and staff.\n\nA variety of vegetarian and balanced meal options are available throughout the day.",
        },
        {
          slug: "boys-hostel",
          title: "Boys Hostel",
          image: "/images/gallery/hostel-front.jpg",
          body: "Comfortable and secure on-campus accommodation is provided for male students.\n\nThe hostel offers furnished rooms, 24x7 security, Wi-Fi, common areas and round-the-clock warden support.",
        },
        {
          slug: "girls-hostel",
          title: "Girls Hostel",
          image: "/images/gallery/hostel-back.jpg",
          body: "Safe, well-maintained accommodation is provided for female students with dedicated security and warden supervision.\n\nRooms are furnished and the hostel includes common rooms, Wi-Fi, and a supportive residential environment.",
        },
        {
          slug: "teaching-schedule",
          title: "Teaching Schedule",
          image: "/images/students.jpg",
          body: "Structured teaching schedules are prepared for each academic year and shared with students at the start of every term.\n\nFor the latest timetable, please contact the academic section.",
        },
        {
          slug: "residential",
          title: "Residential",
          image: "/images/gallery/college.jpg",
          body: "The institution provides residential facilities for students and staff within and around the campus.\n\nResidential arrangements include hostels for boys and girls along with staff quarters.",
        },
        { slug: "cafeteria", title: "Cafeteria", image: "/images/classroom.jpg", body: "A hygienic, spacious cafeteria serving fresh and affordable meals, snacks and beverages throughout the day for students and staff." },
        { slug: "cctv", title: "CCTV Surveillance", image: "/images/hospital.jpg", body: "The campus is monitored by round-the-clock CCTV surveillance to ensure a safe and secure environment for students, staff and visitors." },
        { slug: "wifi", title: "WiFi Campus", image: "/images/library.jpg", body: "High-speed Wi-Fi connectivity is available across the campus, supporting digital learning, research and access to online resources." },
        { slug: "laboratory", title: "Laboratory", image: "/images/lab.jpg", body: "Well-equipped laboratories for every department provide students with hands-on practical training using modern instruments and apparatus." },
        { slug: "bus", title: "Bus / Transport", image: "/images/students.jpg", body: "College bus and transport facilities connect the campus with nearby towns, ensuring safe and convenient commuting for students and staff." },
        { slug: "bed-distribution", title: "Bed Distribution", image: "/images/hospital.jpg", body: "The attached teaching hospital maintains a planned distribution of beds across all clinical departments to support patient care and student training." },
        { slug: "casualty", title: "Casualty", image: "/images/dept/emergency.jpg", body: "A 24x7 casualty and emergency unit provides immediate care for accident, trauma and emergency cases." },
        { slug: "front-office", title: "Front Office", image: "/images/hospital.jpg", body: "The hospital front office handles patient registration, enquiries and guidance, ensuring a smooth experience for patients and visitors." },
        { slug: "pharmacy", title: "Pharmacy", image: "/images/dept/pharmacy.jpg", body: "An in-house pharmacy ensures ready availability of essential medicines and supplies for in-patients and out-patients." },
        { slug: "opd", title: "O.P.D.", image: "/images/medical.jpg", body: "The Out-Patient Department offers consultation and treatment across all major specialities on a daily basis." },
        { slug: "ipd", title: "I.P.D.", image: "/images/hospital.jpg", body: "The In-Patient Department provides admitted patients with continuous monitoring, treatment and nursing care." },
        { slug: "operation-theatre", title: "Operation Theatre", image: "/images/dept/surgery.jpg", body: "Modern, fully-equipped operation theatres support a wide range of surgical procedures under sterile, monitored conditions." },
        { slug: "icu", title: "Intensive Care Unit", image: "/images/dept/heart.jpg", body: "The Intensive Care Unit provides critical, round-the-clock monitoring and life-support care for seriously ill patients." },
        { slug: "blood-bank", title: "Blood Bank", image: "/images/medical.jpg", body: "The hospital blood bank maintains a safe and adequate supply of blood and blood components for patient needs." },
        { slug: "labour-room", title: "Labour Room", image: "/images/dept/pediatrics.jpg", body: "A dedicated, well-equipped labour room ensures safe deliveries and immediate newborn and maternal care." },
        { slug: "hospital-equipment-list", title: "Hospital Equipment List", image: "/images/dept/radiology.jpg", body: "The hospital is equipped with modern diagnostic and therapeutic equipment across departments; a detailed equipment list is maintained and updated regularly." },
      ],
    },
  },
} as const;

export type ContentKey = keyof typeof CONTENT_BLOCKS;

export const CONTENT_BLOCK_LIST: ContentBlock[] = Object.values(
  CONTENT_BLOCKS,
) as unknown as ContentBlock[];
