import { ResponseType } from "@/pages/api/murrayism";
import { ChatCompletionRequestMessage } from "openai";

export async function fetchRandomQuote<fetchRandomQuoteProps>(
  conversation: ChatCompletionRequestMessage[]
): Promise<ResponseType> {
  const response = await fetch("/api/murrayism", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      conversation,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch random quote.");
  }

  return await response.json();
}
