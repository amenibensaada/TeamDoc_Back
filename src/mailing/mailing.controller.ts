import { MailingService } from './mailing.service';
import { Controller, Get, Post, Body } from '@nestjs/common';


@Controller('mailing')
export class MailingController {
  constructor(private readonly emailService: MailingService) {}

  @Get()
  async sendTestEmail(): Promise<string> {
    const recipient_email = 'oumaima.ayari@esprit.tn';
    const subject = 'Test Email';
    const message = 'This is a test email.';

    return this.emailService.sendEmail(recipient_email, subject, message);
  }

  @Post('send_email')
  async sendEmail(@Body() body): Promise<string> {
    const { recipient_email, subject, message } = body;
    return this.emailService.sendEmail(recipient_email, subject, message);
  }
}
