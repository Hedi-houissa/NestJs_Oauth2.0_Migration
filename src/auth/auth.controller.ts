import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Public } from './authGuard/auth.guard';
import { CreateAuthDto } from './dto/create-auth.dto';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.login(createAuthDto);
  }

}
