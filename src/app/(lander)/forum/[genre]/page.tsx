import Link from "next/link";
import page from "./page.module.css";
import UniversalForumDisplay from "@/components/local/forum/UniversalForumDisplay/component";

/**
 * 
 */
export default async function TopicWall({ params }: { params: Promise<{ genre: string }> }) {

  const { genre } = await params;

  const limit = 2;

  const response = await fetch(`${process.env.AUTH_API_URL}/api/forum/range?limit=${limit}&offset=0`);
  const data = await response.json();

  return (

    <main className={page.root}>
      <div className={page.header}>
        <h1 className={page.title}>Posts on {genre || "topic"}...</h1>
      </div>
      <Link
        href="/forum/new"
        title="Create New Post"
      >
        make a post
      </Link>
      <div className={page.postContainer}>
        <UniversalForumDisplay data={data} limit={limit} genre={genre}/>
      </div>
    </main>

  )

}