import users from "@/models/User";
import Prompt from "@/models/Prompt";
import { connectDB } from "@/utils/database";

export const GET = async (req: any, res: any) => {
  try {
    await connectDB();

    const allusers = await users.find({});
    const prompts = await Prompt.find({}).populate("creator");

    return new Response(JSON.stringify(prompts), {
      status: 200,
    });
  } catch (err: any) {
    console.log(err);
    return new Response(err, {
      status: 500,
    });
  }
};
