import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const name = "theme";
  const theme = "unset";
  const systemName = "isSystem";
  const systemValue = "true";
  const callbackName = "authjs.callback-url";

  let themeCookie = request.cookies.get(name);
  let systemCookie = request.cookies.get(systemName);
  const callbackCookie = request.cookies.get(callbackName);
  const response = NextResponse.next();
  

  if (callbackCookie) response.cookies.delete(callbackName);

  if (!themeCookie || !systemCookie) {
    response.cookies.set(name, theme);
    response.cookies.set(systemName, systemValue);
    themeCookie = response.cookies.get(name);
    systemCookie = response.cookies.get(systemName);
  }
  return response;
}

export const config = {
  matcher: "/:path*",
}