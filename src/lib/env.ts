function getRequiredEnv(name: "NEXT_PUBLIC_SUPABASE_URL" | "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY") {
  const value = process.env[name];

  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}. Add it to the project root .env.local file.`,
    );
  }

  return value;
}

export const env = {
  get NEXT_PUBLIC_SUPABASE_URL() {
    return getRequiredEnv("NEXT_PUBLIC_SUPABASE_URL");
  },
  get NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY() {
    return getRequiredEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY");
  },
  get SUPABASE_SERVICE_ROLE_KEY() {
    return process.env.SUPABASE_SERVICE_ROLE_KEY ?? null;
  },
} as const;
