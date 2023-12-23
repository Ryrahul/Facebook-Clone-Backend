import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatPostDto } from './dto/Uploadpost.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { MinioService } from 'src/minio/minio.service';
import { randomUUID as uuid } from 'crypto';
import { UpdatePostDto } from './dto/UpdatepostDto';

@Injectable()
export class PostService {
  constructor(
    private readonly PrismaService: PrismaService,
    private readonly minioservice: MinioService,
  ) {}
  async CreatePost(
    images: Express.Multer.File[],
    createpost: CreatPostDto,
    id: number,
  ): Promise<object> {
    try {
      const imageKeys: string[] = [];
      const imageUrls: string[] = [];
      for (const image of images) {
        const imgkey = uuid();
        imageKeys.push(imgkey);
        imageUrls.push(this.minioservice.getUrl(imgkey));

        this.minioservice.uploadImage(image.buffer, imgkey);
      }
      const newPost = await this.PrismaService.post.create({
        data: {
          content: createpost.content,

          image_keys: imageKeys,
          image_url: imageUrls,
          user_id: id,
        },
      });
      return newPost;
    } catch (e) {
      return e.message;
    }
  }
  async deletePost(id: number, user_id: number): Promise<object> {
    try {
      const post = await this.PrismaService.post.delete({
        where: {
          id: id,
          user_id,
        },
      });
      for (const image of post.image_keys)
        await this.minioservice.deleteImage(image);

      return post;
    } catch (e) {
      return e.meta.cause;
    }
  }
  async findAllpost(id: number): Promise<object> {
    try {
      const AllPost = await this.PrismaService.post.findMany({
        where: {
          user_id: id,
        },
      });
      if (!AllPost.length) {
        throw new NotFoundException('No post exists for the user');
      }
      return AllPost;
    } catch (e) {
      return e.meta.cause;
    }
  }
  async findOnePost(id: number) {
    try {
      const post = await this.PrismaService.post.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          content: true,
          image_keys: true,
          image_url: true,
          created_at: true,
          author: {
            select: {
              id: true,
              name: true,
            },
          },
          _count: {
            select: {
              Comment: true,
              likes: true,
            },
          },
        },
      });
      return post;
    } catch (e) {
      return e.meta.cause;
    }
  }
  async updatePost(id: number, user_id: number, updatepost: UpdatePostDto) {
    try {
      return await this.PrismaService.post.update({
        where: {
          id,
          user_id,
        },
        data: {
          ...updatepost,
        },
      });
    } catch (e) {
      return e.meta.cause;
    }
  }
  async like(id:number,user_id:number){
    try{
      await this.PrismaService.post.update({
        where:{
          id,
        },
        data:{
          likes:{
            connect:[{
              id:user_id
            }]
          }
        }
      })
      return {
        message: "Liked Successfully",
        postId:id,
        timestamp:Date.now()
      }
    }
    catch(e){
      return e .meta.cause
    }
 
  }
}
