import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Documents } from 'src/document/document.schema';
import { User } from '../users/users.schema';
import { Content } from '../content/content.schema';


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
   @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'User' }] // Liste des utilisateurs avec lesquels le dossier est partagé
  })
  sharedWith: User[];

  @Prop({ type: String, enum: ['view', 'update'], default: 'update' }) // Ajoutez l'attribut d'accès avec les valeurs possibles 'view' ou 'update', par défaut 'update'
  access: string;

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Content' }] // Liste des contenus avec une référence au dossier
  })
  contents: Content[]; // Ajoutez une liste de contenus
}
  



export const FolderSchema = SchemaFactory.createForClass(Folder);
