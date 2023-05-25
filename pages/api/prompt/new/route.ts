import { connectDB } from "@/utils/database";
import Prompt from "@/models/Prompt";

export const POST = async (req: any) => {
  const { userId, prompt, tag } = await req.json();

  console.log(userId, prompt, tag);
  try {
    await connectDB();
    const newPrompt = await Prompt.create({
      userId,
      prompt,
      tag,
    });

    newPrompt.save();
    return new Response(JSON.stringify(newPrompt), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.log(error);
  }
};
