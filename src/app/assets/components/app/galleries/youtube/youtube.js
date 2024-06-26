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
      <div className="youtube-container-title">
        <h5>Latest Uploads</h5>
      </div>
      {videos.map((video) => (
      <div key={video.videoId} className="youtube-video">
        <div className="youtube-thumbnail-container">
          <img className="youtube-thumbnail" src={video.thumbnail} alt="Video Thumbnail" height={360} width={480} draggable={false}/>
        </div>
        <div className="youtube-info-container">
          <h5>{video.title}</h5>
          <p className="youtube-caption">Published {new Date(video.publishedAt).toLocaleDateString(undefined, videoDateLayout)}</p>
        </div>
      </div>
      ))}
    </div>
  )
}
export default YouTubeGallery;