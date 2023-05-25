import Link from "next/link";
import { FC, FormEvent } from "react";
import PostType from "@/types/PostType";

interface FormProps {
  title: string;
  post: PostType;
  setPost: (post: PostType) => void;
  submitting: boolean;
  onSubmit: (e: FormEvent) => void;
}

const Form: FC<FormProps> = ({
  title,
  post,
  setPost,
  submitting,
  onSubmit,
}) => {
  return (
    <section className="w-full max-w-ful flex-start flex-col">
      <h1 className="head_text text-left">{title} Prompt</h1>
      <p className="desc tex-left max-w-md">
        {title} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform.
      </p>
      <form
        onSubmit={(e: FormEvent) => onSubmit(e)}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 galssmorphism"
      >
        <label>
          <span className="font-santoshi font-semibold text-base text-gray-700">
            Your AI Prompt
          </span>
          <textarea
            name="prompt"
            id="prompt"
            className="w-full h-40 p-3 rounded-lg outline-none"
            placeholder="Write your prompt here..."
            value={post.prompt}
            required
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
          ></textarea>
        </label>
        <label>
          <span className="font-santoshi font-semibold text-base text-gray-700">
            Tag {` `}
            <span className="font-normal">
              {" "}
              (#product, #webdevelopment, #idea)
            </span>
          </span>
          <input
            placeholder="#"
            className="form_input"
            value={post.tag}
            required
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
          />
        </label>
        {/* button div */}
        <div className="flex-end mx-3 mb-4 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>
          <button
            type="submit"
            className="px-5 py-1.5 text-sm bg-orange-600 rounded-full text-white"
          >
            {submitting ? "Submitting" : " Submit"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
