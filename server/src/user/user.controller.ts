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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AdminGuard } from '../admin-auth-guard/admin-auth-guard.service';

@UseGuards(AdminGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('table-data')
  async findAll() {
    return {
      data: await this.userService.findAll(),
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch('set-active')
  async setActive(@Body() data: { active: boolean; selected: string[] }) {
    await this.userService.setActive(data.active, data.selected);
    return {
      success: true,
      data: await this.userService.findAll(),
    };
  }

  @Patch('set-admin')
  async setAdmin(@Body() data: { admin: boolean; selected: string[] }) {
    await this.userService.setAdmin(data.admin, data.selected);
    return {
      success: true,
      data: await this.userService.findAll(),
    };
  }

  @Patch()
  async update(@Body() data: UpdateUserDto) {
    return {
      data: await this.userService.update(data),
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
