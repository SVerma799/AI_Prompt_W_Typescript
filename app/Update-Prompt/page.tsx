"use client";

import Form from "@/components/Form";
import PostType from "@/types/PostType";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { FC, FormEvent, useEffect, useState } from "react";

interface UpdatePromptProps {}

const UpdatePrompt: FC<UpdatePromptProps> = ({}) => {
  const router = useRouter();
  const queryParams = useSearchParams();
  const promptId = queryParams?.get("id");
  const [post, setPost] = useState<PostType>({
    prompt: "",
    tag: "",
  } as PostType);
  const [submitting, setSubmitting] = useState<boolean>(false);

  useEffect(() => {
    const getPrompts = async () => {
      const prompts = await fetch(`/api/prompt/${promptId}`, {
        method: "GET",
      });
      const data = await prompts.json();
      setPost(data);
    };
    getPrompts();
  }, [promptId]);

  const handleSubmitClick = (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    console.log(JSON.stringify(post));

    const updatePrompt = async () => {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });
      if (response.status == 200 || response.status == 201) {
        setSubmitting(false);
        router.push("/");
      }
    };

    updatePrompt();
  };

  return (
    <div>
      <Form
        title="Update"
        post={post}
        setPost={setPost}
        submitting={submitting}
        onSubmit={handleSubmitClick}
      />
    </div>
  );
};

export default UpdatePrompt;
