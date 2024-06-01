import * as fs from 'fs';
import * as mongoose from 'mongoose';
import * as path from 'path';

import {
  Image,
  CareImage,
  CareImageDocument,
  CareImageSchema,
  ImageDocument,
  ImageSchema,
  UploadFile
} from './models';
import { StorageService } from './storage';

import * as dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.DATABASE_URL);

const imageModel = mongoose.model<ImageDocument>(Image.name, ImageSchema);

const careImageModel = mongoose.model<CareImageDocument>(
  CareImage.name,
  CareImageSchema,
);
const storageService = new StorageService();

async function migrateImages() {
  try {
    const images: ImageDocument[] = await imageModel.find().exec();

    for (const image of images) {
      const filePath = path.join('../BACKUP/allImages', image.image.fileName);
      if (fs.existsSync(filePath)) {
        const fileBuffer = fs.readFileSync(filePath);

        const multerFile: Express.Multer.File = {
          buffer: fileBuffer,
          originalname: image.image.fileName,
          mimetype: 'image/jpeg',
          size: fileBuffer.length,
          fieldname: 'file',
          encoding: '7bit',
          destination: '',
          filename: '',
          path: '',
          stream: fs.createReadStream(filePath),
        };

        const uploadFile = new UploadFile(multerFile);
        const url = await storageService.upload(uploadFile);

        const careImage = new careImageModel({
          _id: image._id,
          name: image.name,
          url: url,
        });

        await careImage.save();
        console.log(`Successfully migrated image ${image.name}`);
      } else {
        console.warn(`File ${filePath} does not exist`);
      }
    }
  } catch (error) {
    console.error('Error during migration:', error);
  } finally {
    mongoose.connection.close();
  }
}

migrateImages();
