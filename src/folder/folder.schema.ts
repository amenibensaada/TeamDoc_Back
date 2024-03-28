import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Documents } from '../document/document.schema';
import { User } from '../users/users.schema';
import { boolean } from 'zod';

export type FolerDocument = Folder & Document;

@Schema()
export class Folder {
  @Prop({ unique: true, required: true })
  Name: string;
  @Prop({ type: Date, default: Date.now })
  createdDate: Date;
  
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' }) 
  user: User; 

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Documents' }]
  })
  documents: Documents[];
  @Prop({ type: boolean, default: false })
  deleted: boolean;
  @Prop({ type: Date, default: null })

  deletedAt: Date = null;
}

export const FolderSchema = SchemaFactory.createForClass(Folder);
