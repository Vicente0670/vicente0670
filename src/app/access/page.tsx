import "./access.css";
import Link from "next/link";
import app from "./page.module.css";
import SignIn from "@/components/user/signin";
import Script from "next/script";
import { auth } from "@/auth";
import { permanentRedirect } from "next/navigation";

export default async function Access() {

  const session = await auth();
  if (session) permanentRedirect("/");

  return (
    <>
      <main>
        <div className={app.container}>
          <div className={app.access}>
            <div className={app.title}>
              <div className={app.logo}/>
              <div className={app.name}>
                <h4>Access Vicente0670.com</h4>
                <p>Use a provided method to access and explore the app&apos;s features.</p>
              </div>
            </div>
            <div className={app.providers}>
              <SignIn/>
            </div>
          </div>
          <div className={app.accessFooter}>
            <p>
              <Link href="/access" title="Access Page, the current page you are on.">Access</Link> page secured by <Link href="https://authjs.dev/" title="A secure, open source authentication method." target="_blank">Auth.js</Link>.
            </p>
          </div>
        </div>
      </main>
      <Script src="/assets/scripts/app/globe/globe.js" />
    </>
  );
}
