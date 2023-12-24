import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FeedService {
  constructor(private readonly prismaService: PrismaService) {}
  async getFeed(id: number) {
    try{
    const posts = await this.prismaService.user.findUnique({
      where: {
        id,
      },
      select: {
        friends: {
          select: {
            CreatedPost: true,
          },
          orderBy: {
            created_at: 'asc',
          },
        },
      },
    });
    return posts
}
catch(e){
    return e.message
}
  }
}
