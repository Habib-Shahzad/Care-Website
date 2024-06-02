import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

import { ObjectId } from 'mongoose';
import { BlogType } from './entities/blog.entity';
import { AdminGuard } from '../admin-auth-guard/admin-auth-guard.service';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get('table-data')
  async findAll() {
    return { data: await this.blogService.findAll() };
  }

  @Get('by-type/:type')
  async findByType(@Param('type') type: BlogType) {
    return {
      data: await this.blogService.findByType(type),
    };
  }

  @UseGuards(AdminGuard)
  @Post()
  async create(@Body() data: CreateBlogDto) {
    const newBlog = await this.blogService.create(data);
    return { data: await this.blogService.findOne(newBlog._id) };
  }

  @Get(':id')
  findOne(@Param('id') id: ObjectId) {
    return this.blogService.findOne(id);
  }

  @UseGuards(AdminGuard)
  @Patch()
  async update(@Body() data: UpdateBlogDto) {
    const updatedBlog = await this.blogService.update(data);
    return { data: updatedBlog };
  }

  @UseGuards(AdminGuard)
  @Patch('set-active')
  async setActive(@Body() data: { active: boolean; selected: string[] }) {
    await this.blogService.setActive(data.active, data.selected);
    return {
      success: true,
      data: await this.blogService.findAll(),
    };
  }

  @UseGuards(AdminGuard)
  @Post('delete-multiple')
  async removeMany(@Body() body: { data: string[] }) {
    return await this.blogService.deleteMany(body.data);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogService.remove(+id);
  }
}
