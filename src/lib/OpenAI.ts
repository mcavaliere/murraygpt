import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";

export class OpenAI {
  private configuration: Configuration;
  private openai: OpenAIApi;

  constructor() {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is not defined");
    }

    this.configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    this.openai = new OpenAIApi(this.configuration);
  }

  async prompt(messages: ChatCompletionRequestMessage[]) {
    const response = await this.openai.createChatCompletion({
      model: "gpt-4o",
      messages,
      temperature: 0.9,
    });

    return response;
  }
}
