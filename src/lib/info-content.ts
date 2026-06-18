/**
 * Rich default content for the standalone /p/<slug> sub-pages.
 * Written to read like a real medical-college website. The admin can still
 * override the title/image (and body) per page from the content editor; this
 * file supplies the detailed default text + "key features" + page grouping.
 */

export type InfoContent = { intro: string[]; highlights?: string[] };

export const INFO_CONTENT: Record<string, InfoContent> = {
  // ---------------- Facilities / College ----------------
  "college-equipment-list": {
    intro: [
      "Mauli Medical College is equipped with modern teaching and laboratory equipment across every pre-clinical, para-clinical and clinical department, in line with National Medical Commission (NMC) requirements. The infrastructure is designed to give students a strong practical foundation alongside their theoretical learning.",
      "Each department maintains its own inventory of instruments, models, charts and audio-visual aids, which are regularly serviced, calibrated and upgraded. From dissection tables and microscopes to physiology lab amplifiers and pharmacology software, the equipment supports demonstration, experimentation and skill development.",
      "A consolidated equipment register is maintained centrally and updated periodically to ensure availability, safety and compliance during academic inspections.",
    ],
    highlights: [
      "Department-wise instruments aligned to the MBBS curriculum",
      "Regularly serviced, calibrated and audited equipment",
      "Demonstration rooms with audio-visual teaching aids",
      "Skills and simulation tools for hands-on training",
    ],
  },
  "central-library": {
    intro: [
      "The Central Library is the academic heart of the college, offering an extensive collection of standard medical textbooks, reference works, national and international journals, and an ever-growing e-library. It is designed as a calm, well-lit space that encourages focused study and research.",
      "Students and faculty enjoy access to digital databases and online journals, enabling evidence-based learning and up-to-date clinical knowledge. Dedicated reading halls, a reference section and a digital library with internet-enabled workstations are available throughout the working day.",
      "Membership, book lending, reprographic services and reading-room access are managed through an organised circulation system, ensuring resources are available to everyone who needs them.",
    ],
    highlights: [
      "Thousands of medical textbooks and reference volumes",
      "National & international journals (print and online)",
      "E-library with digital databases and internet access",
      "Spacious reading halls and a quiet study environment",
      "Photocopy / reprographic and book-lending services",
    ],
  },
  "sport-recreation": {
    intro: [
      "We believe a healthy body supports a healthy mind. The college actively promotes sports, fitness and recreation so that students maintain a balanced lifestyle through the demanding years of medical education.",
      "Facilities include grounds for outdoor games such as cricket, football and volleyball, along with indoor options like table tennis, carrom and chess. A gymnasium and fitness area help students stay active, while an annual sports meet and inter-college tournaments encourage healthy competition and team spirit.",
      "Cultural and recreational activities run alongside sports, giving students opportunities to relax, build friendships and develop leadership and teamwork skills.",
    ],
    highlights: [
      "Outdoor grounds for cricket, football and volleyball",
      "Indoor games and a fitness gymnasium",
      "Annual sports meet and inter-college tournaments",
      "Cultural events and recreational activities",
    ],
  },
  "mess-canteen": {
    intro: [
      "The campus mess and canteen serve fresh, hygienic and nutritionally balanced meals at affordable rates, ensuring students and staff are well-nourished throughout long academic and clinical days.",
      "Menus are planned for variety and balance, with vegetarian options and special arrangements during examinations and events. Kitchens follow strict hygiene and food-safety practices, and seating areas are clean, spacious and comfortable.",
      "Snacks, beverages and quick meals are available between classes, making the canteen a convenient hub for students to refuel and socialise.",
    ],
    highlights: [
      "Hygienic kitchens following food-safety standards",
      "Balanced, varied and affordable daily menus",
      "Vegetarian and special-diet options",
      "Comfortable, spacious dining areas",
    ],
  },
  "boys-hostel": {
    intro: [
      "Comfortable, secure and well-maintained on-campus accommodation is provided for male students, allowing them to focus fully on their studies in a supportive residential community.",
      "Rooms are furnished with the essentials and supported by 24x7 security, CCTV surveillance and resident warden supervision. Common amenities include Wi-Fi connectivity, study and recreation areas, dining through the campus mess, and round-the-clock water and power.",
      "A disciplined yet friendly environment helps students build lasting friendships and develop independence and responsibility during their time at the college.",
    ],
    highlights: [
      "Furnished rooms with essential amenities",
      "24x7 security, CCTV and warden supervision",
      "Wi-Fi, study rooms and common areas",
      "Mess dining and uninterrupted water & power",
    ],
  },
  "girls-hostel": {
    intro: [
      "Safe, secure and well-managed accommodation is provided for female students, with particular attention to safety, privacy and comfort.",
      "The girls' hostel features furnished rooms, dedicated female wardens, 24x7 security with CCTV surveillance and controlled entry. Residents have access to Wi-Fi, common rooms, study spaces and nutritious meals through the campus mess.",
      "A caring and disciplined environment ensures parents can be confident that their daughters are studying in a protected and nurturing setting.",
    ],
    highlights: [
      "Furnished rooms with a focus on safety and privacy",
      "Dedicated female wardens and controlled entry",
      "24x7 security and CCTV surveillance",
      "Wi-Fi, common rooms and mess dining",
    ],
  },
  "teaching-schedule": {
    intro: [
      "Structured teaching schedules are prepared for every academic year and phase of the MBBS programme, integrating lectures, practicals, small-group teaching, clinical postings and self-directed learning in line with the competency-based medical education (CBME) curriculum.",
      "Time-tables balance pre-clinical, para-clinical and clinical subjects, with early clinical exposure and regular formative assessments. Schedules are shared with students at the start of each term and displayed on departmental notice boards.",
      "For the latest term timetable, examination calendar or posting rota, students may contact the academic section or their respective department.",
    ],
    highlights: [
      "Competency-based (CBME) curriculum structure",
      "Integrated lectures, practicals and clinical postings",
      "Early clinical exposure and regular assessments",
      "Term time-tables and examination calendars",
    ],
  },
  residential: {
    intro: [
      "The institution provides residential facilities for students, interns, resident doctors and staff within and around the campus, creating a close-knit academic community.",
      "Residential arrangements include separate hostels for boys and girls, along with quarters for faculty and staff. Residents benefit from on-campus dining, security, recreation and easy access to the library, laboratories and the attached hospital.",
      "Living on campus minimises travel, maximises study time and ensures students are close to clinical learning opportunities around the clock.",
    ],
    highlights: [
      "Separate hostels for boys and girls",
      "Faculty and staff quarters on campus",
      "On-campus dining, security and recreation",
      "Proximity to library, labs and hospital",
    ],
  },
  cafeteria: {
    intro: [
      "The campus cafeteria is a lively, hygienic space serving fresh meals, snacks and beverages throughout the day. It is a popular spot for students and staff to take a break, refuel and connect between classes and clinical duties.",
      "A varied menu offers wholesome and affordable choices, prepared in clean kitchens that follow strict food-safety practices. Comfortable seating makes it ideal for quick bites as well as relaxed group meals.",
      "Special arrangements are made during examinations, seminars and college events to keep everyone well catered for.",
    ],
    highlights: [
      "Fresh meals, snacks and beverages daily",
      "Clean kitchens with food-safety practices",
      "Affordable, varied menu",
      "Comfortable seating for students and staff",
    ],
  },
  cctv: {
    intro: [
      "The entire campus — including academic blocks, hostels, the hospital and common areas — is monitored round the clock by a network of CCTV cameras, ensuring a safe and secure environment for students, staff, patients and visitors.",
      "Surveillance footage is centrally monitored and recorded, supporting security, discipline and the safety of women on campus. Entry and exit points, corridors, laboratories and parking areas are all covered.",
      "Combined with trained security personnel and controlled access, the CCTV system provides comprehensive, 24x7 campus safety.",
    ],
    highlights: [
      "24x7 surveillance across the campus and hospital",
      "Centrally monitored and recorded footage",
      "Coverage of entry/exit points, corridors and parking",
      "Enhanced safety for students, staff and patients",
    ],
  },
  wifi: {
    intro: [
      "High-speed Wi-Fi connectivity is available across the campus — in academic blocks, the library, hostels and the hospital — empowering students and faculty with seamless access to digital learning resources.",
      "The network supports e-library access, online journals, e-learning platforms, virtual classrooms and research databases. Reliable connectivity enables students to learn anytime, anywhere on campus.",
      "Secure, managed access ensures the network remains fast, safe and dedicated to academic and clinical use.",
    ],
    highlights: [
      "Campus-wide high-speed Wi-Fi",
      "Access to e-library, journals and e-learning",
      "Connectivity in classrooms, hostels and hospital",
      "Secure, managed and reliable network",
    ],
  },
  laboratory: {
    intro: [
      "Every department is supported by well-equipped laboratories that give students extensive hands-on, practical training using modern instruments, apparatus and specimens. Practical learning is central to medical education, and our laboratories make it possible.",
      "Pre-clinical and para-clinical labs cover anatomy, physiology, biochemistry, pathology, microbiology and pharmacology, while clinical laboratories support diagnostic services in the attached hospital. Laboratories are maintained to high standards of safety and hygiene.",
      "Students learn to perform experiments, examine specimens under microscopes, interpret results and correlate findings with clinical practice — building skills they will use throughout their careers.",
    ],
    highlights: [
      "Dedicated labs for every pre-clinical and para-clinical subject",
      "Modern microscopes, instruments and apparatus",
      "Clinical / diagnostic laboratory services",
      "Strict safety and hygiene standards",
    ],
  },
  bus: {
    intro: [
      "College bus and transport facilities connect the campus with nearby towns and key locations, ensuring safe, punctual and convenient commuting for students and staff.",
      "Buses run on planned routes and schedules, operated by experienced drivers with attention to safety and discipline. Transport support is also available for educational visits, camps and community health programmes.",
      "Reliable transport reduces commuting stress and ensures students reach classes, clinical postings and field activities on time.",
    ],
    highlights: [
      "Planned routes connecting nearby towns",
      "Safe, punctual and well-maintained buses",
      "Experienced drivers and disciplined operation",
      "Transport for educational visits and health camps",
    ],
  },

  // ---------------- Hospital ----------------
  "bed-distribution": {
    intro: [
      "The attached teaching hospital maintains a planned distribution of beds across all clinical departments, ensuring adequate clinical material for student training and quality care for patients. Bed strength is organised in line with NMC norms for a teaching hospital.",
      "Beds are allocated across general medicine, surgery, obstetrics & gynaecology, paediatrics, orthopaedics and other specialities, along with intensive care, emergency and isolation beds. This balanced distribution guarantees students exposure to a wide range of cases and conditions.",
      "Ward management, bed occupancy and patient turnover are monitored to maintain efficient, safe and patient-centred services.",
    ],
    highlights: [
      "Beds distributed across all major clinical departments",
      "Dedicated ICU, emergency and isolation beds",
      "Adequate clinical material for student training",
      "Monitored occupancy for efficient patient care",
    ],
  },
  casualty: {
    intro: [
      "The Casualty and Emergency Department operates 24x7, providing immediate medical attention for accident, trauma, poisoning, cardiac and other emergency cases. It is the first point of care for patients arriving in critical condition.",
      "Staffed round the clock by doctors and trained nursing personnel, the unit is equipped for resuscitation, stabilisation and emergency procedures, with rapid access to laboratory, radiology, blood bank, operation theatre and intensive care.",
      "For medical students and interns, the casualty offers invaluable experience in emergency assessment, triage and life-saving interventions.",
    ],
    highlights: [
      "24x7 emergency and trauma care",
      "Resuscitation and stabilisation facilities",
      "Rapid access to lab, radiology and blood bank",
      "Triage training for students and interns",
    ],
  },
  "front-office": {
    intro: [
      "The hospital Front Office is the welcoming face of the institution, handling patient registration, enquiries, appointments and guidance to ensure a smooth and reassuring experience for patients and their families.",
      "Trained staff assist visitors with directions, admission formalities, billing information and general queries. The reception is designed to reduce waiting and confusion, helping patients reach the right department quickly.",
      "Clear signage, helpful personnel and an organised system make the front office a key part of patient satisfaction and hospital efficiency.",
    ],
    highlights: [
      "Patient registration and appointment management",
      "Enquiry, guidance and admission assistance",
      "Helpful, trained reception staff",
      "Organised, patient-friendly experience",
    ],
  },
  pharmacy: {
    intro: [
      "An in-house pharmacy ensures the ready availability of essential medicines, surgical supplies and consumables for both in-patients and out-patients, supporting timely and affordable treatment.",
      "Run under qualified supervision, the pharmacy maintains proper storage, stock management and dispensing practices in line with regulatory standards. Quality medicines are made available at reasonable rates, reducing the burden on patients.",
      "The pharmacy also serves as a learning resource, familiarising students with drug formulations, prescriptions and rational medicine use.",
    ],
    highlights: [
      "Essential medicines and surgical supplies on site",
      "Qualified supervision and proper storage",
      "Affordable rates for patients",
      "Supports learning in rational drug use",
    ],
  },
  opd: {
    intro: [
      "The Out-Patient Department (OPD) offers daily consultation, diagnosis and treatment across all major specialities, serving as the primary point of contact for patients seeking care without admission.",
      "Patients are seen by faculty consultants, resident doctors and interns, supported by diagnostic services such as laboratory and radiology. The OPD handles a large and varied caseload, providing students with rich clinical exposure under supervision.",
      "Organised registration, specialty clinics and an efficient patient-flow system ensure timely care and minimal waiting.",
    ],
    highlights: [
      "Daily consultations across all specialities",
      "Supported by laboratory and radiology services",
      "Supervised clinical training for students",
      "Organised registration and patient flow",
    ],
  },
  ipd: {
    intro: [
      "The In-Patient Department (IPD) provides admitted patients with continuous monitoring, treatment, nursing care and rehabilitation across general and speciality wards.",
      "Round-the-clock medical and nursing teams ensure safe, attentive care, supported by intensive care, operation theatres, blood bank and diagnostic services. Wards are maintained for hygiene, comfort and patient dignity.",
      "For students, ward rounds and bedside teaching in the IPD are central to learning clinical examination, patient management and professional communication.",
    ],
    highlights: [
      "General and speciality in-patient wards",
      "24x7 medical and nursing care",
      "Bedside teaching and ward rounds for students",
      "Clean, comfortable and patient-centred wards",
    ],
  },
  "operation-theatre": {
    intro: [
      "The hospital is equipped with modern, fully-functional operation theatres supporting a wide range of surgical procedures under sterile, monitored and safe conditions.",
      "The theatres feature advanced surgical equipment, anaesthesia work-stations, patient-monitoring systems and strict infection-control protocols. A skilled team of surgeons, anaesthetists and nursing staff ensures patient safety before, during and after surgery.",
      "Students and postgraduates observe and assist in surgeries, gaining essential exposure to operative techniques, aseptic practices and peri-operative care.",
    ],
    highlights: [
      "Sterile, modern operation theatres",
      "Advanced surgical and anaesthesia equipment",
      "Strict infection-control protocols",
      "Operative training for students and PGs",
    ],
  },
  icu: {
    intro: [
      "The Intensive Care Unit (ICU) provides critical, round-the-clock monitoring and life-support care for seriously ill patients requiring close observation and advanced intervention.",
      "Equipped with ventilators, multi-para monitors, defibrillators and infusion systems, the ICU is staffed by trained intensivists and critical-care nurses. It manages cardiac, respiratory, neurological and post-operative emergencies among others.",
      "The unit gives students and resident doctors valuable experience in critical-care medicine, monitoring and emergency decision-making.",
    ],
    highlights: [
      "24x7 critical care and life support",
      "Ventilators, monitors and defibrillators",
      "Trained intensivists and critical-care nurses",
      "Exposure to critical-care medicine for trainees",
    ],
  },
  "blood-bank": {
    intro: [
      "The hospital Blood Bank maintains a safe and adequate supply of blood and blood components, providing a lifeline for surgeries, emergencies, maternal care and patients with chronic conditions.",
      "Operating under licensed and regulated conditions, the blood bank follows strict protocols for donor screening, collection, testing, storage and cross-matching to ensure transfusion safety. Voluntary blood-donation drives are organised regularly with community participation.",
      "Students learn about transfusion medicine, blood grouping and the importance of safe, voluntary blood donation.",
    ],
    highlights: [
      "Safe storage of blood and blood components",
      "Strict donor screening and testing protocols",
      "Regular voluntary blood-donation camps",
      "Transfusion-medicine learning for students",
    ],
  },
  "labour-room": {
    intro: [
      "A dedicated, well-equipped Labour Room ensures safe deliveries and immediate newborn and maternal care, supporting the hospital's commitment to safe motherhood.",
      "The labour room is supported by obstetricians, paediatricians, anaesthetists and trained nursing staff, with rapid access to operation theatres and neonatal care for emergencies. Aseptic practices and continuous monitoring safeguard both mother and baby.",
      "It is an important training ground for students in obstetrics, normal and assisted deliveries, and essential newborn care.",
    ],
    highlights: [
      "Safe, aseptic and monitored deliveries",
      "Obstetric, paediatric and anaesthetic support",
      "Rapid access to OT and neonatal care",
      "Training in obstetrics and newborn care",
    ],
  },
  "hospital-equipment-list": {
    intro: [
      "The hospital is equipped with modern diagnostic and therapeutic equipment across all departments, enabling accurate diagnosis, effective treatment and high-quality clinical training.",
      "Equipment spans radiology (X-ray, ultrasound, CT), laboratory analysers, operation-theatre and anaesthesia systems, ICU monitors and ventilators, ECG and emergency-care devices. All equipment is maintained, calibrated and updated to ensure reliability and patient safety.",
      "A detailed equipment register is maintained and updated regularly to support clinical services, academic requirements and regulatory compliance.",
    ],
    highlights: [
      "Radiology: X-ray, ultrasound and CT",
      "Laboratory analysers and diagnostic devices",
      "OT, anaesthesia, ICU monitors and ventilators",
      "Regularly maintained and calibrated equipment",
    ],
  },
};

/** Groups used to build the related-pages sidebar on each /p/<slug> page. */
export const INFO_GROUPS: Record<string, { label: string; slugs: string[] }> = {
  hospital: {
    label: "Hospital",
    slugs: [
      "bed-distribution",
      "casualty",
      "front-office",
      "pharmacy",
      "opd",
      "ipd",
      "operation-theatre",
      "icu",
      "blood-bank",
      "labour-room",
      "hospital-equipment-list",
    ],
  },
  facilities: {
    label: "Facilities",
    slugs: [
      "central-library",
      "cafeteria",
      "cctv",
      "wifi",
      "laboratory",
      "bus",
      "boys-hostel",
      "girls-hostel",
      "sport-recreation",
      "mess-canteen",
    ],
  },
  college: {
    label: "College",
    slugs: [
      "college-equipment-list",
      "central-library",
      "sport-recreation",
      "mess-canteen",
      "boys-hostel",
      "girls-hostel",
      "teaching-schedule",
      "residential",
    ],
  },
};

export function groupForSlug(slug: string) {
  for (const key of Object.keys(INFO_GROUPS)) {
    if (INFO_GROUPS[key].slugs.includes(slug)) return INFO_GROUPS[key];
  }
  return null;
}
