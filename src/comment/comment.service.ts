import { Injectable } from '@nestjs/common';
import { NewCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(private readonly prismaservice: PrismaService) {}
  async create(createCommentDto: NewCommentDto, id: number, user_id: number) {
    try {
      const comment = await this.prismaservice.comment.create({
        data: {
          content: createCommentDto.content,
          user_id,
          post_id: id,
        },
      });

      return comment;
    } catch (e) {
      return e.meta.cause;
    }
  }

  async findOne(id: number): Promise<object> {
    const comments = await this.prismaservice.comment.findMany({
      where: {
        post_id: id,
      },
      select: {
        content: true,
        author: {
          select: {
            name: true,
            profile_picture: true,
          },
        },
      },
    });
    return comments ?? [];
  }

  async findAll(id: number): Promise<object> {
    try {
      return await this.prismaservice.comment.findMany({
        where: {
          user_id: id,
        },
        select: {
          content: true,
          post_id: true,
        },
      });
    } catch (e) {
      return e.meta.cause;
    }
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  async remove(id: number, user_id: number) {
    try {
      await this.prismaservice.comment.delete({
        where: {
          id: id,
          user_id: user_id,
        },
      });
      return {
        message: 'Comment deleted Succesfully',
      };
    } catch (e) {
      return e.meta.cause;
    }
  }
}
