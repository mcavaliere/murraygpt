import { ResponseType } from "@/pages/api/murrayism";

export async function fetchRandomQuote(): Promise<ResponseType> {
  const response = await fetch("/api/murrayism", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch random quote.");
  }

  return await response.json();
}
