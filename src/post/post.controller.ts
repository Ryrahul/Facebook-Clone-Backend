import {
  Body,
  Controller,
  Post,
  Req,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatPostDto, PostSchema } from './dto/Uploadpost.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ZodValidationPipe } from 'src/common/zod.pipe';

@Controller('post')
export class PostController {
  constructor(private readonly postservice: PostService) {}
  @Post('/upload')
  // @UsePipes(new ZodValidationPipe(PostSchema))
  @UseInterceptors(FilesInterceptor('images', 10))
  async uplaod(
    @Body() createPost: CreatPostDto,
    @Req() req,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    const id = req.user.id;

    return await this.postservice.CreatePost(images, createPost, id);
  }
}
