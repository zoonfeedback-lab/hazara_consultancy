import prisma from "../src/lib/prisma";

async function main() {
  await prisma.settings.upsert({
    where: { id: 1 },
    update: {
      address: "Main Mansehra Road, Abbottabad, Khyber Pakhtunkhwa, Pakistan",
      consultancyName: "Hazara Global Consultancy",
      contactEmail: "info@hazaraglobalconsultancy.pk",
      facebookUrl: "https://facebook.com/hazaraglobalconsultancy",
      facultyCount: 24,
      instagramUrl: "https://instagram.com/hazaraglobalconsultancy",
      linkedinUrl: "https://linkedin.com/company/hazaraglobalconsultancy",
      passRate: 87,
      phone: "+92 333 870 2211",
      programsLaunched: 42,
      studentsMentored: 1800,
      tagline: "Premium Mentorship Academy",
      whatsappNumber: "+92 333 870 2211",
      whatsappUrl: "https://wa.me/923338702211",
      youtubeUrl: "https://youtube.com/@hazaraglobalconsultancy",
    },
    create: {
      address: "Main Mansehra Road, Abbottabad, Khyber Pakhtunkhwa, Pakistan",
      consultancyName: "Hazara Global Consultancy",
      contactEmail: "info@hazaraglobalconsultancy.pk",
      facebookUrl: "https://facebook.com/hazaraglobalconsultancy",
      facultyCount: 24,
      id: 1,
      instagramUrl: "https://instagram.com/hazaraglobalconsultancy",
      linkedinUrl: "https://linkedin.com/company/hazaraglobalconsultancy",
      passRate: 87,
      phone: "+92 333 870 2211",
      programsLaunched: 42,
      studentsMentored: 1800,
      tagline: "Premium Mentorship Academy",
      whatsappNumber: "+92 333 870 2211",
      whatsappUrl: "https://wa.me/923338702211",
      youtubeUrl: "https://youtube.com/@hazaraglobalconsultancy",
    },
  });

  await prisma.announcement.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.program.deleteMany();
  await prisma.service.deleteMany();

  await prisma.announcement.createMany({
    data: [
      {
        active: true,
        link: "/programs",
        text: "CSS Essay Bootcamp opens November 1 for the next Abbottabad cohort.",
      },
      {
        active: true,
        link: "/programs",
        text: "PMS Mock Exams are now open for registration.",
      },
      {
        active: true,
        link: "/services/writing-evaluation",
        text: "Virtual Writing Workshop begins October 28 with limited seats.",
      },
      {
        active: true,
        link: "/events",
        text: "Global Career Seminar is scheduled for December 5.",
      },
    ],
  });

  await prisma.testimonial.createMany({
    data: [
      {
        featured: true,
        program: "CSS Preparation",
        quote:
          "Hazara Global gave me the discipline and writing correction I was missing. Their structured mentorship turned effort into results.",
        sortOrder: 1,
        studentName: "Areeba Noman",
      },
      {
        featured: true,
        program: "PMS Crash Course",
        quote:
          "The faculty feedback was direct, practical, and honest. I always knew where I was improving and where I needed to work harder.",
        sortOrder: 2,
        studentName: "Saad Ullah Khan",
      },
      {
        featured: true,
        program: "Essay and Precis Workshop",
        quote:
          "As a student from the Hazara region, I felt understood here. The environment was premium, but the guidance stayed grounded and personal.",
        sortOrder: 3,
        studentName: "Hina Bashir",
      },
    ],
  });

  await prisma.program.createMany({
    data: [
      {
        curriculum: [
          "Essay framing and composition labs",
          "Current affairs note-making system",
          "Weekly evaluated mock practice",
        ],
        description:
          "A high-rhythm bootcamp for serious CSS aspirants who need structure, momentum, and weekly performance feedback.",
        duration: "30 days",
        featured: true,
        name: "30-Day CSS Comprehensive Bootcamp",
        schedule: "Mon, Wed, Sat - 6:00 PM to 8:30 PM",
        slug: "css-comprehensive-bootcamp",
        sortOrder: 1,
        status: "ACTIVE",
        type: "BOOTCAMP",
      },
      {
        curriculum: [
          "Provincial paper strategy",
          "MCQ drills and revision",
          "Interview orientation",
        ],
        description:
          "A focused upcoming course for PMS candidates who want guided revision and stronger test-day readiness.",
        duration: "6 weeks",
        featured: false,
        name: "PMS Crash Course",
        schedule: "Weekend track - Saturday and Sunday",
        slug: "pms-crash-course",
        sortOrder: 2,
        status: "UPCOMING",
        type: "CRASH_COURSE",
      },
      {
        curriculum: [
          "Outline design",
          "Argument sequencing",
          "Faculty-led draft review",
        ],
        description:
          "A short workshop built around essay discipline, clearer argument structure, and practical writing correction.",
        duration: "3 weekends",
        featured: false,
        name: "Essay and Precis Workshop",
        schedule: "Friday evenings and Sunday clinics",
        slug: "essay-and-precis-workshop",
        sortOrder: 3,
        status: "UPCOMING",
        type: "WORKSHOP",
      },
      {
        curriculum: [
          "Career mapping",
          "Monthly strategic reviews",
          "Long-form accountability support",
        ],
        description:
          "A premium active mentorship track for students who want long-range career direction and regular academic accountability.",
        duration: "Ongoing",
        featured: false,
        name: "Career Mentorship Program",
        schedule: "Flexible one-on-one schedule",
        slug: "career-mentorship-program",
        sortOrder: 4,
        status: "ACTIVE",
        type: "MENTORSHIP",
      },
    ],
  });

  await prisma.service.createMany({
    data: [
      {
        benefits: [
          "Structured study planning",
          "Essay and current affairs evaluation",
          "Interview and attempt strategy",
        ],
        description:
          "Deep mentorship for CSS, PMS, FPSC, and provincial exam candidates who need structure, accountability, and strong writing correction.",
        featured: true,
        name: "CSS/PMS Preparation",
        slug: "css-pms-preparation",
        sortOrder: 1,
        status: "ACTIVE",
        tagline: "Serious guidance for serious aspirants.",
        whoItsFor: "Students and graduates preparing for competitive public-service examinations.",
      },
      {
        benefits: [
          "Career pathway comparison",
          "Admissions and scholarship planning",
          "Decision clarity and next-step mapping",
        ],
        description:
          "Practical advisory support for students and families navigating admissions, scholarships, career direction, and longer-term planning.",
        featured: true,
        name: "Career Consultancy",
        slug: "career-consultancy",
        sortOrder: 2,
        status: "ACTIVE",
        tagline: "From uncertainty to an informed next step.",
        whoItsFor: "Students, parents, and early professionals evaluating academic and career decisions.",
      },
      {
        benefits: [
          "Detailed written feedback",
          "Tone and argument refinement",
          "Application and essay review",
        ],
        description:
          "A writing desk for essays, statements, evaluations, and high-stakes drafts that need polish, clarity, and credible structure.",
        featured: false,
        name: "Writing and Evaluation",
        slug: "writing-and-evaluation",
        sortOrder: 3,
        status: "ACTIVE",
        tagline: "Sharper writing, clearer thinking, stronger outcomes.",
        whoItsFor: "Exam candidates, scholarship applicants, and institutions needing high-quality written work.",
      },
    ],
  });
}

main()
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
