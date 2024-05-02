import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailingService {
    async sendEmail(recipient_email: string, subject: string, message: string): Promise<string> {
        return new Promise((resolve, reject) => {
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'oumaima.ayari@esprit.tn',
              pass: 'hnem iunp flny xrjl',
            },
          });
    
          const mailConfigs = {
            from: 'oumaima.ayari@esprit.tn',
            to: recipient_email,
            subject: subject,
            text: message,
          };
    
          transporter.sendMail(mailConfigs, function (error, info) {
            if (error) {
              console.log(error);
              reject('An error has occurred');
                } else {
                    resolve('Email sent successfully');
                }
          });
        });
      }
}
