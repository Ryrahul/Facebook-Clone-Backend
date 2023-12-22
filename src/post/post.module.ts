import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { MinioModule } from 'src/minio/minio.module';
import { PostController } from './post.controller';

@Module({
  imports: [MinioModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
