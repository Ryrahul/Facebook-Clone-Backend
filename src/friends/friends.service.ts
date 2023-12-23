import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FriendsService {
  constructor(private readonly prismaservice: PrismaService) {}
  async create(receiver_id: number, sender_id: number) {
    const receivingUser = await this.prismaservice.user.findFirst({
      where: {
        id: receiver_id,
      },
    });
    if (!receivingUser) {
      throw new NotFoundException('User Does not exists');
    }
    const request = await this.prismaservice.friendRequest.create({
      data: {
        senderId: sender_id,
        receiverId: receiver_id,
        status: 'Pending',
      },
    });
    return request;
  }

  async acceptRequest(id: number) {
    try {
      const friendRequest = await this.prismaservice.friendRequest.findFirst({
        where: {
          id,
        },
      });
      if (!friendRequest) {
        throw new NotFoundException('No Such Request');
      }
      const updatedRequest = await this.prismaservice.friendRequest.update({
        where: {
          id,
        },
        data: {
          status: 'Approved',
        },
      });
      await this.prismaservice.user.update({
        where: {
          id: friendRequest.senderId,
        },
        data: {
          friends: {
            connect: [
              {
                id: friendRequest.receiverId,
              },
            ],
          },
        },
      });
      return updatedRequest;
    } catch (e) {
      return e.meta.cause;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} friend`;
  }

  update(id: number) {
    return `This action updates a #${id} friend`;
  }

  remove(id: number) {
    return `This action removes a #${id} friend`;
  }
}
