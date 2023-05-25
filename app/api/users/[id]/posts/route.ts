import Prompt from "@/models/Prompt";
import User from "@/models/User";
import { connectDB } from "@/utils/database";
import { NextApiRequest, NextApiResponse } from "next";

export const GET = async (
  req: NextApiRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  try {
    await connectDB();

    // const user = await User.findById(id);
    // console.log("User with ID: ", id, user);
    const prompts = await Prompt.find({ creator: id }).populate("creator");

    return new Response(JSON.stringify(prompts), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err: any) {
    return new Response(JSON.stringify(err), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
