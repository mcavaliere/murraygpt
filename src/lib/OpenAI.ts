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
    console.log(`---------------- OpenAI.prompt -> messages `, messages);
    const response = await this.openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages,
      temperature: 0.8,
    });

    return response;
  }
}
