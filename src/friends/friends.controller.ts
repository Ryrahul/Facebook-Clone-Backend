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
  @Post('send/:Receiverid')
  async CreateRequest(
    @Param('Receiverid', ParseIntPipe) Receiverid: number,
    @Req() req,
  ) {
    return this.friendsService.create(Receiverid, req.user.id);
  }
  @Post('receive/:id')
  async AcceptRequest(@Param('id', ParseIntPipe) id:number){
    return await this.friendsService.acceptRequest(id)

  }

}
