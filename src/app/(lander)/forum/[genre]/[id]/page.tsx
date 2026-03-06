import post from "./page.module.css";
import IndividualForumDisplay from "@/components/local/forum/IndividualForumDisplay/component";

export default async function ForumPost({ params }: { params: Promise<{ uuid: string }> }) {
  
  const { uuid } = await params;

  const response = await fetch(
    `${process.env.AUTH_API_URL}/api/forum/get?uuid=${uuid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );
  const query = await response.json();
  console.log(response, query);
  const validQuery = await query[0];
  console.log(validQuery);

  return (
    <main className={post.root}>
      <IndividualForumDisplay post={validQuery} />
    </main>
  )

}