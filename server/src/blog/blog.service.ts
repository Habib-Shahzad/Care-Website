import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateBlogDto } from './dto/create-blog.dto';
import { Blog, BlogType } from './entities/blog.entity';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<Blog>) {}

  async create(data: CreateBlogDto): Promise<Blog> {
    const newBlog = new this.blogModel(data);
    await newBlog.save();
    return newBlog;
  }

  findAll() {
    return this.blogModel.find().populate('imageList').exec();
  }

  async findByType(blogType: BlogType): Promise<Blog[]> {
    return this.blogModel
      .find({ blogType: blogType })
      .populate('imageList')
      .exec();
  }

  async findOne(id: ObjectId): Promise<Blog> {
    return this.blogModel.findById(id).populate('imageList').exec();
  }

  async setActive(active: boolean, selected: string[]): Promise<void> {
    await this.blogModel.updateMany(
      { _id: { $in: selected } },
      { active: active },
    );
  }

  async update(data: UpdateBlogDto): Promise<Blog> {
    const { _id, ...updateData } = data;
    return this.blogModel
      .findByIdAndUpdate(_id, updateData, { new: true })
      .populate('imageList')
      .exec();
  }

  remove(id: number) {
    return this.blogModel.deleteOne({ _id: id }).exec();
  }

  deleteMany(ids: string[]) {
    return this.blogModel.deleteMany({ _id: { $in: ids } }).exec();
  }
}
