import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto, signupSchema } from './dto/Signup-dto';
import { ZodValidationPipe } from 'src/common/zod.pipe';
import { LoginDto, loginSchema } from './dto/login-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @UsePipes(new ZodValidationPipe(signupSchema))
  signup(@Body() signupdto: SignUpDto):Promise<SignUpDto> {
    return this.authService.SignUp(signupdto);
  }
  @Post('/signin')
  @UsePipes(new ZodValidationPipe(loginSchema))
  signin(@Body() logindto:LoginDto){
    return this.authService.login(logindto)
    
  }

}
