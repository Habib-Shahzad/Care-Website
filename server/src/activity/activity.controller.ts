import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { AdminGuard } from '../admin-auth-guard/admin-auth-guard.service';

@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Get('table-data')
  async findAll() {
    return {
      data: await this.activityService.findAll(),
    };
  }

  @UseGuards(AdminGuard)
  @Post()
  async create(@Body() data: CreateActivityDto) {
    const newActivity = await this.activityService.create(data);
    return { data: await this.activityService.findOne(newActivity._id) };
  }

  @Get(':id')
  async findOne(@Param('id') id: ObjectId) {
    return {
      data: this.activityService.findOne(id),
    };
  }

  @UseGuards(AdminGuard)
  @Patch()
  async update(@Body() data: UpdateActivityDto) {
    return {
      data: await this.activityService.update(data),
    };
  }

  @UseGuards(AdminGuard)
  @Patch('set-active')
  async setActive(@Body() data: { active: boolean; selected: string[] }) {
    await this.activityService.setActive(data.active, data.selected);
    return {
      success: true,
      data: await this.activityService.findAll(),
    };
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.activityService.remove(id);
  }

  @UseGuards(AdminGuard)
  @Post('delete-multiple')
  async removeMany(@Body() body: { data: string[] }) {
    return await this.activityService.deleteMany(body.data);
  }
}
