"use client";

import React, { useState, FormEvent } from "react";
import Form from "@/components/Form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import PostType from "@/types/PostType";

const CreatePrompt = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [post, setPost] = useState<PostType>({
    prompt: "",
    tag: "",
  } as PostType);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const CreatePrompt = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    console.log(
      JSON.stringify({
        prompt: post.prompt,
        userId: session?.user?.id,
        tag: post.tag,
      })
    );

    try {
      const res = await fetch("/api/prompt/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user?.id,
          tag: post.tag,
        }),
      });

      console.log(res);

      if (res.status === 201) {
        router.push("/");
      }

      setSubmitting(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form
      title="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      onSubmit={CreatePrompt}
    ></Form>
  );
};

export default CreatePrompt;
