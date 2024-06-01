import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CareImage as Image, CareImageDocument } from './entities/image.entity';

@Injectable()
export class ImageService {
  constructor(
    @InjectModel(Image.name) private imageModel: Model<CareImageDocument>,
  ) {}

  async create(data: CreateImageDto) {
    const newImage = new this.imageModel(data);
    await newImage.save();
    return newImage;
  }

  findAll() {
    return this.imageModel.find().exec();
  }

  findOne(id: ObjectId) {
    return this.imageModel.findById(id).exec();
  }

  update(data: UpdateImageDto) {
    const { _id, ...updateData } = data;
    return this.imageModel
      .findByIdAndUpdate(_id, updateData, { new: true })
      .exec();
  }

  findByIds(ids: string[]) {
    return this.imageModel.find({ _id: { $in: ids } }).exec();
  }

  remove(id: string) {
    return this.imageModel.deleteOne({ _id: id }).exec();
  }

  deleteMany(ids: string[]) {
    return this.imageModel.deleteMany({ _id: { $in: ids } }).exec();
  }

  async setActive(active: boolean, selected: string[]) {
    return this.imageModel.updateMany(
      { _id: { $in: selected } },
      { active: active },
    );
  }
}
