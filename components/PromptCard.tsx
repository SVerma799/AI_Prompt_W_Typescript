"use client";

import React, { FC, useState } from "react";
import PostType from "@/types/PostType";
import Image from "next/image";

interface PromptCardProps {
  post: PostType;
  handleTagClick?: (tag: string) => void;
  handleEditClick?: (id: string) => void;
  handleDeleteClick?: (id: string) => void;
}

const PromptCard: FC<PromptCardProps> = ({
  post,
  handleTagClick,
  handleEditClick,
  handleDeleteClick,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={post.creator.image}
            alt="User Image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3 className="text-gray-900">{post.creator.username}</h3>
            <p className="text-gray-500">{post.creator.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptCard;
