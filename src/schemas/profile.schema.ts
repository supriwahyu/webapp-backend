// src/schemas/profile.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Profile {
  @Prop({ required: true, unique: true })
  userId: string;

  @Prop({ required: true })
  fullName: string;

  @Prop()
  bio?: string;

  @Prop()
  avatarUrl?: string;
}

export type ProfileDocument = Profile & Document;
export const ProfileSchema = SchemaFactory.createForClass(Profile);
