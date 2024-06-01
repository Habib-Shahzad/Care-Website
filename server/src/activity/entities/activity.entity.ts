import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type ActivityDocument = Activity & Document;

@Schema()
export class Activity {
  _id: MongooseSchema.Types.ObjectId;

  @Prop({
    type: [
      { type: MongooseSchema.Types.ObjectId, ref: 'CareImage', required: true },
    ],
  })
  imageList: MongooseSchema.Types.ObjectId[];

  @Prop({ default: true })
  active: boolean;

  @Prop({ required: true })
  activityDate: Date;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);
