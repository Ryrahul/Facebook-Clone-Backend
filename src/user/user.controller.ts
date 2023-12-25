import { Body, Controller, Post, Put, Query, Req, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { editProfileDto, updateProfileSchema } from './dto/editProfile.dto';
import { ZodValidationPipe } from 'src/common/zod.pipe';

@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService){}
    @Put('update')
    @UsePipes(new ZodValidationPipe(updateProfileSchema))
    async EditProfile(@Body() dto:editProfileDto,@Req() req){
        return await this.userService.updateProfile(req.user.id,dto)

    }
    @Put()

    @Post()
    async GetUserbyName(@Query() {name}:{name}){
        return await this.userService.getUserByName(name)
    }
}
