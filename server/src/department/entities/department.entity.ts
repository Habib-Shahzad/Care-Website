import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type DepartmentDocument = Department & Document;

@Schema()
export class Department {
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  active: boolean;

  @Prop({
    type: [
      {
        name: { type: String, required: true },
        role: { type: String, required: true },
        image: {
          type: MongooseSchema.Types.ObjectId,
          ref: 'Image',
          required: true,
        },
      },
    ],
  })
  members: {
    name: string;
    role: string;
    image: MongooseSchema.Types.ObjectId;
  }[];
}

export const DepartmentSchema = SchemaFactory.createForClass(Department);
