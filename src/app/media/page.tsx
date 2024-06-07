import SignIn from "@/app/assets/components/user/signin";
import SignOut from "@/app/assets/components/user/signout";
import UserAvatar from "@/app/assets/components/user/profile";

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