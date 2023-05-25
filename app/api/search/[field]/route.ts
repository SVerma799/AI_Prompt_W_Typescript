import users from "@/models/User";
import Prompt from "@/models/Prompt";
import { connectDB } from "@/utils/database";
import PostType from "@/types/PostType";
import { NextApiRequest, NextApiResponse } from "next";

interface SearchParams {
  field: string;
}

export const GET = async (
  req: NextApiRequest,
  { params }: { params: SearchParams }
) => {
  try {
    await connectDB();
    // const allusers = await users.find({});
    const { field } = params;
    console.log("Params", field);
    let prompts = [{}] as PostType[];
    if (params && field && field !== "") {
      prompts = await Prompt.find({
        $or: [{ tag: { $regex: field, $options: "i" } }],
      }).populate("creator");

      if (prompts.length === 0) {
        prompts = await Prompt.find({
          creator: {
            $in: await users
              .find({
                username: { $regex: field, $options: "i" },
              })
              .distinct("_id"),
          },
        }).populate("creator");
      }
    } else {
      prompts = await Prompt.find({}).populate("creator");
    }
    if (prompts.length === 0) {
      return new Response(JSON.stringify({ prompts: "No prompts found" }), {
        status: 404,
      });
    }
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
