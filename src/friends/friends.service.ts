import { Injectable, NotFoundException, Redirect } from '@nestjs/common';
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
    ``;
  }

  async acceptRequest(id: number, user_id: number) {
    try {
      const friendRequest = await this.prismaservice.friendRequest.findFirst({
        where: {
          id,
          receiverId: user_id,
        },
      });
      if (!friendRequest) {
        throw new NotFoundException('No such Request');
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
      return e.response;
    }
  }

  async findAllRequests(id: number) {
    return await this.prismaservice.user.findUnique({
      where: {
        id,
      },
      select: {
        ReceivedRequest: true,
      },
    });
  }

  async deleteRequest(id: number, user_id: number) {
    const deletedRequest = await this.prismaservice.friendRequest.delete({
      where: {
        id,
        receiverId: user_id,
      },
    });
    const sentBy = await this.prismaservice.user.findUnique({
      where: {
        id: deletedRequest.senderId,
      },
      select: {
        name: true,
      },
    });

    if (!deletedRequest) {
      throw new NotFoundException('No Such friend request exists');
    }
    return {
      message: `Friend request deleted Successfully from ${sentBy}`,
    };
  }
  remove(id: number) {
    return `This action removes a #${id} friend`;
  }
}
