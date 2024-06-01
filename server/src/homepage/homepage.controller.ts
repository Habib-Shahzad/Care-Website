import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateHomepageDto } from './dto/create-homepage.dto';
import { UpdateHomepageDto } from './dto/update-homepage.dto';
import { HomepageService } from './homepage.service';
import { AdminGuard } from '../admin-auth-guard/admin-auth-guard.service';

@Controller('home-page')
export class HomepageController {
  constructor(private readonly homepageService: HomepageService) {}

  @Get('data')
  async findOne() {
    return {
      data: await this.homepageService.find(),
    };
  }

  @UseGuards(AdminGuard)
  @Post()
  async create(@Body() createHomepageDto: CreateHomepageDto) {
    await this.homepageService.create(createHomepageDto);
    return { data: await this.homepageService.find() };
  }

  @UseGuards(AdminGuard)
  @Patch()
  async update(@Body() data: UpdateHomepageDto) {
    return {
      data: await this.homepageService.update(data),
    };
  }
}
