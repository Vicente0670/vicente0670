import {auth} from "@/auth";
import Image from "next/image";
 
export default async function UserAvatar() {
  const session = await auth();
  if (!session?.user) return;
  
  if (session.user.image) fetch(session.user.image as string);

  var userEmail, userEmailPrompt;
  if (session.user.email) {
    userEmail = session.user.email;
    userEmailPrompt = "Nice email. It's: " + userEmail;
  }
  else userEmailPrompt = "No email? Hmm...";

  return (
    <>
      <div className="personal-profile-container">
        <Image
          src={session.user.image ?? ""}
          alt="User Avatar"
          height={512}
          width={512}
        />
        <p>{userEmailPrompt}</p>
        <p>Name: &apos;{session.user.name}&apos;</p>
      </div>
    </>
  )
}