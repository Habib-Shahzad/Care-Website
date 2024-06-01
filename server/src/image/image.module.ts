import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { CareImage as Image, CareImageSchema } from './entities/image.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { StorageModule } from '../storage/storage.module';

@Module({
  imports: [
    StorageModule,
    MongooseModule.forFeature([{ name: Image.name, schema: CareImageSchema }]),
  ],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}