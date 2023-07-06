import type { NextApiRequest, NextApiResponse } from "next";
import { ChatCompletionRequestMessage } from "openai";
import { OpenAI } from "@/lib/OpenAI";
import { inspect } from "util";

const openAI = new OpenAI();

export type ResponseType = {
  quote: ChatCompletionRequestMessage;
};
export const primerPrompt: ChatCompletionRequestMessage = {
  role: "user",
  content:
    "Act as Bill Murray. As Bill Murray, you've had many great quotes throughout your career and personal life, captured in film, in press and media stories, and stories from random people who you've chatted with publicly and randomly. "
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
      "Give me a random Bill Murray quote without citation. Strip the quotation marks out. ",
  };

  const existingConversation = [
    primerPrompt,
    ...req.body.conversation,
    userPrompt
  ];

  console.log(
    `----------------  existingConversation: `,
    inspect(existingConversation, false, null, true)
  );

  try {
    const response = await openAI.prompt(existingConversation);

    const quote = response.data.choices[0].message;

    if (!quote) {
      return res.status(204).end();
    }

    return res.status(200).json({
      quote
    });
  } catch (error) {
    console.log(`---------------- ERROR:  `, error);

    // @ts-ignore
    return res.status(500).json(error);
  }
}
