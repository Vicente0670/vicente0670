import { checkEmail } from "@/lib/utils";
import { redirect } from "next/navigation";
import { auth, signIn, providerMap } from "@/auth";


export default async function SignIn() {
  const session = await auth();
  // i try to type and then you do so i try to undo my stuff and it undoes your stuff and now i die
  if (session) {
    redirect("/"); // In the future, make this the forum home page
  }
  
  let map = providerMap;
  if (map.length > 4) { // Number of providers: Resend is forced to always be the last one to prevent deletion!
    map.pop();
  }

  return (
    <>
      {Object.values(map).map((provider) => (
        <form
          key={provider.id}
          action={async () => {
            "use server";
            await signIn(provider.id);
          }}
        >
          <button type="submit" id={provider.id}>
            <div id={provider.id + "-image"}/>
            {provider.name}
          </button>
        </form>
      ))}

      <hr id="access-break"/>
      <form // Forced to add a seperate form for the Resend provider
        id="resend-form"
        key="resend"
        action={async (formSubmission) => {
          "use server";

          const emailString = formSubmission.get("email")?.toString();
          const emailValidation = checkEmail(emailString); // where are you importing it how does it know..

          if (typeof emailValidation === "string") {
            // INVALID EMAIL!!!!
            return console.log(emailValidation);
          } else {
            return console.log("Valid email! Good job sir");
            // unreachable on purpose
            await signIn("resend", formSubmission);
          }
        }}
      >
        <input type="text" name="email" autoComplete="email" placeholder="example@vicente0670.com" id="resendInput"/>
        <button type="submit" id="resend">
          <div id="resend-image"/>
          Continue with email
        </button>
      </form>
    </>
  )
} 