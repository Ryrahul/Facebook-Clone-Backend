import { Injectable } from '@nestjs/common';
import { SignUpDto } from 'src/auth/dto/Signup-dto';
import { PrismaService } from 'src/prisma/prisma.service';
export interface user {
  id: number;
  email: string;
  name: string;
  password: string;
  isVerified: boolean;
}

@Injectable()
export class UserService {
  constructor(private readonly prismaservice: PrismaService) {}
  async createUser({ name, email, password }: SignUpDto): Promise<user> {
    const newUser = await this.prismaservice.user.create({
      data: { name, email, password },
    });
    return newUser;
  }
  async getUserByEmail(email: string): Promise<user> {
    const user = await this.prismaservice.user.findFirst({
      where: { email },
    });
    return user;
  }
  async verifyUser(id: number): Promise<user> {
    return await this.prismaservice.user.update({
      where: {
        id,
      },
      data: {
        isVerified: true,
      },
    });
  }
  async updatePassowrd(email: string, newpassword: string): Promise<user> {
    return await this.prismaservice.user.update({
      where: { email },
      data: {
        password: newpassword,
      },
    });
  }
}
