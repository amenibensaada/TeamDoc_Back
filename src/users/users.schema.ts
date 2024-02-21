import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  _id: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ type: String, enum: ['Male', 'Female'] })
  gender: string[];

  @Prop({ type: String, unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop({ type: [String], enum: ['CLIENT', 'ADMIN'], default: ['CLIENT'] })
  accountType: string[];

  @Prop({ type: String, required: false })
  resetToken?: string;

  @Prop({ type: Date, required: false })
  resetTokenExpiry?: Date;

  @Prop({ type: String, required: false })
  picture?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
