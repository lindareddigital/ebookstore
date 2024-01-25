import { NextResponse, NextRequest } from "next/server";

const cookieOpts = {
  httpOnly: false,
  signed: false,
};

export function middleware(request) {
  console.log("middleware: start");
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith(`/api/`)) {
    return NextResponse.next();
  }

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const siteLocaleInCookie = request.cookies?.get(SiteLocaleKey)?.value;
    let locale = siteLocaleInCookie;

    if (!locale) {
      locale = getBrowserLocale(request);
    }

    const path = pathname === "/" || pathname === "" ? "home" : pathname;
    console.log(
      "middleware: pathname",
      `/${locale}${path.startsWith("/") ? "" : "/"}${path}`
    );

    const response = NextResponse.redirect(
      new URL(
        `/${locale}${path.startsWith("/") ? "" : "/"}${path}`,
        request.url
      )
    );

    if (!siteLocaleInCookie) {
      response.cookies.set(
        {
          name: SiteLocaleKey,
          value: locale,
          maxAge: 1000 * 5 * 60 * 60 * 24 * 365,
          path: "/",
        },
        cookieOpts
      );
    }
    return response;
  }

  const LocaleEndRegex = new RegExp(`^\/?(${i18n.locales.join("|")})\/?$`);
  const isLocaleEnd = LocaleEndRegex.test(pathname);

  if (isLocaleEnd) {
    return NextResponse.redirect(new URL(`${request.url}/home`, request.url));
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-url", request.url);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
