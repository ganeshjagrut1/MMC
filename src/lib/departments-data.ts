import type { Department } from "@/lib/supabase/types";
import { DEPARTMENT_CONTENT } from "@/lib/department-content";

/**
 * Code-level department defaults so the public site works before (or without)
 * the Supabase tables. Once departments exist in the DB, those rows take over.
 * The long `description` comes from the scraped DEPARTMENT_CONTENT.
 */
const RAW: Array<{
  slug: string;
  name: string;
  short_description: string;
  image_url: string;
}> = [
  { slug: "anatomy", name: "Anatomy", short_description: "Anatomy is the science that studies the structure of the human body and how its parts relate to one another.", image_url: "/images/research.jpg" },
  { slug: "physiology", name: "Physiology", short_description: "Physiology is the scientific study of the functions and mechanisms that operate within a living system.", image_url: "/images/lab.jpg" },
  { slug: "biochemistry", name: "Bio Chemistry", short_description: "Biochemistry is the application of chemistry to the study of biological processes at the cellular and molecular level.", image_url: "/images/dept/microscope.jpg" },
  { slug: "pathology", name: "Pathology", short_description: "Pathology is the study of the causes and effects of disease or injury, and of disease in general.", image_url: "/images/dept/microscope.jpg" },
  { slug: "microbiology", name: "MicroBiology", short_description: "Microbiology is the study of microscopic organisms such as viruses, bacteria, algae, fungi and protozoa.", image_url: "/images/dept/microscope.jpg" },
  { slug: "pharmacology", name: "Pharmacology", short_description: "Pharmacology is the branch of medicine and pharmaceutical sciences concerned with drug action and medication.", image_url: "/images/dept/pharmacy.jpg" },
  { slug: "forensic-medicine", name: "Forensic Medicine", short_description: "Forensic medicine covers the medical specialties dealing with the examination and diagnosis of individuals for legal purposes.", image_url: "/images/medical.jpg" },
  { slug: "general-medicine", name: "General Medicine", short_description: "Internal (general) medicine deals with the prevention, diagnosis and treatment of internal diseases in adults.", image_url: "/images/medical.jpg" },
  { slug: "pediatrics", name: "Pediatrics", short_description: "Pediatrics is the branch of medicine involving the medical care of infants, children, adolescents and young adults.", image_url: "/images/dept/pediatrics.jpg" },
  { slug: "psychiatry", name: "Psychiatry", short_description: "Psychiatry is the medical specialty devoted to the diagnosis, prevention and treatment of mental disorders.", image_url: "/images/doctors.jpg" },
  { slug: "dermatology", name: "Skin (DVL)", short_description: "As the body's largest organ, the skin protects against germs, regulates body temperature and enables touch sensation.", image_url: "/images/medical.jpg" },
  { slug: "respiratory", name: "Respiratory Medicine", short_description: "Respiratory medicine deals with the diagnosis and treatment of diseases of the lungs and respiratory tract.", image_url: "/images/dept/heart.jpg" },
  { slug: "general-surgery", name: "General Surgery", short_description: "General surgery focuses on the alimentary canal and abdominal contents including the oesophagus, stomach and intestines.", image_url: "/images/dept/surgery.jpg" },
  { slug: "orthopedics", name: "Orthopedics", short_description: "Orthopedic surgery is the branch of surgery concerned with conditions involving the musculoskeletal system.", image_url: "/images/dept/radiology.jpg" },
  { slug: "radiodiagnosis", name: "Radio Diagnosis", short_description: "Radiodiagnosis uses radiation, ultrasound and magnetic resonance for the diagnosis of disease.", image_url: "/images/dept/radiology.jpg" },
  { slug: "ent", name: "Otorhinolaryngology", short_description: "Otorhinolaryngology (ENT) is the surgical subspecialty managing conditions of the ear, nose and throat.", image_url: "/images/medical.jpg" },
  { slug: "ophthalmology", name: "Ophthalmology", short_description: "Ophthalmology is the surgical subspecialty dealing with the diagnosis and treatment of eye disorders.", image_url: "/images/dept/eye.jpg" },
  { slug: "obgyn", name: "Gynecology & Obstetrics", short_description: "Obstetrics and gynaecology encompasses the two subspecialties of obstetrics and gynaecology.", image_url: "/images/dept/surgery.jpg" },
  { slug: "anesthesia", name: "Anesthesia", short_description: "Anesthesia is the medical treatment that prevents patients from feeling pain during surgery and diagnostic procedures.", image_url: "/images/dept/heart.jpg" },
  { slug: "dentistry", name: "Dentistry", short_description: "Dentistry is the branch of medicine concerned with the study, diagnosis, prevention and management of oral conditions.", image_url: "/images/dept/dental.jpg" },
  { slug: "community-medicine", name: "PSM (Community Medicine)", short_description: "Preventive and Social Medicine focuses on promoting health and preventing disease at the community level.", image_url: "/images/doctors.jpg" },
];

export const DEFAULT_DEPARTMENTS: Department[] = RAW.map((d, i) => ({
  id: d.slug,
  slug: d.slug,
  name: d.name,
  short_description: d.short_description,
  description: DEPARTMENT_CONTENT[d.slug]?.join("\n\n") ?? null,
  icon: null,
  image_url: d.image_url,
  sort_order: i + 1,
  created_at: "",
}));

export function findDefaultDepartment(slug: string): Department | null {
  return DEFAULT_DEPARTMENTS.find((d) => d.slug === slug) ?? null;
}
