import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Req,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatPostDto, PostSchema } from './dto/Uploadpost.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ZodValidationPipe } from 'src/common/zod.pipe';
import { UpdatePostDto, UpdatePostSchema } from './dto/UpdatepostDto';

@Controller('post')
export class PostController {
  constructor(private readonly postservice: PostService) {}
  @Post()
  @UsePipes(new ZodValidationPipe(PostSchema))
  @UseInterceptors(FilesInterceptor('images', 10))
  async uplaod(
    @Body() createPost: CreatPostDto,
    @Req() req,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    const id = req.user.id;
    return await this.postservice.CreatePost(images, createPost, id);
  }
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number, @Req() req) {
    return await this.postservice.deletePost(id, req.user.id);
  }
  @Get()
  async getAll(@Req() req) {
    return await this.postservice.findAllpost(req.user.id);
  }
  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return this.postservice.findOnePost(id);
  }
  @Put(':id')
  @UsePipes(new ZodValidationPipe(UpdatePostSchema))
  async updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Req() req,
    @Body() updatePost: UpdatePostDto,
  ) {
    return this.postservice.updatePost(id, req.user.id, updatePost);
  }
  @Post(':id/like')
  async like(@Param('id', ParseIntPipe) id: number, @Req() req) {
    return await this.postservice.like(id, req.user.id);
  }
  @Post(':id/removelike')
  async removeLike(@Param('id', ParseIntPipe) id: number, @Req() req) {
    return await this.postservice.removeLike(id, req.user.id);
  }
}
