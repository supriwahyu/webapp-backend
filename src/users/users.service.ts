// src/users/users.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Profile, ProfileDocument } from '../schemas/profile.schema';
import * as bcrypt from 'bcryptjs';
import { CreateProfileDto, UpdateProfileDto } from '../common/dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Profile.name) private readonly profileModel: Model<ProfileDocument>,
  ) {}

  async findOne(id: string) {
    return this.userModel.findById(id).select('-password').exec();
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async findByUsername(username: string) {
    return this.userModel.findOne({ username }).exec();
  }

  async create(username: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.userModel({ username, email, password: hashedPassword });
    return user.save();
  }

  async createProfile(userId: string, dto: CreateProfileDto) {
    const existing = await this.profileModel.findOne({ userId });
    if (existing) {
      throw new Error('Profile already exists');
    }

    const newProfile = new this.profileModel({
      userId,
      fullName: dto.fullName,
      bio: dto.bio,
      avatarUrl: dto.avatarUrl,
    });

    return newProfile.save();
  }

  async getProfile(userId: string) {
    const profile = await this.profileModel.findOne({ userId }).exec();
    if (!profile) throw new NotFoundException('Profile not found');
    return profile;
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    const profile = await this.profileModel.findOneAndUpdate(
      { userId },
      { $set: dto },
      { new: true },
    );

    if (!profile) throw new NotFoundException('Profile not found');
    return profile;
  }
}
