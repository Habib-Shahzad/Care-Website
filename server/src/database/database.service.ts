import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { User, UserDocument } from './schemas/user.model.schema';
import { Blog, BlogDocument } from './schemas/blog.model.schema';
import { Activity, ActivityDocument } from './schemas/activity.model.schema';
import {
  Department,
  DepartmentDocument,
} from './schemas/department.model.schema';
import { Image, ImageDocument } from './schemas/image.model.schema';
import { BlogType } from './enums/blog.type.enum';
import { HomePage, HomePageDocument } from './schemas/home.page.model.schema';

@Injectable()
export class DatabaseService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Blog.name) private blogModel: Model<BlogDocument>,
    @InjectModel(Activity.name) private activityModel: Model<ActivityDocument>,
    @InjectModel(Department.name)
    private departmentModel: Model<DepartmentDocument>,
    @InjectModel(Image.name) private imageModel: Model<ImageDocument>,
    @InjectModel(HomePage.name) private homePageModel: Model<HomePageDocument>,
  ) {}

  async getHomePageData(): Promise<HomePage> {
    return this.homePageModel
      .findOne()
      .populate('mainImage')
      .populate('ambassadorImage')
      .exec();
  }

  async createHomePage(data: any): Promise<HomePage> {
    const newHomePage = new this.homePageModel(data);
    await newHomePage.save();
    return newHomePage;
  }

  async updateHomePage(data: any) {
    const { _id, ...updateData } = data;
    if (!_id) return this.createHomePage(data);
    return this.homePageModel
      .findByIdAndUpdate(_id, updateData, { new: true })
      .exec();
  }

  // Activity
  async getActivities(): Promise<Activity[]> {
    return this.activityModel.find().populate('imageList').exec();
  }

  async addActivity(data: any): Promise<Activity> {
    const newActivity = new this.activityModel(data);
    await newActivity.save();
    return newActivity;
  }

  async updateActivity(data: any): Promise<Activity> {
    const { _id, ...updateData } = data;
    return this.activityModel
      .findByIdAndUpdate(_id, updateData, { new: true })
      .populate('imageList')
      .exec();
  }

  async deleteActivities(ids: string[]): Promise<void> {
    await this.activityModel.deleteMany({ _id: { $in: ids } }).exec();
  }

  async setActivitiesActive(
    active: boolean,
    selected: string[],
  ): Promise<void> {
    await this.activityModel.updateMany(
      { _id: { $in: selected } },
      { active: active },
    );
  }

  // Blog
  async getBlogs(): Promise<Blog[]> {
    return this.blogModel.find().populate('imageList').exec();
  }

  async getBlogsByType(blogType: BlogType): Promise<Blog[]> {
    return this.blogModel
      .find({ blogType: blogType })
      .populate('imageList')
      .exec();
  }

  async addBlog(data: any): Promise<Blog> {
    const newBlog = new this.blogModel(data);
    await newBlog.save();
    return newBlog;
  }

  async getBlog(id: ObjectId): Promise<Blog> {
    return this.blogModel.findById(id).populate('imageList').exec();
  }
  async getDepartment(id: ObjectId): Promise<Department> {
    return this.departmentModel
      .findById(id)
      .populate({
        path: 'members',
        populate: [{ path: 'image' }],
      })
      .exec();
  }

  async getActivity(id: ObjectId): Promise<Activity> {
    return this.activityModel.findById(id).populate('imageList').exec();
  }

  async updateBlog(data: any): Promise<Blog> {
    const { _id, ...updateData } = data;
    return this.blogModel
      .findByIdAndUpdate(_id, updateData, { new: true })
      .populate('imageList')
      .exec();
  }

  async deleteBlogs(ids: string[]): Promise<void> {
    const data = await this.blogModel.deleteMany({ _id: { $in: ids } }).exec();
    console.log(data);
  }

  async setBlogsActive(active: boolean, selected: string[]): Promise<void> {
    await this.blogModel.updateMany(
      { _id: { $in: selected } },
      { active: active },
    );
  }

  // Department
  async getDepartments(): Promise<Department[]> {
    return this.departmentModel
      .find()
      .populate({
        path: 'members',
        populate: [{ path: 'image' }],
      })
      .exec();
  }

  async addDepartment(data: any): Promise<Department> {
    const newDepartment = new this.departmentModel(data);
    await newDepartment.save();
    return newDepartment;
  }

  async updateDepartment(data: any): Promise<Department> {
    const { _id, ...updateData } = data;
    return await this.departmentModel
      .findByIdAndUpdate(_id, updateData, { new: true })
      .exec();
  }

  async deleteDepartments(ids: string[]): Promise<void> {
    await this.departmentModel.deleteMany({ _id: { $in: ids } }).exec();
  }

  async setDepartmentsActive(
    active: boolean,
    selected: string[],
  ): Promise<void> {
    await this.departmentModel.updateMany(
      { _id: { $in: selected } },
      { active: active },
    );
  }

  // User
  getAllUsers() {
    return this.userModel.find().exec();
  }

  getUserByID(id: string) {
    return this.userModel.findById(id).exec();
  }

  getUserByEmail(email: string) {
    return this.userModel.findOne({ email: email }).exec();
  }

  async addUser(data: any) {
    const newUser = new this.userModel(data);
    await newUser.save();
    return newUser;
  }

  async setUserActive(active: boolean, selected: string[]) {
    await this.userModel.updateMany(
      { _id: { $in: selected } },
      { active: active },
    );
  }

  async setUserAdmin(admin: boolean, selected: string[]) {
    await this.userModel.updateMany(
      { _id: { $in: selected } },
      { admin: admin },
    );
  }

  // Image

  async getImages(): Promise<Image[]> {
    return this.imageModel.find().exec();
  }

  async addImage(data: any): Promise<Image> {
    const newImage = new this.imageModel(data);
    await newImage.save();
    return newImage;
  }

  async updateImage(data: any): Promise<Image> {
    const { _id, ...updateData } = data;
    return this.imageModel
      .findByIdAndUpdate(_id, updateData, { new: true })
      .exec();
  }

  async deleteImages(ids: string[]): Promise<void> {
    await this.imageModel.deleteMany({ _id: { $in: ids } }).exec();
  }

  async getImagesByIds(ids: string[]): Promise<Image[]> {
    return this.imageModel.find({ _id: { $in: ids } }).exec();
  }

  async setImagesActive(active: boolean, selected: string[]): Promise<void> {
    await this.imageModel.updateMany(
      { _id: { $in: selected } },
      { active: active },
    );
  }
}
