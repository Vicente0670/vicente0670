"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
      <ProgressBar
        height="2px"
        color="#43B581"
        options={{ showSpinner: false }}	
      />  
    </div>
  );
}