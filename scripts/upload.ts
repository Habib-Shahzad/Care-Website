import * as fs from "fs";
import * as mongoose from "mongoose";
import * as path from "path";

import {
    Image,
    ImageDocument,
    ImageSchema,
    UploadFile
} from "./models";
import { StorageService } from "./storage";

import * as dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.DATABASE_URL);

const imageModel = mongoose.model<ImageDocument>(Image.name, ImageSchema);


const storageService = new StorageService();

async function migrateImages() {
  try {
    const _id = "64cd60b1fb755de4b7f72ff3";
    const image = await imageModel.findById(_id).exec();
    const filePath = path.join("../BACKUP/allImages", image.image.fileName);
    const fileBuffer = fs.readFileSync(filePath);

    const multerFile: Express.Multer.File = {
      buffer: fileBuffer,
      originalname: image.image.fileName,
      mimetype: "image/jpeg",
      size: fileBuffer.length,
      fieldname: "file",
      encoding: "7bit",
      destination: "",
      filename: "",
      path: "",
      stream: fs.createReadStream(filePath),
    };


    const uploadFile = new UploadFile(multerFile);
    const url = await storageService.upload(uploadFile);
    console.log(url);

  } catch (error) {
    console.error("Error during migration:", error);
  } finally {
    mongoose.connection.close();
  }
}

migrateImages();
