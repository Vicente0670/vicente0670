import page from "./page.module.css";

import { redirect } from "next/navigation";
import { auth, signIn, providersMap } from "@/auth";
import { AuthError } from "next-auth";

export default async function SignIn() {

  const session = await auth();
  if (session) redirect("/");

  return (
    <div className={page.root}>
      {Object.values(providersMap).map((provider) => (
        <form
          key={provider.id} 
          action={
            async () => {
              "use server";
              // const { callbackUrl } = props.searchParams;
              try { await signIn(provider.id, {redirectTo: "/"})}
              catch (e) {
                if (e instanceof AuthError) return redirect(`/error?error=${e.type}`);
                throw e;
              }
            }
          }
        >
          <button type="submit">Sign in with {provider.name}</button>
        </form>
      ))}
    </div>
  )
}