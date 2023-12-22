import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { NewCommentDto, createCommentSchema } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ZodValidationPipe } from 'src/common/zod.pipe';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post(':id')
  @UsePipes(new ZodValidationPipe(createCommentSchema))
  create(
    @Body() createCommentDto: NewCommentDto,
    @Req() req,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.commentService.create(createCommentDto, id, req.user.id);
  }

  @Get()
  async findAll(@Req() req) {
    return this.commentService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.commentService.findOne(id);
  }

  @Patch(':Commentid')
  update(
    @Param('Commentid') Commentid: string,
    @Body() updateCommentDto: UpdateCommentDto,
    @Req() req,
  ) {
    return this.commentService.update(
      +Commentid,
      updateCommentDto,
      req.user.id,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    return this.commentService.remove(+id, req.user.id);
  }
}
