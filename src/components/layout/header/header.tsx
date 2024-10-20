import "./header.css";
import HeaderProfile from "./profile/profile";

export default function GlobalHeader() {
  return (
    <>
      <nav className="navigation">
        <div className="container">
          <div className="menu-toggle-container">
            <div className="menu-toggle">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <a href="/">
            <div className="brand-container">
              <div className="brand-logo"></div>
              <h6>Vicente0670</h6>
            </div>
          </a>
          <HeaderProfile/>
        </div>
      </nav>
    </>
  )
}