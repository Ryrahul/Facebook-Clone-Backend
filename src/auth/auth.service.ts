import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/Signup-dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login-dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userservice: UserService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  private async Createhash(StringToHash: string): Promise<string> {
    const saltround = 10;
    return await bcrypt.hash(StringToHash, saltround);
  }
  async SignUp({ name, email, password }: SignUpDto): Promise<SignUpDto> {
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
    return newUser;
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
