import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Content extends Document {
  _id: string;
  @Prop()
  documentId: string;

  @Prop()
  content: string;

  @Prop({ default: Date.now })
  creationDate: Date;
  
  

}

export const ContentSchema = SchemaFactory.createForClass(Content);
