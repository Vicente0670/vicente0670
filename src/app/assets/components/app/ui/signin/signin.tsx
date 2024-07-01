import {auth} from "@/auth";
import Image from "next/image";
export default async function SignInProfile() {
  const session = await auth();
  if (!session?.user) return (
    <>
      <a className="access" href="/access">Sign In</a>
    </>
  )
  if (session.user.image) fetch(session.user.image as string);

  return (
    <>
      <Image
        src={session.user.image ?? ""}
        alt="User Avatar"
        height={256}
        width={256}
      />
    </>
  )
}