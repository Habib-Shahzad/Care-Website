import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import * as fs from 'fs';
import { uploadPath, path } from '../storage';

@Injectable()
export class AdminService {
  constructor(private readonly databaseService: DatabaseService) {}

  getActivities() {
    return this.databaseService.getActivities();
  }

  addActivity(data: any) {
    return { data: this.databaseService.addActivity(data) };
  }

  async updateActivity(data: any) {
    return { data: await this.databaseService.updateActivity(data) };
  }

  async deleteActivities(ids: string[]) {
    await this.databaseService.deleteActivities(ids);
    return {
      success: true,
      data: await this.databaseService.getActivities(),
    };
  }

  async setActivitiesActive(active: boolean, ids: string[]) {
    await this.databaseService.setActivitiesActive(active, ids);
    return {
      success: true,
      data: await this.databaseService.getActivities(),
    };
  }

  getImages() {
    return this.databaseService.getImages();
  }

  async addImage(name: string, image: Express.Multer.File) {
    const fileName = image.filename;
    const filePath = '/allImages/' + fileName;
    const imageObj = {
      fileName,
      filePath,
    };
    return {
      data: await this.databaseService.addImage({
        name,
        image: imageObj,
      }),
    };
  }

  async updateImage(data: any) {
    return { data: await this.databaseService.updateImage(data) };
  }

  async deleteImages(ids: string[]) {
    const deleteableImages = await this.databaseService.getImagesByIds(ids);
    deleteableImages.forEach((imageObj) => {
      try {
        fs.unlinkSync(path.resolve(uploadPath) + '/' + imageObj.image.fileName);
      } catch (err) {}
    });

    await this.databaseService.deleteImages(ids);

    return {
      success: true,
      data: await this.databaseService.getImages(),
    };
  }

  getOutreachBlogs() {
    return this.databaseService.getOutreachBlogs();
  }

  addOutreachBlog(data: any) {
    return { data: this.databaseService.addOutreachBlog(data) };
  }

  async updateOutreachBlog(data: any) {
    return { data: await this.databaseService.updateOutreachBlog(data) };
  }

  async deleteOutreachBlogs(ids: string[]) {
    await this.databaseService.deleteOutreachBlogs(ids);
    return {
      success: true,
      data: await this.databaseService.getOutreachBlogs(),
    };
  }

  async setOutreachBlogsActive(active: boolean, ids: string[]) {
    await this.databaseService.setOutreachBlogsActive(active, ids);
    return {
      success: true,
      data: await this.databaseService.getOutreachBlogs(),
    };
  }

  getBlogs() {
    return this.databaseService.getBlogs();
  }

  async addBlog(data: any) {
    return { data: this.databaseService.addBlog(data) };
  }

  async updateBlog(data: any) {
    const updatedBlog = await this.databaseService.updateBlog(data);
    return { data: updatedBlog };
  }

  async deleteBlogs(ids: string[]) {
    await this.databaseService.deleteBlogs(ids);
    return {
      success: true,
      data: await this.databaseService.getBlogs(),
    };
  }
  async setBlogsActive(active: boolean, ids: string[]) {
    await this.databaseService.setBlogsActive(active, ids);
    return {
      success: true,
      data: await this.databaseService.getBlogs(),
    };
  }

  getDepartments() {
    return this.databaseService.getDepartments();
  }

  async addDepartment(data: any) {
    return { data: await this.databaseService.addDepartment(data) };
  }

  async updateDepartment(data: any) {
    return { data: await this.databaseService.updateDepartment(data) };
  }

  async deleteDepartments(ids: string[]) {
    await this.databaseService.deleteDepartments(ids);
    return {
      success: true,
      data: await this.databaseService.getDepartments(),
    };
  }

  async setDepartmentsActive(active: boolean, ids: string[]) {
    await this.databaseService.setDepartmentsActive(active, ids);
    return {
      success: true,
      data: await this.databaseService.getDepartments(),
    };
  }
}
