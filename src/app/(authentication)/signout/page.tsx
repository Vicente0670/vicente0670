import page from "./page.module.css";

import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";

export default async function SignOut() {

  const session = await auth();
  if (!session) redirect("/");

  return (
    <div>
      <h5>Are you sure you want to sign out?</h5>
      <form
        action={
          async (x) => {
            "use server";
            await signOut();
            redirect("/");
          }
        }
      >
        <button type="submit">Sign out</button>
      </form>
    </div>
  )
}