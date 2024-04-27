import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Initialiser le transporteur de messagerie
    this.transporter = nodemailer.createTransport({
      host: 'smtp.office365.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'aziz.benguirat@esprit.tn',
        pass: 'Lamis2008',
      },
    });
  }

  async sendEmail(to: string, subject: string, text: string) {
    try {
      await this.transporter.sendMail({
        from: 'aziz.benguirat@esprit.tn', // Utilisez votre adresse Gmail ici
        to,
        subject,
        text,
      });
      console.log('E-mail envoyé avec succès !');
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
      throw new Error('Erreur lors de l\'envoi de l\'e-mail');
    }
  }
}
