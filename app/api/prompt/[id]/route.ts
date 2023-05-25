import { connectDB } from "@/utils/database";
import Prompt from "../../../../models/Prompt";

interface CustomParams {
  id: string;
}

export const GET = async (req: any, { params }: { params: CustomParams }) => {
  try {
    await connectDB();

    //  This is will popluate the user as well along with the post.
    const prompts = await Prompt.findById(params.id).populate("creator");

    return new Response(JSON.stringify(prompts), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error: any) {
    return new Response(error, { status: 500 });
  }
};

export const PATCH = async (req: any, { params }: { params: CustomParams }) => {
  try {
    await connectDB();

    const { prompt, tag } = await req.json();

    console.log(prompt, tag);
    console.log(params.id);

    const dbPrompt = await Prompt.findById(params.id).populate("creator");

    if (!dbPrompt) {
      return new Response("Prompt not found", {
        headers: { "Content-Type": "application/json" },
        status: 404,
      });
    }

    dbPrompt.prompt = prompt;
    dbPrompt.tag = tag;

    await dbPrompt.save();

    return new Response(JSON.stringify(dbPrompt), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (err: any) {
    console.log(err);
    return new Response(err, { status: 500 });
  }
};

export const DELETE = async (
  req: any,
  { params }: { params: CustomParams }
) => {
  try {
    await connectDB();

    await Prompt.findByIdAndRemove(params.id).populate("creator");

    return new Response("Prompt deleted", {
      status: 200,
    });
  } catch (err: any) {
    return new Response(err, { status: 500 });
  }
};
