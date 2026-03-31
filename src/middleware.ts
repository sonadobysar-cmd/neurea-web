import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const MAIN_HOSTS = new Set(["neurea.cz", "www.neurea.cz"]);

const LANDING_HOSTS = new Set(["rezervace.neurea.cz", "www.rezervace.neurea.cz"]);

function getHost(request: NextRequest): string {
  const xf = request.headers.get("x-forwarded-host");
  if (xf) {
    return xf.split(",")[0]?.trim().split(":")[0]?.toLowerCase() ?? "";
  }
  return request.headers.get("host")?.split(":")[0]?.toLowerCase() ?? "";
}

function isStaticPath(pathname: string): boolean {
  if (pathname.startsWith("/_next")) return true;
  if (pathname.startsWith("/favicon")) return true;
  return /\.(ico|png|jpe?g|gif|webp|svg|woff2?|txt|xml|json|mp4|webm)$/i.test(pathname);
}

export function middleware(request: NextRequest) {
  const host = getHost(request);
  const { pathname } = request.nextUrl;

  const requestHeaders = new Headers(request.headers);
  if (LANDING_HOSTS.has(host)) {
    requestHeaders.set("x-neurea-landing", "1");
  }

  if (MAIN_HOSTS.has(host) && pathname.startsWith("/rezervace")) {
    const url = request.nextUrl.clone();
    url.hostname = "rezervace.neurea.cz";
    url.protocol = "https:";
    return NextResponse.redirect(url, 301);
  }

  if (LANDING_HOSTS.has(host)) {
    if (isStaticPath(pathname)) {
      return NextResponse.next({ request: { headers: requestHeaders } });
    }
    if (pathname.startsWith("/rezervace")) {
      return NextResponse.next({ request: { headers: requestHeaders } });
    }
    if (pathname === "/" || pathname === "") {
      return NextResponse.next({ request: { headers: requestHeaders } });
    }
    const main = new URL(`https://neurea.cz${pathname}${request.nextUrl.search}`);
    return NextResponse.redirect(main, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/((?!_next/static|_next/image).*)"],
};
