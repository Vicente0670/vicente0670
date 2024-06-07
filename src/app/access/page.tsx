import app from "./page.module.css";
import "@/app/assets/styles/access.css";
import SignIn from "@/app/assets/components/user/signin";
import {auth} from "@/auth";
import {permanentRedirect} from "next/navigation";

export default async function Access() {
  const session = await auth();
  if (session) permanentRedirect("/");
  return (
    <>
      <main>
        <div className={app.container}>
          <div className={app.access}>
            <div className={app.title}>
              <div className={app.logo}></div>
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
            <p><a href="/access" title="Access Page, the current page you are on.">Access</a> page secured by <a href="https://authjs.dev/" title="A secure, open source authentication method." target="_blank">Auth.js</a>.</p>
          </div>
        </div>
      </main>
    </>
  );
}
