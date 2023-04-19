import type { NextApiRequest, NextApiResponse } from "next";
import { OpenAI } from "@/lib/OpenAI";

const openAI = new OpenAI();

export type ResponseType = {
  quote: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method !== "POST") {
    return res.status(400).end();
  }

  const response = await openAI.prompt();

  return res.status(200).json({
    quote: response.data.choices[0].message?.content || "",
  });
}
