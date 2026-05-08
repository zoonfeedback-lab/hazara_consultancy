export type Service = {
  slug: string;
  name: string;
  short: string;
  audience: string;
  benefits: string[];
  process: string[];
  pricing?: string;
  cta: string;
  detail: boolean;
};

export type Program = {
  slug: string;
  title: string;
  duration: string;
  schedule: string;
  format: string;
  curriculum: string[];
  status: string;
  highlight?: boolean;
};

export type EventItem = {
  slug: string;
  title: string;
  date: string;
  location: string;
  description: string;
  type: string;
  isPast?: boolean;
  gallery?: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  author: string;
  readingTime: string;
  related: string[];
  body: string[];
};

export type Mentor = {
  name: string;
  title: string;
  bio: string;
  tags: string[];
};

export const announcements = [
  "CSS 2026 flagship mentorship registrations are open for Abbottabad and online cohorts.",
  "Essay and composition weekend lab starts 18 May with limited seats.",
  "Women in public leadership seminar announced in collaboration with local institutions.",
  "Admissions planning desk is now taking fall 2026 scholarship inquiries.",
];

export const stats = [
  { label: "Students Mentored", value: 1800, suffix: "+" },
  { label: "Pass Rate", value: 87, suffix: "%" },
  { label: "Programs Launched", value: 42, suffix: "+" },
  { label: "Faculty & Mentors", value: 24, suffix: "" },
];

export const testimonials = [
  {
    name: "Areeba Noman",
    role: "CSS Essay Distinction, Abbottabad",
    quote:
      "The mentorship felt elite but deeply local. Every evaluation pushed me toward clarity, discipline, and confidence.",
  },
  {
    name: "Saad Ullah Khan",
    role: "PMS Qualifier, Mansehra",
    quote:
      "Hazara Global gave me structure when I had ambition but no system. The faculty feedback was direct, respectful, and game-changing.",
  },
  {
    name: "Hina Bashir",
    role: "Parent of a CSS aspirant",
    quote:
      "What stood out was trust. We knew exactly what support our daughter was receiving and how her preparation was progressing.",
  },
];

export const aboutValues = [
  {
    title: "Academic Integrity",
    copy:
      "We believe serious careers are built on honest preparation, rigorous feedback, and disciplined standards.",
  },
  {
    title: "Community Focus",
    copy:
      "Our work is rooted in Abbottabad and the wider Hazara region, with a strong commitment to local talent and access.",
  },
  {
    title: "Structured Mentorship",
    copy:
      "Students and families trust us because our guidance is deliberate, sequenced, and designed around real progress.",
  },
  {
    title: "Results Orientation",
    copy:
      "Every service is shaped around outcomes: stronger writing, clearer decisions, better preparation, and confident next steps.",
  },
];

export const mentors: Mentor[] = [
  {
    name: "Dr. Hamza Farooq",
    title: "Lead CSS/PMS Strategist",
    bio:
      "Hamza leads high-stakes exam strategy and writing mentorship, helping aspirants build disciplined systems rather than scattered effort.",
    tags: ["Essay Strategy", "Current Affairs", "Interview Prep"],
  },
  {
    name: "Sadia Khan",
    title: "Admissions & Career Advisor",
    bio:
      "Sadia works with students and families on scholarship planning, admissions positioning, and longer-term academic decision-making.",
    tags: ["Admissions Guidance", "SOP Review", "Career Planning"],
  },
  {
    name: "Usman Tariq",
    title: "Programs & Events Lead",
    bio:
      "Usman designs workshops, institutional seminars, and public programs that combine strong content with polished execution.",
    tags: ["Bootcamps", "Public Events", "Institutional Partnerships"],
  },
];

export const services: Service[] = [
  {
    slug: "css-pms-prep",
    name: "CSS/PMS Preparation",
    short:
      "Structured mentorship for CSS, PMS, FPSC, and provincial competitive examinations.",
    audience:
      "Serious aspirants seeking one-on-one guidance, evaluations, and disciplined exam strategy.",
    benefits: [
      "Diagnostic planning based on attempt timeline and optional subjects",
      "Essay, composition, current affairs, and interview preparation under one roof",
      "Weekly writing reviews with actionable score-improvement feedback",
    ],
    process: [
      "Initial readiness assessment and attempt mapping",
      "Custom weekly study plan with writing checkpoints",
      "Mock exams, review sessions, and performance tracking",
    ],
    pricing: "Starting from PKR 18,000 / month depending on depth and review frequency.",
    cta: "Book Consultation",
    detail: true,
  },
  {
    slug: "career-consultancy",
    name: "Career Consultancy",
    short:
      "Career roadmaps for students and early professionals navigating public service, higher studies, and purpose-led work.",
    audience:
      "Students, graduates, and families evaluating the right next step after intermediate, university, or gap years.",
    benefits: [
      "Clearer direction across civil service, academia, and international opportunities",
      "Profile review aligned with strengths, values, and timelines",
      "Confidence-building guidance for difficult decisions",
    ],
    process: [
      "Discovery session covering goals and academic context",
      "Pathway comparison with risks, timelines, and required milestones",
      "Action plan with follow-up recommendations",
    ],
    pricing: "Single strategy session from PKR 6,500.",
    cta: "Inquire Now",
    detail: true,
  },
  {
    slug: "admissions-guidance",
    name: "Admissions Guidance",
    short:
      "Application support for universities, scholarships, and statements of purpose.",
    audience:
      "Students applying to Pakistani or international institutions who need positioning, planning, and document strategy.",
    benefits: [
      "Shortlisted options matched to budget, merit, and goals",
      "Application calendars and document checklists",
      "Personal statement and interview preparation support",
    ],
    process: [
      "Academic profile review and target list creation",
      "Document planning including SOP and recommendation strategy",
      "Submission support with interview rehearsal",
    ],
    pricing: "Packages from PKR 12,000 for guided application support.",
    cta: "Start Admissions Plan",
    detail: true,
  },
  {
    slug: "writing-evaluation",
    name: "Writing and Evaluation",
    short:
      "Academic writing support, content development, and rigorous evaluation for essays, composition, and applications.",
    audience:
      "Exam candidates, scholarship applicants, and institutions needing polished writing support.",
    benefits: [
      "Detailed rubric-based essay and composition feedback",
      "Tone, structure, and argument refinement",
      "Support for institutional reports, profiles, and editorial pieces",
    ],
    process: [
      "Brief review and scope confirmation",
      "Draft feedback or content development",
      "Revision notes with clarity and quality checks",
    ],
    pricing: "Essay evaluation from PKR 2,500 per submission.",
    cta: "Submit Draft",
    detail: true,
  },
  {
    slug: "event-management",
    name: "Event Management",
    short:
      "Educational events, women-centered programs, institutional seminars, and civic dialogue formats.",
    audience:
      "Schools, colleges, universities, NGOs, and public-interest organizations in Hazara and across KPK.",
    benefits: [
      "Concept-to-execution support for meaningful public programs",
      "Trusted speaker curation and moderation",
      "Professional audience experience and branded communication",
    ],
    process: [
      "Event scoping with partner goals and audience profile",
      "Agenda design, speaker planning, and logistics coordination",
      "On-ground execution with post-event documentation",
    ],
    pricing: "Quoted per format, audience size, and production requirements.",
    cta: "Host With Us",
    detail: true,
  },
  {
    slug: "bootcamps-cohorts",
    name: "Bootcamps and Cohorts",
    short:
      "Fast-moving intensive programs for essay writing, current affairs, interview prep, and subject mastery.",
    audience:
      "Candidates who need concentrated momentum before exams, interviews, or admissions deadlines.",
    benefits: [
      "Focused delivery over weekends or compact multi-week windows",
      "Practical drills instead of passive lectures",
      "Peer energy backed by expert facilitation",
    ],
    process: [
      "Defined outcomes and syllabus release",
      "Live sessions with writing labs and faculty review",
      "Follow-up resources for continued practice",
    ],
    pricing: "Short bootcamps from PKR 8,000.",
    cta: "View Programs",
    detail: true,
  },
  {
    slug: "mentorship-programs",
    name: "Mentorship Programs",
    short:
      "Longer-duration premium guidance tracks for students who want accountability and proximity to mentors.",
    audience:
      "Students ready for disciplined long-form preparation and regular check-ins.",
    benefits: [
      "Small-batch support and mentor accountability",
      "Clear milestone tracking",
      "Higher-touch support for serious candidates",
    ],
    process: [
      "Onboarding and baseline planning",
      "Weekly mentor check-ins",
      "Review cycles and progress scoring",
    ],
    cta: "Contact Team",
    detail: false,
  },
];

export const programs: Program[] = [
  {
    slug: "css-intensive-30",
    title: "30-Day CSS Intensive Bootcamp",
    duration: "4 weeks",
    schedule: "Mon, Wed, Sat • 6:00 PM - 8:30 PM",
    format: "Hybrid • Abbottabad + Live Online",
    curriculum: [
      "Essay framing and composition labs",
      "Current affairs note-making system",
      "Pakistan affairs answer structure",
      "Weekly timed mock practice",
    ],
    status: "Admissions Open",
    highlight: true,
  },
  {
    slug: "pms-crash-course",
    title: "PMS Crash Course",
    duration: "6 weeks",
    schedule: "Weekend track • Sat-Sun",
    format: "In-person cohort",
    curriculum: [
      "Provincial paper strategy",
      "MCQ drills and current affairs revision",
      "Writing correction desk",
      "Interview orientation",
    ],
    status: "May Cohort",
  },
  {
    slug: "essay-masterclass",
    title: "Essay Writing Masterclass",
    duration: "3 weekends",
    schedule: "Friday evenings + Sunday clinics",
    format: "Live online",
    curriculum: [
      "Theme analysis and outline design",
      "Argument sequencing",
      "Introductions and conclusions that score",
      "Faculty-led draft review",
    ],
    status: "Seats Limited",
  },
  {
    slug: "general-ability-lab",
    title: "General Ability Problem-Solving Lab",
    duration: "5 weeks",
    schedule: "Tue and Thu • 7:00 PM",
    format: "Online guided lab",
    curriculum: [
      "Quant reasoning drills",
      "Analytical shortcuts",
      "Practice sets with walkthroughs",
      "Performance tracking sheets",
    ],
    status: "Register Interest",
  },
];

export const events: EventItem[] = [
  {
    slug: "public-leadership-seminar-2026",
    title: "Public Leadership Seminar",
    date: "21 May 2026",
    location: "Abbottabad Public School Auditorium",
    description:
      "A high-trust seminar on public leadership, exam preparation, and civic responsibility for students and parents.",
    type: "Upcoming",
  },
  {
    slug: "women-in-civil-services-forum",
    title: "Women in Civil Services Forum",
    date: "07 June 2026",
    location: "Women University Network, Abbottabad",
    description:
      "A women-centered program focused on confidence, pathway clarity, and representation in competitive services.",
    type: "Upcoming",
  },
  {
    slug: "interfaith-harmony-conference",
    title: "Interfaith Harmony Conference",
    date: "12 February 2026",
    location: "Abbottabad",
    description:
      "A civic dialogue convening educators, religious leaders, and students around social cohesion and responsible citizenship.",
    type: "Past",
    isPast: true,
    gallery: ["Keynote exchange", "Audience reflections", "Partnership desk"],
  },
  {
    slug: "institutional-mentor-day",
    title: "Institutional Mentor Day",
    date: "28 January 2026",
    location: "Government College, Haripur",
    description:
      "Faculty and students joined structured strategy clinics on CSS/PMS preparation and competitive writing.",
    type: "Past",
    isPast: true,
    gallery: ["Mentor panel", "Writing clinic", "Student advisory circles"],
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "css-essay-success-framework",
    title: "10 Tips for CSS Essay Success: Mastering the Competitive Edge",
    category: "CSS Prep",
    date: "03 May 2026",
    excerpt:
      "A practical writing framework for aspirants who want more than motivation and need repeatable essay discipline.",
    author: "Hazara Faculty Desk",
    readingTime: "7 min read",
    related: ["kpk-pms-syllabus-books", "balancing-work-with-css-prep"],
    body: [
      "Great CSS essays rarely begin with better English alone. They begin with a stronger thinking process. The candidates who improve fastest usually learn to slow down before they speed up. They define the question, set a clear thesis, and decide the order of arguments before they ever start writing.",
      "At Hazara Global Consultancy, we teach essay building as a sequence of decisions. A useful essay does not wander into examples and then hope a theme appears. It starts with a clear stance, develops that stance through disciplined sections, and closes by showing maturity rather than merely repeating points.",
      "Students in Abbottabad and across Hazara often ask whether reading more newspapers is enough. It helps, but reading without a note-making system becomes noise. The better route is to build a limited source stack, convert it into issue sheets, and then rehearse using those sheets inside timed outlines.",
      "Your final edge comes from evaluation. Most aspirants improve only after someone marks what they wrote, not what they intended to write. Honest feedback shortens the distance between effort and score.",
    ],
  },
  {
    slug: "kpk-pms-syllabus-books",
    title: "KPK PMS 2026: Syllabus Breakdown and Booklist",
    category: "PMS Strategy",
    date: "28 April 2026",
    excerpt:
      "A clean overview of the PMS structure, subject expectations, and a practical reading list for disciplined preparation.",
    author: "Academic Strategy Team",
    readingTime: "6 min read",
    related: ["css-essay-success-framework", "current-affairs-reading-system"],
    body: [
      "The strongest PMS preparation plans begin by respecting the exam as a system. Aspirants who treat each paper as an isolated challenge often feel busy but underprepared. The goal is to understand the exam structure first, then choose material that supports answer writing rather than endless accumulation.",
      "For KPK aspirants, the smartest reading list is not the longest one. It is the one that can actually be revised. A shorter stack, revised multiple times, produces more recall and confidence than scattered reading across ten different sources.",
      "Optional subject decisions should be made with both interest and scoring rhythm in mind. If a subject matches your academic background but you cannot sustain writing practice in it, the advantage may be weaker than it seems.",
    ],
  },
  {
    slug: "balancing-work-with-css-prep",
    title: "Managing the Timeline: Balancing Work with CSS Preparation",
    category: "Mentorship Advice",
    date: "19 April 2026",
    excerpt:
      "A humane preparation model for professionals and graduates who need structure around jobs, family, and realistic study windows.",
    author: "Mentorship Office",
    readingTime: "5 min read",
    related: ["css-essay-success-framework", "from-abbottabad-to-foreign-service"],
    body: [
      "Working candidates do not need generic productivity slogans. They need an honest timetable. That usually means identifying protected study windows, reducing unnecessary resource switching, and accepting that consistency is more valuable than heroic bursts of effort.",
      "A strong plan separates deep study from maintenance tasks. Reading a difficult topic, writing an essay outline, and revising MCQs all demand different energy levels. When candidates assign the right task to the right part of the day, burnout drops and output improves.",
      "The best mentorship systems also build accountability without shame. Missing a session should trigger an adjustment, not a collapse.",
    ],
  },
  {
    slug: "from-abbottabad-to-foreign-service",
    title: "From Abbottabad to the Foreign Service: A Journey of Grit",
    category: "Student Story",
    date: "08 April 2026",
    excerpt:
      "A portrait of disciplined progress from uncertainty to a national-level public service ambition.",
    author: "Editorial Team",
    readingTime: "4 min read",
    related: ["balancing-work-with-css-prep", "current-affairs-reading-system"],
    body: [
      "Many students in Hazara grow up with ambition but limited proximity to polished academic ecosystems. What changes their trajectory is often not talent alone, but access to structure, language, and belief.",
      "The journey we see most often is uneven at first. Students are bright, but their methods are scattered. Once they receive grounded mentorship, better note-making, and regular review, confidence becomes evidence-based rather than emotional.",
      "That is why local institutions matter. World-class standards feel more achievable when they are offered close to home.",
    ],
  },
  {
    slug: "current-affairs-reading-system",
    title: "Current Affairs Reading System for Serious Aspirants",
    category: "Resources",
    date: "01 April 2026",
    excerpt:
      "How to move from daily reading fatigue to a usable, answer-ready current affairs note system.",
    author: "Current Affairs Desk",
    readingTime: "6 min read",
    related: ["kpk-pms-syllabus-books", "css-essay-success-framework"],
    body: [
      "Current affairs overwhelm usually comes from undifferentiated reading. When every article feels equally urgent, nothing becomes revision-ready. A better system sorts material into themes, issues, facts, and arguments.",
      "Students should keep one running issue sheet per major area such as governance, economy, regional diplomacy, or climate. Every update then lands in the right place rather than disappearing in random notebooks or screenshots.",
      "The aim is not to become a news archive. It is to become a better answer writer.",
    ],
  },
];

export const featuredProgram = programs[0];

export const office = {
  address: "Main Mansehra Road, Abbottabad, Khyber Pakhtunkhwa, Pakistan",
  locationNote: "Near the city education corridor in Abbottabad.",
  phone: "+92 333 870 2211",
  email: "info@hazaraglobalconsultancy.pk",
  whatsapp: "https://wa.me/923338702211",
};

export function getService(slug: string) {
  return services.find((service) => service.slug === slug && service.detail);
}

export function getPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
