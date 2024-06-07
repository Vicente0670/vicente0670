import "./banner.css";
export default function Banner() {
  return (
    <>
      <div className="announcementBanner">
        <div className="bannerImage"/>
        <div className="bannerText">
          <p>This is an example of an announcement. To learn more, click <a href="/">here</a>.</p>
        </div>
        <div className="bannerClose">
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  )
}