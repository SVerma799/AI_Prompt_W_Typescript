"use client";

import Profile from "@/components/Profile";
import PostType from "@/types/PostType";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";

interface MyProfileProps {}

const MyProfile: FC<MyProfileProps> = ({}) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState<[PostType] | []>([]);
  const handleEditClick = (post: PostType) => {
    router.push(`/Update-Prompt?id=${post._id}`);
  };

  const handleDeleteClick = (post: PostType) => {
    const deletePrompt = async () => {
      const response = await fetch(`/api/prompt/${post._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status == 200 || response.status == 201) {
        router.push("/");
      }
    };

    deletePrompt();
  };

  useEffect(() => {
    if (!session) {
      window.location.href = "/";
    }

    const getPrompts = async () => {
      const response = await fetch(`/api/users/${session?.user?.id}/posts`);
      const allPrompts = await response.json();
      setPosts(allPrompts);
    };
    getPrompts();
  }, [session]);
  return (
    <div>
      <Profile
        name="My"
        desc="Welcome to your personalized profile page"
        posts={posts}
        handleEditClick={handleEditClick}
        handleDeleteClick={handleDeleteClick}
      />
    </div>
  );
};

export default MyProfile;
