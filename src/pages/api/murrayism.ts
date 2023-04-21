import type { NextApiRequest, NextApiResponse } from "next";
import { ChatCompletionRequestMessage } from "openai";
import { OpenAI } from "@/lib/OpenAI";
import { inspect } from "util";

const openAI = new OpenAI();

export type ResponseType = {
  messages: ChatCompletionRequestMessage[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method !== "POST") {
    return res.status(400).end();
  }

  const userPrompt: ChatCompletionRequestMessage = {
    role: "user",
    content:
      "Give me a random Bill Murray quote without citation. Stripe the quotation marks out. ",
  };

  const response = await openAI.prompt([userPrompt]);
  const messages = [userPrompt, response.data.choices[0].message];

  console.log(
    `---------------- response.data:  `,
    inspect(response.data, { depth: 5 })
  );

  return res.status(200).json({
    messages,
  });
}
