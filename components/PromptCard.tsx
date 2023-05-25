"use client";

import React, { FC, useEffect, useState } from "react";
import PostType from "@/types/PostType";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Schema } from "mongoose";

interface PromptCardProps {
  post: PostType;
  handleEditClick?: (id: Schema.Types.ObjectId) => void;
  handleDeleteClick?: (id: Schema.Types.ObjectId) => void;
}

const PromptCard: FC<PromptCardProps> = ({
  post,
  handleEditClick,
  handleDeleteClick,
}) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const [copied, setCopied] = useState<string>("");

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
        <div
          className="copy_btn"
          onClick={() => {
            navigator.clipboard.writeText(post.prompt);
            setCopied(post.prompt);
            setTimeout(() => {
              setCopied("");
            }, 3000);
          }}
        >
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt="Copy Icon"
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className="my-4 text-sm text-grey700">{post.prompt}</p>
      <p
        className="text-sm blue_gradient cursor-pointer"
        // onClick={() => {
        //   handleTagClick && handleTagClick(post.tag);
        // }}
      >
        {post.tag}
      </p>

      {pathName === "/profile" && session?.user?.id == post.creator._id && (
        <div className="mt-5 flex-center gap-4 broder-t border-grey pt-3">
          <p
            className="text-sm green_gradient cursor-pointer"
            onClick={() => {
              handleEditClick(post);
            }}
          >
            Edit
          </p>
          <p
            className="text-sm orange_radient cursor-pointer"
            onClick={() => {
              handleDeleteClick(post);
            }}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
