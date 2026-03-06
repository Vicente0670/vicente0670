"use client";

import page from "@/app/(lander)/forum/page.module.css";
import component from "./component.module.css";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

export default function  UniversalForumDisplay({ data, limit, genre }: { data: any, limit: number, genre: string }) {

  const [isLoading, loading] = useState(false);
  const [posts, setPosts] = useState<any[]>(data);
  const [offset, setOffset] = useState<number>(limit);

  if (genre == "all")
    genre = "%";

  async function getPosts() {

    loading(true);

    const loadStart = Date.now();

    try {
      const response = await fetch(`/api/forum/range?limit=${limit}&offset=${offset}&genre=${genre}`);
      const data = await response.json();
      setPosts(current => current.concat(data));
      setOffset(current => current + limit);
    }
    catch (e) {
      console.error("Failed to fetch posts... | " + e);
    }

    loading(false);

    const loadEnd = Date.now();
    const fetchMsg = "Fetch time: ";
    const minimumTimeThreshold = 10; // ms
    const timeElapsed = loadStart - loadEnd;

    if (timeElapsed > minimumTimeThreshold)
      console.warn(
        fetchMsg + timeElapsed + "\n" +
        "This took longer than " + minimumTimeThreshold + "ms!\n"
      );
    else
      console.info(fetchMsg + timeElapsed);

  }
  
  return (
    <>
      {posts.map((post: any) => (

        <div
          key={post.id}
          className={page.post}
        >
          <h2 className={page.title}>{post.title}</h2>
          <p className={page.content}>{post.content}</p>
          <p className={page.author}>
            By {post.name} "{post.email}" on {new Date(post.created_at).toLocaleString()}
          </p>
          <Link href={`/forum//${post.crypto_uuid}`}>View Post</Link>
        </div>

      ))}
      <button
        type="button"
        onClick={getPosts}
      >
        {isLoading ? "Please wait..." : "Click to load"}
      </button>
    </>
  )

}