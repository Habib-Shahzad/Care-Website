import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export enum BlogType {
  'PATIENT_WELFARE' = 'PATIENT_WELFARE',
  'COMMUNITY_OUTREACH' = 'COMMUNITY_OUTREACH',
  'RESEARCH_DEVELOPMENT' = 'RESEARCH_DEVELOPMENT',
}

export type BlogDocument = Blog & Document;

@Schema()
export class Blog {
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ default: true })
  active: boolean;

  @Prop({
    type: [
      { type: MongooseSchema.Types.ObjectId, ref: 'CareImage', required: true },
    ],
  })
  imageList: MongooseSchema.Types.ObjectId[];

  @Prop({ required: true, default: BlogType.PATIENT_WELFARE })
  blogType: BlogType;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
