"use server";

import { cookies } from "next/headers";

export async function ThemeCookieManager(newTheme: string, newSystem: string) {
  const globalCookie = await cookies();
  const theme = "theme";
  const system = "isSystem";

  globalCookie.set(theme, newTheme);
  globalCookie.set(system, newSystem);
}