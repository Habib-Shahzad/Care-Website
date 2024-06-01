import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ImageDocument = Image & Document;

@Schema()
export class Image {
  @Prop({ required: true })
  name: string;

  @Prop({
    required: true,
    type: Object,
  })
  image: {
    fileName: string;
    filePath: string;
  };
}

export const ImageSchema = SchemaFactory.createForClass(Image);

export type CareImageDocument = CareImage & Document;

@Schema()
export class CareImage {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  url: string;
}

export const CareImageSchema = SchemaFactory.createForClass(CareImage);



export class UploadFile {
    name: string;
    file: Express.Multer.File;
    mimetype: string;
  
    constructor(file: Express.Multer.File) {
      this.file = file;
      this.name = this.prepareFileName();
    }
    private prepareFileName(): string {
      const extension = this.file.mimetype.split('/').pop();
      const fileName = this.file.originalname.split('.')[0];
  
      return fileName + '.' + extension;
    }
  }
  