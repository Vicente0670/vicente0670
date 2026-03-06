import page from "./page.module.css";
import UniversalForumDisplay from "@/components/local/forum/UniversalForumDisplay/component";
import { forumPullAmount } from "@/constants";
import Link from "next/link";

/**
 * Universal Forum Page
 * 
 * Shows recent forum activity and "recommended" pages.
 * 
 * An actual algorithm has yet to be developed.
 * 
*/
export default async function RecommendedForumFeed() {

  const limit = forumPullAmount;

  const response = await fetch(`${process.env.AUTH_API_URL}/api/forum/range?limit=${limit}&offset=0&genre=%`);
  const data = await response.json();

  return (

    <main className={page.root}>
      <div className={page.header}>
        <h1 className={page.title}>All Posts</h1>
      </div>
      <Link
        href="/forum/new"
        title="Create New Post"
      >
        make a post
      </Link>
      <div className={page.postContainer}>
        <UniversalForumDisplay data={data} limit={limit} genre="all"/>
      </div>
    </main>

  )

}