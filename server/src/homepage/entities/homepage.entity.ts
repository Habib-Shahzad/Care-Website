import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type HomePageDocument = HomePage & Document;

@Schema()
export class HomePage {
  @Prop({ required: true })
  mainContent: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'CareImage',
    required: true,
  })
  mainImage: MongooseSchema.Types.ObjectId;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'CareImage',
    required: true,
  })
  ambassadorImage: MongooseSchema.Types.ObjectId;
}

export const HomePageSchema = SchemaFactory.createForClass(HomePage);
