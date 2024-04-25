import { Injectable } from '@nestjs/common';
import OpenAI, { ClientOptions } from 'openai';

@Injectable()
export class OpenAiService {
  private openai: OpenAI;
  apiKey = process.env.OPENAI_API_KEY;

  constructor() {
    this.openai = new OpenAI({ apiKey: this.apiKey } as ClientOptions);
  }

  async askQuestion(question: string): Promise<string> {
    const completion = await this.openai.completions.create({
      model: 'gpt-3.5-turbo-instruct',
      prompt: question,
      max_tokens: 100
    });

    return completion.choices[0].text.trim();
  }
  //   async askQuestion(question: string): Promise<string> {
  //     const generatedStory = await createPrompt(question);

  //     return generatedStory;
  //   }
}
