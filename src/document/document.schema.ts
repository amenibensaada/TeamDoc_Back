import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Folder } from '../folder/folder.schema';
import { User } from '../users/users.schema';
import { boolean } from 'zod';

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

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' }) 
  user: User; 
  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Folder' }]
  })
  folders: Folder[];

 

  @Prop({ type: boolean, default: false })
  deleted: boolean;
  @Prop({ type: Date, default: null })

  deletedAt: Date = null;

}

export const DocumentsSchema = SchemaFactory.createForClass(Documents);
