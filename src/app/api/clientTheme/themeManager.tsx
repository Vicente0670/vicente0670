"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { ThemeCookieManager } from "./themeCookieManager";

enum SelectedIndex {
  SYSTEM = 0,
  DARK,
  LIGHT
}

export default function ThemeManager(cookie: { theme: string, system: string }) {

  const [isEnabled, enabled] = useState(false);
  const [theme, setTheme] = useState(cookie.theme);
  const [system, isSystemTheme] = useState(cookie.system);
  const clientForm = useRef<HTMLSelectElement>(null);
  const cookieModified = useRef(false);
  const newTheme = useRef<string | null>(null);
  const newSystem = useRef<string | null>(null);

  const detectSystemThemeChange = useCallback(() => { // Yeah, I could've passed event parameters
    if (
      (!cookieModified.current && system === "true") ||
      (cookieModified.current && newSystem.current === "true")
    ) {
      const body = document.documentElement.classList;
      const isMatching = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (isMatching) {
        body.add("dark");
        body.remove("light");
      }
      else {
        body.add("light");
        body.remove("dark");
      }

      const modifiedTheme = isMatching ? "dark" : "light";
      setTheme(modifiedTheme);
      newTheme.current = modifiedTheme;
      ThemeCookieManager(modifiedTheme, "true");
    }
      
  }, [cookieModified, setTheme, newTheme.current]);

  const modifyTheme = useCallback(() => {
    
    cookieModified.current = true;
    
    const form = clientForm.current!;
    const value = form.value === "system" ? "true" : "false";
    let modifiedTheme;
    isSystemTheme(value);
    newSystem.current = value;

    if (value != "true") {
      modifiedTheme = form.value;

      const body = document.documentElement.classList;
      if (modifiedTheme === "dark") {
        body.add("dark");
        body.remove("light");
      }
      else if (modifiedTheme === "light") {
        body.add("light");
        body.remove("dark");
      }
    }
    else {
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      modifiedTheme = media.matches ? "dark" : "light";
      
      const body = document.documentElement.classList;
      if (modifiedTheme === "dark") {
        body.add("dark");
        body.remove("light");
      }
      else if (modifiedTheme === "light") {
        body.add("light");
        body.remove("dark");
      }
    }
    setTheme(modifiedTheme);
    newTheme.current = modifiedTheme;

    ThemeCookieManager(modifiedTheme, value);

  }, [isSystemTheme, cookieModified, setTheme, newSystem, newTheme]);

  useEffect(() => {
    if (!isEnabled) {

      const media = window.matchMedia("(prefers-color-scheme: dark)");
      media.addEventListener("change", detectSystemThemeChange);
      if (cookie.theme == "unset" || (cookie.system != "true" && cookie.system != "false")) detectSystemThemeChange();

      clientForm.current!.onchange = modifyTheme;

      function setSelectedValue() { // for future use
        const form = clientForm.current!.children;
        const attr = "selected";
        if (system === "true") return form[SelectedIndex.SYSTEM].setAttribute(attr, attr);
        else if (theme) {
          return theme === "dark" ?
          form[SelectedIndex.DARK].setAttribute(attr, attr) :
          form[SelectedIndex.LIGHT].setAttribute(attr, attr);
        }
        else {
          const themeRepair = media.matches ? "dark" : "light";
          const isSystemRepair = "true";
          return ThemeCookieManager(themeRepair, isSystemRepair);
        }
      }

      enabled(true);
    }
  },
    [
      isEnabled,
      enabled,
      detectSystemThemeChange,
      modifyTheme,
    ]
  );

  return (
    <>
      <form>
        <select name="clientTheme" id="clientTheme" defaultValue={
          system === "true" ? "system" : (theme === "dark" ? "dark" : "light")
        } ref={clientForm}>
          <option value="system">System</option>
          <option value="dark">Dark</option>
          <option value="light">Light</option>
        </select>
      </form>
      <p>IS FROM SYSTEM: {system}</p>
      <p>CURRENT THEME: {theme}</p>
    </>
  )

}