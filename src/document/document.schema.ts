import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
//import { Folder } from 'src/folder-crud/folder.schema'  Schema as MongooseSchema;

export type DocumentsDocument = Documents & Document;

@Schema()
export class Documents {

  @Prop()
  Title: string;
  @Prop({ type: Date, default: Date.now })
  createdDate: Date;

  @Prop({ type: Date, default: Date.now })
  updatedDate: Date;

  @Prop({ type: [String], default: [] })
  contentType: string[];

  //@Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Folder' }] })
 // Folders: Folder[];

}

export const DocumentsSchema = SchemaFactory.createForClass(Documents);