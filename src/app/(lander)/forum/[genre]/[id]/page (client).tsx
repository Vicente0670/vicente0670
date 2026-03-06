"use client";

import post from "./page.module.css";
import { use, useState, useEffect } from "react";

export default function ForumPost({ params }: { params: Promise<{ id: string }> }) {
  
  const [isEnabled, enabled] = useState(false);
  const [isLoading, loading] = useState(true);
  const [data, setData] = useState<any>([]);
  const { id } = use(params);

  async function getIndividualPost() {

    const response = await fetch(`/api/forum?limit=1&offset=${Number(id) - 1}&order=ascending`);
    const query = await response.json();
    const validQuery = query[0];
    console.log(validQuery);
    setData(validQuery);
    loading(false);
    
  }

  useEffect(() => {
    
    if (!isEnabled) {

      getIndividualPost();

      enabled(true);

    }

  }, [isEnabled, enabled, getIndividualPost]);


  return (
    <main className={post.root}>
      
    </main>
  )

}