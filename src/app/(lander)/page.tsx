import WindowsButton from "@/components/global/windowsButton/windowsButton";
import home from "./page.module.css";
import { auth } from "@/auth";

export default async function Home() {

  const session = await auth();
  console.log(session);

  return (
    <>
      <h1>The dog does their thing</h1>
      <h2>The dog does their thing</h2>
      <h3>The dog does their thing</h3>
      <h4>The dog does their thing</h4>
      <h5>The dog does their thing</h5>
      <h6>The dog does their thing</h6>
      <p>The dog does their thing</p>
      <code>
        funny();
      </code>

      <div className={home.intro1}>
        <p>testing things around and stuff</p>
      </div>
      <div className={home.intro2}>
        <p>testing things around and stuff</p>
      </div>
      <p>Make sure to press <kbd>Alt</kbd> + <kbd>F4</kbd> to obtain free cash</p>
      <p>Alternatively, press <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>Shift</kbd> + <kbd>Windows</kbd> + <kbd>L</kbd> to GET A JOB&#8212;</p>
      <p><a href="test">Hold on</a> to those thoughts...</p>
      <p>It's the sound of <a href="asd2">LIGHT</a>!</p>
      <br />
      <p>Just don't press <kbd>J</kbd> after that</p>
      <a href="asd3">more link</a>

      <br />
      <a href="/forum">This is a test of the forum page.</a>
      <a href="/forum/new">make a new post here!!!!</a>
      <br />

      <div>
        <p>{session ? `Welcome ${session.user?.name}` : "You are not named yet. SIGN IN to change that!"}</p>
      </div>

      <WindowsButton href="/signin" text="sign in page" />
      <WindowsButton href="/signout" text="LEAVE" />
      <WindowsButton href="/error" text="no guys" />

      <p>paragraph</p>
      <p>paragraph</p>
      <p>paragraph</p>
      <h1>test</h1>
    </>
  )
}