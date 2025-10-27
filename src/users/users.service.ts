// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

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
    const user = new this.userModel({ username, email, password });
    return user.save();
  }
}
