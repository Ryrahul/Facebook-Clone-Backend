import { Injectable } from '@nestjs/common';
import { SignUpDto } from 'src/auth/dto/Signup-dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { editProfileDto } from './dto/editProfile.dto';
import { editNameDto } from './dto/editname.dto';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { MinioService } from 'src/minio/minio.service';

export interface user {
  id: number;
  email: string;
  name: string;
  password: string;
  isVerified: boolean;
}

@Injectable()
export class UserService {
  constructor(private readonly prismaservice: PrismaService,
    private minioserice:MinioService) {}
  async createUser({ name, email, password }: SignUpDto): Promise<user> {
    const newUser = await this.prismaservice.user.create({
      data: {
        name,
        email,
        password,
        Profile_Preference: {
          create: {},
        },
      },
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
  async getUserByName(name: string) {
    return await this.prismaservice.user.findMany({
      where: {
        name: name,
      },
    });
  }
  async updateName(id: number, editName: editNameDto) {
    const checkpassword = await this.prismaservice.user.findUnique({
      where: {
        id,
      },
    });
    if (await bcrypt.compare(editName.password, checkpassword.password)) {
      return await this.prismaservice.user.update({
        where: {
          id,
        },
        data: {
          name: editName.name,
        },
      });
    } else {
      return {
        message: 'Wrong Password',
      };
    }
  }
  async updatePassowrd(email: string, newpassword: string): Promise<user> {
    return await this.prismaservice.user.update({
      where: { email },
      data: {
        password: newpassword,
      },
    });
  }
  async updateProfile(id: number, editprofileDto: editProfileDto) {
    try {
      type AccountType = 'Public' | 'Private';
      type genderType = 'Male' | 'Female' | 'Prefer_Not_To_Say';
      const { avatar, bio, accountType, gender, location, birthdate } =
        editprofileDto;

      await this.prismaservice.userProfile.update({
        where: {
          userId: id,
        },
        data: {
          ...editprofileDto,
          gender: gender as genderType,
          accountType: accountType as AccountType,
        },
      });
      return {
        message: 'Updated Successfully',
      };
    } catch (e) {
      return e;
    }
  }
  async getCurrentUser(id:number){
    return await this.prismaservice.user.findUnique({
      where:{
        id
      }
    })

  }
  async ChangeProfilePicture(image:Express.Multer.File,id:number){
    const img_key=randomUUID()
    const img_url=await this.minioserice.getUrl(img_key)
    await this.minioserice.uploadImage(image.buffer,img_key)
    await this.prismaservice.user.update({
      where:{
        id
      },
      data:{
        profile_picture:img_url
      }
    })  
  }
}
