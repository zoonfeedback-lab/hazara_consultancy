import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/types/database";

export const revalidate = 60;

type AnnouncementRow = Database["public"]["Tables"]["announcements"]["Row"];
type BlogPostRow = Database["public"]["Tables"]["blog_posts"]["Row"];
type EventRow = Database["public"]["Tables"]["events"]["Row"];
type ProgramRow = Database["public"]["Tables"]["programs"]["Row"];
type ServiceRow = Database["public"]["Tables"]["services"]["Row"];
type SettingsRow = Database["public"]["Tables"]["settings"]["Row"];
type TestimonialRow = Database["public"]["Tables"]["testimonials"]["Row"];

type PublicStat = {
  label: string;
  suffix: string;
  value: number;
};

const fallbackStats: PublicStat[] = [
  { label: "Students Mentored", suffix: "+", value: 1800 },
  { label: "Pass Rate", suffix: "%", value: 87 },
  { label: "Programs Launched", suffix: "+", value: 42 },
  { label: "Faculty & Mentors", suffix: "", value: 24 },
];

export async function getAnnouncements(): Promise<AnnouncementRow[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("announcements")
      .select("*")
      .eq("active", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Failed to fetch announcements:", error);
      return [];
    }

    const now = Date.now();

    return (data ?? []).filter((announcement) => {
      if (!announcement.expires_at) {
        return true;
      }

      return new Date(announcement.expires_at).getTime() > now;
    });
  } catch (error) {
    console.error("Unexpected error while fetching announcements:", error);
    return [];
  }
}

export async function getStats(): Promise<{ settings: SettingsRow | null; stats: PublicStat[] }> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("settings")
      .select("*")
      .eq("id", 1)
      .maybeSingle();

    if (error) {
      console.error("Failed to fetch settings for stats:", error);
      return { settings: null, stats: fallbackStats };
    }

    return {
      settings: data,
      stats: fallbackStats,
    };
  } catch (error) {
    console.error("Unexpected error while fetching stats:", error);
    return { settings: null, stats: fallbackStats };
  }
}

export async function getTestimonials(featuredOnly = false): Promise<TestimonialRow[]> {
  try {
    const supabase = await createClient();
    let query = supabase.from("testimonials").select("*").order("sort_order", { ascending: true });

    if (featuredOnly) {
      query = query.eq("featured", true);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Failed to fetch testimonials:", error);
      return [];
    }

    return data ?? [];
  } catch (error) {
    console.error("Unexpected error while fetching testimonials:", error);
    return [];
  }
}

export async function getFeaturedProgram(): Promise<ProgramRow | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("programs")
      .select("*")
      .eq("featured", true)
      .in("status", ["active", "upcoming"])
      .order("sort_order", { ascending: true })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error("Failed to fetch featured program:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Unexpected error while fetching featured program:", error);
    return null;
  }
}

export async function getPrograms(status?: Database["public"]["Tables"]["programs"]["Row"]["status"]): Promise<ProgramRow[]> {
  try {
    const supabase = await createClient();
    let query = supabase.from("programs").select("*").order("sort_order", { ascending: true });

    if (status) {
      query = query.eq("status", status);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Failed to fetch programs:", error);
      return [];
    }

    return data ?? [];
  } catch (error) {
    console.error("Unexpected error while fetching programs:", error);
    return [];
  }
}

export async function getServices(featuredOnly = false): Promise<ServiceRow[]> {
  try {
    const supabase = await createClient();
    let query = supabase
      .from("services")
      .select("*")
      .eq("status", "active")
      .order("sort_order", { ascending: true });

    if (featuredOnly) {
      query = query.eq("featured", true);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Failed to fetch services:", error);
      return [];
    }

    return data ?? [];
  } catch (error) {
    console.error("Unexpected error while fetching services:", error);
    return [];
  }
}

export async function getServiceBySlug(slug: string): Promise<ServiceRow | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("slug", slug)
      .eq("status", "active")
      .maybeSingle();

    if (error) {
      console.error(`Failed to fetch service by slug "${slug}":`, error);
      return null;
    }

    return data;
  } catch (error) {
    console.error(`Unexpected error while fetching service by slug "${slug}":`, error);
    return null;
  }
}

export async function getEvents(isPast?: boolean): Promise<EventRow[]> {
  try {
    const supabase = await createClient();
    let query = supabase.from("events").select("*");

    if (typeof isPast === "boolean") {
      query = query.eq("is_past", isPast);
    }

    const { data, error } = await query.order("date", {
      ascending: isPast ? false : true,
    });

    if (error) {
      console.error("Failed to fetch events:", error);
      return [];
    }

    return data ?? [];
  } catch (error) {
    console.error("Unexpected error while fetching events:", error);
    return [];
  }
}

export async function getBlogPosts(
  status: Database["public"]["Tables"]["blog_posts"]["Row"]["status"] = "published",
): Promise<BlogPostRow[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("status", status)
      .order("published_at", { ascending: false, nullsFirst: false });

    if (error) {
      console.error("Failed to fetch blog posts:", error);
      return [];
    }

    return data ?? [];
  } catch (error) {
    console.error("Unexpected error while fetching blog posts:", error);
    return [];
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPostRow | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();

    if (error) {
      console.error(`Failed to fetch blog post by slug "${slug}":`, error);
      return null;
    }

    return data;
  } catch (error) {
    console.error(`Unexpected error while fetching blog post by slug "${slug}":`, error);
    return null;
  }
}

export async function getFeaturedBlogPost(): Promise<BlogPostRow | null> {
  try {
    const supabase = await createClient();
    const featuredResult = await supabase
      .from("blog_posts")
      .select("*")
      .eq("status", "published")
      .eq("featured", true)
      .order("published_at", { ascending: false, nullsFirst: false })
      .limit(1)
      .maybeSingle();

    if (featuredResult.error) {
      console.error("Failed to fetch featured blog post:", featuredResult.error);
    } else if (featuredResult.data) {
      return featuredResult.data;
    }

    const fallbackResult = await supabase
      .from("blog_posts")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false, nullsFirst: false })
      .limit(1)
      .maybeSingle();

    if (fallbackResult.error) {
      console.error("Failed to fetch fallback blog post:", fallbackResult.error);
      return null;
    }

    return fallbackResult.data;
  } catch (error) {
    console.error("Unexpected error while fetching featured blog post:", error);
    return null;
  }
}
