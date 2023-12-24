import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import { FriendsService } from './friends.service';

@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}
  @Post(':Receiverid')
  async CreateRequest(
    @Param('Receiverid', ParseIntPipe) Receiverid: number,
    @Req() req,
  ) {
    return this.friendsService.create(Receiverid, req.user.id);
  }
  @Post('receive/:id')
  async AcceptRequest(@Param('id', ParseIntPipe) id: number, @Req() req) {
    return await this.friendsService.acceptRequest(id, req.user.id);
  }
  @Get()
  async findAllRequest(@Req() req) {
    return this.friendsService.findAllRequests(req.user.id);
  }
  @Delete(':id')
  async deletreq(@Param('id') id: string, @Req() req) {
    return this.friendsService.deleteRequest(+id, req.user.id);
  }
}
