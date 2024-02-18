import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { DocumentsDocument } from 'src/document/document.schema';


export type FolerDocument = Folder & Document;

@Schema()
export class Folder {
  @Prop({ unique: true, required: true })
  Name: string;
  @Prop({ type: Date, default: Date.now })
  createdDate: Date;
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Documents' }] })
  documents: DocumentsDocument[];
}

export const FolderSchema = SchemaFactory.createForClass(Folder);