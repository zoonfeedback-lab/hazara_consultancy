import prisma from "@/lib/prisma";
import type {
  Announcement,
  BlogPost,
  BlogPostStatus,
  Event,
  Program,
  ProgramStatus,
  Service,
  Settings,
  Testimonial,
} from "@/lib/types/database";

export const revalidate = 60;

type PublicStat = {
  label: string;
  suffix: string;
  value: number;
};

export async function getAnnouncements(): Promise<Announcement[]> {
  try {
    return await prisma.announcement.findMany({
      where: {
        active: true,
        OR: [
          { expiresAt: null },
          { expiresAt: { gt: new Date() } },
        ],
      },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("getAnnouncements failed:", error);
    return [];
  }
}

export async function getSettings(): Promise<Settings | null> {
  try {
    return await prisma.settings.findUnique({ where: { id: 1 } });
  } catch (error) {
    console.error("getSettings failed:", error);
    return null;
  }
}

export async function getStats(): Promise<{ settings: Settings | null; stats: PublicStat[] }> {
  try {
    const settings = await getSettings();

    return {
      settings,
      stats: [
        { label: "Students Mentored", suffix: "+", value: settings?.studentsMentored ?? 0 },
        { label: "Pass Rate", suffix: "%", value: settings?.passRate ?? 0 },
        { label: "Programs Launched", suffix: "+", value: settings?.programsLaunched ?? 0 },
        { label: "Faculty & Mentors", suffix: "", value: settings?.facultyCount ?? 0 },
      ],
    };
  } catch (error) {
    console.error("getStats failed:", error);
    return {
      settings: null,
      stats: [
        { label: "Students Mentored", suffix: "+", value: 0 },
        { label: "Pass Rate", suffix: "%", value: 0 },
        { label: "Programs Launched", suffix: "+", value: 0 },
        { label: "Faculty & Mentors", suffix: "", value: 0 },
      ],
    };
  }
}

export async function getTestimonials(featuredOnly = false): Promise<Testimonial[]> {
  try {
    return await prisma.testimonial.findMany({
      where: featuredOnly ? { featured: true } : undefined,
      orderBy: { sortOrder: "asc" },
    });
  } catch (error) {
    console.error("getTestimonials failed:", error);
    return [];
  }
}

export async function getFeaturedProgram(): Promise<Program | null> {
  try {
    return await prisma.program.findFirst({
      where: {
        featured: true,
        status: { in: ["ACTIVE", "UPCOMING"] },
      },
      orderBy: { sortOrder: "asc" },
    });
  } catch (error) {
    console.error("getFeaturedProgram failed:", error);
    return null;
  }
}

export async function getPrograms(status?: ProgramStatus): Promise<Program[]> {
  try {
    return await prisma.program.findMany({
      where: status ? { status } : undefined,
      orderBy: { sortOrder: "asc" },
    });
  } catch (error) {
    console.error("getPrograms failed:", error);
    return [];
  }
}

export async function getServices(featuredOnly = false): Promise<Service[]> {
  try {
    return await prisma.service.findMany({
      where: {
        status: "ACTIVE",
        ...(featuredOnly ? { featured: true } : {}),
      },
      orderBy: { sortOrder: "asc" },
    });
  } catch (error) {
    console.error("getServices failed:", error);
    return [];
  }
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  try {
    return await prisma.service.findFirst({
      where: {
        slug,
        status: "ACTIVE",
      },
    });
  } catch (error) {
    console.error("getServiceBySlug failed:", error);
    return null;
  }
}

export async function getEvents(isPast?: boolean): Promise<Event[]> {
  try {
    return await prisma.event.findMany({
      where: isPast !== undefined ? { isPast } : undefined,
      orderBy: { date: isPast ? "desc" : "asc" },
    });
  } catch (error) {
    console.error("getEvents failed:", error);
    return [];
  }
}

export async function getBlogPosts(status: BlogPostStatus = "PUBLISHED"): Promise<BlogPost[]> {
  try {
    return await prisma.blogPost.findMany({
      where: { status },
      orderBy: { publishedAt: "desc" },
    });
  } catch (error) {
    console.error("getBlogPosts failed:", error);
    return [];
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    return await prisma.blogPost.findFirst({
      where: {
        slug,
        status: "PUBLISHED",
      },
    });
  } catch (error) {
    console.error("getBlogPostBySlug failed:", error);
    return null;
  }
}

export async function getFeaturedBlogPost(): Promise<BlogPost | null> {
  try {
    return (
      (await prisma.blogPost.findFirst({
        where: { status: "PUBLISHED", featured: true },
        orderBy: { publishedAt: "desc" },
      })) ??
      (await prisma.blogPost.findFirst({
        where: { status: "PUBLISHED" },
        orderBy: { publishedAt: "desc" },
      }))
    );
  } catch (error) {
    console.error("getFeaturedBlogPost failed:", error);
    return null;
  }
}
