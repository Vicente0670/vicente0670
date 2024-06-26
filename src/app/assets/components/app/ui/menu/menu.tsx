import "./menu.css";
import YouTubeGallery from "../../galleries/youtube/youtube";
import { getRecentVideos } from "@/lib/getRecentVideos";
export default async function Menu() {
  const videos = await getRecentVideos();
  return (
    <>
      <div className="menu" id="menu">
        <div className="menu-container">
          <div className="menu-layout">
            <div className="side-links">
              <div className="side-links-container">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
            <div className="content">
              <YouTubeGallery videos={videos}/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}