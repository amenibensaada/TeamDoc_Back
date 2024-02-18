import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

import { DocumentsDocument } from 'src/document-crud/document.schema';

export type FolerDocument = Folder & Document;

@Schema()
export class Folder {
  @Prop()
  Name: string;
  @Prop({ type: Date, default: Date.now })
  createdDate: Date;
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Documents' }] })
  documents: DocumentsDocument[];
}

export const FolderSchema = SchemaFactory.createForClass(Folder);