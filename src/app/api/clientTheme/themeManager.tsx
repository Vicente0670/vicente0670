"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { ThemeCookieManager } from "./themeCookieManager";
import { themes } from "@/constants";

enum SelectedIndex {
  SYSTEM = 0,
  DARK,
  LIGHT
}

// Not satisfactory
export default function ThemeManager(cookie: { theme?: string, system: string }) {

  const [theme, setTheme] = useState<string | undefined>(cookie.theme);
  const [system, isSystemTheme] = useState<string>(cookie.system);
  const clientForm = useRef<HTMLSelectElement>(null!);
  const cookieModified = useRef<boolean>(false);
  const query = useRef<MediaQueryList>(null!);
  const body = useRef<DOMTokenList>(null!);
  const newTheme = useRef<string>("");
  const newSystem = useRef<string>("");

  // must definitely fix for more themes
  const checkTheme = useCallback((): string => {
    return clientForm.current.value === "system" ? "true" :
      (clientForm.current.value === "light" ? "light" : "dark");
  }, []);

  const setGlobalTheme = useCallback((): void => {

  }, []);

  const detectSystemThemeChange = useCallback((): void => {
    // Yeah, I could've passed event parameters
    // ... Why are you looking at me like that?
    if (system === "true" || newSystem.current === "true") {
      const isMatching = query.current.matches;
      if (isMatching) {
        body.current.add("dark");
        body.current.remove("light");
      }
      else {
        body.current.add("light");
        body.current.remove("dark");
      }

      const modifiedTheme = isMatching ? "dark" : "light";
      newTheme.current = modifiedTheme;
      setTheme(modifiedTheme);
      ThemeCookieManager(modifiedTheme, "true");
    }
      
  },
    [
      cookieModified,
      system,
      setTheme
    ]
  );

  const modifyTheme = useCallback((): void => {
    const value = clientForm.current.value === "system" ? "true" : clientForm.current.value;
    newSystem.current = value;
    isSystemTheme(value);

    let modifiedTheme;

    if (value != "true") {
      modifiedTheme = value;

      if (modifiedTheme === "dark") {
        body.current.add("dark");
        body.current.remove("light");
      }
      else if (modifiedTheme === "light") {
        body.current.add("light");
        body.current.remove("dark");
      }
    }
    else {
      modifiedTheme = query.current.matches ? "dark" : "light";
      
      // PART OF THE REFACTOR FOR EXTRA THEMES
      // 
      // for (const t in themeList) {
      //   body.remove(t);
      //   if (modifiedTheme === t)
      //     body.add(t);
      // }
      // 
      if (modifiedTheme === "dark") {
        body.current.add("dark");
        body.current.remove("light");
      }
      else if (modifiedTheme === "light") {
        body.current.add("light");
        body.current.remove("dark");
      }
    }
    setTheme(modifiedTheme);
    newTheme.current = modifiedTheme;

    ThemeCookieManager(modifiedTheme, value);

  },
    [
      setTheme,
      isSystemTheme,
      newTheme,
      newSystem,
      cookieModified
    ]
  );

  useEffect((): void => {
    const dom: DOMTokenList = document.documentElement.classList;
    const media: MediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");
    body.current = dom;
    query.current = media;
    query.current.addEventListener("change", detectSystemThemeChange);

    // in case the cookie somehow changes
    // REFACTOR TO DETECT ALL THEMES
    if (cookie.theme === "unset" || (cookie.system != "true" && cookie.system != "false"))
      detectSystemThemeChange();

    clientForm.current.onchange = modifyTheme;

    function setSelectedValue() { // for future use
      const form = clientForm.current.children;
      const attr = "selected";
      if (system === "true")
        return form[SelectedIndex.SYSTEM].setAttribute(attr, attr);
      else if (theme) {
        return theme === "dark" ?
        form[SelectedIndex.DARK].setAttribute(attr, attr) :
        form[SelectedIndex.LIGHT].setAttribute(attr, attr);
      }
      else {
        const themeRepair = query.current.matches ? "dark" : "light";
        const isSystemRepair = "true";
        return ThemeCookieManager(themeRepair, isSystemRepair);
      }
    }
  },
    [
      cookie.theme,
      cookie.system,
      theme,
      system,
      modifyTheme,
      detectSystemThemeChange,
    ]
  );

  return (
    <>
      <form>
        <select
          name="clientTheme"
          id="clientTheme"
          defaultValue={
            system === "true" ? "system" : (theme === "dark" ? "dark" : "light")
          } 
          ref={clientForm}
        >
          <option value="system">System</option>
          <option value="dark">Dark</option>
          <option value="light">Light</option>
        </select>
      </form>
      {/* <p>IS FROM SYSTEM: {system}</p> */}
      {/* <p>CURRENT THEME: {theme}</p> */}
    </>
  )

}