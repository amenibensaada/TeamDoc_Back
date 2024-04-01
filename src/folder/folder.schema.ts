import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Documents } from 'src/document/document.schema';
import { User } from '../users/users.schema';


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
}

export const FolderSchema = SchemaFactory.createForClass(Folder);
