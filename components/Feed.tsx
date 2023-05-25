"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import PostType from "@/types/PostType";
import PromptCard from "./PromptCard";

const PromptCardList = ({ posts }: { posts: [PostType] | [] }) => {
  return (
    <div className="mt-16 prompt_layout">
      {posts.length > 0 &&
        posts.map((post: PostType, idx: number) => (
          <div key={idx}>
            <PromptCard post={post} />
          </div>
        ))}
    </div>
  );
};

const Feed = () => {
  const { data: session } = useSession();
  const [search, setSearch] = useState<string>("");
  const [posts, setPosts] = useState<[PostType] | []>([]);

  useEffect(() => {
    const getPrompts = async () => {
      const response = await fetch("/api/prompt");
      const allPrompts = await response.json();
      setPosts(allPrompts);
      console.log(allPrompts);
    };
    getPrompts();
  }, []);

  return (
    <>
      <section className="feed">
        <form className="relative w-full flex-center">
          <input
            type="text"
            placeholder="Search for a tag or username"
            className="search_input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            required
          />
        </form>
      </section>

      <PromptCardList posts={posts}></PromptCardList>
    </>
  );
};

export default Feed;
