import "./profile.css";
import Image from "next/image";
import {auth} from "@/auth";
export default async function HeaderProfile() {
  const session = await auth();
  if (session?.user?.image) fetch(session.user.image as string);  
  if (!session) return (
    <>
      <div className="signInContainer signInButton">
        <a href="/access">Sign In</a>
      </div>
    </>
  )
  else return (
    <>
      <div className="signInContainer signInProfile">
        <Image
          src={session.user?.image ?? ""}
          alt="User Avatar"
          height={128}
          width={128}
        />
        <h6>{session.user?.name}</h6>
      </div>
    </>
  )
}