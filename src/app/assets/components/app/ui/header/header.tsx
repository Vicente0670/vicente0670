import "./header.css";
import Menu from "../menu/menu";
export default function Header() {
  return (
    <>
      <nav className="navigation">
        <svg width="0" height="0">
          <defs>
            <clipPath id="closeShape" clipPathUnits="objectBoundingBox">
              <path
                d="M 0 0 L 1 0 Q 0.825 0 0.825 0.5 Q 0.825 1 0.66 1 L 0.33 1 Q 0.185 1 0.185 0.5 Q 0.185 0 0 0 Z"
              />
            </clipPath>
          </defs>
        </svg>
        <Menu/>
        <div className="feature-container">
          <div className="menu-button-container">
            <div className="menu-button">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <div className="link-container">
            <a href="/">Home</a>
            <a href="/">Videos</a>
            <a href="/">Forum</a>
            <a href="/">Blog</a>
          </div>
        </div>
        <div className="navigation-close">
          <div className="close">
            <div className="closeContainer">
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}