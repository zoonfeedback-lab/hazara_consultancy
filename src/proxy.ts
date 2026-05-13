import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export default auth((request) => {
  const isLoggedIn = Boolean(request.auth?.user);
  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");
  const isAdminLogin = request.nextUrl.pathname === "/admin/login";

  if (isAdminRoute && !isAdminLogin && !isLoggedIn) {
    return NextResponse.redirect(new URL("/admin/login", request.nextUrl));
  }

  if (isAdminLogin && isLoggedIn) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
