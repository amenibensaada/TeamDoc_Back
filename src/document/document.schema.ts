import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { Content } from 'src/content/content.schema';

export type DocumentsDocument = Documents & Document;

@Schema()
export class Documents {
  @Prop({ unique: true, required: true })
  Title: string;
  @Prop({ type: Date, default: Date.now })
  createdDate: Date;

  @Prop({ type: Date, default: Date.now })
  updatedDate: Date;

  @Prop({ type: [String], default: [] })
  contentType: string[];
  @Prop({ required: false })
  folderId?: string;
  @Prop({ default: false })
  archived: boolean;
}

export const DocumentsSchema = SchemaFactory.createForClass(Documents);
