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

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @UsePipes(new ZodValidationPipe(signupSchema))
  create(@Body() createAuthDto: SignUpDto) {
    return this.authService.SignUp(createAuthDto);
  }
}
