import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { user } from 'src/user/user.service';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configservice: ConfigService,
  ) {}
  async sendVerificationEmail(
    email: string,
    token: number,
  ): Promise<{ message: string }> {
    const serverUrl = this.configservice.get('SERVER_URL');
    const url = `${serverUrl}/auth/confirm?token=${token}`;
    await this.mailerService.sendMail({
      to: email,
      subject: 'Email Verification',
      html: `
    <h2>Email Verification</h2>
    <p>Thank you for signing up! To complete your registration, please click the link below to verify your email address:</p>
    <p><a href="${url}">Verify Email</a></p>
    <p>If you did not sign up for our service, you can ignore this email.</p>
    <p>Regards,<br>Your App Team</p>
  `,
    });
    return { message: 'Email sent successfully' };
  }
  async sendForgotPasswordInstruction(token: number, fbuser: user) {
    const serverUrl = this.configservice.get('SERVER_URL');
    const url = `${serverUrl}/forgotpass?token=${token}`;
    await this.mailerService.sendMail({
      to: fbuser.email,
      subject: 'Email Verification',
      html: `
    <h2>Forgot Password</h2>
    <p>We have received a request to change your password for ${fbuser.name} </p>
    <p><a href="${url}">Click this to reset your password</a></p>
    <p>If you did not sign up for our service, you can ignore this email.</p>
    <p>Regards,<br>Your App Team</p>
  `,
    });
  }
}
