import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AdminService } from 'src/admin/admin.service';
import { SetActiveReqDto } from 'src/admin/dto/set.active.req.dto';
import { AppService } from 'src/app.service';
import { BlogType } from 'src/database/enums/blog.type.enum';
import { myStorage } from 'src/storage';

@Controller('api')
export class BackendController {
  constructor(
    private readonly appService: AppService,
    private readonly adminService: AdminService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // Home Page Endpoints
  @Get('home-page/data')
  async getHomePageData() {
    return {
      data: await this.adminService.getHomePageData(),
    };
  }

  @Post('home-page/update')
  async updateHomePageData(@Body() data: any) {
    return this.adminService.updateHomePageData(data);
  }

  // Activities Endpoints
  @Get('activity/table-data')
  async getActivityTableData() {
    return {
      data: await this.adminService.getActivities(),
    };
  }

  @Post('activity/add')
  async addActivity(@Body() data: any) {
    return await this.adminService.addActivity(data);
  }

  @Post('activity/update')
  async updateActivity(@Body() data: any) {
    return this.adminService.updateActivity(data);
  }

  @Post('activity/delete')
  async deleteActivities(@Body() body: { data: string[] }) {
    return this.adminService.deleteActivities(body.data);
  }

  @Post('activity/set-active')
  async setActivitiesActive(@Body() data: SetActiveReqDto) {
    return this.adminService.setActivitiesActive(data.active, data.selected);
  }

  // Image Endpoints
  @Get('image/table-data')
  async getImageTableData() {
    return {
      data: await this.adminService.getImages(),
    };
  }

  @Post('image/add')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: myStorage,
    }),
  )
  async addImage(
    @Body('data') data,
    @UploadedFile() image: Express.Multer.File,
  ) {
    console.log(image);
    const name = JSON.parse(data).name;
    return this.adminService.addImage(name, image);
  }

  @Post('image/update')
  async updateImage(@Body() data: any) {
    return this.adminService.updateImage(data);
  }

  @Post('image/delete')
  async deleteImages(@Body() body: { data: string[] }) {
    return this.adminService.deleteImages(body.data);
  }

  // Blog Endpoints

  @Get('blog/table-data')
  async getBlogTableData() {
    return {
      data: await this.adminService.getBlogs(),
    };
  }

  @Get('blog-by-type/:blogType')
  async getBlogTableDataByType(@Param('blogType') blogType: BlogType) {
    return {
      data: await this.adminService.getBlogsByType(blogType),
    };
  }

  @Post('blog/add')
  async addBlog(@Body() data: any) {
    return this.adminService.addBlog(data);
  }

  @Post('blog/update')
  async updateBlog(@Body() data: any) {
    return this.adminService.updateBlog(data);
  }

  @Post('blog/delete')
  async deleteBlogs(@Body() body: { data: string[] }) {
    return await this.adminService.deleteBlogs(body.data);
  }

  @Post('blog/set-active')
  async setBlogsActive(@Body() data: SetActiveReqDto) {
    return this.adminService.setBlogsActive(data.active, data.selected);
  }

  // Departments Endpoints

  @Get('department/table-data-image')
  async getDepartmentTableDatWithImages() {
    return {
      data: await this.adminService.getDepartmentsWithImages(),
    };
  }

  @Get('department/table-data')
  async getDepartmentTableData() {
    return {
      data: await this.adminService.getDepartments(),
    };
  }

  @Post('department/add')
  async addDepartment(@Body() data: any) {
    return this.adminService.addDepartment(data);
  }

  @Post('department/update')
  async updateDepartment(@Body() data: any) {
    return this.adminService.updateDepartment(data);
  }

  @Post('department/delete')
  async deleteDepartments(@Body() body: { data: string[] }) {
    return this.adminService.deleteDepartments(body.data);
  }

  @Post('department/set-active')
  async setDepartmentsActive(@Body() data: SetActiveReqDto) {
    return this.adminService.setDepartmentsActive(data.active, data.selected);
  }
}
