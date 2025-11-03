import {
  Controller,
  Post,
  Get,
  Put,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { CreateProfileDto, UpdateProfileDto } from '../common/dto/user.dto';

@Controller('api')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // Create profile
  @UseGuards(JwtAuthGuard)
  @Post('createProfile')
  async createProfile(@Body() createProfileDto: CreateProfileDto, @Request() req) {
    const userId = req.user.userId; // assuming JWT payload includes `userId`
    return this.userService.createProfile(userId, createProfileDto);
  }

  // Get profile
  @UseGuards(JwtAuthGuard)
  @Get('getProfile')
  async getProfile(@Request() req) {
    const userId = req.user.userId;
    return this.userService.getProfile(userId);
  }

  // Update profile
  @UseGuards(JwtAuthGuard)
  @Put('updateProfile')
  async updateProfile(@Body() updateProfileDto: UpdateProfileDto, @Request() req) {
    const userId = req.user.userId;
    return this.userService.updateProfile(userId, updateProfileDto);
  }
}
