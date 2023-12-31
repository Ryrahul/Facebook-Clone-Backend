import {
  Controller,
  Get,
  Post,
  Body,
  ParseIntPipe,
  Delete,
  UsePipes,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto, signupSchema } from './dto/Signup-dto';
import { ZodValidationPipe } from 'src/common/zod.pipe';
import { LoginDto, loginSchema } from './dto/login-dto';
import { Public } from 'src/common/decorator/public-decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @Post('/signup')
  @UsePipes(new ZodValidationPipe(signupSchema))
  async signup(@Body() signupdto: SignUpDto) {
    return await this.authService.SignUp(signupdto);
  }
  @Public()
  @Post('/signin')
  @UsePipes(new ZodValidationPipe(loginSchema))
  async signin(@Body() logindto: LoginDto) {
    return await this.authService.login(logindto);
  }
  @Public()
  @Get('/confirm')
  async verify(@Query('token', ParseIntPipe) token: number) {
    return await this.authService.verify(token);
  }
  @Public()
  @Post('forgotpass')
  async forgotPassword(@Body('email') email: string) {
    return await this.authService.forgotPassword(email);
  }
  @Public()
  @Get('forgotpass/verify')
  async resetPassword(
    @Query() { token, user }: { token: string; user: string },
  ) {
    return await this.authService.ResetPassword(user, token);
  }
}
