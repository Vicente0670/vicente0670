import "./youtube.css";
const YouTubeGallery = ({videos}) => {
  const videoDateLayout = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }

  return (
    <div className="youtube-container">
      {videos.map((video) => (
        <div key={video.videoId} className="youtube-video">
          <h5>{video.title}</h5>
          <img src={video.thumbnail}/>
          <p>Published {new Date(video.publishedAt).toLocaleDateString(undefined, videoDateLayout)}</p>
        </div>
      ))}
    </div>
  )
}
export default YouTubeGallery;