import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth') // ✅ base route
export class AuthController {
  @UseGuards(JwtAuthGuard)
  @Get('profile') // ✅ route path
  getProfile(@Request() req) {
    return req.user;
  }
}
