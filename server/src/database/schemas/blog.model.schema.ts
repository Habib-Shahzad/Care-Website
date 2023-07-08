import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { BlogType } from '../enums/blog.type.enum';

export type BlogDocument = Blog & Document;

@Schema()
export class Blog {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ default: true })
  active: boolean;

  @Prop({
    type: [
      { type: MongooseSchema.Types.ObjectId, ref: 'Image', required: true },
    ],
  })
  imageList: MongooseSchema.Types.ObjectId[];

  @Prop({ required: true, default: BlogType.PATIENT_WELFARE })
  blogType: BlogType;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
