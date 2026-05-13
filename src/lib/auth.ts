import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;
        const email = credentials?.email;
        const password = credentials?.password;

        if (
          typeof email === "string" &&
          typeof password === "string" &&
          email === adminEmail &&
          password === adminPassword
        ) {
          return { id: "1", email: adminEmail, name: "Admin" };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  trustHost: true,
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAdminRoute = nextUrl.pathname.startsWith("/admin");
      const isAdminLogin = nextUrl.pathname === "/admin/login";

      if (isAdminRoute && !isAdminLogin && !isLoggedIn) {
        return false;
      }

      return true;
    },
  },
});
