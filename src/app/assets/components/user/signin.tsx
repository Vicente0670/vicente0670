import {auth, signIn, providerMap} from "@/auth";
export default async function SignIn() {
  const session = await auth();
  if (session) return;
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
            <div id={provider.id + "-image"}></div>
            {provider.name}
          </button>
        </form>
      ))}
      <hr id="access-break"/>
      <form // Forced to add a seperate form for the Resend provider
        id="resend-form"
        key="resend"
        action={async (d) => {
          "use server";
          await signIn("resend", d);
        }}
      >
        <input type="text" name="email" autoComplete="email" placeholder="example@vicente0670.com" />
        <button type="submit" id="resend">
          <div id="resend-image"></div>
          Continue with email
        </button>
      </form>
    </>
  )
} 