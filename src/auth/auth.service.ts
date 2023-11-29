import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/Signup-dto';
import { UserService, user } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { LoginDto } from './dto/login-dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userservice: UserService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
    private readonly mailservice: MailService,
  ) {}

  private async Createhash(StringToHash: string): Promise<string> {
    const saltround = 10;
    return await bcrypt.hash(StringToHash, saltround);
  }
  async SignUp({ name, email, password }: SignUpDto): Promise<{
    message: string;
  }> {
    const existngUser = await this.userservice.getUserByEmail(email);
    if (existngUser) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'User already exists',
          code: 'USER_ALREADY_EXISTS',
        },
        HttpStatus.CONFLICT,
      );
    }
    const hashpassword = await this.Createhash(password);
    const newUser = await this.userservice.createUser({
      name,
      email,
      password: hashpassword,
    });
    this.mailservice.sendVerificationEmail(newUser.email, newUser.id);
    return {
      message: 'Verification Mail Sent',
    };
  }
  async login({ email, password }: LoginDto): Promise<{ accessToken: string }> {
    const fbuser = await this.userservice.getUserByEmail(email);
    if (!fbuser) {
      throw new HttpException(
        { message: 'wrong credentials' },
        HttpStatus.CONFLICT,
      );
    }
    const checkpassword = await bcrypt.compare(password, fbuser.password);
    if (!checkpassword) {
      throw new HttpException(
        { message: 'wrong credentials' },
        HttpStatus.CONFLICT,
      );
    }

    return this.SignToken(fbuser.id, fbuser.name);
  }
  async verify(token: number): Promise<user> {
    try {
      const verifiedUser = await this.userservice.verifyUser(token);
      return verifiedUser;
    } catch (e) {
      return e.message;
    }
  }
  async forgotPassword(email: string): Promise<{ message: string }> {
    const fbuser = await this.userservice.getUserByEmail(email);
    if (!fbuser) {
      throw new HttpException(
        { message: 'wrong credentials' },
        HttpStatus.CONFLICT,
      );
    }
    const uniqueString = await this.Createhash(fbuser.name);

    await this.mailservice.sendForgotPasswordInstruction(uniqueString, fbuser);

    return {
      message: 'Password reset link has been sent to you email',
    };
  }
  async ResetPassword(
    email: string,
    token: string,
  ): Promise<{ message: string }> {
    const fbuser = await this.userservice.getUserByEmail(email);
    const match = await bcrypt.compare(fbuser.name, token);
    if (!match) {
      throw new HttpException(
        { message: 'Something Went wrong' },
        HttpStatus.CONFLICT,
      );
    }
    const newpassword = randomBytes(15).toString('hex');
    await this.userservice.updatePassowrd(fbuser.email, newpassword);
    await this.mailservice.NewPassword(newpassword, fbuser);
    return {
      message: 'New Password has been sent to mail',
    };
  }
  private async SignToken(
    id: number,
    name: string,
  ): Promise<{
    accessToken: string;
  }> {
    const payload = {
      id,
      name,
    };
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: this.config.get('JWT_SECRET'),
    });
    return {
      accessToken: token,
    };
  }
}
