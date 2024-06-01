import {
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { StorageService } from './storage.service';

import { FileInterceptor } from '@nestjs/platform-express';
import { UploadFile } from './models/upload.file.model';
import { AdminGuard } from '../admin-auth-guard/admin-auth-guard.service';

@UseGuards(AdminGuard)
@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Delete('delete/:key')
  async delete(@Param('key') key: string) {
    try {
      await this.storageService.delete(key);
      return {
        message: 'File deleted successfully',
      };
    } catch (e) {
      throw new HttpException('Error deleting file', HttpStatus.BAD_REQUEST);
    }
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new HttpException('No file uploaded!', HttpStatus.BAD_REQUEST);
    }

    try {
      const url = await this.storageService.upload(new UploadFile(file));
      return {
        url,
        message: 'File uploaded successfully',
      };
    } catch (e) {
      console.log(e);
      throw new HttpException('Error uploading file', HttpStatus.BAD_REQUEST);
    }
  }
}
