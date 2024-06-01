import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { Activity } from './entities/activity.entity';

@Injectable()
export class ActivityService {
  constructor(
    @InjectModel(Activity.name) private activityModel: Model<Activity>,
  ) {}

  async create(data: CreateActivityDto) {
    const newActivity = new this.activityModel(data);
    await newActivity.save();
    return newActivity;
  }

  findAll() {
    return this.activityModel.find().populate('imageList').exec();
  }

  findOne(id: ObjectId) {
    return this.activityModel.findById(id).populate('imageList').exec();
  }

  update(data: UpdateActivityDto) {
    const { _id, ...updateData } = data;
    return this.activityModel
      .findByIdAndUpdate(_id, updateData, { new: true })
      .populate('imageList')
      .exec();
  }

  remove(id: string) {
    return this.activityModel.deleteOne({ _id: id }).exec();
  }

  deleteMany(ids: string[]) {
    return this.activityModel.deleteMany({ _id: { $in: ids } }).exec();
  }

  async setActive(active: boolean, selected: string[]): Promise<void> {
    await this.activityModel.updateMany(
      { _id: { $in: selected } },
      { active: active },
    );
  }
}
