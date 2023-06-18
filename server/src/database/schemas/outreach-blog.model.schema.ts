import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type OutreachBlogDocument = OutreachBlog & Document;

@Schema()
export class OutreachBlog {
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
}

export const OutreachBlogSchema = SchemaFactory.createForClass(OutreachBlog);
