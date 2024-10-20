"use server";

export async function getRecentVideos() {
  const key = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;
  const maxQueries = 5;

  const code = /&#39;|&quot;|&amp;/g; // ', ", &
  const entities: {[key: string]: string} = {
    "&#39;": "'",
    "&quot;": '"',
    "&amp;": "&",
  }

  try {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${key}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${maxQueries}`,
      {
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );

    if (!response.ok) {
      console.error("Network error while loading videos.");
    }

    const videos = await response.json();

    return videos.items.map((item: any) => ({ 
      videoId: item.id.videoId,
      title: item.snippet.title.replaceAll(code, (e: string | number) => entities[e]),
      thumbnail: item.snippet.thumbnails.high.url,
      publishedAt: item.snippet.publishedAt,
    }));
  }
  catch (e) {
    console.error("Error loading videos: " + e);
    return;
  }
}