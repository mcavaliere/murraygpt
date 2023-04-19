import { Configuration, OpenAIApi } from "openai";

export class OpenAI {
  private configuration: Configuration;
  private openai: OpenAIApi;

  constructor() {
    if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
      throw new Error("NEXT_PUBLIC_OPENAI_API_KEY is not defined");
    }

    this.configuration = new Configuration({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    });

    this.openai = new OpenAIApi(this.configuration);
  }

  async prompt() {
    const response = await this.openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content:
            "Give me a random Bill Murray quote without citation. Stripe the quotation marks out. ",
        },
      ],
      temperature: 0.8,
    });

    return response;
  }
}
