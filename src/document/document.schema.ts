import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Folder } from 'src/folder/folder.schema';

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


}

export const DocumentsSchema = SchemaFactory.createForClass(Documents);