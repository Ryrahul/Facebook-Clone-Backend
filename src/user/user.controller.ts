import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  Req,
  UploadedFile,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { UserService } from './user.service';
import { editProfileDto, updateProfileSchema } from './dto/editProfile.dto';
import { ZodValidationPipe } from 'src/common/zod.pipe';
import { editNameDto, editNameSchema } from './dto/editname.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Put('update')
  @UsePipes(new ZodValidationPipe(updateProfileSchema))
  async EditProfile(@Body() dto: editProfileDto, @Req() req) {
    return await this.userService.updateProfile(req.user.id, dto);
  }
  @Put()
  @UsePipes(new ZodValidationPipe(editNameSchema))
  async EditName(@Body() editName: editNameDto, @Req() req) {
    return await this.userService.updateName(req.user.id, editName);
  }

  @Post()
  async GetUserbyName(@Query() { name }: { name: string }) {
    return await this.userService.getUserByName(name);
  }
  @Get()
  async GetCurrentUser(@Req() req) {
    return await this.userService.getCurrentUser(req.user.id);
  }
  @Put()
  @UseInterceptors(FileInterceptor('image'))
  async ChangePP(@UploadedFile() image:Express.Multer.File, @Req() req:any){
    return this.userService.ChangeProfilePicture(image,req.user.id)
 }
}
