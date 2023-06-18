import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ImageDocument = Image & Document;

@Schema()
export class Image {
  @Prop({ required: true })
  name: string;

  @Prop({
    type: { type: Object },
  })
  image: {
    fileName: string;
    filePath: string;
  };
}

export const ImageSchema = SchemaFactory.createForClass(Image);
