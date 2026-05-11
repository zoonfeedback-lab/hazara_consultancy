export type InquiryStatus = "new" | "in_progress" | "resolved";
export type BlogPostStatus = "draft" | "published";
export type ServiceStatus = "active" | "inactive";
export type ProgramType = "bootcamp" | "workshop" | "crash_course" | "mentorship";
export type ProgramStatus = "active" | "upcoming" | "completed";
export type EventType = "seminar" | "conference" | "workshop" | "community";
export type EventStatus = "upcoming" | "active" | "completed";

export type Database = {
  public: {
    Tables: {
      announcements: {
        Row: {
          active: boolean;
          created_at: string;
          expires_at: string | null;
          id: string;
          link: string | null;
          text: string;
        };
        Insert: {
          active?: boolean;
          created_at?: string;
          expires_at?: string | null;
          id?: string;
          link?: string | null;
          text: string;
        };
        Update: {
          active?: boolean;
          created_at?: string;
          expires_at?: string | null;
          id?: string;
          link?: string | null;
          text?: string;
        };
        Relationships: [];
      };
      blog_posts: {
        Row: {
          body: string | null;
          category: string | null;
          created_at: string;
          excerpt: string | null;
          featured: boolean;
          featured_image_url: string | null;
          id: string;
          published_at: string | null;
          slug: string;
          status: BlogPostStatus;
          title: string;
          updated_at: string;
        };
        Insert: {
          body?: string | null;
          category?: string | null;
          created_at?: string;
          excerpt?: string | null;
          featured?: boolean;
          featured_image_url?: string | null;
          id?: string;
          published_at?: string | null;
          slug: string;
          status?: BlogPostStatus;
          title: string;
          updated_at?: string;
        };
        Update: {
          body?: string | null;
          category?: string | null;
          created_at?: string;
          excerpt?: string | null;
          featured?: boolean;
          featured_image_url?: string | null;
          id?: string;
          published_at?: string | null;
          slug?: string;
          status?: BlogPostStatus;
          title?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      events: {
        Row: {
          created_at: string;
          date: string | null;
          description: string | null;
          featured: boolean;
          id: string;
          image_url: string | null;
          is_past: boolean;
          location: string | null;
          name: string;
          slug: string;
          status: EventStatus;
          type: EventType | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          date?: string | null;
          description?: string | null;
          featured?: boolean;
          id?: string;
          image_url?: string | null;
          is_past?: boolean;
          location?: string | null;
          name: string;
          slug: string;
          status?: EventStatus;
          type?: EventType | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          date?: string | null;
          description?: string | null;
          featured?: boolean;
          id?: string;
          image_url?: string | null;
          is_past?: boolean;
          location?: string | null;
          name?: string;
          slug?: string;
          status?: EventStatus;
          type?: EventType | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      inquiries: {
        Row: {
          created_at: string;
          email: string;
          id: string;
          message: string;
          name: string;
          notes: string | null;
          phone: string | null;
          service_of_interest: string | null;
          status: InquiryStatus;
          subject: string | null;
        };
        Insert: {
          created_at?: string;
          email: string;
          id?: string;
          message: string;
          name: string;
          notes?: string | null;
          phone?: string | null;
          service_of_interest?: string | null;
          status?: InquiryStatus;
          subject?: string | null;
        };
        Update: {
          created_at?: string;
          email?: string;
          id?: string;
          message?: string;
          name?: string;
          notes?: string | null;
          phone?: string | null;
          service_of_interest?: string | null;
          status?: InquiryStatus;
          subject?: string | null;
        };
        Relationships: [];
      };
      media: {
        Row: {
          alt_text: string | null;
          created_at: string;
          filename: string;
          id: string;
          mime_type: string | null;
          public_url: string;
          size_bytes: number | null;
          storage_path: string;
        };
        Insert: {
          alt_text?: string | null;
          created_at?: string;
          filename: string;
          id?: string;
          mime_type?: string | null;
          public_url: string;
          size_bytes?: number | null;
          storage_path: string;
        };
        Update: {
          alt_text?: string | null;
          created_at?: string;
          filename?: string;
          id?: string;
          mime_type?: string | null;
          public_url?: string;
          size_bytes?: number | null;
          storage_path?: string;
        };
        Relationships: [];
      };
      programs: {
        Row: {
          created_at: string;
          curriculum: string[] | null;
          description: string | null;
          duration: string | null;
          featured: boolean;
          id: string;
          name: string;
          schedule: string | null;
          slug: string;
          sort_order: number;
          status: ProgramStatus;
          type: ProgramType | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          curriculum?: string[] | null;
          description?: string | null;
          duration?: string | null;
          featured?: boolean;
          id?: string;
          name: string;
          schedule?: string | null;
          slug: string;
          sort_order?: number;
          status?: ProgramStatus;
          type?: ProgramType | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          curriculum?: string[] | null;
          description?: string | null;
          duration?: string | null;
          featured?: boolean;
          id?: string;
          name?: string;
          schedule?: string | null;
          slug?: string;
          sort_order?: number;
          status?: ProgramStatus;
          type?: ProgramType | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      services: {
        Row: {
          benefits: string[] | null;
          created_at: string;
          description: string | null;
          featured: boolean;
          id: string;
          name: string;
          slug: string;
          sort_order: number;
          status: ServiceStatus;
          tagline: string | null;
          updated_at: string;
          who_its_for: string | null;
        };
        Insert: {
          benefits?: string[] | null;
          created_at?: string;
          description?: string | null;
          featured?: boolean;
          id?: string;
          name: string;
          slug: string;
          sort_order?: number;
          status?: ServiceStatus;
          tagline?: string | null;
          updated_at?: string;
          who_its_for?: string | null;
        };
        Update: {
          benefits?: string[] | null;
          created_at?: string;
          description?: string | null;
          featured?: boolean;
          id?: string;
          name?: string;
          slug?: string;
          sort_order?: number;
          status?: ServiceStatus;
          tagline?: string | null;
          updated_at?: string;
          who_its_for?: string | null;
        };
        Relationships: [];
      };
      settings: {
        Row: {
          address: string | null;
          consultancy_name: string | null;
          contact_email: string | null;
          facebook_url: string | null;
          id: number;
          instagram_url: string | null;
          linkedin_url: string | null;
          phone: string | null;
          tagline: string | null;
          updated_at: string;
          whatsapp_number: string | null;
          whatsapp_url: string | null;
          youtube_url: string | null;
        };
        Insert: {
          address?: string | null;
          consultancy_name?: string | null;
          contact_email?: string | null;
          facebook_url?: string | null;
          id?: number;
          instagram_url?: string | null;
          linkedin_url?: string | null;
          phone?: string | null;
          tagline?: string | null;
          updated_at?: string;
          whatsapp_number?: string | null;
          whatsapp_url?: string | null;
          youtube_url?: string | null;
        };
        Update: {
          address?: string | null;
          consultancy_name?: string | null;
          contact_email?: string | null;
          facebook_url?: string | null;
          id?: number;
          instagram_url?: string | null;
          linkedin_url?: string | null;
          phone?: string | null;
          tagline?: string | null;
          updated_at?: string;
          whatsapp_number?: string | null;
          whatsapp_url?: string | null;
          youtube_url?: string | null;
        };
        Relationships: [];
      };
      testimonials: {
        Row: {
          created_at: string;
          featured: boolean;
          id: string;
          program: string | null;
          quote: string;
          sort_order: number;
          student_name: string;
        };
        Insert: {
          created_at?: string;
          featured?: boolean;
          id?: string;
          program?: string | null;
          quote: string;
          sort_order?: number;
          student_name: string;
        };
        Update: {
          created_at?: string;
          featured?: boolean;
          id?: string;
          program?: string | null;
          quote?: string;
          sort_order?: number;
          student_name?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
