import SignIn from "@/components/user/signin";
import SignOut from "@/components/user/signout";
import UserAvatar from "@/components/user/profile";

export default function Remote() {
  return (
    <>
      <div>
        <p>Useless information:</p><br/>
        <UserAvatar/>
        <SignIn/>
        <SignOut/>
      </div>
    </>
  )
}