import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const REZERVACE_LANDING_HOSTS = new Set(["rezervace.neurea.cz", "www.rezervace.neurea.cz"]);
const TEST_LANDING_HOSTS = new Set(["adhd.neurea.cz", "www.adhd.neurea.cz"]);
const ROBIN_LANDING_HOSTS = new Set([
  "kouzlimesrobinem.cz",
  "www.kouzlimesrobinem.cz",
]);

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
  if (pathname.startsWith("/robin")) {
    requestHeaders.set("x-neurea-landing", "robin");
  } else if (REZERVACE_LANDING_HOSTS.has(host)) {
    requestHeaders.set("x-neurea-landing", "rezervace");
  } else if (TEST_LANDING_HOSTS.has(host)) {
    requestHeaders.set("x-neurea-landing", "test");
  } else if (ROBIN_LANDING_HOSTS.has(host)) {
    requestHeaders.set("x-neurea-landing", "robin");
  }

  if (REZERVACE_LANDING_HOSTS.has(host)) {
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

  if (TEST_LANDING_HOSTS.has(host)) {
    if (isStaticPath(pathname)) {
      return NextResponse.next({ request: { headers: requestHeaders } });
    }
    if (pathname.startsWith("/test")) {
      return NextResponse.next({ request: { headers: requestHeaders } });
    }
    if (pathname === "/" || pathname === "") {
      return NextResponse.next({ request: { headers: requestHeaders } });
    }
    const main = new URL(`https://neurea.cz${pathname}${request.nextUrl.search}`);
    return NextResponse.redirect(main, 301);
  }

  if (ROBIN_LANDING_HOSTS.has(host)) {
    if (isStaticPath(pathname)) {
      return NextResponse.next({ request: { headers: requestHeaders } });
    }
    if (pathname.startsWith("/robin")) {
      return NextResponse.next({ request: { headers: requestHeaders } });
    }
    if (pathname === "/" || pathname === "") {
      return NextResponse.next({ request: { headers: requestHeaders } });
    }
    const main = new URL(`https://kouzlimesrobinem.cz${pathname}${request.nextUrl.search}`);
    return NextResponse.redirect(main, 301);
  }

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/", "/((?!_next/static|_next/image).*)"],
};
