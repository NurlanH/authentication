import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IUser } from '../interfaces';

export type UserDocument = Users & Document;

@Schema()
export class Users implements IUser {
  @Prop({ type: String })
  fullName: string;

  @Prop({ type: String })
  merchantType: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: true })
  phone: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, required: true  })
  address: string;

  @Prop({ type: String, required: true  })
  ownerName: string;

  @Prop({ type: Date, default:new Date() })
  createdAt: Date;

  @Prop({ type: Date, default: new Date() })
  updatedAt: Date;

  @Prop({ type: Boolean, default: false })
  isDeleted: boolean;

  @Prop({ type: Number, default: 1000 })
  balance: number;
}

export const UserSchema = SchemaFactory.createForClass(Users);
