import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const name = "theme";
  const theme = "unset";
  const systemName = "isSystem";
  const systemValue = "true";

  let themeCookie = request.cookies.get(name);
  let systemCookie = request.cookies.get(systemName);
  let response;

  if (!themeCookie || !systemCookie) {
    response = NextResponse.next();
    response.cookies.set(name, theme);
    response.cookies.set(systemName, systemValue);
    themeCookie = response.cookies.get(name);
    systemCookie = response.cookies.get(systemName);
    // response.cookies.set({
    //   name: name,
    //   value: theme,
    //   path: "/",
    // });
  }
  return response;
}

export const config = {
  matcher: "/:path*",
}