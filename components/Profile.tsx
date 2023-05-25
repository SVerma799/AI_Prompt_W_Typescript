"use client";
import PostType from "@/types/PostType";
import { FC } from "react";
import PromptCard from "./PromptCard";

interface ProfileProps {
  name: string;
  desc: string;
  posts: [PostType] | [];
  handleEditClick: (id: any) => void;
  handleDeleteClick: (id: any) => void;
}

const Profile: FC<ProfileProps> = ({
  name,
  desc,
  posts,
  handleEditClick,
  handleDeleteClick,
}) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span>{name}</span> profile{" "}
      </h1>
      <p className="desc text-left">{desc}</p>
      <div className="mt-10 prompt_layout">
        {posts.map((post, idx) => (
          <PromptCard
            key={idx}
            post={post}
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDeleteClick}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
