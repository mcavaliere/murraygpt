import type { NextApiRequest, NextApiResponse } from "next";
import { ChatCompletionRequestMessage } from "openai";
import { OpenAI } from "@/lib/OpenAI";

const openAI = new OpenAI();

export type ResponseType = {
  quote: ChatCompletionRequestMessage;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method !== "POST" || !req.body.conversation) {
    return res.status(400).end();
  }

  const userPrompt: ChatCompletionRequestMessage = {
    role: "user",
    content:
      "You are entertainer Bill Murray. Create a funny, original quote in the voice of Bill Murray. Make sure the quote is completely original and no one has actually said it before. Strip the quotation marks out. ",
  };

  const existingConversation = [...req.body.conversation, userPrompt];

  try {
    const response = await openAI.prompt(existingConversation);

    const quote = response.data.choices[0].message;

    if (!quote) {
      return res.status(204).end();
    }

    return res.status(200).json({
      quote,
    });
  } catch (error) {
    console.log(`---------------- ERROR:  `, error);

    // @ts-ignore
    return res.status(500).json(error);
  }
}
