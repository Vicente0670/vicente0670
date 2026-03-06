"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { redirect } from "next/navigation";
import { forumGenres } from "@/constants";

/**
 * Selects a genre based on the available constants from `constants.ts`.
 * @param path 
 * @returns string
 */
function checkGenre(path: string): string {

  const values = forumGenres;
  
  for (const value in values)
    if (path == value)
      return value

  return "offtopic";

}

export default function NewPost() {

  const titleInput = useRef<HTMLInputElement | null>(null);
  const contentInput = useRef<HTMLTextAreaElement | null>(null);

  async function setPost(e: React.FormEvent) {

    e.preventDefault();

    const title = titleInput.current!.value;
    const content = contentInput.current!.value;
    const genrePathname = window.location.pathname.split("/")[1];
    const genre = checkGenre(genrePathname);

    // URL for the forum should look like this:
    // https://vicente0670.com/forum/
    // or
    // http://localhost:<port>/forum/

    const response = await fetch("/api/forum/range", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title, content, genre }),
    });

    if (response.ok)
      redirect("/forum");
    else
      alert("somehow, it didnt wokr");

  }

  return (
    <>
      <h1>Create a new post</h1>
      <form onSubmit={setPost}>
        <input
          name="title"
          type="text"
          title="Your bold statement."
          placeholder="Title"
          ref={titleInput}
          required
        />
        <textarea
          name="content"
          id="contentTextBox"
          placeholder="Enter your thoughts... (will be dynamic soon)"
          ref={contentInput}
          required
          rows={6}
        />
        <select>
          <option>a</option>
          <option>b</option>
          <option>c</option>
          <option>d</option>
        </select>
        <button type="submit">
          <p>Submit everything!</p>
        </button>
      </form>
    </>
  )

}