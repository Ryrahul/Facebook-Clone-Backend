import { Injectable } from '@nestjs/common';
import { CreatPostDto } from './dto/Uploadpost.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { MinioService } from 'src/minio/minio.service';
import { randomUUID as uuid } from 'crypto';

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
  }
}
