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
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { AdminGuard } from '../admin-auth-guard/admin-auth-guard.service';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Get('table-data-image')
  async findAllWithImages() {
    return {
      data: await this.departmentService.findAllWithImages(),
    };
  }

  @Get('table-data')
  async findAll() {
    return {
      data: await this.departmentService.findAll(),
    };
  }

  @UseGuards(AdminGuard)
  @Post()
  async create(@Body() data: CreateDepartmentDto) {
    const newData = await this.departmentService.create(data);
    return { data: await this.departmentService.findOne(newData._id) };
  }

  @Get(':id')
  async findOne(@Param('id') id: ObjectId) {
    return {
      data: this.departmentService.findOne(id),
    };
  }

  @UseGuards(AdminGuard)
  @Patch()
  async update(@Body() data: UpdateDepartmentDto) {
    return {
      data: await this.departmentService.update(data),
    };
  }

  @UseGuards(AdminGuard)
  @Patch('set-active')
  async setActive(@Body() data: { active: boolean; selected: string[] }) {
    await this.departmentService.setActive(data.active, data.selected);
    return {
      success: true,
      data: await this.departmentService.findAll(),
    };
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.departmentService.remove(id);
  }

  @UseGuards(AdminGuard)
  @Post('delete-multiple')
  async removeMany(@Body() body: { data: string[] }) {
    return await this.departmentService.deleteMany(body.data);
  }
}
