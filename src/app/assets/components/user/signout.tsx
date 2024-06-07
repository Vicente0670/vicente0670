import {signOut, auth} from "@/auth";
export default async function SignOut() {
  const session = await auth();
  if (!session) return;
  return (
    <>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">Sign Out</button>
      </form>
    </>
  )
}