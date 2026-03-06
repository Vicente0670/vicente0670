"use client";

import Link from "next/link";
import page from "./page.module.css";
import { useState, useEffect } from "react";

export default function Forum() {

  const [isEnabled, enabled] = useState(false);
  const [isLoading, loading] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const limit = 2;

  async function getPosts() {

    loading(true);

    try {
      const response = await fetch(`/api/forum?limit=${limit}&offset=${offset}`);
      const data = await response.json();
      setPosts(current => current.concat(data));
      setOffset(current => current + limit);
    }
    catch (e) {
      console.error("Failed to fetch posts... | " + e);
    }
    
    loading(false);

  }

  useEffect(() => {
    
    if (!isEnabled) {
      
      getPosts();
      
      enabled(true);
      
    }

  }, [isEnabled, enabled, getPosts]);


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
        {posts.map((post) => (
          
          <div
            key={post.id}
            className={page.post}
          >
            <h2 className={page.title}>{post.title}</h2>
            <p className={page.content}>{post.content}</p>
            <p className={page.author}>
              By {post.name} "{post.email}" on {new Date(post.created_at).toLocaleString()}
            </p>
            <Link href={`/forum/${post.id}`}>View Post</Link>
          </div>

        ))}
        <button
          type="button"
          onClick={getPosts}
        >
          {isLoading ? "Please wait..." : "Click to load"}
        </button>
      </div>
    </main>

  )

}