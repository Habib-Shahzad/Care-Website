import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { ImageService } from './image.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { StorageService } from '../storage/storage.service';
import { UploadFile } from '../storage/models/upload.file.model';

@Controller('image')
export class ImageController {
  constructor(
    private readonly storageService: StorageService,
    private readonly imageService: ImageService,
  ) {}

  @Get('table-data')
  async findAll() {
    return {
      data: await this.imageService.findAll(),
    };
  }

  @UseInterceptors(FileInterceptor('image'))
  @Post()
  async create(
    @UploadedFile() image: Express.Multer.File,
    @Body() data: CreateImageDto,
  ) {
    const url = await this.storageService.upload(new UploadFile(image));
    const newActivity = await this.imageService.create({
      ...data,
      url,
    });
    return { data: await this.imageService.findOne(newActivity._id) };
  }

  @Get(':id')
  async findOne(@Param('id') id: ObjectId) {
    return {
      data: this.imageService.findOne(id),
    };
  }

  @Patch()
  async update(@Body() data: UpdateImageDto) {
    return {
      data: await this.imageService.update(data),
    };
  }

  @Patch('set-active')
  async setActive(@Body() data: { active: boolean; selected: string[] }) {
    await this.imageService.setActive(data.active, data.selected);
    return {
      success: true,
      data: await this.imageService.findAll(),
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imageService.remove(id);
  }

  @Delete('delete-multiple')
  async removeMany(@Body() body: { data: string[] }) {
    return await this.imageService.deleteMany(body.data);
  }
}
