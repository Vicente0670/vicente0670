"use client";

import page from "./page.module.css";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

enum Error {
  Configuration = "Configuration",
  AccessDenied = "AccessDenied",
  Verification = "Verification",
  Default = "Default",
};

const errorMap = {
  [Error.Configuration]: (
    <>
      <h5>Configuration Error</h5>
      <p>There was probably an error on the server-side. Silly me!</p>
      <p>If this keeps on happening to you, send me a message on social media or some other platform and bug me about it.</p>
    </>
  ),
  [Error.AccessDenied]: (
    <>
      <h5>Access Denied</h5>
      <p>For whatever reason, you are not allowed to see this page. What's behind this restriction, anyway?</p>
    </>
  ),
  [Error.Verification]: (
    <>
      <h5>Email Verification Error</h5>
      <p>The token provided is wrong or has expired.</p>
      <p>Try generating a new code and trying again?</p>
      <p><i>And maybe... Take your time writing the code?</i></p>
    </>
  ),
  [Error.Default]: (
    <>
      <h5>An Error Occurred</h5>
      <p>Unfortunately, there was some sort of error when you tried to log in.</p>
      <p>Try again, and if this continues to occur, send me a message on social media or some other platform and bug me about it.</p>
    </>
  ),
}

export default function AuthNotFound() {
  const search = useSearchParams();
  const error = search.get("error") as Error;
  return (
    <main className={page.root}>
      <div className={page.background}>
        <div className={page.header}>
          <h2>There was an error signing you in</h2>
          <h3>See the details below.</h3>
        </div>
        <div className={page.body}>
          {errorMap[error] || errorMap[Error.Default]}
          <p>Error: {error}</p>
        </div>
      </div>
    </main>
  )
}