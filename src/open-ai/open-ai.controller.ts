import { Body, Controller, Post } from '@nestjs/common';
import { OpenAiService } from './open-ai.service';

@Controller('openai')
export class OpenAiController {
  constructor(private readonly openAIService: OpenAiService) {}

  @Post()
  async askQuestion(@Body('question') question: string) {
    return this.openAIService.askQuestion(question);
  }
}
